import HostFamilyCardList from "@/components/hostFamilyCard/HostFamilyCardList";
import SearchBarre from "@/components/search-barre/SearchBarre";

export default function Home() {
  return (
      <>
          <div
              className="relative flex h-[390px] w-full items-center bg-cover bg-center"
              style={{ backgroundImage: `url("/bannersearchbarre.jpg")` }}
          >
              <SearchBarre />
          </div>
          <HostFamilyCardList />
      </>
  );
}