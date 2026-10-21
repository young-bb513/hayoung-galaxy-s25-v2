import React, { useState } from 'react';
import {
  Phone as PhoneIcon,
  Video,
  Search,
  MoreVertical,
  Delete,
  ArrowUpRight,
  ArrowDownLeft,
  PhoneMissed,
  MessageSquare,
  Info,
  User,
} from 'lucide-react';
import { INITIAL_CALL_RECORDS, CallRecord } from '../../data/callData';
import { KAKAO_FRIENDS_LIST, KakaoFriend } from '../../data/kakaoData';
import { ActiveCall } from '../phone/InCallOverlay';

interface PhoneAppProps {
  onStartCall: (call: ActiveCall) => void;
  defaultTab?: 'keypad' | 'recents' | 'contacts';
  highlightContact?: string;
}

export const PhoneApp: React.FC<PhoneAppProps> = ({
  onStartCall,
  defaultTab = 'keypad',
  highlightContact,
}) => {
  const [activeTab, setActiveTab] = useState<'keypad' | 'recents' | 'contacts'>(defaultTab);
  const [dialNumber, setDialNumber] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(
    highlightContact === 'jiwon' ? 'call_17_1' : null
  );
  const [selectedContact, setSelectedContact] = useState<KakaoFriend | null>(null);

  const handleDigit = (digit: string) => {
    if (dialNumber.length < 15) {
      setDialNumber((prev) => prev + digit);
    }
  };

  const handleDeleteDigit = () => {
    setDialNumber((prev) => prev.slice(0, -1));
  };

  const handleCallNumber = () => {
    const targetName = dialNumber || '바보박지원';
    onStartCall({
      status: 'outgoing',
      contactName: targetName,
      scenario: 'manual',
    });
  };

  const handleCallRecord = (record: CallRecord) => {
    const isJiwon1017 = record.id === 'call_17_1' || highlightContact === 'jiwon';
    onStartCall({
      status: 'outgoing',
      contactName: record.name,
      contactAvatar: record.avatarImage,
      scenario: isJiwon1017 ? 'event_1017' : 'manual',
    });
  };

  const handleCallContact = (contact: KakaoFriend) => {
    onStartCall({
      status: 'outgoing',
      contactName: contact.name,
      contactAvatar: contact.avatarImage,
      scenario: contact.id === 'jiwon' ? 'event_1017' : 'manual',
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white select-none overflow-hidden">
      {/* ==================== TAB 1: KEYPAD (키패드) ==================== */}
      {activeTab === 'keypad' && (
        <div className="flex-1 flex flex-col justify-between pb-3 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 flex items-center justify-between">
            <span className="text-[20px] font-bold text-zinc-900">전화</span>
            <div className="flex items-center gap-4 text-zinc-700">
              <Search size={20} className="cursor-pointer" />
              <MoreVertical size={20} className="cursor-pointer" />
            </div>
          </div>

          {/* Dialed Number Display */}
          <div className="h-16 flex items-center justify-center px-6 relative">
            <span className="text-[28px] font-semibold text-zinc-900 tracking-wider">
              {dialNumber}
            </span>
            {dialNumber && (
              <button
                type="button"
                onClick={handleDeleteDigit}
                aria-label="번호 지우기"
                className="absolute right-7 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-600 active:scale-95 cursor-pointer"
              >
                <Delete size={20} />
              </button>
            )}
          </div>

          {/* Keypad Grid (Galaxy One UI Dialpad) */}
          <div className="px-8 my-auto">
            <div className="grid grid-cols-3 gap-y-3 gap-x-6 text-center max-w-[270px] mx-auto w-full">
              {[
                { n: '1', sub: '' },
                { n: '2', sub: 'ABC' },
                { n: '3', sub: 'DEF' },
                { n: '4', sub: 'GHI' },
                { n: '5', sub: 'JKL' },
                { n: '6', sub: 'MNO' },
                { n: '7', sub: 'PQRS' },
                { n: '8', sub: 'TUV' },
                { n: '9', sub: 'WXYZ' },
                { n: '*', sub: '' },
                { n: '0', sub: '+' },
                { n: '#', sub: '' },
              ].map((item) => (
                <button
                  key={item.n}
                  type="button"
                  onClick={() => handleDigit(item.n)}
                  className="w-15 h-15 rounded-full bg-zinc-100/90 hover:bg-zinc-200 active:scale-90 flex flex-col items-center justify-center transition-all mx-auto cursor-pointer"
                >
                  <span className="text-[22px] font-semibold text-zinc-900 leading-none">
                    {item.n}
                  </span>
                  {item.sub && (
                    <span className="text-[8px] font-bold text-zinc-400 leading-none mt-1">
                      {item.sub}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Big Green Call Button */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={handleCallNumber}
                aria-label="통화 걸기"
                className="w-16 h-16 rounded-full bg-[#20C05C] hover:bg-[#19a74e] active:scale-95 flex items-center justify-center text-white shadow-lg transition-all cursor-pointer"
              >
                <PhoneIcon size={26} className="fill-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: RECENTS (최근기록) ==================== */}
      {activeTab === 'recents' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-zinc-100">
            <span className="text-[20px] font-bold text-zinc-900">최근기록</span>
            <div className="flex items-center gap-4 text-zinc-700">
              <Search size={20} className="cursor-pointer" />
              <MoreVertical size={20} className="cursor-pointer" />
            </div>
          </div>

          {/* Call Records List */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-100/80">
            {INITIAL_CALL_RECORDS.map((record) => {
              const isSelected = selectedRecordId === record.id;
              const isJiwon = record.contactId === 'jiwon';

              return (
                <div key={record.id} className="flex flex-col transition-colors">
                  <div
                    onClick={() =>
                      setSelectedRecordId(isSelected ? null : record.id)
                    }
                    className={`px-4 py-3 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 cursor-pointer ${
                      isSelected ? 'bg-zinc-50/80' : ''
                    } ${isJiwon && highlightContact === 'jiwon' ? 'bg-amber-50/70 border-l-4 border-amber-400' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-black/10 shadow-2xs shrink-0 bg-zinc-100 flex items-center justify-center">
                        {record.avatarImage ? (
                          <img
                            src={record.avatarImage}
                            alt={record.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-bold text-zinc-700 text-[14px]">
                            {record.name.slice(0, 1)}
                          </span>
                        )}
                      </div>

                      {/* Name & Call Direction */}
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[14.5px] font-semibold truncate ${
                              record.type === 'missed' ? 'text-red-600' : 'text-zinc-900'
                            }`}
                          >
                            {record.name}
                          </span>
                          {record.count && (
                            <span className="text-[12px] text-zinc-400">
                              ({record.count})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-[11.5px] text-zinc-400 mt-0.5">
                          {record.type === 'missed' ? (
                            <PhoneMissed size={12} className="text-red-500" />
                          ) : record.type === 'outgoing' ? (
                            <ArrowUpRight size={12} className="text-[#20C05C]" />
                          ) : (
                            <ArrowDownLeft size={12} className="text-blue-500" />
                          )}
                          <span>
                            {record.media === 'video' ? '영상통화' : '휴대전화'}
                          </span>
                          {record.duration && (
                            <span>· {record.duration}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Date & Time */}
                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <span className="text-[11.5px] text-zinc-500 font-medium">
                        {record.date}
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">
                        {record.time}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Action Drawer */}
                  {isSelected && (
                    <div className="px-6 py-2.5 bg-zinc-50 flex items-center justify-around border-t border-b border-zinc-200/50 animate-fadeIn">
                      <button
                        type="button"
                        onClick={() => handleCallRecord(record)}
                        className="flex flex-col items-center gap-1 text-[#20C05C] active:scale-95 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#20C05C]/15 flex items-center justify-center">
                          <PhoneIcon size={18} className="fill-[#20C05C]" />
                        </div>
                        <span className="text-[10.5px] font-medium text-zinc-700">통화</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCallRecord(record)}
                        className="flex flex-col items-center gap-1 text-emerald-600 active:scale-95 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                          <Video size={18} />
                        </div>
                        <span className="text-[10.5px] font-medium text-zinc-700">영상통화</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const c = KAKAO_FRIENDS_LIST.find((f) => f.id === record.contactId);
                          if (c) setSelectedContact(c);
                        }}
                        className="flex flex-col items-center gap-1 text-zinc-600 active:scale-95 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center">
                          <Info size={18} />
                        </div>
                        <span className="text-[10.5px] font-medium text-zinc-700">상세정보</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 3: CONTACTS (연락처) ==================== */}
      {activeTab === 'contacts' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-5 py-3 flex items-center justify-between border-b border-zinc-100">
            <span className="text-[20px] font-bold text-zinc-900">연락처</span>
            <div className="flex items-center gap-4 text-zinc-700">
              <Search size={20} className="cursor-pointer" />
              <MoreVertical size={20} className="cursor-pointer" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col divide-y divide-zinc-100">
            {KAKAO_FRIENDS_LIST.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="py-2.5 px-1 flex items-center justify-between hover:bg-zinc-50 active:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 shadow-2xs flex items-center justify-center shrink-0 bg-zinc-100">
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

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCallContact(contact);
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-emerald-50 active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  <PhoneIcon size={15} className="text-[#20C05C]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== CONTACT DETAIL MODAL ==================== */}
      {selectedContact && (
        <div className="absolute inset-0 z-40 bg-white flex flex-col justify-between select-none animate-fadeIn">
          {/* Header */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-zinc-100">
            <button
              type="button"
              onClick={() => setSelectedContact(null)}
              className="text-[14px] text-zinc-600 font-medium hover:text-black cursor-pointer"
            >
              닫기
            </button>
            <span className="text-[15px] font-bold text-zinc-800">연락처 상세</span>
            <div className="w-8" />
          </div>

          {/* Profile Center */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-200 shadow-md mb-3 bg-zinc-100 flex items-center justify-center">
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
                  } flex items-center justify-center text-zinc-800 font-bold text-[28px]`}
                >
                  {selectedContact.avatarText || selectedContact.name.slice(0, 1)}
                </div>
              )}
            </div>

            <h3 className="text-[20px] font-bold text-zinc-900 tracking-tight">
              {selectedContact.name}
            </h3>

            {selectedContact.relationship && (
              <span className="mt-1 px-3 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[12px] font-medium">
                {selectedContact.relationship}
              </span>
            )}

            {/* Action Bar */}
            <div className="mt-8 flex items-center gap-5">
              {/* 통화 */}
              <button
                type="button"
                onClick={() => {
                  handleCallContact(selectedContact);
                  setSelectedContact(null);
                }}
                className="flex flex-col items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#20C05C] flex items-center justify-center text-white shadow-md">
                  <PhoneIcon size={22} className="fill-white" />
                </div>
                <span className="text-[11.5px] font-medium text-zinc-700">통화</span>
              </button>

              {/* 영상통화 */}
              <button
                type="button"
                onClick={() => {
                  handleCallContact(selectedContact);
                  setSelectedContact(null);
                }}
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
            </div>
          </div>

          <div className="p-4" />
        </div>
      )}

      {/* ==================== BOTTOM 3 TABS (키패드, 최근기록, 연락처) ==================== */}
      <div className="h-13 border-t border-zinc-150 px-6 flex items-center justify-around text-zinc-400 text-[12px] font-medium bg-white">
        <button
          type="button"
          onClick={() => setActiveTab('keypad')}
          className={`py-2 px-3 transition-colors cursor-pointer ${
            activeTab === 'keypad' ? 'text-[#20C05C] font-bold' : 'hover:text-zinc-600'
          }`}
        >
          키패드
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('recents')}
          className={`py-2 px-3 transition-colors cursor-pointer ${
            activeTab === 'recents' ? 'text-[#20C05C] font-bold' : 'hover:text-zinc-600'
          }`}
        >
          최근기록
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contacts')}
          className={`py-2 px-3 transition-colors cursor-pointer ${
            activeTab === 'contacts' ? 'text-[#20C05C] font-bold' : 'hover:text-zinc-600'
          }`}
        >
          연락처
        </button>
      </div>
    </div>
  );
};
