import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import Homepage from "./homepage/page/homepage";
import Auth from "./user/pages/Auth";
import AllProblems from "./problems/pages/AllProblems";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Footer from "./shared/components/Navigation/Footer";
import LearnMore from "./learn-more/pages/LearnMore";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewProblem = React.lazy(() => import("./problems/pages/NewProblem"));
const UpdateProblem = React.lazy(() =>
    import("./problems/pages/UpdateProblem")
);
const UserProblems = React.lazy(() => import("./problems/pages/UserProblems"));
const CloneProblem = React.lazy(() => import("./problems/pages/CloneProblem"));

const App = () => {
    const { token, userId, userName, login, logout, userImage } = useAuth();

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
                <Route path="/problems/:problemId/clone" exact>
                    <CloneProblem />
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
                userImage: userImage,
            }}
        >
            <Router>
                <MainNavigation />
                <Suspense
                    fallback={
                        <div className="center">
                            <LoadingSpinner />
                        </div>
                    }
                >
                    {routes}
                </Suspense>
                <Footer />
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
