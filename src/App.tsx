import React, { useState, useEffect, useRef } from 'react';
import { ScreenState, AppId } from './types/phone';
import { GalaxyFrame } from './components/device/GalaxyFrame';
import { StatusBar } from './components/device/StatusBar';
import { NavigationBar } from './components/device/NavigationBar';
import { LockScreen } from './components/lockscreen/LockScreen';
import { HomeScreen } from './components/homescreen/HomeScreen';
import { AppScreen } from './components/apps/AppScreen';
import { NotificationBanner } from './components/common/NotificationBanner';
import { InCallOverlay, ActiveCall } from './components/phone/InCallOverlay';

export default function App() {
  // Screen state starts directly at 'lock'
  const [screen, setScreen] = useState<ScreenState>('lock');
  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [openedFolderId, setOpenedFolderId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [batteryLevel] = useState<number>(84);

  // 10월 20일 카카오톡 알림 및 스트리밍 상태
  const [showKakaoNotification, setShowKakaoNotification] = useState(false);
  const [kakaoInitialRoom, setKakaoInitialRoom] = useState<string | null>(null);
  const [start1020Stream, setStart1020Stream] = useState(false);
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const notificationTriggeredRef = useRef(false);

  // 일반전화 통화 화면 (Galaxy One UI 가상 통화) 상태
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [phoneDefaultTab, setPhoneDefaultTab] = useState<'keypad' | 'recents' | 'contacts'>('keypad');
  const [phoneHighlightContact, setPhoneHighlightContact] = useState<string | undefined>(undefined);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Unlock phone handler:
  // "사용자가 웹사이트에 접속해 잠금화면을 해제하고 처음 홈화면에 진입한 시점부터 7초 후 카카오톡 알림을 표시합니다."
  const handleUnlock = () => {
    setScreen('home');
    setOpenedFolderId(null);

    // 잠금 해제 완료 시점부터 정확히 7초 후 알림 발생 타이머 가동
    if (!notificationTriggeredRef.current) {
      if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = setTimeout(() => {
        notificationTriggeredRef.current = true;
        setShowKakaoNotification(true);
      }, 7000);
    }
  };

  // Lock phone handler (via hardware side key)
  const handleToggleLock = () => {
    if (screen === 'lock') {
      handleUnlock();
    } else {
      setScreen('lock');
      setActiveAppId(null);
      setOpenedFolderId(null);
      setShowKakaoNotification(false);
    }
  };

  // Click Kakao Notification Banner
  // "알림을 클릭하면 카카오톡의 바보박지원 채팅방으로 이동합니다."
  const handleClickNotification = () => {
    setShowKakaoNotification(false);
    setActiveAppId('kakaotalk');
    setKakaoInitialRoom('jiwon');
    setStart1020Stream(true);
    setScreen('app');
  };

  // Open an application
  const handleOpenApp = (appId: AppId) => {
    setActiveAppId(appId);
    setOpenedFolderId(null);
    if (appId === 'kakaotalk') {
      setKakaoInitialRoom(null);
    }
    if (appId === 'phone') {
      setPhoneDefaultTab('keypad');
      setPhoneHighlightContact(undefined);
    }
    setScreen('app');
  };

  // Quick launch from lock screen shortcuts
  const handleQuickLaunch = (appId: AppId) => {
    setActiveAppId(appId);
    setOpenedFolderId(null);
    setScreen('app');
  };

  // Navigation handlers
  const handleHome = () => {
    if (openedFolderId) {
      setOpenedFolderId(null);
      return;
    }
    if (screen === 'app') {
      setActiveAppId(null);
      setScreen('home');
    }
  };

  const childBackHandlerRef = useRef<(() => boolean) | null>(null);

  const handleBack = () => {
    if (openedFolderId) {
      setOpenedFolderId(null);
      return;
    }
    if (screen === 'app') {
      if (childBackHandlerRef.current && childBackHandlerRef.current()) {
        return;
      }
      setActiveAppId(null);
      setScreen('home');
    }
  };

  // 10월 9일 이벤트: 박지원에게서 일반전화가 걸려옴
  const handleTrigger1009Call = () => {
    setActiveCall({
      status: 'incoming',
      contactName: '바보박지원',
      contactAvatar: '/assets/aistudio/21830_e53cbb79.png',
      scenario: 'event_1009',
    });
  };

  // 10월 17일 이벤트: 전화 앱의 최근 통화 화면으로 이동
  const handleTrigger1017Call = () => {
    setActiveAppId('phone');
    setPhoneDefaultTab('recents');
    setPhoneHighlightContact('jiwon');
    setScreen('app');
  };

  const handleStartCall = (call: ActiveCall) => {
    setActiveCall(call);
  };

  // Determine system bars theme
  const isDarkApp = activeAppId === 'camera' || activeAppId === 'fromm' || activeAppId === 'voice_record';
  const systemTheme: 'light' | 'dark' =
    screen === 'lock' || screen === 'home' || isDarkApp ? 'light' : 'dark';

  return (
    <GalaxyFrame onPowerButton={handleToggleLock}>
      <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black select-none">
        {/* =========================================================
            SCREEN 1: LOCK SCREEN
            ========================================================= */}
        {screen === 'lock' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <StatusBar
              theme="light"
              currentTime={currentTime}
              batteryLevel={batteryLevel}
              showCarrier={true}
            />
            <div className="relative flex-1 w-full overflow-hidden">
              <LockScreen
                currentTime={currentTime}
                onUnlock={handleUnlock}
                onQuickLaunch={handleQuickLaunch}
              />
            </div>
          </div>
        )}

        {/* =========================================================
            SCREEN 2: HOME SCREEN
            ========================================================= */}
        {screen === 'home' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 z-0 bg-zinc-950 pointer-events-none">
              <img
                src="/assets/aistudio/21826_7df2e4f2.jpg"
                alt="Home Screen Wallpaper"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55 pointer-events-none" />
            </div>

            <StatusBar
              theme="light"
              currentTime={currentTime}
              batteryLevel={batteryLevel}
              showCarrier={false}
            />

            <div className="relative z-10 flex-1 w-full overflow-hidden">
              <HomeScreen
                openedFolderId={openedFolderId}
                onOpenApp={handleOpenApp}
                onOpenFolder={(folderId) => setOpenedFolderId(folderId)}
                onCloseFolder={() => setOpenedFolderId(null)}
              />
            </div>

            <NavigationBar
              theme="light"
              onRecent={() => {}}
              onHome={handleHome}
              onBack={handleBack}
            />
          </div>
        )}

        {/* =========================================================
            SCREEN 3: APP SCREEN
            ========================================================= */}
        {screen === 'app' && activeAppId && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-white">
            <StatusBar
              theme={systemTheme}
              currentTime={currentTime}
              batteryLevel={batteryLevel}
              showCarrier={false}
            />
            <div className="relative flex-1 w-full overflow-hidden">
              <AppScreen
                appId={activeAppId}
                onBack={handleBack}
                onHome={handleHome}
                onRegisterBackHandler={(handler) => {
                  childBackHandlerRef.current = handler;
                }}
                initialKakaoRoom={kakaoInitialRoom}
                start1020Stream={start1020Stream}
                onStartCall={handleStartCall}
                onTrigger1009Call={handleTrigger1009Call}
                onTrigger1017Call={handleTrigger1017Call}
                phoneDefaultTab={phoneDefaultTab}
                phoneHighlightContact={phoneHighlightContact}
                onOpenKakaoChat={() => {
                  setActiveAppId('kakaotalk');
                  setKakaoInitialRoom('jiwon');
                }}
              />
            </div>
            <NavigationBar
              theme={systemTheme}
              onRecent={() => {}}
              onHome={handleHome}
              onBack={handleBack}
            />
          </div>
        )}

        {/* =========================================================
            ONE UI HEADS-UP NOTIFICATION BANNER (7초 후 카카오톡 알림)
            ========================================================= */}
        {showKakaoNotification && screen !== 'lock' && (
          <NotificationBanner
            sender="바보박지원"
            message="언니 왜 내 눈 피해?"
            time="지금"
            onClick={handleClickNotification}
            onDismiss={() => setShowKakaoNotification(false)}
          />
        )}

        {/* =========================================================
            GALAXY S25 ONE UI 가상 일반전화 통화 오버레이 화면
            ========================================================= */}
        {activeCall && (
          <InCallOverlay
            call={activeCall}
            onAccept={() =>
              setActiveCall((prev) =>
                prev ? { ...prev, status: 'connected' } : null
              )
            }
            onReject={() => setActiveCall(null)}
            onEndCall={() => setActiveCall(null)}
          />
        )}
      </div>
    </GalaxyFrame>
  );
}
