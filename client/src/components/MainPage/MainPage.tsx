// MainPage.tsx
import React, {useCallback, useState} from 'react';
import SearchBar from "./SearchBar";
import ProductDetails from "./ProductDetails";
import { IProduct } from "../../Model/Product";
import {regRequest} from "../../service/AuthService";
import {fetchProducts} from "../../service/ProductService";
import {Button, debounce, IconButton, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface AuthorizationProps {
    onLogin: () => void;
}
const MainPage: React.FC<AuthorizationProps> = (props) => {
    const [searchResults, setSearchResults] = useState<IProduct[] | undefined>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [error, setError]=useState<string>("")
    const navigate = useNavigate();
    const handleProductClick = useCallback((product: IProduct) => {
        setSelectedProduct(product);
    }, []);

    const handleSearch = useCallback(async (query: string) => {
        try {
            const response = await fetchProducts(query);
            if (response.data) {
                setSearchResults(response.data);
                if (response.data.length === 1) {
                    setSelectedProduct(response.data[0]);
                } else {
                    setSelectedProduct(null)
                }
            } else if (response.error) {
                setError('Произошла ошибка при обработке продуктов');
            }
        } catch (error) {
            setError('Произошла ошибка при обработке продуктов');
        }
    }, [fetchProducts]);
    const handleLogout = () => {
        props.onLogin();
        navigate('/login');
    }
    return (
        <div style={{display: 'flex'}}>
            <div style={{flex: 1, minWidth: '200px', maxWidth: '200px', padding: '20px'}}>
                <SearchBar onSearch={handleSearch}/>
                {error ? (
                    <h4 style={{ color: 'red' }}>{error}</h4>
                ) : (
                    <>
                        <h1>Имя Товара</h1>
                        {searchResults ? (
                            searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <Paper
                                        key={product.id}
                                        onClick={() => handleProductClick(product)}
                                        style={{ padding: '10px', margin: '10px', cursor: 'pointer' }}
                                    >
                                        <Typography variant="body1">{product.name}</Typography>
                                    </Paper>
                                ))
                            ) : (
                                <Typography variant="body1">Нет товаров</Typography>
                            )
                        ) : (
                            <Typography variant="body1">Загрузка...</Typography>
                        )}
                    </>
                )}
            </div>
            {selectedProduct && <ProductDetails product={selectedProduct}/>}
            <div style={{position: 'absolute', top: '10px', right: '10px'}}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Выход
                </Button>
            </div>
        </div>
    );
};

export default MainPage;
