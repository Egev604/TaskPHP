import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {AuthLogin, AuthRegistration} from "../../Model/Auth";
import {authAPI} from "../../service/AuthService";

const Registration = () => {
    const [login,  setLogin] = useState<string>("")
    const [password,  setPassword] = useState<string>("")
    const [userName,  setUserName] = useState<string>("")
    const [authRegistrationApi, {error: createError, isLoading: isCreatLoading}] = authAPI.useAuthRegistrationMutation()
    const handleRegistration = () => {
        const authRegistration: AuthRegistration = {
            userName:userName,
            login: login,
            password: password
        }
        authRegistrationApi(authRegistration)
    }
    return (
        <>
            <h1>Регистрация</h1>
            <TextField id="outlined-basic" label="UserName" variant="outlined" value={userName}
                       onChange={(e) => setUserName(e.target.value)}/>
            <TextField id="outlined-basic" label="Login" variant="outlined" value={login}
                       onChange={(e) => setLogin(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" onClick={handleRegistration}>Login</Button>
        </>
    );
};

export default Registration;