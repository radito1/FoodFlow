import { Link } from "react-router-dom";

import styles from "./navigation.module.css";

import Authentication from "../authentication/Authentication";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = () => {
    return (
        <div className={styles['navigation-container']}>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <img className={styles.logo} src="/food-logo.png" alt="logo" />
                    <Navbar.Brand as={Link} to="/">FoodFlow</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">How it works</Nav.Link>
                            <NavDropdown className={styles.dropdown} title="Categories" id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/catalog/all-posts">All posts</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.1">Burger</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Meat</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/soups">Soups</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Authentication />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;