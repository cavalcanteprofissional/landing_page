import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Building2 } from 'lucide-react';
import experiencesData from '../../data/experience.json';

export function Experience() {
  const { t } = useTranslation();
  const { experiences } = experiencesData;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Ordenar experiências do mais recente para o mais antigo
  const sortedExperiences = [...experiences].sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  );

  const isCurrent = (year: string) => year === '2026';

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
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
          {/* Container com scroll */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
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
                  className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[35vw] lg:w-[320px] snap-start"
                >
                  <div className={`experience-card ${current ? 'current' : ''} h-full`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl border-2 border-border h-full flex flex-col overflow-hidden relative"
                      style={{ minHeight: '420px' }}
                    >
                      {/* Animação de borda infinita */}
                      <div className={`absolute inset-0 rounded-2xl pointer-events-none ${current ? 'border-animation-fast' : 'border-animation'}`} />
                      
                      {/* Header */}
                      <div className={`p-6 ${current ? 'bg-primary/10' : 'bg-muted/50'} relative z-10`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl ${current ? 'bg-primary/20' : 'bg-secondary'}`}>
                            <Briefcase className={`w-6 h-6 ${current ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            current 
                              ? 'bg-primary text-white' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            {exp.year}
                            {current && (
                              <span className="ml-2 text-xs opacity-80">{t('experience.current')}</span>
                            )}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 leading-tight">
                          {t(exp.titleKey)}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-medium">
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
                              <span className="text-primary mt-1">•</span>
                              <span className="leading-relaxed">{t(key)}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer indicator */}
                      <div className={`px-6 py-3 ${current ? 'bg-primary/5' : 'bg-muted/30'} relative z-10`}>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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

          {/* Indicadores de scroll */}
          <div className="flex justify-center gap-2 mt-4">
            {sortedExperiences.map((exp) => (
              <div 
                key={exp.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isCurrent(exp.year) ? 'bg-primary w-6' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>

          {/* Gradientes de fade nas laterais */}
          <div className={`absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </section>
  );
}
