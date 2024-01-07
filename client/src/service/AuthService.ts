import axios from "axios";
import {IResponse} from "../Model/Response";
import {AuthLogin, AuthRegistration} from "../Model/Auth";
export const BASE_URL= "http://api/"
export const loginRequest = async (data: AuthLogin): Promise<IResponse> => {
    try {
        const response = await axios.post<IResponse>(BASE_URL + 'login.php', data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса loginRequest:', error);
        throw error;
    }
};

export const regRequest = async (data: AuthRegistration): Promise<IResponse> => {
    try {
        const response = await axios.post<IResponse>(BASE_URL + 'registration.php', data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса regRequest:', error);
        throw error;
    }
};