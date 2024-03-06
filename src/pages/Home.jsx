import React, { useEffect, useState } from "react";
import Coin from "../components/Coin";
import { FaTimes } from "react-icons/fa";
import { useFetchContext } from "../context/fetchContext";

const Home = () => {
  const { coinsClone, filterCoinsBySearch } = useFetchContext();

  const [val, setVal] = useState("");

  useEffect(() => {
    filterCoinsBySearch(val);
  }, [val]);

  return (
    <div className="home w-full">
      <h1 className="text-[3rem] font-semibold">Coins Today</h1>

      <div className="my-[30px] w-full h-[40px] flex gap-[10px] pl-[10px] border-primary border rounded-[10px] overflow-hidden">
        <input
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          className="bg-transparent flex-1 outline-none text-[1.2rem] h-full py-[5px]"
          type="text"
          placeholder="Bitcoin"
        />
        <button
          onClick={() => setVal("")}
          className="bg-[red] px-[10px] h-full text-white"
        >
          <FaTimes />
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th align="left">Asset</th>
            <th className="hidden xmd:block" align="left">
              Pair
            </th>
            <th align="left">Last Price</th>
            <th align="left">24h Change</th>
            <th className="hidden xmd:block" align="center">
              TV
            </th>
          </tr>
        </thead>
        <tbody>
          {coinsClone.map((coin, i) => (
            <Coin key={i} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
