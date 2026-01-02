import { AuthContext, type Auth } from "../context/AuthContext";
import { usePersistedState } from "../hooks/usePersistedState";

// Storage keys
const AUTH_KEY = "auth";
const LOGGED_IN_KEY = "isLoggedIn";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [auth, setAuth] = usePersistedState<Auth>(AUTH_KEY, {
        email: "",
        pass: "",
    });
    console.log(auth);
    const [isLoggedIn, setIsLoggedIn] = usePersistedState<boolean>(
        LOGGED_IN_KEY,
        true
    );

    const login = (authData: Auth) => {
        setAuth(authData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setAuth({ email: "", pass: "" });
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ auth, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
