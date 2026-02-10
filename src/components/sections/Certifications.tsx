import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Database, Terminal, GraduationCap, Laptop, GitBranch, Code, BookOpen, Gamepad2, Palette, Wrench } from 'lucide-react';
import certificationsData from '../../data/certifications.json';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'database': Database,
  'terminal': Terminal,
  'graduation-cap': GraduationCap,
  'laptop-code': Laptop,
  'code-branch': GitBranch,
  'code': Code,
  'book-open': BookOpen,
  'gamepad': Gamepad2,
  'palette': Palette,
  'wrench': Wrench,
};

export function Certifications() {
  const { t } = useTranslation();
  const { certifications } = certificationsData;

  return (
    <section id="certifications" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('sections.certifications')}</h2>
          <p className="text-muted-foreground">{t('certifications.subtitle')}</p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const Icon = iconMap[cert.icon] || GraduationCap;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <motion.div
                  className="bg-card rounded-xl p-4 sm:p-6 border border-border shadow-sm h-full flex flex-col"
                  whileHover={{ y: -4, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 flex-1">
                    {t(cert.titleKey)}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.institution}
                  </p>

                  {cert.file && (
                    <motion.a
                      href={`/cavalcanteprofissional/documents/certifications/${cert.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium"
                      whileHover={{ x: 4 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('buttons.view')}
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}