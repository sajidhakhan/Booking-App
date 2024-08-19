import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from "react-query";
import  * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContent";
import { useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
     
    const queryCilent = useQueryClient(); 
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { register, handleSubmit, formState: {errors} } = useForm<SignInFormData>();
    
    const mutation = useMutation(apiClient.signIn,{
        onSuccess:async ()=>{
          showToast({
            message: "SignIn successful",
            type: "SUCCESS"
          });
          await queryCilent.invalidateQueries("validateToken");
          navigate("/")
        },
        onError: (error: Error )=>{
          showToast({
            message: error.message,
            type: "ERROR"
          });
        }
      });

      const onSubmit = (data: SignInFormData) => {
        mutation.mutate(data);
      };

  return (

    <form className='flex  flex-col gap-5' onSubmit={handleSubmit(onSubmit)} >
        <h2 className='text-3xl text-center font-bold'>
            Sign In
        </h2>

        <label className="text-gray-700 text-sm font-bold">
          Email
          <input 
            type="email"
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("email", { required: "This field is required" })} 
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Password
          <input 
            type="password"
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("password", { 
              required: "This field is required", 
              minLength: { value: 6, message: "Password must be at least 6 characters" } 
            })} 
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </label>
        <span>
          <button 
            type="submit" 
            className="bg-blue-800 text-white p-2 font-bold rounded hover:bg-blue-700 text-xl transition duration-200">
            Login
          </button>
        </span>
    </form>

  )
}

export default SignIn