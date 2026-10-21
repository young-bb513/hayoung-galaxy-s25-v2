import React, { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { Lock, Phone, Camera } from 'lucide-react';
import { AppId } from '../../types/phone';

interface LockScreenProps {
  currentTime: Date;
  batteryLevel?: number;
  onUnlock: () => void;
  onQuickLaunch: (appId: AppId) => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  currentTime,
  onUnlock,
  onQuickLaunch,
}) => {
  const [dragOffset, setDragOffset] = useState(0);

  // Time formatting matching Galaxy One UI (Image 5)
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');

  // Date formatting in Korean One UI style
  const month = currentTime.getMonth() + 1;
  const date = currentTime.getDate();
  const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayName = daysOfWeek[currentTime.getDay()];
  const dateText = `${month}월 ${date}일 ${dayName}`;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -50 || info.velocity.y < -250) {
      onUnlock();
    } else {
      setDragOffset(0);
    }
  };

  return (
    <motion.div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black select-none cursor-pointer"
      drag="y"
      dragConstraints={{ top: -300, bottom: 0 }}
      dragElastic={0.2}
      onDrag={(_, info) => setDragOffset(info.offset.y)}
      onDragEnd={handleDragEnd}
      onClick={onUnlock}
      animate={{
        y: dragOffset < 0 ? dragOffset : 0,
        opacity: Math.max(0.2, 1 - Math.abs(dragOffset) / 300),
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {/* 이미지 2: 잠금화면 배경화면 (21799_bb66ace6.png)
          - 원본 비율을 절대 변경하지 마세요.
          - 사진 전체가 보이도록 contain으로 표시합니다.
          - 확대, 잘림, 왜곡 금지.
          - 남는 위아래 공간은 검은색으로 표시합니다. */}
      <div className="absolute inset-0 z-0 bg-black flex items-center justify-center pointer-events-none">
        <img
          src="/assets/aistudio/21799_bb66ace6.png"
          alt="Lock Screen Wallpaper"
          className="w-full h-full object-contain pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Subtle vignette for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Top Header & Lock Screen Clock (Galaxy S25 Image 5 Style) */}
      <div className="relative z-10 pt-4 flex flex-col items-center">
        {/* Lock indicator */}
        <div className="flex items-center gap-1.5 text-white/90 mb-1 drop-shadow">
          <Lock size={16} strokeWidth={2.4} />
        </div>

        {/* Stacked Large Clock Typography matching Galaxy Lock Screen */}
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center font-normal tracking-tight text-white drop-shadow-lg leading-[0.88]">
            <span className="text-[64px]">{hours}</span>
            <span className="text-[64px]">{minutes}</span>
          </div>
          <div className="text-white/95 text-[15px] font-normal mt-2.5 drop-shadow">
            {dateText}
          </div>
        </div>
      </div>

      {/* Bottom Area: "밀어서 잠금 해제" & Shortcuts (Section D) */}
      <div className="relative z-10 pb-5 px-6 flex flex-col items-center">
        {/* "밀어서 잠금 해제" with smooth floating animation */}
        <div className="mb-6 flex flex-col items-center">
          <motion.div
            className="text-white/90 text-[13.5px] font-medium tracking-wide flex items-center gap-1 drop-shadow"
            animate={{
              opacity: [0.65, 1, 0.65],
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut',
            }}
          >
            밀어서 잠금해제
          </motion.div>
        </div>

        {/* Bottom Shortcuts: Phone (Left) and Camera (Right) */}
        <div className="w-full flex items-center justify-between">
          {/* Phone Shortcut Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickLaunch('phone');
            }}
            aria-label="전화 바로가기"
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 active:scale-90 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all shadow-lg"
          >
            <Phone size={21} className="fill-white" />
          </button>

          {/* Camera Shortcut Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickLaunch('camera');
            }}
            aria-label="카메라 바로가기"
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 active:scale-90 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all shadow-lg"
          >
            <Camera size={21} className="stroke-[2.2]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
