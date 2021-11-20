import { Route, Switch, BrowserRouter } from "react-router-dom";
import loadble from "@loadable/component";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Login = loadble(() => import("./pages/Login"));
const SignUp = loadble(() => import("./pages/SignUp"));
const Landing = loadble(() => import("./pages/Landing"));
const NavBar = loadble(() => import("./components/Navbar"));
const Upload = loadble(() => import("./pages/Upload"));
const ProductDetail = loadble(() => import("./pages/ProductDetail"));
const Cart = loadble(() => import("./pages/Cart"));
const MyPage = loadble(() => import("./pages/MyPage"));
const Messenger = loadble(() => import("./pages/Messenger"));
const Admin = loadble(() => import("./pages/AdminPage"));

function App() {
  const { user } = useSelector((state) => state);
  const [socket, setSocket] = useState("");

  useEffect(() => {
    user && setSocket(io("ws://aminiyo-second-hand-market.herokuapp.com/"));
  }, [user]);

  useEffect(() => {
    user && socket && socket?.emit("addUser", user?._id);
  }, [socket, user]);

  return (
    <>
      <BrowserRouter>
        <NavBar socket={socket} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/chat">
            <Messenger socket={socket} />
          </Route>
          <Route exact path="/myPage" component={MyPage} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
