export interface KakaoMessage {
  id: string;
  sender: 'hayoung' | 'jiwon';
  text?: string;
  image?: string;
  time: string;
  actionType?:
    | 'facetime'
    | 'video_call_incoming'
    | 'video_call_outgoing'
    | 'video_call_missed'
    | 'call_incoming'
    | 'call_outgoing'
    | 'call_missed';
  callDuration?: string;
}

export interface KakaoDateGroup {
  date: string;
  messages: KakaoMessage[];
}

export interface KakaoFriend {
  id: string;
  name: string;
  statusMessage?: string;
  avatarColor?: string;
  avatarBg?: string;
  avatarText?: string;
  avatarImage?: string;
  backgroundImage?: string;
  isChatAvailable?: boolean;
  relationship?: string;
  phone?: string;
}

// 11개 연락처 목록 (지정된 순서 준수)
// 상태메시지: 송하영과 박지원은 지시문에 따라 없음 ('')
// 실제 전화번호가 제공되지 않았으므로 임의의 번호를 생성하지 않음
export const KAKAO_FRIENDS_LIST: KakaoFriend[] = [
  {
    id: 'makdoong',
    name: '막둥이',
    statusMessage: '열공 중 📚',
    avatarText: '헌',
    avatarBg: 'from-blue-200 to-indigo-300',
    relationship: '프로미스나인',
  },
  {
    id: 'chaeng',
    name: '챙이',
    statusMessage: '운동 가야지 💪',
    avatarText: '챙',
    avatarBg: 'from-pink-200 to-rose-300',
    relationship: '프로미스나인',
  },
  {
    id: 'kko',
    name: '꼬',
    statusMessage: '잠이 솔솔 💤',
    avatarText: '꼬',
    avatarBg: 'from-purple-200 to-violet-300',
    relationship: '프로미스나인',
  },
  {
    id: 'jiwon',
    name: '바보박지원',
    statusMessage: '', // 지시문: 상태메시지는 둘 다 없앱니다
    avatarImage: '/assets/aistudio/21830_e53cbb79.png', // 박지원 프사: 원형 프로필 사진 (21830.png)
    backgroundImage: '/assets/aistudio/21785_abfbe395.png', // 박지원 배사: 프로필 상세 화면 배경 (21785.png)
    avatarText: '지원',
    avatarBg: 'from-amber-200 to-rose-300',
    isChatAvailable: true,
    relationship: '소울메이트',
  },
  {
    id: 'manager',
    name: '매니저님',
    statusMessage: '스케줄 문의는 카톡 남겨주세요.',
    avatarText: '매',
    avatarBg: 'from-slate-200 to-zinc-400',
    relationship: '회사',
  },
  {
    id: 'ceo',
    name: '대표님',
    statusMessage: 'Always believe.',
    avatarText: '대',
    avatarBg: 'from-emerald-200 to-teal-400',
    relationship: '회사',
  },
  {
    id: 'ryujin',
    name: '류진이',
    statusMessage: '냥 🐾',
    avatarText: '류',
    avatarBg: 'from-cyan-200 to-sky-400',
    relationship: '친구',
  },
  {
    id: 'vocal_teacher',
    name: '보컬쌤',
    statusMessage: '호흡과 발성 잊지 말기! 🎤',
    avatarText: '보',
    avatarBg: 'from-yellow-200 to-amber-300',
    relationship: '레슨',
  },
  {
    id: 'sister',
    name: '울언뉘',
    statusMessage: '하영아 감기 조심해 🤍',
    avatarText: '언',
    avatarBg: 'from-fuchsia-200 to-pink-300',
    relationship: '가족',
  },
  {
    id: 'mom',
    name: '어무이❤️',
    statusMessage: '우리 딸 언제나 사랑해 🌸',
    avatarText: '엄',
    avatarBg: 'from-rose-200 to-red-300',
    relationship: '가족',
  },
  {
    id: 'dad',
    name: '아부지❤️',
    statusMessage: '건강이 최고다! 딸 파이팅 👍',
    avatarText: '아',
    avatarBg: 'from-amber-100 to-orange-300',
    relationship: '가족',
  },
];

