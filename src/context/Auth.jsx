import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({})

function AuthContextProvider({ children }) {

    const [user, setAuth] = useState({
        user: null,
        status: 'pending'
    });
    const nav = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    function isTokenValid(token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp > (new Date().getTime() / 1000);
    }

    async function getUser() {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            try {
                const noviURL = import.meta.env.VITE_NOVI_URL;
                const result = await axios.get(`${noviURL}/api/user`,
                    {
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": `Bearer ${token}`
                        }
                    });
                setAuth({
                    user: result.data.username,
                    status: 'done',
                });
            } catch (e) {
                setAuth({
                    user: null,
                    status: 'done',
                });
            }
        }
        else {
            setAuth({
                user: null,
                status: 'done',
            });
        }
    }

    function login(userInput) {
        setAuth(
            {
                ...user,
                user: userInput.username,
                status: 'done'
            });
        localStorage.setItem('token', userInput.accessToken);
        setTimeout(() => {
            nav('/account');
        }, 1500);

    };

    function logout() {
        setAuth(
            {
                ...user,
                user: null,
                status: 'done'
            });

        localStorage.removeItem('token');
        setTimeout(() => {
            nav('/account');
        }, 1500);
    };

    const userData = {
        user: user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={userData}>
            {user.status === 'pending'
                ? <p>aan het laden...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;