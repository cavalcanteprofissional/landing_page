import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Building2 } from 'lucide-react';
import experiencesData from '../../data/experience.json';

export function Experience() {
  const { t } = useTranslation();
  const { experiences } = experiencesData;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ordenar experiências do mais recente para o mais antigo
  const sortedExperiences = [...experiences].sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  );

  const isCurrent = (year: string) => year === '2026';

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 320;
      const gap = 24;
      const scrollPosition = index * (cardWidth + gap);
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 320;
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(newIndex, sortedExperiences.length - 1));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section id="experience" className="py-24 bg-muted/30 overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('sections.experience')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Carrossel Horizontal */}
        <div className="relative">
          {/* Container com scroll - Desktop: 3 cards + peek */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {sortedExperiences.map((exp, index) => {
              const current = isCurrent(exp.year);
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 snap-start 
                    w-[85vw] 
                    sm:w-[calc((100%-24px)/2)] 
                    lg:w-[calc((100%-48px)/3.25)]"
                >
                  <div className="h-full">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl border border-border/50 h-full flex flex-col overflow-hidden relative shadow-sm hover:shadow-md transition-shadow"
                      style={{ minHeight: '420px' }}
                    >
                      {/* Animação de borda sutil */}
                      <div className={`absolute inset-0 rounded-2xl pointer-events-none border-2 ${current ? 'border-animation-subtle-fast' : 'border-animation-subtle'}`} />
                      
                      {/* Header - cores neutras */}
                      <div className="p-6 border-b border-border/30 relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2.5 rounded-lg bg-muted">
                            <Briefcase className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-foreground border border-border">
                            {exp.year}
                            {current && (
                              <span className="ml-2 text-xs text-muted-foreground">{t('experience.current')}</span>
                            )}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 leading-tight text-foreground">
                          {t(exp.titleKey)}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                          <Building2 className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-6 flex-1 relative z-10">
                        <ul className="space-y-3">
                          {exp.descriptionKeys.slice(0, 3).map((key, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="flex items-start gap-2 text-muted-foreground text-sm"
                            >
                              <span className="text-muted-foreground mt-1">•</span>
                              <span className="leading-relaxed">{t(key)}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer indicator - neutro */}
                      <div className="px-6 py-3 border-t border-border/30 relative z-10 bg-muted/20">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          <span>{exp.descriptionKeys.length} {t('experience.activities')}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Spacer para último card */}
            <div className="flex-shrink-0 w-4" />
          </div>

          {/* Dots clicáveis */}
          <div className="flex justify-center gap-3 mt-6">
            {sortedExperiences.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
