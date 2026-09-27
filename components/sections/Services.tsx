export interface ServicesProps {
  title?: string;
  description?: string;
  services: Array<{
    id: string;
    name: string;
    description: string;
    featured?: boolean;
  }>;
}
