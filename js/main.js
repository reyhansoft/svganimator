
function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

var svgAnimator = (function (d) {
    var logo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92"><path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/><path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/><path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/><path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/></svg>',
        color = '#7289daff',
        style = 'svg { width: 100%; }\r\n.path { transition: fill 500ms ease-out; }\r\n.transparent-path { fill: rgba(0,0,0,0); stroke: #color#; stroke-width: #width#px; }\r\n.drawing-path { stroke-dasharray: #dasharray#; animation: dashdrawer #duration#s linear; }\r\n@keyframes dashdrawer {\r\n\tfrom { stroke-dashoffset: #dashoffsetFrom#; }\r\n\tto { stroke-dashoffset: #dashoffsetTo#; }\r\n}',
        script = 'function animate(el){\r\n\tvar pathes=el.querySelectorAll("path");\r\n\tfor(var i=0;i<pathes.length;i++){\r\n\t\tpathes[i].className.baseVal="path transparent-path drawing-path"\r\n\t}\r\n\tsetTimeout(function(){\r\n\t\tfor(var i=0;i<pathes.length;i++){\r\n\t\t\tpathes[i].className.baseVal="path"\r\n\t\t}\r\n\t},#delay#)\r\n}\r\nanimate(document.getElementsByTagName("svg")[0])'
        template = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title></title><style>#style#</style></head><body>#body#<script>#script#<\/script></body></html>',
        $color = d.getElementById('color'),
        $file = d.getElementById('file'),
        $colorPicker = d.getElementById('picker'),
        colorPicker = null,
        $btnPicker = d.getElementById('btn-picker'),
        iframe = document.getElementById('output'),
        $dasharray = d.getElementById('dasharray'),
        dasharray = 1000,
        $width = d.getElementById('width'),
        width = 2,
        $duration = d.getElementById('duration'),
        duration = 2,
        $dashoffsetFrom = d.getElementById('dashoffsetFrom'),
        dashoffsetFrom = 1000,
        $dashoffsetTo = d.getElementById('dashoffsetTo'),
        dashoffsetTo = 0,
        $delay = d.getElementById('delay'),
        delay = 2000,
        redrawTimer = -1,
        $html = d.getElementById('html'),
        $css = d.getElementById('css'),
        $javascript = d.getElementById('javascript');
    iframe.addEventListener('load', function () {
        iframe.style.height = iframeDoc.document.body.scrollHeight + 20 + 'px'
    })
    var iframeDoc = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument
    
    window.addEventListener('resize', function () {
        iframe.style.height = iframeDoc.document.body.scrollHeight + 20 + 'px'
    })
    Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/'
    
    $file.addEventListener('change', onFileChanged)
    initColor()
    initSliders()
    output({})

    

    function output (options) {
        color = options.color || color
        logo = options.logo || logo
        dasharray = options.dasharray || dasharray
        width = options.width || width
        duration = options.duration || duration
        dashoffsetFrom = options.dashoffsetFrom || dashoffsetFrom
        dashoffsetTo = options.dashoffsetTo || dashoffsetTo
        delay = options.delay || delay

        var renderedStyle = render (style, {
            '#color#': color,
            '#dasharray#': dasharray,
            '#width#': width,
            '#duration#': duration,
            '#dashoffsetFrom#': dashoffsetFrom,
            '#dashoffsetTo#': dashoffsetTo
        })

        var renderedScript = render (script, {
            '#delay#': delay - 500,
        })

        var renderedTemplate = render (template, {
            '#style#': renderedStyle,
            '#script#': renderedScript,
            '#body#': logo
        })

        $css.innerHTML = renderedStyle
        $javascript.innerHTML = replaceAll(renderedScript, '<', '&lt;')
        $html.innerHTML = replaceAll(logo, '<', '&lt;')

        if (redrawTimer !== -1) {
            clearTimeout(redrawTimer)
        }
        
        redrawTimer = setTimeout(function () {
            iframeDoc.document.open();
            iframeDoc.document.write(renderedTemplate);
            iframeDoc.document.close();
            Prism.highlightAll(false, function () {})
        }, 500);
    }

    function onFileChanged () {
        if (file.files[0]) {
            var reader = new FileReader();
                reader.readAsText(file.files[0], "UTF-8");
            reader.onload = function (evt) {
                output({ logo: evt.target.result })
            }
            reader.onerror = function (evt) { }
        }
    }

    function initColor () {
        colorPicker = new iro.ColorPicker('#picker', { 
            color: '#7289DA',
            layout: [
                {  component: iro.ui.Wheel, options: {} },
                { component: iro.ui.Slider, options: { sliderType: 'alpha' } },
            ]
        })
        colorPicker.on('color:change', function(color) {
            $color.value = color.hex8String
            output({ color: color.hex8String })
        })

        $color.value = color
        $color.addEventListener('input', function () {
            if (this.value !== 'color') {
                try {
                    colorPicker.setColors([this.value])
                    output({ color: this.value })
                } catch(ex) {

                }
            }
        })

        $colorPicker.style.display = 'none'
        $btnPicker.addEventListener('click', function () {
            $colorPicker.style.display = $colorPicker.style.display === 'block' 
                ? 'none'
                : 'block'
        })
    }

    function initSliders () {
        $dasharray.setAttribute('value', dasharray);
        $dasharray.addEventListener('input', function () {
            output({ dasharray: this.value })
        })

        $width.setAttribute('value', width);
        $width.addEventListener('input', function () {
            output({ width: this.value })
        })

        $duration.setAttribute('value', duration);
        $duration.addEventListener('input', function () {
            output({ duration: this.value })
        })

        $dashoffsetFrom.setAttribute('value', dashoffsetFrom);
        $dashoffsetFrom.addEventListener('input', function () {
            output({ dashoffsetFrom: this.value })
        })

        $dashoffsetTo.setAttribute('value', dashoffsetTo);
        $dashoffsetTo.addEventListener('input', function () {
            output({ dashoffsetTo: this.value })
        })

        $delay.setAttribute('value', delay);
        $delay.addEventListener('input', function () {
            output({ delay: this.value })
        })
    }

    function render (template, parts) {
        for (var i in parts) {
            template = replaceAll(template, i, parts[i])
        }
        return template
    }

})(document);