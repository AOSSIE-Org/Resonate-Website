import React, { useState } from "react";
import { useEffect } from "react";
import Image from "./image";

const CLIENT_ID = "Iv1.1c4f3b6d9b0f1b7d"; //Add your client id here for github signin.

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignin = (event) => {
        event.preventDefault();
        // TODO: Implement signin logic
        console.log(`Signing in with email: ${email} and password: ${password}`);
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        // TODO: Implement forgot password logic
        console.log(`Forgot password for email: ${email}`);
    };

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get('code');
        console.log(codeParams);
    },[]);

    function handleGithubSignin() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
        console.log("Signing in with Github");
    };

    const handleGoogleSignin = (event) => {
        event.preventDefault();
        // TODO: Implement Google signin logic
        console.log("Signing in with Google");
    };

    const handleLinkedinSignin = (event) => {
        event.preventDefault();
        // TODO: Implement LinkedIn signin logic
        console.log("Signing in with LinkedIn");
    };

    return (
    <div className="flex">
        <Image />

        <div className="container mx-auto p-4">
    
            <h1 className="text-2xl font-bold mb-4">Signin</h1>
            <form onSubmit={handleSignin} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                        />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                        />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
                    Signin
                </button>
            </form>
            <div className="mb-4">
                <button onClick={handleGithubSignin} className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900">
                    Signin with Github
                </button>
            </div>
            <div className="mb-4">
                <button onClick={handleGoogleSignin} className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                    Signin with Google
                </button>
            </div>
            <div className="mb-4">
                <button onClick={handleLinkedinSignin} className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900">
                    Signin with LinkedIn
                </button>
            </div>
            <div>
                <button onClick={handleForgotPassword} className="text-blue-500 hover:underline">
                    Forgot Password
                </button>
            </div>
        </div>
    </div>
    );
};

export default Signin;