import Head from 'next/head'
import Image from 'next/image'
import Palm from '../assets/palm-tree.png'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { AuthContext } from "../services/all-provider";
import { useContext, useEffect, useState } from 'react'
import GoogleMaps from '../components/GMapold.js'
import { IoMdAdd } from "react-icons/io"
import { Link } from '@chakra-ui/react'
import { FarmCard } from '../components/farmcard'

export default function Home() {
    const { getFarmInfomation, uid, isLoggedIn, getActivityRecord } = useContext(AuthContext)
    const [farm, setFarm] = useState({})
    const [act, setAct] = useState({})

    async function init() {
        const result = await getFarmInfomation()
        const actresult = await getActivityRecord()
        setFarm(result)
        setAct(actresult)
        console.log(isLoggedIn);
    }

    useEffect(() => {
        if (uid) {
            init()
        }

        return () => {

        }
    }, [uid])

    return (
        <>
            <Head>
                <title>Palm planter | Home</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            {isLoggedIn ?
                <div className='farm-container flex flex-row mx-auto gap-y-24 gap-x-12 flex-wrap justify-left'>
                    <Link href={`/farm/${farm.farmname}`}><FarmCard data={{ name: farm.farmname, activity: "Last activities: 5 days ago" }} /></Link>
                    <FarmCard data={{ name: "Farm 2", activity: "Last activities: 4 days ago" }} />
                    <Link href='/addfarminfo'>
                        <div className='flex flex-col bg-gray-100 rounded-md shadow-xl border-2 h-56 w-64 p-6' >
                            <div className='mx-auto my-auto text-5xl'>
                                <IoMdAdd />
                            </div>
                        </div>
                    </Link>
                </div> :
                <div className='farm-container flex flex-row mx-auto gap-y-24 gap-x-12 flex-wrap justify-left'>
                    <Link href='/addfarminfo'>
                        <div className='flex flex-col bg-gray-100 rounded-md shadow-xl border-2 h-56 w-64 p-6' >
                            <div className='mx-auto my-auto text-5xl'>
                                <IoMdAdd />
                            </div>
                        </div>
                    </Link>
                </div>}
            <div className='pt-32'>
                <GoogleMaps />
            </div>
        </>
    )
}
