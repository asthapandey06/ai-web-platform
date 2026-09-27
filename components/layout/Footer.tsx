export interface FooterProps {
  businessName: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  copyright?: string;
}
