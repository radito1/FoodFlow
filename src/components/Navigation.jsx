import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">FoodFlow</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">How it works</Nav.Link>
                        <NavDropdown title="Categories" id="collapsible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/catalog/see-all">See all</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.1">Burger</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Meat
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Soups</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Authentication/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;