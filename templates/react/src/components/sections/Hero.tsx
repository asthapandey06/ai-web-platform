interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: HeroProps) {
  return (
    <section className="os-hero">
      <div className="os-container">
        <div className="os-hero-content">
          {eyebrow && <div className="os-eyebrow">{eyebrow}</div>}

          <h1>{title}</h1>

          {description && <p>{description}</p>}

          {(primaryAction || secondaryAction) && (
            <div className="os-actions">
              {primaryAction && (
                <a className="os-button" href={primaryAction.href}>
                  {primaryAction.label}
                </a>
              )}

              {secondaryAction && (
                <a
                  className="os-button os-button-secondary"
                  href={secondaryAction.href}
                >
                  {secondaryAction.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
