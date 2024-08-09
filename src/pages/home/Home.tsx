import HostFamilyCardList from "@/components/hostFamilyCard/HostFamilyCardList";
import SearchBarre from "@/components/search-barre/SearchBarre";

export default function Home() {
  return (
    <>
      <SearchBarre />
      <HostFamilyCardList />
    </>
  );
}
