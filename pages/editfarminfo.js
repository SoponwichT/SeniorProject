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

const EditFarmInfo = () => {
    return (
        <>
            <Head>
                <title>Palm planter | Edit Farm Infomation</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full'>
                <div className='mx-auto max-w-md'>
                    <h1 className='text-3xl'>Edit Farm Info</h1>
                    <form className='flex flex-col gap-y-6 max-w-md bg-slate-50 rounded-md shadow-xl p-4 my-6 border-2'>
                        <FormControl isRequired>
                            <FormLabel htmlFor='farm-name'>Farm Name</FormLabel>
                            <Input value="Farm name" id='farm-name' placeholder='Farm name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='owner-name'>Owner Name</FormLabel>
                            <Input value="Owner name" id='owner-name' placeholder='Owner name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='number-of-labor'>Number of labor</FormLabel>
                            <Input value="Number" id='number-of-labor' placeholder='Number' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='total-area'>Total area (ac)</FormLabel>
                            <Input value="ac unit" id='total-area' placeholder='ac unit' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='number-of-plant'>Number of plant</FormLabel>
                            <Input value="Number" id='number-of-plant' placeholder='Number' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='geography'>Geography</FormLabel>
                            <Input value="Plain" id='geography' placeholder='Plain' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='soil-type'>Soil Type</FormLabel>
                            <Input value="none" id='soil-type' placeholder='none' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='water-source-rain'>The main water source for cultivation[Rainwater]</FormLabel>
                            <Input value="none" id='water-source-rain' placeholder='none' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='water-source-irrigation'>The main water source for cultivation[Irrigation] </FormLabel>
                            <Input value="none" id='water-source-irrigation' placeholder='none' />
                        </FormControl>

                        <Button type="submit" colorScheme='blue'>Edit Farm Information</Button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditFarmInfo