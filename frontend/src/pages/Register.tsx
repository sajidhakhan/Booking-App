import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import  * as apiClient from '../api-client';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}


const Register = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
 
  const mutation = useMutation(apiClient.register,{
    onSuccess:()=>{
      console.log("registration successful")
    },
    onError: (error: Error )=>{
      console.log(error.message);
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen"> 
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 bg-white p-6 rounded shadow-md w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center'>
          Create an Account
        </h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input 
              className="border rounded w-full py-1 px-2 font-normal" 
              {...register("firstName", { required: "This field is required" })} 
            />
            {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input 
              className="border rounded w-full py-1 px-2 font-normal" 
              {...register("lastName", { required: "This field is required" })} 
            />
            {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
          </label>
        </div>
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
        <label className="text-gray-700 text-sm font-bold">
          Confirm Password
          <input 
            type="password"
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) => {
                const password = watch("password");
                return password === value || "Passwords do not match";
              }
            })} 
          />
          {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
        </label>
        <span>
          <button 
            type="submit" 
            className="bg-blue-800 text-white p-2 font-bold rounded hover:bg-blue-700 text-xl transition duration-200">
            Create Account
          </button>
        </span>
      </form>
    </div>
  );
};

export default Register;