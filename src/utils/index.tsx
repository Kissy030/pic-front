import { useLoginStore } from "../zustand";
export function authLogin() {
  const setIsLogged = useLoginStore((state) => state.setIsLogged);

  if (sessionStorage.getItem("access_token")) {
    setIsLogged(true);
    console.log(111);
  }
  //   setIsLogged();
  else console.log(222);
}
