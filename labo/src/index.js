import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var counterId = 0;

class Dato {
    constructor(id, carnet, schedule, late) {
        this._id = id;
        this._carnet = carnet;
        this._schedule = schedule;
        this._late = late;
    }

    get id() { return this._id }
    get carnet() { return this._carnet }
    get schedule() { return this._schedule }
    get late() { return this._late}

    // Hacen falta las validaciones antes de la asignación
    set id(counterId) { this._id = counterId }
    set carnet(carnet) { this._carnet = carnet }
    set schedule(schedule) { this._schedule = schedule }
    set late(late) { this._late = late }
}

class List extends React.Component {

    renderHeader() {
        return Object.keys(new Dato()).map((key, index) => {
            return (
                <th key={index}>
                    {key.substring(1)}
                </th>
            );
        });
    }

    renderBody(datos) {
        return datos.map(({id, carnet, schedule, late }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{carnet}</td>
                    <td>{schedule}</td>
                    <td>{late}</td>
                    <td>
                        <button  onClick={() => {this.props.onDelete(carnet)}}>Delete</button>
                    </td>
                </tr>
            );
        });
      
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {this.renderHeader()}
                            <th> actions</th>
                        </tr>
                    </thead>
                    <tbody>
                         {this.renderBody(this.props.datos)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {id:counterId, carnet: '', schedule: '', late: ''};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        counterId++;
    }

    // Manejador del evento de submit, ejecuta la funcion saveStudent
    // Pasada por props
    handleSubmit(event) {
        event.preventDefault();
        // Se necesitan validaciones de entrada
        let dato = new Dato(this.state.id,this.state.carnet, this.state.schedule, this.state.late);
        this.props.onSave(dato);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const carnet = target.carnet;

        this.setState({
            [carnet]: value
        });
    }

    // Label + input
    // TODO: Necesita se modificado para funcionar con todos los tipos de entrada
    renderInput(name,placeholder, type = "text") {
        return (
            /* Se un fragmento React, para establecer que este código se hijo directo en el resultado */
            <fieldset>
                <label htmlFor={name}>{name}</label>
                <input
                    type={type}
                    name={name} id={name}
                    value={this.state[name]}
                    placeholder= {placeholder}
                    onChange={this.handleInputChange} />
            </fieldset>
        );
    }

    renderSwitch(param) {
        switch(param) {
          case 'Tarde':
            return 'Tarde';
          default:
            return 'Temprano';
        }
      }

    render() {
        return (
            <form id="contact" action="" onSubmit={this.handleSubmit}>
                <h3>Student Form</h3>
                {this.renderInput("carnet","00031111")}
                <label for="schedule">Seleccione el horario:</label>
                    <select name="schedule" class="form-control" id="schedule_field">
                        <option>Lunes de 9:00 a 11.00</option>
                        <option>Martes de 13:30 a 15:30</option>
                        <option>Miércoles de 9:00 a 11.00</option>
                        <option>Jueves de 13:30 a 15:30</option>
                        <option>Viernes de 9:00 a 11.00</option>
                        <option>Viernes de 15:30 a 17:30</option>
                    </select>
                    <div class="custom-control custom-switch">
                        <input
                        type="checkbox"
                        class="custom-control-input"
                        id="late_switch"
                        />
                        <label class="custom-control-label" for="late_switch"
                        >Llegó tarde?</label>
                    </div>
                <fieldset>
                    <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                </fieldset>
            </form>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datos: [],
            err: ''
        }
    }

    saveStudent(dato) {
        const datos = this.state.datos.slice();
        if (!datos.find((current) => {
            return current.carnet === dato.carnet;
        })) {
            datos.push(dato);
            counterId++;
            this.setState({ datos, err: '' });
        } else {
            this.setState({ err: "El estudiante ya existe" })
        }

    }

    deleteStudent(id) {
        const datos = this.state.datos.filter(function (ele) {
            return ele.id !== id;
        });
        this.setState({ datos });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div>{this.state.err}</div>
                    <Form onSave={(dato) => {
                        this.saveStudent(dato)
                    }} />
                </div>
                <List datos={this.state.datos} onDelete={(id) => {
                    this.deleteStudent(id);
                }} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

