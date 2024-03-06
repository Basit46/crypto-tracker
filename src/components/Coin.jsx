import React, { useEffect, useState } from "react";
import { IoTriangleSharp } from "react-icons/io5";
import { IoMdStarOutline, IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFetchContext } from "../context/fetchContext";

const Coin = ({ coin }) => {
  const navigate = useNavigate();

  const { watchList, addToWatchList, removeFromWatchList } = useFetchContext();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (watchList.length > 0) {
      watchList.filter((item) => item.id == coin.id).length > 0
        ? setIsLiked(true)
        : setIsLiked(false);
    } else {
      return;
    }
  }, [watchList]);

  return (
    <tr className="cursor-pointer">
      <td align="left" className="w-[35%]">
        <div className="flex gap-[10px] items-center">
          {isLiked ? (
            <IoMdStar
              onClick={() => removeFromWatchList(coin.id)}
              className="text-[gold] text-[24px]"
            />
          ) : (
            <IoMdStarOutline
              onClick={() => addToWatchList(coin.id)}
              className="text-[gold] text-[24px]"
            />
          )}

          <img
            onClick={() => navigate(`coins/${coin.id}`)}
            className="w-[20px]"
            src={coin?.image}
            alt="crypto logo"
          />
          <p onClick={() => navigate(`coins/${coin.id}`)}>{coin?.name}</p>
        </div>
      </td>

      <td align="left">
        <p className="uppercase">
          {coin?.symbol} <span className="font-medium">/USD</span>
        </p>
      </td>

      <td align="left">
        <p>$ {coin?.current_price}</p>
      </td>

      <td align="left">
        <div className="flex items-center gap-[5px]">
          <IoTriangleSharp
            className={`${
              coin?.price_change_percentage_24h > 0
                ? "text-[green]"
                : "text-[red] rotate-[180deg]"
            }`}
          />
          <p>{coin?.price_change_percentage_24h}</p>
        </div>
      </td>

      <td align="center">
        <p>{coin?.total_volume}</p>
      </td>
    </tr>
  );
};

export default Coin;
