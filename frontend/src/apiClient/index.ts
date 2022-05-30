import axios from "axios";
import {Product} from "../core-models";

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

type ProductsQuery = {
    query: string;
    page: number;
    pageSize: number;
}

export const productsQuery = async ({query, page, pageSize}: ProductsQuery): Promise<Product[]> => {
    const {data} = await api.get<Product[]>('/products', {
        params: {
            query,
            page,
            pageSize,
        }
    });
    return data;
}