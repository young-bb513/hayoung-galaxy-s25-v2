import React, { useState } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  Phone,
  Video,
  MessageSquare,
  MessageCircle,
  Share2,
  Star,
  ChevronLeft,
} from 'lucide-react';
import { KAKAO_FRIENDS_LIST, KakaoFriend, HAYOUNG_PROFILE } from '../../data/kakaoData';
import { ActiveCall } from '../phone/InCallOverlay';

interface ContactsAppProps {
  onStartCall: (call: ActiveCall) => void;
  onOpenKakaoChat?: () => void;
}

export const ContactsApp: React.FC<ContactsAppProps> = ({
  onStartCall,
  onOpenKakaoChat,
}) => {
  const [selectedContact, setSelectedContact] = useState<KakaoFriend | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = KAKAO_FRIENDS_LIST.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (contact: KakaoFriend) => {
    onStartCall({
      status: 'outgoing',
      contactName: contact.name,
      contactAvatar: contact.avatarImage,
      scenario: contact.id === 'jiwon' ? 'event_1017' : 'manual',
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white select-none overflow-hidden">
      {/* ==================== CONTACTS LIST VIEW ==================== */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-zinc-100">
        <span className="text-[20px] font-bold text-zinc-900">연락처</span>
        <div className="flex items-center gap-4 text-zinc-700">
          <Search size={20} className="cursor-pointer" />
          <Plus size={20} className="cursor-pointer" />
          <MoreVertical size={20} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* 내 프로필 카드 (송하영) */}
        <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl border border-zinc-200/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10 shadow-2xs shrink-0 bg-amber-50">
              <img
                src={HAYOUNG_PROFILE.avatarImage}
                alt="송하영"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-zinc-900">송하영</span>
              <span className="text-[11.5px] text-zinc-400">내 프로필</span>
            </div>
          </div>
        </div>

        {/* 11개 연락처 목록 */}
        <div className="mt-1 flex flex-col">
          <div className="text-[11px] font-semibold text-zinc-400 px-1 pb-1">
            연락처 {filteredContacts.length}
          </div>

          <div className="divide-y divide-zinc-100">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="py-2.5 px-1 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10.5 h-10.5 rounded-full overflow-hidden border border-black/10 shadow-2xs flex items-center justify-center shrink-0 bg-zinc-100">
                    {contact.avatarImage ? (
                      <img
                        src={contact.avatarImage}
                        alt={contact.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-tr ${
                          contact.avatarBg || 'from-zinc-200 to-zinc-300'
                        } flex items-center justify-center text-zinc-800 font-bold text-[13px]`}
                      >
                        {contact.avatarText || contact.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14.5px] font-semibold text-zinc-900">
                      {contact.name}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {contact.relationship || '연락처'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-zinc-600">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCall(contact);
                    }}
                    aria-label={`${contact.name}에게 전화 걸기`}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-emerald-50 active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    <Phone size={15} className="text-[#20C05C]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== CONTACT DETAIL FULL MODAL ==================== */}
      {selectedContact && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between select-none animate-fadeIn">
          {/* Top Bar */}
          <div className="h-12 px-2 flex items-center justify-between border-b border-zinc-100">
            <button
              type="button"
              onClick={() => setSelectedContact(null)}
              className="w-9 h-9 flex items-center justify-center text-zinc-700 hover:text-black cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-[15px] font-bold text-zinc-800">연락처 상세</span>
            <div className="flex items-center gap-2 pr-2 text-zinc-700">
              <Star size={18} className="cursor-pointer" />
              <Share2 size={18} className="cursor-pointer" />
            </div>
          </div>

          {/* Profile Card Center */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-200 shadow-lg mb-3 bg-zinc-100 flex items-center justify-center">
              {selectedContact.avatarImage ? (
                <img
                  src={selectedContact.avatarImage}
                  alt={selectedContact.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-tr ${
                    selectedContact.avatarBg || 'from-zinc-200 to-zinc-300'
                  } flex items-center justify-center text-zinc-800 font-bold text-[30px]`}
                >
                  {selectedContact.avatarText || selectedContact.name.slice(0, 1)}
                </div>
              )}
            </div>

            <h2 className="text-[22px] font-bold text-zinc-900 tracking-tight">
              {selectedContact.name}
            </h2>

            {selectedContact.relationship && (
              <span className="mt-1.5 px-3 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[12px] font-medium">
                {selectedContact.relationship}
              </span>
            )}

            {/* Quick Action Circles */}
            <div className="mt-8 flex items-center justify-center gap-6">
              {/* 통화 */}
              <button
                type="button"
                onClick={() => handleCall(selectedContact)}
                className="flex flex-col items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#20C05C] flex items-center justify-center text-white shadow-md">
                  <Phone size={22} className="fill-white" />
                </div>
                <span className="text-[11.5px] font-medium text-zinc-700">통화</span>
              </button>

              {/* 영상통화 */}
              <button
                type="button"
                onClick={() => handleCall(selectedContact)}
                className="flex flex-col items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                  <Video size={22} />
                </div>
                <span className="text-[11.5px] font-medium text-zinc-700">영상통화</span>
              </button>

              {/* 메시지 */}
              <button
                type="button"
                className="flex flex-col items-center gap-1.5 active:scale-95 cursor-pointer text-zinc-600"
              >
                <div className="w-13 h-13 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
                  <MessageSquare size={20} />
                </div>
                <span className="text-[11.5px] font-medium text-zinc-700">메시지</span>
              </button>

              {/* 카카오톡 */}
              {selectedContact.id === 'jiwon' && onOpenKakaoChat && (
                <button
                  type="button"
                  onClick={onOpenKakaoChat}
                  className="flex flex-col items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 rounded-full bg-[#FEE500] border border-[#E0C900] flex items-center justify-center text-[#191919] shadow-md">
                    <MessageCircle size={22} className="fill-current" />
                  </div>
                  <span className="text-[11.5px] font-medium text-zinc-700">카톡</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-4" />
        </div>
      )}
    </div>
  );
};
