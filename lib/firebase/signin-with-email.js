import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export class SignInStatus {
    static success = "success"
    static usererror = "usererror"
    static already = "already"
    static sthWrong = "sthWrong"
    static wrongpwd = "wrongpwd"
}

async function SignInWUsernamePassword(email, password) {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log(userCredential);
        if(!user.emailVerified) {
            await sendEmailVerification(user)
            throw SignInStatus.sthWrong
        }
        return userCredential.user
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        //compare error and return
        if (errorCode==="auth/wrong-password") {
            throw SignInStatus.wrongpwd
        }
        else if (errorCode==="auth/user-not-found"){
            throw SignInStatus.usererror
        }
        throw SignInStatus.error
    }
        
}
export default SignInWUsernamePassword;