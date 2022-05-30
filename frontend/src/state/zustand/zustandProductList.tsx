import React, {ChangeEvent} from "react";
import {Card, CardContent, debounce, Pagination, Stack, TextField, Typography} from "@mui/material";
import {useProducts, useSearch} from "./index";

export const ZustandProductList = () => {
    // The below is necessary so that there's some kind of initial load
    // once the page is rendered. There's probably a better way,
    // but I haven't found one yet (inner state maybe?)
    React.useEffect(() => setQuery(''), []);
    // Connect to Zustand store
    const {setQuery, setPage} = useSearch();
    // Debounce set query
    const debouncedSetQuery = debounce(setQuery, 500);
    // Call debounced input on event
    const onChange = (e: ChangeEvent<HTMLInputElement>) => debouncedSetQuery(e.target.value);
    // Finally, fetches updated products to display
    const {products} = useProducts();

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