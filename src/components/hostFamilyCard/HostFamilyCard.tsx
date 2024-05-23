import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Flag, MapPin } from "lucide-react";

export default function HostFamilyCard() {
  return (
    <>
      <h1>Host Family Card en cours de création</h1>
      <Card>
        <div className="w-full overflow-hidden rounded-lg bg-card">
          <div className="p-14 bg-gradient-to-r from-primary to-secondary ">
            <span className="text-white flex justify-center items-center font-bold">
              300€ / sem
            </span>
          </div>
        </div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-6 mb-2">
              <p className="flex items-center gap-x-2">
                {" "}
                <Flag className="text-secondary" /> Anglais
              </p>
              <p className="flex items-center gap-x-2">
                {" "}
                <MapPin className="text-secondary" />
                Normandie
              </p>
            </div>

            <Button>Réserver</Button>
          </div>
          <span className="border border-secondary" />
        </CardHeader>
        <CardContent>
          <CardTitle className="my-2 text-secondary">
            Bienvenue dans la famille de Jennifer et Jason
          </CardTitle>
          <CardDescription className="my-4">
            <p>
              Bienvenue dans la famille de Pablo et Tania Bonjour, nous
              souhaitons nous présenter et que vous appreniez à nous connaître
              un peu à travers ces mots : Notre famille est composée du père
              (Pablo), de la mère (Tania) et des filles (Naia et Lexa). Nous
              voulons décrire un peu les caractéristiques les plus importantes
              de chacun d'entre nous : Pablo : J'ai 44 ans et je travaille dans
              le secteur de la santé, dans une entreprise pharmaceutique
              multinationale. Je gère la zone nord de l'Espagne et j'ai
              plusieurs personnes sous ma responsabilité. Au quotidien, du lundi
              au jeudi, je consacre de nombreuses heures à mon travail, mais le
              week-end et le vendredi, je me consacre exclusivement à ma
              famille. J'ai pratiqué beaucoup de sports, mais pour être honnête,
              ces dernières années, j'ai laissé de côté ces passe-temps.
              J'espère les reprendre dans les prochains mois, car mes filles
              grandissent et deviennent de moins en moins dépendantes. Le
              cyclisme, le paddle-tennis ou la natation étaient mes principaux
              passe-temps, ainsi que les promenades avec les chiens sur la
              plage. J'ai hâte de surfer bientôt et qui sait, peut-être cette
              année, et nous pourrons partager ce début. Mon caractère est
              jovial et drôle, bien que je sois aussi très ordonné et strict en
              ce qui concerne la propreté et l'ordre. Tania : J'ai 41 ans et
              j'ai fait du ballet et été danseuse toute ma vie. Maintenant, je
              suis professeur de danse et de pilates. J'ai une journée de
              travail réduite pour m'occuper des filles et je travaille
              uniquement 2,5 jours par semaine. J'adore cuisiner et profiter
              d'un bon café en terrasse. Je suis très casanière et, comme j'ai
              beaucoup d'activité dans mon travail, quand je ne travaille pas,
              je suis très calme et sereine. Je préfère consacrer mon temps à me
              former dans d'autres domaines et à travailler à la maison. J'aime
              beaucoup voyager et aller à la piscine. Naia et Lexa : nous sommes
              deux filles de 7 et 5 ans. Nous faisons du patinage, mais notre
              grand défi quotidien est d'être des gymnastes. Nous nous
              entraînons beaucoup chaque semaine pour cela et nous espérons
              pouvoir participer au championnat espagnol de gymnastique
              artistique cette année. Nous aimons beaucoup l'anglais et les
              mathématiques, et surtout, nous jouons à tout. Nous avons une
              piscine à la maison et quand le temps est beau, c'est notre grande
              passion de pouvoir nous baigner et jouer, car nous passons des
              heures dans la piscine.
            </p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p>Accepte: 10-18 ans</p>
        </CardFooter>
      </Card>
    </>
  );
}
