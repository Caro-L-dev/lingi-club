import { Euro, Flag, MapPin } from "lucide-react";
import { UserType } from "@/types/User";
import ItemInfo from "./ItemInfo";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  hostFamily: UserType;
};

export default function HostFamilyCard({ hostFamily }: Props) {
  const defaultImage = "/images/family.jpg";
  const navigate = useNavigate()

  return (
      <Card className="relative flex flex-col overflow-hidden cursor-pointer max-w-[600px]">
          <Link to={`/family-infos/${hostFamily.uid}`} state={hostFamily}>
              <CardHeader className="w-full">
                  <img
                      className="w-full object-cover object-center"
                      src={hostFamily.photoUrl || defaultImage}
                      alt={hostFamily.displayName ?? "Family"}
                  />
              </CardHeader>

              <CardContent className="flex-grow">
                  <CardContent>
                      <div className="flex flex-col lg:flex-row sm:justify-between items-center">
                          <div className="flex gap-2 mb-4 lg:mb-0 flex-col">
                              <ItemInfo
                                  nativeLanguage={
                                      hostFamily.familyLangages ?? "Langues ?"
                                  }
                                  icon={<Flag />}
                              />
                              <ItemInfo
                                  region={hostFamily.region}
                                  icon={<MapPin />}
                              />
                              <ItemInfo
                                  price={hostFamily.familyDalyRate ?? 0}
                                  icon={<Euro />}
                              >
                                  / jour
                              </ItemInfo>
                          </div>
                          <Button
                              className="w-full lg:w-fit"
                              onClick={() => navigate("/not-sale")}
                          >
                              Réserver
                          </Button>
                      </div>
                  </CardContent>
                  <CardContent className="border-t border-t-secondary pt-4">
                      <CardTitle className="text-secondary text-balance py-2">
                          Bienvenue chez la famille{" "}
                          <span className="text-gray-600">
                              {hostFamily.displayName}
                          </span>
                      </CardTitle>

                      <CardDescription className="line-clamp-3 tracking-tight my-2 mb-4">
                          {hostFamily.description}
                      </CardDescription>

                      {/* {hostFamily.accept && hostFamily.accept.length > 0 && (
              <CardDescription className="border-t border-t-muted pt-4">
                Accepte : {hostFamily.accept.join(", ")}
              </CardDescription>
            )} */}
                  </CardContent>
              </CardContent>
          </Link>
      </Card>
  );
}
