import React, { useState } from "react";
import CoinDip from "../components/CoinDip";
import { useFetchContext } from "../context/fetchContext";

const CoinDips = () => {
  const { changes, nchanges } = useFetchContext();

  const [showHigh, setShowHigh] = useState(true);

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="w-fit border-black border-[2px] flex items-center">
        <button
          onClick={() => setShowHigh(true)}
          className={`${
            showHigh && "bg-[black] text-white"
          } cursor-pointer px-[15px] py-[6px]`}
        >
          HIGHS
        </button>
        <button
          onClick={() => setShowHigh(false)}
          className={`${
            !showHigh && "bg-[black] text-white"
          } cursor-pointer px-[15px] py-[6px]`}
        >
          DIPS
        </button>
      </div>

      {showHigh && (
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-center text-[20px] font-medium">
            HIGHS USING 30 DAYS TIMEFRAME
          </h1>

          {/* Highs */}
          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In High above 10%
            </h1>
            <div className="w-full overflow-x-auto">
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {changes &&
                    changes.percent10.map((change, i) => (
                      <CoinDip key={i} change={change} dip={false} />
                    ))}
                  {changes && changes.percent10.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In High above 20%
            </h1>
            <div className="w-full overflow-x-auto">
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {changes &&
                    changes.percent20.map((change, i) => (
                      <CoinDip key={i} change={change} dip={false} />
                    ))}
                  {changes && changes.percent20.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In High above 30%
            </h1>
            <div className="w-full overflow-x-auto">
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {changes &&
                    changes.percent30.map((change, i) => (
                      <CoinDip key={i} change={change} dip={false} />
                    ))}
                  {changes && changes.percent30.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In High above 40%
            </h1>
            <div className="w-full overflow-x-auto">
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {changes &&
                    changes.percent40.map((change, i) => (
                      <CoinDip key={i} change={change} dip={false} />
                    ))}
                  {changes && changes.percent40.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Highs */}
        </div>
      )}

      {!showHigh && (
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-center text-[20px] font-medium">
            DIPS USING 30 DAYS TIMEFRAME
          </h1>

          {/* Dips */}
          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In Dip Below 10%
            </h1>
            <div className="w-full overflow-x-auto">
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {nchanges &&
                    nchanges.percent10.map((change, i) => (
                      <CoinDip key={i} change={change} dip={true} />
                    ))}
                  {nchanges && nchanges.percent10.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In Dip Below 20%
            </h1>
            <div className="w-full overflow-x-auto">
              {" "}
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {nchanges &&
                    nchanges.percent20.map((change, i) => (
                      <CoinDip key={i} change={change} dip={true} />
                    ))}
                  {nchanges && nchanges.percent20.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In Dip Below 30%
            </h1>
            <div className="w-full overflow-x-auto">
              {" "}
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {nchanges &&
                    nchanges.percent30.map((change, i) => (
                      <CoinDip key={i} change={change} dip={true} />
                    ))}
                  {nchanges && nchanges.percent30.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className="text-center text-[1.2rem] sm:text-[1.5rem] font-semibold">
              Coins In Dip Below 40%
            </h1>
            <div className="w-full overflow-x-auto">
              <table className="w-[600px] sm:w-full mt-[20px]">
                <thead>
                  <tr>
                    <th align="left">Coin name</th>
                    <th align="left">Current Price</th>
                    <th align="left">ATH price</th>
                    <th align="center">30 days change %</th>
                  </tr>
                </thead>
                <tbody>
                  {nchanges &&
                    nchanges.percent40.map((change, i) => (
                      <CoinDip key={i} change={change} dip={true} />
                    ))}
                  {nchanges && nchanges.percent40.length < 1 && (
                    <h1 className="mt-[20px] text-[1.2rem] font-medium">
                      None at the Moment
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Dips */}
        </div>
      )}
    </div>
  );
};

export default CoinDips;
