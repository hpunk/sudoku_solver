/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 
// SUDOKU SOLVER FUNCTIONS
isRowValid = (board, x, value) => {
    return !board[x].includes(value);
}

isColumnValid = (board, y, value) => {
    return !board.map(row => row[y]).includes(value);   
}

isQuadrantValid = (board, x, y, value) => {
    const startX = Math.floor(x/3)*3;
    const startY = Math.floor(y/3)*3;
    for(var i = 0 ; i<3 ; i++){
        for(var j = 0; j<3; j++){
            if(board[startX+i][startY+j] == value)
                return false;
        }
    }
    return true;
}

isAsignmentValid = (board, x, y, value) => {
    return isRowValid(board,x,value) && isColumnValid(board,y,value) && isQuadrantValid(board,x,y,value);
}

getNextCell = (x,y) => {
    var newX = x;
    var newY = y;
    if(y != 8)
        newY++;
    else{
        newY = 0;
        newX++;
    }
        return {x: newX, y: newY};
    
}

assignCell = (board, x, y) => {
    if(x == 9) return true; // se llenó el último
    
    if(board[x][y] == "."){
        for(var n = 1; n<10 ; n++){
            const newVal =`${n}`;
            if(isAsignmentValid(board,x,y, newVal)){
                board[x][y] = `${n}`;
                const next = getNextCell(x,y);
                if(assignCell(board,next.x,next.y)) return true;
            }
        }
        goBack(board,x,y);
    } else {
        if(x==8 && y == 8) return true;
        const next = getNextCell(x,y);
        if(assignCell(board,next.x,next.y)) return true;
    }    
    
    return false; // respuesta incorrecta    
}

goBack = (board, x, y) => {
    board[x][y] = ".";
}
 
// INPUT FUNCTIONS
//when I bind I do event,element and when it reaches the function it goes element,event
const NUMBERS = ["1","2","3","4","5","6","7","8","9"];

onChange = (element,event) => {
	if(element.value !== null && element.value){
		if(!NUMBERS.includes(element.value))
			element.value ="";	
	}
}
for(var row = 0; row<9; row++)
	for(var col=0; col<9; col++){
		const element = document.getElementById(`${row}${col}_cell`);
		element.addEventListener("change", onChange.bind(event,element));
	}

reset = () => {
	for(var row = 0; row<9; row++)
		for(var col=0; col<9; col++)
			document.getElementById(`${row}${col}_cell`).value = "";
}

solve = () => {
	const board = [];
	for(var row = 0; row<9; row++){
		const boardRow = [];
		for(var col=0; col<9; col++)
			boardRow.push(document.getElementById(`${row}${col}_cell`).value || ".");
		board.push(boardRow);
	}
	console.log("el board",board);
	if(!assignCell(board,0,0))
		console.log("el sudoku no se puede resolver:(");
	else
		for(var row = 0; row<9; row++)
			for(var col=0; col<9; col++)
				document.getElementById(`${row}${col}_cell`).value = board[row][col];
	
}

/*
var solveSudoku = function(board) {
    assignCell(board,0,0);
    console.log(board);
};

board = [
["9",".",".",".",".",".",".","3","5"],
[".",".",".",".","3",".","9","4","6"],
[".",".","3",".",".","9","7","2","."],
[".",".",".","4",".","5",".","6","9"],
[".",".",".","7","6","3","5","8","."],
["5","6",".","9",".",".","4","7","."],
[".",".",".",".","8",".",".","5","7"],
[".",".","2","1","5",".",".","9","."],
[".","4","5",".","9","6",".","1","."]];

solveSudoku(board);


Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
*/
