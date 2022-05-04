import Head from "next/head";
import Noti from "../components/Notification";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/all-provider";
import { MdWarningAmber } from "react-icons/md";

const Notification = () => {
  const { uid, isLoggedIn, getNotification } = useContext(AuthContext);
  const [noti, setNoti] = useState([]);

  async function init() {
    const now = new Date().getTime();
    const result = await getNotification();
    const resultdata = result.filter(
      (data) => data.uid === uid && now >= data.date.toMillis()
    );
    setNoti(resultdata);
    console.log(isLoggedIn);
    console.log(resultdata);
  }

  useEffect(() => {
    if (uid) {
      init();
    }

    return () => {};
  }, [uid]);

  const notiElements = noti.map((doc) => {
    return <Noti data={doc} init={init} />;
  });

  return (
    <>
      <Head>
        <title>Palm planter | Notification</title>
        <meta name="keywords" content="palmplanter" />
      </Head>
      <div>
        <h1 className="text-3xl">Notification</h1>
        {notiElements}
        <div className="bg-white rounded-xl shadow-lg p-4 my-6 border-8 border-yellow-300">
          <h3 className="text-xl font-bold flex mb-2">
            {" "}
            <MdWarningAmber className="text-yellow-500 text-3xl mr-2" />
            Check out your farm
          </h3>
          <div>
            Today is fertilizer day! Please don't forget to fertilize your farm
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
