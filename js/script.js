
function animate (el) {
    console.log(el)
    var pathes = el.querySelectorAll('path')
    for (var i = 0; i < pathes.length; i++) {
        pathes[i].className.baseVal = 'path transparent-path drawing-path'
    }

    setTimeout(function () {
        for(var i = 0; i < pathes.length; i++) {
            pathes[i].className.baseVal = 'path'
        }
    }, 1500)
}

animate(document.getElementsByTagName('svg')[0])