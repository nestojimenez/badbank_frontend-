import AllData from "./components/AllData";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Route,
  //BrowserRouter,
  HashRouter,
  Switch,
} from "react-router-dom";
import WithDraws from "./components/WithDraws";
import Deposit from "./components/Deposit";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";

function App() {
  return (
    <div className="App">
      <NavBar />

      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/CreateAccount">
            <CreateAccount />
          </Route>
          <Route path="/AllData">
            <AllData />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Withdraw">
            <WithDraws />
          </Route>
          <Route path="/Deposit">
            <Deposit />
          </Route>
          <Route path="/Balance">
            <Balance />
          </Route>
          <Route path="/Transfer">
            <Transfer />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
