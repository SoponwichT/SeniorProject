import Link from "next/link";
import { getAuth } from "firebase/auth";


const Navbar = () => {
  
  return (
    <nav className="text-lg font-medium">
      <div className='logo'>
        <h1>Palm planter</h1>
        <h1>Welcome,</h1>
      </div>
      <Link href="/"><a>Home</a></Link>
      <Link href="/map"><a>Map</a></Link>
      <Link href="/myfarm"><a>My Farm</a></Link>
      <Link href="/notification"><a>Notification</a></Link>
      <Link href="/signin"><a>Sign In</a></Link>

      
    </nav>
  );
}

export default Navbar;