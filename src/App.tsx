import { useEffect } from 'react';
import { useThemeStore } from './stores/themeStore';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Experience } from './components/sections/Experience';
import { Portfolio } from './components/sections/Portfolio';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { Languages } from './components/sections/Languages';
import './i18n';

function App() {
  const { theme } = useThemeStore();

  // Apply theme class whenever theme changes (including initial load from persisted storage)
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Portfolio />
        <Skills />
        <Certifications />
        <Languages />
      </main>
      <Footer />
    </div>
  );
}

export default App;