import { useTranslations } from 'next-intl';
import { Navbar }     from '@/components/layout/Navbar';
import { Footer }     from '@/components/layout/Footer';
import { Hero }       from '@/components/sections/Hero';
import { About }      from '@/components/sections/About';
import { Services }   from '@/components/sections/Services';
import { Skills }     from '@/components/sections/Skills';
import { Tools }      from '@/components/sections/Tools';
import { Experience } from '@/components/sections/Experience';
import { Education }  from '@/components/sections/Education';
import { Projects }   from '@/components/sections/Projects';
import { Contact }    from '@/components/sections/Contact';

export function PortfolioPage() {
  const t = useTranslations('nav');

  return (
    <>
      <a href="#main" className="skip-link font-mono">
        {t('skipToContent')}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Tools />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
