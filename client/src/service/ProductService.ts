import axios from "axios";
import {BASE_URL} from "./AuthService";
import {IResponseProducts} from "../Model/Response";
import {IProduct} from "../Model/Product";

export const fetchProducts = async (search: string): Promise<IResponseProducts> => {
    try {
        const response = await axios.get<IProduct[]>(`${BASE_URL}products.php`, {
            params: {
                search: search,
            },
        });
        return {
            data: response.data,
        };
    } catch (error) {
        console.error('Ошибка при выполнении запроса fetchProducts:', error);
        return {
            error: 'Произошла ошибка при получении данных',
        };
    }
};