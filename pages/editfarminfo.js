import Head from 'next/head'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    CircularProgress, CircularProgressLabel,
} from '@chakra-ui/react'
import { useRouter } from "next/router"
import { useState, useRef, useContext, useEffect } from 'react'
import { ActivityStatus } from "../lib/firebase/activity-record"
import { AuthContext } from "../services/all-provider";

const EditFarmInfo = () => {
    const router = useRouter()
    const { name } = router.query
    const { getFarmInfomation, uid, isLoggedIn, editFarmInformation } = useContext(AuthContext)
    const [ownername, setOwnername] = useState("")
    const [numberOflabor, setNumberOflabor] = useState("")
    const [totalarea, setTotalarea] = useState("")
    const [numberOfplant, setNumberOfplant] = useState("")
    const [geography, setGeography] = useState("")
    const [soilType, setSoilType] = useState("")
    const [farmname, setFarmname] = useState("")
    const [waterSourceRain, setWaterSourceRain] = useState("")
    const [waterSourceIrri, setWaterSourceIrri] = useState("")
    const [farmid, setFarmid] = useState("")
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(0)
    const cancelRef = useRef()

    async function init() {
        const result = await getFarmInfomation()
        const farmdata = result.find(data => data.farmname === name );
        setOwnername(farmdata.ownername)
        setNumberOflabor(farmdata.numberOflabor)
        setTotalarea(farmdata.totalarea)
        setNumberOfplant(farmdata.numberOfplant)
        setGeography(farmdata.geography)
        setSoilType(farmdata.soilType)
        setFarmname(farmdata.farmname)
        setFarmid(farmdata.id)
        setWaterSourceRain(farmdata.waterSourceRainwater)
        setWaterSourceIrri(farmdata.waterSourceIrrigation)
        console.log(isLoggedIn);
    }

    const editFarm = async (e) => {
        e.preventDefault();
        setLoadingStatus(0)
        setLoadingAlert(true)
        const response = await editFarmInformation(farmname, ownername, numberOflabor, totalarea, numberOfplant, geography, soilType, waterSourceRain, waterSourceIrri, farmid)
        if (response === ActivityStatus.success) {
            setLoadingStatus(1)
        } else {
            setLoadingStatus(2)
        }
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
                <title>Palm planter | Edit Farm Infomation</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full'>
                <div className='mx-auto max-w-md'>
                    <h1 className='text-3xl'>Edit Farm Info</h1>
                    <form onSubmit={editFarm} className='flex flex-col gap-y-3 bg-slate-50 rounded-md shadow-xl p-4 my-6 border-2'>
                        <FormControl isRequired>
                            <FormLabel htmlFor='farm-name'>Farm Name</FormLabel>
                            <Input value={farmname} onChange={(e) => setFarmname(e.target.value)} id='farm-name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='owner-name'>Owner Name</FormLabel>
                            <Input value={ownername} onChange={(e) => setOwnername(e.target.value)} id='owner-name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='number-of-labor'>Number of labor</FormLabel>
                            <Input value={numberOflabor} onChange={(e) => setNumberOflabor(e.target.value)} id='number-of-labor' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='total-area'>Total area (ac)</FormLabel>
                            <Input value={totalarea} onChange={(e) => setTotalarea(e.target.value)} id='total-area' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='number-of-plant'>Number of plant</FormLabel>
                            <Input value={numberOfplant} onChange={(e) => setNumberOfplant(e.target.value)} id='number-of-plant' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='geography'>Geography</FormLabel>
                            <Input value={geography} onChange={(e) => setGeography(e.target.value)} id='geography' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='soil-type'>Soil Type</FormLabel>
                            <Input value={soilType} onChange={(e) => setSoilType(e.target.value)} id='soil-type' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='water-source-rain'>The main water source for cultivation[Rainwater]</FormLabel>
                            <Input value={waterSourceRain} onChange={(e) => setWaterSourceRain(e.target.value)} id='water-source-rain' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='water-source-irrigation'>The main water source for cultivation[Irrigation] </FormLabel>
                            <Input value={waterSourceIrri} onChange={(e) => setWaterSourceIrri(e.target.value)} id='water-source-irrigation' />
                        </FormControl>

                        <Button type="submit" colorScheme='blue'>Edit Farm Information</Button>

                    </form>
                </div>
            </div>
            <AlertDialog
                isOpen={loadingAlert}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>

                        {loadingStatus === 0 &&
                            <>

                                <div className='mx-auto py-36'> <CircularProgress size='90px' thickness='6px' isIndeterminate /></div>

                            </>
                        }
                        {loadingStatus === 1 &&

                            <>
                                <AlertDialogHeader>
                                    Your Farm information has been edited!!
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button onClick={(_) => {
                                        window.location.href = '/';
                                    }} ref={cancelRef} >
                                        Done
                                    </Button>

                                </AlertDialogFooter>
                            </>
                        }
                        {loadingStatus === 2 &&
                            <>
                                <AlertDialogHeader>
                                    Error. Plz try again
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button colorScheme='red' ref={cancelRef} onClick={() => { setLoadingAlert(false); }}>
                                        OK
                                    </Button>
                                </AlertDialogFooter>
                            </>
                        }

                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default EditFarmInfo