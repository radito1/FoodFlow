import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { NavDropdown } from "react-bootstrap";

const Authentication = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState('');

    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) => {
            if (user) {                
                setAuthenticatedUser(user)
            } else {
                setAuthenticatedUser(null)
            }
        })

        return () => {
            listenAuth();
        }
    }, []);

    const userLogOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch(error => console.log(error));
    }


    return (
        <>
            {authenticatedUser === null ?
                <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </> :
                <>
                    <NavDropdown title={`${authenticatedUser.email}`} id="collapsible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/create">Create</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} onClick={userLogOut} to="/">Log Out</Nav.Link>
                </>
            }
        </>
    );
}

export default Authentication;