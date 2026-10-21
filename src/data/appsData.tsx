import { AppId, AppInfo, FolderInfo, GridItem } from '../types/phone';

export const APPS: Record<AppId, AppInfo> = {
  kakaotalk: {
    id: 'kakaotalk',
    name: '카카오톡',
    category: 'social',
    badge: 74,
  },
  chrome: {
    id: 'chrome',
    name: 'Chrome',
    category: 'tool',
  },
  phone: {
    id: 'phone',
    name: '전화',
    category: 'tool',
  },
  memo: {
    id: 'memo',
    name: '메모',
    category: 'utility',
  },
  voice_record: {
    id: 'voice_record',
    name: '음성기록',
    category: 'tool',
  },
  contacts: {
    id: 'contacts',
    name: '연락처',
    category: 'utility',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
  },
  fromm: {
    id: 'fromm',
    name: 'fromm for Arti',
    category: 'social',
  },
  gallery: {
    id: 'gallery',
    name: '사진 및 비디오',
    category: 'media',
  },
  calendar: {
    id: 'calendar',
    name: '캘린더',
    category: 'utility',
  },
  nol: {
    id: 'nol',
    name: 'NOL',
    category: 'utility',
  },
  camera: {
    id: 'camera',
    name: '카메라',
    category: 'media',
  },
  messages: {
    id: 'messages',
    name: '메시지',
    category: 'social',
  },
  settings: {
    id: 'settings',
    name: '설정',
    category: 'utility',
  },
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'tool',
  },
  spellcheck: {
    id: 'spellcheck',
    name: '우리말 맞춤법',
    category: 'utility',
  },
};

// Folders matching Image 3 (Song Ha-young's actual home screen) in Galaxy One UI style
export const FOLDERS: Record<string, FolderInfo> = {
  folder_misc: {
    id: 'folder_misc',
    name: '잡동사니',
    appIds: ['settings', 'calendar'],
  },
  folder_moon: {
    id: 'folder_moon',
    name: '🌙',
    appIds: ['calendar', 'settings'],
  },
  folder_music: {
    id: 'folder_music',
    name: '음악',
    appIds: ['voice_record', 'gallery'],
  },
  folder_sns: {
    id: 'folder_sns',
    name: 'SNS',
    badge: '6,269',
    appIds: ['instagram', 'fromm', 'kakaotalk', 'chrome'],
  },
  folder_bank: {
    id: 'folder_bank',
    name: '은행',
    badge: 1,
    appIds: ['nol', 'settings'],
  },
  folder_travel: {
    id: 'folder_travel',
    name: '여행',
    badge: 1,
    appIds: ['nol', 'chrome'],
  },
  folder_game: {
    id: 'folder_game',
    name: '게임',
    badge: 1,
    appIds: ['chatgpt', 'spellcheck'],
  },
  folder_photo: {
    id: 'folder_photo',
    name: '사진 및 비디오',
    appIds: ['gallery', 'camera'],
  },
  folder_map: {
    id: 'folder_map',
    name: '지도',
    badge: 2,
    appIds: ['chrome', 'settings'],
  },
  folder_shop: {
    id: 'folder_shop',
    name: '쇼핑',
    badge: 83,
    appIds: ['nol', 'chrome'],
  },
  folder_prod: {
    id: 'folder_prod',
    name: '생산성',
    badge: 88,
    appIds: ['contacts', 'calendar', 'memo'],
  },
  folder_util: {
    id: 'folder_util',
    name: '유틸리티',
    badge: 184,
    appIds: ['settings', 'voice_record', 'camera'],
  },
};

// Home grid layout items (4 columns) - duplicates removed, strictly 4 rows
export const HOME_GRID: GridItem[] = [
  // Row 1: Folders
  { type: 'folder', folderId: 'folder_misc' },
  { type: 'folder', folderId: 'folder_moon' },
  { type: 'folder', folderId: 'folder_music' },
  { type: 'folder', folderId: 'folder_sns' },

  // Row 2: Folders
  { type: 'folder', folderId: 'folder_bank' },
  { type: 'folder', folderId: 'folder_travel' },
  { type: 'folder', folderId: 'folder_game' },
  { type: 'folder', folderId: 'folder_photo' },

  // Row 3: Folders
  { type: 'folder', folderId: 'folder_map' },
  { type: 'folder', folderId: 'folder_shop' },
  { type: 'folder', folderId: 'folder_prod' },
  { type: 'folder', folderId: 'folder_util' },

  // Row 4: Standalone Apps (4 apps, duplicates: 캘린더, 연락처, 사진 및 비디오, Chrome removed)
  { type: 'app', appId: 'spellcheck' },
  { type: 'app', appId: 'nol' },
  { type: 'app', appId: 'chatgpt' },
  { type: 'app', appId: 'fromm' },
];

// Fixed bottom dock apps: Exactly 4 apps in order: 전화 → 메모 → 음성기록 → 카카오톡
export const DOCK_APPS: AppId[] = [
  'phone',
  'memo',
  'voice_record',
  'kakaotalk',
];
