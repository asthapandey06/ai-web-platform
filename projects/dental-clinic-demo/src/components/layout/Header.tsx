interface HeaderProps {
  businessName: string;
  navigation: Array<{
    label: string;
    href: string;
  }>;
  cta?: {
    label: string;
    href: string;
  };
}

export function Header({
  businessName,
  navigation,
  cta,
}: HeaderProps) {
  return (
    <header className="os-header">
      <div className="os-container os-header-inner">
        <a className="os-brand" href="/">
          {businessName}
        </a>

        <nav className="os-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {cta && (
          <a className="os-button" href={cta.href}>
            {cta.label}
          </a>
        )}
      </div>
    </header>
  );
}
