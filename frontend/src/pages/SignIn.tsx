import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient(); 
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
    const location = useLocation();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({
                message: "SignIn successful",
                type: "SUCCESS"
            });
            await queryClient.invalidateQueries("validateToken");
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
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
        <div className="flex items-center justify-center"> 
            <form className='flex w-2/5 flex-col gap-5 bg-white shadow-lg p-6 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-3xl text-center font-bold'>
                    Sign In
                </h2>

                <label className="text-gray-700 text-sm font-bold">
                    Email
                    <input 
                        type="email"
                        className="border rounded w-full py-2 px-3 font-normal" 
                        {...register("email", { required: "This field is required" })} 
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </label>
                <label className="text-gray-700 text-sm font-bold">
                    Password
                    <input 
                        type="password"
                        className="border rounded w-full py-2 px-3 font-normal" 
                        {...register("password", { 
                            required: "This field is required", 
                            minLength: { value: 6, message: "Password must be at least 6 characters" } 
                        })} 
                    />
                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </label>
                <span className='flex items-center justify-between'>
                    <span className='text-sm'>
                        Not Registered? <Link to="/register" className="text-blue-800 underline">Create an account here</Link>
                    </span>
                    <button 
                        type="submit" 
                        className="bg-[#4e31aa] text-white p-2 font-bold rounded hover:bg-[#7050d7] text-xl transition duration-200">
                        Login
                    </button>
                </span>
            </form>
        </div>
    );
}

export default SignIn;