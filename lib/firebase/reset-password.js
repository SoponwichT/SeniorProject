import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export class ResetStatus {
  static success = "success";
  static error = "error";
  static sthWrong = "sthWrong";
}

async function ResetPassword(email) {
  const auth = getAuth();
  try {
    const result = await sendPasswordResetEmail(auth, email);
    return result;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

export default ResetPassword;
