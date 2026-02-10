import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Linkedin, 
  Github, 
  Mail, 
  FileText,
  GraduationCap
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import certificationsData from '../../data/certifications.json';
import type { LanguageCode } from '../../types';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/cavalcante-Lucas', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/cavalcanteprofissional', label: 'GitHub' },
  { icon: Mail, href: 'mailto:cavalcanteprofissional@outlook.com', label: 'Email' },
  { icon: FaWhatsapp, href: 'https://wa.me/5585996859051', label: 'WhatsApp' },
  { icon: GraduationCap, href: 'http://lattes.cnpq.br/7686247677030579', label: 'Lattes' },
];

export function Footer() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  
  // Get resume info for current language
  const resumeInfo = certificationsData.resumes[currentLang] || certificationsData.resumes.pt;
  const cvHref = `/cavalcanteprofissional/documents/resumes/${resumeInfo.file}`;

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border transition-all duration-300"
    >
      <div className="section-container">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Social Links - CV dinâmico incluído */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                 className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
            
            {/* CV Link - Dinâmico por idioma */}
            <motion.a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              download={resumeInfo.downloadName}
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: socialLinks.length * 0.05 }}
              aria-label={resumeInfo.label}
              title={resumeInfo.label}
            >
              <FileText className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}