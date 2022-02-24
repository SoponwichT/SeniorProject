import { useState, useEffect, createContext } from "react"
import SignInWUsernamePassword, { SignInStatus } from "../lib/firebase/signin-with-email"
import RegisterWUsernamePassword from "../lib/firebase/register-w-username-password"
import Firestore from "../lib/firebase/firestore";
import { RegisterStatus } from "../lib/firebase/register-w-username-password";

export const AuthContext = createContext(null);

const nameKey = "name"
const isLoggedKey = "isLoggedIn"

export default function AuthProvider({ children }) {
    const [name, setName] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const firestore = new Firestore()

    async function signinEmail(email, password) {
        try {
            const response = await SignInWUsernamePassword(email, password)
            console.log(response);

            const user = await firestore.getUser(response.uid)

            setName(user.fname)
            setIsLoggedIn(true)
            localStorage.setItem(nameKey, user.fname)
            localStorage.setItem(isLoggedKey, "true")
            return SignInStatus.success
        } catch (error) {
            return error
        }
    }

    async function registerEmail(email, password, fname, lname) {

        try {
            const response = await RegisterWUsernamePassword(email, password)
            console.log(response);

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
    
    // TODO: async function signinGoogle(email, password) then change to Signinwithgoogle
    async function signinGoogle(email, password) {
        try {
            const response = await Signinwithgoogle(email, password)
            console.log(response);

            
            

            setName(user.fname)
            setIsLoggedIn(true)
            localStorage.setItem(nameKey, user.fname)
            localStorage.setItem(isLoggedKey, "true")
            return SignInStatus.success
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



    useEffect(() => {
        const name = localStorage.getItem(nameKey)
        setName(name ?? "")
        const isLoggedIn = localStorage.getItem(isLoggedKey)
        console.log(isLoggedIn);
        setIsLoggedIn(isLoggedIn === "true")

        return () => { }
    }, [])

    const passingValue = {
        signinEmail,
        name,
        isLoggedIn,
        logout,
        registerEmail,
        signinGoogle
        // TODO: add fuction recently create
    }

    return <AuthContext.Provider value={passingValue}>{children}</AuthContext.Provider>
}