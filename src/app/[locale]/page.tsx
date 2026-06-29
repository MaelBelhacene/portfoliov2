import { setRequestLocale } from 'next-intl/server';
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
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
