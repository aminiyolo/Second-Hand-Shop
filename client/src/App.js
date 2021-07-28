import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./layout/Login";
import SignUpPage from "./layout/SignUp";
import LandingPage from "./layout/Landing";
import NavBar from "./components/Navbar";
import Upload from "./layout/Upload";
import useSWR from "swr";
import fetcher from "./hooks/fetcher";

function App() {
  const { data, revalidate } = useSWR("/api/users/data", fetcher);
  return (
    <BrowserRouter>
      <NavBar data={data} revalidate={revalidate} />
      <div style={{ paddingTop: "20px" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/login"
            render={() => <LoginPage DATA={data} revalidate={revalidate} />}
          />
          <Route exact path="/signUp" component={SignUpPage} />
          <Route exact path="/upload" component={Upload} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
