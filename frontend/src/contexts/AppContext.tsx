import React, { useContext, useState, useEffect } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    loading: boolean; 
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

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