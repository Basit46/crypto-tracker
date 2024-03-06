import NotiItem from "../components/NotiItem";
import { useGlobalContext } from "../context/globalContext";

const ManageNoti = () => {
  const { alerts, isNotiLoading } = useGlobalContext();
  return (
    <div>
      <h1 className="text-[3rem] font-semibold">Your current notifications</h1>

      <div className="mt-[20px] ">
        {isNotiLoading
          ? "Loading..."
          : alerts.map((alert, index) => (
              <NotiItem key={index} alert={alert} />
            ))}
      </div>
    </div>
  );
};

export default ManageNoti;
