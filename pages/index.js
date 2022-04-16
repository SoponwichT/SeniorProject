import Head from 'next/head'
import Image from 'next/image'
import Palm from '../assets/palm-tree.png'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { AuthContext } from "../services/all-provider";
import { useContext, useEffect, useState } from 'react'
import GoogleMaps from '../components/GMapold.js'

export default function Home() {
    const { getFarmInfomation, uid, isLoggedIn } = useContext(AuthContext)
    const [farm, setFarm] = useState({})

    async function init() {
        const result = await getFarmInfomation()
        setFarm(result)
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
            <div className='quote-container flex flex-row mx-auto gap-y-24 gap-x-12 flex-wrap justify-left'>
                <div className='flex flex-col bg-green-100 rounded-md shadow-xl border-2 h-56 w-64 p-6'>
                    <div className='quote font-delius text-2xl'>
                        <p>Farm 1</p>
                    </div>
                    <div className='category mt-auto text-slate-400'>
                        <p>Last activities: 5 days ago</p>
                    </div>
                </div>
                <div className='flex flex-col bg-green-100 rounded-md shadow-xl border-2 h-56 w-64 p-6'>
                    <div className='quote font-delius text-2xl'>
                        <p>Farm 2</p>
                    </div>
                    <div className='category mt-auto text-slate-400'>
                        <p>Last activities: 4 days ago</p>
                    </div>
                </div>
            </div>

            <div className='pt-16'>
                <GoogleMaps />
            </div>
        </>
    )
}
