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


const Myfarm = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <Head>
                <title>Palm planter | My farm</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full'>
                <div className='mx-auto max-w-md'>
                    <h1>Record Activity</h1>
                    <form className='flex flex-col  gap-y-6 max-w-md'>
                        <FormControl isRequired>
                            <FormLabel htmlFor='water-status'>Water Status</FormLabel>
                            <Checkbox value='' id='water-status' size='lg'> Water</Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='fertilizer-status'>Fertilizer Status</FormLabel>
                            <Checkbox value='' id='fertilizer-status' size='lg'> Fertilizer</Checkbox>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='recorder-name'>Record By</FormLabel>
                            <Input value='' onChange={(e) => setFname(e.target.value)} id='recorder-name' placeholder='name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='soil-status'>Soil Status</FormLabel>
                            <Input value='' onChange={(e) => setFname(e.target.value)} id='soil-status' placeholder='normal' />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='record-date'>Record Date</FormLabel>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </FormControl>

                        <Button type="submit" colorScheme='blue'>Submit Record</Button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default Myfarm;