import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

const navItems = [
  { key: 'experience', href: '#experience' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'skills', href: '#skills' },
  { key: 'certifications', href: '#certifications' },
  { key: 'languages', href: '#languages' },
];

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ y: -2 }}
              >
                {t(`nav.${item.key}`)}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-3 rounded-full bg-secondary hover:bg-secondary/80 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Dropdown Content */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute top-full left-4 right-4 mt-2 bg-card border border-border rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden"
              >
                <div className="py-2">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <motion.button
                        key={item.key}
                        onClick={() => handleNavClick(item.href)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`w-full flex items-center gap-4 px-5 py-4 text-base font-medium transition-all duration-200 touch-manipulation ${
                          isActive
                            ? 'text-primary bg-primary/10 border-l-4 border-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 border-l-4 border-transparent'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                        <span className="flex-1 text-left">{t(`nav.${item.key}`)}</span>
                        <X className="w-4 h-4 opacity-0 rotate-45" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}