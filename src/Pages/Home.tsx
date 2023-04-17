import { Card, Col, Container, Row, Table, Toast, ToastContainer } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import addIcon from '../img/addIcon.jpg'; 
import searchIcon from '../img/searchIcon.png'; 
import statsIcon from '../img/statsIcon.jpg'; 
import dataIcon from '../img/dataIcon.png'; 
import { useEffect, useState } from "react";
import { deleteReport, getCountMonthReports, getCountMyReports, getCountTodayReports, getCountTotalReports, getLastReports } from "../services/ReportService";
import ReactTooltip from "react-tooltip";
import { confirmAlert } from "react-confirm-alert";
import swal from "sweetalert";
import { List, Trash } from "react-bootstrap-icons";
import { useAuthState } from "../context/authContext";
import { getUser } from "../services/UserService";

const Home = () => {
    const [showToast, setShowToast] = useState(false);
    const [reports, setReports] = useState<any>([]);
    const [countTotal, setCountTotal] = useState("");
    const [countToday, setCountToday] = useState("");
    const [countMonth, setCountMonth] = useState("");
    const [countMyReports, setCountMyReports] = useState("");

    const [isAdmin, setIsAdmin] = useState(false);

    const history = useHistory();

    const user = useAuthState();

    useEffect(() => {
        getDetailsUser();
        fetchReports();
    }, []); 

    const getDetailsUser = async () => {
        const res: any = await getUser(user.username);

        console.log(res.data);
        console.log(res.data.role);

        if (res.data.role === "Admin"){
            console.log("Admin")
            setIsAdmin(true);
        }
        console.log(isAdmin);
    }

    const fetchReports = async () => {
        const res1: any = await getCountTotalReports();
        setCountTotal(res1.data.contador);

        const res2: any = await getCountTodayReports();
        setCountToday(res2.data.contador);

        const res3: any = await getCountMonthReports();
        setCountMonth(res3.data.contador);

        const res4: any = await getCountMyReports();
        setCountMyReports(res4.data.contador);

        const res: any = await getLastReports();
        console.log(res.data);

        setReports(res.data);        

        ReactTooltip.rebuild();
        
    }

    const deleteRep = async (reportId: string) => {
        console.log(reportId);
        await deleteReport(reportId);
    }

    const handleDeleteReport = (reportId: string) => {
        console.log(reportId);
        confirmAlert({
            customUI: ({onClose}) => {
                return swal({
                    title: "Eliminar reporte?",
                    text: "¿Está seguro de eliminar este reporte?",
                    icon: "warning",
                    buttons: ["No", "Si"]

                }).then(respuesta=>{
                    if (respuesta){
                        deleteRep(reportId);
                        swal({
                            title: "El reporte fue eliminado",
                            icon: "success",
                            timer: 2000
                        })
                        
                    }
                })
            }
        })
        //await deletePoll(pollId);
        //Para actualizar la pagina despues de eliminar
        //currentPage === 0 ? fetchPolls() : setCurrentPage(0);
    }

    

    const renderTable = () => {
        console.log(reports);
        return (<Table className="mt-3 polls-table" striped bordered hover responsive>
            <thead>
                <tr>
                    <th className="bg-primary text-white">Fecha</th>
                    <th className="bg-primary text-white">Tienda</th>
                    <th className="bg-primary text-white">Responsable</th>
                    <th className="bg-primary text-white">Stream</th>
                    <th className="bg-primary text-white">Error</th>
                    <th className="bg-primary text-white">Summary</th>
                    <th className="bg-primary text-white"></th>
                </tr>                              
            </thead>
            <tbody>
                {
                    reports.map((report: any) => {
                        return (
                            <tr key={report.id}>
                                <td>{report.fecha_soporte.substring(0,10)}</td>
                                <td>{report.tienda}</td>
                                <td>{report.responsable}</td>
                                <td>{report.stream}</td>
                                <td>{report.err}</td>
                                <td>{report.summary}</td>
                                <td className="polls-table-controls">                                    
                                    <span data-tip="Ver detalle" 
                                        onClick={() => history.push(`/consultaReport/${report.id}`)}>
                                        <List></List>
                                    </span> 
                                    {isAdmin &&
                                    <>
                                        <span data-tip="Eliminar reporte"
                                              onClick={() => handleDeleteReport(report.id)}>
                                            <Trash></Trash>
                                        </span>
                                    </>
                                    }
                                    
                                </td>
                            </tr>);
                    })
                }    
            </tbody>  
        </Table>);
    }

    return (
        <Container> 
            <Row>
                <Col>
                    <Card className="mt-3" >
                        <Card.Body>
                            <Row>
                                <Col lg="5">
                                    <div className="d-flex justify-content-center align-middle">
                                        <img src={dataIcon} height="50" width="50" alt="Total Registros"></img>   
                                    </div> 
                                </Col>    
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <p className="text-12">Total de reportes</p>
                                    </div> 
                                </Col>    
                            </Row>  
                            <Row>
                                <Col>
                                <div className="d-flex justify-content-center">
                                        <p className="text-16-bold">{countTotal}</p>
                                    </div> 
                                </Col>
                            </Row> 
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mt-3" >
                        <Card.Body>
                            <Row>
                                <Col lg="5">
                                    <div className="d-flex justify-content-center">
                                        <img src={dataIcon} height="50" width="50" alt="Registros del día"></img>   
                                    </div> 
                                </Col>    
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <p className="text-12">Reportes de Hoy</p>
                                    </div> 
                                </Col>    
                            </Row>   
                            <Row>
                                <Col>
                                <div className="d-flex justify-content-center">
                                        <p className="text-16-bold">{countToday}</p>
                                    </div> 
                                </Col>
                            </Row> 
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mt-3" >
                        <Card.Body>
                            <Row>
                                <Col lg="5">
                                    <div className="d-flex justify-content-center">
                                        <img src={dataIcon} height="50" width="50" alt="Registros por Categoria"></img>   
                                    </div> 
                                </Col>    
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <p className="text-12">Reportes del Mes</p>
                                    </div> 
                                </Col>    
                            </Row>   
                            <Row>
                                <Col>
                                <div className="d-flex justify-content-center">
                                        <p className="text-16-bold">{countMonth}</p>
                                    </div> 
                                </Col>
                            </Row> 
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mt-3" >
                        <Card.Body>
                            <Row>
                                <Col lg="5">
                                    <div className="d-flex justify-content-center">
                                        <img src={dataIcon} height="50" width="50" alt="Mis Registros"></img>   
                                    </div> 
                                </Col>    
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <p className="text-12">Mis reportes</p><br/>
                                    </div> 
                                </Col>    
                            </Row>   
                            <Row>
                                <Col>
                                <div className="d-flex justify-content-center">
                                        <p className="text-16-bold">{countMyReports}</p>
                                    </div> 
                                </Col>
                            </Row> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm="10" md="10" lg="4" className="mx-auto">
                    <Card className="mt-3" >
                        <Card.Body>
                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center">
                                        <a href="/createReport" className="no-link">
                                            <img src={addIcon} height="100" width="100" alt="Agregar reporte"></img>   
                                        </a>                                        
                                    </div> 
                                </Col>    
                            </Row>
                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center">
                                        <a href="/createReport" className="no-link">Agregar reporte</a>
                                    </div> 
                                </Col>    
                            </Row>                                                    
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm="10" md="10" lg="4" className="mx-auto">
                    <Card className="mt-3">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center">
                                        <a href="/search" className="no-link">
                                            <img src={searchIcon} height="100" width="100" alt="Buscar reportes"></img>       
                                        </a>                                        
                                    </div> 
                                </Col>    
                            </Row>
                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center">
                                        <a href="/search" className="no-link">Buscar reporte</a>
                                    </div> 
                                </Col>    
                            </Row>  
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm="10" md="10" lg="4" className="mx-auto">
                    <Card className="mt-3">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center">
                                        <a href="/stats" className="no-link">
                                            <img src={statsIcon} height="100" width="100" alt="Estadisticas"></img>   
                                        </a>                                        
                                    </div> 
                                </Col>    
                            </Row>
                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center">
                                        <a href="/stats" className="no-link">Estadísticas</a>
                                    </div> 
                                </Col>    
                            </Row>  
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            <Row>
                <Col sm="10" md="10" lg="12" className="mx-auto">
                    <Card className="mt-3">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h5>Últimos reportes</h5>
                                        {
                                            reports ?
                                            <>
                                                {renderTable()}
                                                <ReactTooltip place="top" effect="solid" />

                                                <ToastContainer position="bottom-center">
                                                    <Toast show={showToast} delay={5000} autohide onClose={() => setShowToast(false)}>
                                                        <Toast.Header closeButton={false}>
                                                            Compartido
                                                        </Toast.Header>
                                                        <Toast.Body>
                                                            Enlace copiado al portapapeles
                                                        </Toast.Body>
                                                    </Toast>
                                                </ToastContainer>
                                            </>
                                            :
                                            <>
                                                <span className="d-block mt-3">No hay reportes recientes</span>
                                            </>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Home;