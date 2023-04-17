import Container  from "react-bootstrap/Container";
import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Card  from "react-bootstrap/Card";
import Form  from "react-bootstrap/Form";
import Button  from "react-bootstrap/Button";
import React, { useState } from "react";
import Spinner  from "react-bootstrap/Spinner";
import { loginUser } from "../services/UserService";
import Alert  from "react-bootstrap/Alert";
import { useAuthDispatch} from "../context/authContext";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [sendingData, setSendingData] = useState(false);

    const authDispatch = useAuthDispatch();
    
    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setSendingData(true);
            setError("");
            const res = await loginUser(username, password);
            const token = res.data.token;
            authDispatch({
                type: 'login',
                token
            })
        } catch(errors: any){
            //setError(errors.response.data.errors);
            if (errors.response){
              if (errors.response.status === 403){
                  setError("Error iniciando sesión. Verifique credenciales");
              }  
            }
            console.log(error);
            setSendingData(false);
        }
    }

    return (
        <Container> 
            <Row>
                <Col lg="5" md="10" sm="10" className="mx-auto">
                    <Card className="mt-5">
                        <Card.Body>
                            <h4>Iniciar sesión</h4><hr />

                            <Form onSubmit={login}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control 
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        type="text"></Form.Control>
                                   
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password" placeholder="*********"></Form.Control>
                                                           
                                </Form.Group>

                                <Button type="submit"> 
                                {sendingData ? <>
                                        <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"></Spinner>
                                        &nbsp;
                                        <span>Autenticando...</span>
                                </>: <>Iniciar sesión</> }
                                </Button>
                            </Form>

                            <Alert className="mt-4" show={!!error} variant="danger"> {error} </Alert>        

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;