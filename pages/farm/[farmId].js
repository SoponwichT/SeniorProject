import { useRouter } from "next/router"
import GMap from '../../components/GMap.js'
import { AuthContext } from "../../services/all-provider";
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import Link from 'next/link'


function FarmInfo() {
    const router = useRouter()
    const { farmId } = router.query
    const { getFarmInfomation, uid, isLoggedIn, getActivityRecord } = useContext(AuthContext)
    const [farm, setFarm] = useState([])
    const [act, setAct] = useState(null)

    async function init() {
        const result = await getFarmInfomation()
        const actresult = await getActivityRecord()
        const farmdata = result.find(data => data.farmname === farmId && data.uid === uid);
        const actdata = actresult.find(data => data.recordOf === farmId && data.uid === uid);
        setFarm(farmdata)
        setAct(actdata)
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
        if (act) {
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
                        <Link href={{pathname: '/editfarminfo', query: { name: farm.farmname }}} ><a>Edit Farm</a></Link>
                    </Button>
                </div>
                <div className='flex flex-row gap-x-24 mt-8 mx-auto justify-left '>
                    <div className="rounded-md shadow-2xl border-2"><GMap /></div>
                    <div className='w-full'>
                        <div className='text-xl bg-slate-50 rounded-md shadow-2xl p-6 border-2 h-full'>
                            <h1 className='text-3xl text-center'>Farm information</h1>
                            <TableContainer>
                                <Table variant='striped' colorScheme='blackAlpha'>
                                    <Tbody>
                                        <Tr>
                                            <Td>Owner name:</Td>
                                            <Td isNumeric>{farm.farmname}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Number of plant:</Td>
                                            <Td isNumeric>{farm.numberOfplant}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Total area:</Td>
                                            <Td isNumeric>{farm.totalarea}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Geography:</Td>
                                            <Td isNumeric>{farm.geography}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Soil Type:</Td>
                                            <Td isNumeric>{farm.soilType}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Water source[Rainwater]:</Td>
                                            <Td isNumeric>{farm.waterSourceRainwater}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Water source[Irrigation]:</Td>
                                            <Td isNumeric>{farm.waterSourceIrrigation}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
                <div className="mt-9">
                    <div className="flex pb-3">
                        <h1 className='text-3xl ml-8'>Last Activity</h1>
                        <Button className="ml-auto" leftIcon={<IoMdAdd />} colorScheme='blue' variant='solid'>
                            <Link href="/activity"><a>Add Activity</a></Link>
                        </Button>
                    </div>
                    {
                        act
                            ? <div className='text-xl bg-slate-50 rounded-md shadow-2xl p-4 border-2'>
                                <TableContainer>
                                    <Table size='sm' variant='striped' colorScheme='blackAlpha'>
                                        <Tbody>
                                            <Tr>
                                                <Td>Water Status:</Td>
                                                <Td isNumeric>{act.waterStatus ? "Done" : ""}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Fertilizer Status:</Td>
                                                <Td isNumeric>{act.fertilizerStatus ? "Done" : "-"}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Soil Status:</Td>
                                                <Td isNumeric>{act.soilCheck}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Last Update:</Td>
                                                <Td isNumeric>{Date()}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </div>
                            : <div className='text-xl bg-slate-50 rounded-md shadow-2xl p-4 border-2'>
                                <TableContainer>
                                    <Table size='sm' variant='striped' colorScheme='blackAlpha'>
                                        <Tbody>
                                            <Tr>
                                                <Td>Water Status:</Td>
                                                <Td isNumeric> - </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Fertilizer Status:</Td>
                                                <Td isNumeric> - </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Soil Status:</Td>
                                                <Td isNumeric> - </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Last Update:</Td>
                                                <Td isNumeric> - </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </div>
                    }

                </div>
            </div>
        </>

    )
}

export default FarmInfo






