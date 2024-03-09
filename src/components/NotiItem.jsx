import React, { useEffect, useState } from "react";
import { useFetchContext } from "../context/fetchContext";
import { useGlobalContext } from "../context/globalContext";

const NotiItem = ({ alert }) => {
  const { coins } = useFetchContext();
  const { deleteAlert, deleteAlertFromApi } = useGlobalContext();

  const [coinDetail, setCoinDetail] = useState();

  useEffect(() => {
    setCoinDetail(coins.find((coin) => coin.id == alert.id));
  }, [coins]);

  return (
    <div className="flex items-center justify-between border-b-primary border-b py-[10px]">
      <div className="w-[30%] flex gap-[10px] items-center">
        {/* <img className="w-[20px]" src={coinDetail?.image} alt="crypto logo" /> */}
        <p className="font-bold">{alert?.currency}</p>
      </div>
      <p className="text-[18px] font-medium">
        If {alert.percent}%{" "}
        <span
          className={`${
            alert.direction == "up" ? "text-[green]" : "text-[red]"
          }`}
        >
          {alert.direction}
        </span>{" "}
        in{" "}
        {alert.window != 1440
          ? alert.window < 60
            ? `${alert.window}m`
            : `${parseFloat(alert.window) / 60}h`
          : "90 days"}
      </p>
      <button
        onClick={() => {
          // deleteAlert(coinDetail.id);
          deleteAlertFromApi(alert.id);
        }}
        className="bg-[red] text-white px-[10px] py-[5px]"
      >
        DELETE
      </button>
    </div>
  );
};

export default NotiItem;
