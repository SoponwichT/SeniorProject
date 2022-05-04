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
    return <Noti key={doc} data={doc} init={init} />;
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
      </div>
    </>
  );
};

export default Notification;
