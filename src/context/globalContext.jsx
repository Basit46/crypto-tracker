import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "./authContext";

const globalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  const [isPFMOpen, setIsPFMOpen] = useState(false);
  const [walletCoins, setWalletCoins] = useState([]);

  const [isSNMOpen, setIsSNMOpen] = useState(false);
  const [coinToAlertId, setCoinToAlertId] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [isNotiLoading, setIsNotiLoading] = useState(false);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "portfolio", user.uid), (doc) => {
        setWalletCoins(doc.data().list);
      });
    } else {
      return;
    }
  }, [user]);

  const addToWallet = async (vals) => {
    if (user) {
      const coinRef = doc(db, "portfolio", user.uid);

      // Fetch the current portfolio
      const docSnap = await getDoc(coinRef);
      const currentList = docSnap.exists() ? docSnap.data().list : [];

      // Check if the new ID is not already in the list
      if (!currentList.includes(vals)) {
        // Append the new ID to the current list
        const newList = [
          ...currentList,
          { id: vals.coinId, qty: vals.qty, price: vals.price },
        ];

        // Update the document with the new list
        await setDoc(coinRef, { list: newList });
        toast("Added to portfolio");
      } else {
        toast("Already in portfolio");
      }
    } else {
      toast("Sign In");
    }
  };

  const deleteWalletCoin = async (idToRemove) => {
    if (user) {
      const coinRef = doc(db, "portfolio", user.uid);

      // Filter out the ID to remove
      const newList = walletCoins.filter((item) => item.id != idToRemove);

      // Update the document with the new list
      await setDoc(coinRef, { list: newList });
      toast("Removed from portfolio");
    } else {
      toast("Sign In");
    }
  };

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "alerts", user.uid), (doc) => {
        setAlerts(doc.data().list);
      });
    } else {
      return;
    }
  }, [user]);

  const addAlert = async (vals) => {
    if (user) {
      const coinRef = doc(db, "alerts", user.uid);

      // Fetch the current alerts
      const docSnap = await getDoc(coinRef);
      const currentList = docSnap.exists() ? docSnap.data().list : [];

      // Check if the new ID is not already in the list
      if (!currentList.includes(vals)) {
        // Append the new ID to the current list
        const newList = [
          ...currentList,
          {
            id: vals.id,
            change: vals.change,
            mode: vals.mode,
            time: vals.time,
          },
        ];

        // Update the document with the new list
        await setDoc(coinRef, { list: newList });
        toast("Added to alerts");
      } else {
        toast("Already in alerts");
      }
    } else {
      toast("Sign In");
    }
  };

  const deleteAlert = async (idToRemove) => {
    if (user) {
      setIsNotiLoading(true);
      const coinRef = doc(db, "alerts", user.uid);

      // Filter out the ID to remove
      const newList = alerts.filter((alert) => alert.id != idToRemove);

      // Update the document with the new list
      await setDoc(coinRef, { list: newList });

      // window.location.reload();
      setIsNotiLoading(false);
    } else {
      toast("Sign In");
    }
  };

  return (
    <globalContext.Provider
      value={{
        isPFMOpen,
        setIsPFMOpen,
        walletCoins,
        addToWallet,
        deleteWalletCoin,
        isSNMOpen,
        setIsSNMOpen,
        alerts,
        coinToAlertId,
        setCoinToAlertId,
        addAlert,
        deleteAlert,
        isNotiLoading,
        setIsNotiLoading,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  return useContext(globalContext);
};
