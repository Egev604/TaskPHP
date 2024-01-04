import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {authAPI} from "../../service/AuthService";
import {AuthLogin} from "../../Model/Auth";
import {Link} from "react-router-dom";

const Login = () => {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [authLoginApi, {error: createError, isLoading: isCreatLoading}] = authAPI.useAuthLoginMutation()
    const handleLogin = () => {
        const authLogin: AuthLogin = {
            login: login,
            password: password
        }
        authLoginApi(authLogin)
    }
    return (
        <>
            <h1>Вход</h1>
            <TextField id="outlined-basic" label="Login" variant="outlined" value={login}
                       onChange={(e) => setLogin(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" onClick={handleLogin}>Login</Button>
            <Link to="/register">
                <Button variant="contained">Зарегистрироваться</Button>
            </Link>
        </>
    );
};

export default Login;