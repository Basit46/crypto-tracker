import React from "react";

const CoinDip = ({ change, dip }) => {
  return (
    <tr>
      <td className="w-[40%]">
        <div className="flex gap-[5px] items-center">
          <img
            src={change?.coin.image}
            className="h-[24px] w-[24px]"
            alt="logo"
          />
          <p>{change?.coin.name}</p>
        </div>
      </td>
      <td>${change?.coin.current_price}</td>
      <td>${change?.coin.ath}</td>
      <td align="center" className={`${dip ? "text-[red]" : "text-[green]"}`}>
        {change?.percent.toFixed(2)}%
      </td>
    </tr>
  );
};

export default CoinDip;
