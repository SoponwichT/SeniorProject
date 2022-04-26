import { useState, useEffect, createContext } from "react"
import Signinwithgoogle from "../lib/firebase/siginin-with-google"
import SignInWUsernamePassword, { SignInStatus } from "../lib/firebase/signin-with-email"
import RegisterWUsernamePassword from "../lib/firebase/register-w-username-password"
import ResetPassword, { ResetStatus } from "../lib/firebase/reset-password"
import { ActivityStatus } from "../lib/firebase/activity-record"
import Firestore from "../lib/firebase/firestore";
import { RegisterStatus } from "../lib/firebase/register-w-username-password";

export const AuthContext = createContext(null);

const nameKey = "name"
const uidKey = "uid"
const isLoggedKey = "isLoggedIn"

export default function AuthProvider({ children }) {
    const [name, setName] = useState("")
    const [uid, setUid] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const firestore = new Firestore()

    // --------------------------------------------------------------------- auth-provider -------------------------------------------------------------

    async function resetPassword(email) {
        try {
            const response = await ResetPassword(email)
            return ResetStatus.success

        } catch (error) {
            return error
        }
    }

    async function signinEmail(email, password) {
        try {
            const response = await SignInWUsernamePassword(email, password)
            const user = await firestore.getUser(response.uid)
            setUid(response.uid)
            setName(user.fname)
            setIsLoggedIn(true)
            localStorage.setItem(nameKey, user.fname)
            localStorage.setItem(uidKey, response.uid)
            localStorage.setItem(isLoggedKey, "true")
            return SignInStatus.success
        } catch (error) {
            return error
        }
    }

    async function registerEmail(email, password, fname, lname) {

        try {
            const response = await RegisterWUsernamePassword(email, password)
            const user = await firestore.addUser(response.uid, {
                fname,
                lname,
                email
            })

            return RegisterStatus.success

        } catch (error) {
            console.log(error);
            return RegisterStatus.sthWrong
        }

    }


    async function signinGoogle(email, password) {
        try {
            const response = await Signinwithgoogle(email, password)

            if (firestore.isUserExist) {
                const displayName = response.displayName.split(" ");
                const fname = displayName[0];
                const lname = displayName[1];
                const email = response.email;
                const user = await firestore.addUser(response.uid, {
                    fname,
                    lname,
                    email
                })
                const newuser = await firestore.getUser(response.uid)
                setUid(response.uid)
                setName(newuser.fname)
                setIsLoggedIn(true)
                localStorage.setItem(uidKey, response.uid)
                localStorage.setItem(nameKey, newuser.fname)
                localStorage.setItem(isLoggedKey, "true")
                return SignInStatus.success
            }
            else {
                const user = await firestore.getUser(response.uid)
                setName(user.fname)
                setIsLoggedIn(true)
                localStorage.setItem(nameKey, user.fname)
                localStorage.setItem(isLoggedKey, "true")
                return SignInStatus.success
            }


        } catch (error) {
            return error
        }
    }


    async function logout() {
        setName("")
        setIsLoggedIn(false)
        localStorage.removeItem(nameKey)
        localStorage.removeItem(isLoggedKey)
    }

    // --------------------------------------------------------------------- auth-provider -------------------------------------------------------------

    // --------------------------------------------------------------------- farm-provider -------------------------------------------------------------

    async function activityRecord(waterStatus, fertilizerStatus, recordBy, soilCheck, createAt) {
        try {
            const user = await firestore.addActivity({
                waterStatus,
                fertilizerStatus,
                recordBy,
                soilCheck,
                createAt
            })
            return ActivityStatus.success

        } catch (error) {
            console.log(error.message);
            return ActivityStatus.sthWrong
        }

    }

    async function addFarmInfomation(farmname, ownername, numberOflabor, totalarea, numberOfplant, geography, soilType, waterSourceRainwater, waterSourceIrrigation, uid) {
        try {
            const user = await firestore.addFarmInfo({
                farmname,
                ownername,
                numberOflabor,
                totalarea,
                numberOfplant,
                geography,
                soilType,
                waterSourceRainwater,
                waterSourceIrrigation,
                uid
            })
            return ActivityStatus.success

        } catch (error) {
            console.log(error.message);
            return ActivityStatus.sthWrong
        }

    }

    async function getFarmInfomation() {
        try {
            const farm = await firestore.getFarm()
            
            return farm

        } catch (error) {
            console.log(error.message);
            return ActivityStatus.sthWrong
        }

    }

    async function getActivityRecord() {
        try {
            const act = await firestore.getActivity()

            return act

        } catch (error) {
            console.log(error.message);
            return ActivityStatus.sthWrong
        }
    }

    // --------------------------------------------------------------------- farm-provider -------------------------------------------------------------

    useEffect(() => {
        const name = localStorage.getItem(nameKey)
        setName(name ?? "")
        const uid = localStorage.getItem(uidKey)
        setUid(uid)
        const isLoggedIn = localStorage.getItem(isLoggedKey)
        setIsLoggedIn(isLoggedIn === "true")

        return () => { }
    }, [])

    const passingValue = {
        signinEmail,
        name,
        isLoggedIn,
        uid,
        logout,
        registerEmail,
        signinGoogle,
        resetPassword,
        activityRecord,
        addFarmInfomation,
        getFarmInfomation,
        getActivityRecord
    }

    return <AuthContext.Provider value={passingValue}>{children}</AuthContext.Provider>
}