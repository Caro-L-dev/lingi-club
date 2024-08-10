import { RegionType, UserType } from "@/types/User";
import { Link } from "react-router-dom";


type OtherFamiliesType = {
    otherFamilly: UserType[] | [];
    region: RegionType;
    famillyShowId: string
};

export default function OtherFamilies({
    otherFamilly,
    region,
    famillyShowId,
}: OtherFamiliesType) {
    const famillySameRegion = otherFamilly.filter(
        (familly) => familly.region === region && familly.uid !== famillyShowId
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
                {famillySameRegion.length > 0 ? (
                    <>
                        {famillySameRegion.map((familly, index) => (
                            <div
                                key={index}
                                className="w-full md:w-72 h-52 bg-neutral-100"
                            >
                                <Link
                                    to={`/family-infos/${familly.uid}`}
                                    state={familly}
                                >
                                    <img
                                        src={familly.photoUrl}
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
