import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import languagesData from '../../data/languages.json';

export function Languages() {
  const { t } = useTranslation();
  const { languages } = languagesData;

  return (
    <section id="languages" className="py-24 bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('sections.languages')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div
                className="bg-card rounded-xl p-4 sm:p-6 border border-border shadow-sm text-center"
                whileHover={{ y: -4, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
              >
                <h3 className="text-xl font-semibold mb-2">{t(lang.nameKey)}</h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {t(lang.levelKey)}
                </p>
                
                {/* Star Rating */}
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          i < lang.stars
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}