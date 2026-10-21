interface FooterProps {
  businessName: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  copyright?: string;
}

export function Footer({
  businessName,
  links = [],
  copyright,
}: FooterProps) {
  return (
    <footer className="os-footer">
      <div className="os-container os-footer-inner">
        <div>
          <strong>{businessName}</strong>

          {copyright && (
            <div className="os-footer-copy">
              {copyright}
            </div>
          )}
        </div>

        {links.length > 0 && (
          <nav className="os-footer-links" aria-label="Footer navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
