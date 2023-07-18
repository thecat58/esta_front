
// animation

$(window).on('load', function (){
    $('[data-animate-on-load]').each(function (){
        if(!$(this).hasClass('animate__animated')){
            $(this).addClass('animate__animated')
        }
        $(this).addClass('animate__' + $(this).data('animate'))
    });
    
})
$(window).on('scroll', function (){
    let $scrollTop = $(document).scrollTop()
    let alturaDelViewport = window.innerHeight;
    
    
    $('.kindanimated.animate__animated').each(function (e){
        let $offsetTop = $(this).offset().top
        let $scrolling = parseInt($offsetTop) - (alturaDelViewport / 2 + alturaDelViewport / 3) < parseInt($scrollTop)
        /* $scrolling determina en qué altura del viewport detectará el elemento y activará la animación*/
        if($scrolling){
            if(animateInSecuency($(this))){
                return true
            }
            else if(typeof $(this).data('animate-on-slider') !== 'undefined'){
                let $els = $(this).find('.slick-active .kindanimated')
                for (let $i = 0; $i < $els.length; $i++) {
                    $els[$i].classList.add('animate__animated', 'animate__' + $els[$i].dataset.animate);
                }
                
            } else {
                $(this).addClass('animate__' + $(this).data('animate'))
            }
            
        }
    })
})


$('.slick-initialized').on('afterChange', function(event, slick, currentSlide){
    let $currentSlider = slick.$slides[currentSlide]
    
    let $els = $($currentSlider).find('.kindanimated')
    for (let $i = 0; $i < $els.length; $i++) {
        $els[$i].classList.add('animate__animated', 'animate__' + $els[$i].dataset.animate);
    }
});

function animateInSecuency(el){
    if(typeof el.data('animate-on-secuency') !== 'undefined'){
        let $delay = el.data('animate-delay')
        let $els = el.find('.kindanimated')
        for(let $i = 0; $i < $els.length; $i++){
            setTimeout(() => {
                $els[$i].classList.add('animate__animated', 'animate__' + $els[$i].dataset.animate);
            }, $delay * $i * 1000)
        }
        return true
    } else {
        return false
    }
}