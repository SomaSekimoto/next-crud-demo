import { useEffect, useState } from "react";
import { atom, useRecoilValue, useRecoilState, useSetRecoilState, SetterOrUpdater } from "recoil";
import {
  User,
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

import { app } from "./firebase";

type UserState = User | null;

// type NewUser = {
//   email: string;
//   password: string;
// };

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

// const newUserState = atom<NewUser>({
//   key: "newUserState",
//   default: {email: "", password: ""},
//   dangerouslyAllowMutability: true,
// });

type ErrorMessage = string;

const errorMessageState = atom<ErrorMessage>({
  key: "errorMessage",
  default: "",
  dangerouslyAllowMutability: true,
})

// export const login = (): Promise<void> => {
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
};

export const login = (email:string, password: string): Promise<UserCredential> => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const register = async (email: string, password: string): Promise<UserCredential> => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password)
}

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};

// export const useNewUser = (): [NewUser, SetterOrUpdater<NewUser>] => {
//   return useRecoilState(newUserState)
// };

export const useNewUserEmail = (): [string, SetterOrUpdater<string>] => {
  return useRecoilState<string>(atom({
    key: "newUserEmail",
    default: "",
    dangerouslyAllowMutability: true,
  }))
  
};

export const useNewUserPassword = (): [string, SetterOrUpdater<string>] => {
  return useRecoilState<string>(atom({
    key: "newUserPassword",
    default: "",
    dangerouslyAllowMutability: true,
  }))
};

export const useErrorMessage = (): [ErrorMessage, SetterOrUpdater<ErrorMessage>] => {
  return useRecoilState<ErrorMessage>(errorMessageState)
}