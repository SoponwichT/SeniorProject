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
import Glogo from '../assets/glogo.png'
import Image from "next/image"
import Signinwithgoogle from '../lib/firebase/siginin-with-google'
import Link from "next/link";
import { useState, useRef, useContext } from 'react'
import SignInWUsernamePassword, { SignInStatus } from '../lib/firebase/signin-with-email'
import { AuthContext } from "../services/auth-provider";



const SignIn = () => {
    // TODO: add signinGoole
    const { signinEmail,signinGoogle } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loadingAlert, setLoadingAlert] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(0) // 0 = loading, 1 = success, 2 = error, 3 = wrongpassword
    const cancelRef = useRef()
    const submitSignIn = async (e) => {
        e.preventDefault();
        setLoadingStatus(0)
        setLoadingAlert(true)
        const response = await signinEmail(email, password)
        console.log(response);
        if (response === SignInStatus.usererror) {
            setLoadingStatus(2)
            setLoadingAlert(true)
        }
        else if (response === SignInStatus.wrongpwd) {
            setLoadingStatus(3)
            setLoadingAlert(true)
        }
        else {
            setLoadingAlert(false)
            window.location.href = '/';
        }
    }
    const submitSignInGoogle = async (e) => {
        e.preventDefault();
        setLoadingStatus(0)
        setLoadingAlert(true)
        const response = await signinGoogle(email, password)
        console.log(response);
        if (response === SignInStatus.usererror) {
            setLoadingStatus(2)
            setLoadingAlert(true)
        }
        else if (response === SignInStatus.wrongpwd) {
            setLoadingStatus(3)
            setLoadingAlert(true)
        }
        else {
            setLoadingAlert(false)
            window.location.href = '/';
        }
    }


    return (
        <>
            <Head>
                <title>Palm planter | Sign In</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div className='w-full '>
                <div className='mx-auto max-w-md'>
                    <h1>Sign in page</h1>
                    <form onSubmit={submitSignIn} className='flex flex-col gap-y-6 max-w-md'>
                        <FormControl>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' />

                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' />
                        </FormControl>
                        <Button type="submit" colorScheme='blue'>Sign In</Button>

                    </form>
                    <div>
                        <p>Don't have an account?<Link href="/register"><a className='text-blue-500'> Register</a></Link></p>
                        <Link href="/forgotpassword"><a className='text-blue-500'>Forgot password?</a></Link>
                    </div>
                    {/* TODO: replace with new siginGoogle */}
                    <button onClick={submitSignInGoogle} className="bg-white shadow-lg rounded-md w-full max-w-md my-2 py-2 flex justify-center items-center">
                        <div className='w-6 h-6 relative mr-2' ><Image layout='fill' src={Glogo} /></div>
                        <div>Sign in with Google</div>
                    </button>
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
                        {/* {loadingStatus === 1 &&

                            <>
                                <AlertDialogHeader>
                                    Sign In success!!
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button onClick={(_) => {
                                        window.location.href = '/';
                                    }} ref={cancelRef} >
                                        Done
                                    </Button>

                                </AlertDialogFooter>
                            </>
                        } */}
                        {loadingStatus === 2 &&
                            <>
                                <AlertDialogHeader>
                                    Error! Username is invalid.
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button colorScheme='red' ref={cancelRef} onClick={() => { setLoadingAlert(false); }}>
                                        OK
                                    </Button>
                                </AlertDialogFooter>
                            </>
                        }
                        {loadingStatus === 3 &&
                            <>
                                <AlertDialogHeader>
                                    Wrong password. Pls try again
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

export default SignIn;