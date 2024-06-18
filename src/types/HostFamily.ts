export type HostFamilyCardProps = {
  title: string;
  image: string;
  description: string;
  price: number;
  region: string;
  nativeLanguage: string;
  accept?: string[];
};

export type ItemInfoProps = {
  icon: React.ReactNode;
  nativeLanguage?: string;
  region?: string;
  price?: number;
  children?: React.ReactNode;
};
