import React from "react";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { AuthAPI } from "../global/AuthAPI";
import { Actions } from "../global/AuthSlice";

export const Profile = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = AuthAPI.useUpdateMutation();

    React.useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("The Passwords do NOT Match!");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name, email, password
                }).unwrap();
                console.log(res);
                dispatch(Actions.setCredentials(res));
                toast.success("The Profile has Updated!");
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
            <h1>Update the Profile</h1>
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => 
                            setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group 
                    className="my-2" 
                    controlId="password"
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => 
                            setPassword(event.target.value)}
                    />
                </Form.Group>
                <Form.Group 
                    className="my-2" 
                    controlId="confirmPassword"
                >
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
                    type="submit"
                    variant="primary"
                    className="mt-3"
                >
                    Update
                </Button>
            </Form>
            {isLoading && <Loader />}
        </FormContainer>
    );
};