// 송하영 본인 프로필 정보 (원형 프사 21811, 배사 21817, 상태메시지 없음)
export const HAYOUNG_PROFILE = {
  name: '송하영',
  statusMessage: '', // 지시문: 상태메시지는 둘 다 없앱니다
  avatarImage: '/assets/aistudio/21811_dd253887.png', // 송하영 프사: 원형 프로필 사진 (21811.png)
  backgroundImage: '/assets/aistudio/21817_f9de69b7.png', // 송하영 배사: 프로필 상세 화면 배경 (21817.png)
};

export const CHAT_DATA_JIWON: KakaoDateGroup[] = [
  // ==================== 2026년 10월 7일 ====================
  {
    date: '2026년 10월 7일 수요일',
    messages: [
      {
        id: 'msg_1007_1',
        sender: 'hayoung',
        image: '/assets/aistudio/21613_bf952fdc.jpg', // 사진1
        time: '오후 11:24',
      },
      {
        id: 'msg_1007_2',
        sender: 'hayoung',
        text: '와',
        time: '오후 11:24',
      },
      {
        id: 'msg_1007_3',
        sender: 'hayoung',
        text: '박지원 입술',
        time: '오후 11:24',
      },
      {
        id: 'msg_1007_4',
        sender: 'jiwon',
        text: '엥?',
        time: '오후 11:25',
      },
      {
        id: 'msg_1007_5',
        sender: 'jiwon',
        text: '얼탱없 ㅋ',
        time: '오후 11:25',
      },
      {
        id: 'msg_1007_6',
        sender: 'jiwon',
        text: '퇴근?',
        time: '오후 11:25',
      },
      {
        id: 'msg_1007_7',
        sender: 'hayoung',
        text: '우우웅우우우',
        time: '오후 11:26',
      },
      {
        id: 'msg_1007_8',
        sender: 'jiwon',
        text: '페이스톡',
        time: '오후 11:27',
        actionType: 'video_call_incoming', // 10월 7일 박지원이 건 영상통화 (수신)
        callDuration: '22:15',
      },
    ],
  },

  // ==================== 2026년 10월 8일 ====================
  {
    date: '2026년 10월 8일 목요일',
    messages: [
      {
        id: 'msg_1008_1',
        sender: 'jiwon',
        image: '/assets/aistudio/21820_2d95b58c.jpg', // 사진2 (시리얼)
        time: '오전 10:14',
      },
      {
        id: 'msg_1008_2',
        sender: 'jiwon',
        text: '오랜만에 시리얼',
        time: '오전 10:14',
      },
      {
        id: 'msg_1008_3',
        sender: 'jiwon',
        text: '밥 먹었어?',
        time: '오전 10:15',
      },
      {
        id: 'msg_1008_4',
        sender: 'hayoung',
        image: '/assets/aistudio/21867_6bc154e0.png', // 사진3 (콘플레이크)
        time: '오전 10:18',
      },
      {
        id: 'msg_1008_5',
        sender: 'hayoung',
        text: '오',
        time: '오전 10:18',
      },
      {
        id: 'msg_1008_6',
        sender: 'hayoung',
        text: '통함 ㅋㅋ',
        time: '오전 10:18',
      },
      {
        id: 'msg_1008_7',
        sender: 'hayoung',
        text: '마싰다',
        time: '오전 10:19',
      },
      {
        id: 'msg_1008_8',
        sender: 'hayoung',
        text: '전화해도 돼?',
        time: '오전 10:19',
      },
      {
        id: 'msg_1008_9',
        sender: 'jiwon',
        text: '웅',
        time: '오전 10:20',
      },
      {
        id: 'msg_1008_10',
        sender: 'jiwon',
        text: '엄빠 다 나가셔쏘',
        time: '오전 10:20',
      },
      {
        id: 'msg_1008_11',
        sender: 'hayoung',
        text: '페이스톡',
        time: '오전 10:21',
        actionType: 'video_call_outgoing', // 10월 8일 송하영이 건 영상통화 (발신)
        callDuration: '14:20',
      },
    ],
  },

  // ==================== 2026년 10월 9일 (오전 시간대) ====================
  {
    date: '2026년 10월 9일 금요일',
    messages: [
      {
        id: 'msg_1009_1',
        sender: 'hayoung',
        text: '오늘도 공연이지?',
        time: '오전 10:25',
      },
      {
        id: 'msg_1009_2',
        sender: 'hayoung',
        text: '퐛팅',
        time: '오전 10:25',
      },
      {
        id: 'msg_1009_3',
        sender: 'jiwon',
        text: '우우웅ㅇ',
        time: '오전 10:28',
      },
      {
        id: 'msg_1009_4',
        sender: 'jiwon',
        text: '왜 맨날 떨릴까..',
        time: '오전 10:28',
      },
      {
        id: 'msg_1009_5',
        sender: 'jiwon',
        text: '힝 ㅜ',
        time: '오전 10:29',
      },
      {
        id: 'msg_1009_6',
        sender: 'jiwon',
        text: '언니 오늘 오나..',
        time: '오전 10:29',
      },
      {
        id: 'msg_1009_7',
        sender: 'hayoung',
        text: '편하게 행',
        time: '오전 10:32',
      },
      {
        id: 'msg_1009_8',
        sender: 'hayoung',
        text: '나 오늘 스케줄 있자나..',
        time: '오전 10:32',
      },
      {
        id: 'msg_1009_9',
        sender: 'hayoung',
        text: 'ㅜ',
        time: '오전 10:32',
      },
      {
        id: 'msg_1009_10',
        sender: 'hayoung',
        text: '빨리 보고시픈데',
        time: '오전 10:33',
      },
      {
        id: 'msg_1009_11',
        sender: 'jiwon',
        text: '아마따',
        time: '오전 10:35',
      },
      {
        id: 'msg_1009_12',
        sender: 'jiwon',
        text: '으앙앙ㅇ',
        time: '오전 10:35',
      },
      {
        id: 'msg_1009_13',
        sender: 'jiwon',
        text: '준비하는동안 통화 ㄱ',
        time: '오전 10:36',
        actionType: 'call_incoming',
      },
    ],
  },

  // ==================== 2026년 10월 14일 (오후 11시경) ====================
  {
    date: '2026년 10월 14일 수요일',
    messages: [
      {
        id: 'msg_1014_1',
        sender: 'hayoung',
        text: '지워나',
        time: '오후 11:02',
      },
      {
        id: 'msg_1014_2',
        sender: 'hayoung',
        text: '노래 짱이다아🥹',
        time: '오후 11:02',
      },
      {
        id: 'msg_1014_3',
        sender: 'jiwon',
        text: '워크돌 봐써?',
        time: '오후 11:05',
      },
      {
        id: 'msg_1014_4',
        sender: 'jiwon',
        text: '힛',
        time: '오후 11:05',
      },
      {
        id: 'msg_1014_5',
        sender: 'jiwon',
        text: '근데 좀 맘에 안 들어 ㅡㅡ',
        time: '오후 11:06',
      },
      {
        id: 'msg_1014_6',
        sender: 'hayoung',
        text: '어디가...???',
        time: '오후 11:08',
      },
      {
        id: 'msg_1014_7',
        sender: 'jiwon',
        text: '아 좀 플랫된 거 같어 ㅡㅡ',
        time: '오후 11:09',
      },
      {
        id: 'msg_1014_8',
        sender: 'jiwon',
        text: '으이잉 더 잘할 수 있는데',
        time: '오후 11:09',
      },
      {
        id: 'msg_1014_9',
        sender: 'hayoung',
        text: '헐',
        time: '오후 11:11',
      },
      {
        id: 'msg_1014_10',
        sender: 'hayoung',
        text: '전혀',
        time: '오후 11:11',
      },
      {
        id: 'msg_1014_11',
        sender: 'hayoung',
        text: '페이스톡',
        time: '오후 11:12',
        actionType: 'video_call_outgoing', // 10월 14일 송하영이 건 영상통화 (발신)
        callDuration: '08:45',
      },
    ],
  },

  // ==================== 2026년 10월 17일 (오후 5시경) ====================
  {
    date: '2026년 10월 17일 토요일',
    messages: [
      {
        id: 'msg_1017_1',
        sender: 'jiwon',
        text: '아모아야아앙ㅇ',
        time: '오후 5:12',
      },
      {
        id: 'msg_1017_2',
        sender: 'jiwon',
        text: '언니',
        time: '오후 5:12',
      },
      {
        id: 'msg_1017_3',
        sender: 'jiwon',
        text: '아침에 카톡 없드만',
        time: '오후 5:13',
      },
      {
        id: 'msg_1017_4',
        sender: 'hayoung',
        text: '들킬까봐...',
        time: '오후 5:15',
      },
      {
        id: 'msg_1017_5',
        sender: 'hayoung',
        text: '놀라찌?',
        time: '오후 5:15',
      },
      {
        id: 'msg_1017_6',
        sender: 'jiwon',
        text: '언니',
        time: '오후 5:16',
      },
      {
        id: 'msg_1017_7',
        sender: 'jiwon',
        text: '내가 아까 말했잖아',
        time: '오후 5:16',
      },
      {
        id: 'msg_1017_8',
        sender: 'jiwon',
        text: '오늘 오히려 안 떨려서 이상했다고',
        time: '오후 5:17',
      },
      {
        id: 'msg_1017_9',
        sender: 'jiwon',
        text: '송하영 효과 ㄷㄷ',
        time: '오후 5:17',
      },
      {
        id: 'msg_1017_10',
        sender: 'hayoung',
        text: 'ㅋㅋㅋㅋㅋ',
        time: '오후 5:18',
      },
      {
        id: 'msg_1017_11',
        sender: 'hayoung',
        text: '다행이다',
        time: '오후 5:18',
      },
      {
        id: 'msg_1017_12',
        sender: 'hayoung',
        text: '오늘은 안 체한 거지?',
        time: '오후 5:19',
      },
      {
        id: 'msg_1017_13',
        sender: 'jiwon',
        text: '오늘 진짜 첨이야',
        time: '오후 5:21',
      },
      {
        id: 'msg_1017_14',
        sender: 'jiwon',
        text: '송하영 덕분인듯',
        time: '오후 5:21',
      },
      {
        id: 'msg_1017_15',
        sender: 'jiwon',
        text: '끼요오오옷',
        time: '오후 5:22',
      },
      {
        id: 'msg_1017_16',
        sender: 'hayoung',
        text: 'ㅋㅋㅋㅋㅋㅋ',
        time: '오후 5:23',
      },
      {
        id: 'msg_1017_17',
        sender: 'hayoung',
        text: '전화건다',
        time: '오후 5:24',
        actionType: 'call_outgoing',
      },
    ],
  },

  // ==================== 2026년 10월 18일 — 오후 11시경 (확정본 원문 + 답장 2개) ====================
  {
    date: '2026년 10월 18일 일요일',
    messages: [
      {
        id: 'msg_1018_1',
        sender: 'jiwon',
        text: '언니 어디야?',
        time: '오후 11:04',
      },
      {
        id: 'msg_1018_2',
        sender: 'jiwon',
        text: '아직 안 갔지',
        time: '오후 11:04',
      },
      {
        id: 'msg_1018_3',
        sender: 'jiwon',
        text: '나 오늘 언니집에서 자도 댐?',
        time: '오후 11:05',
      },
      {
        id: 'msg_1018_4',
        sender: 'hayoung',
        text: '아 어제 청소하다가 마무리를 못해서 집이 좀 더러워ㅜ',
        time: '오후 11:08',
      },
      {
        id: 'msg_1018_5',
        sender: 'hayoung',
        text: '다음에 와서 자~',
        time: '오후 11:09',
      },
      // 3차 작업 추가 1: 다음에 와서 자~ 바로 뒤 박지원의 답장 2개
      {
        id: 'msg_1018_6',
        sender: 'jiwon',
        text: '아 그래?',
        time: '오후 11:10',
      },
      {
        id: 'msg_1018_7',
        sender: 'jiwon',
        text: '알아쏘',
        time: '오후 11:10',
      },
    ],
  },

  // ==================== 2026년 10월 19일 (오전 11시경, 오후 7시경) ====================
  {
    date: '2026년 10월 19일 월요일',
    messages: [
      // 오전 11시경
      {
        id: 'msg_1019_1',
        sender: 'jiwon',
        text: '오늘 점심 같이 묵을깜?',
        time: '오전 11:15',
      },
      {
        id: 'msg_1019_2',
        sender: 'hayoung',
        text: '나 오늘 약속이 있어',
        time: '오전 11:20',
      },
      {
        id: 'msg_1019_3',
        sender: 'hayoung',
        text: 'ㅜㅠ',
        time: '오전 11:20',
      },
      {
        id: 'msg_1019_4',
        sender: 'hayoung',
        text: '꼭 챙겨먹어!!',
        time: '오전 11:21',
      },
      {
        id: 'msg_1019_5',
        sender: 'jiwon',
        text: '아 진쨔?',
        time: '오전 11:24',
      },
      {
        id: 'msg_1019_6',
        sender: 'jiwon',
        text: '힝',
        time: '오전 11:24',
      },
      {
        id: 'msg_1019_7',
        sender: 'jiwon',
        text: '지워니 외로오',
        time: '오전 11:25',
      },
      {
        id: 'msg_1019_8',
        sender: 'jiwon',
        text: '알아쏘오',
        time: '오전 11:25',
      },

      // 오후 7시경: 3차 작업 수정 2 — 카카오톡 페이스톡 부재중 기록 UI로 변경
      {
        id: 'msg_1019_9',
        sender: 'jiwon',
        text: '페이스톡 취소',
        time: '오후 7:02',
        actionType: 'video_call_missed', // 페이스톡 부재중 기록
      },
      {
        id: 'msg_1019_10',
        sender: 'jiwon',
        text: '언니 아직 바빠?',
        time: '오후 7:04',
      },
      {
        id: 'msg_1019_11',
        sender: 'jiwon',
        text: '전화 안 받네ㅜㅜ 집 가면 연락 줘!',
        time: '오후 7:05',
      },
    ],
  },
];

