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
import GMap from '../components/GMap.js'
import { useState, useRef, useContext, useEffect } from 'react'
import { ActivityStatus } from "../lib/firebase/activity-record"
import { AuthContext } from "../services/all-provider";

const AddMap = () => {
    const { addFarmInfomation, uid } = useContext(AuthContext)
    const [ownername, setOwnername] = useState("")
    const [farmname, setFarmname] = useState("")
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(0) // 0 = loading, 1 = success, 2 = error
    const cancelRef = useRef()

    const submitFarmInfo = async (e) => {
        e.preventDefault();
        setLoadingStatus(0)
        setLoadingAlert(true)
        const response = await addFarmInfomation(farmname, ownername, numberOflabor, totalarea, numberOfplant, geography, soilType, waterSourceRain, waterSourceIrri, uid)
        console.log(response);
        if (response === ActivityStatus.success) {
            setLoadingStatus(1)
        } else {
            setLoadingStatus(2)
        }
    }


    
    return (
        <>
            <Head>
                <title>Palm planter | Add Map</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full'>
                <div className='mx-auto max-w-max'>
                    <h1 className='text-3xl'>Add Farm Info</h1>
                    <form onSubmit={submitFarmInfo} className='flex flex-col gap-y-3 bg-slate-50 rounded-md shadow-xl p-4 my-6 border-2'>
                        <GMap/>
                        <FormControl isRequired>
                            <FormLabel htmlFor='farm-name'>Mark's latitude</FormLabel>
                            <Input value={farmname} onChange={(e) => setFarmname(e.target.value)} id='farm-name' placeholder='Farm name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='owner-name'>Mark's longitude</FormLabel>
                            <Input value={ownername} onChange={(e) => setOwnername(e.target.value)} id='owner-name' placeholder='Owner name' />
                        </FormControl>
                        
                        <Button type="submit" colorScheme='blue'>Add Map Location</Button>
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

export default AddMap;