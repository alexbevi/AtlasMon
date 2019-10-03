const CHARTSURIS = [
];

$(function() {
    var gridSize = 12 / CHARTSURIS.length;
    $.each(CHARTSURIS, function(index, uri) {
        $('#ctr_charts').append('<div class="col-sm-'+gridSize+'"><iframe style="border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);margin-top:20px;margin-bottom:20px;" width="100%" height="200" src="'+uri+'"></iframe></div>');
    });
});