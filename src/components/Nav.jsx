import { useState } from "react";
import "styles/Nav.css";
import logo from "assets/icons/logo.png";
import DashboardIcon from "assets/icons/DashboardIcon.svg";
import TeamIcon from "assets/icons/TeamIcon.svg";
import EmployeeIcon from "assets/icons/EmployeeIcon.svg";
import HierarchyIcon from "assets/icons/Hierarchy.svg";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [drawerClose, setDrawerClose] = useState(false);
  return (
    <div className={`NavDrawer ${drawerClose && "closeDrawer"}`}>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          <h1 className="logo-text">Facilicis</h1>
        </div>
        <button className="menu-btn" onClick={() => setDrawerClose((c) => !c)}>
          <div></div>
          <div></div>
        </button>
      </header>
      <nav>
        <ul>
          <NavLink
            to={{ pathname: "/" }}
            className="NavLink"
            activeClassName="selected"
            exact
          >
            <li>
              <img
                src={DashboardIcon}
                alt="dashboardIcon"
                className="NavIcon"
              />
              Dashboard
            </li>
          </NavLink>

          <NavLink
            to={{ pathname: "/teams" }}
            className="NavLink"
            activeClassName="selected"
            exact
          >
            <li>
              <img src={TeamIcon} alt="teamsIcon" className="NavIcon" />
              Teams
            </li>
          </NavLink>

          <NavLink
            to={{ pathname: "/employees" }}
            className="NavLink"
            activeClassName="selected"
            exact
          >
            <li>
              <img src={EmployeeIcon} alt="EmployeeIcon" className="NavIcon" />
              Employees
            </li>
          </NavLink>
          <NavLink
            to={{ pathname: "/hierarchy" }}
            className="NavLink"
            activeClassName="selected"
            exact
          >
            <li>
              <img
                src={HierarchyIcon}
                alt="HierarchyIcon"
                className="NavIcon"
              />
              View Hierarchy
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
