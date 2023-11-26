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
                                <NavDropdown.Item as={Link} to="/catalog/all-recipes">All recipes</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/catalog/appetizers">Appetizers</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/main-courses">Main Courses</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/soups">Soups</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/desserts">Desserts</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/salads">Salads</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/beverages">Beverages</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/baking">Baking</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/vegetarian-vegan">Vegetarian/Vegan</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/grilling-bbq">Grilling/BBQ</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/burgers-sandwitches">Burgers/Sandwiches</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/catalog/international-cuisine">International Cuisine</NavDropdown.Item>
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