import {atom, selector} from "recoil";
import {Product} from "../../core-models";
import {productsQuery} from "../../apiClient";

// Recoil, like Jotai, uses an atomized state approach. It however provides more individually robust atoms
// that Jotai does not have, as Jotai sticks exclusively to primitives. Instead, Recoil lets us create keys, default values
// 'reducers' in the shape of the effects object which can be used to render a side effect whenever an atom is updated,
// therefore Recoil is also used as an approach to deprecate the usage of useEffect for state updates.

// Lastly, Recoil is built and maintained by Facebook, so there's a certain guarantee that as React evolves, some version
// of Recoil will eventually exist as a replacement for the most commonly used hooks (useState, useEffect and useContext).

// Jotai suggests naming atoms as "fooAtom" for consistency, but Recoil doesn't mention or show that anywhere I could see
// in their docs, so I'm following their practices.
// UPDATE - I had to change everything to fooAtom anyway otherwise imports would get all messed up and both ESLint and
// TypeScript would complain about the variable names.

// Declare our atoms. Unlike Jotai, the atoms in Recoil are a bit more robust
export const queryAtom = atom<string>({
    key: "query",
    default: "",
    // This prop receives an array of callbacks that trigger on specific events.
    // In this case we're listening to the onSet event to print to the console
    // the values of the atom.

    // Other parameters are:
    // node -> reference to the atom itself
    // StoreID -> ID of the <RecoilRoot> associated with this effect
    // trigger -> get or set, what kind of event has happened
    // setSelf -> Allows us to change the atom state **without** triggering effects
    // onSet -> Renders side effect when atom is updated
    // getPromise -> Allows us to read the value of an asynchronous selector or atom
    // getLoadable -> Allows us to read the value of a synchronous selector or atom
    effects: [
        ({onSet}) =>
            onSet((newValue, oldValue) => {
                console.log({newValue, oldValue});
            }),
    ],
})

export const pageAtom = atom<number>({
    key: "page",
    default: 1,
})

export const pageSizeAtom = atom<number>({
    key: "pageSize",
    default: 3,
})

// For deriving atoms in recoil, we instead use the 'selector' function
// Note that the selector function does **not** contain an effects parameter,
// but it does have a strategy for updating atoms (shown below)
export const queryParamsAtom = selector({
    key: 'queryParams',
    get: ({get}) => ({
        query: get(queryAtom),
        page: get(pageAtom),
        pageSize: get(pageSizeAtom),
    }),
});

// Another way to use selectors if for fetching data asynchronously.
// In this example, our fetchProducts selector subscribes to the
// queryParams selector, and therefore updates our products whenever the queryParams selector updates.

// This products atom replaces the usage of a hook for fetching
// product updates asynchronously. Instead, we can subscribe to a change
// on the queryParams and only fetch if there was an update there.

// It also replaces the creation of a products atom in itself, as it will
// effectively return that atom to us
export const productsAtom = selector<Product[]>({
    key: 'fetchProducts',
    get: async ({get}) => {
        // isLoading is not necessary as Recoil is designed to use Suspense, so we'd
        // need to add that package and use it for handling loading.
        // Note -> It's the "get(queryParams)" that essentially
        // subscribes to the atom updates on queryParams.
        const products = await productsQuery(get(queryParamsAtom));

        return products;
    },
});

