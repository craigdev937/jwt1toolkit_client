import React from "react";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormContainer } from "../components/FormContainer";
import { Loader } from "../components/Loader";
import { Actions } from "../global/AuthSlice";
import { AuthAPI } from "../global/AuthAPI";

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const [register, { isLoading }] = 
    AuthAPI.useRegisterMutation();

    React.useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("The Passwords do NOT match!");
        } else {
            try {
                const res = await register({
                    name, email, password 
                }).unwrap();
                dispatch(Actions.setCredentials({...res}));
                navigate(redirect);
            } catch (error) {
                toast.error(
                    error?.data?.message || 
                    error.error
                );
            }
        }
    };

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group 
                    className="my-2" 
                    controlId="name"
                >
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(event) => 
                            setName(event.target.value)}

                    />
                </Form.Group>
                <Form.Group 
                    className="my-2" 
                    controlId="email"
                >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => 
                            setEmail(event.target.value)}
                        
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => 
                            setPassword(event.target.value)}
                        
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) => 
                            setConfirmPassword(event.target.value)}
                        
                    />
                </Form.Group>
                <Button
                    type="subit"
                    variant="primary"
                    className="mt-3"
                    >Register
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    Already have an account? 
                    <Link to={`/login`}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};



