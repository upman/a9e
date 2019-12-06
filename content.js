var elements = document.querySelectorAll('body *');

function replaceText(text) {
    var spanElement = document.createElement('span');
    spanElement.innerHTML = text.replace(/(^|\s)([A-Za-z])([A-Za-z]{8,})([A-Za-z])(\s|\.|\,|\;|\?|\!|\'|\"|\)|$)/g, function(match, p1, p2, p3, p4, p5, offset, string) {
        var r = p1 + '<span class="tooltip">' + p2 + p3.length + p4 + '<span class="tooltiptext">' + p2 + p3 + p4 + '</span></span>' + p5;
        return r;
    });
    return spanElement;
}
var styleElement = document.createElement('style', { type: 'text/css'});
styleElement.appendChild(document.createTextNode(`
    /* Tooltip container */
    .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
    }

    /* Tooltip text */
    .tooltip .tooltiptext {
    visibility: hidden;
    width: fit-content;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    padding: 3px;
    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
    }

    /* Tooltip arrow */
    .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    }
`));

document.head.appendChild(styleElement);

elements.forEach(function(el) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'CDATA'].includes(el.tagName)) {
        return;
    }

    el.childNodes.forEach(function(node) {
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            el.replaceChild(replaceText(text), node);
        }
    });
});
