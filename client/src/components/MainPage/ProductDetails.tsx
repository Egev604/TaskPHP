import React from 'react';
import { Paper, Typography } from '@mui/material';
import {IProduct} from "../../Model/Product";

interface ProductDetailsProps {
    product: IProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', marginLeft: '30%', marginRight: '30%' }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="subtitle1">{`Price: $${product.price}`}</Typography>
            <Typography variant="body1" style={{textAlign:'center'}}>
                {product.image && (
                    <img
                        src={product.image.startsWith('http') ? product.image : require(`./${product.image}`)}
                        alt={product.name}
                        style={{maxWidth: '300px', height: 'auto', marginTop: '10px', }}
                    />
                )}
            </Typography>
        </Paper>
    );
};

export default ProductDetails;