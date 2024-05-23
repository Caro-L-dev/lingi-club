import { Euro, Flag, MapPin } from "lucide-react";

import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

interface HostFamilyCardProps {
  title: string;
  description: string;
  price: number;
  region: string;
  nativeLanguage: string;
  accept?: string[];
}

export default function HostFamilyCard({
  title,
  description,
  price,
  region,
  nativeLanguage,
  accept = [],
}: HostFamilyCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col md:flex-row md:justify-between items-center py-2">
          <div className="flex gap-4 my-4">
            <ItemInfo children={nativeLanguage} icon={<Flag />} />
            <ItemInfo children={region} icon={<MapPin />} />
            <ItemInfo children={`${price}€/sem`} icon={<Euro />} />
          </div>
          <Button className="w-full md:w-fit">Réserver</Button>
        </div>
      </CardContent>

      <CardContent className="border-t border-t-secondary pt-4 mx-4">
        <CardTitle className="text-secondary text-balance py-2">
          Bienvenue chez {title}
        </CardTitle>

        <CardDescription className="line-clamp-3 tracking-tight my-2 mb-4">
          {description}
        </CardDescription>

        {accept && (
          <CardDescription className="border-t border-t-muted pt-4">
            Accepte : {accept.join(", ")}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}

interface ItemInfoProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ItemInfo = ({ icon, children }: ItemInfoProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <span className="text-secondary">{icon}</span>
      <p>{children}</p>
    </div>
  );
};
