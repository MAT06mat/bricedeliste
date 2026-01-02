import { createContext } from "react";

export interface Auth {
    email: string;
    pass: string;
}

interface AuthContextType {
    auth: Auth;
    isLoggedIn: boolean;
    login: (authData: Auth) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
