import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const FormContainer = ({ children }) => {
    return (
        <React.Fragment>
            <Container>
                <Row className="justify-content-md-center m5-f">
                    <Col xs={12} md={6} className="card p-5">
                        { children }
                    </Col>
                </Row>            
            </Container>
        </React.Fragment>
    );
};


