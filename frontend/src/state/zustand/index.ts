import create from "zustand";
import {Product} from "../../core-models";
import {productsQuery} from "../../apiClient";

// While Zustand was created to be a redux and context replacement, I feel that it works best when used as
// a pseudo-atomized global state. Due to the fact we can quickly declare global hooks that have their own
// state, we can leverage Zustand to create a ''semi-atomized'' state that is managed entirely through hooks.

type SearchState = {
    query: string;
    setQuery: (query: string) => void;
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
}

// To create the Zustand Store, you just need to call the "create" function.
// It receives a reducer callback that contains both your state and reducers.
// You can obviously separate this into different constants if you like, but I feel with the
// approach we'd most likely take on PubDash (having micro states that communicate rather than a single large entity
// because of the hooks approach)
export const useSearch = create<SearchState>(set => ({
    query: "",
    setQuery: query => set(state => ({...state, query})),
    page: 1,
    setPage: page => set(state => ({...state, page})),
    pageSize: 3,
    setPageSize: pageSize => set(state => ({...state, pageSize})),
}));

type ProductState = {
    products: Product[];
    setProducts: (products: Product[]) => void;
    getProducts: () => Product[];
}

export const useProducts = create<ProductState>((set, get) => ({
    products: [],
    setProducts: products => set(state => ({...state, products})),
    // I'm declaring this here solely so we can look at how
    // we can access the state from inside the reducer.
    // Later on we'll see an example in Subscribe, and
    // we'll see how we can access the state outside of react as well.
    getProducts: () => get().products,
}));

// The subscribe method allows us to create a listener to a particular state.
// Keep in mind that the parameters we select to our callback are the parameters that
// will trigger this callback when changed.
// Doing this allows us to fetch information asynchronously and update the state without
// needing to create custom components, providers and hooks.
useSearch.subscribe(async ({query, page, pageSize}) => {
    // Runs when the search query changes
    const products = await productsQuery({query, page, pageSize});
    // Fetches product state and sets new products
    useProducts.getState().setProducts(products);
});

useProducts.subscribe(({products}) => {
    // Runs when useProducts state changes
});