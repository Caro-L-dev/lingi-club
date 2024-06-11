import { Euro, Flag, MapPin } from "lucide-react";

import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HostFamilyCardProps {
  title: string;
  image: string;
  description: string;
  price: number;
  region: string;
  nativeLanguage: string;
  accept?: string[];
}

export default function HostFamilyCard({
  title,
  image,
  description,
  price,
  region,
  nativeLanguage,
  accept = [],
}: HostFamilyCardProps) {
  const defaultImage = "/public/images/family.jpg";

  return (
    <Card className="flex flex-col md:flex-row">
      <CardHeader>
        <img
          className="h-full w-screen object-cover"
          src={image || defaultImage}
          alt={title}
        />
      </CardHeader>

      <CardContent>
        <CardContent>
          <div className="flex flex-col md:flex-row md:justify-between items-center pt-4">
            <div className="flex gap-4 pb-4 md:pb-0">
              <ItemInfo children={nativeLanguage} icon={<Flag />} />
              <ItemInfo children={region} icon={<MapPin />} />
              <ItemInfo children={`${price}€/sem`} icon={<Euro />} />
            </div>
            <Button className="w-full md:w-fit">Réserver</Button>
          </div>
        </CardContent>
        <CardContent className="border-t border-t-secondary pt-4">
          <CardTitle className="text-secondary text-balance py-2">
            Bienvenue chez {title}
          </CardTitle>

          <CardDescription className="line-clamp-3 tracking-tight my-2 mb-4">
            {description}
          </CardDescription>

          {accept.length > 0 && (
            <CardDescription className="border-t border-t-muted pt-4">
              Accepte : {accept.join(", ")}
            </CardDescription>
          )}
        </CardContent>
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
