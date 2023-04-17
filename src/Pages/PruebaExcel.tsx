import { Container, Table } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const PruebaExcel = () =>  {



  return (<Container>
    <ReactHTMLTableToExcel
      id="botonExportar"
      className="btn btn-primary"
      table="tablaPrueba"
      filename="LibroTest"
      sheet="HojaTest"
      buttonText="Exportar"
                />

                  

    <Table className="table" id="tablaPrueba">
      <thead className='table-dark'>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Direccion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <th>Freddy</th>
          <th>Torcates</th>
          <th>AAAA</th>
        </tr>
        <tr>
          <th>2</th>
          <th>Diana</th>
          <th>Torcates</th>
          <th>BBBB</th>
        </tr>
        <tr>
          <th>3</th>
          <th>Soraya</th>
          <th>Hernandez</th>
          <th>CCCC</th>
        </tr>
      </tbody>

    </Table>

    

  </Container>
    
    
    
    )
    
}

export default PruebaExcel;