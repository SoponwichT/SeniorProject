import Head from 'next/head'
import GMap from '../components/GMap.js'

const Map = () => {
    return (
        <>
            <Head>
                <title>Palm planter | Map</title>
                <meta name="keywords" content="palmplanter" />
            </Head>
            <div>
                <GMap/>
            </div>
        </>
    );
}

export default Map;