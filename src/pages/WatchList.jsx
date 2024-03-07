import React from "react";
import Coin from "../components/Coin";
// import { FaTimes } from "react-icons/fa";
import { useFetchContext } from "../context/fetchContext";

const WatchList = () => {
  const { watchList } = useFetchContext();
  return (
    <div className="home w-full">
      <h1 className="text-[3rem] font-semibold">Your WatchList</h1>

      {/* <div className="my-[30px] w-full h-[40px] flex gap-[10px] pl-[10px] border-primary border rounded-[10px] overflow-hidden">
        <input
          className="bg-transparent flex-1 outline-none text-[1.2rem] h-full py-[5px]"
          type="text"
          placeholder="Bitcoin"
        />
        <button className="bg-[red] px-[10px] h-full text-white">
          <FaTimes />
        </button>
      </div> */}

      <div className="w-full overflow-x-auto">
        <table className="w-[640px] sm:w-full">
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
            {watchList.length > 0 &&
              watchList.map((coin, i) => <Coin key={i} coin={coin} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
