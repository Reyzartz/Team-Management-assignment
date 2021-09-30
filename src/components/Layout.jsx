import "styles/Layout.css";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard/Index";
import ViewEmployees from "pages/ViewEmployees/Index";
import ViewTeams from "pages/ViewTeams/Index";
import ViewHierarchy from "pages/ViewHierarchy/Index";

const Layout = () => {
  return (
    <div className="root">
      <Router>
        <Nav />
        <main>
          <Switch>
            <Route path="/employees" component={ViewEmployees} />
            <Route path="/teams" component={ViewTeams} />
            <Route path="/hierarchy" component={ViewHierarchy} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default Layout;
