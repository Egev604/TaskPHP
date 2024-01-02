import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {AuthLogin, AuthRegistration} from "../Model/Auth";
import {IUser} from "../Model/User";
export const authAPI = createApi({
    reducerPath:'authAPI',
    baseQuery:fetchBaseQuery({baseUrl: '',
        headers: {
            'Content-Type': 'application/json',
        },}),
    tagTypes:['Auth'],
    endpoints:(build)=> ({
        AuthLogin: build.mutation<IUser, AuthLogin>({
            query: (login)=>({
                url: ``,
                method:'POST',
                bodY:login
            }),
        }),
        AuthRegistration: build.mutation<IUser, AuthRegistration>({
            query: (registration)=> ({
                url: ``,
                method:'POST',
                bodY:registration
            }),
        }),
    })
})