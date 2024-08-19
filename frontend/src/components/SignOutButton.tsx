import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContent";
import  * as apiClient from '../api-client';


const SignOutButton = () => {
    
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: () => {
            showToast({
                message: "Signed Out",
                type: "SUCCESS"
            });
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            });
        }
    });

    const handleClick = () => {
        mutation.mutate();
      };
   
  return (
    <button
    onClick={handleClick}
    className=' rounded text-blue-800 px-3 font-bold bg-white hover:bg-gray-100 '>
       Sign Out 
    </button>
  )
}

export default SignOutButton;