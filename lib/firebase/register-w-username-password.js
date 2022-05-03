import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export class RegisterStatus {
  static success = "success";
  static error = "error";
  static already = "already";
  static sthWrong = "sthWrong";
}

async function RegisterWUsernamePassword(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(userCredential);
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      return user;
    }
    throw RegisterStatus.sthWrong;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    throw RegisterStatus.error;
  }
}

export default RegisterWUsernamePassword;
