import {atom} from "jotai";
import {productsQuery} from "../../apiClient";
// Unlike Zustand and Toolkit, Recoil and Jotai use a fully atomized state strategy, with the intention of
// fully replacing local state and global state.

// An atomized state means, in essence, that global state is composed of unconnected variables called atoms
// which are managed individually and independently of each other.

// While there are many approaches we can take to an atomized state, the two most beneficial ones I can think
// of are either using atoms to fully replace local states as intended, therefore creating exclusively dumb components
// that only read atoms and hooks that allow us to set atoms, and thus almost fully deprecating the usage of props on
// the majority of our components (as, at most, props would then be used for managing styling changes in common components
// and all state logic would exist outside the scope of any component), or using atoms to manage global state and
// only calling atoms for complex states that need to communicate across different components of the app tree.

// IMO for the second approach I'd rather use a semi-atomized approach like Zustand, or just go all in on Toolkit.

// In Jotai, this is our search state. Nothing else
// needs to be written as both setting and reading
// the logic is done through in-component hooks.
export const queryAtom = atom<string>('');
export const pageAtom = atom<number>(1);
export const pageSizeAtom = atom<number>(3);

// This is a derived atom that gets the information
// of our 3 previous atoms and puts it in one place
// This may seem out of place here, but imagine that
// in an atomized search state we could have atoms
// declared all across our component that we'd
// want to be able to refer to from here easily.
export const productsQueryAtom = atom((get) => ({
        query: get(queryAtom),
        page: get(pageAtom),
        pageSize: get(pageSizeAtom),
    }),
);

// This is a derived atom that allows us to fetch products asynchronously. Keep in mind
// that it'll need Suspense so that it can run due to being
// an async function.
export const productsAtom = atom(async (get) => {
    const {query, page, pageSize} = get(productsQueryAtom);
    return await productsQuery({query, page, pageSize});
});

// // There's another way to fetch queries asynchronously with jotai --
// // it gives us access to the atomWithQuery method which gives us native access
// // to the useQuery hook, allowing us to call it directly inside our atom.
// export const productsAtomWithQuery = atomWithQuery((get) => ({
//     queryKey: ['products', get(productsQueryAtom)],
//     queryFn: async (queryKey: ProductsQueryParam[]) => await productsQuery({...queryKey[1]}),
// }));

// // Yet another way to fetch it with automatic pagination is with
// // the atomWithInfiniteQuery
// export const productsAtomWithInfiniteQuery = atomWithInfiniteQuery((get) => ({
//     queryKey: ['products', get(productsQueryAtom)],
//     queryFn: async (queryKey: ProductsQueryParam[]) => await productsQuery({...queryKey[1]}),
//     // Infinite queries have access to everything that react-query's infinite queries have access
//     // to, so we could use it like this:
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
// }));
