import Image from "next/image";
import { DATA } from "@/data/resume";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t py-12">
      <h2 className="mb-8 text-sm font-medium text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="enter flex flex-col gap-6 pb-14 pt-4">
        <Image
          src={DATA.avatarUrl}
          alt={DATA.name}
          width={64}
          height={64}
          priority
          className="size-16 rounded-full object-cover"
        />

        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl leading-tight tracking-tight">
            {DATA.name}
          </h1>
          <p className="text-muted-foreground">
            {DATA.role} ·{" "}
            <a
              href={DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {DATA.location}
            </a>
          </p>
        </div>

        <p className="max-w-prose">{DATA.summary}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <a href={`mailto:${DATA.contact.email}`} className="link">
            {DATA.contact.email}
          </a>
          {DATA.contact.social.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-muted-foreground hover:text-foreground"
            >
              {social.name}
            </a>
          ))}
        </div>

        {DATA.available && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Available for new work
          </p>
        )}
      </section>

      <Section title="Experience">
        <ol className="flex flex-col gap-10">
          {DATA.work.map((job) => (
            <li key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {job.company}
                  </a>
                </h3>
                <p className="text-sm tabular-nums text-muted-foreground">
                  {job.start} – {job.end}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {job.title} · {job.location}
              </p>
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-sm text-muted-foreground marker:text-border">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="pl-1">
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Selected projects">
        <ol className="flex flex-col gap-10">
          {DATA.projects.map((project) => (
            <li key={project.title} className="flex flex-col gap-2">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={1440}
                  height={900}
                  className="mb-2 w-full rounded-lg border object-cover"
                />
              )}
              <h3 className="font-medium">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {project.title}
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {project.technologies.join(" · ")}
              </p>
              <div className="mt-1 flex items-center gap-5 text-sm">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Visit site
                </a>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-muted-foreground hover:text-foreground"
                >
                  Source
                </a>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Skills">
        <dl className="flex flex-col gap-4">
          {DATA.skills.map((skill) => (
            <div key={skill.group} className="flex flex-col sm:flex-row sm:gap-6">
              <dt className="text-sm text-muted-foreground sm:w-28 sm:shrink-0">
                {skill.group}
              </dt>
              <dd className="text-sm">{skill.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education">
        <ul className="flex flex-col gap-6">
          {DATA.education.map((school) => (
            <li
              key={school.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <div>
                <h3 className="font-medium">
                  <a
                    href={school.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {school.school}
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{school.degree}</p>
              </div>
              <p className="text-sm tabular-nums text-muted-foreground">
                {school.start} – {school.end}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Contact">
        <p className="max-w-prose">
          Email is the fastest way to reach me. I&apos;m open to frontend roles
          and selective freelance work.
        </p>
        <a
          href={`mailto:${DATA.contact.email}`}
          className="mt-5 inline-block rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          {DATA.contact.email}
        </a>
      </Section>
    </>
  );
}
