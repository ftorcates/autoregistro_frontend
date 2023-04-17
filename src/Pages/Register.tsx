import Container  from "react-bootstrap/Container";
import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Card  from "react-bootstrap/Card";
import Form  from "react-bootstrap/Form";
import Button  from "react-bootstrap/Button";
import React, { useState } from "react";
import Spinner  from "react-bootstrap/Spinner";
import { loginUser, registerUser } from "../services/UserService";
import { useAuthDispatch, useAuthState } from "../context/authContext";

const Register = () => {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [sendingData, setSendingData] = useState(false);

    const authDispatch = useAuthDispatch();
    const user = useAuthState();

    console.log(user);

    const register = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setSendingData(true);
            setUsername(email);
            //Registro de usuario
            const role = 'User';
            await registerUser(username, name, email, password, role);
            //Inicio de sesion 
            const res = await loginUser(username, password);
            const token = res.data.token;
            authDispatch({
                type: 'login',
                token
            })
        } catch(errors: any){
            if (errors.response){
                errors.response.status === 400 && setErrors(errors.response.data.errors);
            }
            setSendingData(false);
        }
    }

    return (
        <Container> 
            <Row>
                <Col lg="5" md="10" sm="10" className="mx-auto">
                    <Card className="mt-5">
                        <Card.Body>
                            <h4>Crear cuenta</h4><hr />

                            <Form onSubmit={register}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control 
                                        isInvalid = {!!errors?.name}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        type="text" placeholder="Ej: John Doe"></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        { errors?.name}
                                    </Form.Control.Feedback>
                                </Form.Group>                                

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control 
                                        isInvalid = {!!errors?.email}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="email" placeholder="Ej: johnDoe@gmail.com"></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        { errors?.email}
                                    </Form.Control.Feedback>    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control 
                                        isInvalid = {!!errors?.password}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password" placeholder="*********"></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        { errors?.password}
                                    </Form.Control.Feedback>                                
                                </Form.Group>                                

                                <Button type="submit"> 
                                {sendingData ? <>
                                        <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"></Spinner>
                                        &nbsp;
                                        <span>Creando cuenta...</span>
                                </>: <>Crear Cuenta</> }
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;