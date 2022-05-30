import {Request, Response} from 'express';
import products from '../mocks/product';
import {compareTwoStrings} from "string-similarity";
import {Product} from "../types/product";

type ProductsRequest = {
    query: string;
    page: number;
    pageSize: number;
}

const getRelevancyScore = (query: string, product: Product) => {
    const productNames = product.name.toLowerCase().split(' ');
    const score = productNames.reduce((acc, name) => {
        const score = compareTwoStrings(name, query);
        const includes = name.includes(query) ? 0.2 : 0;
        const isEmpty = query === '' ? 0.5 : 0;
        return acc + score + includes + isEmpty;
    }, 0);

    return score;
};


export const getProducts = (req: Request<ProductsRequest>, res: Response) => {
    const query = req.query.query as string;
    const filteredProducts = products.filter(product => getRelevancyScore(query, product) > 0.3);
    const page = req.query.page as unknown as number ?? 1;
    const pageSize = req.query.pageSize as unknown as number ?? 10;
    const parsedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
    res.json([...parsedProducts]);
};