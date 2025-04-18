import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const logout = () => {
        setAuth({ role: null, accessToken: null });
        sessionStorage.removeItem("auth");
    };

    return { auth, setAuth, logout };
}

export default useAuth;
