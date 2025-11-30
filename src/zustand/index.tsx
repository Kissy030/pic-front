import { create } from "zustand";
import { ACCESS_TOKEN } from "../pages/constants";
interface LoginStore {
  isLogged: boolean;
  currentUser: string;
  currentEmail: string;
  getIsLogged: () => boolean;
  setIsLogged: (newState: boolean) => void;
  setCurrentUser: (newState: string) => void;
  setCurrentEmail: (newState: string) => void;
}
export const useLoginStore = create<LoginStore>((set, get) => ({
  isLogged: sessionStorage.getItem(ACCESS_TOKEN) ? true : false,
  currentUser: "",
  currentEmail: "",
  getIsLogged: () => get().isLogged,

  setIsLogged: (newState: boolean) => {
    set(() => ({
      isLogged: newState,
    }));
  },
  setCurrentUser: (newState: string) => {
    set(() => ({
      currentUser: newState,
    }));
  },
  setCurrentEmail: (newState: string) => {
    set(() => ({
      currentEmail: newState,
    }));
  },
}));
