import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import Play from "./pages/Play";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={FrontPage} exact />
        <Route path="/play" component={Play} exact />
      </Switch>
    </Router>
  );
}

export default App;
