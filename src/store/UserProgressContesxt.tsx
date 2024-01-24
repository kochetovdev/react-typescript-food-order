import { PropsWithChildren, createContext, useState } from "react";
import { StatusProgress } from "../types/FoodEnums";

type IProgress =
  | StatusProgress.CART
  | StatusProgress.CHECKOUT
  | StatusProgress.DEFAULT;

interface IUserProgressContext {
  progress: IProgress;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
}

export const UserProgressContext = createContext({} as IUserProgressContext);

export const UserProgressContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [userProgress, setUserProgress] = useState<IProgress>(
    StatusProgress.DEFAULT
  );
  const showCart = () => setUserProgress(StatusProgress.CART);
  const hideCart = () => setUserProgress(StatusProgress.DEFAULT);
  const showCheckout = () => setUserProgress(StatusProgress.CHECKOUT);
  const hideCheckout = () => setUserProgress(StatusProgress.DEFAULT);

  const userProgressContext = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
};
