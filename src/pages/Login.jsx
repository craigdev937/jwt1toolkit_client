import React from "react";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { Actions } from "../global/AuthSlice";
import { AuthAPI } from "../global/AuthAPI";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [login, { isLoading }] = AuthAPI.useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    React.useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await login({ email, password })
            .unwrap();
            dispatch(Actions.setCredentials({...res}));
            navigate("/");
        } catch (error) {
            toast.error(
                error?.data?.message || 
                error.error
            );
        }
    };

    return (
        <FormContainer>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => 
                            setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => 
                            setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button
                    disabled={isLoading}
                    type="submit"
                    variant="primary"
                    className="mt-3"
                    >Login
                </Button>
            </Form>
            {isLoading && <Loader />}
            <Row className="py-3">
                <Col>
                    New Customer? 
                    <Link to="/register"
                        >Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};



