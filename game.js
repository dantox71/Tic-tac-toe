const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let round = 1;
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

//Invoke 'pick function' when box was clicked.
boxes.forEach(box => box.addEventListener('click',pick));

function pick(event){
    
    //Grab dataset-row and dataset-column
    const {row, column} = event.target.dataset;


    //If round is even turn = PLAYER2 else turn = PLAYER1
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;

    //If clicked box isn't empty then stop functiion
    if(board[row][column] !== '') return;

    event.target.classList.add(turn);
    round++;

    console.log(check());

    board[row][column] = turn;



    console.log(check());
    
}

//Check if somebody already won
function check(){


    //Flat board
    const result = board.reduce((total,row) => total.concat(row));
    let winner;
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };


    result.forEach((field,index) => moves[field] ? moves[field].push(index) : null);

    //Check who has won
    combinations.forEach(combination =>{
        //Player 2 Won
        if(combination.every(index => moves[PLAYER1].indexOf(index) > -1)){
            winner = 1;
        }

        //Player 2 Won
        if(combination.every(index => moves[PLAYER2].indexOf(index) > -1)){
            winner = 2;
        }
    });

    return winner;
    
    //console.log(result);


}