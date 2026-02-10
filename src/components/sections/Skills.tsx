import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Code, Brain, Eye, Wrench, Megaphone, Network, FileText } from 'lucide-react';
import skillsData from '../../data/skills.json';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'code': Code,
  'brain': Brain,
  'eye': Eye,
  'tools': Wrench,
  'bullhorn': Megaphone,
  'network-wired': Network,
  'file-alt': FileText,
};

export function Skills() {
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const { skillCategories, softSkills } = skillsData;

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('sections.skills')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Technical Skills - Accordion */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Code;
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-left">{t(category.titleKey)}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="flex flex-wrap gap-2">
                           {category.skills.map((skill) => (
                             <motion.span
                               key={skill}
                               initial={{ scale: 0.8, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                               whileHover={{ scale: 1.05 }}
                             >
                               {skill}
                             </motion.span>
                           ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{t(softSkills.titleKey)}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {softSkills.skills.map((skill, index) => (
              <motion.span
                key={skill.key}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-full bg-card shadow-sm border border-border text-sm font-medium hover:shadow-md transition-shadow"
              >
                {t(skill.key)}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}