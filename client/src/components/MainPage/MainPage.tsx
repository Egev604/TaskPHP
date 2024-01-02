import React, {useState} from 'react';
import SearchBar from "./SearchBar";
import ProductDetails from "./ProductDetails";
import {IProduct} from "../../Model/Product";
import {productAPI} from "../../service/ProductService";

const MainPage = () => {
    const [searchResults, setSearchResults] = useState<IProduct[]| undefined>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query: string) => {
        const {data, error, isLoading}=productAPI.useFetchSearchProductQuery({search:searchQuery})
        setSearchResults(data)
    };

    const handleProductClick = (product: IProduct) => {
        setSelectedProduct(product);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <SearchBar onSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {searchResults?.map((product) => (
                    <div key={product.id} onClick={() => handleProductClick(product)}>
                        {product.name}
                    </div>
                ))}
            </div>
            {selectedProduct && <ProductDetails product={selectedProduct} />}
        </div>
    );
};

export default MainPage;