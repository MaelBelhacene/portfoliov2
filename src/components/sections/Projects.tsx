import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Project = { title: string; description: string; tags: string[] };

export function Projects() {
  const t = useTranslations('projects');
  const items = t.raw('items') as Project[];

  return (
    <Section id="pr0j3ts" tinted>
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="07" />

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((project, i) => (
          <article
            key={project.title}
            className="group flex flex-col border border-terminal-border bg-terminal-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terminal-green hover:shadow-[0_0_36px_rgba(0,255,65,0.1)]"
          >
            <div className="mb-3 flex items-baseline justify-between font-mono text-xs">
              <span className="text-terminal-green opacity-40 transition-opacity group-hover:opacity-100">
                ./{String(i + 1).padStart(2, '0')}.exe
              </span>
              <span className="text-terminal-faint" aria-hidden="true">-rwxr-xr-x</span>
            </div>
            <h3 className="mb-3 font-mono text-base font-bold text-terminal-bright">
              {project.title}
            </h3>
            <p className="mb-4 flex-1 font-mono text-sm leading-relaxed text-terminal-muted">
              {project.description}
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-terminal-border px-2 py-0.5 font-mono text-xs text-terminal-muted transition-colors group-hover:border-terminal-border-bright"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
