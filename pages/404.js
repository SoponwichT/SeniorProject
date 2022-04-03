import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 3000)
    }, [])

    return (
        <div className="not-found">
            <h1 className='text-3xl' >That page cannot be found.</h1>
            <p>Please go back to <Link href="/"><a>Home</a></Link></p>
        </div>
    );
}
 
export default NotFound;