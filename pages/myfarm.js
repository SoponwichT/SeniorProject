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
    Checkbox, CheckboxGroup
} from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import { useState, useRef, useContext } from 'react'
import { AuthContext } from "../services/auth-provider";
import { ActivityStatus } from "../lib/firebase/activity-record"



const Myfarm = () => {
    const { activityRecord } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const [water, setWater] = useState(false)
    const [fertilizer, setfertilizer] = useState(false)
    const [recname, setRecname] = useState("")
    const [soilstatus, setSoilstatus] = useState("")
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(0) // 0 = loading, 1 = success, 2 = error
    const cancelRef = useRef()

    const submitActivity = async (e) => {
        e.preventDefault();
        setLoadingStatus(0)
        setLoadingAlert(true)
        const response = await activityRecord(water, fertilizer, recname, soilstatus, startDate)
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
                <title>Palm planter | My farm</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full'>
                <div className='mx-auto max-w-md'>
                    <h1>Record Activity</h1>
                    <form onSubmit={submitActivity} className='flex flex-col  gap-y-6 max-w-md'>
                        <FormControl isRequired>
                            <FormLabel htmlFor='water-status'>Water Status</FormLabel>
                            <Checkbox value={water} onChange={(e) => setWater(e.target.value = true)} id='water-status' size='lg'> Water</Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='fertilizer-status'>Fertilizer Status</FormLabel>
                            <Checkbox value={fertilizer} onChange={(e) => setfertilizer(e.target.value = true)} id='fertilizer-status' size='lg'> Fertilizer</Checkbox>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='recorder-name'>Record By</FormLabel>
                            <Input value={recname} onChange={(e) => setRecname(e.target.value)} id='recorder-name' placeholder='name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='soil-status'>Soil Status</FormLabel>
                            <Input value={soilstatus} onChange={(e) => setSoilstatus(e.target.value)} id='soil-status' placeholder='normal' />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='record-date'>Record Date</FormLabel>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date.target.value)} id='record-date' />
                        </FormControl>

                        <Button type="submit" colorScheme='blue'>Submit Record</Button>

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
                                    Your Activity has been recorded!!
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

export default Myfarm;