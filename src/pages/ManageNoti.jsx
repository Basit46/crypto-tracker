import { useEffect } from "react";
import NotiItem from "../components/NotiItem";
import { useGlobalContext } from "../context/globalContext";

const ManageNoti = () => {
  const { alerts, isNotiLoading } = useGlobalContext();

  return (
    <div>
      <h1 className="text-[2rem] xmd:text-[3rem] font-semibold">
        Your current notifications
      </h1>

      <div className="w-full overflow-x-auto">
        <div className="mt-[20px] w-[500px] sm:w-full">
          {isNotiLoading
            ? "Loading..."
            : alerts.map((alert, index) => (
                <NotiItem key={index} alert={alert} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ManageNoti;
