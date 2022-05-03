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
import { useState, useRef, useContext } from 'react'
import { ActivityStatus } from "../lib/firebase/activity-record"
import { AuthContext } from "../services/all-provider";
import Map from "../components/GMap"

const AddFarmInfo = () => {
    const { addFarmInfomation, addFarmarea, uid } = useContext(AuthContext)
    const [ownername, setOwnername] = useState("")
    const [numberOflabor, setNumberOflabor] = useState("")
    const [totalarea, setTotalarea] = useState("")
    const [numberOfplant, setNumberOfplant] = useState("")
    const [geography, setGeography] = useState("")
    const [soilType, setSoilType] = useState("")
    const [farmname, setFarmname] = useState("")
    const [waterSourceRain, setWaterSourceRain] = useState("")
    const [waterSourceIrri, setWaterSourceIrri] = useState("")
    const [latcoord, setLatcoord] = useState("")
    const [lngcoord, setLngcoord] = useState("")
    const [areacoord, setAreacoord] = useState([])
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(0) // 0 = loading, 1 = success, 2 = error
    const cancelRef = useRef()

    const submitFarmInfo = async (e) => {
        e.preventDefault();
        setLoadingStatus(0)
        setLoadingAlert(true)
        const response1 = await addFarmInfomation(farmname, ownername, numberOflabor, totalarea, numberOfplant, geography, soilType, waterSourceRain, waterSourceIrri, uid)
        const response2 = await addFarmarea(latcoord, lngcoord, areacoord, farmname, uid)
        if (response1 && response2 === ActivityStatus.success) {
            setLoadingStatus(1)
        } else {
            setLoadingStatus(2)
        }
    }



    return (
        <>
            <Head>
                <title>Palm planter | Add Farm Info</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full'>
                <div className='mx-auto max-w-max'>
                    <h1 className='text-3xl'>Add Farm Info</h1>
                    <form onSubmit={submitFarmInfo} className=' bg-slate-50 rounded-md shadow-xl p-4 my-6 border-2'>
                        <div className='flex flex-row gap-x-28 justify-around'>
                            <div>
                                <Map setLatcoord={setLatcoord} setLngcoord={setLngcoord} setAreacoord={setAreacoord} lat={latcoord} lng={lngcoord}/>
                                <h1>Instruction:</h1>
                                <p>1. Click on map to get your farm coordinate.</p>
                                <p>2. Draw your farm area by using polygon.</p>
                                <div className='flex flex-col gap-y-3 p-1'>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor='latcoord'>Mark's latitude</FormLabel>
                                        <Input value={latcoord} onChange={(e) => setLatcoord(e.target.value)} id='latcoord' placeholder='Latitude' />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor='lngcoord'>Mark's longitude</FormLabel>
                                        <Input value={lngcoord} onChange={(e) => setLngcoord(e.target.value)} id='lngcoord' placeholder='Longitude' />
                                    </FormControl>
                                </div>
                                
                            </div>
                            <div className='flex flex-col gap-y-3'>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='farm-name'>Farm Name</FormLabel>
                                    <Input value={farmname} onChange={(e) => setFarmname(e.target.value)} id='farm-name' placeholder='Farm name' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='owner-name'>Owner Name</FormLabel>
                                    <Input value={ownername} onChange={(e) => setOwnername(e.target.value)} id='owner-name' placeholder='Owner name' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='number-of-labor'>Number of labor</FormLabel>
                                    <Input value={numberOflabor} onChange={(e) => setNumberOflabor(e.target.value)} id='number-of-labor' placeholder='Number' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='total-area'>Total area (ac)</FormLabel>
                                    <Input value={totalarea} onChange={(e) => setTotalarea(e.target.value)} id='total-area' placeholder='ac unit' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='number-of-plant'>Number of plant</FormLabel>
                                    <Input value={numberOfplant} onChange={(e) => setNumberOfplant(e.target.value)} id='number-of-plant' placeholder='Number' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='geography'>Geography</FormLabel>
                                    <Input value={geography} onChange={(e) => setGeography(e.target.value)} id='geography' placeholder='Plain' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='soil-type'>Soil Type</FormLabel>
                                    <Input value={soilType} onChange={(e) => setSoilType(e.target.value)} id='soil-type' placeholder='none' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='water-source-rain'>The main water source for cultivation[Rainwater]</FormLabel>
                                    <Input value={waterSourceRain} onChange={(e) => setWaterSourceRain(e.target.value)} id='water-source-rain' placeholder='none' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='water-source-irrigation'>The main water source for cultivation[Irrigation] </FormLabel>
                                    <Input value={waterSourceIrri} onChange={(e) => setWaterSourceIrri(e.target.value)} id='water-source-irrigation' placeholder='none' />
                                </FormControl>
                            </div>
                        </div>
                        <div className='max-w-fit mx-auto mt-3'><Button className='' type="submit" colorScheme='blue'>Add Farm Information</Button></div>
                        
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
                                    Your Farm information has been added!!
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
                                    Error. Pls try again
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
    );
}

export default AddFarmInfo;