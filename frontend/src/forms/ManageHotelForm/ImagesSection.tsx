import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();

    const existngImageUrls = watch("imageUrls");

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) =>{
        event.preventDefault();
        setValue("imageUrls", existngImageUrls.filter((url)=> url !== imageUrl));
    };

  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
            {existngImageUrls && (
                <div className="grid grid-cols-6 gap-4">
                    {existngImageUrls.map((url,index)=>(
                        <div key={index} className="relative group">
                            <img  src={url} className="min-h-full object-cover"/>
                            <button 
                            onClick={(event)=> handleDelete(event, url)}
                            className="text-white absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 ">Delete</button>
                        </div>
                    ))}
                </div>
            )}
            <input 
            type="file"
            multiple
            accept="image/*"
            className="w-full text-gray-700 font-normal"
            {...register("imageFiles",{
                validate: (imageFiles) =>{
                    const totalLen = imageFiles.length + (existngImageUrls?.length || 0 );

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