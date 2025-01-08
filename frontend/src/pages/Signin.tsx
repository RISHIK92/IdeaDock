import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        alert("You are successfully signed in!");
        navigate("/dashboard");
    };


    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded border min-w-48 p-4">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />

            <div className="flex justify-center pt-4 text-center">
                <Button variant="primary" text="Sign In" size="md" fullWidth={true} onClick={signin}/>
            </div>
        </div>
    </div>
};