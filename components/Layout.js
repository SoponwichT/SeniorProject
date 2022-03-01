import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
    return (
        <div className="content">
            <Navbar />
            <div className="main">
                {children}
            </div>
        </div>
    );
}

export default Layout;