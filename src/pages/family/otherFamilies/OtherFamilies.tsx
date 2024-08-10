import { RegionType, UserType } from "@/types/User";
import { Link } from "react-router-dom";


type OtherFamiliesType = {
    otherFamily: UserType[] | [];
    region: RegionType;
    familyShowId: string
};

export default function OtherFamilies({
    otherFamily,
    region,
    familyShowId,
}: OtherFamiliesType) {
    const familySameRegion = otherFamily.filter(
        (family) => family.region === region && family.uid !== familyShowId
    );

    return (
        <div className="text-center my-12">
            <p className="text-2xl">
                Découvrez d'autres séjours en famille d'accueil
            </p>
            <p className="my-4">
                Ces familles sont aussi disponibles dans la région de{" "}
                <span className="text-secondary font-bold">{region}</span>.
            </p>
            <div className="flex flex-col flex-wrap gap-4 justify-center items-center md:flex-row ">
                {familySameRegion.length > 0 ? (
                    <>
                        {familySameRegion.map((family, index) => (
                            <div
                                key={index}
                                className="w-full md:w-72 h-52 bg-neutral-100"
                            >
                                <Link
                                    to={`/family-infos/${family.uid}`}
                                    state={family}
                                >
                                    <img
                                        src={family.photoUrl}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </Link>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <p>Aucunes familles</p>
                    </>
                )}
            </div>
        </div>
    );
}
