import { useState, type FormEvent } from "react";

interface AppointmentFormProps {
  services: Array<{
    id: string;
    name: string;
  }>;
  onSubmit?: (data: {
    name: string;
    phone: string;
    email?: string;
    serviceId: string;
  }) => void;
}

export function AppointmentForm({
  services,
  onSubmit,
}: AppointmentFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceId, setServiceId] = useState(
    services[0]?.id ?? ""
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit?.({
      name,
      phone,
      email: email || undefined,
      serviceId,
    });
  }

  return (
    <form className="os-form" onSubmit={handleSubmit}>
      <div className="os-form-grid">
        <div className="os-field">
          <label htmlFor="appointment-name">Name</label>
          <input
            id="appointment-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="os-field">
          <label htmlFor="appointment-phone">Phone</label>
          <input
            id="appointment-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>

        <div className="os-field">
          <label htmlFor="appointment-email">Email</label>
          <input
            id="appointment-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="os-field">
          <label htmlFor="appointment-service">Service</label>
          <select
            id="appointment-service"
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
            required
          >
            <option value="" disabled>
              Select a service
            </option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="os-field os-field-full">
          <button className="os-button" type="submit">
            Request appointment
          </button>
        </div>
      </div>
    </form>
  );
}
