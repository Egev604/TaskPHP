import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {AuthRegistration} from "../../Model/Auth";
import {Link, useNavigate} from "react-router-dom";
import {regRequest} from "../../service/AuthService";
interface AuthorizationProps {
    onLogin: () => void;
}
const Registration: React.FC<AuthorizationProps> = (props) => {
    const [login,  setLogin] = useState<string>("")
    const [password,  setPassword] = useState<string>("")
    const [userName,  setUserName] = useState<string>("")
    const [error, setError]=useState<string>("")
    const navigate = useNavigate();
    const handleRegistration = async () => {
        const authRegistration: AuthRegistration = {
            userName:userName,
            login: login,
            password: password
        }
        try {
            const response = await regRequest(authRegistration);
            if (response.success) {
                props.onLogin();
                navigate('/main');
            } else if (response.error) {
                if (response.error === 'user_already_exists') {
                    setError("Пользователь уже существует.");
                } else {
                    setError("Произошла ошибка регистрации. Пожалуйста, попробуйте еще раз.");
                }
            }
        } catch (error) {
            setError('Произошла ошибка при обработке регистрации');
        }
    }
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Регистрация</h1>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextField id="outlined-basic" label="UserName" variant="outlined" value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>
                <TextField id="outlined-basic" label="Login" variant="outlined" value={login}
                           onChange={(e) => setLogin(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" onClick={handleRegistration}>Register</Button>
                <Link to="/login">
                    <Button href="#text-buttons">Логин</Button>
                </Link>
                {error && <h4 style={{ color: 'red' }}>{error}</h4>}
            </div>
        </>
    );
};

export default Registration;