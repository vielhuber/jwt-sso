!function i(c,s,a){function u(t,e){if(!s[t]){if(!c[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var r=s[t]={exports:{}};c[t][0].call(r.exports,function(e){return u(c[t][1][e]||e)},r,r.exports,i,c,s,a)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<a.length;e++)u(a[e]);return u}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=i(e("babel-runtime/helpers/classCallCheck")),r=i(e("babel-runtime/helpers/createClass"));function i(e){return e&&e.__esModule?e:{default:e}}var c=function(){function e(){(0,o.default)(this,e)}return(0,r.default)(e,null,[{key:"cookieExists",value:function(e){return void 0!==document.cookie&&null!==this.cookieGet(e)}},{key:"cookieGet",value:function(e){var t=document.cookie.match(new RegExp(e+"=([^;]+)"));return t?decodeURIComponent(t[1]):null}},{key:"cookieSet",value:function(e,t,n){document.cookie=e+"="+encodeURIComponent(t)+"; expires="+new Date((new Date).getTime()+24*n*60*60*1e3).toUTCString()+"; path=/"}},{key:"cookieDelete",value:function(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"}},{key:"remove",value:function(e){null!==e&&e.parentNode.removeChild(e)}}]),e}();n.default=c},{"babel-runtime/helpers/classCallCheck":6,"babel-runtime/helpers/createClass":7}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=c(e("babel-runtime/core-js/json/stringify")),a=c(e("babel-runtime/core-js/promise")),o=c(e("babel-runtime/helpers/classCallCheck")),r=c(e("babel-runtime/helpers/createClass")),u=c(e("./_helpers"));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(){function t(e){(0,o.default)(this,t),this.config=e}return(0,r.default)(t,[{key:"isLoggedIn",value:function(){return null!==this.getPayload()}},{key:"getUserId",value:function(){var e=this.getPayload();return null===e?null:e.sub}},{key:"getPayload",value:function(){if(null===u.default.cookieGet("access_token"))return null;try{return JSON.parse(atob(u.default.cookieGet("access_token").split(".")[1]))}catch(e){return null}}},{key:"logout",value:function(){var o=this;return new a.default(function(t,n){o.addLoadingState("logging-out"),fetch(o.config.auth_server+"/logout",{method:"POST",headers:{"content-type":"application/json",Authorization:"Bearer "+u.default.cookieGet("access_token")},cache:"no-cache"}).then(function(e){return e.json()}).catch(function(e){return e}).then(function(e){o.setCookies(null).then(function(){o.removeLoadingStates(),t()}).catch(function(e){n(e)})})})}},{key:"login",value:function(){var o=this;return new a.default(function(t,n){null!==u.default.cookieGet("access_token")?(o.addLoadingState("logging-in"),fetch(o.config.auth_server+"/check",{method:"POST",body:(0,i.default)({access_token:u.default.cookieGet("access_token")}),headers:{"content-type":"application/json"},cache:"no-cache"}).then(function(e){return e.json()}).catch(function(e){return e}).then(function(e){!0===e.success?o.setCookies(u.default.cookieGet("access_token")).then(function(){o.removeLoadingStates(),t()}).catch(function(e){n(e)}):fetch(o.config.auth_server+"/refresh",{method:"POST",headers:{"content-type":"application/json",Authorization:"Bearer "+u.default.cookieGet("access_token")},cache:"no-cache"}).then(function(e){return e.json()}).catch(function(e){return e}).then(function(e){!0===e.success?o.setCookies(e.data.access_token).then(function(){o.removeLoadingStates(),t()}).catch(function(e){n(e)}):o.renderLoginFormWithPromise().then(function(){t()})})})):o.renderLoginFormWithPromise().then(function(){t()}).catch(function(){n()})})}},{key:"fetch",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(o){var r=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return new a.default(function(t,n){"headers"in i||(i.headers={}),"tries"in i||(i.tries=0),i.tries++,3<i.tries?n(null):!1===r.isLoggedIn()?r.login().then(function(){r.fetch(o,i).then(function(e){t(e)}).catch(function(e){n(e)})}).catch(function(e){n(e)}):(r.addLoadingState("fetching"),i.headers.Authorization="Bearer "+u.default.cookieGet("access_token"),fetch(o,i).then(function(e){return e}).catch(function(e){return e}).then(function(e){r.removeLoadingStates(),401===e.status?(r.addLoadingState("logging-in"),fetch(r.config.auth_server+"/refresh",{method:"POST",headers:{"content-type":"application/json",Authorization:"Bearer "+u.default.cookieGet("access_token")},cache:"no-cache"}).then(function(e){return e.json()}).catch(function(e){return e}).then(function(e){!0===e.success?r.setCookies(e.data.access_token).then(function(){r.removeLoadingStates(),r.fetch(o,i).then(function(e){t(e)}).catch(function(e){n(e)})}).catch(function(e){r.removeLoadingStates(),n(e)}):(r.removeLoadingStates(),r.renderLoginFormWithPromise().then(function(){r.fetch(o,i).then(function(e){t(e)}).catch(function(e){n(e)})}).catch(function(e){n(e)}))})):t(e)}))})})},{key:"setCookies",value:function(){var c=this,s=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return new a.default(function(n,e){if(void 0===c.setCookieLoading&&c.setCookieLoading,!0!==c.setCookieLoading){c.setCookieLoading=!0,null!==s?u.default.cookieSet("access_token",s,28):u.default.cookieDelete("access_token"),(void 0===c.config.sso||1===c.config.sso.length&&c.config.sso[0]===window.location.protocol+"//"+window.location.host)&&(c.setCookieLoading=!1,n()),u.default.remove(document.querySelector(".iframe_wrapper"));var t=document.createElement("div");t.setAttribute("class","iframe_wrapper"),t.style.position="absolute",t.style.opacity="0",document.body.appendChild(t);var o=c,r=c.config.sso.length-1,i=function e(t){-1!==o.config.sso.indexOf(t.origin)&&(void 0!==t.data&&null!==t.data&&"success"in t.data&&!0===t.data.success&&r--,r<=0&&(window.removeEventListener("message",e,!1),u.default.remove(document.querySelector(".iframe_wrapper")),o.setCookieLoading=!1,n()))};window.addEventListener("message",i,!1),setTimeout(function(){!0===c.setCookieLoading&&(window.removeEventListener("message",i,!1),u.default.remove(document.querySelector(".iframe_wrapper")),c.setCookieLoading=!1,n())},5e3),c.config.sso.forEach(function(t){if(t!==window.location.protocol+"//"+window.location.host){var n=document.createElement("iframe");n.setAttribute("src",t+"/sso.html"),n.style.width="1px",n.style.height="1px",n.addEventListener("load",function(e){n.contentWindow.postMessage({access_token:s},t)}),document.querySelector(".iframe_wrapper").appendChild(n)}})}else n()})}},{key:"renderLoginFormWithPromise",value:function(){var n=this;return new a.default(function(e,t){n.buildUpLoginFormHtml(),n.bindLoginFormSubmit().then(function(){e()}).catch(function(e){t(e)})})}},{key:"buildUpLoginFormHtml",value:function(){u.default.remove(document.querySelector(".login-form"));var e=document.createElement("div");e.setAttribute("class","login-form"),void 0===this.config.login_form_parent||null===document.querySelector(this.config.login_form_parent)?document.body.appendChild(e):document.querySelector(this.config.login_form_parent).appendChild(e),this.addLoadingState("login-form-visible"),e.insertAdjacentHTML("beforeend",'\n            <div class="login-form__inner">\n                <form class="login-form__form">\n                    <ul class="login-form__items">\n                        <li class="login-form__item">\n                            <label class="login-form__label login-form__label--email" for="email">E-Mail-Adresse</label>\n                            <input class="login-form__input login-form__input--email" type="text" required="required" name="email" />\n                        </li>\n                        <li class="login-form__item">\n                            <label class="login-form__label login-form__label--password" for="password">Passwort</label>\n                            <input class="login-form__input login-form__input--password" type="password" required="required" name="password" />\n                        </li>\n                        <li class="login-form__item">\n                            <input class="login-form__submit" type="submit" value="Anmelden" />\n                        </li>\n                    </ul>\n                </form>\n            </div>\n        ')}},{key:"bindLoginFormSubmit",value:function(e){var r=this;return new a.default(function(t,n){var o=document.querySelector(".login-form");o.addEventListener("submit",function(e){r.addLoadingState("logging-in"),o.querySelector(".login-form__submit").disabled=!0,u.default.remove(o.querySelector(".login-form__error")),fetch(r.config.auth_server+"/login",{method:"POST",body:(0,i.default)({email:o.querySelector(".login-form__input--email").value,password:o.querySelector(".login-form__input--password").value}),headers:{"content-type":"application/json"},cache:"no-cache"}).then(function(e){return e.json()}).catch(function(e){return e}).then(function(e){o.querySelector(".login-form__submit").disabled=!1,null!=e&&"success"in e&&!0===e.success?(u.default.remove(document.querySelector(".login-form")),r.setCookies(e.data.access_token).then(function(){r.removeLoadingStates(),t()}).catch(function(e){n(e)})):o.querySelector(".login-form__inner").insertAdjacentHTML("afterbegin",'<p class="login-form__error">'+e.public_message+"</p>")}),e.preventDefault()},!1)})}},{key:"addLoadingState",value:function(e){document.documentElement.classList.add("jwtbutler-"+e),"logging-in"!==e&&"logging-out"!==e||document.documentElement.classList.add("jwtbutler-loading")}},{key:"removeLoadingStates",value:function(){document.documentElement.classList.remove("jwtbutler-logging-in"),document.documentElement.classList.remove("jwtbutler-logging-out"),document.documentElement.classList.remove("jwtbutler-loading"),document.documentElement.classList.remove("jwtbutler-fetching"),document.documentElement.classList.remove("jwtbutler-login-form-visible")}}]),t}();n.default=s,window.jwtbutler=s},{"./_helpers":1,"babel-runtime/core-js/json/stringify":3,"babel-runtime/core-js/promise":5,"babel-runtime/helpers/classCallCheck":6,"babel-runtime/helpers/createClass":7}],3:[function(e,t,n){t.exports={default:e("core-js/library/fn/json/stringify"),__esModule:!0}},{"core-js/library/fn/json/stringify":8}],4:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/define-property"),__esModule:!0}},{"core-js/library/fn/object/define-property":9}],5:[function(e,t,n){t.exports={default:e("core-js/library/fn/promise"),__esModule:!0}},{"core-js/library/fn/promise":10}],6:[function(e,t,n){"use strict";n.__esModule=!0,n.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},{}],7:[function(e,t,n){"use strict";n.__esModule=!0;var o,r=e("../core-js/object/define-property"),i=(o=r)&&o.__esModule?o:{default:o};n.default=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,i.default)(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}()},{"../core-js/object/define-property":4}],8:[function(e,t,n){var o=e("../../modules/_core"),r=o.JSON||(o.JSON={stringify:JSON.stringify});t.exports=function(e){return r.stringify.apply(r,arguments)}},{"../../modules/_core":18}],9:[function(e,t,n){e("../../modules/es6.object.define-property");var o=e("../../modules/_core").Object;t.exports=function(e,t,n){return o.defineProperty(e,t,n)}},{"../../modules/_core":18,"../../modules/es6.object.define-property":74}],10:[function(e,t,n){e("../modules/es6.object.to-string"),e("../modules/es6.string.iterator"),e("../modules/web.dom.iterable"),e("../modules/es6.promise"),e("../modules/es7.promise.finally"),e("../modules/es7.promise.try"),t.exports=e("../modules/_core").Promise},{"../modules/_core":18,"../modules/es6.object.to-string":75,"../modules/es6.promise":76,"../modules/es6.string.iterator":77,"../modules/es7.promise.finally":78,"../modules/es7.promise.try":79,"../modules/web.dom.iterable":80}],11:[function(e,t,n){t.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},{}],12:[function(e,t,n){t.exports=function(){}},{}],13:[function(e,t,n){t.exports=function(e,t,n,o){if(!(e instanceof t)||void 0!==o&&o in e)throw TypeError(n+": incorrect invocation!");return e}},{}],14:[function(e,t,n){var o=e("./_is-object");t.exports=function(e){if(!o(e))throw TypeError(e+" is not an object!");return e}},{"./_is-object":35}],15:[function(e,t,n){var a=e("./_to-iobject"),u=e("./_to-length"),l=e("./_to-absolute-index");t.exports=function(s){return function(e,t,n){var o,r=a(e),i=u(r.length),c=l(n,i);if(s&&t!=t){for(;c<i;)if((o=r[c++])!=o)return!0}else for(;c<i;c++)if((s||c in r)&&r[c]===t)return s||c||0;return!s&&-1}}},{"./_to-absolute-index":63,"./_to-iobject":65,"./_to-length":66}],16:[function(e,t,n){var r=e("./_cof"),i=e("./_wks")("toStringTag"),c="Arguments"==r(function(){return arguments}());t.exports=function(e){var t,n,o;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),i))?n:c?r(t):"Object"==(o=r(t))&&"function"==typeof t.callee?"Arguments":o}},{"./_cof":17,"./_wks":71}],17:[function(e,t,n){var o={}.toString;t.exports=function(e){return o.call(e).slice(8,-1)}},{}],18:[function(e,t,n){var o=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=o)},{}],19:[function(e,t,n){var i=e("./_a-function");t.exports=function(o,r,e){if(i(o),void 0===r)return o;switch(e){case 1:return function(e){return o.call(r,e)};case 2:return function(e,t){return o.call(r,e,t)};case 3:return function(e,t,n){return o.call(r,e,t,n)}}return function(){return o.apply(r,arguments)}}},{"./_a-function":11}],20:[function(e,t,n){t.exports=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e}},{}],21:[function(e,t,n){t.exports=!e("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":25}],22:[function(e,t,n){var o=e("./_is-object"),r=e("./_global").document,i=o(r)&&o(r.createElement);t.exports=function(e){return i?r.createElement(e):{}}},{"./_global":27,"./_is-object":35}],23:[function(e,t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],24:[function(e,t,n){var h=e("./_global"),m=e("./_core"),v=e("./_ctx"),g=e("./_hide"),b=e("./_has"),y="prototype",j=function(e,t,n){var o,r,i,c=e&j.F,s=e&j.G,a=e&j.S,u=e&j.P,l=e&j.B,f=e&j.W,_=s?m:m[t]||(m[t]={}),d=_[y],p=s?h:a?h[t]:(h[t]||{})[y];for(o in s&&(n=t),n)(r=!c&&p&&void 0!==p[o])&&b(_,o)||(i=r?p[o]:n[o],_[o]=s&&"function"!=typeof p[o]?n[o]:l&&r?v(i,h):f&&p[o]==i?function(o){var e=function(e,t,n){if(this instanceof o){switch(arguments.length){case 0:return new o;case 1:return new o(e);case 2:return new o(e,t)}return new o(e,t,n)}return o.apply(this,arguments)};return e[y]=o[y],e}(i):u&&"function"==typeof i?v(Function.call,i):i,u&&((_.virtual||(_.virtual={}))[o]=i,e&j.R&&d&&!d[o]&&g(d,o,i)))};j.F=1,j.G=2,j.S=4,j.P=8,j.B=16,j.W=32,j.U=64,j.R=128,t.exports=j},{"./_core":18,"./_ctx":19,"./_global":27,"./_has":28,"./_hide":29}],25:[function(e,t,n){t.exports=function(e){try{return!!e()}catch(e){return!0}}},{}],26:[function(e,t,n){var _=e("./_ctx"),d=e("./_iter-call"),p=e("./_is-array-iter"),h=e("./_an-object"),m=e("./_to-length"),v=e("./core.get-iterator-method"),g={},b={};(n=t.exports=function(e,t,n,o,r){var i,c,s,a,u=r?function(){return e}:v(e),l=_(n,o,t?2:1),f=0;if("function"!=typeof u)throw TypeError(e+" is not iterable!");if(p(u)){for(i=m(e.length);f<i;f++)if((a=t?l(h(c=e[f])[0],c[1]):l(e[f]))===g||a===b)return a}else for(s=u.call(e);!(c=s.next()).done;)if((a=d(s,l,c.value,t))===g||a===b)return a}).BREAK=g,n.RETURN=b},{"./_an-object":14,"./_ctx":19,"./_is-array-iter":34,"./_iter-call":36,"./_to-length":66,"./core.get-iterator-method":72}],27:[function(e,t,n){var o=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=o)},{}],28:[function(e,t,n){var o={}.hasOwnProperty;t.exports=function(e,t){return o.call(e,t)}},{}],29:[function(e,t,n){var o=e("./_object-dp"),r=e("./_property-desc");t.exports=e("./_descriptors")?function(e,t,n){return o.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},{"./_descriptors":21,"./_object-dp":46,"./_property-desc":53}],30:[function(e,t,n){var o=e("./_global").document;t.exports=o&&o.documentElement},{"./_global":27}],31:[function(e,t,n){t.exports=!e("./_descriptors")&&!e("./_fails")(function(){return 7!=Object.defineProperty(e("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":21,"./_dom-create":22,"./_fails":25}],32:[function(e,t,n){t.exports=function(e,t,n){var o=void 0===n;switch(t.length){case 0:return o?e():e.call(n);case 1:return o?e(t[0]):e.call(n,t[0]);case 2:return o?e(t[0],t[1]):e.call(n,t[0],t[1]);case 3:return o?e(t[0],t[1],t[2]):e.call(n,t[0],t[1],t[2]);case 4:return o?e(t[0],t[1],t[2],t[3]):e.call(n,t[0],t[1],t[2],t[3])}return e.apply(n,t)}},{}],33:[function(e,t,n){var o=e("./_cof");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==o(e)?e.split(""):Object(e)}},{"./_cof":17}],34:[function(e,t,n){var o=e("./_iterators"),r=e("./_wks")("iterator"),i=Array.prototype;t.exports=function(e){return void 0!==e&&(o.Array===e||i[r]===e)}},{"./_iterators":41,"./_wks":71}],35:[function(e,t,n){t.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},{}],36:[function(e,t,n){var i=e("./_an-object");t.exports=function(t,e,n,o){try{return o?e(i(n)[0],n[1]):e(n)}catch(e){var r=t.return;throw void 0!==r&&i(r.call(t)),e}}},{"./_an-object":14}],37:[function(e,t,n){"use strict";var o=e("./_object-create"),r=e("./_property-desc"),i=e("./_set-to-string-tag"),c={};e("./_hide")(c,e("./_wks")("iterator"),function(){return this}),t.exports=function(e,t,n){e.prototype=o(c,{next:r(1,n)}),i(e,t+" Iterator")}},{"./_hide":29,"./_object-create":45,"./_property-desc":53,"./_set-to-string-tag":57,"./_wks":71}],38:[function(e,t,n){"use strict";var b=e("./_library"),y=e("./_export"),j=e("./_redefine"),k=e("./_hide"),w=e("./_iterators"),x=e("./_iter-create"),S=e("./_set-to-string-tag"),L=e("./_object-gpo"),O=e("./_wks")("iterator"),C=!([].keys&&"next"in[].keys()),P="values",T=function(){return this};t.exports=function(e,t,n,o,r,i,c){x(n,t,o);var s,a,u,l=function(e){if(!C&&e in p)return p[e];switch(e){case"keys":case P:return function(){return new n(this,e)}}return function(){return new n(this,e)}},f=t+" Iterator",_=r==P,d=!1,p=e.prototype,h=p[O]||p["@@iterator"]||r&&p[r],m=h||l(r),v=r?_?l("entries"):m:void 0,g="Array"==t&&p.entries||h;if(g&&(u=L(g.call(new e)))!==Object.prototype&&u.next&&(S(u,f,!0),b||"function"==typeof u[O]||k(u,O,T)),_&&h&&h.name!==P&&(d=!0,m=function(){return h.call(this)}),b&&!c||!C&&!d&&p[O]||k(p,O,m),w[t]=m,w[f]=T,r)if(s={values:_?m:l(P),keys:i?m:l("keys"),entries:v},c)for(a in s)a in p||j(p,a,s[a]);else y(y.P+y.F*(C||d),t,s);return s}},{"./_export":24,"./_hide":29,"./_iter-create":37,"./_iterators":41,"./_library":42,"./_object-gpo":48,"./_redefine":55,"./_set-to-string-tag":57,"./_wks":71}],39:[function(e,t,n){var i=e("./_wks")("iterator"),c=!1;try{var o=[7][i]();o.return=function(){c=!0},Array.from(o,function(){throw 2})}catch(e){}t.exports=function(e,t){if(!t&&!c)return!1;var n=!1;try{var o=[7],r=o[i]();r.next=function(){return{done:n=!0}},o[i]=function(){return r},e(o)}catch(e){}return n}},{"./_wks":71}],40:[function(e,t,n){t.exports=function(e,t){return{value:t,done:!!e}}},{}],41:[function(e,t,n){t.exports={}},{}],42:[function(e,t,n){t.exports=!0},{}],43:[function(e,t,n){var s=e("./_global"),a=e("./_task").set,u=s.MutationObserver||s.WebKitMutationObserver,l=s.process,f=s.Promise,_="process"==e("./_cof")(l);t.exports=function(){var n,o,r,e=function(){var e,t;for(_&&(e=l.domain)&&e.exit();n;){t=n.fn,n=n.next;try{t()}catch(e){throw n?r():o=void 0,e}}o=void 0,e&&e.enter()};if(_)r=function(){l.nextTick(e)};else if(!u||s.navigator&&s.navigator.standalone)if(f&&f.resolve){var t=f.resolve(void 0);r=function(){t.then(e)}}else r=function(){a.call(s,e)};else{var i=!0,c=document.createTextNode("");new u(e).observe(c,{characterData:!0}),r=function(){c.data=i=!i}}return function(e){var t={fn:e,next:void 0};o&&(o.next=t),n||(n=t,r()),o=t}}},{"./_cof":17,"./_global":27,"./_task":62}],44:[function(e,t,n){"use strict";var r=e("./_a-function");function o(e){var n,o;this.promise=new e(function(e,t){if(void 0!==n||void 0!==o)throw TypeError("Bad Promise constructor");n=e,o=t}),this.resolve=r(n),this.reject=r(o)}t.exports.f=function(e){return new o(e)}},{"./_a-function":11}],45:[function(o,e,t){var r=o("./_an-object"),i=o("./_object-dps"),c=o("./_enum-bug-keys"),s=o("./_shared-key")("IE_PROTO"),a=function(){},u="prototype",l=function(){var e,t=o("./_dom-create")("iframe"),n=c.length;for(t.style.display="none",o("./_html").appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),l=e.F;n--;)delete l[u][c[n]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(a[u]=r(e),n=new a,a[u]=null,n[s]=e):n=l(),void 0===t?n:i(n,t)}},{"./_an-object":14,"./_dom-create":22,"./_enum-bug-keys":23,"./_html":30,"./_object-dps":47,"./_shared-key":58}],46:[function(e,t,n){var o=e("./_an-object"),r=e("./_ie8-dom-define"),i=e("./_to-primitive"),c=Object.defineProperty;n.f=e("./_descriptors")?Object.defineProperty:function(e,t,n){if(o(e),t=i(t,!0),o(n),r)try{return c(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},{"./_an-object":14,"./_descriptors":21,"./_ie8-dom-define":31,"./_to-primitive":68}],47:[function(e,t,n){var c=e("./_object-dp"),s=e("./_an-object"),a=e("./_object-keys");t.exports=e("./_descriptors")?Object.defineProperties:function(e,t){s(e);for(var n,o=a(t),r=o.length,i=0;i<r;)c.f(e,n=o[i++],t[n]);return e}},{"./_an-object":14,"./_descriptors":21,"./_object-dp":46,"./_object-keys":50}],48:[function(e,t,n){var o=e("./_has"),r=e("./_to-object"),i=e("./_shared-key")("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(e){return e=r(e),o(e,i)?e[i]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?c:null}},{"./_has":28,"./_shared-key":58,"./_to-object":67}],49:[function(e,t,n){var c=e("./_has"),s=e("./_to-iobject"),a=e("./_array-includes")(!1),u=e("./_shared-key")("IE_PROTO");t.exports=function(e,t){var n,o=s(e),r=0,i=[];for(n in o)n!=u&&c(o,n)&&i.push(n);for(;t.length>r;)c(o,n=t[r++])&&(~a(i,n)||i.push(n));return i}},{"./_array-includes":15,"./_has":28,"./_shared-key":58,"./_to-iobject":65}],50:[function(e,t,n){var o=e("./_object-keys-internal"),r=e("./_enum-bug-keys");t.exports=Object.keys||function(e){return o(e,r)}},{"./_enum-bug-keys":23,"./_object-keys-internal":49}],51:[function(e,t,n){t.exports=function(e){try{return{e:!1,v:e()}}catch(e){return{e:!0,v:e}}}},{}],52:[function(e,t,n){var o=e("./_an-object"),r=e("./_is-object"),i=e("./_new-promise-capability");t.exports=function(e,t){if(o(e),r(t)&&t.constructor===e)return t;var n=i.f(e);return(0,n.resolve)(t),n.promise}},{"./_an-object":14,"./_is-object":35,"./_new-promise-capability":44}],53:[function(e,t,n){t.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},{}],54:[function(e,t,n){var r=e("./_hide");t.exports=function(e,t,n){for(var o in t)n&&e[o]?e[o]=t[o]:r(e,o,t[o]);return e}},{"./_hide":29}],55:[function(e,t,n){t.exports=e("./_hide")},{"./_hide":29}],56:[function(e,t,n){"use strict";var o=e("./_global"),r=e("./_core"),i=e("./_object-dp"),c=e("./_descriptors"),s=e("./_wks")("species");t.exports=function(e){var t="function"==typeof r[e]?r[e]:o[e];c&&t&&!t[s]&&i.f(t,s,{configurable:!0,get:function(){return this}})}},{"./_core":18,"./_descriptors":21,"./_global":27,"./_object-dp":46,"./_wks":71}],57:[function(e,t,n){var o=e("./_object-dp").f,r=e("./_has"),i=e("./_wks")("toStringTag");t.exports=function(e,t,n){e&&!r(e=n?e:e.prototype,i)&&o(e,i,{configurable:!0,value:t})}},{"./_has":28,"./_object-dp":46,"./_wks":71}],58:[function(e,t,n){var o=e("./_shared")("keys"),r=e("./_uid");t.exports=function(e){return o[e]||(o[e]=r(e))}},{"./_shared":59,"./_uid":69}],59:[function(e,t,n){var o=e("./_core"),r=e("./_global"),i="__core-js_shared__",c=r[i]||(r[i]={});(t.exports=function(e,t){return c[e]||(c[e]=void 0!==t?t:{})})("versions",[]).push({version:o.version,mode:e("./_library")?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},{"./_core":18,"./_global":27,"./_library":42}],60:[function(e,t,n){var r=e("./_an-object"),i=e("./_a-function"),c=e("./_wks")("species");t.exports=function(e,t){var n,o=r(e).constructor;return void 0===o||null==(n=r(o)[c])?t:i(n)}},{"./_a-function":11,"./_an-object":14,"./_wks":71}],61:[function(e,t,n){var a=e("./_to-integer"),u=e("./_defined");t.exports=function(s){return function(e,t){var n,o,r=String(u(e)),i=a(t),c=r.length;return i<0||c<=i?s?"":void 0:(n=r.charCodeAt(i))<55296||56319<n||i+1===c||(o=r.charCodeAt(i+1))<56320||57343<o?s?r.charAt(i):n:s?r.slice(i,i+2):o-56320+(n-55296<<10)+65536}}},{"./_defined":20,"./_to-integer":64}],62:[function(e,t,n){var o,r,i,c=e("./_ctx"),s=e("./_invoke"),a=e("./_html"),u=e("./_dom-create"),l=e("./_global"),f=l.process,_=l.setImmediate,d=l.clearImmediate,p=l.MessageChannel,h=l.Dispatch,m=0,v={},g="onreadystatechange",b=function(){var e=+this;if(v.hasOwnProperty(e)){var t=v[e];delete v[e],t()}},y=function(e){b.call(e.data)};_&&d||(_=function(e){for(var t=[],n=1;arguments.length>n;)t.push(arguments[n++]);return v[++m]=function(){s("function"==typeof e?e:Function(e),t)},o(m),m},d=function(e){delete v[e]},"process"==e("./_cof")(f)?o=function(e){f.nextTick(c(b,e,1))}:h&&h.now?o=function(e){h.now(c(b,e,1))}:p?(i=(r=new p).port2,r.port1.onmessage=y,o=c(i.postMessage,i,1)):l.addEventListener&&"function"==typeof postMessage&&!l.importScripts?(o=function(e){l.postMessage(e+"","*")},l.addEventListener("message",y,!1)):o=g in u("script")?function(e){a.appendChild(u("script"))[g]=function(){a.removeChild(this),b.call(e)}}:function(e){setTimeout(c(b,e,1),0)}),t.exports={set:_,clear:d}},{"./_cof":17,"./_ctx":19,"./_dom-create":22,"./_global":27,"./_html":30,"./_invoke":32}],63:[function(e,t,n){var o=e("./_to-integer"),r=Math.max,i=Math.min;t.exports=function(e,t){return(e=o(e))<0?r(e+t,0):i(e,t)}},{"./_to-integer":64}],64:[function(e,t,n){var o=Math.ceil,r=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(0<e?r:o)(e)}},{}],65:[function(e,t,n){var o=e("./_iobject"),r=e("./_defined");t.exports=function(e){return o(r(e))}},{"./_defined":20,"./_iobject":33}],66:[function(e,t,n){var o=e("./_to-integer"),r=Math.min;t.exports=function(e){return 0<e?r(o(e),9007199254740991):0}},{"./_to-integer":64}],67:[function(e,t,n){var o=e("./_defined");t.exports=function(e){return Object(o(e))}},{"./_defined":20}],68:[function(e,t,n){var r=e("./_is-object");t.exports=function(e,t){if(!r(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!r(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":35}],69:[function(e,t,n){var o=0,r=Math.random();t.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++o+r).toString(36))}},{}],70:[function(e,t,n){var o=e("./_global").navigator;t.exports=o&&o.userAgent||""},{"./_global":27}],71:[function(e,t,n){var o=e("./_shared")("wks"),r=e("./_uid"),i=e("./_global").Symbol,c="function"==typeof i;(t.exports=function(e){return o[e]||(o[e]=c&&i[e]||(c?i:r)("Symbol."+e))}).store=o},{"./_global":27,"./_shared":59,"./_uid":69}],72:[function(e,t,n){var o=e("./_classof"),r=e("./_wks")("iterator"),i=e("./_iterators");t.exports=e("./_core").getIteratorMethod=function(e){if(null!=e)return e[r]||e["@@iterator"]||i[o(e)]}},{"./_classof":16,"./_core":18,"./_iterators":41,"./_wks":71}],73:[function(e,t,n){"use strict";var o=e("./_add-to-unscopables"),r=e("./_iter-step"),i=e("./_iterators"),c=e("./_to-iobject");t.exports=e("./_iter-define")(Array,"Array",function(e,t){this._t=c(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,r(1)):r(0,"keys"==t?n:"values"==t?e[n]:[n,e[n]])},"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},{"./_add-to-unscopables":12,"./_iter-define":38,"./_iter-step":40,"./_iterators":41,"./_to-iobject":65}],74:[function(e,t,n){var o=e("./_export");o(o.S+o.F*!e("./_descriptors"),"Object",{defineProperty:e("./_object-dp").f})},{"./_descriptors":21,"./_export":24,"./_object-dp":46}],75:[function(e,t,n){},{}],76:[function(n,e,t){"use strict";var o,r,i,c,s=n("./_library"),a=n("./_global"),u=n("./_ctx"),l=n("./_classof"),f=n("./_export"),_=n("./_is-object"),d=n("./_a-function"),p=n("./_an-instance"),h=n("./_for-of"),m=n("./_species-constructor"),v=n("./_task").set,g=n("./_microtask")(),b=n("./_new-promise-capability"),y=n("./_perform"),j=n("./_user-agent"),k=n("./_promise-resolve"),w="Promise",x=a.TypeError,S=a.process,L=S&&S.versions,O=L&&L.v8||"",C=a[w],P="process"==l(S),T=function(){},E=r=b.f,M=!!function(){try{var e=C.resolve(1),t=(e.constructor={})[n("./_wks")("species")]=function(e){e(T,T)};return(P||"function"==typeof PromiseRejectionEvent)&&e.then(T)instanceof t&&0!==O.indexOf("6.6")&&-1===j.indexOf("Chrome/66")}catch(e){}}(),A=function(e){var t;return!(!_(e)||"function"!=typeof(t=e.then))&&t},q=function(l,n){if(!l._n){l._n=!0;var o=l._c;g(function(){for(var a=l._v,u=1==l._s,e=0,t=function(e){var t,n,o,r=u?e.ok:e.fail,i=e.resolve,c=e.reject,s=e.domain;try{r?(u||(2==l._h&&R(l),l._h=1),!0===r?t=a:(s&&s.enter(),t=r(a),s&&(s.exit(),o=!0)),t===e.promise?c(x("Promise-chain cycle")):(n=A(t))?n.call(t,i,c):i(t)):c(a)}catch(e){s&&!o&&s.exit(),c(e)}};o.length>e;)t(o[e++]);l._c=[],l._n=!1,n&&!l._h&&F(l)})}},F=function(i){v.call(a,function(){var e,t,n,o=i._v,r=G(i);if(r&&(e=y(function(){P?S.emit("unhandledRejection",o,i):(t=a.onunhandledrejection)?t({promise:i,reason:o}):(n=a.console)&&n.error&&n.error("Unhandled promise rejection",o)}),i._h=P||G(i)?2:1),i._a=void 0,r&&e.e)throw e.v})},G=function(e){return 1!==e._h&&0===(e._a||e._c).length},R=function(t){v.call(a,function(){var e;P?S.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},I=function(e){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),q(t,!0))},N=function(e){var n,o=this;if(!o._d){o._d=!0,o=o._w||o;try{if(o===e)throw x("Promise can't be resolved itself");(n=A(e))?g(function(){var t={_w:o,_d:!1};try{n.call(e,u(N,t,1),u(I,t,1))}catch(e){I.call(t,e)}}):(o._v=e,o._s=1,q(o,!1))}catch(e){I.call({_w:o,_d:!1},e)}}};M||(C=function(e){p(this,C,w,"_h"),d(e),o.call(this);try{e(u(N,this,1),u(I,this,1))}catch(e){I.call(this,e)}},(o=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n("./_redefine-all")(C.prototype,{then:function(e,t){var n=E(m(this,C));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=P?S.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&q(this,!1),n.promise},catch:function(e){return this.then(void 0,e)}}),i=function(){var e=new o;this.promise=e,this.resolve=u(N,e,1),this.reject=u(I,e,1)},b.f=E=function(e){return e===C||e===c?new i(e):r(e)}),f(f.G+f.W+f.F*!M,{Promise:C}),n("./_set-to-string-tag")(C,w),n("./_set-species")(w),c=n("./_core")[w],f(f.S+f.F*!M,w,{reject:function(e){var t=E(this);return(0,t.reject)(e),t.promise}}),f(f.S+f.F*(s||!M),w,{resolve:function(e){return k(s&&this===c?C:this,e)}}),f(f.S+f.F*!(M&&n("./_iter-detect")(function(e){C.all(e).catch(T)})),w,{all:function(e){var c=this,t=E(c),s=t.resolve,a=t.reject,n=y(function(){var o=[],r=0,i=1;h(e,!1,function(e){var t=r++,n=!1;o.push(void 0),i++,c.resolve(e).then(function(e){n||(n=!0,o[t]=e,--i||s(o))},a)}),--i||s(o)});return n.e&&a(n.v),t.promise},race:function(e){var t=this,n=E(t),o=n.reject,r=y(function(){h(e,!1,function(e){t.resolve(e).then(n.resolve,o)})});return r.e&&o(r.v),n.promise}})},{"./_a-function":11,"./_an-instance":13,"./_classof":16,"./_core":18,"./_ctx":19,"./_export":24,"./_for-of":26,"./_global":27,"./_is-object":35,"./_iter-detect":39,"./_library":42,"./_microtask":43,"./_new-promise-capability":44,"./_perform":51,"./_promise-resolve":52,"./_redefine-all":54,"./_set-species":56,"./_set-to-string-tag":57,"./_species-constructor":60,"./_task":62,"./_user-agent":70,"./_wks":71}],77:[function(e,t,n){"use strict";var o=e("./_string-at")(!0);e("./_iter-define")(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=o(t,n),this._i+=e.length,{value:e,done:!1})})},{"./_iter-define":38,"./_string-at":61}],78:[function(e,t,n){"use strict";var o=e("./_export"),r=e("./_core"),i=e("./_global"),c=e("./_species-constructor"),s=e("./_promise-resolve");o(o.P+o.R,"Promise",{finally:function(t){var n=c(this,r.Promise||i.Promise),e="function"==typeof t;return this.then(e?function(e){return s(n,t()).then(function(){return e})}:t,e?function(e){return s(n,t()).then(function(){throw e})}:t)}})},{"./_core":18,"./_export":24,"./_global":27,"./_promise-resolve":52,"./_species-constructor":60}],79:[function(e,t,n){"use strict";var o=e("./_export"),r=e("./_new-promise-capability"),i=e("./_perform");o(o.S,"Promise",{try:function(e){var t=r.f(this),n=i(e);return(n.e?t.reject:t.resolve)(n.v),t.promise}})},{"./_export":24,"./_new-promise-capability":44,"./_perform":51}],80:[function(e,t,n){e("./es6.array.iterator");for(var o=e("./_global"),r=e("./_hide"),i=e("./_iterators"),c=e("./_wks")("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),a=0;a<s.length;a++){var u=s[a],l=o[u],f=l&&l.prototype;f&&!f[c]&&r(f,c,u),i[u]=i.Array}},{"./_global":27,"./_hide":29,"./_iterators":41,"./_wks":71,"./es6.array.iterator":73}]},{},[2]);