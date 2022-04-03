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
import { RegisterStatus } from '../lib/firebase/register-w-username-password'
import { AuthContext } from "../services/all-provider";

const Register = () => {
    const { registerEmail } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(0) // 0 = loading, 1 = success, 2 = error
    const cancelRef = useRef()

    const submitRegister = async (e) => {
        e.preventDefault();
        if (password === cPassword) {
            setLoadingStatus(0)
            setLoadingAlert(true)
            const response = await registerEmail(email, password, fname, lname)
            console.log(response);
            if (response === RegisterStatus.success) {
                setLoadingStatus(1)
            } else {
                setLoadingStatus(2)
            }
        }
    }


    return (
        <>
            <Head>
                <title>Palm planter | Sign Up</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full'>
                <div className='mx-auto max-w-md'>
                    <h1 className='text-3xl'>Sign up page</h1>
                    <form onSubmit={submitRegister} className='flex flex-col  gap-y-6 max-w-md'>
                        <FormControl isRequired>
                            <FormLabel htmlFor='first-name'>First name</FormLabel>
                            <Input value={fname} onChange={(e) => setFname(e.target.value)} id='first-name' placeholder='First name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='last-name'>Last name</FormLabel>
                            <Input value={lname} onChange={(e) => setLname(e.target.value)} id='last-name' placeholder='Last name' />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' placeholder='Email address' />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' placeholder='Password' />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
                            <Input value={cPassword} onChange={(e) => setCPassword(e.target.value)} id='confirm-password' type='confirm-password' placeholder='Confirm Password' />
                        </FormControl>
                        <Button type="submit" colorScheme='blue'>Sign Up</Button>

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
                                    Please confirm your email.
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
export default Register;