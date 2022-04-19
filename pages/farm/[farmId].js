import { useRouter } from "next/router"
import GMap from '../../components/GMap.js'
import { AuthContext } from "../../services/all-provider";
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io';
import { Link } from '@chakra-ui/react'

function FarmInfo() {
    const router = useRouter()
    const { farmId } = router.query
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
                <title>Palm planter | Farm Infomation</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full bg-green-200 rounded-md shadow-xl p-4 my-6 border-2'>
                <h1 className='text-3xl ml-8'>Farm name: {farmId}</h1>
                <div className='flex flex-row gap-x-24 mt-8 mx-auto justify-left '>
                    <div className="rounded-md shadow-xl border-2"><GMap /></div>
                    <div className='w-full'>
                        <div className='text-xl bg-slate-50 rounded-md shadow-xl p-8 border-2 h-full'>
                            <h1 className='text-3xl text-center'>Farm information</h1>
                            <p className='mt-5'>Owner name: {farm.ownername}</p>
                            <p className='mt-5'>Number of plant: {farm.numberOfplant}</p>
                            <p className='mt-5'>Total area: {farm.totalarea} ac</p>
                            <p className='mt-5'>Geography: {farm.geography} </p>
                            <p className='mt-5'>Soil Type: {farm.soilType} </p>
                            <p className='mt-5'>Water source[Rainwater]: {farm.waterSourceIrrigation} </p>
                            <p className='mt-5'>Water source[Irrigation] : {farm.waterSourceRainwater} </p>
                        </div>
                    </div>
                </div>
                <div className="mt-9">
                    <div className="flex pb-3">
                        <h1 className='text-3xl ml-8'>Activity </h1>
                        <Button className="ml-auto" leftIcon={<IoMdAdd />} colorScheme='blue' variant='solid'>
                            <Link href="/activity"><a>Add Activity</a></Link>
                        </Button>
                    </div>
                    <div className='text-xl bg-slate-50 rounded-md shadow-xl p-4 border-2'>
                        <p className="capitalize">Water Status: {act.waterStatus} </p>
                        <p className='mt-5 capitalize'>Fertilizer Status: {act.fertilizerStatus} </p>
                        <p className='mt-5'>Last soil Status: {act.soilCheck}</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default FarmInfo






