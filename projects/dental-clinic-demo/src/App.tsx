// @ts-expect-error - Vite provides CSS side-effect typing via vite/client, which may not be included in this template.
import "./styles.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Trust } from "./components/sections/Trust";
import { CTA } from "./components/sections/CTA";

import domain from "./data/domain.json";
import pages from "./data/pages.json";
import services from "./data/services.json";

interface Service {
  name: string;
  description: string;
  featured?: boolean;
}

const serviceEntries = Object.entries(
  services as Record<string, Service>
).map(([id, service]) => ({
  id,
  ...service,
}));

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Appointment", href: "/appointment" },
];

const trustItems = [
  {
    title: "Clear information",
    description:
      "Important business information is presented clearly so visitors can act quickly.",
  },
  {
    title: "Simple experience",
    description:
      "The website keeps the primary customer action easy to find.",
  },
  {
    title: "Built for customers",
    description:
      "The site structure is generated from the business requirements.",
  },
];

export default function App() {
  const primaryGoal =
    typeof domain.business === "object" &&
    domain.business !== null &&
    "primary_goal" in domain.business
      ? String(domain.business.primary_goal)
      : "";

  return (
    <>
      <Header
        businessName={domain.name}
        navigation={navigation}
        cta={{
          label: "Book Appointment",
          href: "/appointment",
        }}
      />

      <main>
        <Hero
          eyebrow={
            typeof domain.business === "object" &&
            domain.business !== null &&
            "type" in domain.business
              ? String(domain.business.type)
              : undefined
          }
          title={domain.name}
          description={primaryGoal}
          primaryAction={{
            label: "Book Appointment",
            href: "/appointment",
          }}
          secondaryAction={{
            label: "View Services",
            href: "/services",
          }}
        />

        <div id="services">
          <Services
            title="Our Services"
            description="Explore the services available."
            services={serviceEntries}
          />
        </div>

        <div id="trust">
          <Trust
            title="Why choose us"
            items={trustItems}
          />
        </div>

        <CTA
          title="Ready to get started?"
          description="Take the next step and contact the business."
          action={{
            label: "Book Appointment",
            href: "/appointment",
          }}
        />
      </main>

      <Footer
        businessName={domain.name}
        links={navigation}
        copyright={`© ${new Date().getFullYear()} ${domain.name}`}
      />
    </>
  );
}
