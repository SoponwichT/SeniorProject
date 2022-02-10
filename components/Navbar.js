import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
        <div className='logo'>
            <h1>Palm planter</h1>
        </div>
        <Link href="/"><a>Home</a></Link>
        <Link href="/map"><a>Map</a></Link>
        <Link href="/myfarm"><a>My Farm</a></Link>
        <Link href="/notification"><a>Notification</a></Link>
    </nav>
  );
}
 
export default Navbar;