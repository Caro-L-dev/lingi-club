import Details from "./details/Details";
import Sidebar from "./sidebar/Sidebar";

const FamilyDetails = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <Details />
      <Sidebar />
    </div>
  );
};

export default FamilyDetails;
