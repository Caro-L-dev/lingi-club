import { Euro, Flag, MapPin } from "lucide-react";
import { HostFamilyCardProps } from "@/types/HostFamily";
import ItemInfo from "./ItemInfo";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


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
    <Card className="relative flex flex-col overflow-hidden max-w-[600px] min-w-[320px]">
      <CardHeader className="relative">
        <img
          className="w-full object-cover object-center"
          src={image || defaultImage}
          alt={title}
        />
      </CardHeader>

      <CardContent className="relative flex-grow">
        <CardContent>
          <div className="flex flex-col lg:flex-row sm:justify-between items-center">
            <div className="flex gap-2 mb-4 lg:mb-0 flex-col">
              <ItemInfo nativeLanguage={nativeLanguage} icon={<Flag />} />
              <ItemInfo region={region} icon={<MapPin />} />
              <ItemInfo price={price} icon={<Euro />}>
                / semaine
              </ItemInfo>
            </div>
            <Button className="w-full lg:w-fit">Réserver</Button>
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
