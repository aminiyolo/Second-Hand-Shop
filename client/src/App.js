import { Route, Switch, BrowserRouter } from "react-router-dom";
import loadble from "@loadable/component";

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
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
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
