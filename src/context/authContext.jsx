import React, { createContext, useContext, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const authContext = createContext();

const provider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser();
    }
  });

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        toast("Signed Out");
      })
      .catch((error) => {
        toast("error");
        console.log(error.message);
      });
  };

  return (
    <authContext.Provider value={{ user, signIn, signUserOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(authContext);
};
