function setWithExpiry(key, value, ttl) {
    const now = new Date()

    //contiene el valor y el tiempo de expiración
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }

    localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // si no existe, return null
    if (!itemStr) {
        return false
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compara el tiempo de expiración del item con el tiempo actual.
    if (now.getTime() > item.expiry) {

        // Si el tiempo ha expirado, borra el item del storage y return null
        localStorage.removeItem(key)
        return false
    }

    return true
}

window.addEventListener('load', () =>{
    let notification = document.querySelector('.notification');
    let numeroDeNotificaciones = document.querySelectorAll('.n-list').length;
    
    if(numeroDeNotificaciones >= 0){
        $('.badge').html(numeroDeNotificaciones);
        $('.badgeMobile').html(numeroDeNotificaciones);
    }

    // verificamos si el usuario estuvo el día anterior en la página
    // si ha estado se oculta el aviso de las notificaciones
    // de lo contrario se mostrará.
    const userV = getWithExpiry("movistarCO_visits");

    if(!userV){
        $('.badge').show();
        $('.badgeMobile').show();
    }

    // Activamos el menú de las notificaciones en Mobile
    let campana = document.querySelector('.js-noti-mobile');
    let openMenu = document.querySelector('.bell');
    let openMenuBody = document.querySelector('body');
    let openMenuHeader = document.querySelector('.c-header');

    campana.addEventListener('click', () => {
        openMenu.classList.add('is-open-megamenu');
        openMenuBody.classList.add('is-open-main-menu');
        openMenuHeader.classList.add('is-open');
        $('.badgeMobile').hide();
        if(!userV){
            setWithExpiry("movistarCO_visits", 1, 86400);
        }
    })

    notification.addEventListener('click', () => {
        $('.badge').hide();
        $('.badgeMobile').hide();
        if(!userV){
            setWithExpiry("movistarCO_visits", 1, 86400);
        }
    })

});