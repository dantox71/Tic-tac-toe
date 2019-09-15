const PLAYER1 = 'fa-circle-o'; 
const PLAYER2 = 'fa-times';
const status = document.querySelector('.status');
const restartBtn = document.querySelector('.reset');




let round = 1;
let toEnd = 9;
let end = false;

const board = [
    ['','',''], 
    ['','',''], 
    ['','','']
];


const combinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];







/*Use spread operator to grab all elements with class 'box',
  and store it in array 'boxes'
*/
const boxes = [...document.querySelectorAll('.box')];

//Loop through every box to add event listener(pick function will be invoked when box is clicked)
boxes.forEach(box => box.addEventListener('click',pick));

function pick(event){
    if(!end){

  
    //Grab dataset-row and dataset-column
    const {row, column} = event.target.dataset; //Row will be equal to row-data of the box, and column to column-data of the box. Event.target refer to the clicked element


    //If round is even turn = PLAYER2 else turn = PLAYER1
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1; //If yound is even, then is player's 2 turn. Else is player's 1 turn.

    //If clicked box isn't empty then stop functiion
    if(board[row][column] !== '') return; //If place where we clicked isn't empty, stop executing further part of this function

    event.target.classList.add(turn);
    round++;

    //console.log(check());

    board[row][column] = turn;


    check();
    


}
    
}

//Check if somebody already won
function check(){

    toEnd--;
    console.log(toEnd);
    //Flat board
    const result = board.reduce((total,row) => total.concat(row));
    let winner = ''; //Initial , winner is undefined.
    let draw = false;


    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };


    result.forEach((field,index) => moves[field] ? moves[field].push(index) : null);

    //Check who has won
    combinations.forEach(combination =>{
        //Player 1 Won
        if(combination.every(index => moves[PLAYER1].indexOf(index) > -1)){
            winner = 1; 
        }

        //Player 2 Won
        if(combination.every(index => moves[PLAYER2].indexOf(index) > -1)){
            winner = 2;
        }
    });

    if(toEnd == 0 && winner == ''){
        draw = true;
    }

    if(winner == 1){
        status.innerHTML = "Player 1 won!";
        end = true;
    }
    if(winner == 2){
        status.innerHTML = "Player 2 won!";
        end = true;
    }

    if(draw == true){
        status.innerHTML = "It's draw!";
        end = true;
    }



}

//Reset all values


restartBtn.addEventListener('click',function(){
  window.location.reload();
})