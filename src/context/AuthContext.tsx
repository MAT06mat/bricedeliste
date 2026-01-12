import { createContext } from "react";

export interface Auth {
    email: string;
    pass: string;
}

interface AuthContextType {
    auth: Auth;
    super_admin: boolean;
    isLoggedIn: boolean;
    login: (authData: Auth, super_admin: boolean) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
