import { ColorPaletteId, ContrastLevel } from './types';

export type { ColorPaletteId, ContrastLevel };

export interface PaletteDefinition {
  id: ColorPaletteId;
  name: string;
  description: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  ring: string;
  headerClockBg: string;
  heroButtonBg: string;
}

export const THEME_PALETTES: Record<ColorPaletteId, PaletteDefinition> = {
  emerald: {
    id: 'emerald',
    name: 'Hijau Zamrud Argopuro (Khas SDN 04)',
    description: 'Nuansa hijau alami khas Sekolah Kaki Langit di Lereng Gunung Argopuro',
    primary: '#155e39',
    primaryHover: '#0f4429',
    primaryLight: '#ecfdf5',
    primaryDark: '#064e3b',
    accent: '#d97706',
    ring: '#10b981',
    headerClockBg: '#153f29',
    heroButtonBg: '#1b5033',
  },
  blue: {
    id: 'blue',
    name: 'Biru Royal Pendidikan',
    description: 'Kesan akademis modern, cerdas, berwawasan luas dan berteknologi tinggi',
    primary: '#1d4ed8',
    primaryHover: '#1e40af',
    primaryLight: '#eff6ff',
    primaryDark: '#172554',
    accent: '#f59e0b',
    ring: '#3b82f6',
    headerClockBg: '#172554',
    heroButtonBg: '#1d4ed8',
  },
  maroon: {
    id: 'maroon',
    name: 'Merah Marun & Emas Karismatik',
    description: 'Kesan berwibawa, penuh semangat, berprestasi dan berkarakter kuat',
    primary: '#881337',
    primaryHover: '#701a35',
    primaryLight: '#fff1f2',
    primaryDark: '#4c0519',
    accent: '#d97706',
    ring: '#e11d48',
    headerClockBg: '#4c0519',
    heroButtonBg: '#881337',
  },
  teal: {
    id: 'teal',
    name: 'Teal Segar & Bahari',
    description: 'Perpaduan hijau toska dan biru segar yang sejuk, bersih, dan ramah',
    primary: '#0f766e',
    primaryHover: '#115e59',
    primaryLight: '#f0fdfa',
    primaryDark: '#134e4a',
    accent: '#f97316',
    ring: '#14b8a6',
    headerClockBg: '#134e4a',
    heroButtonBg: '#0f766e',
  },
  amber: {
    id: 'amber',
    name: 'Cokelat Bumi & Amber Hangat',
    description: 'Kesan hangat, kearifan lokal pedesaan lereng bukit yang ramah dan bersahaja',
    primary: '#78350f',
    primaryHover: '#5c2b09',
    primaryLight: '#fef3c7',
    primaryDark: '#451a03',
    accent: '#b45309',
    ring: '#f59e0b',
    headerClockBg: '#451a03',
    heroButtonBg: '#78350f',
  },
  indigo: {
    id: 'indigo',
    name: 'Indigo & Ungu Karakter Prestasi',
    description: 'Nuansa kepemimpinan visioner, kreatif, inspiratif dan berwibawa tinggi',
    primary: '#4338ca',
    primaryHover: '#3730a3',
    primaryLight: '#eef2ff',
    primaryDark: '#312e81',
    accent: '#eab308',
    ring: '#6366f1',
    headerClockBg: '#312e81',
    heroButtonBg: '#4338ca',
  },
  custom: {
    id: 'custom',
    name: 'Kustom Mandiri (Bebas Dipilih)',
    description: 'Tentukan warna primer dan aksen sendiri sesuai identitas sekolah Anda',
    primary: '#155e39',
    primaryHover: '#0f4429',
    primaryLight: '#f0fdf4',
    primaryDark: '#052e16',
    accent: '#d97706',
    ring: '#22c55e',
    headerClockBg: '#0f4429',
    heroButtonBg: '#155e39',
  },
};

export interface HeaderPresetImage {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const HEADER_PRESET_IMAGES: HeaderPresetImage[] = [
  {
    id: 'argopuro',
    title: 'Panorama Lereng Pegunungan Argopuro',
    description: 'Pemandangan hijau bukit berkabut khas Kaki Langit Dusun Lengkong',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'school_campus',
    title: 'Gedung Sekolah & Lapangan Hijau Asri',
    description: 'Gedung sekolah modern dengan pepohonan rindang dan halaman luas',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'misty_hills',
    title: 'Perkebunan & Kabut Pagi Sejuk',
    description: 'Suasana asri dataran tinggi 800 mdpl yang tenang dan menyejukkan',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'courtyard',
    title: 'Halaman dan Gerbang Prestasi Sekolah',
    description: 'Nuansa cerah gerbang institusi pendidikan ramah anak',
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'library_learning',
    title: 'Dunia Belajar & Literasi Kreatif',
    description: 'Nuansa buku, pengetahuan dan pembelajaran interaktif',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'mountain_sky',
    title: 'Langit Cerah & Lembah Hijau Kaki Langit',
    description: 'Simbol optimisme dan cita-cita tinggi murid lereng Argopuro',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
  },
];

export function getEffectivePalette(paletteId: ColorPaletteId, customPrimary?: string, customAccent?: string): PaletteDefinition {
  const base = THEME_PALETTES[paletteId] || THEME_PALETTES.emerald;
  if (paletteId === 'custom' && customPrimary) {
    return {
      ...base,
      primary: customPrimary,
      primaryHover: customPrimary,
      primaryDark: customPrimary,
      headerClockBg: customPrimary,
      heroButtonBg: customPrimary,
      accent: customAccent || base.accent,
    };
  }
  return base;
}

export function getContrastClasses(level: ContrastLevel = 'standard', isDark: boolean = false) {
  switch (level) {
    case 'ultra':
      return {
        cardBorder: isDark ? 'border-2 border-stone-200 shadow-lg' : 'border-2 border-stone-900 shadow-md',
        cardBg: isDark ? 'bg-black text-white' : 'bg-white text-black',
        textMuted: isDark ? 'text-stone-200' : 'text-stone-900',
        textHeading: isDark ? 'text-white font-extrabold' : 'text-black font-extrabold',
        badgeBorder: 'border-2 border-current font-bold',
        sectionDivider: isDark ? 'border-t-2 border-stone-300' : 'border-t-2 border-stone-900',
      };
    case 'high':
      return {
        cardBorder: isDark ? 'border-[1.5px] border-stone-600 shadow-md' : 'border-[1.5px] border-stone-400 shadow-sm',
        cardBg: isDark ? 'bg-stone-900 text-stone-100' : 'bg-white text-stone-950',
        textMuted: isDark ? 'text-stone-300' : 'text-stone-800',
        textHeading: isDark ? 'text-stone-100 font-bold' : 'text-stone-950 font-bold',
        badgeBorder: 'border border-stone-400 dark:border-stone-600 font-semibold',
        sectionDivider: isDark ? 'border-t border-stone-700' : 'border-t border-stone-300',
      };
    case 'standard':
    default:
      return {
        cardBorder: 'border border-stone-200 dark:border-stone-800 shadow-xs',
        cardBg: 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200',
        textMuted: 'text-stone-500 dark:text-stone-400',
        textHeading: 'text-stone-900 dark:text-stone-100 font-bold',
        badgeBorder: 'border border-stone-200/80 dark:border-stone-700/60',
        sectionDivider: 'border-t border-stone-200 dark:border-stone-800',
      };
  }
}
