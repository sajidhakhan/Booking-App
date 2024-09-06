import React, { useContext, useState, useEffect } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    loading: boolean; 
    stripePromise: Promise<Stripe | null>;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const { isError, isLoading } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
        onSettled: () => {
            setLoading(false);
        },
    });

    useEffect(() => {
        if (isError) {
           
            localStorage.removeItem("token");
          
        }
    }, [isError]);

    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError && !isLoading, 
            loading,
            stripePromise,
        }}>
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />
            )}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context as AppContext;
};