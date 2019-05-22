---
---

    $(window).on('load', function () {
        $('.grid').masonry({
            itemSelector: '.grid-item',
        });
    });

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// nav sticky
$(document).ready(function () {
    // $("#c-nav").sticky({ topSpacing: 0, zIndex: 1000 });

});

$('#c-nav').on('click', 'a', function (e) {
    var id = $(e.target).attr('href');
    $('.wrapped-section').removeClass('active');
    $(id).addClass('active');
});

window.onhashchange = function () {
    $(document.body).attr('data-hash', location.hash);
}

$('.wrapped-section').removeClass('active');

var hash = location.hash;
var $activeSection = $(hash);
if ($activeSection.length === 0) {
    hash = '#home';
    $activeSection = $(hash);
}

$activeSection.addClass('active');
$(document.body).attr('data-hash', hash);

var $workGrid = $('.work-grid');

var $imgs = $($('#grid-variable-content').html()).find('img');

$imgs.each(function (i) {
    var e_0 = document.createElement("div");
    e_0.setAttribute("class", "grid-item col col-xs-6 col-sm-4");
    var e_1 = document.createElement("div");
    e_1.setAttribute("class", "outer");
    var altText = document.createElement('div');
    altText.setAttribute('class', 'alt-text');
    altText.textContent = $(this).attr('alt') || 'No description...';
    e_1.appendChild(altText);
    var e_2 = document.createElement("div");
    e_2.setAttribute("class", "inner lightbox-image");
    var url = $(this).attr('src');
    e_2.setAttribute('style', 'background-image: url("' + url + '")');
    e_1.appendChild(e_2);
    e_1.appendChild(altText);
    e_0.appendChild(e_1);
    $workGrid.get(0).appendChild(e_0);
});

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// my lightbox

var $modal = $('#image-modal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var $img = $('.lightbox-image, .lightbox-container img');
var $modalImg = $modal.find('#image-modal-image');
var $captionText = $modal.find('#image-modal-caption');
$img.on('click', function () {
    $modal.css('display', "block");
    $(document.documentElement).addClass('modal-expanded');
    var src = $(this).attr('src')
        || $(this).css('background-image')
            .replace('url(', '')
            .replace(')', '')
            .replace(/\"/gi, "");
    $modalImg.attr('src', src);
    $captionText.empty();
    $captionText.text(this.title);
    var slug = slugify(src.replace(window.location.origin, ''));
    $('<div><a data-smoothscroll="true" href="about/#' + slug + '">Read more</a></div>')
        .appendTo($captionText)
});

function stopPropagation(e) {
    e.stopPropagation();
}

$modalImg.on('click', stopPropagation);
$captionText.on('click', stopPropagation);

$modal.on('click', function () {
    $modal.css('display', "none");
    $(document.documentElement).removeClass('modal-expanded');
});

var iama = {{ site.data.i_am_a | jsonify }};

$('.iama-text-rotate').each(function (i) {
    var j = 0;
    var k = 0;
    var wrap = $(this).find('.wrap')[0];
    setInterval(function () {
        if (k < iama[j].length) {
            wrap.textContent += iama[j][k];
        }
        k++;
        if (k > iama[j].length + 10) {
            wrap.textContent = '';
            k = 0;
            j++;
            j %= iama.length;
        }
    }, 200);
});

// please note, 
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// but needs to check if window.opr is not undefined
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition
var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
    // is Google Chrome on IOS
} else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
) {
    document.documentElement.classList.add('isChrome')
} else {
    // not Google Chrome 
    document.documentElement.classList.add('isNotChrome')

}

$('img').each(function () {
    if (this.hasAttribute('id') === false) {
        var src = $(this).attr('src').replace(window.location.origin, '');
        var id = slugify(src);
        $(this).attr('id', id);
    }
});

// if ($('#home').length > 0) {
//     var pages = ['#home', '#work', '#about', '#contact'];
//     var lastTime;
//     window.addEventListener("wheel", function(event) {
//         if (lastTime === new Date().getTime()) return;
//         lastTime = new Date();
//         var delta = Math.sign(event.deltaY);
//         var index = pages.indexOf($(document.body).attr('data-hash'));
//         if (delta > 0) {
//             index = (index + 1) % pages.length;
//         } else if (delta < 0) {
//             index = (index - 1 + pages.length) % pages.length;
//         }
//         var id = pages[index];
//         console.log(id);
//         $(document.body).attr('data-hash', id);
//         $('.wrapped-section').removeClass('active');
//         location.replace(id); 
//         $(id).addClass('active');
//     });
// }

var dontRemoveThese = document.createElement('div');

[].slice.apply(document.querySelectorAll('.about-page img')).forEach(function (img) {
    var width = 1200;
    var height = 1553;


    if (!img.complete) {
        var parent = img.parentElement;

        img.onload = e => {
            parent.insertBefore(img, placeHolderImg);;
            parent.removeChild(placeHolderImg);
        };

        var placeHolderImg = new Image();
        placeHolderImg.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'><linearGradient id='gradient'><stop offset='10%' stop-color='%23ccc'/><stop offset='90%' stop-color='%23eee'/> </linearGradient><rect fill='url(%23gradient)' x='0' y='0' width='100%' height='100%'/></svg>"

        parent.insertBefore(placeHolderImg, img);
        dontRemoveThese.appendChild(img);

    }
});


(function() {
    screen.orientation.lock("natural");
})();

