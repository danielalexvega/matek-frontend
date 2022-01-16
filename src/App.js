import React, { useState, useCallback, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import Homepage from "./homepage/page/homepage";
import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import AllProblems from "./problems/pages/AllProblems";
import NewProblem from "./problems/pages/NewProblem";
import UserProblems from "./problems/pages/UserProblems";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LearnMore from "./learn-more/pages/LearnMore";
import UpdateProblem from "./problems/pages/UpdateProblem";

import { AuthContext } from "./shared/context/auth-context";

const App = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();

    const login = useCallback((uid, name, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        setUserName(name);
        const tokenExpirationDate =
            expirationDate ||
            new Date(new DataTransfer.getTime() + 1000 * 60 * 60);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid,
                name: name,
                token: token,
                expiration: tokenExpirationDate.toISOString(),
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.userId, storedData.name, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Homepage />
                </Route>
                <Route path="/problems" exact>
                    <AllProblems />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/:userId/problems" exact>
                    <UserProblems />
                </Route>
                <Route path="/problems/new" exact>
                    <NewProblem />
                </Route>
                <Route path="/problems/:problemId">
                    <UpdateProblem />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Route path="/learn-more">
                    <LearnMore />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Homepage />
                </Route>
                <Route path="/problems" exact>
                    <AllProblems />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Route path="/learn-more">
                    <LearnMore />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                userName: userName,
                login: login,
                logout: logout,
            }}
        >
            <Router>
                <MainNavigation />
                {routes}
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
