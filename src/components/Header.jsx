import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Navbar, Nav, Container, 
    NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthAPI } from "../global/AuthAPI";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApiCall] = AuthAPI.useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Navbar 
                bg="dark" 
                variant="dark" 
                expand="lg" 
                collapseOnSelect
            >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand
                            >MERN Auth
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle 
                        aria-controls="basic-navbar-nav" 
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <React.Fragment>
                                    <NavDropdown 
                                        title={userInfo.name} 
                                        id="username"
                                    >
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item
                                            onClick={logoutHandler}
                                            >Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <FaSignInAlt />Login
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>
                                            <FaSignOutAlt />Register
                                        </Nav.Link>
                                    </LinkContainer>
                                </React.Fragment>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </React.Fragment>
    );
};


