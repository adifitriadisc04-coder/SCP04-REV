import React, { useState } from 'react';
import { ThemeConfig, TypographySettings } from '../types';
import { THEME_PALETTES, HEADER_PRESET_IMAGES, ColorPaletteId, ContrastLevel, getEffectivePalette } from '../themePalette';
import {
  Palette, Sun, Moon, Image as ImageIcon, Eye, Sparkles, Check, Upload,
  Sliders, Shield, SlidersHorizontal, Contrast, RefreshCw, Layers
} from 'lucide-react';

interface ThemeAndHeaderCustomizerProps {
  theme: ThemeConfig;
  typography: TypographySettings;
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  onUpdateTheme: (updated: ThemeConfig) => void;
  onUpdateTypography?: (updated: TypographySettings) => void;
  onRequestImageCrop: (aspectRatio: number, title: string, onApply: (url: string) => void) => void;
}

export const ThemeAndHeaderCustomizer: React.FC<ThemeAndHeaderCustomizerProps> = ({
  theme,
  typography,
  currentTheme,
  onToggleTheme,
  onUpdateTheme,
  onRequestImageCrop,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'header' | 'color' | 'contrast' | 'mode'>('header');

  const headerBg = theme.headerBackground || {
    enabled: true,
    imageUrl: HEADER_PRESET_IMAGES[0].url,
    overlayOpacity: 70,
    overlayBlur: 2,
    showBannerKop: true,
    titleBadge: 'Sekolah Kaki Langit • 800 mdpl Lereng Argopuro',
    bannerHeight: 'normal',
  };

  const handleUpdateHeaderBg = (patch: Partial<typeof headerBg>) => {
    onUpdateTheme({
      ...theme,
      headerBackground: {
        ...headerBg,
        ...patch,
      },
    });
  };

  const handlePaletteSelect = (paletteId: ColorPaletteId) => {
    const pal = THEME_PALETTES[paletteId as keyof typeof THEME_PALETTES] || THEME_PALETTES.emerald;
    onUpdateTheme({
      ...theme,
      colorPalette: paletteId,
      primaryColor: pal.primary,
      secondaryColor: pal.accent,
    });
  };

  const handleContrastSelect = (level: ContrastLevel) => {
    onUpdateTheme({
      ...theme,
      contrastLevel: level,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const originalDataUrl = event.target?.result as string;
      onRequestImageCrop(21 / 9, 'Potong & Sesuaikan Gambar Background Header (Rasio Banner 21:9)', (croppedUrl) => {
        handleUpdateHeaderBg({ imageUrl: croppedUrl, enabled: true });
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const activePal = getEffectivePalette(theme.colorPalette || 'emerald', theme.primaryColor, theme.secondaryColor);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
      {/* Title & Sub-navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-emerald-600" />
            <span>Pengaturan Tema, Warna, Kontras & Background Header</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Ubah foto background header dashboard utama, warna keseluruhan website, kontras visual, serta mode terang/gelap.
          </p>
        </div>

        {/* Quick Current Theme Mode Status & Toggle */}
        <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-700">
          <span className="text-xs font-semibold px-2 text-stone-600 dark:text-stone-300">
            Mode Sekarang: <strong>{currentTheme === 'dark' ? 'Gelap (Dark)' : 'Terang (Light)'}</strong>
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs font-bold shadow-sm hover:scale-105 transition-all flex items-center gap-1.5 border border-stone-300 dark:border-stone-700"
            title="Klik untuk beralih mode terang/gelap saat ini"
          >
            {currentTheme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Ganti ke Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ganti ke Gelap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveSubTab('header')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'header'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>1. Gambar Background Header</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('color')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'color'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>2. Warna Website Keseluruhan</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('contrast')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'contrast'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          <Contrast className="w-4 h-4" />
          <span>3. Pengaturan Kontras Teks & Garis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('mode')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'mode'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>4. Pengaturan Mode Terang & Gelap</span>
        </button>
      </div>

      {/* SUBTAB 1: GAMBAR BACKGROUND HEADER DASHBOARD UTAMA */}
      {activeSubTab === 'header' && (
        <div className="space-y-6">
          {/* Header Switch and Live Mockup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <div>
              <b className="text-sm font-bold text-stone-900 dark:text-white block">
                Status Gambar Background Header
              </b>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Menampilkan foto background artistik (pegunungan Argopuro / gedung sekolah) pada area header atas dashboard utama.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={headerBg.enabled}
                onChange={(e) => handleUpdateHeaderBg({ enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
              <span className="ml-3 text-xs font-bold text-stone-700 dark:text-stone-300">
                {headerBg.enabled ? 'Aktif' : 'Nonaktif'}
              </span>
            </label>
          </div>

          {/* Live Preview Box of the Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                Pratinjau Langsung Header Dashboard Utama:
              </span>
              <span className="text-[11px] text-stone-500 font-normal">
                (Transparansi: {headerBg.overlayOpacity}%, Blur: {headerBg.overlayBlur}px)
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-stone-300 dark:border-stone-700 shadow-md">
              {/* Background Image with Blur & Opacity */}
              {headerBg.enabled && headerBg.imageUrl ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{
                      backgroundImage: `url("${headerBg.imageUrl}")`,
                      filter: `blur(${headerBg.overlayBlur}px)`,
                      transform: 'scale(1.05)',
                    }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: currentTheme === 'dark' ? '#070b08' : '#0a1d12',
                      opacity: (headerBg.overlayOpacity || 70) / 100,
                    }}
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-emerald-900" />
              )}

              {/* Sample Header Clock Top Bar */}
              <div className="relative z-10 px-4 py-2 border-b border-white/10 flex items-center justify-between text-[11px] text-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="text-amber-300 font-bold">Minggu, 11 Oktober 2026</span>
                  <span className="bg-black/40 px-2 py-0.5 rounded-full font-mono text-amber-200">14:05:12 WIB</span>
                </div>
                <span className="text-white/80">sdnsucopangepok04jember@gmail.com • +6285236111999</span>
              </div>

              {/* Sample Header Branding Banner */}
              <div className="relative z-10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md p-1.5 border border-white/30 flex items-center justify-center font-bold text-amber-300 text-lg shadow-md">
                    04
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] tracking-wider uppercase mb-1">
                      {headerBg.titleBadge || 'Sekolah Kaki Langit • 800 mdpl Lereng Argopuro'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                      SD NEGERI SUCOPANGEPOK 04
                    </h3>
                    <p className="text-xs text-emerald-100/90 drop-shadow">
                      Kecamatan Jelbuk, Kabupaten Jember, Jawa Timur • NPSN: 20523276
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-white font-semibold text-xs border border-white/20 shadow-sm">
                    Terakreditasi B
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs shadow-md">
                    Hubungi Sekolah
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pilihan Gambar Preset Berkualitas Tinggi */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Pilih Foto Preset Rekomendasi (Khas Argopuro & Sekolah):</span>
              </label>
              <span className="text-[11px] text-stone-500">Klik salah satu untuk menerapkan</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {HEADER_PRESET_IMAGES.map((preset) => {
                const isSelected = headerBg.imageUrl === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleUpdateHeaderBg({ imageUrl: preset.url, enabled: true })}
                    className={`relative rounded-2xl overflow-hidden text-left border-2 transition-all group ${
                      isSelected
                        ? 'border-emerald-600 ring-4 ring-emerald-500/20 shadow-md'
                        : 'border-stone-200 dark:border-stone-700 hover:border-emerald-400'
                    }`}
                  >
                    <div className="aspect-[21/9] w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2.5 bg-white dark:bg-stone-900">
                      <div className="flex items-center justify-between gap-1">
                        <b className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                          {preset.title}
                        </b>
                        {isSelected && (
                          <span className="p-0.5 rounded-full bg-emerald-600 text-white shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opsi Unggah Foto Sendiri / URL Kustom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Upload Button */}
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 space-y-2">
              <b className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                Unggah Foto Header dari Komputer / HP:
              </b>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Foto akan otomatis dibuka di alat Potong/Crop dengan rasio banner 21:9 yang presisi.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Pilih Foto & Buka Pemotong (Crop)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Custom URL Input */}
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 space-y-2">
              <b className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                Atau Tempel URL Gambar:
              </b>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Masukkan tautan langsung gambar (PNG, JPG, WebP) dari internet.
              </p>
              <input
                type="text"
                value={headerBg.imageUrl}
                onChange={(e) => handleUpdateHeaderBg({ imageUrl: e.target.value, enabled: true })}
                placeholder="https://contoh.com/foto-banner-sekolah.jpg"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
              />
            </div>
          </div>

          {/* Pengaturan Efek (Slider Opasitas & Blur & Tagline) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>Kegelapan Overlay (Opasitas):</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono">
                  {headerBg.overlayOpacity}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="5"
                value={headerBg.overlayOpacity}
                onChange={(e) => handleUpdateHeaderBg({ overlayOpacity: Number(e.target.value) })}
                className="w-full accent-emerald-600"
              />
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Makin tinggi = teks header makin jelas dan kontras.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>Efek Kaca Buram (Blur):</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono">
                  {headerBg.overlayBlur}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={headerBg.overlayBlur}
                onChange={(e) => handleUpdateHeaderBg({ overlayBlur: Number(e.target.value) })}
                className="w-full accent-emerald-600"
              />
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Makin tinggi = background lebih halus dan fokus ke teks.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">
                Teks Badge / Tagline Banner:
              </label>
              <input
                type="text"
                value={headerBg.titleBadge || ''}
                onChange={(e) => handleUpdateHeaderBg({ titleBadge: e.target.value })}
                placeholder="Sekolah Kaki Langit • 800 mdpl"
                className="w-full px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
              />
            </div>
          </div>

          {/* Opsi Tampilkan Kop Banner Sekolah */}
          <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 flex items-center justify-between">
            <div>
              <b className="text-xs font-bold text-stone-900 dark:text-white block">
                Tampilkan Kop Banner Sekolah Megah (Logo & Nama Sekolah Besar)
              </b>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                Menampilkan spanduk banner identitas sekolah dengan logo dan nama resmi tepat di atas navigasi.
              </span>
            </div>
            <input
              type="checkbox"
              checked={headerBg.showBannerKop}
              onChange={(e) => handleUpdateHeaderBg({ showBannerKop: e.target.checked })}
              className="w-4 h-4 accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* SUBTAB 2: WARNA WEBSITE KESELURUHAN (COLOR PALETTES) */}
      {activeSubTab === 'color' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>Pilih Palet Tema Warna Utama Website:</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Warna ini mengatur tombol utama, bar navigasi, kartu aktif, ikon, badge, dan seluruh aksen visual di website.
            </p>
          </div>

          {/* Palette Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(Object.keys(THEME_PALETTES) as (keyof typeof THEME_PALETTES)[]).map((palId) => {
              const pal = THEME_PALETTES[palId];
              const isSelected = (theme.colorPalette || 'emerald') === palId;
              return (
                <button
                  key={palId}
                  type="button"
                  onClick={() => handlePaletteSelect(palId)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                    isSelected
                      ? 'border-emerald-600 ring-4 ring-emerald-500/20 bg-stone-50 dark:bg-stone-800 shadow-md'
                      : 'border-stone-200 dark:border-stone-700 hover:border-emerald-400 bg-white dark:bg-stone-900'
                  }`}
                >
                  {/* Swatches Bar */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className="w-8 h-8 rounded-xl shadow-inner border border-black/10 flex items-center justify-center text-white"
                      style={{ backgroundColor: pal.primary }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl shadow-inner border border-black/10"
                      style={{ backgroundColor: pal.accent }}
                    />
                    <div
                      className="w-8 h-8 rounded-xl shadow-inner border border-black/10"
                      style={{ backgroundColor: pal.primaryHover }}
                    />
                    {isSelected && (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold">
                        Aktif
                      </span>
                    )}
                  </div>

                  <b className="text-xs font-bold text-stone-900 dark:text-white block">
                    {pal.name}
                  </b>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                    {pal.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Custom Color Picker if Custom Palette is Chosen */}
          {(theme.colorPalette === 'custom') && (
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 space-y-3">
              <b className="text-xs font-bold text-stone-900 dark:text-white block">
                Sesuaikan Kode Warna Mandiri (Hex Color):
              </b>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Warna Utama Primer (Tombol, Header & Branding):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.primaryColor || '#155e39'}
                      onChange={(e) => onUpdateTheme({ ...theme, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300"
                    />
                    <input
                      type="text"
                      value={theme.primaryColor || '#155e39'}
                      onChange={(e) => onUpdateTheme({ ...theme, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">
                    Warna Aksen Sekunder (Badge & Sorotan Emas/Oranye):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.secondaryColor || '#d97706'}
                      onChange={(e) => onUpdateTheme({ ...theme, secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300"
                    />
                    <input
                      type="text"
                      value={theme.secondaryColor || '#d97706'}
                      onChange={(e) => onUpdateTheme({ ...theme, secondaryColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: PENGATURAN KONTRAS KESELURUHAN (CONTRAST LEVELS) */}
      {activeSubTab === 'contrast' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <Contrast className="w-4 h-4 text-emerald-600" />
              <span>Pilihan Tingkat Kontras Visual & Aksesibilitas:</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Mengatur ketegasan garis tepi, kepekatan warna huruf, dan keterbacaan teks bagi wali murid, guru, dan siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level 1: Standard */}
            <button
              type="button"
              onClick={() => handleContrastSelect('standard')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                (theme.contrastLevel || 'standard') === 'standard'
                  ? 'border-emerald-600 ring-4 ring-emerald-500/20 bg-stone-50 dark:bg-stone-800'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-stone-900 dark:text-white">
                  1. Standar (Lembut & Elegan)
                </span>
                {(theme.contrastLevel || 'standard') === 'standard' && (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
                Gaya estetika modern dengan batas kartu halus tipis 1px dan kepekatan teks abu-kehitaman seimbang.
              </p>
              <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 text-xs">
                Contoh tampilan teks standar
              </div>
            </button>

            {/* Level 2: High Contrast */}
            <button
              type="button"
              onClick={() => handleContrastSelect('high')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                theme.contrastLevel === 'high'
                  ? 'border-emerald-600 ring-4 ring-emerald-500/20 bg-stone-50 dark:bg-stone-800'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-stone-900 dark:text-white">
                  2. Kontras Tinggi (Rekomendasi)
                </span>
                {theme.contrastLevel === 'high' && (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
                Huruf lebih hitam pekat di mode terang, putih bersih di mode gelap, dengan border 1.5px tegas mudah dibaca di layar HP silau.
              </p>
              <div className="p-3 rounded-xl border-[1.5px] border-stone-400 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-100 font-medium text-xs">
                Contoh tampilan kontras tinggi
              </div>
            </button>

            {/* Level 3: Ultra Contrast */}
            <button
              type="button"
              onClick={() => handleContrastSelect('ultra')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                theme.contrastLevel === 'ultra'
                  ? 'border-emerald-600 ring-4 ring-emerald-500/20 bg-stone-50 dark:bg-stone-800'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-stone-900 dark:text-white">
                  3. Kontras Ekstra (Aksesibilitas WCAG AAA)
                </span>
                {theme.contrastLevel === 'ultra' && (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
                Ketajaman maksimal dengan garis tepi tebal 2px, teks hitam pekat murni, sangat jelas untuk lansia atau murid berkacamata.
              </p>
              <div className="p-3 rounded-xl border-2 border-stone-900 dark:border-white bg-white dark:bg-black text-black dark:text-white font-bold text-xs">
                Contoh tampilan kontras maksimal
              </div>
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 4: MODE TERANG & GELAP (LIGHT / DARK MODE) */}
      {activeSubTab === 'mode' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Konfigurasi Mode Terang & Gelap:</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Atur mode tampilan awal saat pengunjung membuka website dan tombol saklar tema.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mode Bawaan Website */}
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 space-y-3">
              <b className="text-xs font-bold text-stone-900 dark:text-white block">
                Mode Tampilan Awal (Default Pengunjung):
              </b>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateTheme({ ...theme, defaultTheme: 'light' })}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    theme.defaultTheme === 'light'
                      ? 'border-emerald-600 bg-emerald-800 text-white shadow-sm'
                      : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Mode Terang (Light)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateTheme({ ...theme, defaultTheme: 'dark' })}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    theme.defaultTheme === 'dark'
                      ? 'border-emerald-600 bg-emerald-800 text-white shadow-sm'
                      : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>Mode Gelap (Dark)</span>
                </button>
              </div>
            </div>

            {/* Tombol Ganti Tema untuk Pengunjung */}
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 flex items-center justify-between">
              <div>
                <b className="text-xs font-bold text-stone-900 dark:text-white block">
                  Ikon Saklar Ganti Tema di Header Pengunjung
                </b>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Izinkan pengunjung menekan tombol matahari/bulan di navigasi untuk ganti mode sendiri.
                </span>
              </div>
              <input
                type="checkbox"
                checked={theme.allowToggle}
                onChange={(e) => onUpdateTheme({ ...theme, allowToggle: e.target.checked })}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Test Switch Live */}
          <div className="p-4 rounded-2xl border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-800 text-white">
                <RefreshCw className="w-4 h-4" />
              </span>
              <div>
                <b className="text-xs font-bold text-emerald-950 dark:text-emerald-100 block">
                  Uji Coba Ganti Mode Langsung Sekarang
                </b>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  Klik tombol di samping untuk langsung melihat perbedaan antara Mode Terang dan Mode Gelap di layar Anda saat ini.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-200" />}
              <span>Beralih ke {currentTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
