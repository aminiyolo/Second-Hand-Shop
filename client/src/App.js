import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import loadble from "@loadable/component";

const Login = loadble(() => import("./layout/Login"));
const SignUp = loadble(() => import("./layout/SignUp"));
const Landing = loadble(() => import("./layout/Landing"));
const NavBar = loadble(() => import("./components/Navbar"));
const Upload = loadble(() => import("./layout/Upload"));
const ProductDetail = loadble(() => import("./layout/ProductDetail"));
const Cart = loadble(() => import("./layout/Cart"));
const MyPage = loadble(() => import("./layout/MyPage"));
const Messenger = loadble(() => import("./layout/Messenger"));
const Admin = loadble(() => import("./layout/AdminPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/chat" component={Messenger} />
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
