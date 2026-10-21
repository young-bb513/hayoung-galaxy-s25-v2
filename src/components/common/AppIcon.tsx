import React from 'react';
import { AppId } from '../../types/phone';

interface AppIconProps {
  appId: AppId;
  size?: 'sm' | 'md' | 'lg' | 'folder-preview';
  badge?: number | string;
  showBadge?: boolean;
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  appId,
  size = 'md',
  badge,
  showBadge = false,
  className = '',
}) => {
  // Dimension classes based on size
  const sizeClasses = {
    'folder-preview': 'w-3.5 h-3.5 rounded-[3px]',
    sm: 'w-10 h-10 rounded-[11px]',
    md: 'w-13 h-13 rounded-[15px]',
    lg: 'w-16 h-16 rounded-[19px]',
  }[size];

  const today = new Date();
  const dayNumber = today.getDate();
  const daysKR = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = daysKR[today.getDay()];

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={`relative flex items-center justify-center overflow-hidden shadow-sm transition-transform active:scale-95 ${sizeClasses} ${className}`}
        style={{
          boxShadow:
            size === 'folder-preview'
              ? 'none'
              : '0 3px 8px -1px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)',
        }}
      >
        {/* PHONE */}
        {appId === 'phone' && (
          <div className="w-full h-full bg-gradient-to-b from-[#24CF60] to-[#149E45] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-[58%] h-[58%] fill-white" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20a1 1 0 01-1 1c-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58.11.35.03.74-.24 1.01l-2.2 2.2z" />
            </svg>
          </div>
        )}

        {/* MESSAGES */}
        {appId === 'messages' && (
          <div className="w-full h-full bg-gradient-to-b from-[#3288FF] to-[#125BDE] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-[56%] h-[56%] fill-white" aria-hidden="true">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-14 9h2v2H6v-2zm5 2h-2v-2h2v2zm5 0h-2v-2h2v2z" />
            </svg>
          </div>
        )}

        {/* MEMO (메모) */}
        {appId === 'memo' && (
          <div className="w-full h-full bg-[#FFFFFF] flex flex-col justify-between overflow-hidden shadow-sm">
            <div className="w-full h-[26%] bg-[#FFB300] flex items-center justify-center" />
            <div className="flex-1 flex flex-col justify-around px-[15%] py-[12%]">
              <div className="w-full h-[2px] bg-zinc-200 rounded-full" />
              <div className="w-full h-[2px] bg-zinc-200 rounded-full" />
              <div className="w-[70%] h-[2px] bg-zinc-200 rounded-full" />
            </div>
          </div>
        )}

        {/* VOICE RECORD (음성기록) */}
        {appId === 'voice_record' && (
          <div className="w-full h-full bg-[#1C1C1E] flex items-center justify-center">
            <div className="flex items-center gap-[1.5px] h-[55%]">
              <div className="w-[2px] h-[35%] bg-[#FF3B30] rounded-full" />
              <div className="w-[2px] h-[60%] bg-[#FF453A] rounded-full" />
              <div className="w-[2px] h-[95%] bg-[#FF3B30] rounded-full" />
              <div className="w-[2px] h-[40%] bg-[#0A84FF] rounded-full" />
              <div className="w-[2px] h-[75%] bg-[#0A84FF] rounded-full" />
              <div className="w-[2px] h-[100%] bg-[#0A84FF] rounded-full" />
              <div className="w-[2px] h-[50%] bg-[#FF3B30] rounded-full" />
            </div>
          </div>
        )}

        {/* KAKAOTALK */}
        {appId === 'kakaotalk' && (
          <div className="w-full h-full bg-[#FEE500] flex items-center justify-center">
            <div className="w-[66%] h-[60%] relative flex items-center justify-center">
              <svg viewBox="0 0 32 30" className="w-full h-full fill-[#191919]" aria-hidden="true">
                <path d="M16 1C7.716 1 1 6.223 1 12.667c0 4.103 2.732 7.7 6.942 9.715L6.5 28.5l6.76-4.48c.883.13 1.79.2 2.74.2 8.284 0 15-5.223 15-11.553C31 6.223 24.284 1 16 1z" />
              </svg>
              <span
                className="absolute font-black tracking-tighter text-[#FEE500]"
                style={{
                  fontSize: size === 'folder-preview' ? '4px' : size === 'sm' ? '9px' : '11px',
                  lineHeight: 1,
                  top: '32%',
                }}
              >
                TALK
              </span>
            </div>
          </div>
        )}

        {/* CHROME */}
        {appId === 'chrome' && (
          <div className="w-full h-full bg-white flex items-center justify-center p-[8%]">
            <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="#4285F4" />
              <path d="M12 2a10 10 0 0 1 8.66 5l-4.33 7.5A5 5 0 0 0 12 7V2z" fill="#EA4335" />
              <path d="M20.66 7A10 10 0 0 1 16.32 20.66L12 13.16a5 5 0 0 0 4.33-1.16l4.33-5z" fill="#FBBC05" />
              <path d="M16.32 20.66A10 10 0 0 1 3.34 17l4.33-7.5a5 5 0 0 0 4.33 6.16l4.32 5z" fill="#34A853" />
              <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
              <circle cx="12" cy="12" r="3.6" fill="#1A73E8" />
            </svg>
          </div>
        )}

        {/* CAMERA */}
        {appId === 'camera' && (
          <div className="w-full h-full bg-gradient-to-b from-[#2E3136] to-[#121316] flex items-center justify-center relative">
            <div className="w-[66%] h-[66%] rounded-full bg-gradient-to-tr from-[#1B1D20] to-[#45484D] flex items-center justify-center p-[8%] shadow-inner border border-white/10">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0D263B] to-[#040C14] flex items-center justify-center relative">
                <div className="w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-[#1C517A] to-[#3AB0FF] opacity-80" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
            </div>
            <div className="absolute top-2 right-2.5 w-1 h-1 rounded-full bg-[#FF3B30]" />
          </div>
        )}

        {/* CONTACTS */}
        {appId === 'contacts' && (
          <div className="w-full h-full bg-gradient-to-b from-[#FF8D1A] to-[#E35400] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-[56%] h-[56%] fill-white" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        {/* GALLERY */}
        {appId === 'gallery' && (
          <div className="w-full h-full bg-gradient-to-b from-[#FF2B66] to-[#DB0A46] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-[62%] h-[62%]" aria-hidden="true">
              <circle cx="12" cy="7.2" r="3" fill="#FFFFFF" opacity="0.95" />
              <circle cx="16.2" cy="9.6" r="3" fill="#FFFFFF" opacity="0.95" />
              <circle cx="16.2" cy="14.4" r="3" fill="#FFFFFF" opacity="0.95" />
              <circle cx="12" cy="16.8" r="3" fill="#FFFFFF" opacity="0.95" />
              <circle cx="7.8" cy="14.4" r="3" fill="#FFFFFF" opacity="0.95" />
              <circle cx="7.8" cy="9.6" r="3" fill="#FFFFFF" opacity="0.95" />
              <circle cx="12" cy="12" r="2.2" fill="#FFE58F" />
            </svg>
          </div>
        )}

        {/* CALENDAR */}
        {appId === 'calendar' && (
          <div className="w-full h-full bg-white flex flex-col items-center justify-between overflow-hidden">
            <div className="w-full bg-[#00897B] text-white flex items-center justify-center py-[2%] text-[9px] font-bold tracking-wider">
              {size !== 'folder-preview' && dayName}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span
                className="font-bold text-[#1F2937]"
                style={{
                  fontSize: size === 'folder-preview' ? '7px' : size === 'sm' ? '15px' : '22px',
                  lineHeight: 1,
                }}
              >
                {dayNumber}
              </span>
            </div>
          </div>
        )}

        {/* INSTAGRAM */}
        {appId === 'instagram' && (
          <div className="w-full h-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center p-[15%]">
            <div className="w-full h-full border-[2.2px] border-white rounded-[26%] flex items-center justify-center relative">
              <div className="w-[46%] h-[46%] border-[2px] border-white rounded-full" />
              <div className="absolute top-[12%] right-[14%] w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
        )}

        {/* FROMM */}
        {appId === 'fromm' && (
          <div className="w-full h-full bg-gradient-to-br from-[#FF4E50] to-[#F9D423] flex items-center justify-center relative">
            <svg viewBox="0 0 24 24" className="w-[60%] h-[60%] fill-white" aria-hidden="true">
              <path d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" />
            </svg>
          </div>
        )}

        {/* NOL */}
        {appId === 'nol' && (
          <div className="w-full h-full bg-gradient-to-tr from-[#0047FF] to-[#00D2FF] flex items-center justify-center">
            <span
              className="font-black text-white italic tracking-tighter"
              style={{
                fontSize: size === 'folder-preview' ? '6px' : size === 'sm' ? '13px' : '17px',
              }}
            >
              NOL
            </span>
          </div>
        )}

        {/* SETTINGS */}
        {appId === 'settings' && (
          <div className="w-full h-full bg-gradient-to-b from-[#94A3B8] to-[#475569] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-[58%] h-[58%] fill-white" aria-hidden="true">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </div>
        )}

        {/* CHATGPT */}
        {appId === 'chatgpt' && (
          <div className="w-full h-full bg-white flex items-center justify-center p-[15%] border border-zinc-200">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-zinc-900" aria-hidden="true">
              <path d="M22.28 9.54a5.94 5.94 0 0 0-.52-4.91 6.05 6.05 0 0 0-4.32-2.91 5.99 5.99 0 0 0-5.18 1.34 6 6 0 0 0-7.39 2.53 6.03 6.03 0 0 0-.82 5.22 6 6 0 0 0 .52 4.91 6.05 6.05 0 0 0 4.32 2.91 5.96 5.96 0 0 0 5.18-1.34 6 6 0 0 0 7.39-2.53 6.03 6.03 0 0 0 .82-5.22zm-7.65 11.23a4.53 4.53 0 0 1-2.94-1.07l.15-.08 4.88-2.82a.74.74 0 0 0 .37-.65v-6.9l2.08 1.2a.1.1 0 0 1 .05.07v6.07a4.57 4.57 0 0 1-4.59 4.18zM4.42 17.5a4.54 4.54 0 0 1-.58-3.09l.15.09 4.88 2.82c.23.13.37.38.37.65v6.9l-2.08-1.2a.1.1 0 0 1-.05-.07l-.01-6.07a4.57 4.57 0 0 1-2.68-.03zm-1.8-8.7a4.55 4.55 0 0 1 2.37-2.02v5.82c0 .27.14.52.37.65l5.98 3.45-2.08 1.2a.1.1 0 0 1-.09 0l-5.25-3.03a4.57 4.57 0 0 1-1.3-6.07zm14.6-2.55l-4.88 2.82a.74.74 0 0 0-.37.65v6.9l-2.08-1.2a.1.1 0 0 1-.05-.07V9.88a4.57 4.57 0 0 1 7.38-3.63zm3.01 5.63a4.55 4.55 0 0 1-2.37 2.02V8.08a.74.74 0 0 0-.37-.65L11.51 3.98l2.08-1.2a.1.1 0 0 1 .09 0l5.25 3.03a4.57 4.57 0 0 1 1.3 6.07zM9.49 13.5l2.51-1.45 2.51 1.45v2.9l-2.51 1.45-2.51-1.45v-2.9z" />
            </svg>
          </div>
        )}

        {/* SPELLCHECK (우리말 맞춤법) */}
        {appId === 'spellcheck' && (
          <div className="w-full h-full bg-[#FF3B5C] flex flex-col items-center justify-center p-1 text-white">
            <span
              className="font-bold leading-tight tracking-tighter text-center"
              style={{
                fontSize: size === 'folder-preview' ? '4px' : size === 'sm' ? '8px' : '10.5px',
              }}
            >
              우리말
              <br />
              맞춤법
            </span>
          </div>
        )}
      </div>

      {/* Red Notification Badge */}
      {showBadge && badge && size !== 'folder-preview' && (
        <div className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#FF3B30] border-[1.5px] border-white flex items-center justify-center text-white text-[9.5px] font-bold shadow-md z-10 leading-none">
          {badge}
        </div>
      )}
    </div>
  );
};
