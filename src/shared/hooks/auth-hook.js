import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);
    const [userName, setUserName] = useState(false);
    const [userImage, setUserImage] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((uid, name, token, expirationDate, image) => {
        setToken(token);
        setUserId(uid);
        setUserName(name);
        setUserImage(image);

        const tokenExpiration =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpiration);

        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid, 
                name: name,
                token: token,
                expiration: tokenExpiration.toISOString(),
                image: image
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);
        setTokenExpirationDate(null);
        setUserImage(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(
                storedData.userId,
                storedData.name,
                storedData.token,
                new Date(storedData.expiration),
                storedData.image
            );
        }
    }, [login]);

    return { token, userId, userName, login, logout, userImage };
};
