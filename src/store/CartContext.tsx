import { PropsWithChildren, createContext, useReducer } from "react";
import { Meal } from "../types/foodTypes";
import { FoodAction } from "../types/FoodEnums";

interface ICartContext {
  items: Meal[];
  addItem: (item: Meal) => void;
  removeItem: (item: Meal) => void;
  clearCart: () => void;
}

export const CartContext = createContext({} as ICartContext);

interface IState {
  items: Meal[];
}

interface IClearCartAction {
  type: FoodAction.CLEAR_CART;
}

type IAction =
  | {
      type: Exclude<FoodAction, FoodAction.CLEAR_CART>;
      item: Meal;
    }
  | IClearCartAction;

function cartReducer(state: IState, action: IAction) {
  switch (action.type) {
    case FoodAction.ADD_ITEM: {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItems = [...state.items];

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem: Meal = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    }

    case FoodAction.REMOVE_ITEM: {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      const updatedItems = [...state.items];

      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return { ...state, items: updatedItems };
    }

    case FoodAction.CLEAR_CART: {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

export function CartContextProvider({ children }: PropsWithChildren) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item: Meal) => {
    dispatchCartAction({ type: FoodAction.ADD_ITEM, item });
  };

  const removeItem = (item: Meal) => {
    dispatchCartAction({ type: FoodAction.REMOVE_ITEM, item });
  };

  const clearCart = () => {
    dispatchCartAction({ type: FoodAction.CLEAR_CART });
  };

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
