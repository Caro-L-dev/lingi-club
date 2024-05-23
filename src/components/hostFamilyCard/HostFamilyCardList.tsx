import HostFamilyCard from "./HostFamilyCard";

const hostFamilies = [
  {
    id: 1,
    title: "Maud",
    description:
      "Votre séjour linguistique en immersion en famille d'accueil en Angleterre Linguifamily est la 1ère plateforme française de séjours linguistiques en famille d'accueil. Créée pour faciliter l'apprentissage des langues et la découverte d'autres cultures, le site s'adresse à des jeunes, étudiants, adultes et retraités souhaitant réserver un séjour en immersion en famille d'accueil l'étranger - ou en France. Linguifamily répertorie des familles d’accueil expérimentées et soigneusement vérifiées en Angleterre, Irlande, Espagne, Italie, Malte, Etats-Unis et France Vous y trouverez des familles d'accueil proposant une immersion linguistique de qualité, avec ou sans cours de langue et activités sportives. Nous ne sommes pas un organisme de séjours linguistiques.",
    price: 300,
    region: "Ile-de-France",
    nativeLanguage: "Anglais",
    accept: ["10-18 ans", " 18-25 ans", " adulte(s)", " couple(s)"],
  },
  {
    id: 2,
    title: "les Smiths",
    description:
      "Votre séjour linguistique en immersion en famille d'accueil en Angleterre Linguifamily est la 1ère plateforme française de séjours linguistiques en famille d'accueil. Créée pour faciliter l'apprentissage des langues et la découverte d'autres cultures, le site s'adresse à des jeunes, étudiants, adultes et retraités souhaitant réserver un séjour en immersion en famille d'accueil l'étranger - ou en France. Linguifamily répertorie des familles d’accueil expérimentées et soigneusement vérifiées en Angleterre, Irlande, Espagne, Italie, Malte, Etats-Unis et France Vous y trouverez des familles d'accueil proposant une immersion linguistique de qualité, avec ou sans cours de langue et activités sportives. Nous ne sommes pas un organisme de séjours linguistiques.",
    price: 350,
    region: "Hauts-de-France",
    nativeLanguage: "Anglais",
    accept: ["10-18 ans"],
  },
  {
    id: 3,
    title: "Marie & Michelle",
    description:
      "Votre séjour linguistique en immersion en famille d'accueil en Angleterre Linguifamily est la 1ère plateforme française de séjours linguistiques en famille d'accueil. Créée pour faciliter l'apprentissage des langues et la découverte d'autres cultures, le site s'adresse à des jeunes, étudiants, adultes et retraités souhaitant réserver un séjour en immersion en famille d'accueil l'étranger - ou en France. Linguifamily répertorie des familles d’accueil expérimentées et soigneusement vérifiées en Angleterre, Irlande, Espagne, Italie, Malte, Etats-Unis et France Vous y trouverez des familles d'accueil proposant une immersion linguistique de qualité, avec ou sans cours de langue et activités sportives. Nous ne sommes pas un organisme de séjours linguistiques.",
    price: 300,
    region: "Auvergne",
    nativeLanguage: "Anglais",
  },
  {
    id: 4,
    title: "Arriette",
    description:
      "Votre séjour linguistique en immersion en famille d'accueil en Angleterre Linguifamily est la 1ère plateforme française de séjours linguistiques en famille d'accueil. Créée pour faciliter l'apprentissage des langues et la découverte d'autres cultures, le site s'adresse à des jeunes, étudiants, adultes et retraités souhaitant réserver un séjour en immersion en famille d'accueil l'étranger - ou en France. Linguifamily répertorie des familles d’accueil expérimentées et soigneusement vérifiées en Angleterre, Irlande, Espagne, Italie, Malte, Etats-Unis et France Vous y trouverez des familles d'accueil proposant une immersion linguistique de qualité, avec ou sans cours de langue et activités sportives. Nous ne sommes pas un organisme de séjours linguistiques.",
    price: 300,
    region: "Ile-de-France",
    nativeLanguage: "Anglais",
    accept: ["10-18 ans", " 18-25 ans", " adulte(s)", " couple(s)"],
  },
  {
    id: 5,
    title: "Potter",
    description:
      "Votre séjour linguistique en immersion en famille d'accueil en Angleterre Linguifamily est la 1ère plateforme française de séjours linguistiques en famille d'accueil. Créée pour faciliter l'apprentissage des langues et la découverte d'autres cultures, le site s'adresse à des jeunes, étudiants, adultes et retraités souhaitant réserver un séjour en immersion en famille d'accueil l'étranger - ou en France. Linguifamily répertorie des familles d’accueil expérimentées et soigneusement vérifiées en Angleterre, Irlande, Espagne, Italie, Malte, Etats-Unis et France Vous y trouverez des familles d'accueil proposant une immersion linguistique de qualité, avec ou sans cours de langue et activités sportives. Nous ne sommes pas un organisme de séjours linguistiques.",
    price: 350,
    region: "Hauts-de-France",
    nativeLanguage: "Anglais",
    accept: ["10-18 ans"],
  },
  {
    id: 6,
    title: "Dupont",
    description:
      "Votre séjour linguistique en immersion en famille d'accueil en Angleterre Linguifamily est la 1ère plateforme française de séjours linguistiques en famille d'accueil. Créée pour faciliter l'apprentissage des langues et la découverte d'autres cultures, le site s'adresse à des jeunes, étudiants, adultes et retraités souhaitant réserver un séjour en immersion en famille d'accueil l'étranger - ou en France. Linguifamily répertorie des familles d’accueil expérimentées et soigneusement vérifiées en Angleterre, Irlande, Espagne, Italie, Malte, Etats-Unis et France Vous y trouverez des familles d'accueil proposant une immersion linguistique de qualité, avec ou sans cours de langue et activités sportives. Nous ne sommes pas un organisme de séjours linguistiques.",
    price: 300,
    region: "Auvergne",
    nativeLanguage: "Anglais",
  },
];

export default function HostFamilyCardList() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {hostFamilies.map((hostFamily) => (
        <HostFamilyCard
          key={hostFamily.id}
          title={hostFamily.title}
          description={hostFamily.description}
          price={hostFamily.price}
          region={hostFamily.region}
          nativeLanguage={hostFamily.nativeLanguage}
          accept={hostFamily.accept}
        />
      ))}
    </div>
  );
}
