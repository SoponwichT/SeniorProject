import { useRouter } from "next/router"
import GMap from '../../components/GMap.js'
import { AuthContext } from "../../services/all-provider";
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { Link } from '@chakra-ui/react'


function FarmInfo() {
    const router = useRouter()
    const { farmId } = router.query
    const { getFarmInfomation, uid, isLoggedIn, getActivityRecord } = useContext(AuthContext)
    const [farm, setFarm] = useState([])
    const [act, setAct] = useState(null)

    async function init() {
        const result = await getFarmInfomation()
        const actresult = await getActivityRecord()
        const farmdata = result.find(data => data.farmname === farmId);
        console.log(actresult);
        setFarm(farmdata)
        setAct(actresult)
        console.log(isLoggedIn);

    }

    useEffect(() => {

        if (uid && uid !== "" && farmId) {
            init()
        }

        return () => {

        }
    }, [uid, farmId])

    function Date() {
        if(act){
            const date = act.createAt.toDate();
            return date.toGMTString();
        }
    }

    return (
        <>
            <Head>
                <title>Palm planter | Farm Infomation</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full bg-green-200 rounded-md shadow-xl p-4 my-6 border-2'>
                <div className="flex">
                    <h1 className='text-3xl ml-8'>Farm name: {farmId}</h1>
                    <Button className="ml-auto" leftIcon={<MdEdit />} colorScheme='blue' variant='solid'>
                        <Link href='/editfarminfo'><a>Edit Farm</a></Link>
                    </Button>
                </div>
                <div className='flex flex-row gap-x-24 mt-8 mx-auto justify-left '>
                    <div className="rounded-md shadow-xl border-2"><GMap /></div>
                    <div className='w-full'>
                        <div className='text-xl bg-slate-50 rounded-md shadow-xl p-8 border-2 h-full'>
                            <h1 className='text-3xl text-center'>Farm information</h1>
                            <p className='mt-5'>Owner name: {farm.farmname}</p>
                            <p className='mt-5'>Number of plant: {farm.numberOfplant}</p>
                            <p className='mt-5'>Total area: {farm.totalarea} ac</p>
                            <p className='mt-5'>Geography: {farm.geography} </p>
                            <p className='mt-5'>Soil Type: {farm.soilType} </p>
                            <p className='mt-5'>Water source[Rainwater]: {farm.waterSourceRainwater}</p>
                            <p className='mt-5'>Water source[Irrigation] : {farm.waterSourceIrrigation} </p>
                        </div>
                    </div>
                </div>
                <div className="mt-9">
                    <div className="flex pb-3">
                        <h1 className='text-3xl ml-8'>Last Activity </h1>
                        <Button className="ml-auto" leftIcon={<IoMdAdd />} colorScheme='blue' variant='solid'>
                            <Link href="/activity"><a>Add Activity</a></Link>
                        </Button>
                    </div>
                    {
                        act
                            ? <div className='text-xl bg-slate-50 rounded-md shadow-xl p-4 border-2'>
                                <p className="capitalize">Water Status: {act.waterStatus ? "Done" : ""} </p>
                                <p className='mt-5 capitalize'>Fertilizer Status: {act.fertilizerStatus ? "Done" : ""}</p>
                                <p className='mt-5'>Soil Checked: {act.soilCheck}</p>
                                <p className='mt-5'>Last Activity: {Date()}</p>
                                
                            </div>
                            : <div className='text-xl bg-slate-50 rounded-md shadow-xl p-4 border-2'>
                                <p className="capitalize">Water Status: </p>
                                <p className='mt-5 capitalize'>Fertilizer Status:  </p>
                                <p className='mt-5'>Soil Checked: </p>
                            </div>
                    }

                </div>
            </div>
        </>

    )
}

export default FarmInfo






