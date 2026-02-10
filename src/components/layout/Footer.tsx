import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin,
  FileText,
  MessageCircle,
  GraduationCap
} from 'lucide-react';
import certificationsData from '../../data/certifications.json';
import type { LanguageCode } from '../../types';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/cavalcante-Lucas', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/cavalcanteprofissional', label: 'GitHub' },
  { icon: Mail, href: 'mailto:cavalcanteprofissional@outlook.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/5585996859051', label: 'WhatsApp' },
  { icon: GraduationCap, href: 'http://lattes.cnpq.br/7686247677030579', label: 'Lattes' },
];

export function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const currentLang = i18n.language as LanguageCode;
  
  // Get resume info for current language
  const resumeInfo = certificationsData.resumes[currentLang] || certificationsData.resumes.pt;
  const cvHref = `/landing_page/documents/resumes/${resumeInfo.file}`;

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="section-container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{t('footer.contact')}</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t('footer.message')}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a 
              href="mailto:cavalcanteprofissional@outlook.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>cavalcanteprofissional@outlook.com</span>
            </a>
            <a 
              href="tel:+5585996859051"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(85) 9 9685-9051</span>
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Fortaleza - CE</span>
            </div>
          </div>

          {/* Social Links - CV dinâmico incluído */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
              transition={{ delay: socialLinks.length * 0.1 }}
              aria-label={resumeInfo.label}
              title={resumeInfo.label}
            >
              <FileText className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Lucas Cavalcante. {t('footer.rights')}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}