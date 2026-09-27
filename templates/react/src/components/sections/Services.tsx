interface ServicesProps {
  title?: string;
  description?: string;
  services: Array<{
    id: string;
    name: string;
    description: string;
    featured?: boolean;
  }>;
}

export function Services({
  title = "Our services",
  description,
  services,
}: ServicesProps) {
  return (
    <section className="os-section">
      <div className="os-container">
        <div className="os-section-heading">
          <h2>{title}</h2>

          {description && <p>{description}</p>}
        </div>

        <div className="os-services">
          {services.map((service) => (
            <article
              key={service.id}
              className={`os-card ${
                service.featured ? "os-card-featured" : ""
              }`.trim()}
            >
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
