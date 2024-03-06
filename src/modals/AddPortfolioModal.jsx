import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFetchContext } from "../context/fetchContext";
import { useGlobalContext } from "../context/globalContext";

const AddPortfolioModal = () => {
  const { isPFMOpen, setIsPFMOpen, addToWallet } = useGlobalContext();
  const { coins } = useFetchContext();

  const [vals, setVals] = useState({ coinId: "bitcoin", qty: "", price: "" });

  const handleAdd = () => {
    if (vals.coinId == "" && vals.qty == "" && vals.price == "") {
      toast("Pick a coin, quantity and price");
    } else {
      setIsPFMOpen(false);
      addToWallet(vals);

      setVals({ coinId: "bitcoin", qty: "", price: "" });
    }
  };

  return (
    <div
      className={`${
        !isPFMOpen && "hidden"
      } fixed  z-[5] top-0 left-0 h-screen w-screen bg-black/70 grid place-items-center`}
    >
      <div className="relative bg-white rounded-[10px] h-fit px-[20px] pt-[40px] pb-[20px] border-[2px] border-primary">
        <FaTimes
          onClick={() => setIsPFMOpen(false)}
          className="text-[red] text-[20px] absolute right-[10px] top-[10px] cursor-pointer"
        />

        <h1 className="mb-[20px] text-center font-medium text-[1.3rem]">
          ADD TO YOUR PORTFOLIO
        </h1>
        <div className="">
          <label className="mb-[5px]" htmlFor="coin">
            SELECT COIN:
          </label>
          <select
            className="w-full block border-primary border-[2px] outline-none cursor-pointer py-[4px]"
            id="coin"
            value={vals.coinId}
            onChange={(e) => setVals({ ...vals, coinId: e.target.value })}
          >
            {coins.map((coin, i) => (
              <option key={i} className="uppercase" value={coin.id}>
                {coin.symbol.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-[20px]">
          <label className="mb-[5px]" htmlFor="qty">
            QUANTITY:
          </label>
          <input
            value={vals.qty}
            onChange={(e) => setVals({ ...vals, qty: e.target.value })}
            placeholder="30"
            className="block w-full border-primary border-[2px] outline-none px-[4px]"
            type="number"
            id="qty"
          />
        </div>
        <div className="mt-[20px]">
          <label className="mb-[5px]" htmlFor="price">
            PRICE in $:
          </label>
          <input
            value={vals.price}
            onChange={(e) => setVals({ ...vals, price: e.target.value })}
            placeholder="45,000"
            className="block w-full border-primary border-[2px] outline-none px-[4px]"
            type="number"
            id="price"
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-[30px] bg-[green] text-white w-full py-[4px]"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddPortfolioModal;
