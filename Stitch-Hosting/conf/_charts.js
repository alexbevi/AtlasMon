const CHARTSURIS = [

];

$(function() {
    $.each(CHARTSURIS, function(index, uri) {
        $('#ctr_main').append('<iframe style="border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);margin-top:20px;" width="100%" height="480" src="'+uri+'"></iframe>');
    });
});