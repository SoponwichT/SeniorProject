import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { AuthContext } from "../services/all-provider";
import { useContext, useEffect, useState } from "react";
import GoogleMaps from "../components/GMapold.js";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { FarmCard } from "../components/farmcard";

export default function Home() {
  const { getFarmInfomation, uid, isLoggedIn, getFarmarea  } = useContext(AuthContext);
  const [farm, setFarm] = useState([]);
  const [areas, setAreas] = useState([])

  async function init() {
    const result = await getFarmInfomation();
    const arearesult = await getFarmarea();
    const resultdata = result.filter((data) => data.uid === uid);
    setFarm(resultdata);
    setAreas(arearesult);
    console.log(resultdata);
    console.log(isLoggedIn);
  }

  useEffect(() => {
    if (uid) {
      init();
    }

    return () => {};
  }, [uid]);

  const farmElements = farm.map((doc) => {
    return <FarmCard key={doc} data={doc} />;
  });

  return (
    <>
      <Head>
        <title>Palm planter | Home</title>
        <meta name="keywords" content="palmplanter" />
      </Head>
      {isLoggedIn ? (
        <div>
          <div className="farm-container flex flex-row mx-auto gap-y-24 gap-x-12 flex-wrap justify-left cursor-pointer">
            {farmElements}
            <Link href="/addfarminfo">
              <div className="flex flex-col bg-gray-100 rounded-md shadow-xl border-2 h-56 w-64 p-6">
                <div className="mx-auto my-auto text-5xl">
                  <IoMdAdd />
                </div>
              </div>
            </Link>
          </div>
          <div className="pt-32">
            <GoogleMaps areas={areas}/>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl">
            Please login to see your farm list!
          </h1>
        </div>
      )}
    </>
  );
}
