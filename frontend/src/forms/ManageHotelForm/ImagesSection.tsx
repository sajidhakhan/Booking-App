import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
            <input 
            type="file"
            multiple
            accept="image/*"
            className="w-full text-gray-700 font-normal"
            {...register("imageFiles",{
                validate: (imageFiles) =>{
                    const totalLen = imageFiles.length;

                    if(totalLen === 0){
                        return "At least one image should be added"
                    }
                    if(totalLen > 6) {
                        return "Total images cannot be more thann 6";
                    }
                    return true;
                },
            })} 
            />
        </div>
        {errors.imageFiles && <span className="font-bold text-red-500 text-xs">{errors.imageFiles.message}</span>}
    </div>
  )
}

export default ImagesSection