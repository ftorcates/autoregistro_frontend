import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import { List, Trash } from "react-bootstrap-icons";
import { confirmAlert } from "react-confirm-alert";
import ReactPaginate from "react-paginate";
import ReactTooltip from "react-tooltip";
import { deleteReport, getAllReports } from "../services/ReportService";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const User2 = () => {
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [reports, setReports] = useState<any>([]);

    const history = useHistory();

    useEffect(() => {
        fetchReports();
    }, [currentPage]); //se ejecuta fetchPoll cada vez que cambie el valor de currentPage

    const fetchReports = async () => {
        const res: any = await getAllReports(currentPage);

        setReports(res.data.reports);
        setTotalPages(res.data.totalPages);
        setTotalRecords(res.data.totalRecords);

        ReactTooltip.rebuild();
        
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    }

    const deleteRep = async (reportId: string) => {
        console.log(reportId);
        await deleteReport(reportId);
        //Para actualizar la pagina despues de eliminar
        currentPage === 0 ? fetchReports() : setCurrentPage(0);
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
        return (<Table className="mt-4 polls-table" striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Pais</th>
                    <th>Responsable</th>
                    <th>Stream</th>
                    <th>Error</th>
                    <th>Summary</th>
                    <th>Acciones</th>
                </tr>                              
            </thead>
            <tbody>
                {
                    reports.map((report: any) => {
                        return (
                            <tr key={report.id}>
                                <td>{report.fechaSoporte.substring(0,10)}</td>
                                <td>{report.paisSoporte}</td>
                                <td>{report.responsableSoporte}</td>
                                <td>{report.streamDescription}</td>
                                <td>{report.errorDescription}</td>
                                <td>{report.errorSummaryDescription}</td>
                                <td className="polls-table-controls">                                    
                                    <span data-tip="Ver detalle" 
                                        onClick={() => history.push(`/consultaReport/${report.id}`)}>
                                        <List></List>
                                    </span> 
                                    <span data-tip="Eliminar reporte"
                                            onClick={() => handleDeleteReport(report.id)}>
                                        <Trash></Trash>
                                    </span>
                                </td>
                            </tr>);
                    })
                }    
            </tbody>  
        </Table>);
    }
    
    return (
        <Container className="mt-5" >
            <Row>
                <Col sm="10" md="10" lg="12" className="mx-auto">
                    <h5>Últimos reportes</h5>
                    {
                        totalRecords > 0 && reports ?
                        <>
                            {renderTable()}
                            <ReactPaginate 
                                pageCount={totalPages}
                                forcePage={currentPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                previousLabel="Anterior"
                                nextLabel="Siguiente"
                                containerClassName="pagination justify-content-end"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                activeClassName="active"
                                breakLabel="..."
                                onPageChange={handlePageChange}>

                            </ReactPaginate>
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
                            <span className="d-block mt-5">No hay reportes recientes</span>
                        </>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default User2;