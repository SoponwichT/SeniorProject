import { MdWarningAmber } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/Ti";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/all-provider";

const NotiCard = ({ data, init }) => {
  const { deleteNotification } = useContext(AuthContext);

  const deleteNoti = async (e) => {
    e.preventDefault();
    const response = await deleteNotification(data.id);
    await init();
  };

  if (data.type === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 my-6 border-8 border-red-400 w-4/6">
        <div className="flex flex-row">
          <h3 className="text-xl font-bold flex mb-2">
            <MdWarningAmber className="text-red-500 text-3xl mr-2" />
            Check out your farm ({data.recordOf})
          </h3>
          <button className="ml-auto mb-5" onClick={deleteNoti}>
            <TiDeleteOutline />
          </button>
        </div>
        <div>{data.message}</div>
      </div>
    );
  } else
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 my-6 border-8 border-yellow-300 w-4/6">
        <div className="flex flex-row">
          <h3 className="text-xl font-bold flex mb-2">
            <MdWarningAmber className="text-yellow-500 text-3xl mr-2" />
            Check out your farm ({data.recordOf})
          </h3>
          <button className="ml-auto mb-5" onClick={deleteNoti}>
            <TiDeleteOutline />
          </button>
        </div>
        <div>{data.message}</div>
      </div>
    );
};
export default NotiCard;
