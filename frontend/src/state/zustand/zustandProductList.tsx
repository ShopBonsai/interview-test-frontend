import React, {ChangeEvent} from "react";
import {Card, CardContent, debounce, Pagination, Stack, TextField, Typography} from "@mui/material";
import {useProducts, useSearch} from "./index";

export const ZustandProductList = () => {
    // Create inner state for setting input search bar
    const [input, setInput] = React.useState('');
    // Debounce input
    const debouncedSetInput = debounce(setInput, 500);
    // Connect to Zustand store
    const {setQuery, setPage} = useSearch();
    // Call debounced input on event
    const onChange = (e: ChangeEvent<HTMLInputElement>) => debouncedSetInput(e.target.value);
    // Update store on debounced call
    React.useEffect(() => setQuery(input), [input]);
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