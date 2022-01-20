import { useState } from 'react';
import { Navigate } from "react-router-dom";

export default function useLogin() {
    const getLogin = () => {
        const loginString = sessionStorage.getItem("login");
        const userLogin = JSON.parse(loginString);
        return userLogin
    };
    const [login, setLogin] = useState(getLogin());

    const saveLogin = userLogin => {
        sessionStorage.setItem("login", JSON.stringify(userLogin));
        setLogin(userLogin)
    };

    const removeLogin = () => {
        sessionStorage.removeItem("login")
    }

    return {
        setLogin: saveLogin,
        login,
        removeLogin
    }

}