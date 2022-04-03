import Head from 'next/head'
import GMap from '../components/GMap.js'
import { Button, ButtonGroup, Stack } from '@chakra-ui/react'
import { MdBuild, MdSettings, MdOutlineAdd } from "react-icons/md"
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../services/all-provider";


const Map = () => {
    const { isHadfarm } = useContext(AuthContext)
    return (
        <>
            <Head>
                <title>Palm planter | Map</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <GMap />
            <div className='w-full pt-4'>
                <div className='mx-auto max-w-md'>
                    <Stack direction='row' spacing={4}>
                        <Button leftIcon={<MdBuild />} colorScheme='blue' variant='solid'>
                            <Link href="/"><a>Edit map location</a></Link>
                        </Button>
                        {!isHadfarm && <Button rightIcon={<MdOutlineAdd />} colorScheme='blue' variant='solid'>
                            <Link href="/addfarminfo"><a>Add farm information</a></Link>
                        </Button>}
                        {isHadfarm && <Button rightIcon={<MdSettings />} colorScheme='blue' variant='solid'>
                            <Link href="/addfarminfo"><a>Edit farm information</a></Link>
                        </Button>}
                        
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default Map;