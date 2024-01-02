import React from 'react';
import { Paper, Typography } from '@mui/material';
import {IProduct} from "../../Model/Product";

interface ProductDetailsProps {
    product: IProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '300px' }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="subtitle1">{`Price: $${product.price}`}</Typography>
        </Paper>
    );
};

export default ProductDetails;