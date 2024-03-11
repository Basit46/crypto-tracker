import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
// import { format } from "date-fns";
import { toast } from "react-toastify";
import { useAuthContext } from "./authContext";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const fetchContext = createContext();

const FetchContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [coins, setCoins] = useState([]);
  const [coinsClone, setCoinsClone] = useState(coins);
  const [coinsFetched, setCoinsFetched] = useState(false);
  const [watchList, setWatchList] = useState([]);

  const [changes, setChanges] = useState();
  const [nchanges, setNChanges] = useState();

  const api_key = import.meta.env.VITE_API_KEY;

  //Fetch Coins
  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": api_key },
    };

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        options
      )

      .then((res) => {
        setCoins(res.data);
        setCoinsClone(res.data);
        setCoinsFetched(true);
      })
      .catch((err) => console.error(err));
  }, []);

  //Get watchlist from firebase
  useEffect(() => {
    if (user && coinsFetched) {
      onSnapshot(doc(db, "watchlist", user.uid), (doc) => {
        const newWatchList = doc.data().list.map((id) => {
          return coins.find((coin) => coin.id === id);
        });

        setWatchList(newWatchList);
      });
    } else {
      return;
    }
  }, [user, coinsFetched]);

  //Filter coins by Search
  const filterCoinsBySearch = (value) => {
    setCoinsClone(
      coins.filter((coins) =>
        coins.name.toLowerCase().includes(value.trim().toLowerCase())
      )
    );
  };

  // Add a coin to your watchlist
  const addToWatchList = async (id) => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      // Fetch the current watchlist
      const docSnap = await getDoc(coinRef);
      const currentList = docSnap.exists() ? docSnap.data().list : [];

      // Check if the new ID is not already in the list
      if (!currentList.includes(id)) {
        // Append the new ID to the current list
        const newList = [...currentList, id];

        // Update the document with the new list
        await setDoc(coinRef, { list: newList });
        toast("Added to Watchlist");
      } else {
        toast("Already in Watchlist");
      }
    } else {
      toast("Sign In");
    }
  };

  //Remove from watchlist
  const removeFromWatchList = async (idToRemove) => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      // Filter out the ID to remove
      const newList = watchList
        .filter((item) => item.id != idToRemove)
        .map((item) => {
          return item.id;
        });

      // Update the document with the new list
      await setDoc(coinRef, { list: newList });
      toast("Removed from Watchlist");
    } else {
      toast("Sign In");
    }
  };

  //speak to backend
  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => {
      setChanges(res.data.changes);
      setNChanges(res.data.nchanges);
    });
  }, []);

  return (
    <fetchContext.Provider
      value={{
        coins,
        coinsClone,
        filterCoinsBySearch,
        watchList,
        addToWatchList,
        removeFromWatchList,
        changes,
        nchanges,
      }}
    >
      {children}
    </fetchContext.Provider>
  );
};

export default FetchContextProvider;

export const useFetchContext = () => {
  return useContext(fetchContext);
};
