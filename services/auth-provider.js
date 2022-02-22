import { useState, useEffect, createContext } from "react"
import SignInWUsernamePassword, { SignInStatus } from "../lib/firebase/signin-with-email"

export const AuthContext = createContext(null);

const nameKey = "name"
const isLoggedKey = "isLoggedIn"

export default function AuthProvider({ children }) {
    const [name, setName] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function signinEmail(email, password) {
        try {
            const response = await SignInWUsernamePassword(email, password)
            console.log(response);

            setName(response.email)
            setIsLoggedIn(true)
            localStorage.setItem(nameKey, response.email)
            localStorage.setItem(isLoggedKey, "true")
            return SignInStatus.success
        } catch (error) {
            return error
        }
    }

    // TODO: async function signinGoogle(email, password) then change to Signinwithgoogle

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
        // TODO: add fuction recently create
    }

    return <AuthContext.Provider value={passingValue}>{children}</AuthContext.Provider>
}