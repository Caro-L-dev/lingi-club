import Details from "./details/Details";
import Opinion from "./opinion/Opinion";
import OtherFamilies from "./otherFamilies/OtherFamilies";
import Sidebar from "./sidebar/Sidebar";

const FamilyDetails = () => {
  return (
      <div className="flex flex-col gap-4 xl:flex-row">
        <div>
          <Details />
          <Opinion />
          <OtherFamilies />
        </div>
          <Sidebar />
      </div>
  );
};

export default FamilyDetails;
