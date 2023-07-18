!function(){"use strict";var t,e,n,o,i,r,a,s={655:function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.ConsentsBlock=void 0;var n=function(){function t(t,e){void 0===e&&(e=30),this.app=t,this.consentTimeout=e}return t.prototype.ampApi=function(t){var e=this;return new Promise((function(n,o){if(e.app.isAmp())try{e.app.ampConsentData=e.app.context.context.initialConsentValue,e.app.log("Consents. AMP API done."),t&&setTimeout((function(){t()}),0),n()}catch(e){t&&setTimeout((function(){t()}),0),o(e)}else t&&setTimeout((function(){t()}),0),n()}))},t.prototype.initTCFv2Proxy=function(t){var e={};this.app.context.__tcfapi=function(n,o,i,r){var a=Math.random()+"",s={__tcfapiCall:{command:n,parameter:r,version:o,callId:a}};e[a]=i,t.postMessage(s,"*"),"addEventListener"===n&&setTimeout((function(){var e={__tcfapiCall:{command:"getTCData",parameter:r,version:o,callId:a}};t.postMessage(e,"*")}),100)},this.app.context.addEventListener("message",function(t){var n={};try{n="string"==typeof t.data?JSON.parse(t.data):t.data}catch(t){this.app.log(t,"warn",t)}var o=n?n.__tcfapiReturn:null;o&&"function"==typeof e[o.callId]&&(e[o.callId](o.returnValue,o.success),e[o.callId]=null)}.bind(this),!1)},t.prototype.tcfv2Api=function(t){var e,n=this,o=(new Date).getTime(),i=null;return new Promise((function(r,a){var s=function(){n.app.tcfv2Enabled=!0,n.app.requestParams=n.app.requestParams||{},n.app.requestParams.tcfV2="tcfV2=1";try{var e=function(e,o){!o||"tcloaded"!==e.eventStatus&&"useractioncomplete"!==e.eventStatus?(o&&!e.gdprApplies&&(t&&setTimeout((function(){t()}),0),r()),n.app.log("Consents. TCFv2 API paused.")):(n.app.tcfv2Data=e,n.app.context.localStorage&&n.app.context.localStorage.setItem("MG_tcfv2Data",JSON.stringify(e)),n.app.log("Consents. TCFv2 API done."),t&&setTimeout((function(){t()}),0),r())};n.app.context.__tcfapi("getTCData",2,e),n.app.context.__tcfapi("addEventListener",2,e)}catch(e){n.app.log("Consents. TCFv2 API fail."),t&&setTimeout((function(){t()}),0),a(e)}};"function"==typeof n.app.context.__tcfapi?s():e=setInterval((function(){if((new Date).getTime()-o>=1e3*n.consentTimeout)return clearInterval(e),n.app.log("Consents. TCFv2 API not found. Limit time end."),t&&setTimeout((function(){t()}),0),void r();i||function(){for(var t=n.app.context;t;){try{if(t.frames.__tcfapiLocator){i=t;break}}catch(t){n.app.log(t,"warn",t)}if(t===n.app.context.top)break;t=t.parent}}(),i&&n.initTCFv2Proxy(i),"function"==typeof n.app.context.__tcfapi&&(clearInterval(e),s())}),100)}))},t.prototype.gdprApi=function(t){var e=this;return new Promise((function(n,o){var i=e.app.getMostTopWindow();if("function"==typeof i.__cmp){e.app.cmpEnabled=!0,e.app.requestParams=e.app.requestParams||{},e.app.requestParams.tcfV1="tcfV1=1";try{i.__cmp("getConsentData",null,(function(o){e.app.consentData=o,e.app.context.localStorage&&e.app.context.localStorage.setItem("MG_ConsentData",JSON.stringify(o)),e.app.log("Consents. TCFv1 API done."),t&&setTimeout((function(){t()}),0),n()}))}catch(e){t&&setTimeout((function(){t()}),0),o(e)}}else t&&setTimeout((function(){t()}),0),n()}))},t.prototype.ccpaApi=function(t){var e=this;return new Promise((function(n,o){var i=e.app.getMostTopWindow();if("function"==typeof i.__uspapi){e.app.uspEnabled=!0;try{i.__uspapi("getUSPData",1,(function(o,i){i?(e.app.uspString=o.uspString||"",e.app.context.localStorage&&""!==e.app.uspString&&e.app.context.localStorage.setItem("MG_uspString",e.app.uspString),e.app.log("Consents. CCPA API done.")):e.app.log("Consents. CCPA API fail."),t&&setTimeout((function(){t()}),0),n()}))}catch(e){t&&setTimeout((function(){t()}),0),o(e)}}else t&&setTimeout((function(){t()}),0),n()}))},t.prototype.getGdprData=function(){var t=null;if(this.app.cmpEnabled||this.app.tcfv2Enabled||this.app.isAmp())this.app.isAmp()&&1===this.app.context.context.initialConsentState?t={consentData:this.app.ampConsentData,gdprApplies:+this.app.context.context.initialConsentState}:void 0!==this.app.tcfv2Data&&void 0!==this.app.tcfv2Data.gdprApplies&&void 0!==this.app.tcfv2Data.tcString?t={consentData:this.app.tcfv2Data.tcString,gdprApplies:+this.app.tcfv2Data.gdprApplies}:void 0!==this.app.consentData&&void 0!==this.app.consentData.gdprApplies&&void 0!==this.app.consentData.consentData&&(t={consentData:this.app.consentData.consentData,gdprApplies:+this.app.consentData.gdprApplies});else{var e=null;try{this.app.context.localStorage&&(null!=(e=JSON.parse(this.app.context.localStorage.getItem("MG_ConsentData")||"null"))&&void 0!==e.gdprApplies&&"string"==typeof e.consentData&&(t={consentData:e.consentData,gdprApplies:+e.gdprApplies}),null!=(e=JSON.parse(this.app.context.localStorage.getItem("MG_tcfv2Data")||"null"))&&void 0!==e.gdprApplies&&void 0!==e.tcString&&(t={consentData:e.tcString,gdprApplies:+e.gdprApplies}))}catch(t){this.app.log("getGdprData -> "+t.message)}}return t},t.prototype.getUspData=function(){var t=null;if(this.app.uspEnabled)t={uspString:""},""!=this.app.uspString&&void 0!==this.app.uspString&&(t.uspString=this.app.uspString);else try{if(this.app.context.localStorage){var e=this.app.context.localStorage.getItem("MG_uspString");null!=e&&""!=e&&void 0!==e&&(t={uspString:e})}}catch(t){this.app.log("getUspData -> "+t.message)}return t},t.prototype.getConsentData=function(){var t={},e=this.getGdprData(),n=this.getUspData();return null!=e&&Object.keys(e).forEach((function(n){return t[n]=e[n]})),null!=n&&Object.keys(n).forEach((function(e){return t[e]=n[e]})),Object.keys(t).length>0?t:null},t.prototype.fetchConsents=function(){var t=this;return Promise.allSettled([this.ampApi(),this.tcfv2Api(),this.gdprApi(),this.ccpaApi()]).then((function(){return t.getConsentData()}))},t}();e.ConsentsBlock=n},334:function(t,e,n){var o=n(344);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n(878));e.default=function(t){return new this((function(e,n){if(!t||void 0===t.length)return n(new TypeError((0,i.default)(t)+" "+t+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var o=Array.prototype.slice.call(t);if(0===o.length)return e([]);var r=o.length;function a(t,n){if(n&&("object"===(0,i.default)(n)||"function"==typeof n)){var s=n.then;if("function"==typeof s)return void s.call(n,(function(e){a(t,e)}),(function(n){o[t]={status:"rejected",reason:n},0==--r&&e(o)}))}o[t]={status:"fulfilled",value:n},0==--r&&e(o)}for(var s=0;s<o.length;s++)a(s,o[s])}))}},673:function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){return e.reject(n)}))}))}},205:function(t,e,n){var o=n(344);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n(878)),r=o(n(673)),a=o(n(334)),s=setTimeout,p="undefined"!=typeof setImmediate?setImmediate:null;function c(t){return Boolean(t&&void 0!==t.length)}function u(){}function l(t){if(!(this instanceof l))throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],h(t,this)}function f(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,l._immediateFn((function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null!==n){var o;try{o=n(t._value)}catch(t){return void g(e.promise,t)}d(e.promise,o)}else(1===t._state?d:g)(e.promise,t._value)}))):t._deferreds.push(e)}function d(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"===(0,i.default)(e)||"function"==typeof e)){var n=e.then;if(e instanceof l)return t._state=3,t._value=e,void v(t);if("function"==typeof n)return void h((o=n,r=e,function(){o.apply(r,arguments)}),t)}t._state=1,t._value=e,v(t)}catch(e){g(t,e)}var o,r}function g(t,e){t._state=2,t._value=e,v(t)}function v(t){2===t._state&&0===t._deferreds.length&&l._immediateFn((function(){t._handled||l._unhandledRejectionFn(t._value)}));for(var e=0,n=t._deferreds.length;e<n;e++)f(t,t._deferreds[e]);t._deferreds=null}function m(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function h(t,e){var n=!1;try{t((function(t){n||(n=!0,d(e,t))}),(function(t){n||(n=!0,g(e,t))}))}catch(t){if(n)return;n=!0,g(e,t)}}l.prototype.catch=function(t){return this.then(null,t)},l.prototype.then=function(t,e){var n=new this.constructor(u);return f(this,new m(t,e,n)),n},l.prototype.finally=r.default,l.all=function(t){return new l((function(e,n){if(!c(t))return n(new TypeError("Promise.all accepts an array"));var o=Array.prototype.slice.call(t);if(0===o.length)return e([]);var r=o.length;function a(t,s){try{if(s&&("object"===(0,i.default)(s)||"function"==typeof s)){var p=s.then;if("function"==typeof p)return void p.call(s,(function(e){a(t,e)}),n)}o[t]=s,0==--r&&e(o)}catch(t){n(t)}}for(var s=0;s<o.length;s++)a(s,o[s])}))},l.allSettled=a.default,l.resolve=function(t){return t&&"object"===(0,i.default)(t)&&t.constructor===l?t:new l((function(e){e(t)}))},l.reject=function(t){return new l((function(e,n){n(t)}))},l.race=function(t){return new l((function(e,n){if(!c(t))return n(new TypeError("Promise.race accepts an array"));for(var o=0,i=t.length;o<i;o++)l.resolve(t[o]).then(e,n)}))},l._immediateFn="function"==typeof p&&function(t){p(t)}||function(t){s(t,0)},l._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};var w=l;e.default=w},344:function(t){t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.__esModule=!0,t.exports.default=t.exports},878:function(t){function e(n){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(n)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports}},p={};function c(t){var e=p[t];if(void 0!==e)return e.exports;var n=p[t]={exports:{}};return s[t](n,n.exports,c),n.exports}c.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e=(t=c(344))(c(205)),n=t(c(673)),o=t(c(334)),"function"!=typeof(i=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==c.g)return c.g;throw new Error("unable to locate global object")}()).Promise?i.Promise=e.default:(i.Promise.prototype.finally||(i.Promise.prototype.finally=n.default),i.Promise.allSettled||(i.Promise.allSettled=o.default)),r=c(344)(c(878)),a=c(655),function(){var t=String("a.mgid.com"),e=function(e){var n,o,i="https://"+t+"/1x1.gif",s="https://"+t+"/auto.gif",p="https://"+t.replace(/^[^.]./,"cm.")+"/sm.js",c=this,u=!1,l=!1,f=0,d=new a.ConsentsBlock({context:window,log:function(){},isAmp:function(){return!1},getMostTopWindow:function(){return window}},.05),g=function(){var e=/a\.([^\.]*)\.(.*)/.exec(t);return e[1]?e[1].charAt(0).toUpperCase()+e[1].slice(1):0},v=function(){return m()?void 0!==window._mglp?decodeURIComponent(window._mglp):document.referrer:document.location.href},m=function(){return window.self!==window.parent},h=function(t,e){var n=new Date;n.setTime(n.getTime()+7776e6);var o="expires="+n.toUTCString();document.cookie=g()+t+"="+e+";path=/; "+o},w=function(t){var e;return(e=document.cookie.match(new RegExp("(?:^|; )"+g()+t+"=([^;]*)")))?e[1]:""},y=function(t){var e=document,n=e.getElementsByTagName("body")[0],o=e.createElement("script");o.type="text/javascript",o.async=!0,o.src=p+"?"+S(),null!==t&&(t.consentData&&(o.src+="&consentData="+t.consentData),t.gdprApplies&&(o.src+="&gdprApplies="+t.gdprApplies),t.uspString&&(o.src+="&uspString="+t.uspString)),n.appendChild(o,n)},_=function(t){t+="&"+S(),(new Image).src=t},S=function(){return"d="+(Date.now?Date.now():(new Date).valueOf())};this.invoke=function(t,a){(function(){var t={},e=function(){var t;try{t=m()?new URL(v()).search:location.search}catch(e){t=location.search}return t.substring(1).split("&")}();l=!1;for(var o=0,i=e.length;o<i;o++){var r=e[o];if(""!==r){var a=r.split("=");try{t[a[0]]=a[1]&&decodeURIComponent(a[1].replace(/\+/g," "))}catch(t){}}}t.utm_source&&w("SensorUtmSource")!==t.utm_source&&(l=!0),t.utm_content&&t.utm_term&&t.utm_source&&h("SensorUtmSource",t.utm_source);var s=t.adclid||(t.adclida?t[t.adclida]:null);"string"==typeof s&&(s=s.split("?")[0]),s&&(n=s,h("SensorClid",s),h("SensorClidV",1)),!s&&l&&h("SensorClidV",0)})(),function(){o=Number(w("SensorNVis"));var t=v();1==(w("SensorHref")==t)||o++,h("SensorNVis",o),h("SensorHref",t)}(),function(){o=Number(w("SensorNVis"));var t=w("SensorClid");""===t&&void 0!==n||(n=t),f=Number(w("SensorClidV"))}(),d.fetchConsents().then((function(p){!function(t,a,s){var p=i+"?id="+(e.cid?e.cid:e.id)+(e.cid?"&type=c":"&type=s")+"&tg="+t+"&r="+encodeURIComponent(v());p+="&nv="+Number(o),p+="&clid="+n,p+="&clidv="+f,null!==s&&(s.consentData&&(p+="&consentData="+s.consentData),s.gdprApplies&&(p+="&gdprApplies="+s.gdprApplies),s.uspString&&(p+="&uspString="+s.uspString)),"object"===(0,r.default)(a)&&(a.gtm_stage&&(p+="&gtms="+a.gtm_stage),a.gtm_revenue&&(p+="&gtmr="+a.gtm_revenue),a.gtm_category&&(p+="&gtmc="+a.gtm_category),a.revenue&&(p+="&rvn="+a.revenue)),_(p)}(t,a,p),(e.eid||e.goods)&&function(t){null==e.eid&&(e.eid=""),null==e.goods&&(e.goods=[]),null==e.partner&&(e.partner="");var n=s+"?sid="+(e.cid?e.cid:e.id)+"&eid="+e.eid+(e.cid?"&type=c":"&type=s")+"&goods="+e.goods.join(",")+"&partner="+e.partner+"&referer="+encodeURIComponent(document.referrer);null!==t&&(t.consentData&&(n+="&consentData="+t.consentData),t.gdprApplies&&(n+="&gdprApplies="+t.gdprApplies),t.uspString&&(n+="&uspString="+t.uspString)),_(n),y(t)}(p)}))},this.invokeAll=function(t){if(void 0!==t)for(var e=0;e<t.length;e++)c.addInvokeQueue(t[e][0],t[e][1]||[]);else for(var n in c.getAllInvokers())c.addInvokeQueue(n)},this.getAllInvokers=function(){return window._mgr},this.mgqWorker=function(){for(var t=0;t<window._mgq.length;t++){var e=window._mgq[t];"function"==typeof window[e[0]]&&(window[e[0]].apply(window,e.slice(1)),window._mgq.splice(t,1))}window._mgqi||(window._mgqi=window.setInterval((function(){c.mgqWorker()}),5)),u||(new Date).getTime()-window._mgqt>1e4&&(u=!0,window.clearInterval(window._mgqi),window._mgqi=window.setInterval((function(){c.mgqWorker()}),100))},this.addInvokeQueue=function(t,e){window._mgq.push([t,e||[]])},this.mgqInit=function(){window._mgq=window._mgq||[],void 0===window._mgqp&&(window._mgqp=c.mgqWorker,window._mgqt=(new Date).getTime(),c.mgqWorker())}},n=function(t){void 0===window._mgr&&(window._mgr={}),window._mgr[t]=t},o="MgSensorInvoke";if("[object Array]"===Object.prototype.toString.call(MgSensorData)){for(var i={},s=0;s<MgSensorData.length;s++)if(void 0===i[MgSensorData.cid]&&MgSensorData[s].project===t){var p=new e(MgSensorData[s]),c=o+s;window.MgSensor=p,window[c]=window[o]=p.invoke,p.mgqInit(),n(c),p.addInvokeQueue(c,[""]),i[MgSensorData.cid]=MgSensorData.cid}}else MgSensorData&&(MgSensorData.id||MgSensorData.cid)&&(window.MgSensor=new e(MgSensorData),window.MgSensorInvoke=window.MgSensor.invoke,window.MgSensor.mgqInit(),n(o),window.MgSensor.addInvokeQueue(o,[""]));void 0!==window.history&&function(){if(!window._mghl){window._mghl={oldUrl:window.location.href};var t=function(){window._mghl.oldUrl!==window.location.href&&(window.MgSensor.invokeAll(),window._mghl.oldUrl=window.location.href)},e=function(e){return function(){var n=e.apply(this,arguments);return t(),n}};"function"==typeof window.history.pushState&&(window.history.pushState=e(window.history.pushState)),"function"==typeof window.history.replaceState&&(window.history.replaceState=e(window.history.replaceState)),window.addEventListener("popstate",t)}}()}()}();