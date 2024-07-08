import { RegionType } from "./User";

export type HostFamilyCardProps = {
  id?: number;
  title: string;
  image: string;
  description: string;
  price: number;
  region: RegionType;
  nativeLanguage: string;
  accept?: string[];
};

export type ItemInfoProps = {
  icon: React.ReactNode;
  nativeLanguage?: string;
  region?: RegionType;
  price?: number;
  children?: React.ReactNode;
};
