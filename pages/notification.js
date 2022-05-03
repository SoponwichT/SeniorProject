import Head from "next/head";
import { MdWarningAmber } from "react-icons/md";

const Notification = () => {
  return (
    <>
      <Head>
        <title>Palm planter | Notification</title>
        <meta name="keywords" content="palmplanter" />
      </Head>
      <div>
        <h1 className="text-3xl">Notification</h1>
        <div className="bg-white rounded-xl shadow-lg p-4 my-6 border-8 border-yellow-300">
          <h3 className="text-xl font-bold flex mb-2">
            {" "}
            <MdWarningAmber className="text-yellow-500 text-3xl mr-2" />
            Check out your farm
          </h3>
          <div>Don't forget to water the plants and check Fertilizer</div>
        </div>
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
