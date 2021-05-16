$(function () {
    var rResize = $("#rResize")[0];
    var center = $(".ct-box")[0];
    var right = $(".rt-box")[0];

    rResize.onmousedown = function (e) {
        var startX = e.clientX;
        rResize.right = right.clientWidth;
        var total = right.clientWidth + center.clientWidth;
        document.onmousemove = function (e) {
            var endX = e.clientX;

            var moveLen = rResize.right + (startX - endX);
            right.style.width = moveLen + "px";
            center.style.width = total - moveLen + "px";
        }
        document.onmouseup = function (evt) {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }


    $('.fullScreen').click(function() {
        $('.haigui').css({
            'position':'fixed',
            'left':'0',
            'top':'0',
            'width':'100vw',
            'height':'100vh',
            'z-index':11,
            'background':'#fff'
        });
        $(this).hide().siblings().show();
    })

    $('.narrow').click(function() {
        $('.haigui').css({
            'position':'inherit',
            'left':'0',
            'top':'0',
            'width':'initial',
            'height':'50%',
            'z-index':11,
            'background':'transparent'
        });
        $(this).hide().siblings().show();
    })
})