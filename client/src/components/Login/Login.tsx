import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {loginRequest} from "../../service/AuthService";
import {AuthLogin} from "../../Model/Auth";
import {Link, useNavigate} from "react-router-dom";
interface AuthorizationProps {
    onLogin: () => void;
}
const Login: React.FC<AuthorizationProps> = (props) => {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError]=useState<string>("")
    const navigate = useNavigate();
    const handleLogin = async () => {
        const authLogin: AuthLogin = {
            login: login,
            password: password
        }
        try {
            const response = await loginRequest(authLogin);
            if (response.success) {
                props.onLogin();
                navigate('/main');
            } else if (response.error && response.error.includes('SQL')) {
                setError("Произошла ошибка. Попробуйте позже");
            } else if (response.error) {
                setError(response.error);
            }
        } catch (error) {
            setError('Произошла ошибка при обработке регистрации');
        }
    }
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Вход</h1>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextField id="outlined-basic" label="Login" variant="outlined" value={login}
                           onChange={(e) => setLogin(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <Link to="/registration">
                    <Button href="#text-buttons">Зарегистрироваться</Button>
                </Link>
                {error && <h4 style={{ color: 'red' }}>{error}</h4>}
            </div>
        </>
    );
};

export default Login;