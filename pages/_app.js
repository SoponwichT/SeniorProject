import Layout from "../components/Layout";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../services/all-provider";

function MyApp({ Component, pageProps }) {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDXydJapHztLVu8oZaj-OLeK4Eg9UeloZk",
    authDomain: "senior-project-a991f.firebaseapp.com",
    projectId: "senior-project-a991f",
    storageBucket: "senior-project-a991f.appspot.com",
    messagingSenderId: "437497109595",
    appId: "1:437497109595:web:c2e7afa873cbc7218db37e",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  return (
    <AuthProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
