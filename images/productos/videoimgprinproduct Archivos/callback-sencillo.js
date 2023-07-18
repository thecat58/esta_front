function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46-110-190-17-18-91-32";
    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function soloLetras(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    patron = /[A-Za-z\s]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

// funcion anonima para que no se pueda alterar las variables desde el navegar
(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var URLAPI = "https://movistar-integracion-dot-modified-wonder-87620.appspot.com";
    var host = window.location.host;
    var canal = host.replace('www.', '').split('.')[0];
    var fueraDeHorario = '';
    var telefonoCliente, producto, microsegmento, idLanding, landing, padre = '';
    var muestraHorario = FUERA_HORARIO;


    $(document).on('click', '.js-curtain', function (e) {
        e.preventDefault();
        padre = $(this).closest('.id-callback');
        var element = $(this);
        element.addClass('horizTranslate');
        padre.find('.js-check').fadeIn();
        if (element.hasClass('error') || element.hasClass('sendOK')) {
            hideErrorBtn();
        }
        ctrlTextTerm();
    });

    $(".js-keyup-phone").on('keyup', function () {
        padre = $(this).closest('.id-callback');
        if (padre.find(".js-telefono").val().length == 10) {
            padre.find(".js-checkTerminos").prop("checked", true);
            padre.find('.js-button-enviar').prop("disabled", false);
        } else {
            padre.find(".js-checkTerminos").prop("checked", false);
            padre.find('.js-button-enviar').prop("disabled", true);
        }
    });

    $(document).on('click', '.js-button-enviar', function () {
        padre = $(this).closest('.id-callback');
        if (validateFormulario()) {
            disbleButtom();
            let continueRegister = true;
            telefonoCliente = padre.find(".js-telefono").val();
            producto = padre.find('.producto').val();
            microsegmento = padre.find('.microsegmento').val();
            landing = padre.find('.landing').val();
            idLanding = padre.find('.idlanding').val();
            // validHoraProdExcl();

            if (isFueraHorario()) {
                lanzarFueraHorario();
                continueRegister = false;
                tipoLead = "CMB";
            }
            if (continueRegister) {
                tipoLead = "C2C";
                makeLead();
            }
        }
    });

    function validHoraProdExcl() {
        switch (producto.toLowerCase().trim()) {
            case 'renorepo':
            case 'renorepo_medios':
                console.log("Time change renorepo");
                muestraHorario = FUERA_HORARIO_RENOREPO;
                break;

            default:
                muestraHorario = FUERA_HORARIO
                break;
        }
    }

    function ctrlTextTerm() {
        var el = padre.find('.js-ctrl-text');

        if (el.width() >= 500) {
            el.css('font-size', '13px')
        } else if (el.width() <= 230) {
            el.css('font-size', '7.9px')
        } else {
            el.css('font-size', '10px')
        }
    }

    function validateFormulario() {
        let telefono = padre.find('.js-telefono').val();
        let check = padre.find(".js-checkTerminos").prop("checked");

        if (telefono.length === 10 && telefono != "" && telefono.charAt(0) == "3" && check) {
            padre.find(".js-telefono").removeClass('error');
            return true;
        } else {
            padre.find(".js-telefono").addClass('error');
            return false;
        }
    }

    function isFueraHorario() {
        let horariosATC = getDatesMinAndMax();
        let fechaEvalFin = horariosATC.horaFin, fechaEvalIni = horariosATC.horaIni, fechaActual = new Date();

        let strHoraActual = revisarNumeroMenorA10(fechaActual.getHours()) + ':' + revisarNumeroMenorA10(fechaActual.getMinutes());
        let strHoraIni = revisarNumeroMenorA10(fechaEvalIni.getHours()) + ':' + revisarNumeroMenorA10(fechaEvalIni.getMinutes());
        let strHoraFin = revisarNumeroMenorA10(fechaEvalFin.getHours()) + ':' + revisarNumeroMenorA10(fechaEvalFin.getMinutes());

        if (strHoraActual > strHoraIni && strHoraActual < strHoraFin) {//Validación de horas internamente se evaluan los val ASCII de cada una
            return false;
        } else {
            return true;
        }
    }

    function revisarNumeroMenorA10(numero) {
        if (numero < 10) numero = "0" + numero;
        return numero;
    }

    function getDatesMinAndMax() {
        let horarioIni = muestraHorario.split('-')[1].split(':');
        let horarioFin = muestraHorario.split('-')[0].split(':');

        let fechaHoraMin = new Date(), fechaHoraMax = new Date();
        fechaHoraMin.setHours(parseInt(horarioIni[0]));//Se setea hora inicio atc
        fechaHoraMin.setMinutes(parseInt(horarioIni[1]));//Se setea hora inicio atc
        fechaHoraMin.setSeconds(0);//Se setea hora inicio atc
        fechaHoraMax.setHours(parseInt(horarioFin[0]));//Se setea hora fin atc
        fechaHoraMax.setMinutes(parseInt(horarioFin[1]));//Se setea minutos fin atc
        fechaHoraMax.setSeconds(0);//Se setea minutos fin atc

        return { horaIni: fechaHoraMin, horaFin: fechaHoraMax };
    }

    function lanzarFueraHorario() {
        let horarios = muestraHorario.split('-');
        Swal.fire({
            html: '<b>Fuera de horario</b>, por favor agenda una fecha y hora para que uno de nuestros agentes te pueda contactar.<br><small style="color:#00a9e0">Horarios de atención de lunes a domingo entre las ' + horarios[1] + ' hrs y las ' + horarios[0] + ' hrs.<small>',
            confirmButtonColor: '#48C400',
            cancelButtonColor: '#50535a',
            confirmButtonText: 'Agendar',
            width: "470px",
            showCloseButton: true,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                initCalendar();
            }else{
                resetDisbleButtom();
            }
        })
    }

    function initCalendar() {
        let horariosATC = getDatesMinAndMax();
        let ahoraMismo = new Date(),
            fechaHoraMin = horariosATC.horaIni,
            fechaHoraMax = horariosATC.horaFin;

        let strHoraActual = revisarNumeroMenorA10(ahoraMismo.getHours()) + ':' + revisarNumeroMenorA10(ahoraMismo.getMinutes());
        let strHoraFin = revisarNumeroMenorA10(fechaHoraMax.getHours()) + ':' + revisarNumeroMenorA10(fechaHoraMax.getMinutes());

        //Validación de horas internamente se evaluan los val ASCII de cada una
        if (strHoraActual >= strHoraFin && strHoraActual <= "23:59") {
            fechaHoraMin.setDate(ahoraMismo.getDate() + 1);//Se suma un día
            fechaHoraMax.setDate(ahoraMismo.getDate() + 1);//Se suma un día
        }
        fechaHoraMax.setHours(fechaHoraMax.getHours() - 1);//Se setea hora fin atc
        let enviarCallback = false;

        // se setea el input de calendar con la fecha minima
        var fechaFormatada = new Intl.DateTimeFormat("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(fechaHoraMin);
        fechaFormatada = fechaFormatada.replaceAll('/', '-');
        fechaFormatada = fechaFormatada.replaceAll(',', '');
        padre.find(".calendar").val(fechaFormatada);

        Swal.fire({
            title: 'Agenda tu llamada',
            html: '<div id="dtBox"></div>',
            showCloseButton: false,
            allowOutsideClick: false,
            showConfirmButton: false,
        });
        $("#dtBox").DateTimePicker({
            isInline: true,
            titleContentDateTime: "",
            defaultDate: fechaHoraMin,
            minDateTime: fechaHoraMin,
            maxDateTime: fechaHoraMax,
            inputElement: padre.find(".calendar"),
            buttonClicked: function (btn, sElemValue) {
                if (btn == 'SET') {
                    enviarCallback = true;
                    fueraDeHorario = padre.find('.calendar').val();
                }
                if (btn == 'CLEAR') {
                    resetDisbleButtom();
                }
                Swal.close();
            },
            setValueInTextboxOnEveryClick: true,
            settingValueOfElement: function (oDTP, sElemValue, dElemValue, $oElem) {
                if (enviarCallback) makeLead(); //Envía lead a server
                enviarCallback = false; //evita request al server cuando se cambie la hora
            }
        });
        $('.dtpicker-compValue').attr('readonly', 'readonly');
    }

    function makeLead() {
        let rtaDataLayer = 'Llameme-OK';
        $.ajax({
            async: true,
            crossDomain: true,
            type: "POST",
            url: URLAPI + "/api/leads/nuevo",
            headers: {
                "Content-Type": "application/json"
            },
            processData: false,
            data: JSON.stringify(getDataLead()),
            beforeSend: function () {
                padre.removeClass('sendNumber-ok');
                console.log("sending...");
                padre.find('.js-curtain .icon').hide();
                padre.find('.js-curtain span').hide();
                padre.find('.js-check').fadeOut();
                padre.find('.js-curtain').removeClass('horizTranslate');
                padre.find('.js-curtain .icon-spinner').show();
            },
            success: function (response) {
                console.log(response);
                padre.find('.js-curtain .icon-spinner').hide();
                padre.find('#dtBox').fadeOut(100);//caja calendar
                padre.find('#data-cliente').fadeIn(120);//sección callback
                if (response.code == 200) {//registro ok
                    showSuccessBtn('Enviado');
                    resetCampsForm();
                    resetDisbleButtom();
                    if (padre.find(".js-button-enviar").hasClass('send-soicos')) {
                        sendSoicos();
                    }
                } else if (response.code == 201) {//registro ok fuera de horario
                    showSuccessBtn('Programado');
                    resetCampsForm();
                    resetDisbleButtom();
                    if (padre.find(".js-button-enviar").hasClass('send-soicos')) {
                        sendSoicos();
                    }
                } else {
                    rtaDataLayer = 'Llameme-KO';
                    showErrorBtn();
                    padre.find('.js-button-enviar').prop("disabled", false);
                }
                padre.find('.js-curtain span').show();
            },
            complete: function () {
                pushDatalayer('trackEvent', 'portal publico ' + landing, 'Lo quiero', rtaDataLayer, landing + " - " + idLanding + " - " + telefonoCliente, telefonoCliente);
                if (rtaDataLayer == 'Llameme-OK') {
                    padre.addClass('sendNumber-ok');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                resetDisbleButtom();
                showErrorBtn();
                padre.find('.js-button-enviar').prop("disabled", false);
                rtaDataLayer = 'Llameme-KO';
                console.log(jqXHR.responseJSON);
            }
        });
    }

    function getDataLead() {
        let data = {
            "telefonoCliente": telefonoCliente,
            "canal": canal,
            "producto": producto,
            "microsegmento": microsegmento,
            "landing": landing,
            "idLanding": idLanding,
            "medio": "web",
            "tipoLead": tipoLead,
            "urlPage": window.location.href,
            "campania": utmsClear(params.campaign),
            "utmSource": utmsClear(params.utm_source),
            "utmCampaing": (params.utm_campaing != '' && params.utm_campaing != undefined) ? utmsClear(params.utm_campaing) : utmsClear(params.utm_campaign),
            "utmMedium": utmsClear(params.utm_medium),
            "utmTerm": utmsClear(params.utm_term),
            "utmContent": utmsClear(params.utm_content),
            "fueraDeHorario": utmsClear(fueraDeHorario)
        };

        console.log(data);
        return data;
    }

    function utmsClear(attr) {
        return (attr == undefined || attr == null || attr == '') ? '' : attr;
    }


    function showSuccessBtn(msj) {
        padre.find('.js-curtain .icon').hide();
        padre.find('.js-curtain .icon-send').show();
        padre.find('.js-curtain span').html(msj);
        padre.find('.js-curtain span').show();
        padre.find('.js-curtain').addClass('sendOK');
        setTimeout(() => {
            hideErrorBtn();
        }, 5000);
    }

    function showErrorBtn() {
        padre.find('.js-curtain i').hide();
        padre.find('.js-curtain').addClass('error');
        padre.find('.js-curtain span').html('X &nbsp;&nbsp;&nbsp;&nbsp;Error');
        padre.find('.js-curtain span').show();
        setTimeout(() => {
            hideErrorBtn();
        }, 3000);
    }

    function hideErrorBtn() {
        padre.find('.js-curtain .icon').hide();
        padre.find('.js-curtain .icon-phone').show();
        padre.find('.js-curtain').removeClass('error');
        padre.find('.js-curtain').removeClass('sendOK');
        let text=padre.find('.js-curtain span').attr('data-texto')
        padre.find('.js-curtain span').html(text);
        padre.find('.js-curtain span').show();
    }

    function resetCampsForm() {
        padre.find('.js-telefono').val('');
        padre.find('.calendar').val('');
        padre.find(".js-checkTerminos").prop("checked", false);
        tipoLead = '';
    }

    function disbleButtom() {
        padre.find('.js-curtain').prop("disabled", true);
        padre.find('.js-button-enviar').prop("disabled", true);
    }

    function resetDisbleButtom() {
        padre.find('.js-curtain').prop("disabled", false);
        padre.find('.js-button-enviar').prop("disabled", false);
    }

    function pushDatalayer(event, category, action, label, value, telefonoCliente) {
        // console.log("!!!!!!MAKE PUSH DATALAYER¡¡¡¡¡\nevent: " + event + "\ncategory: " + category + "\naction: " + action + "\nlabel: " + label + "\nvalue: " + value);
        dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': category,
            'eventAction': action,
            'eventLabel': label,
            'eventValue': value,
            'numero': telefonoCliente
        });
    }

    function sendSoicos() {
        let html = '<script id="scriptsoicos" type="text/javascript" src="https://ad.soicos.com/soicosjs.php?s=.js"></script>';
        html += '<script id="datasoicos" type="text/javascript">';
        html += '(function() { soicos.registerConversion({ pid :13680, data : ' + telefonoCliente + ' });})();';
        html += '</script>';

        document.body.insertAdjacentHTML("beforeend", html);


        setTimeout(() => {
            document.getElementById('scriptsoicos').remove();
            document.getElementById('datasoicos').remove();
        }, 7000);
    }

    //Marcación boton - Conoce más - oferta siempre ganas
    $(".js-SimpreGanas").on("click", function () {
        dataLayer.push({
            event: "trackEvent",
            eventCategory: "movistarco - home – Sliders",
            eventAction: "click – Conoce más",
            eventLabel: "Oferta voladora",
        });
    });


})();