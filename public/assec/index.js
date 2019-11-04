/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props){
   
        return (
            <button className="square" onClick={() => { props.onClick(); }}>
                {props.value}
            </button>
        );
    
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {squares:Array(9).fill(null), xIsNext:true};
    }
    
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => {this.props.onClick(i);}} />;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state={history:[{squares:Array(9).fill(null)}], xIsNext:true, stepNumber:0};
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber:history.length,
          xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
         
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={i=>this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
*/
var rows = [];
var counterId = 0;

var parseLate_Switch = value => {
    if(value){
        return "Tarde :(";
    }
    return "A tiempo :)";
}

function addRow(carnet,schedule,late,tbody){
    var newRow = document.createElement("tr");
    var date = new Date();

    rows.push({
        "id": counterId,
        "carnet":carnet,
        "schedule": schedule,
        "late":late
    });

    console.log(rows);

    newRow.innerHTML = `
            <td><b>${carnet}</b></td>
            <td>${schedule}</td>
            <td>${date.toLocaleString()}</td>
            <td>${late}</td>`

    var cellContainer = document.createElement("td");
    var deleteButton = document.createElement("button");

    
    deleteButton.classList.add("btn", "btn-danger");
    
    deleteButton.innerText = "Eliminar";
    deleteButton.value =counterId;

    //Nuevo
    var Confirmacion = document.createElement("input");
    var cellContainer2 = document.createElement("td");

    Confirmacion.classList.add("input");

    Confirmacion.innerText = "Carnet";

    deleteButton.addEventListener("click", event =>{
        var idElement = event.srcElement.value;
        var trToDelete = document.querySelector(`button[value='${idElement}']`).parentElement.parentElement;
        var elementoCarnet= Confirmacion.value;
        var elementoOriginal = querySelector(`button[value='${idElement}']`).parentElement.parentElement.childNodes[1].innerText;

        if(elementoCarnet==elementoOriginal){
            tbody.removeChild(trToDelete);
            rows.forEach((item,index)=>{
            if(item.id==idElement){
                rows.splice(index,1);
            }
        });     
        } else{
            alert("Carnet no coincide");
        }
    });

    cellContainer.appendChild(deleteButton);
    newRow.appendChild(cellContainer);

    cellContainer2.appendChild(Confirmacion);
    newRow.appendChild(cellContainer2);

    tbody.appendChild(newRow);

    counterId++;
};

window.onload = function(){
    
    var submit_btn = document.querySelector("#submit_btn");
    var carnet_field = document.querySelector("#carnet_field");
    var schedule_field = document.querySelector("#schedule_field");
    var late_switch = document.querySelector("#late_switch");
    var tbody = document.querySelector("#table_body");

    var carnetRegex = new RegExp(`[0-9]{8}`);

    submit_btn.addEventListener("click",()=>{
        var carnet = carnet_field.value;
        var schedule = schedule_field.options[schedule_field.selectedIndex].text;
        var late = parseLate_Switch(late_switch.checked);

        if(carnetRegex.test(carnet)){
            addRow(carnet,schedule,late,tbody);
        }
        else{
            alert("Formato no valido");
    }
        
    });
    
    carnet_field.addEventListener("keyup",(event)=>{
        //console.log(event.keyCode);
        var carnet = carnet_field.value;
        if(carnetRegex.test(carnet)){
            console.log("Pase la materia");
            submit_btn.disabled = false;
        }
        else{
            console.log("Deje la materia");
            submit_btn.disabled = true;
    }
    });

}

