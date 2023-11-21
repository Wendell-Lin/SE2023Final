import { Route, Routes, useLocation, useMatch, useResolvedPath, Link, useNavigate } from "react-router-dom"
import "./App.css"
import {useCookies} from "react-cookie"

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize with false for demonstration
  const [cookies, setCookie, removeCookie] = useCookies(['username'])

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  const login = () => {
     const expires = new Date(new Date().getTime() + 5 * 1000); // Expires in 5 seconds
     setCookie('email', 'ExampleUser', { path: '/', expires });
     navigate("/viewitems");
  };
  const logout = () => {
    removeCookie('username', { path: '/' });
  };
  const navHome = () => {navigate("/")};

  const isLoggedIn = !!cookies.username; // Check if the username cookie exists
  return (
    <>
      {!hideNavbar && (
        <nav className="nav">
        <Link to="/" className="site-title">
          FeastForward
        </Link>
        <ul>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/viewitems">View Items</CustomLink>
          <CustomLink to="/uploaditems">Upload Items</CustomLink>
          {isLoggedIn ? (<>
              <CustomLink to="/profile">Profile</CustomLink>
              <Link to="/" onClick={logout}> Logout </Link>
          </>):(<>
              <CustomLink to="/login">Login</CustomLink>
              <CustomLink to="/register">Register</CustomLink>
          </>)}
        </ul>
      </nav>
      )}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewitems" element={<ViewItems />} />
          <Route path="/uploaditems" element={<UploadItems />} />
          <Route path="/login" element={<Login login={login}/>} />
          <Route path="/register" element={<Register navHome={navHome}/>} />
        </Routes>
      </div>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  if (to === "/logout")
    to = "/"
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}


const Home = () => {
  return <h1>Home</h1>
}
const ViewItems = () => {
  return <h1>ViewItems</h1>
}
const UploadItems = () => {
  return <h1>UploadItems</h1>
}
const Login = ({login}) => {
  return <button onClick={login}>login</button>
}
const Register = ({navHome}) => {
  return <button onClick={navHome}>Register</button>
}

export default App;

