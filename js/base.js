$(".wrapper-input-cell input").on('input', function() {
    if(!$(this).val().match(/^[1-9]$/)){
        $(this).val($(this).val().slice(0,-1));
    }
});  