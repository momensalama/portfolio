import { DATA } from "@/data/resume";

export function SiteFooter() {
  return (
    <footer className="mt-20 flex flex-col gap-3 border-t py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {DATA.name}
      </p>
      <nav aria-label="Social">
        <ul className="flex items-center gap-5">
          {DATA.contact.social.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {social.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${DATA.contact.email}`}
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
