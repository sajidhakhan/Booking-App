import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from './DetailsSection';
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: string;
    starRating: string;
    facilities: string[];
    imageFiles: FileList; 
    adultCount: number;
    childCount: number;
}

const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = ((formDataJson: HotelFormData) => {
        const formData = new FormData();
        formData.append("name",formDataJson.name);
        formData.append("city",formDataJson.city);
        formData.append("country",formDataJson.country);
        formData.append("description",formDataJson.description);
        formData.append("type",formDataJson.type);
        formData.append("pricePerNight",formDataJson.pricePerNight.toString());
        formData.append("starRating",formDataJson.starRating.toString());
        formData.append("adultCount",formDataJson.adultCount.toString());
        formData.append("childCount",formDataJson.childCount.toString());
        
        formDataJson.facilities.forEach((facility, index) =>{
            formData.append(`facilities[${index}]`,facility)
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile);
        });
    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button type="submit" className="bg-blue-800 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                        Save
                    </button>
                </span>
            </form>
        </FormProvider>
    );
}

export default ManageHotelForm;