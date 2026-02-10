import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Gradient - Azul Oceano */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-teal-500/5 -z-10" />
      <div className="absolute top-20 right-10 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-sky-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 sm:left-20 w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-teal-500/20 rounded-full blur-3xl -z-10" />

      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >


            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight"
            >
              {t('hero.name')}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent font-semibold mb-6"
            >
              {t('hero.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="truncate">{t('contact.location')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="truncate">{t('contact.phone')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="truncate text-xs sm:text-sm md:text-base">{t('contact.email')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-2xl overflow-hidden border-4 border-sky-500/30 shadow-2xl shadow-sky-500/20"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="/cavalcanteprofissional/images/profile/foto-perfil.jpeg"
                  alt="Lucas Cavalcante"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'images/profile/foto-perfil.jpeg';
                  }}
                />
              </motion.div>
              
              {/* Decorative Elements - Azul Oceano */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-sky-500/30 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-teal-500/30 rounded-full blur-xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}