// jQuery scripts
$(document).ready(function () {
    console.log('No Errors. Looks Owesome!!!');
    $('.purple').tooltip()
});

// Animated header on scroll
$(window).scroll(function() {
    if ($(this).scrollTop() > 1){  
        $('.navbar').addClass("stay-on-top");
      }
      else{
        $('.navbar').removeClass("stay-on-top");
      }
    });

// Bootstrap hover dropdown
function toggleDropdown(e) {
    const _d = $(e.target).closest('.dropdown'),
        _m = $('.dropdown-menu', _d);
    setTimeout(function () {
        const shouldOpen = e.type !== 'click' && _d.is(':hover');
        _m.toggleClass('show', shouldOpen);
        _d.toggleClass('show', shouldOpen);
        $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
    }, e.type === 'mouseleave' ? 300 : 0);
}

$('body')
    .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);
