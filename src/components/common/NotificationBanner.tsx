import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface NotificationBannerProps {
  sender: string;
  message: string;
  time?: string;
  onClick: () => void;
  onDismiss?: () => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  sender,
  message,
  time = '지금',
  onClick,
  onDismiss,
}) => {
  return (
    <div className="absolute top-8 left-0 right-0 z-50 px-3 flex justify-center pointer-events-auto animate-slideDown">
      <div
        onClick={onClick}
        className="w-full max-w-[340px] bg-white/95 backdrop-blur-md border border-black/10 rounded-[22px] shadow-[0_8px_25px_rgba(0,0,0,0.25)] p-3.5 flex items-start gap-3 cursor-pointer hover:bg-white active:scale-98 transition-all"
      >
        {/* Kakao Yellow App Icon */}
        <div className="w-10 h-10 rounded-[13px] bg-[#FEE500] border border-[#ECD300] flex items-center justify-center text-[#191919] shadow-xs shrink-0 mt-0.5">
          <MessageCircle size={22} className="fill-current" />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-semibold text-zinc-500">카카오톡</span>
            <span className="text-[10px] text-zinc-400">{time}</span>
          </div>
          <div className="text-[14.5px] font-bold text-zinc-900 leading-tight mt-0.5 truncate">
            {sender}
          </div>
          <div className="text-[13px] text-zinc-700 leading-snug mt-0.5 line-clamp-2">
            {message}
          </div>
        </div>

        {/* Close Button if desired */}
        {onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            aria-label="알림 닫기"
            className="text-zinc-400 hover:text-zinc-600 p-1 -mr-1 -mt-1"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
