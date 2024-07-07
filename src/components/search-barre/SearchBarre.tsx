import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { frenchRegions } from "@/api/regions";
import { FormValuesType } from "@/types/Forms";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const SearchBarre = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<FormValuesType>();

    const onSubmit: SubmitHandler<FormValuesType> = (data) => {
        // CHANGER L'URL DE LA PAGE
        navigate("/search-familly", { state: { key: data } });
        reset();
    };

    return (
        <div
            className="relative flex h-[390px] w-full items-center bg-cover bg-center"
            style={{ backgroundImage: `url("/bannersearchbarre.jpg")` }}
        >
            <div className="flex justify-center items-center w-full">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col xl:flex-row items-center justify-center p-4 bg-white rounded-xl gap-4"
                >
                    <div className="">
                        <Select
                            onValueChange={(value) =>
                                setValue("language", value)
                            }
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue
                                    placeholder="Choisir une langue:"
                                    id="language"
                                    {...register("language", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est requis",
                                        },
                                    })}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">Anglais</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.language && <span>Choisissez une langue</span>}
                    </div>

                    <div className="">
                        <Select
                            onValueChange={(value) => setValue("region", value)}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue
                                    placeholder="Choisir une région:"
                                    id="region"
                                    {...register("region", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est requis",
                                        },
                                    })}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {frenchRegions.map((region) => (
                                    <SelectItem key={region} value={region}>
                                        {region}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.region && <span>Choisissez une région</span>}
                    </div>

                    <Button type="submit">Rechercher</Button>
                </form>
            </div>
        </div>
    );
};

export default SearchBarre;
