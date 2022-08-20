import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  User,
  getAuth,
  signInWithRedirect,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "@firebase/auth";

import { app } from "./firebase";

type UserState = User | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

// export const login = (): Promise<void> => {
export const login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  console.log('auth');
  console.log(auth);
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    console.log('auth')
    console.log(auth)
  }, [setUser]);
  console.log("getAuth(app)")
  console.log(getAuth(app).currentUser?.displayName)

  return isLoading;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};