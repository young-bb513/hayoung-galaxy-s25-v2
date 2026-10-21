import React, { useState, useEffect, useRef } from 'react';
import {
  CHAT_DATA_JIWON,
  KAKAO_FRIENDS_LIST,
  HAYOUNG_PROFILE,
  EVENT_1020_JIWON_MESSAGES,
  EVENT_1020_REPLY_MESSAGES,
  KakaoMessage,
  KakaoFriend,
} from '../../data/kakaoData';
import {
  Search,
  Settings,
  UserPlus,
  Music,
  MessageSquare,
  Users,
  Compass,
  ShoppingBag,
  MoreHorizontal,
  ChevronLeft,
  Menu,
  Plus,
  Smile,
  Hash,
  Video,
  Phone,
  PhoneMissed,
  X,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  MessageCircle,
  Send,
} from 'lucide-react';

interface KakaoTalkAppProps {
  onBack?: () => void;
  onBackToHome?: () => void;
  onRegisterBackHandler?: (handler: () => boolean) => void;
  initialRoomId?: string | null;
  start1020Stream?: boolean;
  onTrigger1009Call?: () => void;
  onTrigger1017Call?: () => void;
}

type KakaoTab = 'friends' | 'chats' | 'openchat' | 'shopping' | 'more';

export const KakaoTalkApp: React.FC<KakaoTalkAppProps> = ({
  onBack: _onBack,
  onBackToHome: _onBackToHome,
  onRegisterBackHandler,
  initialRoomId = null,
  start1020Stream = false,
  onTrigger1009Call,
  onTrigger1017Call,
}) => {
  const [currentTab, setCurrentTab] = useState<KakaoTab>('friends');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(initialRoomId);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<KakaoFriend | null>(null);
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 10월 20일 실시간 대화 이벤트 상태 관리
  const [event1020Messages, setEvent1020Messages] = useState<KakaoMessage[]>(() => {
    try {
      const saved = localStorage.getItem('kakao_1020_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [event1020Status, setEvent1020Status] = useState<
    'idle' | 'streaming_part1' | 'waiting_input' | 'streaming_part2' | 'completed'
  >(() => {
    try {
      return (
        (localStorage.getItem('kakao_1020_status') as any) ||
        (start1020Stream ? 'streaming_part1' : 'idle')
      );
    } catch {
      return start1020Stream ? 'streaming_part1' : 'idle';
    }
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (text: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(text);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Synchronize initialRoomId prop
  useEffect(() => {
    if (initialRoomId) {
      setActiveRoomId(initialRoomId);
    }
  }, [initialRoomId]);

  // Window helper for developer testing (hidden from regular user UI)
  useEffect(() => {
    (window as any).resetKakaoEvent = () => {
      localStorage.removeItem('kakao_1020_messages');
      localStorage.removeItem('kakao_1020_status');
      setEvent1020Messages([]);
      setEvent1020Status('idle');
      showToast('10월 20일 이벤트가 초기화되었습니다.');
    };
  }, []);

  // Save 10월 20일 event data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kakao_1020_messages', JSON.stringify(event1020Messages));
      localStorage.setItem('kakao_1020_status', event1020Status);
    } catch {
      // ignore
    }
  }, [event1020Messages, event1020Status]);

  // Trigger streaming when entering room if stream was requested
  useEffect(() => {
    if (activeRoomId === 'jiwon' && (start1020Stream || event1020Status === 'streaming_part1')) {
      if (event1020Status === 'idle') {
        setEvent1020Status('streaming_part1');
      }
    }
  }, [activeRoomId, start1020Stream, event1020Status]);

  // Part 1: 순차적으로 도착하는 박지원 메시지 9개
  useEffect(() => {
    if (activeRoomId !== 'jiwon' || event1020Status !== 'streaming_part1') return;

    const currentCount = event1020Messages.filter(
      (m) => m.id.startsWith('msg_1020_jiwon_')
    ).length;

    if (currentCount >= EVENT_1020_JIWON_MESSAGES.length) {
      setEvent1020Status('waiting_input');
      return;
    }

    const nextIndex = currentCount;
    const nextMsgTemplate = EVENT_1020_JIWON_MESSAGES[nextIndex];

    const timer = setTimeout(() => {
      const newMsg: KakaoMessage = {
        ...nextMsgTemplate,
        id: `msg_1020_jiwon_${nextIndex + 1}`,
      };

      setEvent1020Messages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });

      if (nextIndex + 1 >= EVENT_1020_JIWON_MESSAGES.length) {
        setEvent1020Status('waiting_input');
      }
    }, 1300);

    return () => clearTimeout(timer);
  }, [activeRoomId, event1020Status, event1020Messages]);

  // Part 2: 사용자 입력 "야라고 하지 마라" 이후 순차적으로 도착하는 박지원 답장 3개
  useEffect(() => {
    if (activeRoomId !== 'jiwon' || event1020Status !== 'streaming_part2') return;

    const replyCount = event1020Messages.filter(
      (m) => m.id.startsWith('msg_1020_reply_')
    ).length;

    if (replyCount >= EVENT_1020_REPLY_MESSAGES.length) {
      setEvent1020Status('completed');
      return;
    }

    const nextIndex = replyCount;
    const nextReplyTemplate = EVENT_1020_REPLY_MESSAGES[nextIndex];

    const timer = setTimeout(() => {
      const newReply: KakaoMessage = {
        ...nextReplyTemplate,
        id: `msg_1020_reply_${nextIndex + 1}`,
      };

      setEvent1020Messages((prev) => {
        if (prev.some((m) => m.id === newReply.id)) return prev;
        return [...prev, newReply];
      });

      if (nextIndex + 1 >= EVENT_1020_REPLY_MESSAGES.length) {
        setEvent1020Status('completed');
      }
    }, 1300);

    return () => clearTimeout(timer);
  }, [activeRoomId, event1020Status, event1020Messages]);

  // Auto-scroll when messages update, but do not interrupt if user is typing
  useEffect(() => {
    if (activeRoomId && !isInputFocused) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeRoomId, event1020Messages, isInputFocused]);

  // Handle hardware / navigation back button hierarchy
  useEffect(() => {
    if (onRegisterBackHandler) {
      onRegisterBackHandler(() => {
        if (selectedPhoto) {
          setSelectedPhoto(null);
          return true;
        }
        if (selectedProfile || isMyProfileOpen) {
          setSelectedProfile(null);
          setIsMyProfileOpen(false);
          return true;
        }
        if (activeRoomId) {
          setActiveRoomId(null);
          return true;
        }
        return false;
      });
    }
  }, [onRegisterBackHandler, activeRoomId, selectedPhoto, selectedProfile, isMyProfileOpen]);

  // Handle user input submit
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    // 사용자 입력이 정확히 "야라고 하지 마라"일 경우
    if (trimmed === '야라고 하지 마라') {
      const userMsg: KakaoMessage = {
        id: `msg_1020_user_${Date.now()}`,
        sender: 'hayoung',
        text: '야라고 하지 마라',
        time: '오후 10:16',
      };
      setEvent1020Messages((prev) => [...prev, userMsg]);
      setInputMessage('');
      setEvent1020Status('streaming_part2');
    } else {
      // 일반 입력
      const customMsg: KakaoMessage = {
        id: `msg_custom_${Date.now()}`,
        sender: 'hayoung',
        text: trimmed,
        time: '오후 10:16',
      };
      setEvent1020Messages((prev) => [...prev, customMsg]);
      setInputMessage('');
      showToast('\'야라고 하지 마라\'를 입력하면 대화가 이어집니다.');
    }
  };

  const jiwonFriend = KAKAO_FRIENDS_LIST.find((f) => f.id === 'jiwon');

  // Helper to get latest message preview for chat list
  const lastMsgText =
    event1020Messages.length > 0
      ? event1020Messages[event1020Messages.length - 1].text || ''
      : '언니 아직 바빠?';
  const lastMsgDate = event1020Messages.length > 0 ? '10월 20일' : '10월 19일';

  // =========================================================================
  // RENDER: CHAT ROOM WITH 바보박지원
  // =========================================================================
  if (activeRoomId === 'jiwon') {
    return (
      <div className="relative w-full h-full flex flex-col bg-[#B2C7D9] select-none overflow-hidden">
        {/* Chat Room Top Bar */}
        <div className="h-12 bg-[#B2C7D9]/95 backdrop-blur-xs px-2 flex items-center justify-between border-b border-black/5 z-20">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveRoomId(null)}
              aria-label="뒤로 가기"
              className="w-9 h-9 flex items-center justify-center text-zinc-800 hover:text-black active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] font-bold text-zinc-900 tracking-tight">
                바보박지원
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-1 text-zinc-800">
            <button
              type="button"
              aria-label="대화 내용 검색"
              onClick={() => showToast('대화 내용 검색')}
              className="w-8 h-8 flex items-center justify-center hover:text-black cursor-pointer"
            >
              <Search size={19} />
            </button>
            <button
              type="button"
              aria-label="채팅방 메뉴"
              onClick={() => showToast('채팅방 서랍')}
              className="w-8 h-8 flex items-center justify-center hover:text-black cursor-pointer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
          {/* 과거 확정 대화 기록 (10월 7일 ~ 10월 19일) */}
          {CHAT_DATA_JIWON.map((dateGroup, gIdx) => (
            <div key={`group-${gIdx}`} className="flex flex-col gap-2">
              <div className="flex justify-center my-1.5">
                <div className="bg-black/15 text-white/95 text-[11px] font-normal px-3 py-1 rounded-full shadow-2xs">
                  {dateGroup.date}
                </div>
              </div>

              {dateGroup.messages.map((msg: KakaoMessage) => {
                const isHayoung = msg.sender === 'hayoung';
                const isVideoCall =
                  msg.actionType === 'video_call_incoming' ||
                  msg.actionType === 'video_call_outgoing' ||
                  msg.actionType === 'facetime';
                const isMissedVideoCall = msg.actionType === 'video_call_missed';
                const is1009CallTrigger = msg.id === 'msg_1009_13';
                const is1017CallTrigger = msg.id === 'msg_1017_17';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-1.5 w-full ${
                      isHayoung ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!isHayoung && (
                      <button
                        type="button"
                        onClick={() => {
                          if (jiwonFriend) setSelectedProfile(jiwonFriend);
                        }}
                        className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform shrink-0"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/80 shadow-2xs bg-amber-100 flex items-center justify-center">
                          {jiwonFriend?.avatarImage ? (
                            <img
                              src={jiwonFriend.avatarImage}
                              alt="박지원 프로필"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-zinc-800 font-bold text-[12px]">지원</span>
                          )}
                        </div>
                      </button>
                    )}

                    <div
                      className={`flex flex-col ${
                        isHayoung ? 'items-end' : 'items-start'
                      } max-w-[76%]`}
                    >
                      {!isHayoung && (
                        <span className="text-[11.5px] text-zinc-700 font-normal ml-1 mb-0.5">
                          바보박지원
                        </span>
                      )}

                      <div
                        className={`flex items-end gap-1 ${
                          isHayoung ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        <span className="text-[9.5px] text-zinc-500 font-normal whitespace-nowrap mb-0.5">
                          {msg.time}
                        </span>

                        {/* CASE 1: Video Call Log Card */}
                        {isVideoCall ? (
                          <button
                            type="button"
                            onClick={() => showToast('페이스톡 통화 기록')}
                            className={`px-3 py-2.5 rounded-[16px] shadow-xs border transition-all active:scale-98 flex items-center gap-2.5 min-w-[165px] text-left cursor-pointer ${
                              isHayoung
                                ? 'bg-[#FEE500] border-[#E8D000] text-[#191919] rounded-tr-[3px]'
                                : 'bg-white border-zinc-200/90 text-zinc-900 rounded-tl-[3px]'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                isHayoung
                                  ? 'bg-black/10 text-zinc-900'
                                  : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              }`}
                            >
                              <Video size={16} className="fill-current" />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="text-[13px] font-bold leading-tight">
                                  페이스톡
                                </span>
                                {isHayoung ? (
                                  <ArrowUpRight size={13} className="text-zinc-600 stroke-[2.5]" />
                                ) : (
                                  <ArrowDownLeft size={13} className="text-emerald-600 stroke-[2.5]" />
                                )}
                              </div>
                              <span className="text-[10.5px] text-zinc-500 leading-tight mt-0.5">
                                {isHayoung ? '발신' : '수신'} {msg.callDuration ? `(${msg.callDuration})` : '· 통화종료'}
                              </span>
                            </div>
                          </button>
                        ) : isMissedVideoCall ? (
                          /* CASE 2: 페이스톡 부재중 기록 UI (10월 19일) */
                          <button
                            type="button"
                            onClick={() =>
                              showToast('페이스톡 부재중 기록입니다 (실제 연결은 지원하지 않습니다)')
                            }
                            className="px-3 py-2.5 rounded-[16px] rounded-tl-[3px] bg-white border border-red-100/90 text-zinc-900 shadow-xs flex items-center gap-2.5 min-w-[165px] text-left cursor-pointer active:scale-98 transition-all"
                          >
                            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 border border-red-200/60 flex items-center justify-center shrink-0">
                              <Video size={16} className="fill-current" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="text-[13px] font-bold text-red-600 leading-tight">
                                  페이스톡 취소
                                </span>
                                <ArrowDownLeft size={13} className="text-red-500 stroke-[2.5]" />
                              </div>
                              <span className="text-[10.5px] text-zinc-400 leading-tight mt-0.5">
                                응답 없음
                              </span>
                            </div>
                          </button>
                        ) : msg.image ? (
                          /* CASE 3: Image Bubble */
                          <button
                            type="button"
                            onClick={() => setSelectedPhoto(msg.image || null)}
                            className="rounded-[15px] overflow-hidden shadow-sm border border-black/5 hover:opacity-95 active:scale-98 transition-all max-w-[210px] cursor-pointer"
                          >
                            <img
                              src={msg.image}
                              alt="전송된 사진"
                              className="w-full h-auto object-cover max-h-[240px]"
                            />
                          </button>
                        ) : (
                          /* CASE 4: Regular Text Bubble */
                          <button
                            type="button"
                            onClick={() => {
                              if (is1009CallTrigger && onTrigger1009Call) {
                                onTrigger1009Call();
                              } else if (is1017CallTrigger && onTrigger1017Call) {
                                onTrigger1017Call();
                              }
                            }}
                            className={`px-3 py-1.5 rounded-[16px] shadow-2xs text-[13.5px] leading-relaxed break-words font-normal text-left ${
                              is1009CallTrigger || is1017CallTrigger
                                ? 'underline underline-offset-2 cursor-pointer active:scale-95 transition-transform'
                                : ''
                            } ${
                              isHayoung
                                ? 'bg-[#FEE500] text-[#191919] rounded-tr-[3px]'
                                : 'bg-white text-[#191919] rounded-tl-[3px]'
                            }`}
                          >
                            {msg.text}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* ==================== 2026년 10월 20일 실시간 이벤트 스트리밍 ==================== */}
          {event1020Messages.length > 0 && (
            <div className="flex flex-col gap-2 animate-fadeIn">
              <div className="flex justify-center my-1.5">
                <div className="bg-black/15 text-white/95 text-[11px] font-normal px-3 py-1 rounded-full shadow-2xs">
                  2026년 10월 20일 화요일
                </div>
              </div>

              {event1020Messages.map((msg) => {
                const isHayoung = msg.sender === 'hayoung';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-1.5 w-full animate-fadeIn ${
                      isHayoung ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!isHayoung && (
                      <button
                        type="button"
                        onClick={() => {
                          if (jiwonFriend) setSelectedProfile(jiwonFriend);
                        }}
                        className="flex flex-col items-center cursor-pointer active:scale-95 shrink-0"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/80 shadow-2xs bg-amber-100 flex items-center justify-center">
                          {jiwonFriend?.avatarImage ? (
                            <img
                              src={jiwonFriend.avatarImage}
                              alt="박지원 프로필"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-zinc-800 font-bold text-[12px]">지원</span>
                          )}
                        </div>
                      </button>
                    )}

                    <div
                      className={`flex flex-col ${
                        isHayoung ? 'items-end' : 'items-start'
                      } max-w-[76%]`}
                    >
                      {!isHayoung && (
                        <span className="text-[11.5px] text-zinc-700 font-normal ml-1 mb-0.5">
                          바보박지원
                        </span>
                      )}

                      <div
                        className={`flex items-end gap-1 ${
                          isHayoung ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        <span className="text-[9.5px] text-zinc-500 font-normal whitespace-nowrap mb-0.5">
                          {msg.time}
                        </span>

                        <div
                          className={`px-3 py-1.5 rounded-[16px] shadow-2xs text-[13.5px] leading-relaxed break-words font-normal ${
                            isHayoung
                              ? 'bg-[#FEE500] text-[#191919] rounded-tr-[3px]'
                              : 'bg-white text-[#191919] rounded-tl-[3px]'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Chat Input Bar (Interactive Form) */}
        <form
          onSubmit={handleSendMessage}
          className="bg-white px-2.5 py-2 flex items-center gap-2 border-t border-zinc-200/80 z-20"
        >
          <button
            type="button"
            aria-label="더보기 추가 메뉴"
            onClick={() => showToast('사진/파일 전송 메뉴')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-800 cursor-pointer shrink-0"
          >
            <Plus size={20} />
          </button>

          <div className="flex-1 h-9 bg-zinc-100 rounded-full px-3.5 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder={
                event1020Status === 'waiting_input'
                  ? '야라고 하지 마라'
                  : '메시지를 입력하세요'
              }
              className="flex-1 bg-transparent border-none outline-none text-zinc-800 text-[13px] placeholder:text-zinc-400"
            />
            <Smile size={18} className="text-zinc-400 shrink-0" />
          </div>

          {inputMessage.trim() ? (
            <button
              type="submit"
              aria-label="메시지 전송"
              className="w-8 h-8 rounded-full bg-[#FEE500] hover:bg-[#ebd300] active:scale-95 flex items-center justify-center text-[#191919] shadow-2xs cursor-pointer shrink-0 transition-transform"
            >
              <Send size={16} />
            </button>
          ) : (
            <button
              type="button"
              aria-label="샵 검색"
              onClick={() => showToast('샵 검색')}
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-800 cursor-pointer shrink-0"
            >
              <Hash size={18} />
            </button>
          )}
        </form>

        {/* Modal: Fullscreen Photo Viewer */}
        {selectedPhoto && (
          <div
            className="absolute inset-0 z-50 bg-black flex flex-col justify-between p-3 select-none animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="flex justify-between items-center text-white p-2">
              <span className="text-[13px] opacity-80">사진 상세 보기</span>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="닫기"
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-2">
              <img
                src={selectedPhoto}
                alt="확대된 사진"
                className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="p-2 text-center text-white/60 text-[11px]">
              탭하여 닫기
            </div>
          </div>
        )}

        {/* Profile Detail Screen inside Chat Room */}
        {selectedProfile && (
          <ProfileModal
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
            onOpenChat={() => setSelectedProfile(null)}
            showToast={showToast}
          />
        )}
      </div>
    );
  }

  // =========================================================================
  // RENDER: MAIN KAKAOTALK SCREEN (FRIENDS / CHATS TABS)
  // =========================================================================
  return (
    <div className="relative w-full h-full flex flex-col bg-white select-none overflow-hidden">
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 text-white text-[12px] px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none transition-all">
          {toastMessage}
        </div>
      )}

      {/* ==================== TAB 1: FRIENDS (친구 탭) ==================== */}
      {currentTab === 'friends' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-12 px-4 flex items-center justify-between border-b border-zinc-100">
            <span className="text-[20px] font-bold text-zinc-900 tracking-tight">친구</span>
            <div className="flex items-center gap-3.5 text-zinc-700">
              <Search size={20} className="cursor-pointer hover:text-black" onClick={() => showToast('친구 검색')} />
              <UserPlus size={20} className="cursor-pointer hover:text-black" onClick={() => showToast('친구 추가')} />
              <Music size={19} className="cursor-pointer hover:text-black" onClick={() => showToast('멜론 연동')} />
              <Settings size={20} className="cursor-pointer hover:text-black" onClick={() => showToast('친구 설정')} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col divide-y divide-zinc-100">
            {/* 송하영 내 프로필 */}
            <button
              type="button"
              onClick={() => setIsMyProfileOpen(true)}
              className="py-2.5 flex items-center gap-3 text-left w-full hover:bg-zinc-50/80 active:bg-zinc-100/70 rounded-xl px-1 transition-colors cursor-pointer"
            >
              <div className="w-13 h-13 rounded-full overflow-hidden border border-black/10 shadow-sm shrink-0 bg-amber-50">
                <img
                  src={HAYOUNG_PROFILE.avatarImage}
                  alt="송하영 프로필"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[15px] font-bold text-zinc-900 leading-snug">
                  {HAYOUNG_PROFILE.name}
                </span>
                <span className="text-[11.5px] text-zinc-400 truncate mt-0.5">
                  내 프로필
                </span>
              </div>
            </button>

            {/* 11개 연락처 목록 */}
            <div className="pt-3 pb-4 flex flex-col gap-0.5">
              <div className="text-[11px] font-semibold text-zinc-400 pb-1.5 px-1">
                친구 {KAKAO_FRIENDS_LIST.length}
              </div>

              {KAKAO_FRIENDS_LIST.map((friend) => (
                <div
                  key={friend.id}
                  className="w-full py-2.5 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 rounded-xl px-1.5 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => setSelectedProfile(friend)}
                      aria-label={`${friend.name} 프로필 보기`}
                      className="cursor-pointer active:scale-95 transition-transform shrink-0"
                    >
                      <div className="w-10.5 h-10.5 rounded-full overflow-hidden border border-black/10 shadow-2xs flex items-center justify-center bg-zinc-100">
                        {friend.avatarImage ? (
                          <img
                            src={friend.avatarImage}
                            alt={friend.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className={`w-full h-full bg-gradient-to-tr ${
                              friend.avatarBg || 'from-zinc-200 to-zinc-300'
                            } flex items-center justify-center text-zinc-800 font-bold text-[13px]`}
                          >
                            {friend.avatarText || friend.name.slice(0, 1)}
                          </div>
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (friend.id === 'jiwon') {
                          setActiveRoomId('jiwon');
                        } else {
                          setSelectedProfile(friend);
                        }
                      }}
                      className="flex flex-col flex-1 min-w-0 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-semibold text-zinc-900 truncate">
                          {friend.name}
                        </span>
                        {friend.id === 'jiwon' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FEE500] inline-block" />
                        )}
                      </div>
                      {friend.statusMessage && (
                        <span className="text-[11px] text-zinc-400 truncate max-w-[210px] mt-0.5">
                          {friend.statusMessage}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: CHATS (채팅 탭) ==================== */}
      {currentTab === 'chats' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-12 px-4 flex items-center justify-between border-b border-zinc-100">
            <span className="text-[20px] font-bold text-zinc-900 tracking-tight">채팅</span>
            <div className="flex items-center gap-3.5 text-zinc-700">
              <Search size={20} className="cursor-pointer hover:text-black" onClick={() => showToast('채팅방 검색')} />
              <MessageSquare size={20} className="cursor-pointer hover:text-black" onClick={() => showToast('새로운 채팅')} />
              <Settings size={20} className="cursor-pointer hover:text-black" onClick={() => showToast('채팅 설정')} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-1 flex flex-col divide-y divide-zinc-100">
            {/* Chat Room: 바보박지원 */}
            <button
              type="button"
              onClick={() => setActiveRoomId('jiwon')}
              className="w-full py-3 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 rounded-xl px-1 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-13 h-13 rounded-full overflow-hidden border border-black/10 shadow-2xs shrink-0 bg-amber-50">
                  <img
                    src={jiwonFriend?.avatarImage || '/assets/aistudio/21830_e53cbb79.png'}
                    alt="박지원 프로필"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-zinc-900 truncate">
                      바보박지원
                    </span>
                    <span className="text-[10.5px] text-zinc-400">{lastMsgDate}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[12.5px] text-zinc-500 truncate max-w-[200px]">
                      {lastMsgText}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Other tabs */}
      {currentTab === 'openchat' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-400">
          <Compass size={36} className="mb-2 text-zinc-300" />
          <span className="text-[14px] font-medium text-zinc-600">오픈채팅</span>
          <span className="text-[12px] text-zinc-400 mt-1">다양한 주제의 오픈채팅방에 참여해보세요</span>
        </div>
      )}

      {currentTab === 'shopping' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-400">
          <ShoppingBag size={36} className="mb-2 text-zinc-300" />
          <span className="text-[14px] font-medium text-zinc-600">쇼핑</span>
          <span className="text-[12px] text-zinc-400 mt-1">카카오톡 선물하기 및 쇼핑 서비스</span>
        </div>
      )}

      {currentTab === 'more' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-400">
          <MoreHorizontal size={36} className="mb-2 text-zinc-300" />
          <span className="text-[14px] font-medium text-zinc-600">더보기</span>
          <span className="text-[12px] text-zinc-400 mt-1">지갑, 페이, 인증 및 기타 편의 서비스</span>
        </div>
      )}

      {/* Profile Modals */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onOpenChat={() => {
            setSelectedProfile(null);
            if (selectedProfile.id === 'jiwon') {
              setActiveRoomId('jiwon');
            }
          }}
          showToast={showToast}
        />
      )}

      {isMyProfileOpen && (
        <ProfileModal
          isMyProfile
          onClose={() => setIsMyProfileOpen(false)}
          showToast={showToast}
        />
      )}

      {/* Bottom 5 Tabs */}
      <div className="h-13 border-t border-zinc-150 px-2 flex items-center justify-around text-zinc-400 bg-white">
        <button
          type="button"
          onClick={() => setCurrentTab('friends')}
          className={`flex flex-col items-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            currentTab === 'friends' ? 'text-zinc-900 font-semibold' : 'hover:text-zinc-600'
          }`}
        >
          <Users size={21} className={currentTab === 'friends' ? 'stroke-[2.4]' : ''} />
          <span className="text-[9.5px]">친구</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('chats')}
          className={`flex flex-col items-center gap-0.5 py-1 flex-1 relative transition-colors cursor-pointer ${
            currentTab === 'chats' ? 'text-zinc-900 font-semibold' : 'hover:text-zinc-600'
          }`}
        >
          <MessageSquare size={21} className={currentTab === 'chats' ? 'fill-zinc-900 stroke-zinc-900' : ''} />
          <span className="text-[9.5px]">채팅</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('openchat')}
          className={`flex flex-col items-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            currentTab === 'openchat' ? 'text-zinc-900 font-semibold' : 'hover:text-zinc-600'
          }`}
        >
          <Compass size={21} className={currentTab === 'openchat' ? 'stroke-[2.4]' : ''} />
          <span className="text-[9.5px]">오픈채팅</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('shopping')}
          className={`flex flex-col items-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            currentTab === 'shopping' ? 'text-zinc-900 font-semibold' : 'hover:text-zinc-600'
          }`}
        >
          <ShoppingBag size={21} className={currentTab === 'shopping' ? 'stroke-[2.4]' : ''} />
          <span className="text-[9.5px]">쇼핑</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('more')}
          className={`flex flex-col items-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            currentTab === 'more' ? 'text-zinc-900 font-semibold' : 'hover:text-zinc-600'
          }`}
        >
          <MoreHorizontal size={21} className={currentTab === 'more' ? 'stroke-[2.4]' : ''} />
          <span className="text-[9.5px]">더보기</span>
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// PROFILE MODAL COMPONENT
// =========================================================================
interface ProfileModalProps {
  profile?: KakaoFriend;
  isMyProfile?: boolean;
  onClose: () => void;
  onOpenChat?: () => void;
  showToast: (msg: string) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isMyProfile = false,
  onClose,
  onOpenChat,
  showToast,
}) => {
  const isJiwon = profile?.id === 'jiwon';

  const bgImage = isMyProfile
    ? HAYOUNG_PROFILE.backgroundImage
    : isJiwon
    ? profile?.backgroundImage
    : undefined;

  const avatarImg = isMyProfile
    ? HAYOUNG_PROFILE.avatarImage
    : isJiwon
    ? profile?.avatarImage
    : profile?.avatarImage;

  const displayName = isMyProfile ? HAYOUNG_PROFILE.name : profile?.name;
  const statusMsg = isMyProfile || isJiwon ? '' : profile?.statusMessage;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-between text-white select-none animate-fadeIn bg-zinc-900 overflow-hidden">
      {bgImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-zinc-800 to-zinc-950" />
      )}

      {/* Top Controls */}
      <div className="relative h-13 px-4 flex items-center justify-between z-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 active:scale-95 cursor-pointer transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast('프로필 공유')}
            className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 cursor-pointer"
          >
            <Sparkles size={18} />
          </button>
        </div>
      </div>

      {/* Center Circular Profile Avatar & Info */}
      <div className="relative flex-1 flex flex-col items-center justify-end pb-12 px-6 text-center z-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/80 shadow-2xl mb-3.5 bg-white/20 backdrop-blur-xs flex items-center justify-center">
          {avatarImg ? (
            <img
              src={avatarImg}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-tr ${
                profile?.avatarBg || 'from-zinc-200 to-zinc-300'
              } flex items-center justify-center text-zinc-900 font-bold text-[32px]`}
            >
              {profile?.avatarText || profile?.name.slice(0, 1)}
            </div>
          )}
        </div>

        <h3 className="text-[21px] font-bold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {displayName}
        </h3>

        {statusMsg ? (
          <p className="text-[13px] text-white/90 mt-1 max-w-[240px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-relaxed">
            {statusMsg}
          </p>
        ) : null}

        {!isMyProfile && profile?.relationship && (
          <span className="mt-2.5 px-2.5 py-0.5 rounded-full bg-black/35 text-white/95 text-[11px] font-medium backdrop-blur-sm border border-white/10">
            {profile.relationship}
          </span>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="relative pb-9 pt-4 px-6 border-t border-white/15 flex items-center justify-around z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        {isMyProfile ? (
          <>
            <button
              type="button"
              onClick={() => showToast('나와의 채팅')}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">나와의 채팅</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('프로필 편집')}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Settings size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">프로필 편집</span>
            </button>
          </>
        ) : isJiwon ? (
          <>
            <button
              type="button"
              onClick={onOpenChat}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">1:1 채팅</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('통화하기')}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Phone size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">통화하기</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('페이스톡 연결')}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Video size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">페이스톡</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => showToast('대화방이 아직 개설되지 않았습니다')}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">1:1 채팅</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('통화 기능은 준비 중입니다')}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Phone size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">통화하기</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('페이스톡 기능은 준비 중입니다')}
              className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Video size={20} />
              </div>
              <span className="text-[11px] font-medium drop-shadow-xs">페이스톡</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
