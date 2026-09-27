export interface HeaderProps {
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
