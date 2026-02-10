import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Calendar, Building2, ChevronRight } from 'lucide-react';
import experiencesData from '../../data/experience.json';

export function Experience() {
  const { t } = useTranslation();
  const { experiences } = experiencesData;

  // Ordenar experiências do mais recente para o mais antigo
  const sortedExperiences = [...experiences].sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  );

  const isCurrent = (year: string) => year === '2026';

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

        {/* Desktop: Timeline Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Linha horizontal central */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2" />
            
            {/* Container dos cards */}
            <div className="relative flex justify-between items-start pt-8 pb-16 px-4">
              {sortedExperiences.map((exp, index) => {
                const current = isCurrent(exp.year);
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex flex-col items-center w-[18%]"
                  >
                    {/* Card */}
                    <div className={`w-full bg-card rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
                      current 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-border'
                    }`}>
                      {/* Header do card */}
                      <div className={`p-4 ${current ? 'bg-primary/5' : 'bg-muted/30'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            current 
                              ? 'bg-primary text-white' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            <Calendar className="w-3 h-3" />
                            {exp.year}
                            {current && (
                              <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                                ATUAL
                              </span>
                            )}
                          </span>
                        </div>
                        <h3 className="font-bold text-base leading-tight mb-1">
                          {t(exp.titleKey)}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-primary font-medium">
                          <Building2 className="w-3.5 h-3.5" />
                          {exp.company}
                        </div>
                      </div>
                      
                      {/* Descrição */}
                      <div className="p-4 pt-2">
                        <ul className="space-y-1.5">
                          {exp.descriptionKeys.slice(0, 2).map((key, i) => (
                            <li key={i} className="text-muted-foreground text-xs flex items-start gap-1.5">
                              <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">{t(key)}</span>
                            </li>
                          ))}
                          {exp.descriptionKeys.length > 2 && (
                            <li className="text-xs text-primary font-medium">
                              +{exp.descriptionKeys.length - 2} {t('experience.more')}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Ponto na timeline */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 500 }}
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 ${
                        current 
                          ? 'bg-primary border-primary' 
                          : 'bg-background border-primary'
                      }`}
                    />
                    
                    {/* Linha conectora */}
                    <div className={`absolute top-1/2 left-1/2 w-0.5 bg-primary/30 transform -translate-x-1/2 ${
                      isEven ? '-translate-y-full h-8 -mt-2' : 'translate-y-0 h-8 mt-2'
                    }`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet: Cards Verticais com Timeline */}
        <div className="lg:hidden">
          <div className="relative max-w-2xl mx-auto">
            {/* Linha vertical */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            
            <div className="space-y-6">
              {sortedExperiences.map((exp, index) => {
                const current = isCurrent(exp.year);
                
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-12 sm:pl-20"
                  >
                    {/* Ponto na timeline */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 500 }}
                      className={`absolute left-2 sm:left-6 top-6 w-4 h-4 rounded-full border-4 ${
                        current 
                          ? 'bg-primary border-primary shadow-lg shadow-primary/30' 
                          : 'bg-background border-primary'
                      }`}
                    />
                    
                    {/* Card */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`bg-card rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                        current 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border'
                      }`}
                    >
                      {/* Header */}
                      <div className={`p-4 sm:p-5 ${current ? 'bg-primary/5' : 'bg-muted/30'}`}>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            current 
                              ? 'bg-primary text-white' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            <Calendar className="w-3 h-3" />
                            {exp.year}
                          </span>
                          {current && (
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              {t('experience.current')}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${current ? 'bg-primary/10' : 'bg-secondary'}`}>
                            <Briefcase className={`w-5 h-5 ${current ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg sm:text-xl leading-tight">
                              {t(exp.titleKey)}
                            </h3>
                            <div className="flex items-center gap-1.5 text-primary font-medium mt-1">
                              <Building2 className="w-4 h-4" />
                              {exp.company}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Descrição completa */}
                      <div className="p-4 sm:p-5 pt-2">
                        <ul className="space-y-2.5">
                          {exp.descriptionKeys.map((key, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="text-muted-foreground text-sm flex items-start gap-2"
                            >
                              <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{t(key)}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
