import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IProduct} from "../Model/Product";
export const productAPI = createApi({
    reducerPath:'productAPI',
    baseQuery:fetchBaseQuery({baseUrl: '',
        headers: {
            'Content-Type': 'application/json',
        },}),
    tagTypes:['Product'],
    endpoints:(build)=> ({
        fetchSearchProduct: build.query<IProduct[], { search:string }>({
            query: (search)=>({
                url: ``,
                params: {
                    _search:search,
                }
            }),
            providesTags:result => ['Product']
        }),
    })
})