import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Grid,
  Video,
  UserPlus,
  Disc,
} from 'lucide-react';

export interface ActiveCall {
  status: 'incoming' | 'outgoing' | 'connected' | 'ended';
  contactName: string;
  contactAvatar?: string;
  scenario?: 'event_1009' | 'event_1017' | 'manual';
}

interface InCallOverlayProps {
  call: ActiveCall;
  onAccept: () => void;
  onReject: () => void;
  onEndCall: () => void;
}

export const InCallOverlay: React.FC<InCallOverlayProps> = ({
  call,
  onAccept,
  onReject,
  onEndCall,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [customDisplayTime, setCustomDisplayTime] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);

  // Auto transition for 10월 17일 outgoing scenario (약 5초 후 연결)
  useEffect(() => {
    if (call.status === 'outgoing' && call.scenario === 'event_1017') {
      const connectTimer = setTimeout(() => {
        onAccept(); // Transition to connected
      }, 5000);
      return () => clearTimeout(connectTimer);
    }
  }, [call.status, call.scenario, onAccept]);

  // General call timer when connected
  useEffect(() => {
    if (call.status !== 'connected') {
      setSeconds(0);
      setCustomDisplayTime(null);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [call.status]);

  // Scenario 10월 9일:
  // 약 10초 후 타이머가 15:00으로 변경 -> 3초 후 자동 종료
  useEffect(() => {
    if (call.status === 'connected' && call.scenario === 'event_1009') {
      const jumpTimer = setTimeout(() => {
        setCustomDisplayTime('15:00');
      }, 10000);

      const endTimer = setTimeout(() => {
        onEndCall();
      }, 13000);

      return () => {
        clearTimeout(jumpTimer);
        clearTimeout(endTimer);
      };
    }
  }, [call.status, call.scenario, onEndCall]);

  // Scenario 10월 17일:
  // 연결 약 10초 후 타이머가 1:00:00으로 변경 -> 3초 후 자동 종료
  useEffect(() => {
    if (call.status === 'connected' && call.scenario === 'event_1017') {
      const jumpTimer = setTimeout(() => {
        setCustomDisplayTime('1:00:00');
      }, 10000);

      const endTimer = setTimeout(() => {
        onEndCall();
      }, 13000);

      return () => {
        clearTimeout(jumpTimer);
        clearTimeout(endTimer);
      };
    }
  }, [call.status, call.scenario, onEndCall]);

  // Format elapsed seconds as mm:ss
  const formatTime = (totalSec: number) => {
    if (customDisplayTime) return customDisplayTime;
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 z-50 bg-gradient-to-b from-[#1c2430] via-[#10141a] to-[#0a0d12] text-white flex flex-col justify-between px-6 pt-16 pb-12 select-none animate-fadeIn">
      {/* Top Contact Details */}
      <div className="flex flex-col items-center text-center mt-4">
        {/* Contact Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl mb-4 bg-zinc-800 flex items-center justify-center">
          {call.contactAvatar ? (
            <img
              src={call.contactAvatar}
              alt={call.contactName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[28px] font-bold text-white">
              {call.contactName.slice(0, 1)}
            </span>
          )}
        </div>

        {/* Contact Name */}
        <h2 className="text-[26px] font-bold tracking-tight text-white drop-shadow-md">
          {call.contactName}
        </h2>

        {/* Call Status / Duration */}
        <p className="text-[15px] font-medium text-emerald-400 mt-2 tracking-wide">
          {call.status === 'incoming' && '수신 전화...'}
          {call.status === 'outgoing' && '연결 중...'}
          {call.status === 'connected' && formatTime(seconds)}
          {call.status === 'ended' && '통화 종료'}
        </p>
      </div>

      {/* Middle Interactive One UI Control Grid (Connected State) */}
      {call.status === 'connected' && (
        <div className="w-full max-w-[280px] mx-auto my-auto">
          {showKeypad ? (
            <div className="grid grid-cols-3 gap-3 text-center py-2 animate-fadeIn">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                <button
                  key={k}
                  type="button"
                  className="w-13 h-13 rounded-full bg-white/10 active:bg-white/25 text-white font-bold text-[18px] flex items-center justify-center mx-auto"
                >
                  {k}
                </button>
              ))}
              <div className="col-span-3 text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeypad(false)}
                  className="text-[12px] text-zinc-400 underline"
                >
                  키패드 닫기
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-y-6 gap-x-4 text-center">
              {/* 녹음 */}
              <button
                type="button"
                className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-13 h-13 rounded-full bg-white/10 flex items-center justify-center">
                  <Disc size={22} />
                </div>
                <span className="text-[11px]">녹음</span>
              </button>

              {/* 영상통화 */}
              <button
                type="button"
                className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-13 h-13 rounded-full bg-white/10 flex items-center justify-center">
                  <Video size={22} />
                </div>
                <span className="text-[11px]">영상통화</span>
              </button>

              {/* 블루투스 / 스피커 */}
              <button
                type="button"
                onClick={() => setIsSpeaker(!isSpeaker)}
                className={`flex flex-col items-center gap-1.5 transition-colors ${
                  isSpeaker ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center ${
                    isSpeaker ? 'bg-emerald-500 text-white' : 'bg-white/10'
                  }`}
                >
                  {isSpeaker ? <Volume2 size={22} /> : <VolumeX size={22} />}
                </div>
                <span className="text-[11px]">스피커</span>
              </button>

              {/* 음소거 */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`flex flex-col items-center gap-1.5 transition-colors ${
                  isMuted ? 'text-red-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center ${
                    isMuted ? 'bg-red-500 text-white' : 'bg-white/10'
                  }`}
                >
                  {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                </div>
                <span className="text-[11px]">음소거</span>
              </button>

              {/* 키패드 */}
              <button
                type="button"
                onClick={() => setShowKeypad(true)}
                className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-13 h-13 rounded-full bg-white/10 flex items-center justify-center">
                  <Grid size={22} />
                </div>
                <span className="text-[11px]">키패드</span>
              </button>

              {/* 통화 추가 */}
              <button
                type="button"
                className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-13 h-13 rounded-full bg-white/10 flex items-center justify-center">
                  <UserPlus size={22} />
                </div>
                <span className="text-[11px]">통화 추가</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Action Controls */}
      <div className="flex items-center justify-around w-full max-w-[300px] mx-auto mt-auto pt-6">
        {call.status === 'incoming' ? (
          <>
            {/* 거절 (Red) */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={onReject}
                aria-label="통화 거절"
                className="w-16 h-16 rounded-full bg-[#E53935] hover:bg-[#D32F2F] active:scale-95 flex items-center justify-center text-white shadow-xl transition-all cursor-pointer"
              >
                <PhoneOff size={28} />
              </button>
              <span className="text-[12px] text-zinc-400 font-medium">거절</span>
            </div>

            {/* 받기 (Green) */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={onAccept}
                aria-label="통화 받기"
                className="w-16 h-16 rounded-full bg-[#20C05C] hover:bg-[#19a74e] active:scale-95 flex items-center justify-center text-white shadow-xl transition-all cursor-pointer animate-pulse"
              >
                <Phone size={28} />
              </button>
              <span className="text-[12px] text-zinc-400 font-medium">받기</span>
            </div>
          </>
        ) : (
          /* 통화 종료 버튼 (Connected or Outgoing) */
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onEndCall}
              aria-label="통화 종료"
              className="w-16 h-16 rounded-full bg-[#E53935] hover:bg-[#D32F2F] active:scale-95 flex items-center justify-center text-white shadow-xl transition-all cursor-pointer"
            >
              <PhoneOff size={28} />
            </button>
            <span className="text-[12px] text-zinc-400 font-medium">통화 종료</span>
          </div>
        )}
      </div>
    </div>
  );
};
