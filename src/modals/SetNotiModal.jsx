import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/globalContext";

const SetNotiModal = () => {
  const { isSNMOpen, setIsSNMOpen, addAlert, coinToAlertId, setCoinToAlertId } =
    useGlobalContext();

  const [vals, setVals] = useState({
    id: coinToAlertId,
    change: "",
    mode: "up",
    time: "1",
  });

  const handleSet = () => {
    if (vals.change != "" && vals.mode != "" && vals.time != "") {
      addAlert({
        id: coinToAlertId,
        change: vals.change,
        mode: vals.mode,
        time: vals.time,
      });

      // const dataToSend = {
      //   id: coinToAlertId,
      //   change: vals.change,
      //   mode: vals.mode,
      //   time: vals.time,
      // };

      // fetch("http://localhost:5000/addAlert", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(dataToSend),
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data.message))
      //   .catch((error) => console.error("Error fetching data:", error));

      setIsSNMOpen(false);
      setCoinToAlertId("");
      setVals({ id: coinToAlertId, change: "", mode: "up", time: "1" });
    } else {
      toast("Enter all Values");
    }
  };

  return (
    <div
      className={`${
        !isSNMOpen && "hidden"
      } z-[5] fixed top-0 left-0 h-screen w-screen bg-black/70 grid place-items-center`}
    >
      <div className="relative bg-white rounded-[10px] h-fit w-[330px] px-[20px] pt-[40px] pb-[20px] border-[2px] border-primary">
        <FaTimes
          onClick={() => setIsSNMOpen(false)}
          className="text-[red] text-[20px] absolute right-[10px] top-[10px] cursor-pointer"
        />

        <h1 className="mb-[20px] text-center font-medium text-[1.3rem]">
          SET NOTIFICATION
        </h1>
        <div className="">
          <label className="mb-[5px]" htmlFor="change">
            CHANGE in %:
          </label>
          <input
            value={vals.change}
            onChange={(e) => setVals({ ...vals, change: e.target.value })}
            placeholder="5"
            className="block w-full border-primary border-[2px] outline-none px-[4px]"
            type="number"
            id="change"
          />
        </div>
        <div className="mt-[20px]">
          <label className="mb-[5px]" htmlFor="mode">
            MODE:
          </label>
          <select
            value={vals.mode}
            onChange={(e) => setVals({ ...vals, mode: e.target.value })}
            className="w-full block border-primary border-[2px] outline-none cursor-pointer"
            id="mode"
          >
            <option value="up">UP</option>
            <option value="down">DOWN</option>
          </select>
        </div>
        <div className="mt-[20px]">
          <label className="mb-[5px]" htmlFor="time">
            TIME:
          </label>
          <select
            value={vals.time}
            onChange={(e) => setVals({ ...vals, time: e.target.value })}
            className="w-full block border-primary border-[2px] outline-none cursor-pointer"
            id="time"
          >
            <option value={1}>1m</option>
            <option value={60}>1h</option>
            <option value={60 * 5}>5h</option>
            <option value={60 * 10}>10h</option>
            <option value={60 * 24}>24h</option>
          </select>
        </div>

        <button
          onClick={handleSet}
          className="mt-[30px] bg-[green] text-white w-full py-[4px]"
        >
          SET
        </button>
      </div>
    </div>
  );
};

export default SetNotiModal;
