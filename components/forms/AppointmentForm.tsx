export interface AppointmentFormProps {
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
