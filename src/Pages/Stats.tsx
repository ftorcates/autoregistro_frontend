import { useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import { getStatsByCategoria, getStatsByDiaHabil, getStatsByError, getStatsByResponsable, getStatsByStream, getStatsBySummary, getStatsByTienda, getStatsByTurno } from "../services/StatsService";
import { ChartType, Stat} from "../types";
import palette from 'google-palette';
import { Bar, Pie } from "react-chartjs-2";

const Stats = () => {


    const [criterio, setCriterio] = useState("");
    const [antiguedad, setAntiguedad] = useState("");

    const [stats, setStats] = useState<Stat[]>([]);
    const [chartData, setChartData] = useState<any>({});
    const [chartType, setChartType] = useState<ChartType>("PIE");
    const [title, setTitle] = useState("");
    const [busqueda, setBusqueda] = useState(false);

    const fetchStats = async (criterio: string, antiguedad: string) => {
        
        console.log(criterio);
        console.log(antiguedad);
        setBusqueda(true);

        if (criterio !== ""){
           // try {
                let res: any;
                if (criterio === "stream"){                
                    setTitle("Reportes por Stream")
                    res = await getStatsByStream(antiguedad);                    
                }
                if (criterio === "error"){                
                    setTitle("Reportes por Error")
                    res = await getStatsByError(antiguedad);                   
                }
                if (criterio === "summary"){                
                    setTitle("Reportes por Summary")
                    res = await getStatsBySummary(antiguedad);
                }
                if (criterio === "tienda"){                
                    setTitle("Reportes por Tienda")
                    res = await getStatsByTienda(antiguedad);
                }
                if (criterio === "categoria"){                
                    setTitle("Reportes por Categoría")
                    res = await getStatsByCategoria(antiguedad);
                }
                if (criterio === "responsable"){                
                    setTitle("Reportes por Responsable")
                    res = await getStatsByResponsable(antiguedad);
                }
                if (criterio === "turno"){                
                    setTitle("Reportes por Turno")
                    res = await getStatsByTurno(antiguedad);
                }
                if (criterio === "diaHabil"){
                    setTitle("Reportes por Día Hábil");
                    res = await getStatsByDiaHabil(antiguedad);
                }

                console.log(res.data);
                    
                setStats(res.data);                    
                formatData();
           /* } catch(errors: any) {
                console.log(errors);
            }*/

            
        }
        
        
    }   

    const formatData = () => {
        
            let chartData: any = {
                data: {
                    labels: [],
                    datasets: [{
                        data: []
                    }]
                }
            }

            console.log(stats);

            stats.forEach(stat => {
                console.log(stat);
                chartData.data.labels?.push(stat.dato);
                chartData.data.datasets[0].data.push(stat.contador);
            })
            console.log(stats.length);
            chartData.data.datasets[0].backgroundColor = palette('tol-dv', stats.length).map((color: any) => '#'+color);
            console.log(chartData);
      
        setChartData(chartData);
    }

    return (
        <Container className="mt-3">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Estadísticas</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm="10" md="10" lg="12" className="mx-auto">
                    <Card>
                        <Card.Body>
                            <h3>Estadísticas</h3><hr />
                            <Form>                                
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3 mb-3" controlId="criterios">
                                            <Form.Label>
                                                Criterio de búsqueda
                                            </Form.Label>
                                            <div key="div_criterios" className="mb-2"> 
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
                                                    value="categoria"
                                                    type="radio"
                                                    name="criterio"
                                                    id="categoria"
                                                    label="Categoría"/>
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
                                                    value="turno"
                                                    type="radio"
                                                    name="criterio"
                                                    id="turno"
                                                    label="Turno"/>
                                                <Form.Check
                                                    inline
                                                    onChange={e => setCriterio(e.target.value)}
                                                    value="diaHabil"
                                                    type="radio"
                                                    name="criterio"
                                                    id="diaHabil"
                                                    label="Hábil / No hábil"/>
                                            </div>
                                        </Form.Group>
                                    </Col>     
                                </Row>
                                <Row>        
                                    <Col>
                                        <Form.Group className="mb-3" controlId="antiguedad">
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
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3" controlId="chart_type">
                                            <Form.Label>
                                                Tipo de Gráfico
                                            </Form.Label>
                                            <div className="mb-3"> 
                                                <Form.Check 
                                                    inline
                                                    label="Grafico de tortas"
                                                    name="chart"
                                                    type="radio"
                                                    id="chart-pie"
                                                    checked={chartType==="PIE"}
                                                    onChange={() => setChartType("PIE")}
                                                />
                                                <Form.Check 
                                                    inline
                                                    label="Grafico de barras"
                                                    name="chart"
                                                    type="radio"
                                                    id="chart-bar"
                                                    checked={chartType==="BAR"}
                                                    onChange={() => setChartType("BAR")}
                                                />
                                            </div>
                                        </FormGroup>
                                        
                                    </Col>
                                </Row>
                                
                                <span>
                                    <Button
                                        size="lg"
                                        variant="outline-light" 
                                        className="mt-4 button-blue"
                                        onClick={() => fetchStats(criterio, antiguedad)}>
                                            Generar estadística
                                    </Button>                                
                                </span> 
                                <Row>
                                    <Col className="mt-4">
                                        {                                            
                                            busqueda &&
                                            <>
                                                <div className="mb-5">
                                                    <h6>{title}</h6>                                                      
                                                    {                    
                                                        chartType === "PIE" ? 
                                                            <div className="chart-pie-container">
                                                                <Pie data={chartData.data}></Pie>
                                                            </div>
                                                        : 
                                                            <div className="chart-bar-container">
                                                                <Bar data={chartData.data}></Bar>
                                                            </div>
                                                    }
                                                </div>
                                            </>
                                        }
                                    </Col>
                                </Row>                                                            
                            </Form>
                        </Card.Body>
                    </Card>    
                </Col>
            </Row>
            
        </Container>
    )
}

export default Stats;