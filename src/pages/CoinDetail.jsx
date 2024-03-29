import React, { useEffect, useState } from "react";
import { IoMdStarOutline, IoMdStar } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useFetchContext } from "../context/fetchContext";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../context/globalContext";
import axios from "axios";

const CoinDetail = () => {
  const params = useParams();
  const { coins } = useFetchContext();
  const { setIsSNMOpen, setCoinToAlertId } = useGlobalContext();

  const [coinDetail, setCoinDetail] = useState();
  const { watchList, addToWatchList, removeFromWatchList } = useFetchContext();
  const [interval, setTimeInterval] = useState(7);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (coinDetail && watchList.length > 0) {
      watchList.filter((item) => item.id == coinDetail.id).length > 0
        ? setIsLiked(true)
        : setIsLiked(false);
    } else {
      return;
    }
  }, [watchList, coinDetail]);

  useEffect(() => {
    setCoinDetail(coins.find((coin) => coin.id == params.id));
  }, [coins]);

  const [data, setData] = useState([["Coin", "Price"]]);

  const options = {
    // title: "Price Chart",
    curveType: "function",
    legend: { position: "none" },
  };

  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setData([["Coin", "Price"]]);

    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": api_key },
    };

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          params.id || "bitcoin"
        }/market_chart?vs_currency=usd&days=${interval}&precision=2`,
        options
      )
      .then((response) => {
        const formattedPrices = response.data.prices.map(
          ([timestamp, value]) => {
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString(); // Adjust the formatting as needed
            return [formattedDate, value];
          }
        );

        setData((prevData) => [...prevData, ...formattedPrices]);
      })
      .catch((err) => console.error(err));
  }, [interval]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex gap-[15px] items-center">
          <img className="w-[50px]" src={coinDetail?.image} alt="crypto logo" />
          <p className="text-[2.5rem] font-semibold">{coinDetail?.name}</p>
        </div>
        <p className="md:ml-[80px] md:mr-[20px] text-[2rem]">
          $ {coinDetail?.current_price}
        </p>
        <p
          className={`${
            coinDetail?.price_change_percentage_24h > 0
              ? "bg-[green]"
              : "bg-[red]"
          } w-fit py-[5px] px-[10px] text-white text-[1.5rem] rounded-[10px]`}
        >
          {coinDetail?.price_change_percentage_24h}%
        </p>
      </div>

      <div className="relative my-[20px]  h-[400px] border border-primary rounded-[10px] overflow-y-hidden overflow-x-auto">
        <Chart
          chartType="LineChart"
          width="100%"
          height="100%"
          data={data}
          options={options}
        />

        <div className="absolute top-[10px] right-[10px]">
          <select
            value={interval}
            onChange={(e) => setTimeInterval(e.target.value)}
            className="border-primary border-[2px] py-[5px] px-[10px]"
          >
            <option value="1">24 Hours</option>
            <option value="7">1 week</option>
            <option value="30">1 month</option>
            <option value="360">1 year</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col xmd:flex-row gap-[20px] xmd:items-center xmd:gap-[40px]">
        <button className="w-fit h-fit text-[1.5rem] border-[2px] tracking-[1.8px] text-[gold] border-primary rounded-[10px] py-[5px] vsm:py-0 sm:h-[50px] px-[10px]">
          {isLiked ? (
            <div
              onClick={() => removeFromWatchList(coinDetail.id)}
              className="flex items-center gap-[5px] vsm:gap-[10px]"
            >
              <IoMdStar className="text-[gold]" />
              <p className="leading-[0]">REMOVE</p>
            </div>
          ) : (
            <div
              onClick={() => addToWatchList(coinDetail.id)}
              className="flex items-center gap-[5px] vsm:gap-[10px]"
            >
              <IoMdStarOutline className="text-[gold]" />
              <p>ADD TO WATCHLIST</p>
            </div>
          )}
        </button>
        <button
          onClick={() => {
            setIsSNMOpen(true);
            setCoinToAlertId(params.id);
          }}
          className="w-fit text-[1.5rem] border-[2px] tracking-[1.8px] border-primary rounded-[10px] h-[50px] px-[10px] flex items-center gap-[10px]"
        >
          SET NOTIFICATION
        </button>
      </div>

      {/* <div>
        <p className="text-[1.5rem] font-semibold">Related News</p>
        <div></div>
      </div> */}
    </div>
  );
};

export default CoinDetail;
