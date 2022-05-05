import Head from "next/head";
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
  CircularProgress,
  CircularProgressLabel,
  Checkbox,
  CheckboxGroup,
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../services/all-provider";
import { ActivityStatus } from "../lib/firebase/activity-record";
import { useRouter } from "next/router";

const Myfarm = () => {
  const router = useRouter();
  const { name } = router.query;
  const {
    activityRecord,
    getFarmInfomation,
    uid,
    isLoggedIn,
    addNotification,
  } = useContext(AuthContext);
  const [farm, setFarm] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [water, setWater] = useState(false);
  const [fertilizer, setfertilizer] = useState(false);
  const [recname, setRecname] = useState("");
  const [recordOf, setRecordOf] = useState("");
  const [soilstatus, setSoilstatus] = useState("");
  const [other, setOther] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(0); // 0 = loading, 1 = success, 2 = error
  const cancelRef = useRef();
  const message1 =
    "Tomorrow is a big activity day! Please do the following tasks 1.Check soil quality 2.Fertilize 3.Water the tree 4.Trim the leave 5.Harvest the crops";
  const message2 =
    "Tomorrow is a small activity day! Please do the following tasks 1.Water the tree 2.Trim some tree 3.Harvest the crops";
  const type1 = 0;
  const type2 = 1;
  var timestamp1 = Math.round(new Date().getTime() / 1000);
  timestamp += 2505600; // 29days
  // timestamp1 += 20;
  var datetime1 = new Date(timestamp1 * 1000);
  var timestamp2 = Math.round(new Date().getTime() / 1000);
  timestamp2 += 1209600; // 14days
  // timestamp2 += 10;
  var datetime2 = new Date(timestamp2 * 1000);

  async function init() {
    const result = await getFarmInfomation();
    const resultdata = result.filter((data) => data.uid === uid);
    setFarm(resultdata);
    console.log(resultdata);
  }

  useEffect(() => {
    if (uid) {
      init();
    }

    return () => {};
  }, [uid]);

  const submitActivity = async (e) => {
    e.preventDefault();
    setLoadingStatus(0);
    setLoadingAlert(true);
    const response = await activityRecord(
      recordOf,
      water,
      fertilizer,
      recname,
      soilstatus,
      startDate,
      other,
      uid
    );
    const addnoti1 = await addNotification(
      message1,
      datetime1,
      uid,
      recordOf,
      type1
    );
    const addnoti2 = await addNotification(
      message2,
      datetime2,
      uid,
      recordOf,
      type2
    );
    console.log(response);
    if (response && addnoti1 && addnoti2 === ActivityStatus.success) {
      setLoadingStatus(1);
    } else {
      setLoadingStatus(2);
    }
  };

  return (
    <>
      <Head>
        <title>Palm planter | Activity</title>
        <meta name="keywords" content="palmplanter" />
      </Head>
      {isLoggedIn ? (
        <div className="w-full">
          <div className="mx-auto max-w-md">
            <h1 className="text-3xl">Record Activity</h1>
            <p className="text-red-600">( Please do not forget to record activity every big activity day) </p>
            <form
              onSubmit={submitActivity}
              className="flex flex-col gap-y-6 max-w-md my-3 bg-slate-50 rounded-md shadow-xl p-4 border-2"
            >
              <FormControl isRequired>
                <FormLabel htmlFor="farm">Farm</FormLabel>
                <Select
                  value={recordOf}
                  onChange={(e) => setRecordOf(e.target.value)}
                  id="farm,"
                  placeholder="Select farm"
                >
                  {farm.map((farm) => (
                    <option key={farm.farmname} value={farm.farmname}>
                      {farm.farmname}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="water-status">Water Status</FormLabel>
                <Checkbox
                  value={water}
                  onChange={(e) => setWater((e.target.value = true))}
                  id="water-status"
                  size="lg"
                >
                  Water
                </Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="fertilizer-status">
                  Fertilizer Status
                </FormLabel>
                <Checkbox
                  value={fertilizer}
                  onChange={(e) => setfertilizer((e.target.value = true))}
                  id="fertilizer-status"
                  size="lg"
                >
                  Fertilizer
                </Checkbox>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="recorder-name">Record By</FormLabel>
                <Input
                  value={recname}
                  onChange={(e) => setRecname(e.target.value)}
                  id="recorder-name"
                  placeholder="name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="soil-status">Soil Status</FormLabel>
                <Input
                  value={soilstatus}
                  onChange={(e) => setSoilstatus(e.target.value)}
                  id="soil-status"
                  placeholder="normal"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="other">Other</FormLabel>
                <Input
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  id="other"
                  placeholder="Other note"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="record-date">Record Date</FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date.target.value)}
                  id="record-date"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Submit Record
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl">
            Please login to add your farm activity!
          </h1>
        </div>
      )}
      <AlertDialog isOpen={loadingAlert} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            {loadingStatus === 0 && (
              <>
                <div className="mx-auto py-36">
                  {" "}
                  <CircularProgress
                    size="90px"
                    thickness="6px"
                    isIndeterminate
                  />
                </div>
              </>
            )}
            {loadingStatus === 1 && (
              <>
                <AlertDialogHeader>
                  Your Activity has been recorded!!
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    onClick={(_) => {
                      window.location.href = "/";
                    }}
                    ref={cancelRef}
                  >
                    Done
                  </Button>
                </AlertDialogFooter>
              </>
            )}
            {loadingStatus === 2 && (
              <>
                <AlertDialogHeader>Error. Pls try again</AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    colorScheme="red"
                    ref={cancelRef}
                    onClick={() => {
                      setLoadingAlert(false);
                    }}
                  >
                    OK
                  </Button>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Myfarm;
