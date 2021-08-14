import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./layout/Login";
import SignUpPage from "./layout/SignUp";
import LandingPage from "./layout/Landing";
import NavBar from "./components/Navbar";
import Upload from "./layout/Upload";
import ProductDetail from "./layout/ProductDetail";
import Cart from "./layout/Cart";
import useSWR from "swr";
import fetcher from "./hooks/fetcher";
import MyPage from "./layout/MyPage";
import Messenger from "./layout/Messenger";
import AdminPage from "./layout/AdminPage";

function App() {
  const { data, revalidate } = useSWR("/api/users/data", fetcher);
  return (
    <BrowserRouter>
      <NavBar data={data} revalidate={revalidate} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          path="/login"
          render={() => <LoginPage DATA={data} revalidate={revalidate} />}
        />
        <Route exact path="/signUp" component={SignUpPage} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/chat" render={() => <Messenger user={data} />} />
        <Route exact path="/myPage" render={() => <MyPage DATA={data} />} />
        <Route
          exact
          path="/cart"
          render={() => <Cart DATA={data} revalidate={revalidate} />}
        />
        <Route
          exact
          path="/product/:id"
          render={() => <ProductDetail DATA={data} revalidate={revalidate} />}
        />
        <Route exact path="/admin" render={() => <AdminPage DATA={data} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
