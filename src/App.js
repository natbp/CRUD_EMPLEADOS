import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'

const data = [
  {id: 1, empleado: 'Natalia', empresa: 'teleconet'},
  {id: 2, empleado: 'Andrea', empresa: 'teleconet'},
  {id: 3, empleado: 'Manuel', empresa: 'teleconet'},
  {id: 4, empleado: 'Andres', empresa: 'teleconet'},
  {id: 5, empleado: 'Duber', empresa: 'teleconet'},
  {id: 6, empleado: 'Sebastian', empresa: 'teleconet'},
]



class App  extends React.Component{

  state={
    data:data,
    form:{
      id:'',
      empleado:'',
      empresa:''
    },
    modalInsertar:false,
    modalEditar: false,
  };


  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }
  
  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }
  
  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }


  insertar=()=>{
    var valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length+1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false})
  }

  editar=(dato)=>{
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=> {
      if (dato.id==registro.id){
        lista[contador].empleado=dato.empleado;
        lista[contador].empresa=dato.empresa;
      }
      contador++;
    })
    this.setState({data:lista, modalEditar:false});
  } 

  eliminar=(dato)=>{
    var opcion=  window.confirm ("Desea eliminar este empleado" + dato.id);
    if(opcion){
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro)=> {
        if(registro.id==dato.id){
          lista.splice(contador, 1) 
        }
        contador++;
      });
      this.setState({data:lista});
    }
  }


  render(){
    return(
      <>
      <Container>
        <br/>
        <Button color='success' onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo empleado</Button>
        <br/> <br/>

        <Table>
          <thead><tr>
            <th>Id</th>
            <th>Empleado</th>
            <th>Empresa</th>
            <th>Acciones</th>
          </tr></thead>
          <tbody>
            {this.state.data.map((elemento)=>(
            <tr>
                <td>{elemento.id}</td>
                <td>{elemento.empleado}</td>
                <td>{elemento.empresa}</td>
                <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{''}
                <Button color='danger' onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
            </tr>
            ))}


          </tbody>

        </Table>

      </Container>
      <Modal isOpen={this.state.modalInsertar}> 
              <ModalHeader>
                <div>
                  <h3>Ingresar nuevo empleado</h3>
                </div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label>Id:</label>
                  <input className='form-control' readOnly type='text' value={this.state.data.length+1} />
                </FormGroup>

                
                <FormGroup>
                  <label>Empleado:</label>
                  <input className='form-control' name='empleado' type='text' onChange={this.handleChange}/>
                </FormGroup>

                
                <FormGroup>
                  <label>Empresa:</label>
                  <input className='form-control' name='empresa'  type='text' onChange={this.handleChange}  />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' onClick={()=>this.insertar()}>Insertar Empleado</Button>
                <Button color='danger' onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
              </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEditar}> 
              <ModalHeader>
                <div>
                  <h3>Editar empleado</h3>
                </div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label>Id:</label>
                  <input className='form-control' readOnly type='text' value={this.state.form.id} />
                </FormGroup>

                
                <FormGroup>
                  <label>Empleado:</label>
                  <input className='form-control' name='empleado' type='text' onChange={this.handleChange} value={this.state.form.empleado}/>
                </FormGroup>

                
                <FormGroup>
                  <label>Empresa:</label>
                  <input className='form-control' name='empresa'  type='text' onChange={this.handleChange} value={this.state.form.empresa} />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' onClick={()=>this.editar(this.state.form)}>Editar</Button>
                <Button color='danger' onClick={()=>this.ocultarModalEditar() } >Cancelar</Button>
              </ModalFooter>
      </Modal>
      </>
      
      )
    }

  }


export default App;
