import React from 'react';
import { AppId } from '../../types/phone';
import { APPS } from '../../data/appsData';
import {
  Search,
  MoreVertical,
  Settings,
  Plus,
  MessageSquare,
  Users,
  Compass,
  ShoppingBag,
  MoreHorizontal,
  Home,
  Heart,
  Send,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Wifi,
  Volume2,
  Sun,
  Shield,
  Clock,
  Circle,
} from 'lucide-react';

import { KakaoTalkApp } from './KakaoTalkApp';
import { PhoneApp } from './PhoneApp';
import { ContactsApp } from './ContactsApp';
import { ActiveCall } from '../phone/InCallOverlay';

interface AppScreenProps {
  appId: AppId;
  onBack: () => void;
  onHome: () => void;
  onRegisterBackHandler?: (handler: () => boolean) => void;
  initialKakaoRoom?: string | null;
  start1020Stream?: boolean;
  onStartCall: (call: ActiveCall) => void;
  onTrigger1009Call: () => void;
  onTrigger1017Call: () => void;
  phoneDefaultTab?: 'keypad' | 'recents' | 'contacts';
  phoneHighlightContact?: string;
  onOpenKakaoChat?: () => void;
}

export const AppScreen: React.FC<AppScreenProps> = ({
  appId,
  onBack,
  onHome,
  onRegisterBackHandler,
  initialKakaoRoom = null,
  start1020Stream = false,
  onStartCall,
  onTrigger1009Call,
  onTrigger1017Call,
  phoneDefaultTab = 'keypad',
  phoneHighlightContact,
  onOpenKakaoChat,
}) => {
  const app = APPS[appId];

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden select-none">
      {/* Dynamic Content based on App */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* ==================== KAKAOTALK ==================== */}
        {appId === 'kakaotalk' && (
          <KakaoTalkApp
            onBackToHome={onBack}
            onRegisterBackHandler={onRegisterBackHandler}
            initialRoomId={initialKakaoRoom}
            start1020Stream={start1020Stream}
            onTrigger1009Call={onTrigger1009Call}
            onTrigger1017Call={onTrigger1017Call}
          />
        )}

        {/* ==================== CHROME ==================== */}
        {appId === 'chrome' && (
          <div className="flex-1 flex flex-col bg-zinc-50">
            {/* Chrome Top Omnibox */}
            <div className="px-3 py-2.5 bg-white border-b border-zinc-200 flex items-center gap-2">
              <div className="flex-1 h-9 bg-zinc-100 rounded-full px-3.5 flex items-center justify-between text-zinc-600 text-[13px]">
                <span className="text-zinc-800 font-medium truncate">google.com</span>
                <RotateCcw size={14} className="text-zinc-400" />
              </div>
              <div className="w-6 h-6 border-[1.5px] border-zinc-700 rounded-md flex items-center justify-center text-[11px] font-bold text-zinc-800">
                1
              </div>
              <MoreVertical size={19} className="text-zinc-700" />
            </div>

            {/* Google Clean Home View */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center">
              <div className="text-[32px] font-bold tracking-tight mb-6">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="w-full max-w-[280px] h-10 bg-white shadow-sm border border-zinc-200 rounded-full px-4 flex items-center justify-between text-zinc-400 text-[13px]">
                <span>검색어 또는 URL 입력</span>
                <Search size={16} />
              </div>
            </div>
          </div>
        )}

        {/* ==================== PHONE (전화) ==================== */}
        {appId === 'phone' && (
          <PhoneApp
            onStartCall={onStartCall}
            defaultTab={phoneDefaultTab}
            highlightContact={phoneHighlightContact}
          />
        )}

        {/* ==================== CONTACTS (연락처) ==================== */}
        {appId === 'contacts' && (
          <ContactsApp
            onStartCall={onStartCall}
            onOpenKakaoChat={onOpenKakaoChat}
          />
        )}

        {/* ==================== GALLERY (갤러리) ==================== */}
        {appId === 'gallery' && (
          <div className="flex-1 flex flex-col bg-white">
            <div className="px-5 py-3 flex items-center justify-between border-b border-zinc-100">
              <span className="text-[20px] font-bold text-zinc-900">사진</span>
              <div className="flex items-center gap-4 text-zinc-700">
                <Search size={20} />
                <MoreVertical size={20} />
              </div>
            </div>
            <div className="flex-1 p-3 grid grid-cols-3 gap-1 overflow-y-auto content-start">
              {[
                { id: 'img-1', url: '/assets/aistudio/21826_7df2e4f2.jpg' },
                { id: 'img-2', url: '/assets/aistudio/21799_bb66ace6.png' },
                { id: 'img-3', url: '/assets/aistudio/21613_bf952fdc.jpg' },
                { id: 'img-4', url: '/assets/aistudio/21820_2d95b58c.jpg' },
                { id: 'img-5', url: '/assets/aistudio/21867_6bc154e0.png' },
                { id: 'img-6', url: '/assets/aistudio/21811_dd253887.png' },
                { id: 'img-7', url: '/assets/aistudio/21817_f9de69b7.png' },
                { id: 'img-8', url: '/assets/aistudio/21830_e53cbb79.png' },
                { id: 'img-9', url: '/assets/aistudio/21785_abfbe395.png' },
              ].map((img) => (
                <div key={img.id} className="aspect-square bg-zinc-100 overflow-hidden relative group">
                  <img src={img.url} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== MEMO (메모) ==================== */}
        {appId === 'memo' && (
          <div className="flex-1 flex flex-col bg-[#FFF9E6]">
            <div className="px-5 py-3.5 flex items-center justify-between border-b border-amber-200/60 bg-[#FFF3D0]">
              <span className="text-[18px] font-bold text-amber-950">모든 메모</span>
              <div className="flex items-center gap-3 text-amber-900">
                <Search size={19} />
                <Plus size={20} />
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-amber-200/70">
                <span className="text-[14px] font-bold text-zinc-900">오늘 할 일</span>
                <p className="text-[12px] text-zinc-500 mt-1">보컬 연습, 운동, 지원이 모니터링</p>
                <span className="text-[10px] text-zinc-400 mt-2 block">2026. 10. 19</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-amber-200/70">
                <span className="text-[14px] font-bold text-zinc-900">노래 추천 리스트</span>
                <p className="text-[12px] text-zinc-500 mt-1">라라랜드 OST, 가을 플레이리스트</p>
                <span className="text-[10px] text-zinc-400 mt-2 block">2026. 10. 15</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== VOICE RECORD (음성기록) ==================== */}
        {appId === 'voice_record' && (
          <div className="flex-1 flex flex-col bg-zinc-950 text-white justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-bold tracking-tight">음성 녹음</span>
              <Settings size={20} className="text-zinc-400" />
            </div>
            <div className="flex flex-col items-center justify-center my-auto">
              <span className="text-[44px] font-light tracking-wider font-mono">00:00.0</span>
              <div className="w-full h-16 flex items-center justify-center gap-1 mt-6">
                {[8, 14, 24, 40, 20, 12, 32, 48, 16, 28, 10, 36, 18, 8].map((h, i) => (
                  <div key={i} style={{ height: `${h}px` }} className="w-1 bg-red-500/60 rounded-full" />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center pb-4">
              <button
                type="button"
                className="w-16 h-16 rounded-full bg-red-600 active:scale-95 flex items-center justify-center text-white shadow-lg"
              >
                <div className="w-6 h-6 rounded-full bg-white" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== CAMERA (카메라) ==================== */}
        {appId === 'camera' && (
          <div className="flex-1 flex flex-col bg-black text-white justify-between p-4">
            <div className="flex items-center justify-between py-2 text-zinc-400">
              <Settings size={20} />
              <div className="flex items-center gap-4 text-[13px] font-semibold text-white">
                <span className="text-amber-400">사진</span>
                <span>동영상</span>
                <span>인물</span>
              </div>
              <Sparkles size={20} />
            </div>
            <div className="flex-1 flex items-center justify-center border border-white/10 rounded-2xl my-2 bg-zinc-900/40 relative overflow-hidden">
              <img
                src="/assets/aistudio/21826_7df2e4f2.jpg"
                alt="Camera viewfinder preview"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="flex items-center justify-around py-4">
              <div className="w-11 h-11 rounded-xl bg-zinc-800 overflow-hidden border border-white/20">
                <img src="/assets/aistudio/21811_dd253887.png" alt="Recent capture" className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                className="w-17 h-17 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <div className="w-13 h-13 rounded-full bg-white" />
              </button>
              <div className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                <RotateCcw size={20} />
              </div>
            </div>
          </div>
        )}

        {/* ==================== SETTINGS (설정) ==================== */}
        {appId === 'settings' && (
          <div className="flex-1 flex flex-col bg-zinc-100">
            <div className="px-5 py-4 bg-zinc-100">
              <span className="text-[26px] font-bold text-zinc-900">설정</span>
            </div>
            <div className="p-3 flex flex-col gap-2.5">
              <div className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-2xs">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-50">
                  <img src="/assets/aistudio/21811_dd253887.png" alt="송하영" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[15px] font-bold text-zinc-900">송하영</span>
                  <span className="text-[12px] text-zinc-500">Samsung 계정</span>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
              </div>
              <div className="bg-white rounded-2xl divide-y divide-zinc-100 shadow-2xs overflow-hidden">
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                      <Wifi size={17} />
                    </div>
                    <span className="text-[14px] font-medium text-zinc-800">연결</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400" />
                </div>
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center">
                      <Volume2 size={17} />
                    </div>
                    <span className="text-[14px] font-medium text-zinc-800">소리 및 진동</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400" />
                </div>
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                      <Sun size={17} />
                    </div>
                    <span className="text-[14px] font-medium text-zinc-800">디스플레이</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for other standard apps */}
        {appId !== 'kakaotalk' &&
          appId !== 'chrome' &&
          appId !== 'phone' &&
          appId !== 'contacts' &&
          appId !== 'gallery' &&
          appId !== 'memo' &&
          appId !== 'voice_record' &&
          appId !== 'camera' &&
          appId !== 'settings' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-zinc-50">
              <div className="w-16 h-16 rounded-2xl bg-zinc-200 flex items-center justify-center text-zinc-600 mb-3 font-bold text-[20px]">
                {app?.name?.slice(0, 1) || '앱'}
              </div>
              <h3 className="text-[17px] font-bold text-zinc-900">{app?.name}</h3>
              <p className="text-[13px] text-zinc-500 mt-1">Galaxy S25 One UI 애플리케이션</p>
              <button
                type="button"
                onClick={onBack}
                className="mt-6 px-4 py-2 bg-zinc-900 text-white text-[13px] rounded-xl font-medium"
              >
                홈으로 돌아가기
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
