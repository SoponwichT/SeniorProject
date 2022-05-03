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
} from "@chakra-ui/react";
import { useState, useRef, useContext } from "react";
import ResetPassword, { ResetStatus } from "../lib/firebase/reset-password";
import { AuthContext } from "../services/all-provider";

const ResetPW = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(0); // 0 = loading, 1 = success, 2 = error
  const cancelRef = useRef();

  const submitReset = async (e) => {
    e.preventDefault();
    setLoadingStatus(0);
    setLoadingAlert(true);
    const response = await resetPassword(email);
    console.log(response);
    if (response === ResetStatus.error) {
      setLoadingStatus(2);
    } else if (response === ResetStatus.success) {
      setLoadingStatus(1);
    } else {
      setLoadingAlert(false);
      window.location.href = "/";
    }
  };

  return (
    <>
      <Head>
        <title>Palm planter | Reset password</title>
        <meta name="keywords" content="palmplanter" />
      </Head>
      <div className="w-full">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl">Reset password page</h1>
          <form
            onSubmit={submitReset}
            className="flex flex-col  gap-y-6 max-w-md"
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Send Reset Password
            </Button>
          </form>
        </div>
      </div>
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
                  Email sent!, please check your email
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
                <AlertDialogHeader>Error! Email is invalid.</AlertDialogHeader>
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
            {loadingStatus === 3 && (
              <>
                <AlertDialogHeader>
                  Wrong password. Pls try again
                </AlertDialogHeader>
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

export default ResetPW;
