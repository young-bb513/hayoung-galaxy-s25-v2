import React, { ReactNode } from 'react';

interface GalaxyFrameProps {
  children: ReactNode;
  onPowerButton?: () => void;
  onVolumeUp?: () => void;
  onVolumeDown?: () => void;
}

export const GalaxyFrame: React.FC<GalaxyFrameProps> = ({
  children,
  onPowerButton,
  onVolumeUp,
  onVolumeDown,
}) => {
  return (
    <div className="relative w-full h-screen h-[100dvh] flex items-center justify-center overflow-hidden bg-[#090A0F] sm:p-4 md:p-6 select-none">
      {/* Subtle ambient glow behind phone */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl pointer-events-none" />

      {/* Galaxy S25 Hardware Outer Housing */}
      <div className="relative flex items-center justify-center h-full max-h-[100dvh] sm:max-h-[96dvh] sm:py-2">
        {/* Physical hardware buttons on the right edge */}
        <div className="absolute -right-[4px] top-[24%] flex flex-col gap-3.5 z-0 hidden sm:flex">
          {/* Volume Key (One-piece rocker) */}
          <div className="flex flex-col gap-[2px]">
            <button
              type="button"
              onClick={onVolumeUp}
              title="볼륨 올리기"
              aria-label="볼륨 올리기"
              className="w-[3px] h-9 bg-zinc-600 hover:bg-zinc-400 active:w-[2px] rounded-r-xs transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={onVolumeDown}
              title="볼륨 내리기"
              aria-label="볼륨 내리기"
              className="w-[3px] h-9 bg-zinc-600 hover:bg-zinc-400 active:w-[2px] rounded-r-xs transition-all shadow-sm"
            />
          </div>
          {/* Side Key / Power Key */}
          <button
            type="button"
            onClick={onPowerButton}
            title="측면 버튼 (화면 끄기/켜기)"
            aria-label="측면 전원 버튼"
            className="w-[3px] h-12 bg-zinc-600 hover:bg-zinc-400 active:w-[2px] rounded-r-xs transition-all shadow-sm"
          />
        </div>

        {/* Galaxy S25 Device Chasis */}
        <div
          className="relative flex flex-col bg-black rounded-[42px] sm:rounded-[44px] shadow-2xl p-[3px] sm:p-[3.5px] border border-zinc-700/60 ring-1 ring-white/10"
          style={{
            // Galaxy S25 standard screen aspect ratio: 9 / 19.5
            aspectRatio: '9 / 19.5',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100vw',
          }}
        >
          {/* Ultra-narrow uniform bezel & screen glass */}
          <div className="relative w-full h-full rounded-[38px] sm:rounded-[40px] overflow-hidden bg-black flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
