interface TrustProps {
  title?: string;
  items: Array<{
    title: string;
    description?: string;
  }>;
}

export function Trust({
  title = "Why choose us",
  items,
}: TrustProps) {
  return (
    <section className="os-section os-section-muted">
      <div className="os-container">
        <div className="os-section-heading">
          <h2>{title}</h2>
        </div>

        <div className="os-trust-grid">
          {items.map((item) => (
            <article className="os-trust-item" key={item.title}>
              <h3>{item.title}</h3>

              {item.description && <p>{item.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
