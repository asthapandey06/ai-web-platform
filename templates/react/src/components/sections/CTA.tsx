interface CTAProps {
  title: string;
  description?: string;
  action: {
    label: string;
    href: string;
  };
}

export function CTA({
  title,
  description,
  action,
}: CTAProps) {
  return (
    <section className="os-section">
      <div className="os-container">
        <div className="os-cta">
          <h2>{title}</h2>

          {description && <p>{description}</p>}

          <a className="os-button" href={action.href}>
            {action.label}
          </a>
        </div>
      </div>
    </section>
  );
}
