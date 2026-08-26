import React, { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, Download, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Maximize2 } from 'lucide-react';

export default function PostPreview({ content, brand, format, aspectRatio, onSelectAspectRatio, onExportHtml }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!content) return null;

  const isCarousel = format === 'carrossel' && content.slides && content.slides.length > 0;
  const isReel = format === 'reel' && content.reelScript;

  // Aspect Ratio styles map
  const aspectClassMap = {
    '4/5': 'aspect-4-5',
    '1/1': 'aspect-1-1',
    '3/4': 'aspect-3-4',
    '9/16': 'aspect-9-16'
  };

  const aspectLabelMap = {
    '4/5': '1080 x 1350 px (Feed Vertical)',
    '1/1': '1080 x 1080 px (Quadrado)',
    '3/4': '1080 x 1440 px (Retrato 3:4)',
    '9/16': '1080 x 1920 px (Stories / Reels)'
  };

  return (
    <div className="bg-white dark:bg-[#121212] rounded-2xl border border-[#DBDBDB] dark:border-[#262626] p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Preview Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#FD1D1D] flex items-center justify-center text-white">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#262626] dark:text-[#F5F5F5]">Simulador do Post ({aspectRatio})</h3>
              <p className="text-xs text-[#737373] dark:text-[#A8A8A8]">{aspectLabelMap[aspectRatio] || 'Visualização gráfica'}</p>
            </div>
          </div>

          <button
            onClick={onExportHtml}
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/40 dark:to-purple-950/40 hover:from-pink-100 hover:to-purple-100 text-[#833AB4] dark:text-pink-300 border border-pink-200 dark:border-pink-900/50 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs"
            title="Exportar página HTML estilizada para enviar ao designer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Mini-Site HTML</span>
          </button>
        </div>

        {/* Aspect Ratio Selector Pills */}
        <div className="mb-4 bg-[#FAFAFA] dark:bg-[#1A1A1A] p-1.5 rounded-xl border border-[#DBDBDB] dark:border-[#2D2D2D] flex items-center justify-between gap-1 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase text-[#737373] dark:text-[#A8A8A8] px-2 flex items-center gap-1 whitespace-nowrap">
            <Maximize2 className="w-3 h-3" />
            <span>Formato:</span>
          </span>
          <div className="flex gap-1 flex-1 justify-end">
            <button
              onClick={() => onSelectAspectRatio('4/5')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                aspectRatio === '4/5'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white shadow-xs'
                  : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
              }`}
            >
              4:5 (Vertical)
            </button>
            <button
              onClick={() => onSelectAspectRatio('1/1')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                aspectRatio === '1/1'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white shadow-xs'
                  : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
              }`}
            >
              1:1 (Quadrado)
            </button>
            <button
              onClick={() => onSelectAspectRatio('3/4')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                aspectRatio === '3/4'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white shadow-xs'
                  : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
              }`}
            >
              3:4 (Retrato)
            </button>
            <button
              onClick={() => onSelectAspectRatio('9/16')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                aspectRatio === '9/16'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white shadow-xs'
                  : 'text-[#737373] dark:text-[#A8A8A8] hover:text-[#262626] dark:hover:text-white'
              }`}
            >
              9:16 (Stories)
            </button>
          </div>
        </div>

        {/* Instagram Post Container */}
        <div className="relative mx-auto max-w-sm rounded-2xl border border-[#DBDBDB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] shadow-md overflow-hidden transition-all duration-300">
          
          {/* Instagram Post Top Bar */}
          <div className="p-3 flex items-center justify-between bg-white dark:bg-[#1A1A1A] border-b border-[#EFEFEF] dark:border-[#262626]">
            <div className="flex items-center gap-2.5">
              <div className="story-ring">
                <div className="story-ring-inner bg-white dark:bg-[#1A1A1A]">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: brand.colors.primary }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-[#262626] dark:text-[#F5F5F5] leading-tight flex items-center gap-1">
                  <span>{brand.handle}</span>
                  <span className="w-1 h-1 rounded-full bg-[#8E8E8E]"></span>
                  <span className="text-[10px] text-[#833AB4] dark:text-pink-400 font-semibold">Seguir</span>
                </p>
                <p className="text-[10px] text-[#737373] dark:text-[#A8A8A8]">Londrina, Paraná</p>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-[#737373] cursor-pointer" />
          </div>

          {/* Dynamic Aspect Ratio Simulated Graphic Card */}
          <div
            className={`w-full ${aspectClassMap[aspectRatio] || 'aspect-4-5'} p-6 flex flex-col justify-between items-center text-center transition-all duration-300 relative overflow-hidden`}
            style={{
              backgroundColor: isCarousel 
                ? (currentSlide === 0 ? brand.colors.accent : (currentSlide % 2 === 0 ? brand.colors.light : brand.colors.bg))
                : content.designerGuidelines.suggestedBgColor,
              color: content.designerGuidelines.suggestedTextColor
            }}
          >
            {/* Top Bar inside card */}
            <div className="w-full flex justify-between items-center text-[10px] font-bold tracking-widest uppercase opacity-60">
              <span>{brand.handle}</span>
              {isCarousel && <span className="bg-black/10 px-2 py-0.5 rounded-full">{currentSlide + 1} / {content.slides.length}</span>}
            </div>

            {/* Main Visual Content */}
            <div className="my-auto max-w-[92%]">
              {isCarousel ? (
                <div>
                  <h3
                    className="font-serif text-lg sm:text-2xl font-normal leading-snug mb-2 sm:mb-3 italic"
                    style={{ color: currentSlide === 0 ? brand.colors.dark : brand.colors.primary }}
                  >
                    {content.slides[currentSlide].title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium opacity-90 line-clamp-4">
                    {content.slides[currentSlide].content}
                  </p>
                </div>
              ) : isReel ? (
                <div>
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-black/10 flex items-center justify-center text-current">
                    <span className="text-lg">▶</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug mb-1 italic">
                    {content.cardTitle.replace(/<br>/g, ' ')}
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest opacity-75 font-semibold">
                    {content.cardSub}
                  </p>
                </div>
              ) : (
                <div>
                  <h3
                    className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal leading-snug mb-2 sm:mb-3 italic"
                    dangerouslySetInnerHTML={{ __html: content.cardTitle }}
                  />
                  <p className="text-[11px] uppercase tracking-widest opacity-75 font-semibold">
                    {content.cardSub}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="w-full flex justify-between items-center text-[10px] opacity-70 font-medium pt-2 border-t border-current/10">
              <span>{brand.niche}</span>
              <span>🤍 {brand.name}</span>
            </div>
          </div>

          {/* Carousel Slide Controller */}
          {isCarousel && (
            <div className="p-2.5 bg-white dark:bg-[#1A1A1A] border-t border-[#EFEFEF] dark:border-[#262626] flex items-center justify-between">
              <button
                type="button"
                disabled={currentSlide === 0}
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                className="p-1.5 rounded-lg bg-[#FAFAFA] dark:bg-[#262626] border border-[#DBDBDB] dark:border-[#333333] disabled:opacity-30 hover:bg-pink-50 text-[#262626] dark:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {content.slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === idx ? 'w-5 bg-gradient-to-r from-[#E1306C] to-[#833AB4]' : 'w-1.5 bg-[#DBDBDB] dark:bg-[#444444]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={currentSlide === content.slides.length - 1}
                onClick={() => setCurrentSlide(prev => Math.min(content.slides.length - 1, prev + 1))}
                className="p-1.5 rounded-lg bg-[#FAFAFA] dark:bg-[#262626] border border-[#DBDBDB] dark:border-[#333333] disabled:opacity-30 hover:bg-pink-50 text-[#262626] dark:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Real Instagram Engagement Bar */}
          <div className="p-3 border-t border-[#EFEFEF] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] flex items-center justify-between text-[#262626] dark:text-[#F5F5F5]">
            <div className="flex items-center gap-4">
              <Heart
                onClick={() => setIsLiked(!isLiked)}
                className={`w-5 h-5 cursor-pointer transition-all ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'hover:opacity-60'}`}
              />
              <MessageCircle className="w-5 h-5 cursor-pointer hover:opacity-60" />
              <Send className="w-5 h-5 cursor-pointer hover:opacity-60" />
            </div>
            <Bookmark
              onClick={() => setIsSaved(!isSaved)}
              className={`w-5 h-5 cursor-pointer transition-all ${isSaved ? 'fill-[#262626] dark:fill-white text-[#262626] dark:text-white' : 'hover:opacity-60'}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[11px] text-[#737373] dark:text-[#A8A8A8]">
          ✨ Prévia dinâmica renderizada na proporção <strong>{aspectRatio} ({aspectLabelMap[aspectRatio]})</strong>.
        </p>
      </div>
    </div>
  );
}
