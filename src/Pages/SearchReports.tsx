import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, Row, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import { List, Trash, Pencil, FileEarmarkExcel, Download } from "react-bootstrap-icons";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import swal from "sweetalert";
import { useAuthState } from "../context/authContext";
import { getErrorsByStreamId } from "../services/ErrorService";
import { deleteReport, getReportsByDate, getReportsByErrorAndDate, getReportsByImeiAndDate, getReportsByOrderAndDate, getReportsByResponsableAndDate, getReportsBySkuAndDate, getReportsByStreamAndDate, getReportsBySummaryAndDate, getReportsByTiendaAndDate} from "../services/ReportService";
import { getStreams } from "../services/StreamService";
import { getSummariesByErrorId } from "../services/SummaryService";
import { Error, Responsable, Stream, Summary } from "../types";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getAllUsers, getUser } from "../services/UserService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchReports = () => {

    const user = useAuthState();

    const userName = user.username;
    console.log(userName);

    const [streamId, setStreamId] = useState("");
    const [errorId, setErrorId] = useState("");
    const [summaryId, setSummaryId] = useState("");
    const [codigoTienda, setCodigoTienda] = useState("");
    const [orden, setOrden] = useState("");
    const [imei, setImei] = useState("");
    const [sku, setSku] = useState("");
    const [responsable, setResponsable] = useState("");
    const [criterio, setCriterio] = useState("");
    const [antiguedad, setAntiguedad] = useState("");

    const [busqueda, setBusqueda] = useState(false);

    const history = useHistory();
    
    const [errors, setErrors] = useState<any>({});
    const [reports, setReports] = useState<any>([]);

    const [showToast, setShowToast] = useState(false);
    const [sendingData, setSendingData] = useState(false);

    const [streams, setStreams] = useState<Stream[]>([]);
    const [errores, setErrores] = useState<Error[]>([]);
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [responsables, setResponsables] = useState<Responsable[]>([]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getDetailsUser();
        fetchStreams();
        fetchResponsables();
    }, []);

    useEffect(() => {
        fetchErrors(streamId);
    }, [streamId]);

    useEffect(() => {
        fetchSummaries(errorId);
    }, [errorId]);

    const getDetailsUser = async () => {
        const res: any = await getUser(user.username);

        if (res.data.role === "Admin"){
            console.log("AdminSearch")
            setIsAdmin(true);
        }
        console.log(isAdmin);
    }

    const fetchResponsables = async () => {
        const res: any = await getAllUsers();

        const respnsablesC = res.data;

        for (let i = 0; i < respnsablesC.length; i++) {
            const responsable = respnsablesC[i];
            setResponsables(currentResponsables => currentResponsables.concat(responsable));
          }
        
    }   

    const fetchStreams = async () => {
        const res: any = await getStreams();

        const streamsC = res.data;

        for (let i = 0; i < streamsC.length; i++) {
            const stream = streamsC[i];
            setStreams(currentStreams => currentStreams.concat(stream));
          }
        
    }   

    const fetchErrors = async (streamId: string) => {

        if (streamId !== null){
            setErrores(currentErrores => []);
            setSummaries(currentSummaries => []);
    
            const res: any = await getErrorsByStreamId(streamId);
    
            const errorsC = res.data;
    
            for (let i = 0; i < errorsC.length; i++) {
                const error = errorsC[i];
                setErrores(currentErrores => currentErrores.concat(error));
            }
            
        }

        
    }

    const fetchSummaries = async (errorId: string) => {

        if (errorId !== null){
            setSummaries(currentSummaries => []);
    
            const res: any = await getSummariesByErrorId(errorId);
    
            const summariesC = res.data;
    
            for (let i = 0; i < summariesC.length; i++) {
                const summary = summariesC[i];
                setSummaries(currentSummaries => currentSummaries.concat(summary));
              }
        }        

    }

    const search = async (criterio: string, fecha: string) => {

        console.log(criterio);
        console.log(fecha);

        console.log(new Intl.DateTimeFormat(['ban', 'de'], {year: 'numeric', month: '2-digit',day: '2-digit'}).format(startDate));
        console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(endDate));

        if (criterio !== ""){

            let rep: any;
            setBusqueda(true);

            if (criterio === "todo"){
                const res: any = await getReportsByDate(antiguedad);
                rep = res.data;
            }

            if (criterio === "responsable"){
                const res: any = await getReportsByResponsableAndDate(responsable, antiguedad);
                rep = res.data;
            }

            if (criterio === "stream"){
                const res: any = await getReportsByStreamAndDate(streamId, fecha);
                rep = res.data;
            }

            if (criterio === "error"){
                const res: any = await getReportsByErrorAndDate(streamId, errorId, fecha);
                rep = res.data;
            }

            if (criterio === "summary"){
                const res: any = await getReportsBySummaryAndDate(streamId, errorId, summaryId, fecha);
                rep = res.data;
            }

            if (criterio === "tienda"){
                const res: any = await getReportsByTiendaAndDate(codigoTienda, fecha);
                rep = res.data;
            }

            if (criterio === "orden"){
                const res: any = await getReportsByOrderAndDate(orden, fecha);
                rep = res.data;
            }

            if (criterio === "imei"){
                const res: any = await getReportsByImeiAndDate(imei, fecha);
                rep = res.data;
            }

            if (criterio === "sku"){
                const res: any = await getReportsBySkuAndDate(sku, fecha);
                rep = res.data;
            }

            console.log(rep);
            setReports(rep);
        }        

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
        return (<Table className="mt-4 polls-table" id="searchTable" striped bordered hover responsive>
            <thead>
                <tr>
                <th hidden>ID</th>
                    <th className="bg-primary text-white">Fecha</th>
                    <th hidden>Responsable</th>                    
                    <th hidden>Pais</th>
                    <th hidden>Turno</th>
                    <th hidden>Dia Habil</th>
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
                                <td hidden>{report.diaHabil}</td>
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
                                    <span data-tip="Editar" 
                                        onClick={() => history.push(`/editReport/${report.id}`)}>
                                        <Pencil></Pencil>
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

    const onChangeDates = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };

    return (
        <Container className="mt-3">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Buscar</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm="10" md="10" lg="12" className="mx-auto">
                    <Card>
                        <Card.Body>
                            <h3>Buscar reportes</h3><hr />
                            <Form>                                
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3 mb-3" controlId="responsable">
                                            <Form.Label>
                                                Criterio de búsqueda
                                            </Form.Label>
                                            <div key="id_search" className="mb-2"> 
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="todo"
                                                    type="radio"
                                                    name="criterio"
                                                    id="todo"
                                                    label="Todo"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="responsable"
                                                    type="radio"
                                                    name="criterio"
                                                    id="responsable"
                                                    label="Responsable"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="stream"
                                                    type="radio"
                                                    name="criterio"
                                                    id="stream"
                                                    label="Stream"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="error"
                                                    type="radio"
                                                    name="criterio"
                                                    id="error"
                                                    label="Error"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="summary"
                                                    type="radio"
                                                    name="criterio"
                                                    id="summary"
                                                    label="Summary"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="tienda"
                                                    type="radio"
                                                    name="criterio"
                                                    id="tienda"
                                                    label="Tienda"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="orden"
                                                    type="radio"
                                                    name="criterio"
                                                    id="orden"
                                                    label="Orden"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="imei"
                                                    type="radio"
                                                    name="criterio"
                                                    id="imei"
                                                    label="IMEI"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="sku"
                                                    type="radio"
                                                    name="criterio"
                                                    id="sku"
                                                    label="SKU"/>
                                            </div>
                                        </Form.Group>
                                    </Col>     
                                </Row>
                                <Row>        
                                    <Col>
                                        <Form.Group className="mt-3 mb-3" controlId="antiguedad">
                                            <Form.Label>
                                                Antigüedad
                                            </Form.Label>
                                            <div key="id_antiguedad" className="mb-2"> 
                                                <Form.Check
                                                    inline
                                                    onChange={e => setAntiguedad(e.target.value)}
                                                    value="7"
                                                    type="radio"
                                                    name="antiguedad"
                                                    id="7"
                                                    label="Últimos 7 días"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setAntiguedad(e.target.value)}
                                                    value="15"
                                                    type="radio"
                                                    name="antiguedad"
                                                    id="15"
                                                    label="Últimos 15 días"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setAntiguedad(e.target.value)}
                                                    value="30"
                                                    type="radio"
                                                    name="antiguedad"
                                                    id="30"
                                                    label="Últimos 30 días"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setAntiguedad(e.target.value)}
                                                    value="60"
                                                    type="radio"
                                                    name="antiguedad"
                                                    id="60"
                                                    label="Últimos 60 días"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setAntiguedad(e.target.value)}
                                                    value="90"
                                                    type="radio"
                                                    name="antiguedad"
                                                    id="90"
                                                    label="Últimos 90 días"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setAntiguedad(e.target.value)}
                                                    value="120"
                                                    type="radio"
                                                    name="antiguedad"
                                                    id="120"
                                                    label="Más de 90 días"/>                                                
                                            </div>
                                        </Form.Group>
                                    </Col>                                                       
                                </Row>                                
                                <span>
                                    {criterio === "responsable" ?
                                    <>        
                                    <Row>     
                                        <Col lg="4">
                                            <Form.Group className="md-5" controlId="responsable">
                                                <Form.Label>
                                                    Responsable
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-select"
                                                    value={responsable}
                                                    onChange={e => setResponsable(e.target.value)}
                                                    isInvalid={!!errors?.responsable}
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    {
                                                        responsables.map((option: Responsable) => (
                                                            <option key={"R"+option.username} value={option.username}> {option.name}</option>
                                                        )) 
                                                    }
                                                    
                                                </Form.Control> 
                                            </Form.Group>
                                        </Col>   
                                    </Row>
                                    </>
                                    : criterio === "stream" ?
                                    <>        
                                    <Row>     
                                        <Col lg="4">
                                            <Form.Group className="md-5" controlId="streamId">
                                                <Form.Label>
                                                    Stream
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-select"
                                                    value={streamId}
                                                    onChange={e => setStreamId(e.target.value)}
                                                    isInvalid={!!errors?.streamId}
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    {
                                                        streams.map((option: Stream) => (
                                                            <option key={"S"+option.idStream} value={option.idStream}> {option.descriptionStream}</option>
                                                        )) 
                                                    }
                                                    
                                                </Form.Control> 
                                            </Form.Group>
                                        </Col>   
                                    </Row>
                                    </>
                                    : criterio === "error" ?
                                    <>        
                                    <Row>     
                                        <Col lg="4"> 
                                            <Form.Group className="md-5" controlId="streamId">
                                                <Form.Label>
                                                    Stream
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-select"
                                                    value={streamId}
                                                    onChange={e => setStreamId(e.target.value)}
                                                    isInvalid={!!errors?.streamId}
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    {
                                                        streams.map((option: Stream) => (
                                                            <option key={"S"+option.idStream} value={option.idStream}> {option.descriptionStream}</option>
                                                        )) 
                                                    }
                                                    
                                                </Form.Control> 
                                            </Form.Group>
                                        </Col>   
                                        <Col lg="4"> 
                                            <Form.Group className="md-5" controlId="errorId">
                                                <Form.Label>
                                                    Error
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-select"
                                                    value={errorId}
                                                    onChange={e => setErrorId(e.target.value)}
                                                    isInvalid={!!errors?.errorId}
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    {
                                                        errores.map((option: Error) => (
                                                            <option key={"E"+option.idError} value={option.idError}> {option.descriptionError}</option>
                                                        )) 
                                                    }
                                                    
                                                </Form.Control> 
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    </>
                                    : criterio === "summary" ?
                                    <>        
                                    <Row>     
                                        <Col>
                                            <Form.Group className="md-5" controlId="streamId">
                                                <Form.Label>
                                                    Stream
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-select"
                                                    value={streamId}
                                                    onChange={e => setStreamId(e.target.value)}
                                                    isInvalid={!!errors?.streamId}
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    {
                                                        streams.map((option: Stream) => (
                                                            <option key={"S"+option.idStream} value={option.idStream}> {option.descriptionStream}</option>
                                                        )) 
                                                    }
                                                    
                                                </Form.Control> 
                                            </Form.Group>
                                        </Col>   
                                        <Col>
                                            <Form.Group className="md-5" controlId="errorId">
                                                <Form.Label>
                                                    Error
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-select"
                                                    value={errorId}
                                                    onChange={e => setErrorId(e.target.value)}
                                                    isInvalid={!!errors?.errorId}
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    {
                                                        errores.map((option: Error) => (
                                                            <option key={"E"+option.idError} value={option.idError}> {option.descriptionError}</option>
                                                        )) 
                                                    }
                                                    
                                                </Form.Control> 
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                        <Form.Group className="md-5" controlId="summaryId">
                                            <Form.Label>
                                                Error Summary
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={summaryId}
                                                onChange={e => setSummaryId(e.target.value)}
                                                isInvalid={!!errors?.summaryId}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                {
                                                    summaries.map((option: Summary) => (
                                                        <option key={"SE"+option.idErrorSummary} value={option.idErrorSummary}> {option.descriptionSummary}</option>
                                                    )) 
                                                }
                                                
                                            </Form.Control> 
                                        </Form.Group>
                                    </Col>
                                    </Row>
                                    </>
                                    : criterio === "tienda" ?
                                    <>        
                                    <Row>     
                                        <Col lg="4"> 
                                            <Form.Group controlId="codigoTienda">
                                                <Form.Label>
                                                    Código de Tienda
                                                </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    size="lg"
                                                    value={codigoTienda}
                                                    onChange={e => setCodigoTienda(e.target.value)}
                                                    isInvalid={!!errors?.codigoTienda}/>
                                            </Form.Group>
                                        </Col>   
                                    </Row>
                                    </>                                    
                                    : criterio === "orden" ?
                                    <>        
                                    <Row>     
                                        <Col lg="4">
                                            <Form.Group controlId="orden">
                                                <Form.Label>
                                                    Orden
                                                </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    size="lg"
                                                    value={orden}
                                                    onChange={e => setOrden(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>   
                                    </Row>
                                    </>
                                    : criterio === "imei" ?
                                    <>        
                                    <Row>     
                                        <Col lg="4">
                                            <Form.Group controlId="imei">
                                                <Form.Label>
                                                    IMEI
                                                </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    size="lg"
                                                    value={imei}
                                                    onChange={e => setImei(e.target.value)}                                                
                                                />
                                            </Form.Group>
                                        </Col>   
                                    </Row>
                                    </>
                                    : criterio === "sku" ?
                                    <>        
                                    <Row>     
                                        <Col lg="4">
                                            <Form.Group controlId="sku">
                                                <Form.Label>
                                                    SKU
                                                </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    size="lg"
                                                    value={sku}
                                                    onChange={e => setSku(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>   
                                    </Row>
                                    </>
                                    :
                                    <>
                                    </>
                                    
                                    }
                                </span>
                                <span>
                                    {
                                        criterio !== "" &&
                                        <>
                                            <Button
                                                size="lg"
                                                variant="outline-light" 
                                                className="mt-4 button-blue"
                                                onClick={() => search(criterio, antiguedad)}>
                                                    {sendingData ? <>
                                                                <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"></Spinner>
                                                                &nbsp;
                                                                <span>Buscando...</span>
                                                </>: <>Buscar</> }
                                            </Button>
                                        </>
                                    }
                                </span>                                
                            </Form>
                        </Card.Body>
                    </Card>    
                </Col>
            </Row>
            <Row>
                <Col>
                {
                        reports.length > 0 ? 
                        <>
                            <div className="d-flex justify-content-end"> 
                                <ReactHTMLTableToExcel
                                    id="exportarMyReports"
                                    className="mt-4 button-blue btn-lg bi bi-download"
                                    table="searchTable"
                                    filename={"Reportes_"+criterio+"_"+antiguedad+"dias"}
                                    sheet="Hoja1"
                                    buttonText="Exportar a Excel"/>
                            </div>
                            <button>
                                ANB
                            </button>
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
                        : reports.length === 0 && busqueda  ?
                        <>
                            <span className="d-block mt-5">No se encontraron reportes bajo ese criterio de búsqueda</span>
                        </>
                        : <></>
                    }
                </Col>
            </Row>
            
            
        </Container>
    )
}

export default SearchReports;