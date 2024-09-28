var zoom = 1;
var pageNo = 1;
$(document).ready(function() {

    var pageNo = 1;
    $("#flipbook").turn({
        width: 900,
        hight: 350,
        page: pageNo,
        autoCenter: true,
        duration: 800,
        zoom: 1.8,
        next: true
    });

    $(function() {
        $('.list-group-item').on('click', function() {
            $('.fa', this)
                .toggleClass('fa-chevron-right')
                .toggleClass('fa-chevron-down');
        });
    });

    $("#prev").click(function(e) {
        $('#flipbook').turn('previous');
        
    });

    $("#next").click(function(e) {
        $('#flipbook').turn('next');
        
    });

    $('#zoom-in').click(function(e){
        zoom = zoom+0.2
        $('#flipbook').turn('zoom',zoom);
    })
    $('#zoom-out').click(function(e){
        zoom = zoom-0.2
        $('#flipbook').turn('zoom',zoom);
    })
});
$(document).keydown(function(e){
    if(e.keycode==37){
        alert()
        $('#flipbook').turn('previous');
    }
    if(e.keycode==39){
        $('#flipbook').turn('next');
    }
})

