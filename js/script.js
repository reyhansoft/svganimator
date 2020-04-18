
function animate (el) {
    var pathes = el.querySelectorAll('path')
    var defaultClasses = []
    for (var i = 0; i < pathes.length; i++) {
        defaultClasses.push(pathes[i].className.baseVal)
        pathes[i].className.baseVal = 'path transparent-path drawing-path'
    }

    setTimeout(function () {
        for(var i = 0; i < pathes.length; i++) {
            pathes[i].className.baseVal = defaultClasses[i] + 'path'
        }
    }, 1500)
}

animate(document.getElementsByTagName('svg')[0])