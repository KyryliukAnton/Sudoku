let choose_number = 0;
let element;
let play;
let play_start;

// Each array is a column (index 0 - column 1, index 1 - column 2, ... , index 8 - column 9).
let field = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1], [5, 6, 7, 8, 9, 1, 2, 3, 4], [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2], [6, 7, 8, 9, 1, 2, 3, 4, 5], [9, 1, 2, 3, 4, 5, 6, 7, 8]];

$('.cell_number').click(function () {
    let id = $(this).attr("id");
    if (play_start[id[5]][id[7]] !== 0) {
        return;
    }
    if (element) {
        $(element).css('border', 'none');
    }
    element = this;
    $(element).css('border', '2px solid #ffffff');
});

$().ready(function () { 
    // Fill in the field with numbers.
    play_start = copyArray(field);
    swap_numbers();
    // Remove a certain number of numbers.
    remove_numbers(50);
    play = copyArray(play_start);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let id = '#cell_' + i + '_' + j;
            if (play_start[i][j] != 0) {
                $(id).text(play_start[i][j]);
            }
            else {
                $(id).addClass('input_number');
            }
        }
    }
});

function copyArray (arr) {
    let new_array=new Array;
    for (let i = 0; i < arr.length; i++) {
        new_array.push(arr[i].slice());
    }
    return new_array;
}

function chooseNumber(el) {
    if (element) {
        $(element).text($(el).text());
        play[element.id[5]][element.id[7]] = parseInt($(el).text());
        for (let i = 0; i < 9; i++) {
            if(play[i].includes(0)) {
                return;
            }
        }

        if(validation()) {
            console.log(true);
        }
        else {
            console.log(false);
        }
    }
}

function deleteNumber() {
    if (element) {
        $(element).text('');
        play[element.id[5]][element.id[7]]=0;
    }
}

// Choosing a method for swap numbers 
function swap_numbers() {
    let count = 10000;
    while (count !== 0) {
        let first = getRandomInt(0, 2);
        let second = getRandomInt(0, 2);
        let sector_1 = getRandomInt(0, 2) * 3;
        let sector_2 = getRandomInt(0, 2) * 3;
        let choose = getRandomInt(1, 4);
        if (choose <= 2 && first !== second) {
            count--;
            let index_1 = sector_1 + first;
            let index_2 = sector_1 + second;
            if (choose === 1) {
                swap_rows(index_1, index_2);
            } else {
                swap_columns(index_1, index_2);
            }
        } else if (sector_1 !== sector_2) {
            count--;
            if (choose === 3) {
                swap_three_columns(sector_1, sector_2);
            } else {
                swap_three_rows(sector_1, sector_2);
            }
        }
    }
}

// Method for swap columns
function swap_columns(index_1, index_2) {
    let temporary = play_start[index_1];
    play_start[index_1] = play_start[index_2];
    play_start[index_2] = temporary;
}

// Method for swap rows.
function swap_rows(index_1, index_2) {
    for (let index = 0; index < 9; index++) {
        let temporary = play_start[index][index_1];
        play_start[index][index_1] = play_start[index][index_2];
        play_start[index][index_2] = temporary;
    }
}

// Method for swap three rows.
function swap_three_rows(sector_1, sector_2) {
    for (let i = 0; i < 3; i++, sector_1++, sector_2++) {
        swap_rows(sector_1, sector_2);
    }
}

// Method for swap three columns.
function swap_three_columns(sector_1, sector_2) {
    for (let i = 0; i < 3; i++, sector_1++, sector_2++) {
        swap_columns(sector_1, sector_2);
    }
}

// Remove a certain number of numbers.
function remove_numbers(count=40) {
    let cells = new Array;
    for (let i=0; i<9; i++) {
       for (let j=0; j<9; j++) {
            cells.push(i.toString() + j.toString());
       }
    }
    
    while(count>0) {
        count--;
        let position=getRandomInt(0, cells.length-1);
        play_start[cells[position][0]][cells[position][1]]=0;
        cells.splice(position, 1);
    }
}

function validation() {
    let valid=[0,0,0,0,0,0,0,0,0];

    for(let i=0; i<9; i++) {
        let valid_row=valid.slice();
        let valid_column=valid.slice();
        for (let j=0; j<9; j++) {
            valid_column[play[i][j]-1]++;
            valid_row[play[j][i]-1]++;
        }

        if(valid_column.includes(0) || valid_row.includes(0)) {
            return false;
        }
    }

    for(let i=0; i<9; i+=3) {
        let valid_square=valid.slice();
        for (let j=0; j<9; j++) {
            for (let k=0; k<3; k++) {
                valid_square[play[i][j+k]-1]++;
            }
            if ((j+1)%3 === 0) {
                if (valid_square.includes(0)) {
                    return false;
                }
                else {
                    let valid_square=valid.slice();
                }
            }
        }
    }
    return true;
} 

// Get a random number from a range (including borders)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}