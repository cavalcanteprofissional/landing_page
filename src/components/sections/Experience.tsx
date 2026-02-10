import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Building2, ChevronRight, Calendar } from 'lucide-react';
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
    <section id="experience" className="py-24 bg-muted/30">
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

        {/* Experiences Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {sortedExperiences.map((exp, index) => {
            const current = isCurrent(exp.year);
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`bg-card rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    current 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Year Badge - Left Side */}
                    <div className={`md:w-32 flex-shrink-0 p-6 flex flex-row md:flex-col items-center justify-center gap-2 md:gap-1 ${
                      current ? 'bg-primary/10' : 'bg-muted/50'
                    }`}>
                      <span className={`text-3xl md:text-4xl font-bold ${
                        current ? 'text-primary' : 'text-foreground'
                      }`}>
                        {exp.year}
                      </span>
                      {current && (
                        <span className="px-2 py-1 rounded-full bg-primary text-white text-xs font-bold">
                          {t('experience.current')}
                        </span>
                      )}
                    </div>

                    {/* Content - Right Side */}
                    <div className="flex-1 p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${current ? 'bg-primary/10' : 'bg-secondary'}`}>
                          <Briefcase className={`w-6 h-6 ${current ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold mb-1">
                            {t(exp.titleKey)}
                          </h3>
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <Building2 className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        {/* Mobile Year Badge */}
                        <div className="md:hidden">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                            current 
                              ? 'bg-primary text-white' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            <Calendar className="w-4 h-4" />
                            {exp.year}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="pl-0 md:pl-[60px]">
                        <ul className="space-y-3">
                          {exp.descriptionKeys.map((key, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{t(key)}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
