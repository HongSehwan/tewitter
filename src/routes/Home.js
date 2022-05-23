import React from "react";
import { authService } from "fbase";

const Home = () => {
    const SignOut = () => {
        if (authService.currentUser) {
            authService.signOut();
        }
    };
    return (
        <div>
            <span>Home</span>
            <div>
                <button onClick={SignOut}>Sign Out</button>
            </div>
        </div>
    );
};

export default Home;
