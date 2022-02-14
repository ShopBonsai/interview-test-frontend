import { createContext, useReducer, Dispatch, FC } from "react";

export interface ICartState {
  readonly isOpen: boolean;
}

export enum CartActionTypes {
  SET_IS_OPEN = "cart/SET_IS_OPEN",
}

export const INITIAL_CART_STATE: ICartState = {
  isOpen: false,
};

export type SET_IS_OPEN = {
  type: CartActionTypes.SET_IS_OPEN;
  payload: boolean;
};

export type CartAction = SET_IS_OPEN;

export const CartContext = createContext<{
  state: ICartState;
  dispatch: Dispatch<CartAction>;
}>({
  state: INITIAL_CART_STATE,
  dispatch: () => null,
});

const cartReducer = (
  state: ICartState,
  action: CartAction = {} as CartAction
): ICartState => {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case CartActionTypes.SET_IS_OPEN: {
      return { isOpen: payload };
    }
    default:
      return state;
  }
};

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE);
  const value = { state, dispatch };

  console.log(state);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
