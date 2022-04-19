import { useRouter } from "next/router"
import GMap from '../../components/GMap.js'
import { AuthContext } from "../../services/all-provider";
import { useContext, useEffect, useState } from 'react'

function FarmInfo() {
    const router = useRouter()
    const { farmId } = router.query
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
        <div className='w-full bg-green-200 rounded-md shadow-xl p-4 my-6 border-2'>
            <h1 className='text-3xl'>Farm name: {farmId}</h1>
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
                <h1 className='text-3xl ml-8'>Activity</h1>
                <div className='text-xl bg-slate-50 rounded-md shadow-xl p-4 border-2'>
                    <p>Water the farm </p>
                    <p className='mt-5'>Check soil quality </p>
                    <p className='mt-5'>Adjust fertilizer quantity</p>
                </div>
            </div>
        </div>

    )
}

export default FarmInfo






