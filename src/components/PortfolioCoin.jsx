import React, { useEffect, useState } from "react";
import { IoTriangleSharp } from "react-icons/io5";
import { useFetchContext } from "../context/fetchContext";
import { useGlobalContext } from "../context/globalContext";

const PortfolioCoin = ({ coin }) => {
  const { coins } = useFetchContext();
  const { deleteWalletCoin } = useGlobalContext();

  const [coinDetails, setCoinDetails] = useState({});

  useEffect(() => {
    setCoinDetails(coins.find((item) => item.id == coin.id));
  }, [coin]);

  return (
    <tr>
      <td align="left" className="w-[40%]">
        <div className="flex gap-[10px] items-center">
          <img
            className="w-[20px]"
            src={coinDetails?.image}
            alt="crypto logo"
          />
          <p>{coinDetails?.name}</p>
        </div>
      </td>

      <td align="left">
        <p>{coin?.qty}</p>
      </td>

      <td align="left">
        <p>
          $ {parseFloat(coin?.qty) * parseFloat(coinDetails?.current_price)}
        </p>
      </td>

      <td align="left">
        <div className="flex items-center gap-[5px]">
          <IoTriangleSharp
            className={`${
              ((coinDetails?.current_price - coin?.price) / coin?.price) * 100 >
              0
                ? "text-[green]"
                : "text-[red] rotate-[180deg]"
            }`}
          />
          <p>
            {(
              ((coinDetails?.current_price - coin?.price) / coin?.price) *
              100
            ).toFixed(2)}{" "}
            %
          </p>
        </div>
      </td>

      <td>
        <button
          onClick={() => deleteWalletCoin(coin.id)}
          className="bg-[red] text-white px-[10px] py-[5px]"
        >
          REMOVE
        </button>
      </td>
    </tr>
  );
};

export default PortfolioCoin;