// 3차 작업 수정 3: 10월 20일 실시간 스트리밍 대화 이벤트 데이터
// Part A: 알림 클릭 후 순차적으로 도착하는 박지원 메시지 9개
export const EVENT_1020_JIWON_MESSAGES: Omit<KakaoMessage, 'id'>[] = [
  { sender: 'jiwon', text: '언니', time: '오후 10:14' },
  { sender: 'jiwon', text: '화장실에 있는 거 다 알거든', time: '오후 10:14' },
  { sender: 'jiwon', text: '내가 뭐 잘못했어?', time: '오후 10:14' },
  { sender: 'jiwon', text: '장난 친 것도 없는데 왜 그래 진짜...', time: '오후 10:15' },
  { sender: 'jiwon', text: '카톡 보고 있는 거 다 알아', time: '오후 10:15' },
  { sender: 'jiwon', text: '미리보기로', time: '오후 10:15' },
  { sender: 'jiwon', text: '송하영', time: '오후 10:15' },
  { sender: 'jiwon', text: '야', time: '오후 10:15' },
  { sender: 'jiwon', text: '야아아!!!!', time: '오후 10:15' },
];

// Part B: 사용자 입력 "야라고 하지 마라" 이후 순차적으로 도착하는 박지원 답장 3개
export const EVENT_1020_REPLY_MESSAGES: Omit<KakaoMessage, 'id'>[] = [
  { sender: 'jiwon', text: '그럼 나와', time: '오후 10:17' },
  { sender: 'jiwon', text: '피하지 말고', time: '오후 10:17' },
  { sender: 'jiwon', text: '얘기 좀 해', time: '오후 10:17' },
];
