// import React from "react";
import { Button } from "../../style/style.component";
import "../login/login.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



const Login = () => {

    const navigate = useNavigate();
    const [username, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const tekshiramiz = () => {

        if (username === "Saidazimxon" && password === "123456789") {
            alert("Login va parol to'g'ri kiritildi");
            navigate("/home"); // Kichik harf bilan yozish tavsiya etiladi
        } else {
            alert("Login yoki parol xato");
            setuserName("");
            setPassword("");
        }

    };
    return (
        <div className="login">
            <h3>Login Page</h3>
            <br />
            <div className="inputlar">
                <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setuserName(e.target.value)}
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={tekshiramiz}>Enter</Button>
            </div>





        </div>
    );
}

export default Login;