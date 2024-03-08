import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "./authContext";

import axios from "axios";
import { useFetchContext } from "./fetchContext";
import { coinsList } from "../data/coinList";

const globalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { coins } = useFetchContext();

  const [isOpen, setIsOpen] = useState(false);

  const [isPFMOpen, setIsPFMOpen] = useState(false);
  const [walletCoins, setWalletCoins] = useState([]);

  const [isSNMOpen, setIsSNMOpen] = useState(false);
  const [coinToAlertId, setCoinToAlertId] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [alertsApi, setAlertsApi] = useState([]);
  const [isNotiLoading, setIsNotiLoading] = useState(false);

  const addAlertToApi = (vals) => {
    const alert_api_key = import.meta.env.VITE_ALERT_API_KEY;

    const rent = coins.find((rentIt) => rentIt.id == vals.id);
    const toUse = coinsList.find((listIt) => listIt.name == rent.name);
    console.log(toUse.id);
    const alertConditionData = {
      type: "percent_price",
      currency: toUse.id || "BTC",
      percent: vals.change,
      direction: vals.mode,
      window: parseFloat(vals.time),
      channel: { name: "telegram" },
      exchange: "Binance",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${alert_api_key}:`), // Base64 encode the API key
    };

    const apiUrl = "https://api.cryptocurrencyalerting.com/v1/alert-conditions";

    axios
      .post(apiUrl, alertConditionData, { headers })
      .then((response) => {
        toast("Alert Added");
        getAlertsFromApi();
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  useEffect(() => {
    getAlertsFromApi();
  }, []);

  const getAlertsFromApi = async () => {
    const alert_api_key = import.meta.env.VITE_ALERT_API_KEY;

    try {
      const response = await axios.get(
        "https://api.cryptocurrencyalerting.com/v1/alert-conditions?type=percent_price",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${alert_api_key}:`), // Base64 encode the API key
          },
        }
      );

      // Handle the response data here, for example:
      setAlertsApi(response.data);
      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteAlertFromApi = (id) => {
    const alert_api_key = import.meta.env.VITE_ALERT_API_KEY;

    fetch(`https://api.cryptocurrencyalerting.com/v1/alert-conditions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${alert_api_key}:`),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.status === "success") {
          toast("Alert Deleted");
          getAlertsFromApi();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

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
        addAlertToApi,
        alertsApi,
        deleteAlertFromApi,
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
