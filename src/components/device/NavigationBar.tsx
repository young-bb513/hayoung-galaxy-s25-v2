import React from 'react';

interface NavigationBarProps {
  theme?: 'light' | 'dark';
  onRecent?: () => void;
  onHome: () => void;
  onBack: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  theme = 'light',
  onRecent,
  onHome,
  onBack,
}) => {
  const isLight = theme === 'light';
  // Transparent styling with drop shadow for seamless blending with background
  const iconColor = isLight
    ? 'text-white/90 hover:text-white active:scale-90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
    : 'text-zinc-800 hover:text-black active:scale-90';

  return (
    <div className="w-full h-11 px-10 flex items-center justify-between select-none z-40 bg-transparent">
      {/* Recents button (|||) */}
      <button
        type="button"
        onClick={onRecent}
        aria-label="최근 실행 앱"
        className={`flex items-center justify-center w-12 h-10 transition-all ${iconColor}`}
      >
        <div className="flex items-center gap-[3.5px]">
          <div className="w-[2.5px] h-3.5 rounded-full bg-current shadow-xs" />
          <div className="w-[2.5px] h-3.5 rounded-full bg-current shadow-xs" />
          <div className="w-[2.5px] h-3.5 rounded-full bg-current shadow-xs" />
        </div>
      </button>

      {/* Home button (One UI squircle/pill) */}
      <button
        type="button"
        onClick={onHome}
        aria-label="홈으로 가기"
        className={`flex items-center justify-center w-12 h-10 transition-all ${iconColor}`}
      >
        <div className="w-3.5 h-3.5 rounded-[4px] border-[2px] border-current shadow-xs" />
      </button>

      {/* Back button (<) */}
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로 가기"
        className={`flex items-center justify-center w-12 h-10 transition-all ${iconColor}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
};
