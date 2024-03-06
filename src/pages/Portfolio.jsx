import React, { useEffect, useState } from "react";
import PortfolioCoin from "../components/PortfolioCoin";
import { useFetchContext } from "../context/fetchContext";
import { useGlobalContext } from "../context/globalContext";

const Portfolio = () => {
  const { setIsPFMOpen, walletCoins } = useGlobalContext();
  const { coins } = useFetchContext();

  const [bal, setBal] = useState({ total: 0, change: 0, changePer: 0 });

  useEffect(() => {
    const totalPrice = walletCoins.reduce((accumulator, coin) => {
      const resCoin = coins.find((item) => item.id == coin.id);
      return accumulator + coin.qty * resCoin.current_price;
    }, 0);

    const prevPrice = walletCoins.reduce((accumulator, coin) => {
      return accumulator + coin.qty * coin.price;
    }, 0);
    const changePrice = totalPrice - prevPrice;

    const percent = (((totalPrice - prevPrice) / prevPrice) * 100).toFixed(2);

    setBal({
      ...bal,
      total: totalPrice,
      change: changePrice,
      changePer: percent,
    });
  }, [walletCoins, coins]);

  return (
    <div>
      <h1 className="text-[3rem] font-semibold">Total Asset</h1>

      <div className="my-[20px]  flex justify-between items-start">
        <div className="bg-primary text-white h-fit w-[300px] rounded-[10px] p-[20px]">
          <h1 className="text-[2rem] font-semibold tracking-[1.9px]">
            $ {bal.total.toFixed(2)}
          </h1>
          <div className="mb-[10px] h-[1px] w-full bg-white" />
          <p className="text-[1.3rem] text-wrap whitespace-break-spaces">
            {bal.changePer > 0 && "+"} {bal.change.toFixed(2)}{" "}
            {bal.changePer != "NaN" && (
              <span
                className={`${
                  bal.changePer > 0 ? "text-[green]" : "text-[red]"
                } ml-[10px]`}
              >
                ({bal.changePer > 0 && "+"}
                {bal.changePer}%)
              </span>
            )}{" "}
          </p>
        </div>

        <button
          onClick={() => setIsPFMOpen(true)}
          className="bg-green-600 text-white px-[15px] py-[6px]"
        >
          ADD TO PORTFOLIO +
        </button>
      </div>

      <h1 className="text-[1.5rem] font-semibold">Asset List</h1>

      <table className="mt-[20px] w-full">
        <thead>
          <tr>
            <th align="left">Asset</th>
            <th align="left">Quantity</th>
            <th align="left">Value</th>
            <th align="left">Change</th>
            <th align="left"></th>
          </tr>
        </thead>
        <tbody>
          {walletCoins.map((coin) => (
            <PortfolioCoin key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
