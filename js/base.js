let choose_number = 0;
let element;

// Each array is a column (index 0 - column 1, index 1 - column 2, ... , index 8 - column 9).
let field = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1], [5, 6, 7, 8, 9, 1, 2, 3, 4], [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2], [6, 7, 8, 9, 1, 2, 3, 4, 5], [9, 1, 2, 3, 4, 5, 6, 7, 8]];

let play;

// $('.wrapper-input-cell input').on('input', function() {
//     if(!$(this).val().match(/^[1-9]$/)){
//         $(this).val($(this).val().slice(0,-1));
//     }
// });  

function chooseNumber(el) {

    if (element) {
        $(element).text($(el).text());
    }

//     if ($(element).text()!=choose_number){
//     choose_number=$(element).text();
//   //  $(element).css('background','#CDDAC8')
//     }
//     else {
//         choose_number=0;
//     }
}

$('.cell_number').click(function () {
    let id = $(this).attr("id");
    if (play[id[5]][id[7]] !== 0) {
        return;
    }
    console.log(id);
    if (element) {
        $(element).css('border', 'none');
    }
    element = this;
    $(element).css('border', '2px solid #ffffff');

    // if(choose_number){
    //     $(this).text(choose_number);
    // }
});

$().ready(function () {
    //let cells = $("div.cell_number");

    swap_numbers();
    // Fill in the field with numbers.
    play = field;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (play[i][j] != 0) {
                let id = '#cell_' + i + '_' + j;
                $(id).text(play[i][j]);
            }
        }
    }
});

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
    let temporary = field[index_1];
    field[index_1] = field[index_2];
    field[index_2] = temporary;
}

// Method for swap rows.
function swap_rows(index_1, index_2) {
    for (let index = 0; index < 9; index++) {
        let temporary = field[index][index_1];
        field[index][index_1] = field[index][index_2];
        field[index][index_2] = temporary;
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

// Get a random number from a range (including borders)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}