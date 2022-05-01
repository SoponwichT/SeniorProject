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
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polygon,
    Marker,
    InfoWindow
} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";

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
        const response2 = await addFarmarea(latcoord, lngcoord, areacoord, uid)
        if (response1 && response2 === ActivityStatus.success) {
            setLoadingStatus(1)
        } else {
            setLoadingStatus(2)
        }
    }

    function getPaths(polygon) {

        var polygonBounds = polygon.getPath();
        var bounds = [];
        for (var i = 0; i < polygonBounds.length; i++) {
            var point = {
                lat: polygonBounds.getAt(i).lat(),
                lng: polygonBounds.getAt(i).lng()
            };
            bounds.push(point);
        }
        console.log(typeof bounds);
        return bounds
    }


    const RegularMap = withScriptjs(
        withGoogleMap(props =>
        (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: 14.069183, lng: 100.607452 }}
                onClick={e => {
                    const lat = e.latLng.lat();
                    const lng = e.latLng.lng();
                    console.log(lat, lng);
                    setLatcoord(lat)
                    setLngcoord(lng)

                }}

            >

                <Marker position={{ lat: Number(latcoord), lng: Number(lngcoord) }} />

                <DrawingManager
                    onPolygonComplete={value => {
                        const area = getPaths(value)
                        setAreacoord(Object.values(area))
                        console.log(Object.values(area));
                    }}
                    options={{
                        drawingControl: true,
                        drawingControlOptions: {
                            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            position: window.google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
                        },
                        polygonOptions: {
                            fillColor: "#00C897",
                            fillOpacity: 0.2,
                            strokeWeight: 2,
                            strokeColor: "#019267",
                            clickable: true,
                            editable: true,
                            draggable: true,
                            geodesic: false,
                            visible: true,
                            zIndex: 1
                        }
                    }}
                />
            </GoogleMap>

        ))
    );

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
                                <RegularMap
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjiX8C7RhkmNpufQGYeL20OrLOFS0hXjY&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: '150px', width: '150px' }} />}
                                    containerElement={<div style={{ height: '510px', width: '600px' }} />}
                                    mapElement={<div style={{ height: '100%' }} />}
                                />
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