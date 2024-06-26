import { hostFamilies } from "@/lib/data/data";
import HostFamilyCard from "./HostFamilyCard";

export default function HostFamilyCardList() {
  return (
    <div className="flex flex-wrap gap-4">
      {hostFamilies.map((hostFamily) => (
        <HostFamilyCard
          key={hostFamily.id}
          title={hostFamily.title}
          image={hostFamily.image}
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
