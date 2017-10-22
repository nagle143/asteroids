!function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/asteroids/",e(e.s=3)}([function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),n=function(){function t(e,i,r,n,o,a){s(this,t),this.startX=e,this.startY=i,this.x=e,this.y=i,this.life=a,this.color=o,this.speed=n,this.speedX=Math.cos(r)*this.speed,this.speedY=-Math.sin(r)*this.speed,this.decayDistance=Math.randomBetween(10,50)}return r(t,[{key:"update",value:function(){var t=this.startX-this.x,e=this.startY-this.y;this.life--,this.decayDistance*this.decayDistance<=t*t+e*e||(this.x+=this.speedX,this.y+=this.speedY)}},{key:"render",value:function(t){t.save(),t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,1,0,2*Math.PI),t.closePath(),t.fill(),t.restore()}}]),t}();e.a=n},function(t,e,i){"use strict";function s(){}function r(t){try{return t.then}catch(t){return m=t,x}}function n(t,e){try{return t(e)}catch(t){return m=t,x}}function o(t,e,i){try{t(e,i)}catch(t){return m=t,x}}function a(t){if("object"!==typeof this)throw new TypeError("Promises must be constructed via new");if("function"!==typeof t)throw new TypeError("Promise constructor's argument is not a function");this._75=0,this._83=0,this._18=null,this._38=null,t!==s&&y(t,this)}function h(t,e,i){return new t.constructor(function(r,n){var o=new a(s);o.then(r,n),u(t,new p(e,i,o))})}function u(t,e){for(;3===t._83;)t=t._18;if(a._47&&a._47(t),0===t._83)return 0===t._75?(t._75=1,void(t._38=e)):1===t._75?(t._75=2,void(t._38=[t._38,e])):void t._38.push(e);c(t,e)}function c(t,e){v(function(){var i=1===t._83?e.onFulfilled:e.onRejected;if(null===i)return void(1===t._83?l(e.promise,t._18):f(e.promise,t._18));var s=n(i,t._18);s===x?f(e.promise,m):l(e.promise,s)})}function l(t,e){if(e===t)return f(t,new TypeError("A promise cannot be resolved with itself."));if(e&&("object"===typeof e||"function"===typeof e)){var i=r(e);if(i===x)return f(t,m);if(i===t.then&&e instanceof a)return t._83=3,t._18=e,void d(t);if("function"===typeof i)return void y(i.bind(e),t)}t._83=1,t._18=e,d(t)}function f(t,e){t._83=2,t._18=e,a._71&&a._71(t,e),d(t)}function d(t){if(1===t._75&&(u(t,t._38),t._38=null),2===t._75){for(var e=0;e<t._38.length;e++)u(t,t._38[e]);t._38=null}}function p(t,e,i){this.onFulfilled="function"===typeof t?t:null,this.onRejected="function"===typeof e?e:null,this.promise=i}function y(t,e){var i=!1,s=o(t,function(t){i||(i=!0,l(e,t))},function(t){i||(i=!0,f(e,t))});i||s!==x||(i=!0,f(e,m))}var v=i(6),m=null,x={};t.exports=a,a._47=null,a._71=null,a._44=s,a.prototype.then=function(t,e){if(this.constructor!==a)return h(this,t,e);var i=new a(s);return u(this,new p(t,e,i)),i}},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=i(0),n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),o=function(){function t(){s(this,t),this.x=500,this.y=500,this.velocity={mag:0,dir:0},this.speed={x:0,y:0},this.radius=15,this.particles=[],this.color="green"}return n(t,[{key:"updateSpeed",value:function(){this.speed.y+=-Math.cos(this.velocity.dir)*this.velocity.mag,this.speed.x+=Math.sin(this.velocity.dir)*this.velocity.mag,Math.abs(this.speed.x)>=3&&(this.speed.x<0?this.speed.x=-3:this.speed.x=3),Math.abs(this.speed.y)>=3&&(this.speed.y<0?this.speed.y=-3:this.speed.y=3)}},{key:"edgeDetection",value:function(){this.x<=-this.radius&&(this.x=1e3),this.y<=-this.radius&&(this.y=1e3),this.x>=1e3+this.radius&&(this.x=0),this.y>=1e3+this.radius&&(this.y=0)}},{key:"createParticles",value:function(t){for(var e=this.x-Math.sin(this.velocity.dir)*this.radius,i=this.y+Math.cos(this.velocity.dir)*this.radius,s=0;s<t;s++){var n=e+Math.randomBetween(-3,3),o=i+Math.randomBetween(-3,3);this.particles.push(new r.a(n,o,Math.PI*this.velocity.dir,2,"red",20))}}},{key:"update",value:function(){this.edgeDetection(),this.x+=this.speed.x,this.y+=this.speed.y;for(var t=0;t<this.particles.length;t++)this.particles[t].update(),this.particles[t].life<=0&&this.particles.splice(t,1)}},{key:"render",value:function(t){t.save(),t.strokeStyle=this.color,t.beginPath(),t.translate(this.x,this.y),t.rotate(this.velocity.dir),t.moveTo(0,-this.radius),t.lineTo(10,this.radius),t.lineTo(0,this.radius/1.5),t.lineTo(-10,this.radius),t.lineTo(0,-this.radius),t.stroke(),t.restore(),this.particles.forEach(function(e){e.render(t)})}}]),t}();e.a=o},function(t,e,i){i(4),t.exports=i(11)},function(t,e,i){"use strict";"undefined"===typeof Promise&&(i(5).enable(),window.Promise=i(8)),i(9),Object.assign=i(10)},function(t,e,i){"use strict";function s(){u=!1,a._47=null,a._71=null}function r(t){function e(e){(t.allRejections||o(l[e].error,t.whitelist||h))&&(l[e].displayId=c++,t.onUnhandled?(l[e].logged=!0,t.onUnhandled(l[e].displayId,l[e].error)):(l[e].logged=!0,n(l[e].displayId,l[e].error)))}function i(e){l[e].logged&&(t.onHandled?t.onHandled(l[e].displayId,l[e].error):l[e].onUnhandled||(console.warn("Promise Rejection Handled (id: "+l[e].displayId+"):"),console.warn('  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+l[e].displayId+".")))}t=t||{},u&&s(),u=!0;var r=0,c=0,l={};a._47=function(t){2===t._83&&l[t._56]&&(l[t._56].logged?i(t._56):clearTimeout(l[t._56].timeout),delete l[t._56])},a._71=function(t,i){0===t._75&&(t._56=r++,l[t._56]={displayId:null,error:i,timeout:setTimeout(e.bind(null,t._56),o(i,h)?100:2e3),logged:!1})}}function n(t,e){console.warn("Possible Unhandled Promise Rejection (id: "+t+"):"),((e&&(e.stack||e))+"").split("\n").forEach(function(t){console.warn("  "+t)})}function o(t,e){return e.some(function(e){return t instanceof e})}var a=i(1),h=[ReferenceError,TypeError,RangeError],u=!1;e.disable=s,e.enable=r},function(t,e,i){"use strict";(function(e){function i(t){o.length||(n(),a=!0),o[o.length]=t}function s(){for(;h<o.length;){var t=h;if(h+=1,o[t].call(),h>u){for(var e=0,i=o.length-h;e<i;e++)o[e]=o[e+h];o.length-=h,h=0}}o.length=0,h=0,a=!1}function r(t){return function(){function e(){clearTimeout(i),clearInterval(s),t()}var i=setTimeout(e,0),s=setInterval(e,50)}}t.exports=i;var n,o=[],a=!1,h=0,u=1024,c="undefined"!==typeof e?e:self,l=c.MutationObserver||c.WebKitMutationObserver;n="function"===typeof l?function(t){var e=1,i=new l(t),s=document.createTextNode("");return i.observe(s,{characterData:!0}),function(){e=-e,s.data=e}}(s):r(s),i.requestFlush=n,i.makeRequestCallFromTimer=r}).call(e,i(7))},function(t,e){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"===typeof window&&(i=window)}t.exports=i},function(t,e,i){"use strict";function s(t){var e=new r(r._44);return e._83=1,e._18=t,e}var r=i(1);t.exports=r;var n=s(!0),o=s(!1),a=s(null),h=s(void 0),u=s(0),c=s("");r.resolve=function(t){if(t instanceof r)return t;if(null===t)return a;if(void 0===t)return h;if(!0===t)return n;if(!1===t)return o;if(0===t)return u;if(""===t)return c;if("object"===typeof t||"function"===typeof t)try{var e=t.then;if("function"===typeof e)return new r(e.bind(t))}catch(t){return new r(function(e,i){i(t)})}return s(t)},r.all=function(t){var e=Array.prototype.slice.call(t);return new r(function(t,i){function s(o,a){if(a&&("object"===typeof a||"function"===typeof a)){if(a instanceof r&&a.then===r.prototype.then){for(;3===a._83;)a=a._18;return 1===a._83?s(o,a._18):(2===a._83&&i(a._18),void a.then(function(t){s(o,t)},i))}var h=a.then;if("function"===typeof h){return void new r(h.bind(a)).then(function(t){s(o,t)},i)}}e[o]=a,0===--n&&t(e)}if(0===e.length)return t([]);for(var n=e.length,o=0;o<e.length;o++)s(o,e[o])})},r.reject=function(t){return new r(function(e,i){i(t)})},r.race=function(t){return new r(function(e,i){t.forEach(function(t){r.resolve(t).then(e,i)})})},r.prototype.catch=function(t){return this.then(null,t)}},function(t,e){!function(t){"use strict";function e(t){if("string"!==typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function i(t){return"string"!==typeof t&&(t=String(t)),t}function s(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return m.iterable&&(e[Symbol.iterator]=function(){return e}),e}function r(t){this.map={},t instanceof r?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function n(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function o(t){return new Promise(function(e,i){t.onload=function(){e(t.result)},t.onerror=function(){i(t.error)}})}function a(t){var e=new FileReader,i=o(e);return e.readAsArrayBuffer(t),i}function h(t){var e=new FileReader,i=o(e);return e.readAsText(t),i}function u(t){for(var e=new Uint8Array(t),i=new Array(e.length),s=0;s<e.length;s++)i[s]=String.fromCharCode(e[s]);return i.join("")}function c(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"===typeof t)this._bodyText=t;else if(m.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(m.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(m.arrayBuffer&&m.blob&&w(t))this._bodyArrayBuffer=c(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!m.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!b(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=c(t)}else this._bodyText="";this.headers.get("content-type")||("string"===typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},m.blob&&(this.blob=function(){var t=n(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?n(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=n(this);if(t)return t;if(this._bodyBlob)return h(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(u(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},m.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function f(t){var e=t.toUpperCase();return g.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var i=e.body;if(t instanceof d){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new r(t.headers)),this.method=t.method,this.mode=t.mode,i||null==t._bodyInit||(i=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new r(e.headers)),this.method=f(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&i)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var i=t.split("="),s=i.shift().replace(/\+/g," "),r=i.join("=").replace(/\+/g," ");e.append(decodeURIComponent(s),decodeURIComponent(r))}}),e}function y(t){var e=new r;return t.split(/\r?\n/).forEach(function(t){var i=t.split(":"),s=i.shift().trim();if(s){var r=i.join(":").trim();e.append(s,r)}}),e}function v(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new r(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var m={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(m.arrayBuffer)var x=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],w=function(t){return t&&DataView.prototype.isPrototypeOf(t)},b=ArrayBuffer.isView||function(t){return t&&x.indexOf(Object.prototype.toString.call(t))>-1};r.prototype.append=function(t,s){t=e(t),s=i(s);var r=this.map[t];this.map[t]=r?r+","+s:s},r.prototype.delete=function(t){delete this.map[e(t)]},r.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},r.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},r.prototype.set=function(t,s){this.map[e(t)]=i(s)},r.prototype.forEach=function(t,e){for(var i in this.map)this.map.hasOwnProperty(i)&&t.call(e,this.map[i],i,this)},r.prototype.keys=function(){var t=[];return this.forEach(function(e,i){t.push(i)}),s(t)},r.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),s(t)},r.prototype.entries=function(){var t=[];return this.forEach(function(e,i){t.push([i,e])}),s(t)},m.iterable&&(r.prototype[Symbol.iterator]=r.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this,{body:this._bodyInit})},l.call(d.prototype),l.call(v.prototype),v.prototype.clone=function(){return new v(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},v.error=function(){var t=new v(null,{status:0,statusText:""});return t.type="error",t};var M=[301,302,303,307,308];v.redirect=function(t,e){if(-1===M.indexOf(e))throw new RangeError("Invalid status code");return new v(null,{status:e,headers:{location:t}})},t.Headers=r,t.Request=d,t.Response=v,t.fetch=function(t,e){return new Promise(function(i,s){var r=new d(t,e),n=new XMLHttpRequest;n.onload=function(){var t={status:n.status,statusText:n.statusText,headers:y(n.getAllResponseHeaders()||"")};t.url="responseURL"in n?n.responseURL:t.headers.get("X-Request-URL");var e="response"in n?n.response:n.responseText;i(new v(e,t))},n.onerror=function(){s(new TypeError("Network request failed"))},n.ontimeout=function(){s(new TypeError("Network request failed"))},n.open(r.method,r.url,!0),"include"===r.credentials&&(n.withCredentials=!0),"responseType"in n&&m.blob&&(n.responseType="blob"),r.headers.forEach(function(t,e){n.setRequestHeader(e,t)}),n.send("undefined"===typeof r._bodyInit?null:r._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!==typeof self?self:this)},function(t,e,i){"use strict";function s(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;i<10;i++)e["_"+String.fromCharCode(i)]=i;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(t){s[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},s)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var i,a,h=s(t),u=1;u<arguments.length;u++){i=Object(arguments[u]);for(var c in i)n.call(i,c)&&(h[c]=i[c]);if(r){a=r(i);for(var l=0;l<a.length;l++)o.call(i,a[l])&&(h[a[l]]=i[a[l]])}}return h}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(12),r=i(16);i.n(r);new s.a},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=i(2),n=i(13),o=i(14),a=i(0),h=i(15),u=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}();Math.randomBetween=function(t,e){return Math.random()*(e-t)+t},Math.randomInt=function(t,e){return Math.floor(Math.random()*(e-t))+t};var c=function(){function t(){s(this,t),this.screenSide=1e3,this.numAsteroids=10,this.ship=new r.a,this.ufos=[],this.MAXUFO=5,this.ufoTimer=Math.randomInt(500,1e3),this.respawning=!1,this.respawnTimer=300,this.projectiles=[],this.rateOfFire=40,this.reloading=!1,this.asteroids=[],this.createAsteroids(),this.particles=[],this.score=0,this.highscore=0,this.lives=3,this.level=1,this.teleports=10,this.coolingDown=50,this.gameOver=!1,this.paused=!1,this.theme=new Audio("./theme.wav"),this.theme.volume=.3,this.theme.loop=!0,this.theme.play(),this.over=new Audio("./gameOver.wav"),this.collisionSound=new Audio("collision.wav"),this.explosion=new Audio("./Explosion.wav"),this.shipExplosion=new Audio("./shipExplosion.wav"),this.laser=new Audio("./LaserShoot.wav"),this.ufoLaser=new Audio("./ufoShot.wav"),this.teleportSound=new Audio("./teleport.wav"),this.keyMap={32:!1,37:!1,38:!1,39:!1,65:!1,68:!1,70:!1,87:!1,88:!1},this.HUDcanvas=document.getElementById("ui"),this.HUDcanvas.width=this.screenSide,this.HUDcanvas.height=100,this.HUDcontext=this.HUDcanvas.getContext("2d"),document.body.appendChild(this.HUDcanvas),this.backBufferCanvas=document.getElementById("canvas"),this.backBufferCanvas.width=this.screenSide,this.backBufferCanvas.height=this.screenSide,this.backBufferContext=this.backBufferCanvas.getContext("2d"),this.screenBufferCanvas=document.getElementById("canvas"),this.screenBufferCanvas.width=this.screenSide,this.screenBufferCanvas.height=this.screenSide,document.body.appendChild(this.screenBufferCanvas),this.screenBufferContext=this.screenBufferCanvas.getContext("2d"),this.loop=this.loop.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),window.onkeydown=this.handleKeyDown,window.onkeyup=this.handleKeyUp,this.interval=setInterval(this.loop,50/3)}return u(t,[{key:"masterReset",value:function(){this.ship=new r.a,this.ufos=[],this.ufoTimer=Math.randomInt(1e3,5e3),this.respawning=!1,this.respawnTimer=300,this.projectiles=[],this.rateOfFire=40,this.reloading=!1,this.asteroids=[],this.createAsteroids(),this.particles=[],this.score=0,this.lives=3,this.level=1,this.teleports=10,this.coolingDown=50,this.gameOver=!1,this.paused=!1,this.theme.loop=!0,this.theme.play()}},{key:"handleKeyDown",value:function(t){t.preventDefault(),this.keyMap[t.keyCode]=!0,80===t.keyCode&&(this.paused?this.paused=!1:this.paused=!0),192===t.keyCode&&this.masterReset()}},{key:"handleKeyUp",value:function(t){t.preventDefault(),this.keyMap[t.keyCode]=!1}},{key:"createProjectile",value:function(){var t=this.ship.x+Math.sin(this.ship.velocity.dir)*this.ship.radius*1.2,e=this.ship.y-Math.cos(this.ship.velocity.dir)*this.ship.radius*1.2;this.projectiles.push(new o.a(t,e,this.ship.velocity.dir,this.ship.color))}},{key:"ufoProjectile",value:function(t,e,i){var s=t.x-e,r=t.y-i,n=Math.sqrt(s*s+r*r),a=Math.acos(r/n);s>0&&(a*=-1);var h=t.x+Math.sin(a)*t.radius*1.2,u=t.y-Math.cos(a)*t.radius*1.2;this.projectiles.push(new o.a(h,u,a,t.color)),this.ufoLaser.play()}},{key:"createAsteroids",value:function(){for(;this.asteroids.length<this.numAsteroids;)this.addAsteroid(-1)}},{key:"addAsteroid",value:function(t){for(var e,i,s,r,o=this.asteroids.length;o===this.asteroids.length;){var a=!1,h=Math.randomInt(1,5);r=Math.randomBetween(10,75),s=r,1===h?(e=Math.randomBetween(-2*s,this.screenSide+2*s),i=-2*s):2===h?(e=this.screenSide+2*s,i=Math.randomBetween(-2*s,this.screenSide+2*s)):3===h?(e=Math.randomBetween(-2*s,this.screenSide+2*s),i=this.screenSide+2*s):(e=-2*s,i=Math.randomBetween(-2*s,this.screenSide+2*s)),this.asteroids.forEach(function(t){t.collisionDetection(e,i,s)&&(a=!0)}),a||this.asteroids.push(new n.a(e,i,r,t))}}},{key:"addUFO",value:function(){for(var t,e,i=this,s=this.ufos.length;s===this.ufos.length;){var r=!1,n=Math.randomInt(1,5);1===n?(t=Math.randomBetween(-50,1050),e=-50):2===n?(t=1050,e=Math.randomBetween(-50,1050)):3===n?(t=Math.randomBetween(-50,1050),e=1050):(t=-50,e=Math.randomBetween(-50,1050)),this.asteroids.forEach(function(s){i.circleCollision(t,e,65,s.x,s.y,s.radius)&&(r=!0)}),r||this.ufos.push(new h.a(t,e))}}},{key:"rotate",value:function(t,e){return{x:t.x*Math.cos(e)-t.y*Math.sin(e),y:t.x*Math.sin(e)+t.y*Math.cos(e)}}},{key:"particleCollision",value:function(t,e){var i=t.velocity.x-e.velocity.x,s=t.velocity.y-e.velocity.y;if(i*(e.x-t.x)+s*(e.y-t.y)>=0){var r=-Math.atan2(e.y-t.y,e.x-t.x),n=t.mass,o=e.mass,a=this.rotate(t.velocity,r),h=this.rotate(e.velocity,r),u={x:(a.x*(n-o)+2*o*h.x)/(n+o),y:a.y},c={x:(h.x*(o-n)+2*n*a.x)/(n+o),y:h.y},l=this.rotate(u,-r),f=this.rotate(c,-r);t.velocity.x=l.x,t.velocity.y=l.y,e.velocity.x=f.x,e.velocity.y=f.y}}},{key:"circleCollision",value:function(t,e,i,s,r,n){var o=t-s,a=e-r;return o*o+a*a<(i+n)*(i+n)}},{key:"projectileDodger",value:function(t,e){var i=t.x-e.x,s=t.y-e.y,r=i*i+s*s;return r<(t.radius+e.radius)*(t.radius+e.radius)||(t.bufferRadius,e.radius,t.bufferRadius,e.radius,!1)}},{key:"handleAsteriodExplosion",value:function(t){var e=this.asteroids[t],i=e.mass,s=e.x,r=e.y;if(this.asteroids.splice(t,1),this.explosion.play(),this.score+=Math.floor(100/i),i>=15){var o=Math.randomInt(2,4);this.numAsteroids+=o-1,i/=o;for(var a=Math.randomBetween(0,2*Math.PI),h=2*Math.PI/o,u=0;u<o;u++){var c=s+Math.cos(a)*i,l=r-Math.sin(a)*i;this.asteroids.push(new n.a(c,l,i,a)),a+=h}}else this.numAsteroids--}},{key:"detectShipCrash",value:function(t,e){var i=t.x-e.x,s=t.y-e.y,r=i*i+s*s;return r<Math.pow(e.radius+t.radius,2)||(r<Math.pow(t.bufferRadius+e.radius,2)&&(t.alterPath(i,s),r<Math.pow(t.critical+e.radius,2)&&this.ufoProjectile(t,e.x,e.y)),!1)}},{key:"explode",value:function(t,e,i){for(var s=Math.randomInt(30,70),r=Math.randomBetween(0,2*Math.PI),n=0;n<s;n++)Math.randomInt(0,100)>90&&(r=Math.randomBetween(0,2*Math.PI)),this.particles.push(new a.a(t,e,Math.PI*r,3,i,20))}},{key:"teleport",value:function(){var t=this,e=Math.randomBetween(100,900),i=Math.randomBetween(100,900),s=!1;do{s&&(e=Math.randomBetween(100,900),i=Math.randomBetween(100,900),s=!1),this.ufos.forEach(function(r){t.circleCollision(e,i,t.ship.radius,r.x,r.y,r.radius+100)&&(s=!0)}),this.asteroids.forEach(function(r){t.circleCollision(e,i,t.ship.radius,r.x,r.y,r.radius+50)&&(s=!0)}),this.projectiles.forEach(function(r){t.circleCollision(r.x,r.y,r.radius,e,i,t.ship.radius+50)&&(s=!0)})}while(s);this.explode(this.ship.x,this.ship.y,this.ship.color),this.explode(e,i,this.ship.color),this.teleportSound.play(),this.ship.x=e,this.ship.y=i,this.ship.speed.x=0,this.ship.speed.y=0}},{key:"respawn",value:function(){this.respawning=!0,this.lives--,this.lives>=0?this.ship=new r.a:(this.gameOver=!0,this.theme.loop=!1,this.theme.pause(),this.over.play())}},{key:"destoryUFO",value:function(t){this.score+=this.ufos[t].bounty,200===this.ufos[t].bounty&&this.lives++,this.ufos.splice(t,1),this.shipExplosion.play()}},{key:"checkHighScore",value:function(){this.score>this.highscore&&(this.highscore=this.score)}},{key:"drawHUD",value:function(){this.HUDcontext.fillStyle="black",this.HUDcontext.strokeStyle="blue",this.HUDcontext.fillRect(0,0,this.screenSide,100),this.HUDcontext.font="30px Times New Roman",this.HUDcontext.strokeText("LIVES: "+this.lives,10,50),this.HUDcontext.strokeText("LEVEL: "+this.level,400,50),this.HUDcontext.strokeText("SCORE: "+this.score,800,50),this.HUDcontext.strokeText("TELEPORTS: "+this.teleports,550,50),this.HUDcontext.strokeText("HIGHSCORE: "+this.highscore,150,50),this.HUDcontext.font="20px Times New Roman",this.HUDcontext.strokeText("CONTROLS: ",10,75),this.HUDcontext.strokeText("W: Thurster  A: Rotate Left  D: Rotate Right  Space: Shoot  F: Teleport  P: Pause  ~: Reset",150,75)}},{key:"update",value:function(){var t=this;this.ship.update(),this.ufos.forEach(function(t){t.update()}),this.asteroids.forEach(function(t){t.update()}),0===this.asteroids.length&&(this.level++,this.lives+=this.level,this.teleports+=this.level,this.numAsteroids=10+2*this.level,this.createAsteroids()),this.ufoTimer>0&&this.ufos.length<=this.MAXUFO&&--this.ufoTimer<=0&&(this.addUFO(),this.ufoTimer=Math.randomInt(500,1e3)),this.respawning&&--this.respawnTimer<=0&&(this.respawnTimer=300,this.respawning=!1);for(var e=0;e<this.asteroids.length;e++)for(var i=e+1;i<this.asteroids.length;i++)this.asteroids[e].collisionDetection(this.asteroids[i].x,this.asteroids[i].y,this.asteroids[i].radius)&&(this.particleCollision(this.asteroids[e],this.asteroids[i]),this.collisionSound.play());for(var s=0;s<this.projectiles.length;s++)for(var r=0;r<this.asteroids.length;r++)if(this.circleCollision(this.projectiles[s].x,this.projectiles[s].y,this.projectiles[s].radius,this.asteroids[r].x,this.asteroids[r].y,this.asteroids[r].radius)){this.explode(this.projectiles[s].x,this.projectiles[s].y,this.projectiles[s].color),this.projectiles.splice(s,1),this.explode(this.asteroids[r].x,this.asteroids[r].y,"white"),this.handleAsteriodExplosion(r);break}this.respawning||this.asteroids.forEach(function(e){t.circleCollision(t.ship.x,t.ship.y,t.ship.radius,e.x,e.y,e.radius)&&(t.explode(t.ship.x,t.ship.y,t.ship.color),t.shipExplosion.play(),t.respawn())});for(var n=0;n<this.ufos.length;n++)for(var o=0;o<this.asteroids.length;o++)if(this.detectShipCrash(this.ufos[n],this.asteroids[o])){this.explode(this.ufos[n].x,this.ufos[n].y,this.ufos[n].color),this.destoryUFO(n);break}if(this.ufos.length>1)for(var a=0;a<this.ufos.length;a++)for(var h=a+1;h<this.ufos.length;h++)if(this.circleCollision(this.ufos[a].x,this.ufos[a].y,this.ufos[a].critical,this.ufos[h].x,this.ufos[h].y,this.ufos[h].critical)){var u=this.ufos[a].x-this.ufos[h].x,c=this.ufos[a].y-this.ufos[h].y;"purple"===this.ufos[a].color&&this.ufoProjectile(this.ufos[a],this.ufos[h].x,this.ufos[h].y),"purple"===this.ufos[h].color&&this.ufoProjectile(this.ufos[h],this.ufos[a].x,this.ufos[a].y),this.ufos[a].alterPath(u,c),this.ufos[h].alterPath(-u,-c)}this.respawning||this.ufos.forEach(function(e){t.circleCollision(t.ship.x,t.ship.y,t.ship.radius,e.x,e.y,e.radius)&&(t.explode(t.ship.x,t.ship.y,t.ship.color),t.shipExplosion.play(),t.respawn())});for(var l=0;l<this.projectiles.length;l++){if(!this.respawning&&this.circleCollision(this.projectiles[l].x,this.projectiles[l].y,this.projectiles[l].radius,this.ship.x,this.ship.y,this.ship.radius)){this.explode(this.ship.x,this.ship.y,this.ship.color),this.explode(this.projectiles[l].x,this.projectiles[l].y,this.projectiles[l].color),this.projectiles.splice(l,1),this.shipExplosion.play(),this.respawn();break}for(var f=0;f<this.ufos.length;f++)if(this.circleCollision(this.projectiles[l].x,this.projectiles[l].y,this.projectiles[l].radius,this.ufos[f].x,this.ufos[f].y,this.ufos[f].radius)){this.explode(this.ufos[f].x,this.ufos[f].y,this.ufos[f].color),this.explode(this.projectiles[l].x,this.projectiles[l].y,this.projectiles[l].color),this.projectiles.splice(l,1),this.destoryUFO(f),this.shipExplosion.play();break}}if((this.keyMap[65]||this.keyMap[37])&&(this.ship.velocity.dir-=.05,this.ship.velocity.dir<=2*-Math.PI&&(this.ship.velocity.dir=0)),(this.keyMap[68]||this.keyMap[39])&&(this.ship.velocity.dir+=.05,this.ship.velocity.dir>=2*Math.PI&&(this.ship.velocity.dir=0)),(this.keyMap[87]||this.keyMap[38])&&(this.respawnTimer<=150||!this.respawning)){this.ship.velocity.mag=.1,this.ship.updateSpeed();var d=Math.floor(Math.randomBetween(2,6));this.ship.createParticles(d)}this.keyMap[32]&&40===this.rateOfFire&&!this.respawning&&(this.createProjectile(),this.laser.play(),this.reloading=!0),this.keyMap[70]&&this.teleports>0&&!this.respawning&&50===this.coolingDown&&(this.teleport(),this.teleports--,this.coolingDown--),this.reloading&&--this.rateOfFire<=0&&(this.rateOfFire=40,this.reloading=!1);for(var p=0;p<this.ufos.length;p++){var y=this.ufos[p];y.rateOfFire--,y.rateOfFire<=0&&("purple"===y.color&&this.ufos.length>1&&Math.random()>.5?p+1<this.ufos.length?this.ufoProjectile(y,this.ufos[p+1].x,this.ufos[p+1].y):p-1>=0&&this.ufoProjectile(y,this.ufos[p-1].x,this.ufos[p-1].y):this.ufoProjectile(y,this.ship.x,this.ship.y),y.setRateOfFire())}this.coolingDown<50&&--this.coolingDown<=0&&(this.coolingDown=50);for(var v=0;v<this.projectiles.length;v++)this.projectiles[v].update(),this.projectiles[v].edgeDetection()&&this.projectiles.splice(v,1);for(var m=0;m<this.particles.length;m++)this.particles[m].update(),this.particles[m].life<=0&&this.particles.splice(m,1);this.checkHighScore()}},{key:"render",value:function(){var t=this;this.backBufferContext.fillStyle="black",this.backBufferContext.strokeStyle="blue",this.backBufferContext.font="50px Times New Roman",this.backBufferContext.fillRect(0,0,this.screenSide,this.screenSide),this.drawHUD(),this.respawning&&!this.gameOver&&(this.backBufferContext.save(),this.backBufferContext.globalAlpha=.5,this.backBufferContext.strokeText("RESPAWNING",350,500),this.backBufferContext.restore()),this.ufos.forEach(function(e){e.render(t.backBufferContext)}),(!this.respawning||this.respawnTimer<=150)&&this.ship.render(this.backBufferContext),this.asteroids.forEach(function(e){e.render(t.backBufferContext)}),this.projectiles.forEach(function(e){e.render(t.backBufferContext)}),this.particles.forEach(function(e){e.render(t.backBufferContext)}),this.screenBufferContext.drawImage(this.backBufferCanvas,0,0)}},{key:"loop",value:function(){this.paused||this.gameOver||(this.update(),this.render()),this.gameOver&&(this.screenBufferContext.font="50px Times New Roman",this.screenBufferContext.strokeText("GAME OVER",350,500),this.screenBufferContext.strokeText("Retry? Press ~",360,600)),this.paused&&(this.screenBufferContext.font="50px Times New Roman",this.screenBufferContext.strokeText("Paused",425,600))}}]),t}();e.a=c},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),n=function(){function t(e,i,r,n){s(this,t),this.x=e,this.y=i,r<5&&(r=5),this.mass=r,this.radius=r,this.surfacePath=[],this.createSurface(),this.direction=n,this.velocity={x:0,y:0},this.angle=0,-1===this.direction?this.initVelocity():this.explodedVelocity()}return r(t,[{key:"initVelocity",value:function(){var t=Math.randomInt(8,10)/this.mass;this.x<0?this.velocity.x=Math.randomBetween(1,t):this.x>1e3+this.radius?this.velocity.x=-Math.randomBetween(1,t):this.velocity.x=Math.randomBetween(-t,t),this.y<0?this.velocity.y=Math.randomBetween(1,t):this.y>1e3+this.radius?this.velocity.y=-Math.randomBetween(1,t):this.velocity.y=Math.randomBetween(-t,t)}},{key:"createSurface",value:function(){for(var t,e,i=2*Math.PI/24,s=this.radius,r=0;r<24;r++)Math.randomInt(0,100)>70&&(s=Math.randomBetween(.8*this.radius,this.radius)),t=Math.cos(r*i)*s,e=-Math.sin(r*i)*s,this.surfacePath.push({x:t,y:e})}},{key:"explodedVelocity",value:function(){var t=Math.randomInt(9,12)/this.mass;this.velocity.x=Math.cos(this.direction)*t,this.velocity.y=-Math.sin(this.direction)*t}},{key:"collisionDetection",value:function(t,e,i){var s=this.x-t,r=this.y-e;return!(Math.abs(s)>this.radius+i||Math.abs(r)>this.radius+i)&&s*s+r*r<Math.pow(this.radius+i,2)}},{key:"edgeDetection",value:function(){this.x>=1e3+2.5*this.radius?this.x=-2.4*this.radius:this.x<=-2.5*this.radius&&(this.x=1e3+2.4*this.radius),this.y>=1e3+2.5*this.radius?this.y=-2.4*this.radius:this.y<=-2.5*this.radius&&(this.y=1e3+2.4*this.radius)}},{key:"update",value:function(){this.edgeDetection(),this.velocity.x>0?this.angle+=.01:this.angle-=.01,this.x+=this.velocity.x,this.y+=this.velocity.y}},{key:"render",value:function(t){t.save(),t.strokeStyle="white",t.translate(this.x,this.y),t.rotate(this.angle),t.beginPath(),t.moveTo(this.surfacePath[0].x,this.surfacePath[0].y);for(var e=1;e<this.surfacePath.length;e++)t.lineTo(this.surfacePath[e].x,this.surfacePath[e].y);t.closePath(),t.stroke(),t.restore()}}]),t}();e.a=n},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=i(0),n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),o=function(){function t(e,i,r,n){s(this,t),this.x=e,this.y=i,this.radius=3.5,this.color=n,this.velocity={mag:5,dir:r},this.speed={x:0,y:0},this.initSpeed(),this.particles=[]}return n(t,[{key:"createParticles",value:function(t){for(var e=this.x-Math.sin(this.velocity.dir)*this.radius,i=this.y+Math.cos(this.velocity.dir)*this.radius,s=0;s<t;s++){var n=e+Math.randomBetween(-this.radius,this.radius),o=i+Math.randomBetween(-this.radius,this.radius);this.particles.push(new r.a(n,o,Math.PI*this.velocity.dir,1,this.color,10))}}},{key:"initSpeed",value:function(){this.speed.x=Math.sin(this.velocity.dir)*this.velocity.mag,this.speed.y=-Math.cos(this.velocity.dir)*this.velocity.mag}},{key:"edgeDetection",value:function(){return this.x+this.radius>=1e3||this.x-this.radius<=0||this.y+this.radius>=1e3||this.y-this.radius<=0}},{key:"update",value:function(){this.createParticles(Math.randomInt(3,6)),this.x+=this.speed.x,this.y+=this.speed.y;for(var t=0;t<this.particles.length;t++)this.particles[t].update(),this.particles[t].life<=0&&this.particles.splice(t,1)}},{key:"render",value:function(t){t.save(),t.strokeStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.stroke(),t.restore(),this.particles.forEach(function(e){e.render(t)})}}]),t}();e.a=o},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}function n(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=i(2),a=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),h=function(t){function e(t,i){s(this,e);var n=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.x=t,n.y=i,n.initVelocity(),n.innerRadius=10,n.radius=25,n.bufferRadius=60,n.critical=40,n.color,n.bounty,n.setColor(),n.rateOfFire=0,n.setRateOfFire(),n.lineSegments=[],n.initLineSegments(),n}return n(e,t),a(e,[{key:"setColor",value:function(){var t,e=Math.randomInt(0,101);e>80?(t="purple",this.bounty=200):e>50?(t="blue",this.bounty=150):(t="orange",this.bounty=100),this.color=t}},{key:"setRateOfFire",value:function(){"purple"===this.color?this.rateOfFire=Math.randomInt(150,350):"blue"===this.color?this.rateOfFire=Math.randomInt(300,700):this.rateOfFire=Math.randomInt(500,1e3)}},{key:"initLineSegments",value:function(){for(var t,e,i,s,r=0;r<6;r++){var n=Math.cos(r*Math.PI/3),o=Math.sin(r*Math.PI/3);t=n*this.innerRadius,e=n*this.radius,i=-o*this.innerRadius,s=-o*this.radius,this.lineSegments.push({xI:t,xF:e,yI:i,yF:s})}}},{key:"initVelocity",value:function(){var t=Math.randomBetween(2,3);this.speed.x=Math.randomBetween(-t,t),this.speed.y=Math.randomBetween(-t,t)}},{key:"initPosition",value:function(){var t=Math.randomInt(1,5);1===t?(this.x=Math.randomBetween(-2*this.radius,1e3+2*this.radius),this.y=-2*this.radius):2===t?(this.x=1e3+2*this.radius,this.y=Math.randomBetween(-2*this.radius,1e3+2*this.radius)):3===t?(this.x=Math.randomBetween(-2*this.radius,1e3+2*this.radius),this.y=1e3+2*this.radius):(this.x=-2*this.radius,this.y=Math.randomBetween(-2*this.radius,1e3+2*this.radius))}},{key:"edgeDetection",value:function(){(this.x+this.bufferRadius>=1e3&&this.speed.x>0||this.x-this.bufferRadius<=0&&this.speed.x<0)&&(this.speed.x=-this.speed.x),(this.y+this.bufferRadius>=1e3&&this.speed.y>0||this.y-this.bufferRadius<=0&&this.speed.y<0)&&(this.speed.y=-this.speed.y)}},{key:"alterPath",value:function(t,e){t<0&&e<0?(this.speed.x=Math.randomBetween(-2,-1),this.speed.y=Math.randomBetween(-2,-1)):t>0&&e>0?(this.speed.x=Math.randomBetween(1,2),this.speed.y=Math.randomBetween(1,2)):t>0&&e<0?(this.speed.x=Math.randomBetween(1,2),this.speed.y=Math.randomBetween(-2,-1)):(this.speed.x=Math.randomBetween(-2,-1),this.speed.y=Math.randomBetween(1,2))}},{key:"avoidProjectile",value:function(t,e,i){}},{key:"update",value:function(){this.edgeDetection(),this.speed.x>0?this.velocity.dir+=.01:this.velocity.dir-=.01,this.x+=this.speed.x,this.y+=this.speed.y}},{key:"render",value:function(t){t.save(),t.strokeStyle=this.color,t.translate(this.x,this.y),t.rotate(this.velocity.dir),t.beginPath(),t.arc(0,0,this.innerRadius,0,2*Math.PI),t.closePath(),t.stroke(),t.beginPath(),t.arc(0,0,this.radius,0,2*Math.PI),t.closePath(),t.stroke(),t.beginPath(),this.lineSegments.forEach(function(e){t.beginPath(),t.moveTo(e.xI,e.yI),t.lineTo(e.xF,e.yF),t.stroke()}),t.restore()}}]),e}(o.a);e.a=h},function(t,e){}]);
//# sourceMappingURL=main.cd1f0015.js.map