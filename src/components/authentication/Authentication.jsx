import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { NavDropdown } from "react-bootstrap";

import Nav from "react-bootstrap/Nav";
import AuthContext from '../../contexts/authContext';


const Authentication = () => {
    const {
        isAuthenticated,
        username,
        email,
    } = useContext(AuthContext);

    const userLogOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            {isAuthenticated === false
                ?
                <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </> :
                <>
                    <NavDropdown title={`${username}` || `${email}`} id="collapsible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/my-profile">My profile</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/create">Create</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/my-recipes">My recipes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} onClick={userLogOut} to="/">Log Out</NavDropdown.Item>
                    </NavDropdown>
                </>
            }
        </>
    );
}

export default Authentication;