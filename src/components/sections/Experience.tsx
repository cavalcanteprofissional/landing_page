import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import experiencesData from '../../data/experience.json';

export function Experience() {
  const { t } = useTranslation();
  const { experiences } = experiencesData;

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

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-1/2 z-10" />

                {/* Year Badge */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-12 md:text-center mb-2 md:mb-0">
                  <span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {exp.year}
                  </span>
                </div>

                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-12 mt-2 md:mt-0 w-[calc(100%-3.5rem)]">
                  <motion.div
                    className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                    whileHover={{ y: -4 }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">
                      {t(exp.titleKey)}
                    </h3>
                    <p className="text-primary font-medium mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.descriptionKeys.map((key, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{t(key)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}