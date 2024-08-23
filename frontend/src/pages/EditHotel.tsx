import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiCilent from '../api-client';
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
 
    const { hotelId } = useParams();

    const { data: hotel } = useQuery("fetchMyHotelById", () =>
     apiCilent.fetchMyHotelById(hotelId || ''),{
        enabled: !!hotelId,
     }
    );

    const { mutate, isLoading } = useMutation(apiCilent.updateMyHotelById,{
      onSuccess: () =>{},
      onError: () => {}
    });
    
    const handleSave = (hotelFormData: FormData) => {
      mutate(hotelFormData);
    }

  return (
    <ManageHotelForm hotel = { hotel } onSave={handleSave}  isLoading={isLoading} />
  )
}

export default EditHotel