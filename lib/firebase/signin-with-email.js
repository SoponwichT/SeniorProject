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
        console.log(1);
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(2);
        const user = userCredential.user;
        console.log(userCredential);
        if(!user.emailVerified) {
            await sendEmailVerification(user)
            return SignInStatus.sthWrong
        }
        return SignInStatus.success
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        //compare error and return
        if (errorCode==="auth/wrong-password") {
            return SignInStatus.wrongpwd
        }
        else if (errorCode==="auth/user-not-found"){
            return SignInStatus.usererror
        }
        return SignInStatus.error
    }
        
}
export default SignInWUsernamePassword;


function sthFunction(){
    if(true){
        return "success"
    } else {
        throw Error("123")
    }
}