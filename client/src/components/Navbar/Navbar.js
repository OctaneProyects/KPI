import React, { useState } from "react";
import { Menu, Image } from "semantic-ui-react";
import OctaneLogo from "../../images/octanelogo.png";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Reports } from "../../pages/Reports";
import { Profile } from "../../pages/Profile";
import { Gastos } from "../../pages/Gastos";
import { Home } from "../../pages/Home";

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const spanStyles = {
    color: "red",
    borderColor: "#gray"
  };

  return (
    <Router>
      <Menu pointing secondary color="blue" size="massive" inverted>
        <Menu.Item
          name="logo"
          active={activeItem === "logo"}
          onClick={handleItemClick}
        >
          <Image src={OctaneLogo} size="mini" circular />
        </Menu.Item>
        <Link to="/" style={styles.navbarMargintop} >
          <Menu.Item
            name="home"
            component={Link}
            active={activeItem === "home"}
            onClick={handleItemClick}
          ></Menu.Item>
        </Link>
        <Link style={styles.navbarMargintop} to="/Reports"  >
          <Menu.Item
            name="reportes"
            component={Link}
            active={activeItem === "reportes"}
            onClick={handleItemClick}
          ></Menu.Item>
        </Link>
        <Link style={styles.navbarMargintop} to="/Gastos"  >
          <Menu.Item
            name="gastos"
            component={Link}
            active={activeItem === "gastos"}
            onClick={handleItemClick}
          ></Menu.Item>
        </Link>
        <Link to="/Profile" style={styles.navbarMargintop}>
          <Menu.Item
            name="perfil"
            component={Link}
            active={activeItem === "perfil"}
            onClick={handleItemClick}
          ></Menu.Item>
        </Link>



        <Menu.Menu position="right">
          <Menu.Item
            name={JSON.parse(localStorage.getItem('user')).NombreCompleto}
          />
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Reports" component={Reports} />
        <Route path="/Gastos" component={Gastos} />
        <Route path="/Profile" component={Profile} />
      </Switch>
    </Router>
  );
};
const styles = {
  navbarMargintop: {
    marginTop: 10,
  }
}