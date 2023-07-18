(function(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('utm_source') && urlParams.has('utm_campaign') && urlParams.has('utm_medium')){
        var utmSource = "", utmCampaing = "", utmMedium = "", utmTerm = "", utmContent = "";
        urlParams.forEach(function(value, key) {
            switch (key) {
                case 'utm_source':
                    utmSource = value;
                    break;
                case 'utm_campaign':
                    utmCampaing = value;
                    break;
                case 'utm_medium':
                    utmMedium = value;
                    break;
                case 'utm_term':
                    utmTerm = value;
                    break;
                case 'utm_content':
                    utmContent = value;
                    break;
            }
        });
        const complementoRequired = '?utm_source='+utmSource+'&utm_campaign='+utmCampaing+'&utm_medium='+utmMedium;
        const complementoOptional =  (urlParams.has('utm_term') ? ('&utm_term='+utmTerm) : '')  + (urlParams.has('utm_content') ? ('&utm_content='+utmContent) : '');
        actualizarUrlsIframes(complementoRequired+complementoOptional);
    }
})();

function actualizarUrlsIframes(componente){
    const callbacksDot = document.querySelectorAll('iframe.iframe-callback');
    callbacksDot.forEach( iframe => {
        iframe.src = iframe.src.includes('?') ? (iframe.src + '&' + componente.substr(1)) : (iframe.src + componente);
    });
};