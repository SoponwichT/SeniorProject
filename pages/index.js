import Head from 'next/head'
import Image from 'next/image'
import Palm from '../assets/palm-tree.png'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { AuthContext } from "../services/auth-provider";
import { useContext, useEffect, useState } from 'react'

export default function Home() {
  const { getFarmInfomation, uid } = useContext(AuthContext)
  const [farm, setFarm] = useState({})

  async function init() {
    const result = await getFarmInfomation()
    setFarm(result)
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
      <div className='w-full'>
        <div className='mx-auto max-w-md '>
          <h1 className='text-3xl text-center'>Dashboard</h1>
        </div>
        <div className='flex gap-x-24 mt-8 mx-auto justify-center'>
          <div>
            <h1 className='text-3xl text-center'>Current Stage: 1</h1>
            <div className='mt-8 w-72'>
              <Image src={Palm} width={500} height={500} />
            </div>
          </div>
          <div className='w-72'>
            <h1 className='text-3xl text-center'>Farm information</h1>
            <div className='text-xl bg-white rounded-md shadow-xl p-4 my-6 border-2'> 
              <p>Owner name: {farm.ownername}</p>
              <p className='mt-5'>Number of plant: {farm.numberOfplant}</p>
              <p className='mt-5'>Total area: {farm.totalarea} ac</p>
              <p className='mt-5'>Geography: {farm.geography} </p>
              <p className='mt-5'>Water status: </p>
              <p className='mt-5'>Fertilizer status: </p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
