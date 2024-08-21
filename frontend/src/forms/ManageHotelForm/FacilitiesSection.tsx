import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config"; // Ensure this path is correct
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelFacilities.map((facility, index) => (
                    <label key={index} className="flex text-sm gap-1 text-gray-700">
                        <input 
                            type="checkbox" 
                            value={facility} 
                            {...register("facilities", { 
                                validate : (facilities) =>{
                                    if(facilities && facilities.length > 0){
                                        return true;
                                    }else{
                                        return "At least one facility must be selected";
                                    }
                                }
                                 })} 
                        />
                       {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && <span className="font-bold text-red-500 text-xs">{errors.facilities.message}</span>}
        </div>
    );
};

export default FacilitiesSection;