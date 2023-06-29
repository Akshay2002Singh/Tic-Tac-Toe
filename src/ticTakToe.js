import React, { useState } from 'react'

function Square({ value, onBtnClick }) {
    return (
        <button className='square-btn' onClick={onBtnClick}> {value}
        </button>
    );
}

function TicTakToe() {
    const [SquareValue, onChangeSquareValue] = useState(Array(9).fill("_"));
    const [History,onChangeHistory] = useState(Array(Array(9).fill("_")));
    const [Staus,onChangeStatus] = useState("Current move is of Player 1");

    function handleBtnClick(index) {
        const nextquareValue = SquareValue.slice();
        if(nextquareValue[index] !== "_" || winner(nextquareValue) === true){
            return;
        }
        if(History.length%2 === 1){
            nextquareValue[index] = 'X';
            onChangeStatus("Current move is of Player 2")
        }else{
            nextquareValue[index] = 'O';
            onChangeStatus("Current move is of Player 1")
        }
        onChangeSquareValue(nextquareValue);
        onChangeHistory([...History, nextquareValue]);
        
        if(winner(nextquareValue)){
            onChangeStatus(`Winner of Game is ${(History.length)%2 === 1?'Player 1':'Player 2'}`);
            return;
        }
    }

    function reset(){
        onChangeSquareValue(Array(9).fill("_"));
        onChangeHistory(Array(Array(9).fill("_")));
        onChangeStatus("Current move is of Player 1");
    }

    function timeTravel(index){
        onChangeSquareValue(History[index]);
        onChangeHistory(History.slice(0,index+1));
        console.log(History.length);
        if(index%2 === 0 ){
            onChangeStatus("Current move is of Player 1");
        }else{
            onChangeStatus("Current move is of Player 2");
        }
    }

    const moves = History.map( (squares,index)=>{
        let desc;
        if(index>0){
            desc = `Go to move #${index} done by ${index%2===1?'Player 1':'Player 2'}`;
        }else{
            desc = `Go to Begining of Game`;
        }

        return (
            <li key={index}>
                <button onClick={() => timeTravel(index)}>{desc}</button>
            </li>
        )
    })

    return (
        <>
        <div className='gameStatus'>{Staus}</div>
        <div id='board'>
            <div className='row'>
                <Square value={SquareValue[0]} onBtnClick={() => handleBtnClick(0)} />
                <Square value={SquareValue[1]} onBtnClick={() => handleBtnClick(1)} />
                <Square value={SquareValue[2]} onBtnClick={() => handleBtnClick(2)} />
            </div>
            <div me='row'>
                <Square value={SquareValue[3]} onBtnClick={() => handleBtnClick(3)} />
                <Square value={SquareValue[4]} onBtnClick={() => handleBtnClick(4)} />
                <Square value={SquareValue[5]} onBtnClick={() => handleBtnClick(5)} />
            </div>
            <div me='row'>
                <Square value={SquareValue[6]} onBtnClick={() => handleBtnClick(6)} />
                <Square value={SquareValue[7]} onBtnClick={() => handleBtnClick(7)} />
                <Square value={SquareValue[8]} onBtnClick={() => handleBtnClick(8)} />
            </div>
        </div>
        <button id='resetBtn' onClick={reset}>Restart</button>
        <ol id='historyBox'>
            {moves}
        </ol>
        </>
    );
}

function winner(arr){
    const sequence = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    var ans = false;
    sequence.forEach(element => {
        if(arr[element[0]]!=="_" && arr[element[0]]===arr[element[1]] && arr[element[0]]===arr[element[2]]){
            ans = true;
        }
    });
    return ans;
}



export default TicTakToe;
