import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { deleteReport, getMyReports } from "../services/ReportService";
import { confirmAlert } from "react-confirm-alert";
import { Breadcrumb, Col, Container, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import { List, Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useAuthState } from "../context/authContext";
import { getUser } from "../services/UserService";

const MyReports = () => {

    const [showToast, setShowToast] = useState(false);
    const [reports, setReports] = useState<any>([]);

    const history = useHistory();
    const user = useAuthState();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getDetailsUser();
        fetchReports();
    }, []); 

    const getDetailsUser = async () => {
        const res: any = await getUser(user.username);

        if (res.data.role === "Admin"){
            console.log("AdminMyRep")
            setIsAdmin(true);
        }
        console.log(isAdmin);
    }

    const fetchReports = async () => {
        const res: any = await getMyReports();

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
        return (<Table className="mt-4 polls-table" id="myReportsTable" striped bordered hover responsive>
            <thead>
                <tr>
                    <th hidden>ID</th>
                    <th className="bg-primary text-white">Fecha</th>
                    <th hidden>Responsable</th>                    
                    <th hidden>Pais</th>
                    <th hidden>Turno</th>
                    <th hidden>Nivel</th>
                    <th hidden>Categoría</th>
                    <th hidden>Complejidad</th>
                    <th className="bg-primary text-white">Tienda</th>
                    <th hidden>Descripción</th>
                    <th className="bg-primary text-white">Stream</th>
                    <th className="bg-primary text-white">Error</th>
                    <th className="bg-primary text-white">Summary</th>                    
                    <th hidden>Acciones</th>
                    <th hidden>Analisis</th>
                    <th className="bg-primary text-white"></th>
                </tr>                              
            </thead>
            <tbody>
                {
                    reports.map((report: any) => {
                        return (
                            <tr key={report.id}>
                                <td hidden>{report.id}</td>
                                <td>{report.fecha_soporte.substring(0,10)}</td>
                                <td hidden>{report.responsable}</td>
                                <td hidden>{report.pais}</td>
                                <td hidden>{report.turno}</td>
                                <td hidden>{report.nivel}</td>
                                <td hidden>{report.categoria}</td>
                                <td hidden>{report.complejidad}</td>
                                <td>{report.tienda}</td>
                                <td hidden>{report.descripcion}</td>
                                <td>{report.stream}</td>
                                <td>{report.err}</td>
                                <td>{report.summary}</td>
                                <td hidden>{report.acciones}</td>
                                <td hidden>{report.analisis}</td>
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
        <Container className="mt-3">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Mis reportes</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm="10" md="10" lg="12" className="mx-auto">
                    <h5>Mis reportes</h5>
                    {
                        reports.length > 0 ?
                        <>
                            <div className="d-flex justify-content-end"> 
                                <ReactHTMLTableToExcel
                                    id="exportarMyReports"
                                    className="mt-4 button-blue btn-lg"
                                    table="myReportsTable"
                                    filename="Mis_Reportes"
                                    sheet="Hoja1"
                                    buttonText="Exportar a Excel"
                                                />
                            </div>
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
                            <span className="d-block mt-5">No tienes reportes.</span>
                        </>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default MyReports;