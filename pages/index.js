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

  async function init(){
    const result = await getFarmInfomation()
    setFarm(result)
  }


  useEffect(() => {
    if(uid){
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
          <h1>Dashboard</h1>
          <div>
            <h1 className='mt-8 text-3xl'>Current Stage: 1</h1>
            <div className='mt-8'> 
              <Image src={Palm} width={250} height={250} />
            </div>
          </div>
          <div>
            <h1 className='mt-12 text-3xl'>Farm information</h1>
            <p className='mt-2'>Owner name: {farm.ownername}</p>
            <p className='mt-2'>Number of plant: {farm.numberOfplant}</p>
            <p className='mt-2'>Total area: {farm.totalarea} ac</p>
            <p className='mt-2'>Geography: {farm.geography} </p>
            <p className='mt-2'>Water status: </p>
            <p className='mt-2'>Fertilizer status: </p>
          </div>
        </div>
      </div>
    </>
  )
}
