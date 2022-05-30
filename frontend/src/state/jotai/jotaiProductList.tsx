import React, {ChangeEvent} from "react";
import {Card, CardContent, debounce, Pagination, Stack, TextField, Typography} from "@mui/material";
import {pageAtom, productsAtom, queryAtom} from "./index";
import {useAtomValue, useSetAtom} from "jotai";

export const JotaiProductList = () => {
    // Get our atoms
    const setQuery = useSetAtom(queryAtom);
    const setPage = useSetAtom(pageAtom);
    // This should refetch whenever the query updates
    const products = useAtomValue(productsAtom);
    // Debounce setQuery
    const debouncedSetQuery = debounce(setQuery, 500);
    // Create onChange handler
    const onChange = (e: ChangeEvent<HTMLInputElement>) => debouncedSetQuery(e.target.value);

    return (
        <>
            <TextField id="standard-basic" label="Enter Product Name" variant="standard" onChange={onChange}/>
            <Stack spacing={4}>
                {products && products.map(product => (
                    <Card key={product.id}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography color="textSecondary">
                                {product.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            <Pagination count={9} onChange={(e, value) => setPage(value)}/>
        </>
    )
}