!function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require
if(!a&&u)return u(s,!0)
if(o)return o(s,!0)
throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}}
t[s][0].call(c.exports,function(e){var n=t[s][1][e]
return i(n?n:e)},c,c.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s])
return i}({1:[function(e,t,n){var r=e("levelup"),i=e("localstorage-down"),o=function(e){return new i(e)}
t.exports={clearCache:function(){var e=r("noddity-content",{db:o})
e.createKeyStream().on("data",function(t){e.del(t)})}}},{levelup:26,"localstorage-down":50}],2:[function(e,t,n){var r=e("noddity-butler"),i=e("levelup"),o=e("noddity-linkifier"),s=e("localstorage-down"),a=e("./routing"),u=e("./mainViewModel"),c=e("level-sublevel"),l=noddityConfig,h=function(e){return new s(e)},f=c(i("noddity-content-2",{db:h})),p=l.title.replace(/[^\w]+/g,""),d=l.debug?{refreshEvery:3e4}:{cacheCheckIntervalMs:6e4},m=new r(l.noddityRoot,f.sublevel(p),d),g=new o(l.pathPrefix+l.pagePathPrefix),v=a()
new u(m,g,v)
l.debug&&(window.debug=e("./debug"))},{"./debug":1,"./mainViewModel":3,"./routing":4,"level-sublevel":12,levelup:26,"localstorage-down":50,"noddity-butler":61,"noddity-linkifier":106}],3:[function(e,t,n){function r(){}function i(e,t,n){e.findAll("a[href]").forEach(function(e){var r=e.getAttribute("href")
r&&"#"===r[0]&&0!==r.indexOf(t)&&e.setAttribute("href",t+n+r)})}var o=e("ractive"),s=noddityConfig,a=e("noddity-renderer")
t.exports=function(e,t,n){function u(e){console.log(e)}function c(){e.getPosts(function(e,t){e?u(e):v.set("postList",t.reverse().filter(function(e){return"string"==typeof e.metadata.title}).map(function(e){return{title:e.metadata.title,filename:e.filename}}))})}function l(t){e.getPost(t,function(e,r){e?(m.set("html",e.message),d.set("page",null),t!==s.errorPage&&n.emit("404")):(d.set("page",r.metadata.title),p?p(r):p=f.populateRootRactive(r,m),i(m,"#!/"+s.pagePathPrefix,t),v.get("postList")||c(),n.emit("loaded",t))}),e.refreshPost(t)}function h(e,t,n){function r(n){return n.filename===e&&n.title!==t.metadata.title}var i=v.get("postList")
i&&i.some(r)&&c()}var f=new a(e,t.linkify),p=null,d=new o({el:"title",template:"{{title}}{{#page}} | {{page}}{{/page}}",data:{title:s.title}}),m=new o({el:"main",template:"#template-main",data:Object.create(s)}),g=s.sidebar?"{{{html}}}":"#template-menu",v=new o({el:"sidebar",template:g,data:Object.create(s)})
s.sidebar&&e.getPost(s.sidebar,function(e,t){e?v.set("html",e.message):f.populateRootRactive(t,v)}),t.on("link",function(t){e.getPost(t,r)}),e.on("post changed",h),e.on("index changed",c),n.on("current",l)}},{"noddity-renderer":107,ractive:175}],4:[function(e,t,n){function r(e){var t=document.getElementById(e)
t&&window.scrollTo(0,t.offsetTop)}var i=noddityConfig,o=e("events").EventEmitter,s=e("hash-brown-router")
t.exports=function(){var e=s(),t=new o,n=null
return t.on("404",function(){e.replace("!/"+i.pagePathPrefix+i.errorPage)}),t.on("current",function(){window.scrollTo(0,0)}),e.add("!/",function(){t.emit("current","index.md")}),e.add("!/"+i.pagePathPrefix+":name([^#]+)#:anchor",function(e){n===e.name?r(e.anchor):(t.emit("current",e.name),n=e.name,t.once("loaded",function(){r(e.anchor)}))}),e.add("!/"+i.pagePathPrefix+":name([^#]+)",function(e){t.emit("current",e.name)}),e.setDefault(function(e){t.emit("404",e)}),setTimeout(e.evaluateCurrent.bind(null,"!/"),0),t}},{events:181,"hash-brown-router":6}],5:[function(e,t,n){function r(e,t){e.location.replace(e.location.origin+e.location.pathname+"#"+t)}function i(e,t){e.location.hash=t}function o(e){return s(e.location.hash)}function s(e){return e&&"#"===e[0]?e.substr(1):e}var a=e("events").EventEmitter
t.exports=function(e){var t=new a,n=""
return e.addEventListener("hashchange",function(){n!==t.get()&&(n=t.get(),t.emit("hashchange"))}),t.go=i.bind(null,e),t.replace=r.bind(null,e),t.get=o.bind(null,e),t}},{events:181}],6:[function(e,t,n){function r(e,t){o(e,t.get())}function i(e){var t=e.split("?")
return{path:t.shift(),queryString:h.parse(t.join(""))}}function o(e,t){var n=i(t)
t=n.path
var r=n.queryString,o=e.find("".match,t)
if(o){var a=o.exec(t),u=s(o.keys,a),c=f(r,u)
o.fn(c)}else e.defaultFn&&e.defaultFn(t,r)}function s(e,t){return e.reduce(function(e,n,r){return e[n.name]=t[r+1],e},{})}function a(e,t,n){if("function"!=typeof n)throw new Error("The router add function must be passed a callback function")
var r=l(t)
r.fn=n,e.push(r)}function u(e,t,n){t.get()?r(e,t):t.go(n)}function c(e,t){e.defaultFn=t}var l=e("path-to-regexp-with-reversible-keys"),h=e("querystring"),f=e("xtend"),p=e("./hash-location.js")
e("array.prototype.find"),t.exports=function(e){function t(){e.removeListener("hashchange",i)}e||(e=p(window))
var n=[],i=r.bind(null,n,e)
return e.on("hashchange",i),{add:a.bind(null,n),stop:t,evaluateCurrent:u.bind(null,n,e),setDefault:c.bind(null,n),replace:e.replace,go:e.go}}},{"./hash-location.js":5,"array.prototype.find":7,"path-to-regexp-with-reversible-keys":8,querystring:187,xtend:10}],7:[function(e,t,n){!function(e){if(!Array.prototype.find){var t=function(e){var t=Object(this),n=t.length<0?0:t.length>>>0
if(0===n)return void 0
if("function"!=typeof e||"[object Function]"!==Object.prototype.toString.call(e))throw new TypeError("Array#find: predicate must be a function")
for(var r,i=arguments[1],o=0;n>o;o++)if(r=t[o],e.call(i,r,o,t))return r
return void 0}
if(Object.defineProperty)try{Object.defineProperty(Array.prototype,"find",{value:t,configurable:!0,enumerable:!1,writable:!0})}catch(n){}Array.prototype.find||(Array.prototype.find=t)}}(this)},{}],8:[function(e,t,n){function r(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function i(e,t,n){return e.keys=t,e.allTokens=n,e}function o(e){return e.sensitive?"":"i"}function s(e,t,n){var r=e.source.match(/\((?!\?)/g)
if(r)for(var o=0;o<r.length;o++)t.push({name:o,delimiter:null,optional:!1,repeat:!1})
return i(e,t,n)}function a(e,t,n,r){for(var s=[],a=0;a<e.length;a++)s.push(c(e[a],t,n,r).source)
var u=new RegExp("(?:"+s.join("|")+")",o(n))
return i(u,t,r)}function u(e,t,n){function i(e){0===a&&"/"!==e[0]&&(e="/"+e),n.push({string:e})}function o(o,u,c,l,h,f,p,d,m){if(u)return u
if(d)return"\\"+d
var g="+"===p||"*"===p,v="?"===p||"*"===p
m>a&&i(e.substring(a,m)),a=m+o.length
var y={name:l||s++,delimiter:c||"/",optional:v,repeat:g}
return t.push(y),n.push(y),c=c?"\\"+c:"",h=r(h||f||"[^"+(c||"\\/")+"]+?"),g&&(h=h+"(?:"+c+h+")*"),v?"(?:"+c+"("+h+"))?":c+"("+h+")"}var s=0,a=0,u=e.replace(h,o)
return a<e.length&&i(e.substring(a)),u}function c(e,t,n,r){if(t=t||[],r=r||[],l(t)?n||(n={}):(n=t,t=[]),e instanceof RegExp)return s(e,t,n,r)
if(l(e))return a(e,t,n,r)
var c=n.strict,h=n.end!==!1,f=u(e,t,r),p="/"===e.charAt(e.length-1)
return c||(f=(p?f.slice(0,-2):f)+"(?:\\/(?=$))?"),f+=h?"$":c&&p?"":"(?=\\/|$)",i(new RegExp("^"+f,o(n)),t,r)}var l=e("isarray")
t.exports=c
var h=new RegExp(["(\\\\.)","([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?","([.+*?=^!:${}()[\\]|\\/])"].join("|"),"g")},{isarray:9}],9:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],10:[function(e,t,n){function r(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t]
for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e}t.exports=r},{}],11:[function(e,t,n){function r(e,t,n,r){var i={type:e,key:t,value:n,options:r}
return r&&r.prefix&&(i.prefix=r.prefix,delete r.prefix),this._operations.push(i),this}function i(e){this._operations=[],this._sdb=e,this.put=r.bind(this,"put"),this.del=r.bind(this,"del")}var o=i.prototype
o.clear=function(){this._operations=[]},o.write=function(e){this._sdb.batch(this._operations,e)},t.exports=i},{}],12:[function(e,t,n){(function(n){var r=(e("events").EventEmitter,n.nextTick,e("./sub")),i=e("./batch"),o=e("level-fix-range"),s=e("level-hooks")
t.exports=function(e,t){function n(){}function a(e){return function(t){return t=t||{},t=o(t),t.reverse?t.start=t.start||c:t.end=t.end||c,e.call(u,t)}}n.prototype=e
var u=new n
if(u.sublevel)return u
t=t||{}
var c=t.sep=t.sep||"ÿ"
u._options=t,s(u),u.sublevels={},u.sublevel=function(e,t){return u.sublevels[e]?u.sublevels[e]:new r(u,e,t||this._options)},u.methods={},u.prefix=function(e){return""+(e||"")},u.pre=function(e,t){return t||(t=e,e={max:c}),u.hooks.pre(e,t)},u.post=function(e,t){return t||(t=e,e={max:c}),u.hooks.post(e,t)},u.readStream=u.createReadStream=a(u.createReadStream),u.keyStream=u.createKeyStream=a(u.createKeyStream),u.valuesStream=u.createValueStream=a(u.createValueStream)
var l=u.batch
return u.batch=function(e,t,n){return Array.isArray(e)?(e.forEach(function(e){e.prefix&&("function"==typeof e.prefix.prefix?e.key=e.prefix.prefix(e.key):"string"==typeof e.prefix&&(e.key=e.prefix+e.key))}),void l.call(u,e,t,n)):new i(u)},u}}).call(this,e("WuQzkM"))},{"./batch":11,"./sub":23,WuQzkM:183,events:181,"level-fix-range":13,"level-hooks":15}],13:[function(e,t,n){var r=e("clone")
t.exports=function(e){e=r(e)
var t=e.reverse,n=e.max||e.end,i=e.min||e.start,o=[i,n]
return null!=i&&null!=n&&o.sort(),t&&(o=o.reverse()),e.start=o[0],e.end=o[1],delete e.min,delete e.max,e}},{clone:14}],14:[function(e,t,n){(function(e){"use strict"
function n(e){return Object.prototype.toString.call(e)}function r(t,n,r,o){function s(t,r){if(null===t)return null
if(0==r)return t
var l,h
if("object"!=typeof t)return t
if(i.isArray(t))l=[]
else if(i.isRegExp(t))l=new RegExp(t.source,i.getRegExpFlags(t)),t.lastIndex&&(l.lastIndex=t.lastIndex)
else if(i.isDate(t))l=new Date(t.getTime())
else{if(c&&e.isBuffer(t))return l=new e(t.length),t.copy(l),l
"undefined"==typeof o?(h=Object.getPrototypeOf(t),l=Object.create(h)):(l=Object.create(o),h=o)}if(n){var f=a.indexOf(t)
if(-1!=f)return u[f]
a.push(t),u.push(l)}for(var p in t){var d
h&&(d=Object.getOwnPropertyDescriptor(h,p)),d&&null==d.set||(l[p]=s(t[p],r-1))}return l}var a=[],u=[],c="undefined"!=typeof e
return"undefined"==typeof n&&(n=!0),"undefined"==typeof r&&(r=1/0),s(t,r)}var i={isArray:function(e){return Array.isArray(e)||"object"==typeof e&&"[object Array]"===n(e)},isDate:function(e){return"object"==typeof e&&"[object Date]"===n(e)},isRegExp:function(e){return"object"==typeof e&&"[object RegExp]"===n(e)},getRegExpFlags:function(e){var t=""
return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}}
"object"==typeof t&&(t.exports=r),r.clonePrototype=function(e){if(null===e)return null
var t=function(){}
return t.prototype=e,new t}}).call(this,e("buffer").Buffer)},{buffer:177}],15:[function(e,t,n){var r=e("string-range")
t.exports=function(e){function t(e){return e&&("string"==typeof e?e:"string"==typeof e.prefix?e.prefix:"function"==typeof e.prefix?e.prefix():"")}function n(e){return e&&e._getKeyEncoding?e._getKeyEncoding(e):void 0}function i(e){return e&&e._getValueEncoding?e._getValueEncoding(e):void 0}function o(e,t){return function(){var n=e.indexOf(t)
return~n?(e.splice(n,1),!0):!1}}function s(e){e&&e.type&&u.forEach(function(t){t.test(e.key)&&t.hook(e)})}function a(r,o,s,a){try{o.forEach(function d(e,r){c.forEach(function(s){if(s.test(String(e.key))){var a={add:function(e,a){if("undefined"==typeof e)return this
if(e===!1)return delete o[r]
var u=t(e.prefix)||t(a)||s.prefix||""
if(u&&(e.prefix=u),e.key=u+e.key,s.safe&&s.test(String(e.key)))throw new Error("prehook cannot insert into own range")
var c=e.keyEncoding||n(e.prefix),l=e.valueEncoding||i(e.prefix)
return c&&(e.keyEncoding=c),l&&(e.valueEncoding=l),o.push(e),d(e,o.length-1),this},put:function(e,t){return"object"==typeof e&&(e.type="put"),this.add(e,t)},del:function(e,t){return"object"==typeof e&&(e.type="del"),this.add(e,t)},veto:function(){return this.add(!1)}}
s.hook.call(a,e,a.add,o)}})})}catch(u){return(a||s)(u)}if(o=o.filter(function(e){return e&&e.type}),1==o.length&&!r){var p=o[0]
return"put"==p.type?l.call(e,p.key,p.value,s,a):h.call(e,p.key,s,a)}return f.call(e,o,s,a)}if(!e.hooks){var u=[],c=[]
e.hooks={post:function(e,t){t||(t=e,e="")
var n={test:r.checker(e),hook:t}
return u.push(n),o(u,n)},pre:function(e,t){t||(t=e,e="")
var n={test:r.checker(e),hook:t,safe:!1!==e.safe}
return c.push(n),o(c,n)},posthooks:u,prehooks:c},e.on("put",function(e,t){s({type:"put",key:e,value:t})}),e.on("del",function(e,t){s({type:"del",key:e,value:t})}),e.on("batch",function(e){e.forEach(s)})
var l=e.put,h=e.del,f=e.batch
e.put=function(e,t,n,r){var i=[{key:e,value:t,type:"put"}]
return a(!1,i,n,r)},e.del=function(e,t,n){var r=[{key:e,type:"del"}]
return a(!1,r,t,n)},e.batch=function(e,t,n){return a(!0,e,t,n)}}}},{"string-range":16}],16:[function(e,t,n){var r=n.range=function(e){return null==e?{}:"string"==typeof r?{min:r,max:r+"ÿ"}:e},i=(n.prefix=function(e,t,r){e=n.range(e)
var i={}
return r=r||"ÿ",e instanceof RegExp||"function"==typeof e?(i.min=t,i.max=t+r,i.inner=function(n){var r=n.substring(t.length)
return e.test?e.test(r):e(r)}):"object"==typeof e&&(i.min=t+(e.min||e.start||""),i.max=t+(e.max||e.end||r||"~"),i.reverse=!!e.reverse),i},n.checker=function(e){return e||(e={}),"string"==typeof e?function(t){return 0==t.indexOf(e)}:e instanceof RegExp?function(t){return e.test(t)}:"object"==typeof e?function(t){var n=e.min||e.start,r=e.max||e.end
return t=String(t),(!n||t>=n)&&(!r||r>=t)&&(!e.inner||(e.inner.test?e.inner.test(t):e.inner(t)))}:"function"==typeof e?e:void 0})
n.satisfies=function(e,t){return i(t)(e)}},{}],17:[function(e,t,n){function r(e){return null!==e&&("object"==typeof e||"function"==typeof e)}t.exports=r},{}],18:[function(e,t,n){function r(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t]
if(o(n))for(var r=i(n),s=0;s<r.length;s++){var a=r[s]
e[a]=n[a]}}return e}var i=e("object-keys"),o=e("./has-keys")
t.exports=r},{"./has-keys":17,"object-keys":19}],19:[function(e,t,n){t.exports=Object.keys||e("./shim")},{"./shim":22}],20:[function(e,t,n){var r=Object.prototype.hasOwnProperty,i=Object.prototype.toString
t.exports=function(e,t,n){if("[object Function]"!==i.call(t))throw new TypeError("iterator must be a function")
var o=e.length
if(o===+o)for(var s=0;o>s;s++)t.call(n,e[s],s,e)
else for(var a in e)r.call(e,a)&&t.call(n,e[a],a,e)}},{}],21:[function(e,t,n){var r=Object.prototype,i=r.hasOwnProperty,o=r.toString,s=function(e){return e!==e},a={"boolean":1,number:1,string:1,undefined:1},u=t.exports={}
u.a=u.type=function(e,t){return typeof e===t},u.defined=function(e){return void 0!==e},u.empty=function(e){var t,n=o.call(e)
if("[object Array]"===n||"[object Arguments]"===n)return 0===e.length
if("[object Object]"===n){for(t in e)if(i.call(e,t))return!1
return!0}return"[object String]"===n?""===e:!1},u.equal=function(e,t){var n,r=o.call(e)
if(r!==o.call(t))return!1
if("[object Object]"===r){for(n in e)if(!u.equal(e[n],t[n]))return!1
return!0}if("[object Array]"===r){if(n=e.length,n!==t.length)return!1
for(;--n;)if(!u.equal(e[n],t[n]))return!1
return!0}return"[object Function]"===r?e.prototype===t.prototype:"[object Date]"===r?e.getTime()===t.getTime():e===t},u.hosted=function(e,t){var n=typeof t[e]
return"object"===n?!!t[e]:!a[n]},u.instance=u["instanceof"]=function(e,t){return e instanceof t},u["null"]=function(e){return null===e},u.undefined=function(e){return void 0===e},u.arguments=function(e){var t="[object Arguments]"===o.call(e),n=!u.array(e)&&u.arraylike(e)&&u.object(e)&&u.fn(e.callee)
return t||n},u.array=function(e){return"[object Array]"===o.call(e)},u.arguments.empty=function(e){return u.arguments(e)&&0===e.length},u.array.empty=function(e){return u.array(e)&&0===e.length},u.arraylike=function(e){return!!e&&!u["boolean"](e)&&i.call(e,"length")&&isFinite(e.length)&&u.number(e.length)&&e.length>=0},u["boolean"]=function(e){return"[object Boolean]"===o.call(e)},u["false"]=function(e){return u["boolean"](e)&&(e===!1||e.valueOf()===!1)},u["true"]=function(e){return u["boolean"](e)&&(e===!0||e.valueOf()===!0)},u.date=function(e){return"[object Date]"===o.call(e)},u.element=function(e){return void 0!==e&&"undefined"!=typeof HTMLElement&&e instanceof HTMLElement&&1===e.nodeType},u.error=function(e){return"[object Error]"===o.call(e)},u.fn=u["function"]=function(e){var t="undefined"!=typeof window&&e===window.alert
return t||"[object Function]"===o.call(e)},u.number=function(e){return"[object Number]"===o.call(e)},u.infinite=function(e){return e===1/0||e===-(1/0)},u.decimal=function(e){return u.number(e)&&!s(e)&&!u.infinite(e)&&e%1!==0},u.divisibleBy=function(e,t){var n=u.infinite(e),r=u.infinite(t),i=u.number(e)&&!s(e)&&u.number(t)&&!s(t)&&0!==t
return n||r||i&&e%t===0},u["int"]=function(e){return u.number(e)&&!s(e)&&e%1===0},u.maximum=function(e,t){if(s(e))throw new TypeError("NaN is not a valid value")
if(!u.arraylike(t))throw new TypeError("second argument must be array-like")
for(var n=t.length;--n>=0;)if(e<t[n])return!1
return!0},u.minimum=function(e,t){if(s(e))throw new TypeError("NaN is not a valid value")
if(!u.arraylike(t))throw new TypeError("second argument must be array-like")
for(var n=t.length;--n>=0;)if(e>t[n])return!1
return!0},u.nan=function(e){return!u.number(e)||e!==e},u.even=function(e){return u.infinite(e)||u.number(e)&&e===e&&e%2===0},u.odd=function(e){return u.infinite(e)||u.number(e)&&e===e&&e%2!==0},u.ge=function(e,t){if(s(e)||s(t))throw new TypeError("NaN is not a valid value")
return!u.infinite(e)&&!u.infinite(t)&&e>=t},u.gt=function(e,t){if(s(e)||s(t))throw new TypeError("NaN is not a valid value")
return!u.infinite(e)&&!u.infinite(t)&&e>t},u.le=function(e,t){if(s(e)||s(t))throw new TypeError("NaN is not a valid value")
return!u.infinite(e)&&!u.infinite(t)&&t>=e},u.lt=function(e,t){if(s(e)||s(t))throw new TypeError("NaN is not a valid value")
return!u.infinite(e)&&!u.infinite(t)&&t>e},u.within=function(e,t,n){if(s(e)||s(t)||s(n))throw new TypeError("NaN is not a valid value")
if(!u.number(e)||!u.number(t)||!u.number(n))throw new TypeError("all arguments must be numbers")
var r=u.infinite(e)||u.infinite(t)||u.infinite(n)
return r||e>=t&&n>=e},u.object=function(e){return e&&"[object Object]"===o.call(e)},u.hash=function(e){return u.object(e)&&e.constructor===Object&&!e.nodeType&&!e.setInterval},u.regexp=function(e){return"[object RegExp]"===o.call(e)},u.string=function(e){return"[object String]"===o.call(e)}},{}],22:[function(e,t,n){!function(){"use strict"
var n,r=Object.prototype.hasOwnProperty,i=e("is"),o=e("foreach"),s=!{toString:null}.propertyIsEnumerable("toString"),a=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]
n=function(e){if(!i.object(e)&&!i.array(e))throw new TypeError("Object.keys called on a non-object")
var t,n=[]
for(t in e)r.call(e,t)&&n.push(t)
return s&&o(a,function(t){r.call(e,t)&&n.push(t)}),n},t.exports=n}()},{foreach:20,is:21}],23:[function(e,t,n){function r(e,t,n){if("string"==typeof n&&(console.error("db.sublevel(name, seperator<string>) is depreciated"),console.error("use db.sublevel(name, {sep: separator})) if you must"),n={sep:n}),!(this instanceof r))return new r(e,t,n)
if(!e)throw new Error("must provide db")
if(!t)throw new Error("must provide prefix")
n=n||{},n.sep=n.sep||"ÿ",this._parent=e,this._options=n,this.options=n,this._prefix=t,this._root=o(this),e.sublevels[t]=this,this.sublevels={},this.methods={}
var i=this
this.hooks={pre:function(){return i.pre.apply(i,arguments)},post:function(){return i.post.apply(i,arguments)}}}function i(e,t){["valueEncoding","encoding","keyEncoding","reverse","values","keys","limit","fillCache"].forEach(function(n){t.hasOwnProperty(n)&&(e[n]=t[n])})}function o(e){return e._parent?o(e._parent):e}var s=e("events").EventEmitter,a=e("util").inherits,u=e("string-range"),c=e("level-fix-range"),l=e("xtend"),h=e("./batch")
a(r,s)
var f=r.prototype
f._key=function(e){var t=this._options.sep
return t+this._prefix+t+e},f._getOptsAndCb=function(e,t){return"function"==typeof e&&(t=e,e={}),{opts:l(e,this._options),cb:t}},f.sublevel=function(e,t){return this.sublevels[e]?this.sublevels[e]:new r(this,e,t||this._options)},f.put=function(e,t,n,r){var i=this._getOptsAndCb(n,r)
this._root.put(this.prefix(e),t,i.opts,i.cb)},f.get=function(e,t,n){var r=this._getOptsAndCb(t,n)
this._root.get(this.prefix(e),r.opts,r.cb)},f.del=function(e,t,n){var r=this._getOptsAndCb(t,n)
this._root.del(this.prefix(e),r.opts,r.cb)},f.batch=function(e,t,n){if(!Array.isArray(e))return new h(this)
var r=this,i=this._getOptsAndCb(t,n)
e.forEach(function(e){"string"==typeof e.prefix?e.key=e.prefix+e.key:e.key=(e.prefix||r).prefix(e.key),e.prefix&&(e.prefix=null)}),this._root.batch(e,i.opts,i.cb)},f._getKeyEncoding=function(){return this.options.keyEncoding?this.options.keyEncoding:this._parent&&this._parent._getKeyEncoding?this._parent._getKeyEncoding():void 0},f._getValueEncoding=function(){return this.options.valueEncoding?this.options.valueEncoding:this._parent&&this._parent._getValueEncoding?this._parent._getValueEncoding():void 0},f.prefix=function(e){var t=this._options.sep
return this._parent.prefix()+t+this._prefix+t+(e||"")},f.keyStream=f.createKeyStream=function(e){return e=e||{},e.keys=!0,e.values=!1,this.createReadStream(e)},f.valueStream=f.createValueStream=function(e){return e=e||{},e.keys=!1,e.values=!0,e.keys=!1,this.createReadStream(e)},f.readStream=f.createReadStream=function(e){e=e||{}
var t=o(this),n=this.prefix(),r=u.prefix(e,n)
i(r,l(e,this._options))
var s=t.createReadStream(r)
if(r.values===!1){var a=s.read
if(a)s.read=function(e){var t=a.call(this,e)
return t&&(t=t.substring(n.length)),t}
else{var c=s.emit
s.emit=function(e,t){"data"===e?c.call(this,"data",t.substring(n.length)):c.call(this,e,t)}}return s}if(r.keys===!1)return s
var a=s.read
return a?s.read=function(e){var t=a.call(this,e)
return t&&(t.key=t.key.substring(n.length)),t}:s.on("data",function(e){e.key=e.key.substring(n.length)}),s},f.writeStream=f.createWriteStream=function(){var e=o(this),t=this.prefix(),n=e.createWriteStream.apply(e,arguments),r=n.write,i=this._options.encoding,s=this._options.valueEncoding,a=this._options.keyEncoding,u=!i&&!s&&!a
return n.write=u?function(e){return e.key=t+e.key,r.call(n,e)}:function(e){return e.key=t+e.key,i&&"undefined"==typeof e.encoding&&(e.encoding=i),s&&"undefined"==typeof e.valueEncoding&&(e.valueEncoding=s),a&&"undefined"==typeof e.keyEncoding&&(e.keyEncoding=a),r.call(n,e)},n},f.approximateSize=function(){var e=o(db)
return e.approximateSize.apply(e,arguments)},f.pre=function(e,t){t||(t=e,e=null),e=u.prefix(e,this.prefix(),this._options.sep)
var n=o(this._parent),r=this.prefix()
return n.hooks.pre(c(e),function(e,n,i){t({key:e.key.substring(r.length),value:e.value,type:e.type},function(e,t){n(e,e.prefix?t:t||r)},i)})},f.post=function(e,t){t||(t=e,e=null)
var n=o(this._parent),r=this.prefix()
return e=u.prefix(e,r,this._options.sep),n.hooks.post(c(e),function(e){t({key:e.key.substring(r.length),value:e.value,type:e.type})})}
t.exports=r},{"./batch":11,events:181,"level-fix-range":13,"string-range":16,util:204,xtend:18}],24:[function(e,t,n){function r(e){this._levelup=e,this.batch=e.db.batch(),this.ops=[]}var i=e("./util"),o=e("./errors").WriteError,s=i.getOptions,a=i.dispatchError
r.prototype.put=function(e,t,n){n=s(this._levelup,n)
var r=i.encodeKey(e,n),a=i.encodeValue(t,n)
try{this.batch.put(r,a)}catch(u){throw new o(u)}return this.ops.push({type:"put",key:r,value:a}),this},r.prototype.del=function(e,t){t=s(this._levelup,t)
var n=i.encodeKey(e,t)
try{this.batch.del(n)}catch(r){throw new o(r)}return this.ops.push({type:"del",key:n}),this},r.prototype.clear=function(){try{this.batch.clear()}catch(e){throw new o(e)}return this.ops=[],this},r.prototype.write=function(e){var t=this._levelup,n=this.ops
try{this.batch.write(function(r){return r?a(t,new o(r),e):(t.emit("batch",n),void(e&&e()))})}catch(r){throw new o(r)}},t.exports=r},{"./errors":25,"./util":28}],25:[function(e,t,n){var r=e("errno").create,i=r("LevelUPError"),o=r("NotFoundError",i)
o.prototype.notFound=!0,o.prototype.status=404,t.exports={LevelUPError:i,InitializationError:r("InitializationError",i),OpenError:r("OpenError",i),ReadError:r("ReadError",i),WriteError:r("WriteError",i),NotFoundError:o,EncodingError:r("EncodingError",i)}},{errno:36}],26:[function(e,t,n){(function(n){function r(e,t){return"function"==typeof e?e:t}function i(e,t,r){if(!(this instanceof i))return new i(e,t,r)
var o
if(s.call(this),this.setMaxListeners(1/0),"function"==typeof e?(t="object"==typeof t?t:{},t.db=e,e=null):"object"==typeof e&&"function"==typeof e.db&&(t=e,e=null),"function"==typeof t&&(r=t,t={}),(!t||"function"!=typeof t.db)&&"string"!=typeof e){if(o=new g("Must provide a location for the database"),r)return n.nextTick(function(){r(o)})
throw o}t=x(this,t),this.options=u(k,t),this._status="new",c(this,"location",e,"e"),this.open(r)}function o(e){return function(t,n){E()[e](t,n||function(){})}}var s=e("events").EventEmitter,a=e("util").inherits,u=e("xtend"),c=e("prr"),l=e("deferred-leveldown"),h=e("./errors").WriteError,f=e("./errors").ReadError,p=e("./errors").NotFoundError,d=e("./errors").OpenError,m=e("./errors").EncodingError,g=e("./errors").InitializationError,v=e("./read-stream"),y=e("./write-stream"),b=e("./util"),w=e("./batch"),x=b.getOptions,k=b.defaultOptions,E=b.getLevelDOWN,_=b.dispatchError
a(i,s),i.prototype.open=function(e){var t,r,i=this
return this.isOpen()?(e&&n.nextTick(function(){e(null,i)}),this):this._isOpening()?e&&this.once("open",function(){e(null,i)}):(this.emit("opening"),this._status="opening",this.db=new l(this.location),t=this.options.db||E(),r=t(this.location),void r.open(this.options,function(t){return t?_(i,new d(t),e):(i.db.setDb(r),i.db=r,i._status="open",e&&e(null,i),i.emit("open"),i.emit("ready"),void 0)}))},i.prototype.close=function(e){var t=this
if(this.isOpen())this._status="closing",this.db.close(function(){t._status="closed",t.emit("closed"),e&&e.apply(null,arguments)}),this.emit("closing"),this.db=null
else{if("closed"==this._status&&e)return n.nextTick(e)
"closing"==this._status&&e?this.once("closed",e):this._isOpening()&&this.once("open",function(){t.close(e)})}},i.prototype.isOpen=function(){return"open"==this._status},i.prototype._isOpening=function(){return"opening"==this._status},i.prototype.isClosed=function(){return/^clos/.test(this._status)},i.prototype.get=function(e,t,n){var i,o=this
return n=r(t,n),"function"!=typeof n?_(this,new f("get() requires key and callback arguments")):this._isOpening()||this.isOpen()?(t=b.getOptions(this,t),i=b.encodeKey(e,t),t.asBuffer=b.isValueAsBuffer(t),void this.db.get(i,t,function(r,i){if(r)return r=/notfound/i.test(r)?new p("Key not found in database ["+e+"]",r):new f(r),_(o,r,n)
if(n){try{i=b.decodeValue(i,t)}catch(s){return n(new m(s))}n(null,i)}})):_(this,new f("Database is not open"),n)},i.prototype.put=function(e,t,n,i){var o,s,a=this
return i=r(n,i),null===e||void 0===e||null===t||void 0===t?_(this,new h("put() requires key and value arguments"),i):this._isOpening()||this.isOpen()?(n=x(this,n),o=b.encodeKey(e,n),s=b.encodeValue(t,n),void this.db.put(o,s,n,function(n){return n?_(a,new h(n),i):(a.emit("put",e,t),void(i&&i()))})):_(this,new h("Database is not open"),i)},i.prototype.del=function(e,t,n){var i,o=this
return n=r(t,n),null===e||void 0===e?_(this,new h("del() requires a key argument"),n):this._isOpening()||this.isOpen()?(t=x(this,t),i=b.encodeKey(e,t),void this.db.del(i,t,function(t){return t?_(o,new h(t),n):(o.emit("del",e),void(n&&n()))})):_(this,new h("Database is not open"),n)},i.prototype.batch=function(e,t,n){var i,o,s,a=this
return arguments.length?(n=r(t,n),Array.isArray(e)?this._isOpening()||this.isOpen()?(t=x(this,t),i=t.keyEncoding,o=t.valueEncoding,s=e.map(function(e){if(void 0===e.type||void 0===e.key)return{}
var n,r=e.keyEncoding||i,s=e.valueEncoding||e.encoding||o
return"utf8"!=r&&"binary"!=r||"utf8"!=s&&"binary"!=s?(n={type:e.type,key:b.encodeKey(e.key,t,e)},void 0!==e.value&&(n.value=b.encodeValue(e.value,t,e)),n):e}),void this.db.batch(s,t,function(t){return t?_(a,new h(t),n):(a.emit("batch",e),void(n&&n()))})):_(this,new h("Database is not open"),n):_(this,new h("batch() requires an array argument"),n)):new w(this)},i.prototype.approximateSize=function(e,t,n){var r,i,o=this
return null===e||void 0===e||null===t||void 0===t||"function"!=typeof n?_(this,new f("approximateSize() requires start, end and callback arguments"),n):(r=b.encodeKey(e,this.options),i=b.encodeKey(t,this.options),this._isOpening()||this.isOpen()?void this.db.approximateSize(r,i,function(e,t){return e?_(o,new d(e),n):void(n&&n(null,t))}):_(this,new h("Database is not open"),n))},i.prototype.readStream=i.prototype.createReadStream=function(e){var t=this
return e=u(this.options,e),new v(e,this,function(e){return t.db.iterator(e)})},i.prototype.keyStream=i.prototype.createKeyStream=function(e){return this.createReadStream(u(e,{keys:!0,values:!1}))},i.prototype.valueStream=i.prototype.createValueStream=function(e){return this.createReadStream(u(e,{keys:!1,values:!0}))},i.prototype.writeStream=i.prototype.createWriteStream=function(e){return new y(u(e),this)},i.prototype.toString=function(){return"LevelUP"},t.exports=i,t.exports.copy=b.copy,t.exports.destroy=o("destroy"),t.exports.repair=o("repair")}).call(this,e("WuQzkM"))},{"./batch":24,"./errors":25,"./read-stream":27,"./util":28,"./write-stream":29,WuQzkM:183,"deferred-leveldown":31,events:181,prr:37,util:204,xtend:48}],27:[function(e,t,n){function r(e,t,n){if(!(this instanceof r))return new r(e,t,n)
i.call(this,{objectMode:!0,highWaterMark:e.highWaterMark}),this._db=t,e=this._options=s(c,e),this._keyEncoding=e.keyEncoding||e.encoding,this._valueEncoding=e.valueEncoding||e.encoding,"undefined"!=typeof this._options.start&&(this._options.start=u.encodeKey(this._options.start,this._options)),"undefined"!=typeof this._options.end&&(this._options.end=u.encodeKey(this._options.end,this._options)),"number"!=typeof this._options.limit&&(this._options.limit=-1),this._options.keyAsBuffer=u.isKeyAsBuffer(this._options),this._options.valueAsBuffer=u.isValueAsBuffer(this._options),this._makeData=this._options.keys&&this._options.values?l:this._options.keys?h:this._options.values?f:p
var o=this
this._db.isOpen()?this._iterator=n(this._options):this._db.once("ready",function(){o._destroyed||(o._iterator=n(o._options))})}var i=e("readable-stream").Readable,o=e("util").inherits,s=e("xtend"),a=e("./errors").EncodingError,u=e("./util"),c={keys:!0,values:!0},l=function(e,t){return{key:u.decodeKey(e,this._options),value:u.decodeValue(t,this._options)}},h=function(e){return u.decodeKey(e,this._options)},f=function(e,t){return u.decodeValue(t,this._options)},p=function(){return null}
o(r,i),r.prototype._read=function d(){var e=this
return e._db.isOpen()?void(e._destroyed||e._iterator.next(function(t,n,r){if(t||void 0===n&&void 0===r)return t||e._destroyed||e.push(null),e._cleanup(t)
try{r=e._makeData(n,r)}catch(i){return e._cleanup(new a(i))}e._destroyed||e.push(r)})):e._db.once("ready",function(){d.call(e)})},r.prototype._cleanup=function(e){if(!this._destroyed){this._destroyed=!0
var t=this
e&&t.emit("error",e),t._iterator?t._iterator.end(function(){t._iterator=null,t.emit("close")}):t.emit("close")}},r.prototype.destroy=function(){this._cleanup()},r.prototype.toString=function(){return"LevelUP.ReadStream"},t.exports=r},{"./errors":25,"./util":28,"readable-stream":47,util:204,xtend:48}],28:[function(e,t,n){(function(n,r){function i(e,t,n){e.readStream().pipe(t.writeStream()).on("close",n?n:function(){}).on("error",n?n:function(e){throw e})}function o(e,t){var n="string"==typeof t
return!n&&t&&t.encoding&&!t.valueEncoding&&(t.valueEncoding=t.encoding),v(e&&e.options||{},n?k[t]||k[w.valueEncoding]:t)}function s(){if(g)return g
var t,n=e("../package.json").devDependencies.leveldown,r="Could not locate LevelDOWN, try `npm install leveldown`"
try{t=e("leveldown/package").version}catch(i){throw new y(r)}if(!e("semver").satisfies(t,n))throw new y("Installed version of LevelDOWN ("+t+") does not match required version ("+n+")")
try{return g=e("leveldown")}catch(i){throw new y(r)}}function a(e,t,n){return"function"==typeof n?n(t):e.emit("error",t)}function u(e,t){var n=t&&t.keyEncoding||e.keyEncoding||"utf8"
return x[n]||n}function c(e,t){var n=t&&(t.valueEncoding||t.encoding)||e.valueEncoding||e.encoding||"utf8"
return x[n]||n}function l(e,t,n){return u(t,n).encode(e)}function h(e,t,n){return c(t,n).encode(e)}function f(e,t){return u(t).decode(e)}function p(e,t){return c(t).decode(e)}function d(e,t){return c(e,t).buffer}function m(e,t){return u(e,t).buffer}var g,v=e("xtend"),y=e("./errors").LevelUPError,b=["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le"],w={createIfMissing:!0,errorIfExists:!1,keyEncoding:"utf8",valueEncoding:"utf8",compression:!0},x=function(){function e(e){return void 0===e||null===e||r.isBuffer(e)}var t={}
return t.utf8=t["utf-8"]={encode:function(t){return e(t)?t:String(t)},decode:function(e){return e},buffer:!1,type:"utf8"},t.json={encode:JSON.stringify,decode:JSON.parse,buffer:!1,type:"json"},b.forEach(function(i){t[i]||(t[i]={encode:function(t){return e(t)?t:new r(t,i)},decode:function(e){return n.browser?e.toString(i):e},buffer:!0,type:i})}),t}(),k=function(){var e={}
return b.forEach(function(t){e[t]={valueEncoding:t}}),e}()
t.exports={defaultOptions:w,copy:i,getOptions:o,getLevelDOWN:s,dispatchError:a,encodeKey:l,encodeValue:h,isValueAsBuffer:d,isKeyAsBuffer:m,decodeValue:p,decodeKey:f}}).call(this,e("WuQzkM"),e("buffer").Buffer)},{"../package.json":49,"./errors":25,WuQzkM:183,buffer:177,leveldown:176,"leveldown/package":176,semver:176,xtend:48}],29:[function(e,t,n){(function(n,r){function i(e,t){if(!(this instanceof i))return new i(e,t)
o.call(this),this._options=a(h,l(t,e)),this._db=t,this._buffer=[],this._status="init",this._end=!1,this.writable=!0,this.readable=!1
var n=this,r=function(){n.writable&&(n._status="ready",n.emit("ready"),n._process())}
t.isOpen()?c(r):t.once("ready",r)}var o=e("stream").Stream,s=e("util").inherits,a=e("xtend"),u=e("bl"),c=r.setImmediate||n.nextTick,l=e("./util").getOptions,h={type:"put"}
s(i,o),i.prototype.write=function(e){return this.writable?(this._buffer.push(e),"init"!=this._status&&this._processDelayed(),this._options.maxBufferLength&&this._buffer.length>this._options.maxBufferLength?(this._writeBlock=!0,!1):!0):!1},i.prototype.end=function(e){var t=this
e&&this.write(e),c(function(){t._end=!0,t._process()})},i.prototype.destroy=function(){this.writable=!1,this.end()},i.prototype.destroySoon=function(){this.end()},i.prototype.add=function(e){return e.props?(e.props.Directory?e.pipe(this._db.writeStream(this._options)):(e.props.File||e.File||"File"==e.type)&&this._write(e),!0):void 0},i.prototype._processDelayed=function(){var e=this
c(function(){e._process()})},i.prototype._process=function(){var e,t=this,n=function(e){return t.writable?("closed"!=t._status&&(t._status="ready"),e?(t.writable=!1,t.emit("error",e)):void t._process()):void 0}
return"ready"!=t._status&&t.writable?void(t._buffer.length&&"closed"!=t._status&&t._processDelayed()):t._buffer.length&&t.writable?(t._status="writing",e=t._buffer,t._buffer=[],t._db.batch(e.map(function(e){return{type:e.type||t._options.type,key:e.key,value:e.value,keyEncoding:e.keyEncoding||t._options.keyEncoding,valueEncoding:e.valueEncoding||e.encoding||t._options.valueEncoding}}),n),void(t._writeBlock&&(t._writeBlock=!1,t.emit("drain")))):void(t._end&&"closed"!=t._status&&(t._status="closed",t.writable=!1,t.emit("close")))},i.prototype._write=function(e){var t=e.path||e.props.path,n=this
t&&e.pipe(u(function(e,r){return e?(n.writable=!1,n.emit("error",e)):(n._options.fstreamRoot&&t.indexOf(n._options.fstreamRoot)>-1&&(t=t.substr(n._options.fstreamRoot.length+1)),void n.write({key:t,value:r.slice(0)}))}))},i.prototype.toString=function(){return"LevelUP.WriteStream"},t.exports=i}).call(this,e("WuQzkM"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./util":28,WuQzkM:183,bl:30,stream:201,util:204,xtend:48}],30:[function(e,t,n){(function(n){function r(e){if(!(this instanceof r))return new r(e)
if(this._bufs=[],this.length=0,"function"==typeof e){this._callback=e
var t=function(e){this._callback&&(this._callback(e),this._callback=null)}.bind(this)
this.on("pipe",function(e){e.on("error",t)}),this.on("unpipe",function(e){e.removeListener("error",t)})}else n.isBuffer(e)?this.append(e):Array.isArray(e)&&e.forEach(function(e){n.isBuffer(e)&&this.append(e)}.bind(this))
i.call(this)}var i=e("readable-stream").Duplex,o=e("util")
o.inherits(r,i),r.prototype._offset=function(e){for(var t,n=0,r=0;r<this._bufs.length;r++){if(t=n+this._bufs[r].length,t>e)return[r,e-n]
n=t}},r.prototype.append=function(e){return this._bufs.push(n.isBuffer(e)?e:new n(e)),this.length+=e.length,this},r.prototype._write=function(e,t,n){this.append(e),n&&n()},r.prototype._read=function(e){return this.length?(e=Math.min(e,this.length),this.push(this.slice(0,e)),void this.consume(e)):this.push(null)},r.prototype.end=function(e){i.prototype.end.call(this,e),this._callback&&(this._callback(null,this.slice()),this._callback=null)},r.prototype.get=function(e){return this.slice(e,e+1)[0]},r.prototype.slice=function(e,t){return this.copy(null,0,e,t)},r.prototype.copy=function(e,t,r,i){if(("number"!=typeof r||0>r)&&(r=0),("number"!=typeof i||i>this.length)&&(i=this.length),r>=this.length)return e||new n(0)
if(0>=i)return e||new n(0)
var o,s,a=!!e,u=this._offset(r),c=i-r,l=c,h=a&&t||0,f=u[1]
if(0===r&&i==this.length){if(!a)return n.concat(this._bufs)
for(s=0;s<this._bufs.length;s++)this._bufs[s].copy(e,h),h+=this._bufs[s].length
return e}if(l<=this._bufs[u[0]].length-f)return a?this._bufs[u[0]].copy(e,t,f,f+l):this._bufs[u[0]].slice(f,f+l)
for(a||(e=new n(c)),s=u[0];s<this._bufs.length;s++){if(o=this._bufs[s].length-f,!(l>o)){this._bufs[s].copy(e,h,f,f+l)
break}this._bufs[s].copy(e,h,f),h+=o,l-=o,f&&(f=0)}return e},r.prototype.toString=function(e,t,n){return this.slice(t,n).toString(e)},r.prototype.consume=function(e){for(;this._bufs.length;){if(!(e>this._bufs[0].length)){this._bufs[0]=this._bufs[0].slice(e),this.length-=e
break}e-=this._bufs[0].length,this.length-=this._bufs[0].length,this._bufs.shift()}return this},r.prototype.duplicate=function(){for(var e=0,t=new r;e<this._bufs.length;e++)t.append(this._bufs[e])
return t},r.prototype.destroy=function(){this._bufs.length=0,this.length=0,this.push(null)},function(){var e={readDoubleBE:8,readDoubleLE:8,readFloatBE:4,readFloatLE:4,readInt32BE:4,readInt32LE:4,readUInt32BE:4,readUInt32LE:4,readInt16BE:2,readInt16LE:2,readUInt16BE:2,readUInt16LE:2,readInt8:1,readUInt8:1}
for(var t in e)!function(t){r.prototype[t]=function(n){return this.slice(n,n+e[t])[t](0)}}(t)}(),t.exports=r}).call(this,e("buffer").Buffer)},{buffer:177,"readable-stream":47,util:204}],31:[function(e,t,n){(function(n,r){function i(e){s.call(this,"string"==typeof e?e:""),this._db=void 0,this._operations=[]}var o=e("util"),s=e("abstract-leveldown").AbstractLevelDOWN
o.inherits(i,s),i.prototype.setDb=function(e){this._db=e,this._operations.forEach(function(t){e[t.method].apply(e,t.args)})},i.prototype._open=function(e,t){return n.nextTick(t)},i.prototype._operation=function(e,t){return this._db?this._db[e].apply(this._db,t):void this._operations.push({method:e,args:t})},"put get del batch approximateSize".split(" ").forEach(function(e){i.prototype["_"+e]=function(){this._operation(e,arguments)}}),i.prototype._isBuffer=function(e){return r.isBuffer(e)},i.prototype._iterator=function(){throw new TypeError("not implemented")},t.exports=i}).call(this,e("WuQzkM"),e("buffer").Buffer)},{WuQzkM:183,"abstract-leveldown":34,buffer:177,util:204}],32:[function(e,t,n){(function(e){function n(e){this._db=e,this._operations=[],this._written=!1}n.prototype._checkWritten=function(){if(this._written)throw new Error("write() already called on this batch")},n.prototype.put=function(e,t){this._checkWritten()
var n=this._db._checkKeyValue(e,"key",this._db._isBuffer)
if(n)throw n
if(n=this._db._checkKeyValue(t,"value",this._db._isBuffer))throw n
return this._db._isBuffer(e)||(e=String(e)),this._db._isBuffer(t)||(t=String(t)),"function"==typeof this._put?this._put(e,t):this._operations.push({type:"put",key:e,value:t}),this},n.prototype.del=function(e){this._checkWritten()
var t=this._db._checkKeyValue(e,"key",this._db._isBuffer)
if(t)throw t
return this._db._isBuffer(e)||(e=String(e)),"function"==typeof this._del?this._del(e):this._operations.push({type:"del",key:e}),this},n.prototype.clear=function(){return this._checkWritten(),this._operations=[],"function"==typeof this._clear&&this._clear(),this},n.prototype.write=function(t,n){if(this._checkWritten(),"function"==typeof t&&(n=t),"function"!=typeof n)throw new Error("write() requires a callback argument")
return"object"!=typeof t&&(t={}),this._written=!0,"function"==typeof this._write?this._write(n):"function"==typeof this._db._batch?this._db._batch(this._operations,t,n):void e.nextTick(n)},t.exports=n}).call(this,e("WuQzkM"))},{WuQzkM:183}],33:[function(e,t,n){(function(e){function n(e){this.db=e,this._ended=!1,this._nexting=!1}n.prototype.next=function(t){var n=this
if("function"!=typeof t)throw new Error("next() requires a callback argument")
return n._ended?t(new Error("cannot call next() after end()")):n._nexting?t(new Error("cannot call next() before previous next() has completed")):(n._nexting=!0,"function"==typeof n._next?n._next(function(){n._nexting=!1,t.apply(null,arguments)}):void e.nextTick(function(){n._nexting=!1,t()}))},n.prototype.end=function(t){if("function"!=typeof t)throw new Error("end() requires a callback argument")
return this._ended?t(new Error("end() already called on iterator")):(this._ended=!0,"function"==typeof this._end?this._end(t):void e.nextTick(t))},t.exports=n}).call(this,e("WuQzkM"))},{WuQzkM:183}],34:[function(e,t,n){(function(n,r){function i(e){if(!arguments.length||void 0===e)throw new Error("constructor requires at least a location argument")
if("string"!=typeof e)throw new Error("constructor requires a location string argument")
this.location=e}var o=e("xtend"),s=e("./abstract-iterator"),a=e("./abstract-chained-batch")
i.prototype.open=function(e,t){if("function"==typeof e&&(t=e),"function"!=typeof t)throw new Error("open() requires a callback argument")
return"object"!=typeof e&&(e={}),"function"==typeof this._open?this._open(e,t):void n.nextTick(t)},i.prototype.close=function(e){if("function"!=typeof e)throw new Error("close() requires a callback argument")
return"function"==typeof this._close?this._close(e):void n.nextTick(e)},i.prototype.get=function(e,t,r){var i
if("function"==typeof t&&(r=t),"function"!=typeof r)throw new Error("get() requires a callback argument")
return(i=this._checkKeyValue(e,"key",this._isBuffer))?r(i):(this._isBuffer(e)||(e=String(e)),"object"!=typeof t&&(t={}),"function"==typeof this._get?this._get(e,t,r):void n.nextTick(function(){r(new Error("NotFound"))}))},i.prototype.put=function(e,t,r,i){var o
if("function"==typeof r&&(i=r),"function"!=typeof i)throw new Error("put() requires a callback argument")
return(o=this._checkKeyValue(e,"key",this._isBuffer))?i(o):(o=this._checkKeyValue(t,"value",this._isBuffer))?i(o):(this._isBuffer(e)||(e=String(e)),this._isBuffer(t)||n.browser||(t=String(t)),"object"!=typeof r&&(r={}),"function"==typeof this._put?this._put(e,t,r,i):void n.nextTick(i))},i.prototype.del=function(e,t,r){var i
if("function"==typeof t&&(r=t),"function"!=typeof r)throw new Error("del() requires a callback argument")
return(i=this._checkKeyValue(e,"key",this._isBuffer))?r(i):(this._isBuffer(e)||(e=String(e)),"object"!=typeof t&&(t={}),"function"==typeof this._del?this._del(e,t,r):void n.nextTick(r))},i.prototype.batch=function(e,t,r){if(!arguments.length)return this._chainedBatch()
if("function"==typeof t&&(r=t),"function"!=typeof r)throw new Error("batch(array) requires a callback argument")
if(!Array.isArray(e))return r(new Error("batch(array) requires an array argument"))
"object"!=typeof t&&(t={})
for(var i,o,s=0,a=e.length;a>s;s++)if(i=e[s],"object"==typeof i){if(o=this._checkKeyValue(i.type,"type",this._isBuffer))return r(o)
if(o=this._checkKeyValue(i.key,"key",this._isBuffer))return r(o)
if("put"==i.type&&(o=this._checkKeyValue(i.value,"value",this._isBuffer)))return r(o)}return"function"==typeof this._batch?this._batch(e,t,r):void n.nextTick(r)},i.prototype.approximateSize=function(e,t,r){if(null==e||null==t||"function"==typeof e||"function"==typeof t)throw new Error("approximateSize() requires valid `start`, `end` and `callback` arguments")
if("function"!=typeof r)throw new Error("approximateSize() requires a callback argument")
return this._isBuffer(e)||(e=String(e)),this._isBuffer(t)||(t=String(t)),"function"==typeof this._approximateSize?this._approximateSize(e,t,r):void n.nextTick(function(){r(null,0)})},i.prototype._setupIteratorOptions=function(e){var t=this
return e=o(e),["start","end","gt","gte","lt","lte"].forEach(function(n){e[n]&&t._isBuffer(e[n])&&0===e[n].length&&delete e[n]}),e.reverse=!!e.reverse,e.reverse&&e.lt&&(e.start=e.lt),e.reverse&&e.lte&&(e.start=e.lte),!e.reverse&&e.gt&&(e.start=e.gt),!e.reverse&&e.gte&&(e.start=e.gte),(e.reverse&&e.lt&&!e.lte||!e.reverse&&e.gt&&!e.gte)&&(e.exclusiveStart=!0),e},i.prototype.iterator=function(e){return"object"!=typeof e&&(e={}),e=this._setupIteratorOptions(e),"function"==typeof this._iterator?this._iterator(e):new s(this)},i.prototype._chainedBatch=function(){return new a(this)},i.prototype._isBuffer=function(e){return r.isBuffer(e)},i.prototype._checkKeyValue=function(e,t){if(null===e||void 0===e)return new Error(t+" cannot be `null` or `undefined`")
if(this._isBuffer(e)){if(0===e.length)return new Error(t+" cannot be an empty Buffer")}else if(""===String(e))return new Error(t+" cannot be an empty String")},t.exports.AbstractLevelDOWN=i,t.exports.AbstractIterator=s,t.exports.AbstractChainedBatch=a}).call(this,e("WuQzkM"),e("buffer").Buffer)},{"./abstract-chained-batch":32,"./abstract-iterator":33,WuQzkM:183,buffer:177,xtend:48}],35:[function(e,t,n){function r(e,t,n){s(this,{type:e,name:e,cause:"string"!=typeof t?t:n,message:t&&"string"!=typeof t?t.message:t},"ewr")}function i(e,t){Error.call(this),Error.captureStackTrace&&Error.captureStackTrace(this,arguments.callee),r.call(this,"CustomError",e,t)}function o(e,t,n){var o=function(n,i){r.call(this,t,n,i),"FilesystemError"==t&&(this.code=this.cause.code,this.path=this.cause.path,this.errno=this.cause.errno,this.message=(e.errno[this.cause.errno]?e.errno[this.cause.errno].description:this.cause.message)+(this.cause.path?" ["+this.cause.path+"]":"")),Error.call(this),Error.captureStackTrace&&Error.captureStackTrace(this,arguments.callee)}
return o.prototype=n?new n:new i,o}var s=e("prr")
i.prototype=new Error,t.exports=function(e){var t=function(t,n){return o(e,t,n)}
return{CustomError:i,FilesystemError:t("FilesystemError"),createError:t}}},{prr:37}],36:[function(e,t,n){var r=t.exports.all=[{errno:-1,code:"UNKNOWN",description:"unknown error"},{errno:0,code:"OK",description:"success"},{errno:1,code:"EOF",description:"end of file"},{errno:2,code:"EADDRINFO",description:"getaddrinfo error"},{errno:3,code:"EACCES",description:"permission denied"},{errno:4,code:"EAGAIN",description:"resource temporarily unavailable"},{errno:5,code:"EADDRINUSE",description:"address already in use"},{errno:6,code:"EADDRNOTAVAIL",description:"address not available"},{errno:7,code:"EAFNOSUPPORT",description:"address family not supported"},{errno:8,code:"EALREADY",description:"connection already in progress"},{errno:9,code:"EBADF",description:"bad file descriptor"},{errno:10,code:"EBUSY",description:"resource busy or locked"},{errno:11,code:"ECONNABORTED",description:"software caused connection abort"},{errno:12,code:"ECONNREFUSED",description:"connection refused"},{errno:13,code:"ECONNRESET",description:"connection reset by peer"},{errno:14,code:"EDESTADDRREQ",description:"destination address required"},{errno:15,code:"EFAULT",description:"bad address in system call argument"},{errno:16,code:"EHOSTUNREACH",description:"host is unreachable"},{errno:17,code:"EINTR",description:"interrupted system call"},{errno:18,code:"EINVAL",description:"invalid argument"},{errno:19,code:"EISCONN",description:"socket is already connected"},{errno:20,code:"EMFILE",description:"too many open files"},{errno:21,code:"EMSGSIZE",description:"message too long"},{errno:22,code:"ENETDOWN",description:"network is down"},{errno:23,code:"ENETUNREACH",description:"network is unreachable"},{errno:24,code:"ENFILE",description:"file table overflow"},{errno:25,code:"ENOBUFS",description:"no buffer space available"},{errno:26,code:"ENOMEM",description:"not enough memory"},{errno:27,code:"ENOTDIR",description:"not a directory"},{errno:28,code:"EISDIR",description:"illegal operation on a directory"},{errno:29,code:"ENONET",description:"machine is not on the network"},{errno:31,code:"ENOTCONN",description:"socket is not connected"},{errno:32,code:"ENOTSOCK",description:"socket operation on non-socket"},{errno:33,code:"ENOTSUP",description:"operation not supported on socket"},{errno:34,code:"ENOENT",description:"no such file or directory"},{errno:35,code:"ENOSYS",description:"function not implemented"},{errno:36,code:"EPIPE",description:"broken pipe"},{errno:37,code:"EPROTO",description:"protocol error"},{errno:38,code:"EPROTONOSUPPORT",description:"protocol not supported"},{errno:39,code:"EPROTOTYPE",description:"protocol wrong type for socket"},{errno:40,code:"ETIMEDOUT",description:"connection timed out"},{errno:41,code:"ECHARSET",description:"invalid Unicode character"},{errno:42,code:"EAIFAMNOSUPPORT",description:"address family for hostname not supported"},{errno:44,code:"EAISERVICE",description:"servname not supported for ai_socktype"},{errno:45,code:"EAISOCKTYPE",description:"ai_socktype not supported"},{errno:46,code:"ESHUTDOWN",description:"cannot send after transport endpoint shutdown"},{errno:47,code:"EEXIST",description:"file already exists"},{errno:48,code:"ESRCH",description:"no such process"},{errno:49,code:"ENAMETOOLONG",description:"name too long"},{errno:50,code:"EPERM",description:"operation not permitted"},{errno:51,code:"ELOOP",description:"too many symbolic links encountered"},{errno:52,code:"EXDEV",description:"cross-device link not permitted"},{errno:53,code:"ENOTEMPTY",description:"directory not empty"},{errno:54,code:"ENOSPC",description:"no space left on device"},{errno:55,code:"EIO",description:"i/o error"},{errno:56,code:"EROFS",description:"read-only file system"},{errno:57,code:"ENODEV",description:"no such device"},{errno:58,code:"ESPIPE",description:"invalid seek"},{errno:59,code:"ECANCELED",description:"operation canceled"}]
t.exports.errno={},t.exports.code={},r.forEach(function(e){t.exports.errno[e.errno]=e,t.exports.code[e.code]=e}),t.exports.custom=e("./custom")(t.exports),t.exports.create=t.exports.custom.createError},{"./custom":35}],37:[function(e,t,n){!function(e,n,r){"undefined"!=typeof t&&t.exports?t.exports=r():n[e]=r()}("prr",this,function(){var e="function"==typeof Object.defineProperty?function(e,t,n){return Object.defineProperty(e,t,n),e}:function(e,t,n){return e[t]=n.value,e},t=function(e,t){var n="object"==typeof t,r=!n&&"string"==typeof t,i=function(e){return n?!!t[e]:r?t.indexOf(e[0])>-1:!1}
return{enumerable:i("enumerable"),configurable:i("configurable"),writable:i("writable"),value:e}},n=function(n,r,i,o){var s
if(o=t(i,o),"object"==typeof r){for(s in r)Object.hasOwnProperty.call(r,s)&&(o.value=r[s],e(n,s,o))
return n}return e(n,r,o)}
return n})},{}],38:[function(e,t,n){(function(n){function r(e){return this instanceof r?(u.call(this,e),c.call(this,e),e&&e.readable===!1&&(this.readable=!1),e&&e.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,e&&e.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",i)):new r(e)}function i(){this.allowHalfOpen||this._writableState.ended||n.nextTick(this.end.bind(this))}function o(e,t){for(var n=0,r=e.length;r>n;n++)t(e[n],n)}t.exports=r
var s=Object.keys||function(e){var t=[]
for(var n in e)t.push(n)
return t},a=e("core-util-is")
a.inherits=e("inherits")
var u=e("./_stream_readable"),c=e("./_stream_writable")
a.inherits(r,u),o(s(c.prototype),function(e){r.prototype[e]||(r.prototype[e]=c.prototype[e])})}).call(this,e("WuQzkM"))},{"./_stream_readable":40,"./_stream_writable":42,WuQzkM:183,"core-util-is":43,inherits:44}],39:[function(e,t,n){function r(e){return this instanceof r?void i.call(this,e):new r(e)}t.exports=r
var i=e("./_stream_transform"),o=e("core-util-is")
o.inherits=e("inherits"),o.inherits(r,i),r.prototype._transform=function(e,t,n){n(null,e)}},{"./_stream_transform":41,"core-util-is":43,inherits:44}],40:[function(e,t,n){(function(n){function r(t,n){t=t||{}
var r=t.highWaterMark
this.highWaterMark=r||0===r?r:16384,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=!1,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.calledRead=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.objectMode=!!t.objectMode,this.defaultEncoding=t.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(C||(C=e("string_decoder/").StringDecoder),this.decoder=new C(t.encoding),this.encoding=t.encoding)}function i(e){return this instanceof i?(this._readableState=new r(e,this),this.readable=!0,void A.call(this)):new i(e)}function o(e,t,n,r,i){var o=c(t,n)
if(o)e.emit("error",o)
else if(null===n||void 0===n)t.reading=!1,t.ended||l(e,t)
else if(t.objectMode||n&&n.length>0)if(t.ended&&!i){var a=new Error("stream.push() after EOF")
e.emit("error",a)}else if(t.endEmitted&&i){var a=new Error("stream.unshift() after end event")
e.emit("error",a)}else!t.decoder||i||r||(n=t.decoder.write(n)),t.length+=t.objectMode?1:n.length,i?t.buffer.unshift(n):(t.reading=!1,t.buffer.push(n)),t.needReadable&&h(e),p(e,t)
else i||(t.reading=!1)
return s(t)}function s(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function a(e){if(e>=O)e=O
else{e--
for(var t=1;32>t;t<<=1)e|=e>>t
e++}return e}function u(e,t){return 0===t.length&&t.ended?0:t.objectMode?0===e?0:1:null===e||isNaN(e)?t.flowing&&t.buffer.length?t.buffer[0].length:t.length:0>=e?0:(e>t.highWaterMark&&(t.highWaterMark=a(e)),e>t.length?t.ended?t.length:(t.needReadable=!0,0):e)}function c(e,t){var n=null
return _.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk")),n}function l(e,t){if(t.decoder&&!t.ended){var n=t.decoder.end()
n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,t.length>0?h(e):w(e)}function h(e){var t=e._readableState
t.needReadable=!1,t.emittedReadable||(t.emittedReadable=!0,t.sync?n.nextTick(function(){f(e)}):f(e))}function f(e){e.emit("readable")}function p(e,t){t.readingMore||(t.readingMore=!0,n.nextTick(function(){d(e,t)}))}function d(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(e.read(0),n!==t.length);)n=t.length
t.readingMore=!1}function m(e){return function(){var t=e._readableState
t.awaitDrain--,0===t.awaitDrain&&g(e)}}function g(e){function t(e,t,i){var o=e.write(n)
!1===o&&r.awaitDrain++}var n,r=e._readableState
for(r.awaitDrain=0;r.pipesCount&&null!==(n=e.read());)if(1===r.pipesCount?t(r.pipes,0,null):x(r.pipes,t),e.emit("data",n),r.awaitDrain>0)return
return 0===r.pipesCount?(r.flowing=!1,void(S.listenerCount(e,"data")>0&&y(e))):void(r.ranOut=!0)}function v(){this._readableState.ranOut&&(this._readableState.ranOut=!1,g(this))}function y(e,t){var r=e._readableState
if(r.flowing)throw new Error("Cannot switch to old mode now.")
var i=t||!1,o=!1
e.readable=!0,e.pipe=A.prototype.pipe,e.on=e.addListener=A.prototype.on,e.on("readable",function(){o=!0
for(var t;!i&&null!==(t=e.read());)e.emit("data",t)
null===t&&(o=!1,e._readableState.needReadable=!0)}),e.pause=function(){i=!0,this.emit("pause")},e.resume=function(){i=!1,o?n.nextTick(function(){e.emit("readable")}):this.read(0),this.emit("resume")},e.emit("readable")}function b(e,t){var n,r=t.buffer,i=t.length,o=!!t.decoder,s=!!t.objectMode
if(0===r.length)return null
if(0===i)n=null
else if(s)n=r.shift()
else if(!e||e>=i)n=o?r.join(""):_.concat(r,i),r.length=0
else if(e<r[0].length){var a=r[0]
n=a.slice(0,e),r[0]=a.slice(e)}else if(e===r[0].length)n=r.shift()
else{n=o?"":new _(e)
for(var u=0,c=0,l=r.length;l>c&&e>u;c++){var a=r[0],h=Math.min(e-u,a.length)
o?n+=a.slice(0,h):a.copy(n,u,0,h),h<a.length?r[0]=a.slice(h):r.shift(),u+=h}}return n}function w(e){var t=e._readableState
if(t.length>0)throw new Error("endReadable called on non-empty stream")
!t.endEmitted&&t.calledRead&&(t.ended=!0,n.nextTick(function(){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}))}function x(e,t){for(var n=0,r=e.length;r>n;n++)t(e[n],n)}function k(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n
return-1}t.exports=i
var E=e("isarray"),_=e("buffer").Buffer
i.ReadableState=r
var S=e("events").EventEmitter
S.listenerCount||(S.listenerCount=function(e,t){return e.listeners(t).length})
var A=e("stream"),T=e("core-util-is")
T.inherits=e("inherits")
var C
T.inherits(i,A),i.prototype.push=function(e,t){var n=this._readableState
return"string"!=typeof e||n.objectMode||(t=t||n.defaultEncoding,t!==n.encoding&&(e=new _(e,t),t="")),o(this,n,e,t,!1)},i.prototype.unshift=function(e){var t=this._readableState
return o(this,t,e,"",!0)},i.prototype.setEncoding=function(t){C||(C=e("string_decoder/").StringDecoder),this._readableState.decoder=new C(t),this._readableState.encoding=t}
var O=8388608
i.prototype.read=function(e){var t=this._readableState
t.calledRead=!0
var n,r=e
if(("number"!=typeof e||e>0)&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return h(this),null
if(e=u(e,t),0===e&&t.ended)return n=null,t.length>0&&t.decoder&&(n=b(e,t),t.length-=n.length),0===t.length&&w(this),n
var i=t.needReadable
return t.length-e<=t.highWaterMark&&(i=!0),(t.ended||t.reading)&&(i=!1),i&&(t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1),i&&!t.reading&&(e=u(r,t)),n=e>0?b(e,t):null,null===n&&(t.needReadable=!0,e=0),t.length-=e,0!==t.length||t.ended||(t.needReadable=!0),t.ended&&!t.endEmitted&&0===t.length&&w(this),n},i.prototype._read=function(e){this.emit("error",new Error("not implemented"))},i.prototype.pipe=function(e,t){function r(e){e===l&&o()}function i(){e.end()}function o(){e.removeListener("close",a),e.removeListener("finish",u),e.removeListener("drain",d),e.removeListener("error",s),e.removeListener("unpipe",r),l.removeListener("end",i),l.removeListener("end",o),(!e._writableState||e._writableState.needDrain)&&d()}function s(t){c(),e.removeListener("error",s),0===S.listenerCount(e,"error")&&e.emit("error",t)}function a(){e.removeListener("finish",u),c()}function u(){e.removeListener("close",a),c()}function c(){l.unpipe(e)}var l=this,h=this._readableState
switch(h.pipesCount){case 0:h.pipes=e
break
case 1:h.pipes=[h.pipes,e]
break
default:h.pipes.push(e)}h.pipesCount+=1
var f=(!t||t.end!==!1)&&e!==n.stdout&&e!==n.stderr,p=f?i:o
h.endEmitted?n.nextTick(p):l.once("end",p),e.on("unpipe",r)
var d=m(l)
return e.on("drain",d),e._events&&e._events.error?E(e._events.error)?e._events.error.unshift(s):e._events.error=[s,e._events.error]:e.on("error",s),e.once("close",a),e.once("finish",u),e.emit("pipe",l),h.flowing||(this.on("readable",v),h.flowing=!0,n.nextTick(function(){g(l)})),e},i.prototype.unpipe=function(e){var t=this._readableState
if(0===t.pipesCount)return this
if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,this.removeListener("readable",v),t.flowing=!1,e&&e.emit("unpipe",this),this)
if(!e){var n=t.pipes,r=t.pipesCount
t.pipes=null,t.pipesCount=0,this.removeListener("readable",v),t.flowing=!1
for(var i=0;r>i;i++)n[i].emit("unpipe",this)
return this}var i=k(t.pipes,e)
return-1===i?this:(t.pipes.splice(i,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},i.prototype.on=function(e,t){var n=A.prototype.on.call(this,e,t)
if("data"!==e||this._readableState.flowing||y(this),"readable"===e&&this.readable){var r=this._readableState
r.readableListening||(r.readableListening=!0,r.emittedReadable=!1,r.needReadable=!0,r.reading?r.length&&h(this,r):this.read(0))}return n},i.prototype.addListener=i.prototype.on,i.prototype.resume=function(){y(this),this.read(0),this.emit("resume")},i.prototype.pause=function(){y(this,!0),this.emit("pause")},i.prototype.wrap=function(e){var t=this._readableState,n=!1,r=this
e.on("end",function(){if(t.decoder&&!t.ended){var e=t.decoder.end()
e&&e.length&&r.push(e)}r.push(null)}),e.on("data",function(i){if(t.decoder&&(i=t.decoder.write(i)),(!t.objectMode||null!==i&&void 0!==i)&&(t.objectMode||i&&i.length)){var o=r.push(i)
o||(n=!0,e.pause())}})
for(var i in e)"function"==typeof e[i]&&"undefined"==typeof this[i]&&(this[i]=function(t){return function(){return e[t].apply(e,arguments)}}(i))
var o=["error","close","destroy","pause","resume"]
return x(o,function(t){e.on(t,r.emit.bind(r,t))}),r._read=function(t){n&&(n=!1,e.resume())},r},i._fromList=b}).call(this,e("WuQzkM"))},{WuQzkM:183,buffer:177,"core-util-is":43,events:181,inherits:44,isarray:45,stream:201,"string_decoder/":46}],41:[function(e,t,n){function r(e,t){this.afterTransform=function(e,n){return i(t,e,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function i(e,t,n){var r=e._transformState
r.transforming=!1
var i=r.writecb
if(!i)return e.emit("error",new Error("no writecb in Transform class"))
r.writechunk=null,r.writecb=null,null!==n&&void 0!==n&&e.push(n),i&&i(t)
var o=e._readableState
o.reading=!1,(o.needReadable||o.length<o.highWaterMark)&&e._read(o.highWaterMark)}function o(e){if(!(this instanceof o))return new o(e)
a.call(this,e)
var t=(this._transformState=new r(e,this),this)
this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("finish",function(){"function"==typeof this._flush?this._flush(function(e){s(t,e)}):s(t)})}function s(e,t){if(t)return e.emit("error",t)
var n=e._writableState,r=(e._readableState,e._transformState)
if(n.length)throw new Error("calling transform done when ws.length != 0")
if(r.transforming)throw new Error("calling transform done when still transforming")
return e.push(null)}t.exports=o
var a=e("./_stream_duplex"),u=e("core-util-is")
u.inherits=e("inherits"),u.inherits(o,a),o.prototype.push=function(e,t){return this._transformState.needTransform=!1,a.prototype.push.call(this,e,t)},o.prototype._transform=function(e,t,n){throw new Error("not implemented")},o.prototype._write=function(e,t,n){var r=this._transformState
if(r.writecb=n,r.writechunk=e,r.writeencoding=t,!r.transforming){var i=this._readableState;(r.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},o.prototype._read=function(e){var t=this._transformState
null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0}},{"./_stream_duplex":38,"core-util-is":43,inherits:44}],42:[function(e,t,n){(function(n){function r(e,t,n){this.chunk=e,this.encoding=t,this.callback=n}function i(e,t){e=e||{}
var n=e.highWaterMark
this.highWaterMark=n||0===n?n:16384,this.objectMode=!!e.objectMode,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1
var r=e.decodeStrings===!1
this.decodeStrings=!r,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){p(t,e)},this.writecb=null,this.writelen=0,this.buffer=[],this.errorEmitted=!1}function o(t){var n=e("./_stream_duplex")
return this instanceof o||this instanceof n?(this._writableState=new i(t,this),this.writable=!0,void k.call(this)):new o(t)}function s(e,t,r){var i=new Error("write after end")
e.emit("error",i),n.nextTick(function(){r(i)})}function a(e,t,r,i){var o=!0
if(!w.isBuffer(r)&&"string"!=typeof r&&null!==r&&void 0!==r&&!t.objectMode){var s=new TypeError("Invalid non-string/buffer chunk")
e.emit("error",s),n.nextTick(function(){i(s)}),o=!1}return o}function u(e,t,n){return e.objectMode||e.decodeStrings===!1||"string"!=typeof t||(t=new w(t,n)),t}function c(e,t,n,i,o){n=u(t,n,i),w.isBuffer(n)&&(i="buffer")
var s=t.objectMode?1:n.length
t.length+=s
var a=t.length<t.highWaterMark
return a||(t.needDrain=!0),t.writing?t.buffer.push(new r(n,i,o)):l(e,t,s,n,i,o),a}function l(e,t,n,r,i,o){t.writelen=n,t.writecb=o,t.writing=!0,t.sync=!0,e._write(r,i,t.onwrite),t.sync=!1}function h(e,t,r,i,o){r?n.nextTick(function(){o(i)}):o(i),e._writableState.errorEmitted=!0,e.emit("error",i)}function f(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function p(e,t){var r=e._writableState,i=r.sync,o=r.writecb
if(f(r),t)h(e,r,i,t,o)
else{var s=v(e,r)
s||r.bufferProcessing||!r.buffer.length||g(e,r),i?n.nextTick(function(){d(e,r,s,o)}):d(e,r,s,o)}}function d(e,t,n,r){n||m(e,t),r(),n&&y(e,t)}function m(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function g(e,t){t.bufferProcessing=!0
for(var n=0;n<t.buffer.length;n++){var r=t.buffer[n],i=r.chunk,o=r.encoding,s=r.callback,a=t.objectMode?1:i.length
if(l(e,t,a,i,o,s),t.writing){n++
break}}t.bufferProcessing=!1,n<t.buffer.length?t.buffer=t.buffer.slice(n):t.buffer.length=0}function v(e,t){return t.ending&&0===t.length&&!t.finished&&!t.writing}function y(e,t){var n=v(e,t)
return n&&(t.finished=!0,e.emit("finish")),n}function b(e,t,r){t.ending=!0,y(e,t),r&&(t.finished?n.nextTick(r):e.once("finish",r)),t.ended=!0}t.exports=o
var w=e("buffer").Buffer
o.WritableState=i
var x=e("core-util-is")
x.inherits=e("inherits")
var k=e("stream")
x.inherits(o,k),o.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},o.prototype.write=function(e,t,n){var r=this._writableState,i=!1
return"function"==typeof t&&(n=t,t=null),w.isBuffer(e)?t="buffer":t||(t=r.defaultEncoding),"function"!=typeof n&&(n=function(){}),r.ended?s(this,r,n):a(this,r,e,n)&&(i=c(this,r,e,t,n)),i},o.prototype._write=function(e,t,n){n(new Error("not implemented"))},o.prototype.end=function(e,t,n){var r=this._writableState
"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),"undefined"!=typeof e&&null!==e&&this.write(e,t),r.ending||r.finished||b(this,r,n)}}).call(this,e("WuQzkM"))},{"./_stream_duplex":38,WuQzkM:183,buffer:177,"core-util-is":43,inherits:44,stream:201}],43:[function(e,t,n){(function(e){function t(e){return Array.isArray(e)}function r(e){return"boolean"==typeof e}function i(e){return null===e}function o(e){return null==e}function s(e){return"number"==typeof e}function a(e){return"string"==typeof e}function u(e){return"symbol"==typeof e}function c(e){return void 0===e}function l(e){return h(e)&&"[object RegExp]"===v(e)}function h(e){return"object"==typeof e&&null!==e}function f(e){return h(e)&&"[object Date]"===v(e)}function p(e){return h(e)&&("[object Error]"===v(e)||e instanceof Error)}function d(e){return"function"==typeof e}function m(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function g(t){return e.isBuffer(t)}function v(e){return Object.prototype.toString.call(e)}n.isArray=t,n.isBoolean=r,n.isNull=i,n.isNullOrUndefined=o,n.isNumber=s,n.isString=a,n.isSymbol=u,n.isUndefined=c,n.isRegExp=l,n.isObject=h,n.isDate=f,n.isError=p,n.isFunction=d,n.isPrimitive=m,n.isBuffer=g}).call(this,e("buffer").Buffer)},{buffer:177}],44:[function(e,t,n){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t
var n=function(){}
n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],45:[function(e,t,n){t.exports=e(9)},{}],46:[function(e,t,n){function r(e){if(e&&!u(e))throw new Error("Unknown encoding: "+e)}function i(e){return e.toString(this.encoding)}function o(e){this.charReceived=e.length%2,this.charLength=this.charReceived?2:0}function s(e){this.charReceived=e.length%3,this.charLength=this.charReceived?3:0}var a=e("buffer").Buffer,u=a.isEncoding||function(e){switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0
default:return!1}},c=n.StringDecoder=function(e){switch(this.encoding=(e||"utf8").toLowerCase().replace(/[-_]/,""),r(e),this.encoding){case"utf8":this.surrogateSize=3
break
case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=o
break
case"base64":this.surrogateSize=3,this.detectIncompleteChar=s
break
default:return void(this.write=i)}this.charBuffer=new a(6),this.charReceived=0,this.charLength=0}
c.prototype.write=function(e){for(var t="";this.charLength;){var n=e.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:e.length
if(e.copy(this.charBuffer,this.charReceived,0,n),this.charReceived+=n,this.charReceived<this.charLength)return""
e=e.slice(n,e.length),t=this.charBuffer.slice(0,this.charLength).toString(this.encoding)
var r=t.charCodeAt(t.length-1)
if(!(r>=55296&&56319>=r)){if(this.charReceived=this.charLength=0,0===e.length)return t
break}this.charLength+=this.surrogateSize,t=""}this.detectIncompleteChar(e)
var i=e.length
this.charLength&&(e.copy(this.charBuffer,0,e.length-this.charReceived,i),i-=this.charReceived),t+=e.toString(this.encoding,0,i)
var i=t.length-1,r=t.charCodeAt(i)
if(r>=55296&&56319>=r){var o=this.surrogateSize
return this.charLength+=o,this.charReceived+=o,this.charBuffer.copy(this.charBuffer,o,0,o),e.copy(this.charBuffer,0,0,o),t.substring(0,i)}return t},c.prototype.detectIncompleteChar=function(e){for(var t=e.length>=3?3:e.length;t>0;t--){var n=e[e.length-t]
if(1==t&&n>>5==6){this.charLength=2
break}if(2>=t&&n>>4==14){this.charLength=3
break}if(3>=t&&n>>3==30){this.charLength=4
break}}this.charReceived=t},c.prototype.end=function(e){var t=""
if(e&&e.length&&(t=this.write(e)),this.charReceived){var n=this.charReceived,r=this.charBuffer,i=this.encoding
t+=r.slice(0,n).toString(i)}return t}},{buffer:177}],47:[function(e,t,n){var r=e("stream")
n=t.exports=e("./lib/_stream_readable.js"),n.Stream=r,n.Readable=n,n.Writable=e("./lib/_stream_writable.js"),n.Duplex=e("./lib/_stream_duplex.js"),n.Transform=e("./lib/_stream_transform.js"),n.PassThrough=e("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":38,"./lib/_stream_passthrough.js":39,"./lib/_stream_readable.js":40,"./lib/_stream_transform.js":41,"./lib/_stream_writable.js":42,stream:201}],48:[function(e,t,n){t.exports=e(10)},{}],49:[function(e,t,n){t.exports={name:"levelup",description:"Fast & simple storage - a Node.js-style LevelDB wrapper",version:"0.18.6",contributors:[{name:"Rod Vagg",email:"r@va.gg",url:"https://github.com/rvagg"},{name:"John Chesley",email:"john@chesl.es",url:"https://github.com/chesles/"},{name:"Jake Verbaten",email:"raynos2@gmail.com",url:"https://github.com/raynos"},{name:"Dominic Tarr",email:"dominic.tarr@gmail.com",url:"https://github.com/dominictarr"},{name:"Max Ogden",email:"max@maxogden.com",url:"https://github.com/maxogden"},{name:"Lars-Magnus Skog",email:"lars.magnus.skog@gmail.com",url:"https://github.com/ralphtheninja"},{name:"David Björklund",email:"david.bjorklund@gmail.com",url:"https://github.com/kesla"},{name:"Julian Gruber",email:"julian@juliangruber.com",url:"https://github.com/juliangruber"},{name:"Paolo Fragomeni",email:"paolo@async.ly",url:"https://github.com/hij1nx"},{name:"Anton Whalley",email:"anton.whalley@nearform.com",url:"https://github.com/No9"},{name:"Matteo Collina",email:"matteo.collina@gmail.com",url:"https://github.com/mcollina"},{name:"Pedro Teixeira",email:"pedro.teixeira@gmail.com",url:"https://github.com/pgte"},{name:"James Halliday",email:"mail@substack.net",url:"https://github.com/substack"}],repository:{type:"git",url:"git+https://github.com/rvagg/node-levelup.git"},homepage:"https://github.com/rvagg/node-levelup",keywords:["leveldb","stream","database","db","store","storage","json"],main:"lib/levelup.js",dependencies:{bl:"~0.8.1","deferred-leveldown":"~0.2.0",errno:"~0.1.1",prr:"~0.0.0","readable-stream":"~1.0.26",semver:"~2.3.1",xtend:"~3.0.0"},devDependencies:{leveldown:"~0.10.0",bustermove:"*",tap:"*",referee:"*",rimraf:"*",async:"*",fstream:"*",tar:"*",mkfiletree:"*",readfiletree:"*","slow-stream":">=0.0.4",delayed:"*",boganipsum:"*",du:"*",memdown:"*","msgpack-js":"*"},browser:{leveldown:!1,"leveldown/package":!1,semver:!1},scripts:{test:"tap test/*-test.js --stderr",functionaltests:"node ./test/functional/fstream-test.js && node ./test/functional/binary-data-test.js && node ./test/functional/compat-test.js",alltests:"npm test && npm run-script functionaltests"},license:"MIT",readme:"LevelUP\n=======\n\n![LevelDB Logo](https://0.gravatar.com/avatar/a498b122aecb7678490a38bb593cc12d)\n\n**Fast & simple storage - a Node.js-style LevelDB wrapper**\n\n[![Build Status](https://secure.travis-ci.org/rvagg/node-levelup.png)](http://travis-ci.org/rvagg/node-levelup)\n\n[![NPM](https://nodei.co/npm/levelup.png?stars&downloads)](https://nodei.co/npm/levelup/) [![NPM](https://nodei.co/npm-dl/levelup.png)](https://nodei.co/npm/levelup/)\n\n\n  * <a href=\"#intro\">Introduction</a>\n  * <a href=\"#leveldown\">Relationship to LevelDOWN</a>\n  * <a href=\"#platforms\">Tested &amp; supported platforms</a>\n  * <a href=\"#basic\">Basic usage</a>\n  * <a href=\"#api\">API</a>\n  * <a href=\"#events\">Events</a>\n  * <a href=\"#json\">JSON data</a>\n  * <a href=\"#custom_encodings\">Custom encodings</a>\n  * <a href=\"#extending\">Extending LevelUP</a>\n  * <a href=\"#multiproc\">Multi-process access</a>\n  * <a href=\"#support\">Getting support</a>\n  * <a href=\"#contributing\">Contributing</a>\n  * <a href=\"#licence\">Licence &amp; copyright</a>\n\n<a name=\"intro\"></a>\nIntroduction\n------------\n\n**[LevelDB](http://code.google.com/p/leveldb/)** is a simple key/value data store built by Google, inspired by BigTable. It's used in Google Chrome and many other products. LevelDB supports arbitrary byte arrays as both keys and values, singular *get*, *put* and *delete* operations, *batched put and delete*, bi-directional iterators and simple compression using the very fast [Snappy](http://code.google.com/p/snappy/) algorithm.\n\n**LevelUP** aims to expose the features of LevelDB in a **Node.js-friendly way**. All standard `Buffer` encoding types are supported, as is a special JSON encoding. LevelDB's iterators are exposed as a Node.js-style **readable stream** a matching **writeable stream** converts writes to *batch* operations.\n\nLevelDB stores entries **sorted lexicographically by keys**. This makes LevelUP's <a href=\"#createReadStream\"><code>ReadStream</code></a> interface a very powerful query mechanism.\n\n**LevelUP** is an **OPEN Open Source Project**, see the <a href=\"#contributing\">Contributing</a> section to find out what this means.\n\n<a name=\"leveldown\"></a>\nRelationship to LevelDOWN\n-------------------------\n\nLevelUP is designed to be backed by **[LevelDOWN](https://github.com/rvagg/node-leveldown/)** which provides a pure C++ binding to LevelDB and can be used as a stand-alone package if required.\n\n**As of version 0.9, LevelUP no longer requires LevelDOWN as a dependency so you must `npm install leveldown` when you install LevelUP.**\n\nLevelDOWN is now optional because LevelUP can be used with alternative backends, such as **[level.js](https://github.com/maxogden/level.js)** in the browser or [MemDOWN](https://github.com/rvagg/node-memdown) for a pure in-memory store.\n\nLevelUP will look for LevelDOWN and throw an error if it can't find it in its Node `require()` path. It will also tell you if the installed version of LevelDOWN is incompatible.\n\n**The [level](https://github.com/level/level) package is available as an alternative installation mechanism.** Install it instead to automatically get both LevelUP & LevelDOWN. It exposes LevelUP on its export (i.e. you can `var leveldb = require('level')`).\n\n\n<a name=\"platforms\"></a>\nTested & supported platforms\n----------------------------\n\n  * **Linux**: including ARM platforms such as Raspberry Pi *and Kindle!*\n  * **Mac OS**\n  * **Solaris**: including Joyent's SmartOS & Nodejitsu\n  * **Windows**: Node 0.10 and above only. See installation instructions for *node-gyp's* dependencies [here](https://github.com/TooTallNate/node-gyp#installation), you'll need these (free) components from Microsoft to compile and run any native Node add-on in Windows.\n\n<a name=\"basic\"></a>\nBasic usage\n-----------\n\nFirst you need to install LevelUP!\n\n```sh\n$ npm install levelup leveldown\n```\n\nOr\n\n```sh\n$ npm install level\n```\n\n*(this second option requires you to use LevelUP by calling `var levelup = require('level')`)*\n\n\nAll operations are asynchronous although they don't necessarily require a callback if you don't need to know when the operation was performed.\n\n```js\nvar levelup = require('levelup')\n\n// 1) Create our database, supply location and options.\n//    This will create or open the underlying LevelDB store.\nvar db = levelup('./mydb')\n\n// 2) put a key & value\ndb.put('name', 'LevelUP', function (err) {\n  if (err) return console.log('Ooops!', err) // some kind of I/O error\n\n  // 3) fetch by key\n  db.get('name', function (err, value) {\n    if (err) return console.log('Ooops!', err) // likely the key was not found\n\n    // ta da!\n    console.log('name=' + value)\n  })\n})\n```\n\n<a name=\"api\"></a>\n## API\n\n  * <a href=\"#ctor\"><code><b>levelup()</b></code></a>\n  * <a href=\"#open\"><code>db.<b>open()</b></code></a>\n  * <a href=\"#close\"><code>db.<b>close()</b></code></a>\n  * <a href=\"#put\"><code>db.<b>put()</b></code></a>\n  * <a href=\"#get\"><code>db.<b>get()</b></code></a>\n  * <a href=\"#del\"><code>db.<b>del()</b></code></a>\n  * <a href=\"#batch\"><code>db.<b>batch()</b></code> *(array form)*</a>\n  * <a href=\"#batch_chained\"><code>db.<b>batch()</b></code> *(chained form)*</a>\n  * <a href=\"#isOpen\"><code>db.<b>isOpen()</b></code></a>\n  * <a href=\"#isClosed\"><code>db.<b>isClosed()</b></code></a>\n  * <a href=\"#createReadStream\"><code>db.<b>createReadStream()</b></code></a>\n  * <a href=\"#createKeyStream\"><code>db.<b>createKeyStream()</b></code></a>\n  * <a href=\"#createValueStream\"><code>db.<b>createValueStream()</b></code></a>\n  * <a href=\"#createWriteStream\"><code>db.<b>createWriteStream()</b></code></a>\n\n### Special operations exposed by LevelDOWN\n\n  * <a href=\"#approximateSize\"><code>db.db.<b>approximateSize()</b></code></a>\n  * <a href=\"#getProperty\"><code>db.db.<b>getProperty()</b></code></a>\n  * <a href=\"#destroy\"><code><b>leveldown.destroy()</b></code></a>\n  * <a href=\"#repair\"><code><b>leveldown.repair()</b></code></a>\n\n\n--------------------------------------------------------\n<a name=\"ctor\"></a>\n### levelup(location[, options[, callback]])\n### levelup(options[, callback ])\n### levelup(db[, callback ])\n<code>levelup()</code> is the main entry point for creating a new LevelUP instance and opening the underlying store with LevelDB.\n\nThis function returns a new instance of LevelUP and will also initiate an <a href=\"#open\"><code>open()</code></a> operation. Opening the database is an asynchronous operation which will trigger your callback if you provide one. The callback should take the form: `function (err, db) {}` where the `db` is the LevelUP instance. If you don't provide a callback, any read & write operations are simply queued internally until the database is fully opened.\n\nThis leads to two alternative ways of managing a new LevelUP instance:\n\n```js\nlevelup(location, options, function (err, db) {\n  if (err) throw err\n  db.get('foo', function (err, value) {\n    if (err) return console.log('foo does not exist')\n    console.log('got foo =', value)\n  })\n})\n\n// vs the equivalent:\n\nvar db = levelup(location, options) // will throw if an error occurs\ndb.get('foo', function (err, value) {\n  if (err) return console.log('foo does not exist')\n  console.log('got foo =', value)\n})\n```\n\nThe `location` argument is available as a read-only property on the returned LevelUP instance.\n\nThe `levelup(options, callback)` form (with optional `callback`) is only available where you provide a valid `'db'` property on the options object (see below). Only for back-ends that don't require a `location` argument, such as [MemDOWN](https://github.com/rvagg/memdown).\n\nFor example:\n\n```js\nvar levelup = require('levelup')\nvar memdown = require('memdown')\nvar db = levelup({ db: memdown })\n```\n\nThe `levelup(db, callback)` form (with optional `callback`) is only available where `db` is a factory function, as would be provided as a `'db'` property on an `options` object (see below). Only for back-ends that don't require a `location` argument, such as [MemDOWN](https://github.com/rvagg/memdown).\n\nFor example:\n\n```js\nvar levelup = require('levelup')\nvar memdown = require('memdown')\nvar db = levelup(memdown)\n```\n\n#### `options`\n\n`levelup()` takes an optional options object as its second argument; the following properties are accepted:\n\n* `'createIfMissing'` *(boolean, default: `true`)*: If `true`, will initialise an empty database at the specified location if one doesn't already exist. If `false` and a database doesn't exist you will receive an error in your `open()` callback and your database won't open.\n\n* `'errorIfExists'` *(boolean, default: `false`)*: If `true`, you will receive an error in your `open()` callback if the database exists at the specified location.\n\n* `'compression'` *(boolean, default: `true`)*: If `true`, all *compressible* data will be run through the Snappy compression algorithm before being stored. Snappy is very fast and shouldn't gain much speed by disabling so leave this on unless you have good reason to turn it off.\n\n* `'cacheSize'` *(number, default: `8 * 1024 * 1024`)*: The size (in bytes) of the in-memory [LRU](http://en.wikipedia.org/wiki/Cache_algorithms#Least_Recently_Used) cache with frequently used uncompressed block contents. \n\n* `'keyEncoding'` and `'valueEncoding'` *(string, default: `'utf8'`)*: The encoding of the keys and values passed through Node.js' `Buffer` implementation (see [Buffer#toString()](http://nodejs.org/docs/latest/api/buffer.html#buffer_buf_tostring_encoding_start_end)).\n  <p><code>'utf8'</code> is the default encoding for both keys and values so you can simply pass in strings and expect strings from your <code>get()</code> operations. You can also pass <code>Buffer</code> objects as keys and/or values and conversion will be performed.</p>\n  <p>Supported encodings are: hex, utf8, ascii, binary, base64, ucs2, utf16le.</p>\n  <p><code>'json'</code> encoding is also supported, see below.</p>\n\n* `'db'` *(object, default: LevelDOWN)*: LevelUP is backed by [LevelDOWN](https://github.com/rvagg/node-leveldown/) to provide an interface to LevelDB. You can completely replace the use of LevelDOWN by providing a \"factory\" function that will return a LevelDOWN API compatible object given a `location` argument. For further information, see [MemDOWN](https://github.com/rvagg/node-memdown/), a fully LevelDOWN API compatible replacement that uses a memory store rather than LevelDB. Also see [Abstract LevelDOWN](http://github.com/rvagg/node-abstract-leveldown), a partial implementation of the LevelDOWN API that can be used as a base prototype for a LevelDOWN substitute.\n\nAdditionally, each of the main interface methods accept an optional options object that can be used to override `'keyEncoding'` and `'valueEncoding'`.\n\n--------------------------------------------------------\n<a name=\"open\"></a>\n### db.open([callback])\n<code>open()</code> opens the underlying LevelDB store. In general **you should never need to call this method directly** as it's automatically called by <a href=\"#ctor\"><code>levelup()</code></a>.\n\nHowever, it is possible to *reopen* a database after it has been closed with <a href=\"#close\"><code>close()</code></a>, although this is not generally advised.\n\n--------------------------------------------------------\n<a name=\"close\"></a>\n### db.close([callback])\n<code>close()</code> closes the underlying LevelDB store. The callback will receive any error encountered during closing as the first argument.\n\nYou should always clean up your LevelUP instance by calling `close()` when you no longer need it to free up resources. A LevelDB store cannot be opened by multiple instances of LevelDB/LevelUP simultaneously.\n\n--------------------------------------------------------\n<a name=\"put\"></a>\n### db.put(key, value[, options][, callback])\n<code>put()</code> is the primary method for inserting data into the store. Both the `key` and `value` can be arbitrary data objects.\n\nThe callback argument is optional but if you don't provide one and an error occurs then expect the error to be thrown.\n\n#### `options`\n\nEncoding of the `key` and `value` objects will adhere to `'keyEncoding'` and `'valueEncoding'` options provided to <a href=\"#ctor\"><code>levelup()</code></a>, although you can provide alternative encoding settings in the options for `put()` (it's recommended that you stay consistent in your encoding of keys and values in a single store).\n\nIf you provide a `'sync'` value of `true` in your `options` object, LevelDB will perform a synchronous write of the data; although the operation will be asynchronous as far as Node is concerned. Normally, LevelDB passes the data to the operating system for writing and returns immediately, however a synchronous write will use `fsync()` or equivalent so your callback won't be triggered until the data is actually on disk. Synchronous filesystem writes are **significantly** slower than asynchronous writes but if you want to be absolutely sure that the data is flushed then you can use `'sync': true`.\n\n--------------------------------------------------------\n<a name=\"get\"></a>\n### db.get(key[, options][, callback])\n<code>get()</code> is the primary method for fetching data from the store. The `key` can be an arbitrary data object. If it doesn't exist in the store then the callback will receive an error as its first argument. A not-found err object will be of type `'NotFoundError'` so you can `err.type == 'NotFoundError'` or you can perform a truthy test on the property `err.notFound`.\n\n```js\ndb.get('foo', function (err, value) {\n  if (err) {\n    if (err.notFound) {\n      // handle a 'NotFoundError' here\n      return\n    }\n    // I/O or other error, pass it up the callback chain\n    return callback(err)\n  }\n\n  // .. handle `value` here\n})\n```\n\n#### `options`\n\nEncoding of the `key` object will adhere to the `'keyEncoding'` option provided to <a href=\"#ctor\"><code>levelup()</code></a>, although you can provide alternative encoding settings in the options for `get()` (it's recommended that you stay consistent in your encoding of keys and values in a single store).\n\nLevelDB will by default fill the in-memory LRU Cache with data from a call to get. Disabling this is done by setting `fillCache` to `false`. \n\n--------------------------------------------------------\n<a name=\"del\"></a>\n### db.del(key[, options][, callback])\n<code>del()</code> is the primary method for removing data from the store.\n\n#### `options`\n\nEncoding of the `key` object will adhere to the `'keyEncoding'` option provided to <a href=\"#ctor\"><code>levelup()</code></a>, although you can provide alternative encoding settings in the options for `del()` (it's recommended that you stay consistent in your encoding of keys and values in a single store).\n\nA `'sync'` option can also be passed, see <a href=\"#put\"><code>put()</code></a> for details on how this works.\n\n--------------------------------------------------------\n<a name=\"batch\"></a>\n### db.batch(array[, options][, callback]) *(array form)*\n<code>batch()</code> can be used for very fast bulk-write operations (both *put* and *delete*). The `array` argument should contain a list of operations to be executed sequentially, although as a whole they are performed as an atomic operation inside LevelDB. Each operation is contained in an object having the following properties: `type`, `key`, `value`, where the *type* is either `'put'` or `'del'`. In the case of `'del'` the `'value'` property is ignored. Any entries with a `'key'` of `null` or `undefined` will cause an error to be returned on the `callback` and any `'type': 'put'` entry with a `'value'` of `null` or `undefined` will return an error.\n\n```js\nvar ops = [\n    { type: 'del', key: 'father' }\n  , { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' }\n  , { type: 'put', key: 'dob', value: '16 February 1941' }\n  , { type: 'put', key: 'spouse', value: 'Kim Young-sook' }\n  , { type: 'put', key: 'occupation', value: 'Clown' }\n]\n\ndb.batch(ops, function (err) {\n  if (err) return console.log('Ooops!', err)\n  console.log('Great success dear leader!')\n})\n```\n\n#### `options`\n\nSee <a href=\"#put\"><code>put()</code></a> for a discussion on the `options` object. You can overwrite default `'keyEncoding'` and `'valueEncoding'` and also specify the use of `sync` filesystem operations.\n\nIn addition to encoding options for the whole batch you can also overwrite the encoding per operation, like:\n\n```js\nvar ops = [{\n    type          : 'put'\n  , key           : new Buffer([1, 2, 3])\n  , value         : { some: 'json' }\n  , keyEncoding   : 'binary'\n  , valueEncoding : 'json'\n}]\n```\n\n--------------------------------------------------------\n<a name=\"batch_chained\"></a>\n### db.batch() *(chained form)*\n<code>batch()</code>, when called with no arguments will return a `Batch` object which can be used to build, and eventually commit, an atomic LevelDB batch operation. Depending on how it's used, it is possible to obtain greater performance when using the chained form of `batch()` over the array form.\n\n```js\ndb.batch()\n  .del('father')\n  .put('name', 'Yuri Irsenovich Kim')\n  .put('dob', '16 February 1941')\n  .put('spouse', 'Kim Young-sook')\n  .put('occupation', 'Clown')\n  .write(function () { console.log('Done!') })\n```\n\n<b><code>batch.put(key, value[, options])</code></b>\n\nQueue a *put* operation on the current batch, not committed until a `write()` is called on the batch.\n\nThe optional `options` argument can be used to override the default `'keyEncoding'` and/or `'valueEncoding'`.\n\nThis method may `throw` a `WriteError` if there is a problem with your put (such as the `value` being `null` or `undefined`).\n\n<b><code>batch.del(key[, options])</code></b>\n\nQueue a *del* operation on the current batch, not committed until a `write()` is called on the batch.\n\nThe optional `options` argument can be used to override the default `'keyEncoding'`.\n\nThis method may `throw` a `WriteError` if there is a problem with your delete.\n\n<b><code>batch.clear()</code></b>\n\nClear all queued operations on the current batch, any previous operations will be discarded.\n\n<b><code>batch.write([callback])</code></b>\n\nCommit the queued operations for this batch. All operations not *cleared* will be written to the database atomically, that is, they will either all succeed or fail with no partial commits. The optional `callback` will be called when the operation has completed with an *error* argument if an error has occurred; if no `callback` is supplied and an error occurs then this method will `throw` a `WriteError`.\n\n\n--------------------------------------------------------\n<a name=\"isOpen\"></a>\n### db.isOpen()\n\nA LevelUP object can be in one of the following states:\n\n  * *\"new\"*     - newly created, not opened or closed\n  * *\"opening\"* - waiting for the database to be opened\n  * *\"open\"*    - successfully opened the database, available for use\n  * *\"closing\"* - waiting for the database to be closed\n  * *\"closed\"*  - database has been successfully closed, should not be used\n\n`isOpen()` will return `true` only when the state is \"open\".\n\n--------------------------------------------------------\n<a name=\"isClosed\"></a>\n### db.isClosed()\n\n*See <a href=\"#put\"><code>isOpen()</code></a>*\n\n`isClosed()` will return `true` only when the state is \"closing\" *or* \"closed\", it can be useful for determining if read and write operations are permissible.\n\n--------------------------------------------------------\n<a name=\"createReadStream\"></a>\n### db.createReadStream([options])\n\nYou can obtain a **ReadStream** of the full database by calling the `createReadStream()` method. The resulting stream is a complete Node.js-style [Readable Stream](http://nodejs.org/docs/latest/api/stream.html#stream_readable_stream) where `'data'` events emit objects with `'key'` and `'value'` pairs. You can also use the `start`, `end` and `limit` options to control the range of keys that are streamed.\n\n```js\ndb.createReadStream()\n  .on('data', function (data) {\n    console.log(data.key, '=', data.value)\n  })\n  .on('error', function (err) {\n    console.log('Oh my!', err)\n  })\n  .on('close', function () {\n    console.log('Stream closed')\n  })\n  .on('end', function () {\n    console.log('Stream closed')\n  })\n```\n\nThe standard `pause()`, `resume()` and `destroy()` methods are implemented on the ReadStream, as is `pipe()` (see below). `'data'`, '`error'`, `'end'` and `'close'` events are emitted.\n\nAdditionally, you can supply an options object as the first parameter to `createReadStream()` with the following options:\n\n* `'start'`: the key you wish to start the read at. By default it will start at the beginning of the store. Note that the *start* doesn't have to be an actual key that exists, LevelDB will simply find the *next* key, greater than the key you provide.\n\n* `'end'`: the key you wish to end the read on. By default it will continue until the end of the store. Again, the *end* doesn't have to be an actual key as an (inclusive) `<=`-type operation is performed to detect the end. You can also use the `destroy()` method instead of supplying an `'end'` parameter to achieve the same effect.\n\n* `'reverse'` *(boolean, default: `false`)*: a boolean, set to true if you want the stream to go in reverse order. Beware that due to the way LevelDB works, a reverse seek will be slower than a forward seek.\n\n* `'keys'` *(boolean, default: `true`)*: whether the `'data'` event should contain keys. If set to `true` and `'values'` set to `false` then `'data'` events will simply be keys, rather than objects with a `'key'` property. Used internally by the `createKeyStream()` method.\n\n* `'values'` *(boolean, default: `true`)*: whether the `'data'` event should contain values. If set to `true` and `'keys'` set to `false` then `'data'` events will simply be values, rather than objects with a `'value'` property. Used internally by the `createValueStream()` method.\n\n* `'limit'` *(number, default: `-1`)*: limit the number of results collected by this stream. This number represents a *maximum* number of results and may not be reached if you get to the end of the store or your `'end'` value first. A value of `-1` means there is no limit.\n\n* `'fillCache'` *(boolean, default: `false`)*: wheather LevelDB's LRU-cache should be filled with data read.\n\n* `'keyEncoding'` / `'valueEncoding'` *(string)*: the encoding applied to each read piece of data.\n\n--------------------------------------------------------\n<a name=\"createKeyStream\"></a>\n### db.createKeyStream([options])\n\nA **KeyStream** is a **ReadStream** where the `'data'` events are simply the keys from the database so it can be used like a traditional stream rather than an object stream.\n\nYou can obtain a KeyStream either by calling the `createKeyStream()` method on a LevelUP object or by passing passing an options object to `createReadStream()` with `keys` set to `true` and `values` set to `false`.\n\n```js\ndb.createKeyStream()\n  .on('data', function (data) {\n    console.log('key=', data)\n  })\n\n// same as:\ndb.createReadStream({ keys: true, values: false })\n  .on('data', function (data) {\n    console.log('key=', data)\n  })\n```\n\n--------------------------------------------------------\n<a name=\"createValueStream\"></a>\n### db.createValueStream([options])\n\nA **ValueStream** is a **ReadStream** where the `'data'` events are simply the values from the database so it can be used like a traditional stream rather than an object stream.\n\nYou can obtain a ValueStream either by calling the `createValueStream()` method on a LevelUP object or by passing passing an options object to `createReadStream()` with `values` set to `true` and `keys` set to `false`.\n\n```js\ndb.createValueStream()\n  .on('data', function (data) {\n    console.log('value=', data)\n  })\n\n// same as:\ndb.createReadStream({ keys: false, values: true })\n  .on('data', function (data) {\n    console.log('value=', data)\n  })\n```\n\n--------------------------------------------------------\n<a name=\"createWriteStream\"></a>\n### db.createWriteStream([options])\n\nA **WriteStream** can be obtained by calling the `createWriteStream()` method. The resulting stream is a complete Node.js-style [Writable Stream](http://nodejs.org/docs/latest/api/stream.html#stream_writable_stream) which accepts objects with `'key'` and `'value'` pairs on its `write()` method.\n\nThe WriteStream will buffer writes and submit them as a `batch()` operations where writes occur *within the same tick*.\n\n```js\nvar ws = db.createWriteStream()\n\nws.on('error', function (err) {\n  console.log('Oh my!', err)\n})\nws.on('close', function () {\n  console.log('Stream closed')\n})\n\nws.write({ key: 'name', value: 'Yuri Irsenovich Kim' })\nws.write({ key: 'dob', value: '16 February 1941' })\nws.write({ key: 'spouse', value: 'Kim Young-sook' })\nws.write({ key: 'occupation', value: 'Clown' })\nws.end()\n```\n\nThe standard `write()`, `end()`, `destroy()` and `destroySoon()` methods are implemented on the WriteStream. `'drain'`, `'error'`, `'close'` and `'pipe'` events are emitted.\n\nYou can specify encodings both for the whole stream and individual entries:\n\nTo set the encoding for the whole stream, provide an options object as the first parameter to `createWriteStream()` with `'keyEncoding'` and/or `'valueEncoding'`.\n\nTo set the encoding for an individual entry:\n\n```js\nwriteStream.write({\n    key           : new Buffer([1, 2, 3])\n  , value         : { some: 'json' }\n  , keyEncoding   : 'binary'\n  , valueEncoding : 'json'\n})\n```\n\n#### write({ type: 'put' })\n\nIf individual `write()` operations are performed with a `'type'` property of `'del'`, they will be passed on as `'del'` operations to the batch.\n\n```js\nvar ws = db.createWriteStream()\n\nws.on('error', function (err) {\n  console.log('Oh my!', err)\n})\nws.on('close', function () {\n  console.log('Stream closed')\n})\n\nws.write({ type: 'del', key: 'name' })\nws.write({ type: 'del', key: 'dob' })\nws.write({ type: 'put', key: 'spouse' })\nws.write({ type: 'del', key: 'occupation' })\nws.end()\n```\n\n#### db.createWriteStream({ type: 'del' })\n\nIf the *WriteStream* is created with a `'type'` option of `'del'`, all `write()` operations will be interpreted as `'del'`, unless explicitly specified as `'put'`.\n\n```js\nvar ws = db.createWriteStream({ type: 'del' })\n\nws.on('error', function (err) {\n  console.log('Oh my!', err)\n})\nws.on('close', function () {\n  console.log('Stream closed')\n})\n\nws.write({ key: 'name' })\nws.write({ key: 'dob' })\n// but it can be overridden\nws.write({ type: 'put', key: 'spouse', value: 'Ri Sol-ju' })\nws.write({ key: 'occupation' })\nws.end()\n```\n\n#### Pipes and Node Stream compatibility\n\nA ReadStream can be piped directly to a WriteStream, allowing for easy copying of an entire database. A simple `copy()` operation is included in LevelUP that performs exactly this on two open databases:\n\n```js\nfunction copy (srcdb, dstdb, callback) {\n  srcdb.createReadStream().pipe(dstdb.createWriteStream()).on('close', callback)\n}\n```\n\nThe ReadStream is also [fstream](https://github.com/isaacs/fstream)-compatible which means you should be able to pipe to and from fstreams. So you can serialize and deserialize an entire database to a directory where keys are filenames and values are their contents, or even into a *tar* file using [node-tar](https://github.com/isaacs/node-tar). See the [fstream functional test](https://github.com/rvagg/node-levelup/blob/master/test/functional/fstream-test.js) for an example. *(Note: I'm not really sure there's a great use-case for this but it's a fun example and it helps to harden the stream implementations.)*\n\nKeyStreams and ValueStreams can be treated like standard streams of raw data. If `'keyEncoding'` or `'valueEncoding'` is set to `'binary'` the `'data'` events will simply be standard Node `Buffer` objects straight out of the data store.\n\n\n--------------------------------------------------------\n<a name='approximateSize'></a>\n### db.db.approximateSize(start, end, callback)\n<code>approximateSize()</code> can used to get the approximate number of bytes of file system space used by the range `[start..end)`. The result may not include recently written data.\n\n```js\nvar db = require('level')('./huge.db')\n\ndb.db.approximateSize('a', 'c', function (err, size) {\n  if (err) return console.error('Ooops!', err)\n  console.log('Approximate size of range is %d', size)\n})\n```\n\n**Note:** `approximateSize()` is available via [LevelDOWN](https://github.com/rvagg/node-leveldown/), which by default is accessible as the `db` property of your LevelUP instance. This is a specific LevelDB operation and is not likely to be available where you replace LevelDOWN with an alternative back-end via the `'db'` option.\n\n\n--------------------------------------------------------\n<a name='getProperty'></a>\n### db.db.getProperty(property)\n<code>getProperty</code> can be used to get internal details from LevelDB. When issued with a valid property string, a readable string will be returned (this method is synchronous).\n\nCurrently, the only valid properties are:\n\n* <b><code>'leveldb.num-files-at-levelN'</code></b>: returns the number of files at level *N*, where N is an integer representing a valid level (e.g. \"0\").\n\n* <b><code>'leveldb.stats'</code></b>: returns a multi-line string describing statistics about LevelDB's internal operation.\n\n* <b><code>'leveldb.sstables'</code></b>: returns a multi-line string describing all of the *sstables* that make up contents of the current database.\n\n\n```js\nvar db = require('level')('./huge.db')\nconsole.log(db.db.getProperty('leveldb.num-files-at-level3'))\n// → '243'\n```\n\n**Note:** `getProperty()` is available via [LevelDOWN](https://github.com/rvagg/node-leveldown/), which by default is accessible as the `db` property of your LevelUP instance. This is a specific LevelDB operation and is not likely to be available where you replace LevelDOWN with an alternative back-end via the `'db'` option.\n\n\n--------------------------------------------------------\n<a name=\"destroy\"></a>\n### leveldown.destroy(location, callback)\n<code>destroy()</code> is used to completely remove an existing LevelDB database directory. You can use this function in place of a full directory *rm* if you want to be sure to only remove LevelDB-related files. If the directory only contains LevelDB files, the directory itself will be removed as well. If there are additional, non-LevelDB files in the directory, those files, and the directory, will be left alone.\n\nThe callback will be called when the destroy operation is complete, with a possible `error` argument.\n\n**Note:** `destroy()` is available via [LevelDOWN](https://github.com/rvagg/node-leveldown/) which you will have to install seperately, e.g.:\n\n```js\nrequire('leveldown').destroy('./huge.db', function (err) { console.log('done!') })\n```\n\n--------------------------------------------------------\n<a name=\"repair\"></a>\n### leveldown.repair(location, callback)\n<code>repair()</code> can be used to attempt a restoration of a damaged LevelDB store. From the LevelDB documentation:\n\n> If a DB cannot be opened, you may attempt to call this method to resurrect as much of the contents of the database as possible. Some data may be lost, so be careful when calling this function on a database that contains important information.\n\nYou will find information on the *repair* operation in the *LOG* file inside the store directory. \n\nA `repair()` can also be used to perform a compaction of the LevelDB log into table files.\n\nThe callback will be called when the repair operation is complete, with a possible `error` argument.\n\n**Note:** `repair()` is available via [LevelDOWN](https://github.com/rvagg/node-leveldown/) which you will have to install seperately, e.g.:\n\n```js\nrequire('leveldown').repair('./huge.db', function (err) { console.log('done!') })\n```\n\n--------------------------------------------------------\n\n<a name=\"events\"></a>\nEvents\n------\n\nLevelUP emits events when the callbacks to the corresponding methods are called.\n\n* `db.emit('put', key, value)` emitted when a new value is `'put'`\n* `db.emit('del', key)` emitted when a value is deleted\n* `db.emit('batch', ary)` emitted when a batch operation has executed\n* `db.emit('ready')` emitted when the database has opened (`'open'` is synonym)\n* `db.emit('closed')` emitted when the database has closed\n* `db.emit('opening')` emitted when the database is opening\n* `db.emit('closing')` emitted when the database is closing\n\nIf you do not pass a callback to an async function, and there is an error, LevelUP will `emit('error', err)` instead.\n\n<a name=\"json\"></a>\nJSON data\n---------\n\nYou specify `'json'` encoding for both keys and/or values, you can then supply JavaScript objects to LevelUP and receive them from all fetch operations, including ReadStreams. LevelUP will automatically *stringify* your objects and store them as *utf8* and parse the strings back into objects before passing them back to you.\n\n<a name=\"custom_encodings\"></a>\nCustom encodings\n----------------\n\nA custom encoding may be provided by passing in an object as an value for `keyEncoding` or `valueEncoding` (wherever accepted), it must have the following properties:\n\n```js\n{\n    encode : function (val) { ... }\n  , decode : function (val) { ... }\n  , buffer : boolean // encode returns a buffer-like and decode accepts a buffer\n  , type   : String  // name of this encoding type.\n}\n```\n\n*\"buffer-like\"* means either a `Buffer` if running in Node, or a Uint8Array if in a browser. Use [bops](https://github.com/chrisdickinson/bops) to get portable binary operations.\n\n<a name=\"extending\"></a>\nExtending LevelUP\n-----------------\n\nA list of <a href=\"https://github.com/rvagg/node-levelup/wiki/Modules\"><b>Node.js LevelDB modules and projects</b></a> can be found in the wiki.\n\nWhen attempting to extend the functionality of LevelUP, it is recommended that you consider using [level-hooks](https://github.com/dominictarr/level-hooks) and/or [level-sublevel](https://github.com/dominictarr/level-sublevel). **level-sublevel** is particularly helpful for keeping additional, extension-specific, data in a LevelDB store. It allows you to partition a LevelUP instance into multiple sub-instances that each correspond to discrete namespaced key ranges.\n\n<a name=\"multiproc\"></a>\nMulti-process access\n--------------------\n\nLevelDB is thread-safe but is **not** suitable for accessing with multiple processes. You should only ever have a LevelDB database open from a single Node.js process. Node.js clusters are made up of multiple processes so a LevelUP instance cannot be shared between them either.\n\nSee the <a href=\"https://github.com/rvagg/node-levelup/wiki/Modules\"><b>wiki</b></a> for some LevelUP extensions, including [multilevel](https://github.com/juliangruber/multilevel), that may help if you require a single data store to be shared across processes.\n\n<a name=\"support\"></a>\nGetting support\n---------------\n\nThere are multiple ways you can find help in using LevelDB in Node.js:\n\n * **IRC:** you'll find an active group of LevelUP users in the **##leveldb** channel on Freenode, including most of the contributors to this project.\n * **Mailing list:** there is an active [Node.js LevelDB](https://groups.google.com/forum/#!forum/node-levelup) Google Group.\n * **GitHub:** you're welcome to open an issue here on this GitHub repository if you have a question.\n\n<a name=\"contributing\"></a>\nContributing\n------------\n\nLevelUP is an **OPEN Open Source Project**. This means that:\n\n> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.\n\nSee the [CONTRIBUTING.md](https://github.com/rvagg/node-levelup/blob/master/CONTRIBUTING.md) file for more details.\n\n### Contributors\n\nLevelUP is only possible due to the excellent work of the following contributors:\n\n<table><tbody>\n<tr><th align=\"left\">Rod Vagg</th><td><a href=\"https://github.com/rvagg\">GitHub/rvagg</a></td><td><a href=\"http://twitter.com/rvagg\">Twitter/@rvagg</a></td></tr>\n<tr><th align=\"left\">John Chesley</th><td><a href=\"https://github.com/chesles/\">GitHub/chesles</a></td><td><a href=\"http://twitter.com/chesles\">Twitter/@chesles</a></td></tr>\n<tr><th align=\"left\">Jake Verbaten</th><td><a href=\"https://github.com/raynos\">GitHub/raynos</a></td><td><a href=\"http://twitter.com/raynos2\">Twitter/@raynos2</a></td></tr>\n<tr><th align=\"left\">Dominic Tarr</th><td><a href=\"https://github.com/dominictarr\">GitHub/dominictarr</a></td><td><a href=\"http://twitter.com/dominictarr\">Twitter/@dominictarr</a></td></tr>\n<tr><th align=\"left\">Max Ogden</th><td><a href=\"https://github.com/maxogden\">GitHub/maxogden</a></td><td><a href=\"http://twitter.com/maxogden\">Twitter/@maxogden</a></td></tr>\n<tr><th align=\"left\">Lars-Magnus Skog</th><td><a href=\"https://github.com/ralphtheninja\">GitHub/ralphtheninja</a></td><td><a href=\"http://twitter.com/ralphtheninja\">Twitter/@ralphtheninja</a></td></tr>\n<tr><th align=\"left\">David Björklund</th><td><a href=\"https://github.com/kesla\">GitHub/kesla</a></td><td><a href=\"http://twitter.com/david_bjorklund\">Twitter/@david_bjorklund</a></td></tr>\n<tr><th align=\"left\">Julian Gruber</th><td><a href=\"https://github.com/juliangruber\">GitHub/juliangruber</a></td><td><a href=\"http://twitter.com/juliangruber\">Twitter/@juliangruber</a></td></tr>\n<tr><th align=\"left\">Paolo Fragomeni</th><td><a href=\"https://github.com/hij1nx\">GitHub/hij1nx</a></td><td><a href=\"http://twitter.com/hij1nx\">Twitter/@hij1nx</a></td></tr>\n<tr><th align=\"left\">Anton Whalley</th><td><a href=\"https://github.com/No9\">GitHub/No9</a></td><td><a href=\"https://twitter.com/antonwhalley\">Twitter/@antonwhalley</a></td></tr>\n<tr><th align=\"left\">Matteo Collina</th><td><a href=\"https://github.com/mcollina\">GitHub/mcollina</a></td><td><a href=\"https://twitter.com/matteocollina\">Twitter/@matteocollina</a></td></tr>\n<tr><th align=\"left\">Pedro Teixeira</th><td><a href=\"https://github.com/pgte\">GitHub/pgte</a></td><td><a href=\"https://twitter.com/pgte\">Twitter/@pgte</a></td></tr>\n<tr><th align=\"left\">James Halliday</th><td><a href=\"https://github.com/substack\">GitHub/substack</a></td><td><a href=\"https://twitter.com/substack\">Twitter/@substack</a></td></tr>\n</tbody></table>\n\n### Windows\n\nA large portion of the Windows support comes from code by [Krzysztof Kowalczyk](http://blog.kowalczyk.info/) [@kjk](https://twitter.com/kjk), see his Windows LevelDB port [here](http://code.google.com/r/kkowalczyk-leveldb/). If you're using LevelUP on Windows, you should give him your thanks!\n\n\n<a name=\"license\"></a>\nLicense &amp; copyright\n-------------------\n\nCopyright (c) 2012-2014 LevelUP contributors (listed above).\n\nLevelUP is licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.\n\n=======\n*LevelUP builds on the excellent work of the LevelDB and Snappy teams from Google and additional contributors. LevelDB and Snappy are both issued under the [New BSD Licence](http://opensource.org/licenses/BSD-3-Clause).*\n",
readmeFilename:"README.md",bugs:{url:"https://github.com/rvagg/node-levelup/issues"},_id:"levelup@0.18.6",_from:"levelup@>=0.18.2 <0.19.0"}},{}],50:[function(e,t,n){(function(n,r,i){function o(e,t){h.call(this,e)
new i(0)
if(this._dbsize=this.db.container.length(),this._reverse=!!t.reverse,t.end instanceof i?(t.end.length=0)&&(this._end=this.db.container.key(this._dbsize-1)):this._end=t.end,this._limit=t.limit,this._count=0,t.start){for(var n=!1,r=0;r<this._dbsize;r++)if(this.db.container.key(r)>=t.start){this._pos=r,this._reverse&&(this.db.container.key(r)>t.start?this._pos=r-1:this._pos=r),n=!0
break}n||(this._pos=this._reverse?this._dbsize-1:-1)}else this._pos=this._reverse?this._dbsize-1:0}function s(t){if(!(this instanceof s))return new s(t)
l.call(this,t)
var n=e("./localstorage").localStorage
this.container=new n(t)}function a(e){return e instanceof ArrayBuffer}function u(e,t){if(null===e||void 0===e)return new Error(t+" cannot be `null` or `undefined`")
if(null===e||void 0===e)return new Error(t+" cannot be `null` or `undefined`")
if("key"===t){if(e instanceof Boolean)return new Error(t+" cannot be `null` or `undefined`")
if(""===e)return new Error(t+" cannot be empty")}if(0==e.toString().indexOf("[object ArrayBuffer]")&&(0==e.byteLength||void 0==e.byteLength))return new Error(t+" cannot be an empty Buffer")
if(a(e)){if(0===e.length)return new Error(t+" cannot be an empty Buffer")}else if(""===String(e))return new Error(t+" cannot be an empty String")}var c=e("util"),l=e("abstract-leveldown").AbstractLevelDOWN,h=e("abstract-leveldown").AbstractIterator,f=function(){},p=r.setImmediate||n.nextTick
c.inherits(o,h),o.prototype._next=function(e){if(this._pos>=this.db.container.length()||this._pos<0)return p(e)
var t,n=this.db.container.key(this._pos)
return this._end&&(this._reverse?n<this._end:n>this._end)?p(e):this._limit&&this._limit>0&&this._count++>=this._limit?p(e):(t=this.db.container.getItem(n),this._pos+=this._reverse?-1:1,void p(e.bind(null,void 0,n,t)))},c.inherits(s,l),s.prototype._open=function(e,t){p(function(){t(null,this)}.bind(this))},s.prototype._put=function(e,t,n,r){var o=u(e,"key")
if(o)return r(o)
if(o=u(t,"value"))return r(o)
if("object"==typeof t&&!i.isBuffer(t)&&void 0==t.buffer){var s={}
s.storetype="json",s.data=t,t=JSON.stringify(s)}this.container.setItem(e,t),p(r)},s.prototype._get=function(e,t,n){var r=u(e,"key")
if(r)return n(r)
a(e)||(e=String(e))
var o=this.container.getItem(e)
if(void 0===o)return p(function(){n(new Error("NotFound: "))})
if(t.asBuffer===!1||i.isBuffer(o)||(o=new i(String(o))),t.asBuffer===!1&&o.indexOf('{"storetype":"json","data"')>-1){var s=JSON.parse(o)
o=s.data}p(function(){n(null,o)})},s.prototype._del=function(e,t,n){var r=u(e,"key")
return r?n(r):(a(e)||(e=String(e)),this.container.removeItem(e),void p(n))},s.prototype._batch=function(e,t,n){var r,o,s,a=0
if(Array.isArray(e))for(;a<e.length;a++)if(e[a]){if(o=i.isBuffer(e[a].key)?e[a].key:String(e[a].key),r=u(o,"key"))return p(n.bind(null,r))
if("del"===e[a].type)this._del(e[a].key,t,f)
else if("put"===e[a].type){if(s=i.isBuffer(e[a].value)?e[a].value:String(e[a].value),r=u(s,"value"))return p(n.bind(null,r))
this._put(o,s,t,f)}}p(n)},s.prototype._iterator=function(e){return new o(this,e)},s.destroy=function(e,t){try{Object.keys(localStorage).forEach(function(t){t.substring(0,e.length+1)==e+"!"&&localStorage.removeItem(t)}),t()}catch(n){}},t.exports=s}).call(this,e("WuQzkM"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{"./localstorage":51,WuQzkM:183,"abstract-leveldown":54,buffer:177,util:204}],51:[function(e,t,n){function r(e){this._partition=e,this._keys=[]
for(var t=0;t<window.localStorage.length;t++)0==window.localStorage.key(t).indexOf(e+"!")&&this._keys.push(window.localStorage.key(t))
this._keys.sort()}r.prototype.key=function(e){var t=this._keys[e]
return"undefined"!=typeof t?this._keys[e].replace(this._partition+"!","").replace("!bin"):t},r.prototype.setItem=function(e,t){if(e=this._partition+"!"+e,t instanceof ArrayBuffer){var n="ArrayBuffer:"
t=n+btoa(String.fromCharCode.apply(null,t))}if(t instanceof Uint8Array){var n="Uint8Array:"
t=n+btoa(String.fromCharCode.apply(null,t))}for(var r=0;r<this._keys.length;r++)if(this._keys[r]===e)return void window.localStorage.setItem(e,t)
this._keys.push(e),this._keys.sort(),window.localStorage.setItem(e,t)},r.prototype.getItem=function(e){e=this._partition+"!"+e
var t=window.localStorage.getItem(e)
if(null==t)return void 0
if(0==t.indexOf("ArrayBuffer:")){var n=t.replace("ArrayBuffer:","")
return t=new ArrayBuffer(atob(n).split("").map(function(e){return e.charCodeAt(0)}))}if(0==t.indexOf("Uint8Array:")){var n=t.replace("Uint8Array:","")
return atob(n)}return t},r.prototype.removeItem=function(e){e=this._partition+"!"+e
for(var t=this._keys.length;t>=0;t--)this._keys[t]===e&&(this._keys.splice(t,1),window.localStorage.removeItem(e))},r.prototype.clear=function(){window.localStorage.clear()},r.prototype.length=function(){return this._keys.length},n.localStorage=r},{}],52:[function(e,t,n){t.exports=e(32)},{WuQzkM:183}],53:[function(e,t,n){t.exports=e(33)},{WuQzkM:183}],54:[function(e,t,n){(function(n,r){function i(e){if(!arguments.length||void 0===e)throw new Error("constructor requires at least a location argument")
if("string"!=typeof e)throw new Error("constructor requires a location string argument")
this.location=e}var o=e("xtend"),s=e("./abstract-iterator"),a=e("./abstract-chained-batch")
i.prototype.open=function(e,t){if("function"==typeof e&&(t=e),"function"!=typeof t)throw new Error("open() requires a callback argument")
return"object"!=typeof e&&(e={}),"function"==typeof this._open?this._open(e,t):void n.nextTick(t)},i.prototype.close=function(e){if("function"!=typeof e)throw new Error("close() requires a callback argument")
return"function"==typeof this._close?this._close(e):void n.nextTick(e)},i.prototype.get=function(e,t,r){var i
if("function"==typeof t&&(r=t),"function"!=typeof r)throw new Error("get() requires a callback argument")
return(i=this._checkKeyValue(e,"key",this._isBuffer))?r(i):(this._isBuffer(e)||(e=String(e)),"object"!=typeof t&&(t={}),"function"==typeof this._get?this._get(e,t,r):void n.nextTick(function(){r(new Error("NotFound"))}))},i.prototype.put=function(e,t,r,i){var o
if("function"==typeof r&&(i=r),"function"!=typeof i)throw new Error("put() requires a callback argument")
return(o=this._checkKeyValue(e,"key",this._isBuffer))?i(o):(o=this._checkKeyValue(t,"value",this._isBuffer))?i(o):(this._isBuffer(e)||(e=String(e)),this._isBuffer(t)||n.browser||(t=String(t)),"object"!=typeof r&&(r={}),"function"==typeof this._put?this._put(e,t,r,i):void n.nextTick(i))},i.prototype.del=function(e,t,r){var i
if("function"==typeof t&&(r=t),"function"!=typeof r)throw new Error("del() requires a callback argument")
return(i=this._checkKeyValue(e,"key",this._isBuffer))?r(i):(this._isBuffer(e)||(e=String(e)),"object"!=typeof t&&(t={}),"function"==typeof this._del?this._del(e,t,r):void n.nextTick(r))},i.prototype.batch=function(e,t,r){if(!arguments.length)return this._chainedBatch()
if("function"==typeof t&&(r=t),"function"!=typeof r)throw new Error("batch(array) requires a callback argument")
if(!Array.isArray(e))return r(new Error("batch(array) requires an array argument"))
"object"!=typeof t&&(t={})
for(var i,o,s=0,a=e.length;a>s;s++)if(i=e[s],"object"==typeof i){if(o=this._checkKeyValue(i.type,"type",this._isBuffer))return r(o)
if(o=this._checkKeyValue(i.key,"key",this._isBuffer))return r(o)
if("put"==i.type&&(o=this._checkKeyValue(i.value,"value",this._isBuffer)))return r(o)}return"function"==typeof this._batch?this._batch(e,t,r):void n.nextTick(r)},i.prototype.approximateSize=function(e,t,r){if(null==e||null==t||"function"==typeof e||"function"==typeof t)throw new Error("approximateSize() requires valid `start`, `end` and `callback` arguments")
if("function"!=typeof r)throw new Error("approximateSize() requires a callback argument")
return this._isBuffer(e)||(e=String(e)),this._isBuffer(t)||(t=String(t)),"function"==typeof this._approximateSize?this._approximateSize(e,t,r):void n.nextTick(function(){r(null,0)})},i.prototype._setupIteratorOptions=function(e){var t=this
return e=o(e),["start","end","gt","gte","lt","lte"].forEach(function(n){e[n]&&t._isBuffer(e[n])&&0===e[n].length&&delete e[n]}),e.reverse=!!e.reverse,e.reverse&&e.lt&&(e.start=e.lt),e.reverse&&e.lte&&(e.start=e.lte),!e.reverse&&e.gt&&(e.start=e.gt),!e.reverse&&e.gte&&(e.start=e.gte),(e.reverse&&e.lt&&!e.lte||!e.reverse&&e.gt&&!e.gte)&&(e.exclusiveStart=!0),e},i.prototype.iterator=function(e){return"object"!=typeof e&&(e={}),e=this._setupIteratorOptions(e),"function"==typeof this._iterator?this._iterator(e):new s(this)},i.prototype._chainedBatch=function(){return new a(this)},i.prototype._isBuffer=function(e){return r.isBuffer(e)},i.prototype._checkKeyValue=function(e,t){if(null===e||void 0===e)return new Error(t+" cannot be `null` or `undefined`")
if(null===e||void 0===e)return new Error(t+" cannot be `null` or `undefined`")
if(this._isBuffer(e)){if(0===e.length)return new Error(t+" cannot be an empty Buffer")}else if(""===String(e))return new Error(t+" cannot be an empty String")},t.exports.AbstractLevelDOWN=i,t.exports.AbstractIterator=s,t.exports.AbstractChainedBatch=a}).call(this,e("WuQzkM"),e("buffer").Buffer)},{"./abstract-chained-batch":52,"./abstract-iterator":53,WuQzkM:183,buffer:177,xtend:56}],55:[function(e,t,n){t.exports=e(17)},{}],56:[function(e,t,n){arguments[4][18][0].apply(n,arguments)},{"./has-keys":55,"object-keys":58}],57:[function(e,t,n){var r=Object.prototype.hasOwnProperty,i=Object.prototype.toString,o=function(e){var t="function"==typeof e&&!(e instanceof RegExp)||"[object Function]"===i.call(e)
return t||"undefined"==typeof window||(t=e===window.setTimeout||e===window.alert||e===window.confirm||e===window.prompt),t}
t.exports=function(e,t){if(!o(t))throw new TypeError("iterator must be a function")
var n,i,s="string"==typeof e,a=e.length,u=arguments.length>2?arguments[2]:null
if(a===+a)for(n=0;a>n;n++)null===u?t(s?e.charAt(n):e[n],n,e):t.call(u,s?e.charAt(n):e[n],n,e)
else for(i in e)r.call(e,i)&&(null===u?t(e[i],i,e):t.call(u,e[i],i,e))}},{}],58:[function(e,t,n){arguments[4][19][0].apply(n,arguments)},{"./shim":60}],59:[function(e,t,n){var r=Object.prototype.toString
t.exports=function i(e){var t=r.call(e),i="[object Arguments]"===t
return i||(i="[object Array]"!==t&&null!==e&&"object"==typeof e&&"number"==typeof e.length&&e.length>=0&&"[object Function]"===r.call(e.callee)),i}},{}],60:[function(e,t,n){!function(){"use strict"
var n,r=Object.prototype.hasOwnProperty,i=Object.prototype.toString,o=e("./foreach"),s=e("./isArguments"),a=!{toString:null}.propertyIsEnumerable("toString"),u=function(){}.propertyIsEnumerable("prototype"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]
n=function(e){var t=null!==e&&"object"==typeof e,n="[object Function]"===i.call(e),l=s(e),h=[]
if(!t&&!n&&!l)throw new TypeError("Object.keys called on a non-object")
if(l)o(e,function(e){h.push(e)})
else{var f,p=u&&n
for(f in e)p&&"prototype"===f||!r.call(e,f)||h.push(f)}if(a){var d=e.constructor,m=d&&d.prototype===e
o(c,function(t){m&&"constructor"===t||!r.call(e,t)||h.push(t)})}return h},t.exports=n}()},{"./foreach":57,"./isArguments":59}],61:[function(e,t,n){var r=e("events").EventEmitter,i=e("level-sublevel"),o=e("weak-type-wizard"),s=e("noddity-retrieval"),a=e("extend"),u=e("./lib/reflect.js"),c=e("./lib/index_manager.js"),l=e("./lib/post_manager.js"),h=new o({postMetadata:"metadata",string:["content","filename"],"default":{content:"",filename:""},cast:{postMetadata:new o({date:"date",markdown:"boolean"})}})
t.exports=function(e,t,n){function o(e,t){"function"==typeof e&&(t=e),"object"!=typeof e&&(e={})
var n=e.local||!1,r="number"==typeof e.mostRecent?-e.mostRecent:void 0,i=n?y.getLocalPosts:y.getPosts
i(r,void 0,t)}function f(){v.stop(),y.stop()}var p="string"==typeof e?new s(e):e,d=i(t),m=new r
n=a({},n)
var g=Object.create(m),v=new l(p,d.sublevel("posts",{valueEncoding:h.getLevelUpEncoding()}),{refreshEvery:n.refreshEvery,checkToSeeIfItemsNeedToBeRefreshedEvery:n.cacheCheckIntervalMs}),y=new c(p,v,d.sublevel("index",{valueEncoding:"json"}),{refreshEvery:n.refreshEvery,checkToSeeIfItemsNeedToBeRefreshedEvery:n.cacheCheckIntervalMs})
return u("change",v,m,"post changed"),u("change",y,m,"index changed"),y.on("change",y.getPosts),g.getPost=v.getPost,g.getPosts=o,g.allPostsAreLoaded=y.allPostsAreLoaded,g.stop=f,g.refreshPost=v.refresh,g}},{"./lib/index_manager.js":62,"./lib/post_manager.js":63,"./lib/reflect.js":64,events:181,extend:66,"level-sublevel":12,"noddity-retrieval":70,"weak-type-wizard":105}],62:[function(e,t,n){function r(e,t){var n=e&&t&&e.metadata&&t.metadata&&e.metadata.date&&t.metadata.date
return n&&e.metadata.date!=t.metadata.date?e.metadata.date<t.metadata.date?-1:1:0}function i(e,t){return e.length===t.length&&e.every(function(e,n){return t[n]===e})}function o(e,t,n,o){function l(e,t,n,i){"function"==typeof t&&(i=t),p(function(o,s){o?i(o):e(s,function(e,o){e||(o=o.sort(r),"number"==typeof t&&(o=o.slice(t,n))),i(e,o)})})}o=a({refreshEvery:6e5,comparison:i},o)
var h=Object.create(new u),f=s(n,function(t,n){e.getIndex(n)},o)
f.on("change",function(e,t){h.emit("change",t)})
var p=f.get.bind(f,c)
p()
var d=l.bind(null,t.getPosts),m=l.bind(null,t.getLocalPosts)
return h.getPosts=d,h.getLocalPosts=m,h.allPostsAreLoaded=function(e){p(function(t,n){t?e(!1,!1):m(function(t,r){e(t,t||r.length===n.length)})})},h.stop=f.stop,h}var s=e("levelup-cache"),a=e("extend"),u=e("events").EventEmitter,c="index"
t.exports=o},{events:181,extend:66,"levelup-cache":67}],63:[function(e,t,n){function r(e,t){return"undefined"!=typeof t&&l(e)?e.toString()===t.toString():e===t}function i(e,t){return e.content===t.content&&e.metadata.length===t.metadata.length&&e.filename===t.filename&&Object.keys(e.metadata).every(function(n){return r(e.metadata[n],t.metadata[n])})}function o(e,t,n){function r(e,t){d.get(e,t)}function o(e,t){var n=[],i=!1,o=s(),a=e.map(function(e,t){return function(o){r(e,function(e,r){!i&&e?i=e:i||(n[t]=r),o()})}})
o.gate.apply(o,a).then(function(){t(i,n)})}function l(e,t){var n=[],r=!1,i=s(),o=e.map(function(e){return function(t){d.getLocal(e,function(e,o){r||(e?e.notFound||(r=e,i.abort()):n.push(o)),t()})}})
i.gate.apply(i,o).then(function(e){t(r,n),e()})}n=n||{}
var f=Object.create(new u),p=c({refreshEvery:432e5},n,{comparison:i}),d=new a(t,e.getPost,p)
return h("change",d,f),f.getPost=r,f.getPosts=o,f.getLocalPosts=l,f.stop=d.stop,f.refresh=d.refresh,f}var s=e("asynquence"),a=e("levelup-cache"),u=e("events").EventEmitter,c=e("extend"),l=e("util").isDate,h=e("./reflect.js")
t.exports=o},{"./reflect.js":64,asynquence:65,events:181,extend:66,"levelup-cache":67,util:204}],64:[function(e,t,n){t.exports=function(e,t,n,r){t.on(e,n.emit.bind(n,r||e))}},{}],65:[function(e,t,n){!function(e,n,r){"undefined"!=typeof t&&t.exports?t.exports=r():"function"==typeof define&&define.amd?define(r):n[e]=r(e,n)}("ASQ",this,function(e,t){function n(e){return"undefined"!=typeof setImmediate?setImmediate(e):setTimeout(e,0)}function r(){function e(){function e(){clearTimeout(d),d=null,y.length=0,b.length=0,w.length=0,x.length=0}function t(){return g?r():void(d||(d=n(r)))}function r(){var n,r
if(d=null,g)e()
else if(m)for(;b.length;){n=b.shift()
try{n.apply(n,x)}catch(o){x.push(o),o.stack&&x.push(o.stack),0===b.length&&console.error.apply(console,x)}}else if(v&&y.length>0){v=!1,n=y.shift(),r=w.slice(),w.length=0,r.unshift(i())
try{n.apply(n,r)}catch(o){x.push(o),m=!0,t()}}}function i(){function e(){m||g||v||(v=!0,w.push.apply(w,arguments),x.length=0,t())}return e.fail=function(){m||g||v||(m=!0,w.length=0,x.push.apply(x,arguments),t())},e.abort=function(){m||g||(v=!1,g=!0,w.length=0,x.length=0,t())},e}function o(e,t,r){function i(){clearTimeout(d),d=w=x=p=null}function o(){return y?a():void(d||(d=n(a)))}function a(){if(!(m||g||b)){var t,n=[]
if(d=null,v)e.fail.apply(e,p),i()
else if(y)e.abort(),i()
else if(u()){for(b=!0,t=0;t<w.length;t++)n.push(x["m"+t])
e.apply(e,n),i()}}}function u(){if(!(m||g||v||y||b||0===w.length)){var e,t=!0
for(e=0;e<w.length;e++)if(null===w[e]){t=!1
break}return t}}function c(){function e(){if(!(m||g||v||y||b||w[t])){var e=s.call(arguments)
x["m"+t]=e.length>1?e:e[0],w[t]=!0,o()}}var t=w.length
return e.fail=function(){m||g||v||y||b||w[t]||(v=!0,p=s.call(arguments),o())},e.abort=function(){m||g||v||y||b||(y=!0,a())},w[t]=null,e}var l,h,f,p,d,v=!1,y=!1,b=!1,w=[],x={}
for(l=0;l<t.length&&!v&&!y;l++){h=r.slice(),h.unshift(c())
try{t[l].apply(t[l],h)}catch(k){f=k,v=!0
break}}f&&e.fail(f)}function a(){return m||g?k:(arguments.length>0&&y.push.apply(y,arguments),t(),k)}function u(){return g?k:(b.push.apply(b,arguments),t(),k)}function c(){if(m||g||0===arguments.length)return k
var e=s.apply(arguments)
return a(function(t){var n=s.call(arguments)
n.shift(),o(t,e,n)}),k}function l(){if(m||g||0===arguments.length)return k
var e,t=s.call(arguments)
for(e=0;e<t.length;e++)!function(e){a(function(t){var n=s.call(arguments,1)
e.apply(e,n),t()}).or(e.fail)}(t[e])
return k}function h(){if(m||g||0===arguments.length)return k
var e,t=s.call(arguments)
for(e=0;e<t.length;e++)!function(e){a(function(t){var n=s.call(arguments,1)
e.apply(e,n).pipe(t)})}(t[e])
return k}function f(){if(m||g||0===arguments.length)return k
var e,t=s.call(arguments)
for(e=0;e<t.length;e++)!function(e){a(function(t){var n=s.call(arguments,1)
t(e.apply(e,n))})}(t[e])
return k}function p(){return m?k:(g=!0,r(),k)}var d,m=!1,g=!1,v=!0,y=[],b=[],w=[],x=[],k={then:a,or:u,gate:c,pipe:l,seq:h,val:f,abort:p}
return arguments.length>0&&k.then.apply(k,arguments),k}return e}var i,o=(t||{})[e],s=Array.prototype.slice
return i=r(),i.noConflict=function(){return t&&(t[e]=o),i},i})},{}],66:[function(e,t,n){function r(e){if(!e||"[object Object]"!==o.call(e)||e.nodeType||e.setInterval)return!1
var t=i.call(e,"constructor"),n=i.call(e.constructor.prototype,"isPrototypeOf")
if(e.constructor&&!t&&!n)return!1
var r
for(r in e);return void 0===r||i.call(e,r)}var i=Object.prototype.hasOwnProperty,o=Object.prototype.toString
t.exports=function s(){var e,t,n,i,o,a,u=arguments[0]||{},c=1,l=arguments.length,h=!1
for("boolean"==typeof u&&(h=u,u=arguments[1]||{},c=2),"object"!=typeof u&&"function"!=typeof u&&(u={});l>c;c++)if(null!=(e=arguments[c]))for(t in e)n=u[t],i=e[t],u!==i&&(h&&i&&(r(i)||(o=Array.isArray(i)))?(o?(o=!1,a=n&&Array.isArray(n)?n:[]):a=n&&r(n)?n:{},u[t]=s(h,a,i)):void 0!==i&&(u[t]=i))
return u}},{}],67:[function(e,t,n){var r=e("stringmap"),i=e("level-sublevel"),o=e("asynquence"),s=e("events").EventEmitter,a=e("expire-unused-keys"),u=e("extend")
t.exports=function(e,t,n){function c(){g.stop(),m.stop()}function l(e){d.del(e),g.forget(e)
var t=v.get(e)
t&&(t.abort(),v.remove(e))}function h(e,r){var i=v.get(e)
g.touch(e),i||(i=o(function(r){t(e,function(t,i){d.get(e,function(o,s){!t&&v.has(e)&&d.put(e,i,function(){y.emit("load",e,i),(o&&o.notFound||!n.comparison(s,i))&&y.emit("change",e,i,s)}),r(t,i)})})}),v.set(e,i),i.then(function(t,n,r){v.remove(e),t(n,r)})),"function"==typeof r&&i.then(function(e,t,n){r(t,n),e(t,n)})}function f(e,t){return function(n,r){m.touch(e),"function"==typeof t&&t(n,r)}}n=n||{},n=u({refreshEvery:432e5,checkToSeeIfItemsNeedToBeRefreshedEvery:1e3,ttl:6048e5,comparison:function(e,t){return e===t}},n)
var p=i(e),d=p.sublevel("items"),m=new a(n.ttl,p.sublevel("item-expirations",{valueEncoding:"utf8"}),n.checkToSeeIfItemsNeedToBeRefreshedEvery),g=new a(n.refreshEvery,p.sublevel("refresh",{valueEncoding:"utf8"}),n.checkToSeeIfItemsNeedToBeRefreshedEvery),v=new r,y=Object.create(new s)
return g.on("expire",h),m.on("expire",l),y.stop=c,y.get=function(e,t){d.get(e,function(n,r){n&&n.notFound?h(e,f(e,t)):t&&f(e,t)(n,r)})},y.getLocal=function(e,t){d.get(e,f(e,t))},y.refresh=function(e,t){h(e,f(e,t))},y}},{asynquence:65,events:181,"expire-unused-keys":68,extend:66,"level-sublevel":12,stringmap:69}],68:[function(e,t,n){function r(e){function t(){n=!1}var n=!1
return function(){n||(n=!0,e(t))}}var i=e("events").EventEmitter
t.exports=function(e,t,n){function o(e){return e.filter(function(e){return-1===a.indexOf(e)})}var s=new i,a=[],u=r(function(n){var r=(new Date).getTime(),i=[]
t.createReadStream().on("data",function(t){parseInt(t.value)+e<r&&i.push(t.key)}).on("end",function(){var e=o(i),r=e.map(function(e){return{type:"del",key:e}})
t.batch(r,function(t){t||o(e).forEach(s.emit.bind(s,"expire")),a=[],n(t)})})})
s.on("touch",function(e){t.put(e,(new Date).getTime())}),s.on("forget",function(e){a.push(e),t.del(e)})
var c=setInterval(u,n||1e3)
return c.unref&&c.unref(),s.touch=s.emit.bind(s,"touch"),s.forget=s.emit.bind(s,"forget"),s.stop=function(){clearInterval(c)},s}},{events:181}],69:[function(e,t,n){var r=function(){"use strict"
function e(t){return this instanceof e?(this.obj=n(),this.hasProto=!1,this.proto=void 0,void(t&&this.setMany(t))):new e(t)}var t=Object.prototype.hasOwnProperty,n=function(){function e(e){for(var n in e)if(t.call(e,n))return!0
return!1}function n(e){return t.call(e,"__count__")||t.call(e,"__parent__")}var r=!1
if("function"==typeof Object.create&&(e(Object.create(null))||(r=!0)),r===!1&&e({}))throw new Error("StringMap environment error 0, please file a bug at https://github.com/olov/stringmap/issues")
var i=r?Object.create(null):{},o=!1
if(n(i)){if(i.__proto__=null,e(i)||n(i))throw new Error("StringMap environment error 1, please file a bug at https://github.com/olov/stringmap/issues")
o=!0}return function(){var e=r?Object.create(null):{}
return o&&(e.__proto__=null),e}}()
return e.prototype.has=function(e){if("string"!=typeof e)throw new Error("StringMap expected string key")
return"__proto__"===e?this.hasProto:t.call(this.obj,e)},e.prototype.get=function(e){if("string"!=typeof e)throw new Error("StringMap expected string key")
return"__proto__"===e?this.proto:t.call(this.obj,e)?this.obj[e]:void 0},e.prototype.set=function(e,t){if("string"!=typeof e)throw new Error("StringMap expected string key")
"__proto__"===e?(this.hasProto=!0,this.proto=t):this.obj[e]=t},e.prototype.remove=function(e){if("string"!=typeof e)throw new Error("StringMap expected string key")
var t=this.has(e)
return"__proto__"===e?(this.hasProto=!1,this.proto=void 0):delete this.obj[e],t},e.prototype["delete"]=e.prototype.remove,e.prototype.isEmpty=function(){for(var e in this.obj)if(t.call(this.obj,e))return!1
return!this.hasProto},e.prototype.size=function(){var e=0
for(var n in this.obj)t.call(this.obj,n)&&++e
return this.hasProto?e+1:e},e.prototype.keys=function(){var e=[]
for(var n in this.obj)t.call(this.obj,n)&&e.push(n)
return this.hasProto&&e.push("__proto__"),e},e.prototype.values=function(){var e=[]
for(var n in this.obj)t.call(this.obj,n)&&e.push(this.obj[n])
return this.hasProto&&e.push(this.proto),e},e.prototype.items=function(){var e=[]
for(var n in this.obj)t.call(this.obj,n)&&e.push([n,this.obj[n]])
return this.hasProto&&e.push(["__proto__",this.proto]),e},e.prototype.setMany=function(e){if(null===e||"object"!=typeof e&&"function"!=typeof e)throw new Error("StringMap expected Object")
for(var n in e)t.call(e,n)&&this.set(n,e[n])
return this},e.prototype.merge=function(e){for(var t=e.keys(),n=0;n<t.length;n++){var r=t[n]
this.set(r,e.get(r))}return this},e.prototype.map=function(e){for(var t=this.keys(),n=0;n<t.length;n++){var r=t[n]
t[n]=e(this.get(r),r)}return t},e.prototype.forEach=function(e){for(var t=this.keys(),n=0;n<t.length;n++){var r=t[n]
e(this.get(r),r)}},e.prototype.clone=function(){var t=e()
return t.merge(this)},e.prototype.toString=function(){var e=this
return"{"+this.keys().map(function(t){return JSON.stringify(t)+":"+JSON.stringify(e.get(t))}).join(",")+"}"},e}()
"undefined"!=typeof t&&"undefined"!=typeof t.exports&&(t.exports=r)},{}],70:[function(e,t,n){var r=e("request"),i=e("url"),o=e("text-metadata-parser")
t.exports=function(e){var t=function(t,n,o){var s=i.resolve(e,t),a={url:s,agentOptions:{rejectUnauthorized:!1}}
r(a,function(e,t,r){if(e)n(new Error("Lookup of "+s+" failed\n========\n"+e.message))
else if(200!==t.statusCode)n(new Error("Lookup of "+s+" returned status "+t.statusCode+"\n==========\n"+r))
else{var i=null
try{i=o(r)}catch(a){n(new Error("Error parsing file with contents:\n"+r+"\n==========\n"+a.message))}null!==i&&n(null,i)}})}
return{getIndex:function(e){t("index.json",e,JSON.parse)},getPost:function(e,n){t(e,n,function(t){var n=o(t,{date:"date","boolean":"markdown"})
return n.filename=e,n})}}}},{request:71,"text-metadata-parser":104,url:202}],71:[function(e,t,n){!function(e,r){"function"==typeof define&&define.amd?define([],r):"object"==typeof n?t.exports=r():e.returnExports=r()}(this,function(){function e(i,o){if("function"!=typeof o)throw new Error("Bad callback given: "+o)
if(!i)throw new Error("No options given")
var a=i.onResponse
if(i="string"==typeof i?{uri:i}:JSON.parse(JSON.stringify(i)),i.onResponse=a,i.verbose&&(e.log=r()),i.url&&(i.uri=i.url,delete i.url),!i.uri&&""!==i.uri)throw new Error("options.uri is a required argument")
if("string"!=typeof i.uri)throw new Error("options.uri must be a string")
for(var u=["proxy","_redirectsFollowed","maxRedirects","followRedirect"],c=0;c<u.length;c++)if(i[u[c]])throw new Error("options."+u[c]+" is not supported")
if(i.callback=o,i.method=i.method||"GET",i.headers=i.headers||{},i.body=i.body||null,i.timeout=i.timeout||e.DEFAULT_TIMEOUT,i.headers.host)throw new Error("Options.headers.host is not supported")
i.json&&(i.headers.accept=i.headers.accept||"application/json","GET"!==i.method&&(i.headers["content-type"]="application/json"),"boolean"!=typeof i.json?i.body=JSON.stringify(i.json):"string"!=typeof i.body&&(i.body=JSON.stringify(i.body)))
var l=function(e){var t=[]
for(var n in e)e.hasOwnProperty(n)&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]))
return t.join("&")}
if(i.qs){var h="string"==typeof i.qs?i.qs:l(i.qs);-1!==i.uri.indexOf("?")?i.uri=i.uri+"&"+h:i.uri=i.uri+"?"+h}var f=function(e){var t={}
t.boundry="-------------------------------"+Math.floor(1e9*Math.random())
var n=[]
for(var r in e)e.hasOwnProperty(r)&&n.push("--"+t.boundry+'\nContent-Disposition: form-data; name="'+r+'"\n\n'+e[r]+"\n")
return n.push("--"+t.boundry+"--"),t.body=n.join(""),t.length=t.body.length,t.type="multipart/form-data; boundary="+t.boundry,t}
if(i.form){if("string"==typeof i.form)throw"form name unsupported"
if("POST"===i.method){var p=(i.encoding||"application/x-www-form-urlencoded").toLowerCase()
switch(i.headers["content-type"]=p,p){case"application/x-www-form-urlencoded":i.body=l(i.form).replace(/%20/g,"+")
break
case"multipart/form-data":var d=f(i.form)
i.body=d.body,i.headers["content-type"]=d.type
break
default:throw new Error("unsupported encoding:"+p)}}}return i.onResponse=i.onResponse||n,i.onResponse===!0&&(i.onResponse=o,i.callback=n),!i.headers.authorization&&i.auth&&(i.headers.authorization="Basic "+s(i.auth.username+":"+i.auth.password)),t(i)}function t(t){function n(){h=!0
var n=new Error("ETIMEDOUT")
return n.code="ETIMEDOUT",n.duration=t.timeout,e.log.error("Timeout",{id:l._id,milliseconds:t.timeout}),t.callback(n,l)}function r(n){if(h)return e.log.debug("Ignoring timed out state change",{state:l.readyState,id:l.id})
if(e.log.debug("State change",{state:l.readyState,id:l.id,timed_out:h}),l.readyState===a.OPENED){e.log.debug("Request started",{id:l.id})
for(var r in t.headers)l.setRequestHeader(r,t.headers[r])}else l.readyState===a.HEADERS_RECEIVED?i():l.readyState===a.LOADING?(i(),s()):l.readyState===a.DONE&&(i(),s(),u())}function i(){if(!m.response){if(m.response=!0,e.log.debug("Got response",{id:l.id,status:l.status}),clearTimeout(l.timeoutTimer),l.statusCode=l.status,f&&0==l.statusCode){var n=new Error("CORS request rejected: "+t.uri)
return n.cors="rejected",m.loading=!0,m.end=!0,t.callback(n,l)}t.onResponse(null,l)}}function s(){m.loading||(m.loading=!0,e.log.debug("Response body loading",{id:l.id}))}function u(){if(!m.end){if(m.end=!0,e.log.debug("Request done",{id:l.id}),l.body=l.responseText,t.json)try{l.body=JSON.parse(l.responseText)}catch(n){return t.callback(n,l)}t.callback(null,l,l.body)}}var l=new a,h=!1,f=o(t.uri),p="withCredentials"in l
if(c+=1,l.seq_id=c,l.id=c+": "+t.method+" "+t.uri,l._id=l.id,f&&!p){var d=new Error("Browser does not support cross-origin request: "+t.uri)
return d.cors="unsupported",t.callback(d,l)}l.timeoutTimer=setTimeout(n,t.timeout)
var m={response:!1,loading:!1,end:!1}
return l.onreadystatechange=r,l.open(t.method,t.uri,!0),f&&(l.withCredentials=!!t.withCredentials),l.send(t.body),l}function n(){}function r(){var e,t,r={},o=["trace","debug","info","warn","error"]
for(t=0;t<o.length;t++)e=o[t],r[e]=n,"undefined"!=typeof console&&console&&console[e]&&(r[e]=i(console,e))
return r}function i(e,t){function n(n,r){return"object"==typeof r&&(n+=" "+JSON.stringify(r)),e[t].call(e,n)}return n}function o(e){var t,n=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/
try{t=location.href}catch(r){t=document.createElement("a"),t.href="",t=t.href}var i=n.exec(t.toLowerCase())||[],o=n.exec(e.toLowerCase()),s=!(!o||o[1]==i[1]&&o[2]==i[2]&&(o[3]||("http:"===o[1]?80:443))==(i[3]||("http:"===i[1]?80:443)))
return s}function s(e){var t,n,r,i,o,s,a,u,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l=0,h=0,f="",p=[]
if(!e)return e
do t=e.charCodeAt(l++),n=e.charCodeAt(l++),r=e.charCodeAt(l++),u=t<<16|n<<8|r,i=u>>18&63,o=u>>12&63,s=u>>6&63,a=63&u,p[h++]=c.charAt(i)+c.charAt(o)+c.charAt(s)+c.charAt(a)
while(l<e.length)
switch(f=p.join(""),e.length%3){case 1:f=f.slice(0,-2)+"=="
break
case 2:f=f.slice(0,-1)+"="}return f}var a=XMLHttpRequest
if(!a)throw new Error("missing XMLHttpRequest")
e.log={trace:n,debug:n,info:n,warn:n,error:n}
var u=18e4,c=0
e.withCredentials=!1,e.DEFAULT_TIMEOUT=u,e.defaults=function(t,n){var r=function(e){var n=function(n,r){n="string"==typeof n?{uri:n}:JSON.parse(JSON.stringify(n))
for(var i in t)void 0===n[i]&&(n[i]=t[i])
return e(n,r)}
return n},i=r(e)
return i.get=r(e.get),i.post=r(e.post),i.put=r(e.put),i.head=r(e.head),i}
var l=["get","put","post","head"]
return l.forEach(function(t){var n=t.toUpperCase(),r=t.toLowerCase()
e[r]=function(t){"string"==typeof t?t={method:n,uri:t}:(t=JSON.parse(JSON.stringify(t)),t.method=n)
var r=[t].concat(Array.prototype.slice.apply(arguments,[1]))
return e.apply(this,r)}}),e.couch=function(t,r){function i(e,t,n){if(e)return r(e,t,n)
if((t.statusCode<200||t.statusCode>299)&&n.error){e=new Error("CouchDB error: "+(n.error.reason||n.error.error))
for(var i in n)e[i]=n[i]
return r(e,t,n)}return r(e,t,n)}"string"==typeof t&&(t={uri:t}),t.json=!0,t.body&&(t.json=t.body),delete t.body,r=r||n
var o=e(t,i)
return o},e})},{}],72:[function(e,t,n){var r=e("js-yaml"),i=/^(-{3}(?:\r?\n)([\w\W]+?)(?:\r?\n)-{3})?([\w\W]*)*/
t.exports=function(e,t){t=t||"__content"
var n=i.exec(e),o=n[2]?r.load(n[2]):{}
return o[t]=n[3]||"",o}},{"js-yaml":73}],73:[function(e,t,n){"use strict"
var r=e("./lib/js-yaml.js")
t.exports=r},{"./lib/js-yaml.js":74}],74:[function(e,t,n){"use strict"
function r(e){return function(){throw new Error("Function "+e+" is deprecated and cannot be used.")}}var i=e("./js-yaml/loader"),o=e("./js-yaml/dumper")
t.exports.Type=e("./js-yaml/type"),t.exports.Schema=e("./js-yaml/schema"),t.exports.FAILSAFE_SCHEMA=e("./js-yaml/schema/failsafe"),t.exports.JSON_SCHEMA=e("./js-yaml/schema/json"),t.exports.CORE_SCHEMA=e("./js-yaml/schema/core"),t.exports.DEFAULT_SAFE_SCHEMA=e("./js-yaml/schema/default_safe"),t.exports.DEFAULT_FULL_SCHEMA=e("./js-yaml/schema/default_full"),t.exports.load=i.load,t.exports.loadAll=i.loadAll,t.exports.safeLoad=i.safeLoad,t.exports.safeLoadAll=i.safeLoadAll,t.exports.dump=o.dump,t.exports.safeDump=o.safeDump,t.exports.YAMLException=e("./js-yaml/exception"),t.exports.MINIMAL_SCHEMA=e("./js-yaml/schema/failsafe"),t.exports.SAFE_SCHEMA=e("./js-yaml/schema/default_safe"),t.exports.DEFAULT_SCHEMA=e("./js-yaml/schema/default_full"),t.exports.scan=r("scan"),t.exports.parse=r("parse"),t.exports.compose=r("compose"),t.exports.addConstructor=r("addConstructor")},{"./js-yaml/dumper":76,"./js-yaml/exception":77,"./js-yaml/loader":78,"./js-yaml/schema":80,"./js-yaml/schema/core":81,"./js-yaml/schema/default_full":82,"./js-yaml/schema/default_safe":83,"./js-yaml/schema/failsafe":84,"./js-yaml/schema/json":85,"./js-yaml/type":86}],75:[function(e,t,n){"use strict"
function r(e){return"undefined"==typeof e||null===e}function i(e){return"object"==typeof e&&null!==e}function o(e){return Array.isArray(e)?e:r(e)?[]:[e]}function s(e,t){var n,r,i,o
if(t)for(o=Object.keys(t),n=0,r=o.length;r>n;n+=1)i=o[n],e[i]=t[i]
return e}function a(e,t){var n,r=""
for(n=0;t>n;n+=1)r+=e
return r}function u(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e}t.exports.isNothing=r,t.exports.isObject=i,t.exports.toArray=o,t.exports.repeat=a,t.exports.isNegativeZero=u,t.exports.extend=s},{}],76:[function(e,t,n){"use strict"
function r(e,t){var n,r,i,o,s,a,u
if(null===t)return{}
for(n={},r=Object.keys(t),i=0,o=r.length;o>i;i+=1)s=r[i],a=String(t[s]),"!!"===s.slice(0,2)&&(s="tag:yaml.org,2002:"+s.slice(2)),u=e.compiledTypeMap[s],u&&N.call(u.styleAliases,a)&&(a=u.styleAliases[a]),n[s]=a
return n}function i(e){var t,n,r
if(t=e.toString(16).toUpperCase(),255>=e)n="x",r=2
else if(65535>=e)n="u",r=4
else{if(!(4294967295>=e))throw new A("code point within a string may not be greater than 0xFFFFFFFF")
n="U",r=8}return"\\"+n+S.repeat("0",r-t.length)+t}function o(e){this.schema=e.schema||T,this.indent=Math.max(1,e.indent||2),this.skipInvalid=e.skipInvalid||!1,this.flowLevel=S.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=r(this.schema,e.styles||null),this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function s(e,t){for(var n,r=S.repeat(" ",t),i=0,o=-1,s="",a=e.length;a>i;)o=e.indexOf("\n",i),-1===o?(n=e.slice(i),i=a):(n=e.slice(i,o+1),i=o+1),n.length&&"\n"!==n&&(s+=r),s+=n
return s}function a(e,t){return"\n"+S.repeat(" ",e.indent*t)}function u(e,t){var n,r,i
for(n=0,r=e.implicitTypes.length;r>n;n+=1)if(i=e.implicitTypes[n],i.resolve(t))return!0
return!1}function c(e){this.source=e,this.result="",this.checkpoint=0}function l(e,t,n){var r,i,o,a,l,f,m,g,v,y,b,w,x,k,E,_,S,A,T,C,O
if(0===t.length)return void(e.dump="''")
if(-1!==te.indexOf(t))return void(e.dump="'"+t+"'")
for(r=!0,i=t.length?t.charCodeAt(0):0,o=j===i||j===t.charCodeAt(t.length-1),(W===i||G===i||$===i||Q===i)&&(r=!1),o?(r=!1,a=!1,l=!1):(a=!0,l=!0),f=!0,m=new c(t),g=!1,v=0,y=0,b=e.indent*n,w=80,40>b?w-=b:w=40,k=0;k<t.length;k++){if(x=t.charCodeAt(k),r){if(p(x))continue
r=!1}f&&x===U&&(f=!1),E=ee[x],_=d(x),(E||_)&&(x!==I&&x!==M&&x!==U?(a=!1,l=!1):x===I&&(g=!0,f=!1,k>0&&(S=t.charCodeAt(k-1),S===j&&(l=!1,a=!1)),a&&(A=k-v,v=k,A>y&&(y=A))),x!==M&&(f=!1),m.takeUpTo(k),m.escapeChar())}if(r&&u(e,t)&&(r=!1),T="",(a||l)&&(C=0,t.charCodeAt(t.length-1)===I&&(C+=1,t.charCodeAt(t.length-2)===I&&(C+=1)),0===C?T="-":2===C&&(T="+")),l&&w>y&&(a=!1),g||(l=!1),r)e.dump=t
else if(f)e.dump="'"+t+"'"
else if(a)O=h(t,w),e.dump=">"+T+"\n"+s(O,b)
else if(l)T||(t=t.replace(/\n$/,"")),e.dump="|"+T+"\n"+s(t,b)
else{if(!m)throw new Error("Failed to dump scalar value")
m.finish(),e.dump='"'+m.result+'"'}}function h(e,t){var n,r="",i=0,o=e.length,s=/\n+$/.exec(e)
for(s&&(o=s.index+1);o>i;)n=e.indexOf("\n",i),n>o||-1===n?(r&&(r+="\n\n"),r+=f(e.slice(i,o),t),i=o):(r&&(r+="\n\n"),r+=f(e.slice(i,n),t),i=n+1)
return s&&"\n"!==s[0]&&(r+=s[0]),r}function f(e,t){if(""===e)return e
for(var n,r,i,o=/[^\s] [^\s]/g,s="",a=0,u=0,c=o.exec(e);c;)n=c.index,n-u>t&&(r=a!==u?a:n,s&&(s+="\n"),i=e.slice(u,r),s+=i,u=r+1),a=n+1,c=o.exec(e)
return s&&(s+="\n"),s+=u!==a&&e.length-u>t?e.slice(u,a)+"\n"+e.slice(a+1):e.slice(u)}function p(e){return L!==e&&I!==e&&R!==e&&z!==e&&K!==e&&Y!==e&&J!==e&&X!==e&&D!==e&&B!==e&&q!==e&&P!==e&&Z!==e&&H!==e&&U!==e&&M!==e&&F!==e&&V!==e&&!ee[e]&&!d(e)}function d(e){return!(e>=32&&126>=e||133===e||e>=160&&55295>=e||e>=57344&&65533>=e||e>=65536&&1114111>=e)}function m(e,t,n){var r,i,o="",s=e.tag
for(r=0,i=n.length;i>r;r+=1)w(e,t,n[r],!1,!1)&&(0!==r&&(o+=", "),o+=e.dump)
e.tag=s,e.dump="["+o+"]"}function g(e,t,n,r){var i,o,s="",u=e.tag
for(i=0,o=n.length;o>i;i+=1)w(e,t+1,n[i],!0,!0)&&(r&&0===i||(s+=a(e,t)),s+="- "+e.dump)
e.tag=u,e.dump=s||"[]"}function v(e,t,n){var r,i,o,s,a,u="",c=e.tag,l=Object.keys(n)
for(r=0,i=l.length;i>r;r+=1)a="",0!==r&&(a+=", "),o=l[r],s=n[o],w(e,t,o,!1,!1)&&(e.dump.length>1024&&(a+="? "),a+=e.dump+": ",w(e,t,s,!1,!1)&&(a+=e.dump,u+=a))
e.tag=c,e.dump="{"+u+"}"}function y(e,t,n,r){var i,o,s,u,c,l,h="",f=e.tag,p=Object.keys(n)
for(i=0,o=p.length;o>i;i+=1)l="",r&&0===i||(l+=a(e,t)),s=p[i],u=n[s],w(e,t+1,s,!0,!0)&&(c=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024,c&&(l+=e.dump&&I===e.dump.charCodeAt(0)?"?":"? "),l+=e.dump,c&&(l+=a(e,t)),w(e,t+1,u,!0,c)&&(l+=e.dump&&I===e.dump.charCodeAt(0)?":":": ",l+=e.dump,h+=l))
e.tag=f,e.dump=h||"{}"}function b(e,t,n){var r,i,o,s,a,u
for(i=n?e.explicitTypes:e.implicitTypes,o=0,s=i.length;s>o;o+=1)if(a=i[o],(a.instanceOf||a.predicate)&&(!a.instanceOf||"object"==typeof t&&t instanceof a.instanceOf)&&(!a.predicate||a.predicate(t))){if(e.tag=n?a.tag:"?",a.represent){if(u=e.styleMap[a.tag]||a.defaultStyle,"[object Function]"===O.call(a.represent))r=a.represent(t,u)
else{if(!N.call(a.represent,u))throw new A("!<"+a.tag+'> tag resolver accepts not "'+u+'" style')
r=a.represent[u](t,u)}e.dump=r}return!0}return!1}function w(e,t,n,r,i){e.tag=null,e.dump=n,b(e,n,!1)||b(e,n,!0)
var o=O.call(e.dump)
r&&(r=0>e.flowLevel||e.flowLevel>t),(null!==e.tag&&"?"!==e.tag||2!==e.indent&&t>0)&&(i=!1)
var s,a,u="[object Object]"===o||"[object Array]"===o
if(u&&(s=e.duplicates.indexOf(n),a=-1!==s),a&&e.usedDuplicates[s])e.dump="*ref_"+s
else{if(u&&a&&!e.usedDuplicates[s]&&(e.usedDuplicates[s]=!0),"[object Object]"===o)r&&0!==Object.keys(e.dump).length?(y(e,t,e.dump,i),a&&(e.dump="&ref_"+s+(0===t?"\n":"")+e.dump)):(v(e,t,e.dump),a&&(e.dump="&ref_"+s+" "+e.dump))
else if("[object Array]"===o)r&&0!==e.dump.length?(g(e,t,e.dump,i),a&&(e.dump="&ref_"+s+(0===t?"\n":"")+e.dump)):(m(e,t,e.dump),a&&(e.dump="&ref_"+s+" "+e.dump))
else{if("[object String]"!==o){if(e.skipInvalid)return!1
throw new A("unacceptable kind of an object to dump "+o)}"?"!==e.tag&&l(e,e.dump,t)}null!==e.tag&&"?"!==e.tag&&(e.dump="!<"+e.tag+"> "+e.dump)}return!0}function x(e,t){var n,r,i=[],o=[]
for(k(e,i,o),n=0,r=o.length;r>n;n+=1)t.duplicates.push(i[o[n]])
t.usedDuplicates=new Array(r)}function k(e,t,n){var r,i,o
O.call(e)
if(null!==e&&"object"==typeof e)if(i=t.indexOf(e),-1!==i)-1===n.indexOf(i)&&n.push(i)
else if(t.push(e),Array.isArray(e))for(i=0,o=e.length;o>i;i+=1)k(e[i],t,n)
else for(r=Object.keys(e),i=0,o=r.length;o>i;i+=1)k(e[r[i]],t,n)}function E(e,t){t=t||{}
var n=new o(t)
return x(e,n),w(n,0,e,!0,!0)?n.dump+"\n":""}function _(e,t){return E(e,S.extend({schema:C},t))}var S=e("./common"),A=e("./exception"),T=e("./schema/default_full"),C=e("./schema/default_safe"),O=Object.prototype.toString,N=Object.prototype.hasOwnProperty,L=9,I=10,R=13,j=32,P=33,M=34,D=35,F=37,B=38,U=39,q=42,z=44,W=45,V=58,H=62,G=63,$=64,K=91,Y=93,Q=96,J=123,Z=124,X=125,ee={}
ee[0]="\\0",ee[7]="\\a",ee[8]="\\b",ee[9]="\\t",ee[10]="\\n",ee[11]="\\v",ee[12]="\\f",ee[13]="\\r",ee[27]="\\e",ee[34]='\\"',ee[92]="\\\\",ee[133]="\\N",ee[160]="\\_",ee[8232]="\\L",ee[8233]="\\P"
var te=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"]
c.prototype.takeUpTo=function(e){var t
if(e<this.checkpoint)throw t=new Error("position should be > checkpoint"),t.position=e,t.checkpoint=this.checkpoint,t
return this.result+=this.source.slice(this.checkpoint,e),this.checkpoint=e,this},c.prototype.escapeChar=function(){var e,t
return e=this.source.charCodeAt(this.checkpoint),t=ee[e]||i(e),this.result+=t,this.checkpoint+=1,this},c.prototype.finish=function(){this.source.length>this.checkpoint&&this.takeUpTo(this.source.length)},t.exports.dump=E,t.exports.safeDump=_},{"./common":75,"./exception":77,"./schema/default_full":82,"./schema/default_safe":83}],77:[function(e,t,n){"use strict"
function r(e,t){this.name="YAMLException",this.reason=e,this.mark=t,this.message=this.toString(!1)}r.prototype.toString=function(e){var t
return t="JS-YAML: "+(this.reason||"(unknown reason)"),!e&&this.mark&&(t+=" "+this.mark.toString()),t},t.exports=r},{}],78:[function(e,t,n){"use strict"
function r(e){return 10===e||13===e}function i(e){return 9===e||32===e}function o(e){return 9===e||32===e||10===e||13===e}function s(e){return 44===e||91===e||93===e||123===e||125===e}function a(e){var t
return e>=48&&57>=e?e-48:(t=32|e,t>=97&&102>=t?t-97+10:-1)}function u(e){return 120===e?2:117===e?4:85===e?8:0}function c(e){return e>=48&&57>=e?e-48:-1}function l(e){return 48===e?"\x00":97===e?"":98===e?"\b":116===e?"	":9===e?"	":110===e?"\n":118===e?"":102===e?"\f":114===e?"\r":101===e?"":32===e?" ":34===e?'"':47===e?"/":92===e?"\\":78===e?"":95===e?" ":76===e?"\u2028":80===e?"\u2029":""}function h(e){return 65535>=e?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function f(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||V,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[]}function p(e,t){return new q(t,new z(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function d(e,t){throw p(e,t)}function m(e,t){var n=p(e,t)
if(!e.onWarning)throw n
e.onWarning.call(null,n)}function g(e,t,n,r){var i,o,s,a
if(n>t){if(a=e.input.slice(t,n),r)for(i=0,o=a.length;o>i;i+=1)s=a.charCodeAt(i),9===s||s>=32&&1114111>=s||d(e,"expected valid JSON character")
e.result+=a}}function v(e,t,n){var r,i,o,s
for(U.isObject(n)||d(e,"cannot merge mappings; the provided source object is unacceptable"),r=Object.keys(n),o=0,s=r.length;s>o;o+=1)i=r[o],H.call(t,i)||(t[i]=n[i])}function y(e,t,n,r,i){var o,s
if(r=String(r),null===t&&(t={}),"tag:yaml.org,2002:merge"===n)if(Array.isArray(i))for(o=0,s=i.length;s>o;o+=1)v(e,t,i[o])
else v(e,t,i)
else t[r]=i
return t}function b(e){var t
t=e.input.charCodeAt(e.position),10===t?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):d(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function w(e,t,n){for(var o=0,s=e.input.charCodeAt(e.position);0!==s;){for(;i(s);)s=e.input.charCodeAt(++e.position)
if(t&&35===s)do s=e.input.charCodeAt(++e.position)
while(10!==s&&13!==s&&0!==s)
if(!r(s))break
for(b(e),s=e.input.charCodeAt(e.position),o++,e.lineIndent=0;32===s;)e.lineIndent++,s=e.input.charCodeAt(++e.position)}return-1!==n&&0!==o&&e.lineIndent<n&&m(e,"deficient indentation"),o}function x(e){var t,n=e.position
return t=e.input.charCodeAt(n),45!==t&&46!==t||e.input.charCodeAt(n+1)!==t||e.input.charCodeAt(n+2)!==t||(n+=3,t=e.input.charCodeAt(n),0!==t&&!o(t))?!1:!0}function k(e,t){1===t?e.result+=" ":t>1&&(e.result+=U.repeat("\n",t-1))}function E(e,t,n){var a,u,c,l,h,f,p,d,m,v=e.kind,y=e.result
if(m=e.input.charCodeAt(e.position),o(m)||s(m)||35===m||38===m||42===m||33===m||124===m||62===m||39===m||34===m||37===m||64===m||96===m)return!1
if((63===m||45===m)&&(u=e.input.charCodeAt(e.position+1),o(u)||n&&s(u)))return!1
for(e.kind="scalar",e.result="",c=l=e.position,h=!1;0!==m;){if(58===m){if(u=e.input.charCodeAt(e.position+1),o(u)||n&&s(u))break}else if(35===m){if(a=e.input.charCodeAt(e.position-1),o(a))break}else{if(e.position===e.lineStart&&x(e)||n&&s(m))break
if(r(m)){if(f=e.line,p=e.lineStart,d=e.lineIndent,w(e,!1,-1),e.lineIndent>=t){h=!0,m=e.input.charCodeAt(e.position)
continue}e.position=l,e.line=f,e.lineStart=p,e.lineIndent=d
break}}h&&(g(e,c,l,!1),k(e,e.line-f),c=l=e.position,h=!1),i(m)||(l=e.position+1),m=e.input.charCodeAt(++e.position)}return g(e,c,l,!1),e.result?!0:(e.kind=v,e.result=y,!1)}function _(e,t){var n,i,o
if(n=e.input.charCodeAt(e.position),39!==n)return!1
for(e.kind="scalar",e.result="",e.position++,i=o=e.position;0!==(n=e.input.charCodeAt(e.position));)if(39===n){if(g(e,i,e.position,!0),n=e.input.charCodeAt(++e.position),39!==n)return!0
i=o=e.position,e.position++}else r(n)?(g(e,i,o,!0),k(e,w(e,!1,t)),i=o=e.position):e.position===e.lineStart&&x(e)?d(e,"unexpected end of the document within a single quoted scalar"):(e.position++,o=e.position)
d(e,"unexpected end of the stream within a single quoted scalar")}function S(e,t){var n,i,o,s,c,l
if(l=e.input.charCodeAt(e.position),34!==l)return!1
for(e.kind="scalar",e.result="",e.position++,n=i=e.position;0!==(l=e.input.charCodeAt(e.position));){if(34===l)return g(e,n,e.position,!0),e.position++,!0
if(92===l){if(g(e,n,e.position,!0),l=e.input.charCodeAt(++e.position),r(l))w(e,!1,t)
else if(256>l&&ie[l])e.result+=oe[l],e.position++
else if((c=u(l))>0){for(o=c,s=0;o>0;o--)l=e.input.charCodeAt(++e.position),(c=a(l))>=0?s=(s<<4)+c:d(e,"expected hexadecimal character")
e.result+=h(s),e.position++}else d(e,"unknown escape sequence")
n=i=e.position}else r(l)?(g(e,n,i,!0),k(e,w(e,!1,t)),n=i=e.position):e.position===e.lineStart&&x(e)?d(e,"unexpected end of the document within a double quoted scalar"):(e.position++,i=e.position)}d(e,"unexpected end of the stream within a double quoted scalar")}function A(e,t){var n,r,i,s,a,u,c,l,h,f,p,m=!0,g=e.tag,v=e.anchor
if(p=e.input.charCodeAt(e.position),91===p)s=93,c=!1,r=[]
else{if(123!==p)return!1
s=125,c=!0,r={}}for(null!==e.anchor&&(e.anchorMap[e.anchor]=r),p=e.input.charCodeAt(++e.position);0!==p;){if(w(e,!0,t),p=e.input.charCodeAt(e.position),p===s)return e.position++,e.tag=g,e.anchor=v,e.kind=c?"mapping":"sequence",e.result=r,!0
m||d(e,"missed comma between flow collection entries"),h=l=f=null,a=u=!1,63===p&&(i=e.input.charCodeAt(e.position+1),o(i)&&(a=u=!0,e.position++,w(e,!0,t))),n=e.line,R(e,t,G,!1,!0),h=e.tag,l=e.result,w(e,!0,t),p=e.input.charCodeAt(e.position),!u&&e.line!==n||58!==p||(a=!0,p=e.input.charCodeAt(++e.position),w(e,!0,t),R(e,t,G,!1,!0),f=e.result),c?y(e,r,h,l,f):r.push(a?y(e,null,h,l,f):l),w(e,!0,t),p=e.input.charCodeAt(e.position),44===p?(m=!0,p=e.input.charCodeAt(++e.position)):m=!1}d(e,"unexpected end of the stream within a flow collection")}function T(e,t){var n,o,s,a,u=Q,l=!1,h=t,f=0,p=!1
if(a=e.input.charCodeAt(e.position),124===a)o=!1
else{if(62!==a)return!1
o=!0}for(e.kind="scalar",e.result="";0!==a;)if(a=e.input.charCodeAt(++e.position),43===a||45===a)Q===u?u=43===a?Z:J:d(e,"repeat of a chomping mode identifier")
else{if(!((s=c(a))>=0))break
0===s?d(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):l?d(e,"repeat of an indentation width identifier"):(h=t+s-1,l=!0)}if(i(a)){do a=e.input.charCodeAt(++e.position)
while(i(a))
if(35===a)do a=e.input.charCodeAt(++e.position)
while(!r(a)&&0!==a)}for(;0!==a;){for(b(e),e.lineIndent=0,a=e.input.charCodeAt(e.position);(!l||e.lineIndent<h)&&32===a;)e.lineIndent++,a=e.input.charCodeAt(++e.position)
if(!l&&e.lineIndent>h&&(h=e.lineIndent),r(a))f++
else{if(e.lineIndent<h){u===Z?e.result+=U.repeat("\n",f):u===Q&&l&&(e.result+="\n")
break}for(o?i(a)?(p=!0,e.result+=U.repeat("\n",f+1)):p?(p=!1,e.result+=U.repeat("\n",f+1)):0===f?l&&(e.result+=" "):e.result+=U.repeat("\n",f):l&&(e.result+=U.repeat("\n",f+1)),l=!0,f=0,n=e.position;!r(a)&&0!==a;)a=e.input.charCodeAt(++e.position)
g(e,n,e.position,!1)}}return!0}function C(e,t){var n,r,i,s=e.tag,a=e.anchor,u=[],c=!1
for(null!==e.anchor&&(e.anchorMap[e.anchor]=u),i=e.input.charCodeAt(e.position);0!==i&&45===i&&(r=e.input.charCodeAt(e.position+1),o(r));)if(c=!0,e.position++,w(e,!0,-1)&&e.lineIndent<=t)u.push(null),i=e.input.charCodeAt(e.position)
else if(n=e.line,R(e,t,K,!1,!0),u.push(e.result),w(e,!0,-1),i=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&0!==i)d(e,"bad indentation of a sequence entry")
else if(e.lineIndent<t)break
return c?(e.tag=s,e.anchor=a,e.kind="sequence",e.result=u,!0):!1}function O(e,t,n){var r,s,a,u,c=e.tag,l=e.anchor,h={},f=null,p=null,m=null,g=!1,v=!1
for(null!==e.anchor&&(e.anchorMap[e.anchor]=h),u=e.input.charCodeAt(e.position);0!==u;){if(r=e.input.charCodeAt(e.position+1),a=e.line,63!==u&&58!==u||!o(r)){if(!R(e,n,$,!1,!0))break
if(e.line===a){for(u=e.input.charCodeAt(e.position);i(u);)u=e.input.charCodeAt(++e.position)
if(58===u)u=e.input.charCodeAt(++e.position),o(u)||d(e,"a whitespace character is expected after the key-value separator within a block mapping"),g&&(y(e,h,f,p,null),f=p=m=null),v=!0,g=!1,s=!1,f=e.tag,p=e.result
else{if(!v)return e.tag=c,e.anchor=l,!0
d(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!v)return e.tag=c,e.anchor=l,!0
d(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===u?(g&&(y(e,h,f,p,null),f=p=m=null),v=!0,g=!0,s=!0):g?(g=!1,s=!0):d(e,"incomplete explicit mapping pair; a key node is missed"),e.position+=1,u=r
if((e.line===a||e.lineIndent>t)&&(R(e,t,Y,!0,s)&&(g?p=e.result:m=e.result),g||(y(e,h,f,p,m),f=p=m=null),w(e,!0,-1),u=e.input.charCodeAt(e.position)),e.lineIndent>t&&0!==u)d(e,"bad indentation of a mapping entry")
else if(e.lineIndent<t)break}return g&&y(e,h,f,p,null),v&&(e.tag=c,e.anchor=l,e.kind="mapping",e.result=h),v}function N(e){var t,n,r,i,s=!1,a=!1
if(i=e.input.charCodeAt(e.position),33!==i)return!1
if(null!==e.tag&&d(e,"duplication of a tag property"),i=e.input.charCodeAt(++e.position),60===i?(s=!0,i=e.input.charCodeAt(++e.position)):33===i?(a=!0,n="!!",i=e.input.charCodeAt(++e.position)):n="!",t=e.position,s){do i=e.input.charCodeAt(++e.position)
while(0!==i&&62!==i)
e.position<e.length?(r=e.input.slice(t,e.position),i=e.input.charCodeAt(++e.position)):d(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==i&&!o(i);)33===i&&(a?d(e,"tag suffix cannot contain exclamation marks"):(n=e.input.slice(t-1,e.position+1),ne.test(n)||d(e,"named tag handle cannot contain such characters"),a=!0,t=e.position+1)),i=e.input.charCodeAt(++e.position)
r=e.input.slice(t,e.position),te.test(r)&&d(e,"tag suffix cannot contain flow indicator characters")}return r&&!re.test(r)&&d(e,"tag name cannot contain such characters: "+r),s?e.tag=r:H.call(e.tagMap,n)?e.tag=e.tagMap[n]+r:"!"===n?e.tag="!"+r:"!!"===n?e.tag="tag:yaml.org,2002:"+r:d(e,'undeclared tag handle "'+n+'"'),!0}function L(e){var t,n
if(n=e.input.charCodeAt(e.position),38!==n)return!1
for(null!==e.anchor&&d(e,"duplication of an anchor property"),n=e.input.charCodeAt(++e.position),t=e.position;0!==n&&!o(n)&&!s(n);)n=e.input.charCodeAt(++e.position)
return e.position===t&&d(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function I(e){var t,n,r
e.length,e.input
if(r=e.input.charCodeAt(e.position),42!==r)return!1
for(r=e.input.charCodeAt(++e.position),t=e.position;0!==r&&!o(r)&&!s(r);)r=e.input.charCodeAt(++e.position)
return e.position===t&&d(e,"name of an alias node must contain at least one character"),n=e.input.slice(t,e.position),e.anchorMap.hasOwnProperty(n)||d(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],w(e,!0,-1),!0}function R(e,t,n,r,i){var o,s,a,u,c,l,h,f,p=1,g=!1,v=!1
if(e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=s=a=Y===n||K===n,r&&w(e,!0,-1)&&(g=!0,e.lineIndent>t?p=1:e.lineIndent===t?p=0:e.lineIndent<t&&(p=-1)),1===p)for(;N(e)||L(e);)w(e,!0,-1)?(g=!0,a=o,e.lineIndent>t?p=1:e.lineIndent===t?p=0:e.lineIndent<t&&(p=-1)):a=!1
if(a&&(a=g||i),(1===p||Y===n)&&(h=G===n||$===n?t:t+1,f=e.position-e.lineStart,1===p?a&&(C(e,f)||O(e,f,h))||A(e,h)?v=!0:(s&&T(e,h)||_(e,h)||S(e,h)?v=!0:I(e)?(v=!0,(null!==e.tag||null!==e.anchor)&&d(e,"alias node should not have any properties")):E(e,h,G===n)&&(v=!0,null===e.tag&&(e.tag="?")),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):0===p&&(v=a&&C(e,f))),null!==e.tag&&"!"!==e.tag)if("?"===e.tag){for(u=0,c=e.implicitTypes.length;c>u;u+=1)if(l=e.implicitTypes[u],l.resolve(e.result)){e.result=l.construct(e.result),e.tag=l.tag,null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)
break}}else H.call(e.typeMap,e.tag)?(l=e.typeMap[e.tag],null!==e.result&&l.kind!==e.kind&&d(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+l.kind+'", not "'+e.kind+'"'),l.resolve(e.result)?(e.result=l.construct(e.result),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):d(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):m(e,"unknown tag !<"+e.tag+">")
return null!==e.tag||null!==e.anchor||v}function j(e){var t,n,s,a,u=e.position,c=!1
for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};0!==(a=e.input.charCodeAt(e.position))&&(w(e,!0,-1),a=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==a));){for(c=!0,a=e.input.charCodeAt(++e.position),t=e.position;0!==a&&!o(a);)a=e.input.charCodeAt(++e.position)
for(n=e.input.slice(t,e.position),s=[],n.length<1&&d(e,"directive name must not be less than one character in length");0!==a;){for(;i(a);)a=e.input.charCodeAt(++e.position)
if(35===a){do a=e.input.charCodeAt(++e.position)
while(0!==a&&!r(a))
break}if(r(a))break
for(t=e.position;0!==a&&!o(a);)a=e.input.charCodeAt(++e.position)
s.push(e.input.slice(t,e.position))}0!==a&&b(e),H.call(ae,n)?ae[n](e,n,s):m(e,'unknown document directive "'+n+'"')}return w(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,w(e,!0,-1)):c&&d(e,"directives end mark is expected"),R(e,e.lineIndent-1,Y,!1,!0),w(e,!0,-1),e.checkLineBreaks&&ee.test(e.input.slice(u,e.position))&&m(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&x(e)?void(46===e.input.charCodeAt(e.position)&&(e.position+=3,w(e,!0,-1))):void(e.position<e.length-1&&d(e,"end of the stream or a document separator is expected"))}function P(e,t){e=String(e),t=t||{},0!==e.length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)))
var n=new f(e,t)
for(X.test(n.input)&&d(n,"the stream contains non-printable characters"),n.input+="\x00";32===n.input.charCodeAt(n.position);)n.lineIndent+=1,n.position+=1
for(;n.position<n.length-1;)j(n)
return n.documents}function M(e,t,n){var r,i,o=P(e,n)
for(r=0,i=o.length;i>r;r+=1)t(o[r])}function D(e,t){var n=P(e,t)
if(0===n.length)return void 0
if(1===n.length)return n[0]
throw new q("expected a single document in the stream, but found more")}function F(e,t,n){M(e,t,U.extend({schema:W},n))}function B(e,t){return D(e,U.extend({schema:W},t))}for(var U=e("./common"),q=e("./exception"),z=e("./mark"),W=e("./schema/default_safe"),V=e("./schema/default_full"),H=Object.prototype.hasOwnProperty,G=1,$=2,K=3,Y=4,Q=1,J=2,Z=3,X=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uD800-\uDFFF\uFFFE\uFFFF]/,ee=/[\x85\u2028\u2029]/,te=/[,\[\]\{\}]/,ne=/^(?:!|!!|![a-z\-]+!)$/i,re=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i,ie=new Array(256),oe=new Array(256),se=0;256>se;se++)ie[se]=l(se)?1:0,oe[se]=l(se)
var ae={YAML:function(e,t,n){var r,i,o
null!==e.version&&d(e,"duplication of %YAML directive"),1!==n.length&&d(e,"YAML directive accepts exactly one argument"),r=/^([0-9]+)\.([0-9]+)$/.exec(n[0]),null===r&&d(e,"ill-formed argument of the YAML directive"),i=parseInt(r[1],10),o=parseInt(r[2],10),1!==i&&d(e,"unacceptable YAML version of the document"),e.version=n[0],e.checkLineBreaks=2>o,1!==o&&2!==o&&m(e,"unsupported YAML version of the document")},TAG:function(e,t,n){var r,i
2!==n.length&&d(e,"TAG directive accepts exactly two arguments"),r=n[0],i=n[1],ne.test(r)||d(e,"ill-formed tag handle (first argument) of the TAG directive"),H.call(e.tagMap,r)&&d(e,'there is a previously declared suffix for "'+r+'" tag handle'),re.test(i)||d(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagMap[r]=i}}
t.exports.loadAll=M,t.exports.load=D,t.exports.safeLoadAll=F,t.exports.safeLoad=B},{"./common":75,"./exception":77,"./mark":79,"./schema/default_full":82,"./schema/default_safe":83}],79:[function(e,t,n){"use strict"
function r(e,t,n,r,i){this.name=e,this.buffer=t,this.position=n,this.line=r,this.column=i}var i=e("./common")
r.prototype.getSnippet=function(e,t){var n,r,o,s,a
if(!this.buffer)return null
for(e=e||4,t=t||75,n="",r=this.position;r>0&&-1==="\x00\r\n\u2028\u2029".indexOf(this.buffer.charAt(r-1));)if(r-=1,this.position-r>t/2-1){n=" ... ",r+=5
break}for(o="",s=this.position;s<this.buffer.length&&-1==="\x00\r\n\u2028\u2029".indexOf(this.buffer.charAt(s));)if(s+=1,s-this.position>t/2-1){o=" ... ",s-=5
break}return a=this.buffer.slice(r,s),i.repeat(" ",e)+n+a+o+"\n"+i.repeat(" ",e+this.position-r+n.length)+"^"},r.prototype.toString=function(e){var t,n=""
return this.name&&(n+='in "'+this.name+'" '),n+="at line "+(this.line+1)+", column "+(this.column+1),e||(t=this.getSnippet(),t&&(n+=":\n"+t)),n},t.exports=r},{"./common":75}],80:[function(e,t,n){"use strict"
function r(e,t,n){var i=[]
return e.include.forEach(function(e){n=r(e,t,n)}),e[t].forEach(function(e){n.forEach(function(t,n){t.tag===e.tag&&i.push(n)}),n.push(e)}),n.filter(function(e,t){return-1===i.indexOf(t)})}function i(){function e(e){r[e.tag]=e}var t,n,r={}
for(t=0,n=arguments.length;n>t;t+=1)arguments[t].forEach(e)
return r}function o(e){this.include=e.include||[],this.implicit=e.implicit||[],this.explicit=e.explicit||[],this.implicit.forEach(function(e){if(e.loadKind&&"scalar"!==e.loadKind)throw new a("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=r(this,"implicit",[]),this.compiledExplicit=r(this,"explicit",[]),this.compiledTypeMap=i(this.compiledImplicit,this.compiledExplicit)}var s=e("./common"),a=e("./exception"),u=e("./type")
o.DEFAULT=null,o.create=function(){var e,t
switch(arguments.length){case 1:e=o.DEFAULT,t=arguments[0]
break
case 2:e=arguments[0],t=arguments[1]
break
default:throw new a("Wrong number of arguments for Schema.create function")}if(e=s.toArray(e),t=s.toArray(t),!e.every(function(e){return e instanceof o}))throw new a("Specified list of super schemas (or a single Schema object) contains a non-Schema object.")
if(!t.every(function(e){return e instanceof u}))throw new a("Specified list of YAML types (or a single Type object) contains a non-Type object.")
return new o({include:e,explicit:t})},t.exports=o},{"./common":75,"./exception":77,"./type":86}],81:[function(e,t,n){"use strict"
var r=e("../schema")
t.exports=new r({include:[e("./json")]})},{"../schema":80,"./json":85}],82:[function(e,t,n){"use strict"
var r=e("../schema")
t.exports=r.DEFAULT=new r({include:[e("./default_safe")],explicit:[e("../type/js/undefined"),e("../type/js/regexp"),e("../type/js/function")]})},{"../schema":80,"../type/js/function":91,"../type/js/regexp":92,"../type/js/undefined":93,"./default_safe":83}],83:[function(e,t,n){"use strict"
var r=e("../schema")
t.exports=new r({include:[e("./core")],implicit:[e("../type/timestamp"),e("../type/merge")],explicit:[e("../type/binary"),e("../type/omap"),e("../type/pairs"),e("../type/set")]})},{"../schema":80,"../type/binary":87,"../type/merge":95,"../type/omap":97,"../type/pairs":98,"../type/set":100,"../type/timestamp":102,"./core":81}],84:[function(e,t,n){"use strict"
var r=e("../schema")
t.exports=new r({explicit:[e("../type/str"),e("../type/seq"),e("../type/map")]})},{"../schema":80,"../type/map":94,"../type/seq":99,"../type/str":101}],85:[function(e,t,n){"use strict"
var r=e("../schema")
t.exports=new r({include:[e("./failsafe")],implicit:[e("../type/null"),e("../type/bool"),e("../type/int"),e("../type/float")]})},{"../schema":80,"../type/bool":88,"../type/float":89,"../type/int":90,"../type/null":96,"./failsafe":84}],86:[function(e,t,n){"use strict"
function r(e){var t={}
return null!==e&&Object.keys(e).forEach(function(n){e[n].forEach(function(e){t[String(e)]=n})}),t}function i(e,t){if(t=t||{},Object.keys(t).forEach(function(t){if(-1===s.indexOf(t))throw new o('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')}),this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.defaultStyle=t.defaultStyle||null,this.styleAliases=r(t.styleAliases||null),-1===a.indexOf(this.kind))throw new o('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var o=e("./exception"),s=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],a=["scalar","sequence","mapping"]
t.exports=i},{"./exception":77}],87:[function(e,t,n){"use strict"
function r(e){if(null===e)return!1
var t,n,r=0,i=e.length,o=c
for(n=0;i>n;n++)if(t=o.indexOf(e.charAt(n)),!(t>64)){if(0>t)return!1
r+=6}return r%8===0}function i(e){var t,n,r=e.replace(/[\r\n=]/g,""),i=r.length,o=c,s=0,u=[]
for(t=0;i>t;t++)t%4===0&&t&&(u.push(s>>16&255),u.push(s>>8&255),u.push(255&s)),s=s<<6|o.indexOf(r.charAt(t))
return n=i%4*6,0===n?(u.push(s>>16&255),u.push(s>>8&255),u.push(255&s)):18===n?(u.push(s>>10&255),u.push(s>>2&255)):12===n&&u.push(s>>4&255),a?new a(u):u}function o(e){var t,n,r="",i=0,o=e.length,s=c
for(t=0;o>t;t++)t%3===0&&t&&(r+=s[i>>18&63],r+=s[i>>12&63],r+=s[i>>6&63],r+=s[63&i]),i=(i<<8)+e[t]
return n=o%3,0===n?(r+=s[i>>18&63],r+=s[i>>12&63],r+=s[i>>6&63],r+=s[63&i]):2===n?(r+=s[i>>10&63],r+=s[i>>4&63],r+=s[i<<2&63],r+=s[64]):1===n&&(r+=s[i>>2&63],r+=s[i<<4&63],r+=s[64],r+=s[64]),r}function s(e){return a&&a.isBuffer(e)}var a=e("buffer").Buffer,u=e("../type"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r"
t.exports=new u("tag:yaml.org,2002:binary",{kind:"scalar",resolve:r,construct:i,predicate:s,represent:o})},{"../type":86,buffer:176}],88:[function(e,t,n){"use strict"
function r(e){if(null===e)return!1
var t=e.length
return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e)}function i(e){return"true"===e||"True"===e||"TRUE"===e}function o(e){return"[object Boolean]"===Object.prototype.toString.call(e)}var s=e("../type")
t.exports=new s("tag:yaml.org,2002:bool",{kind:"scalar",resolve:r,construct:i,predicate:o,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"})},{"../type":86}],89:[function(e,t,n){"use strict"
function r(e){if(null===e)return!1
return c.test(e)?!0:!1}function i(e){var t,n,r,i
return t=e.replace(/_/g,"").toLowerCase(),n="-"===t[0]?-1:1,i=[],0<="+-".indexOf(t[0])&&(t=t.slice(1)),".inf"===t?1===n?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?NaN:0<=t.indexOf(":")?(t.split(":").forEach(function(e){i.unshift(parseFloat(e,10))}),t=0,r=1,i.forEach(function(e){t+=e*r,r*=60}),n*t):n*parseFloat(t,10)}function o(e,t){if(isNaN(e))switch(t){case"lowercase":return".nan"
case"uppercase":return".NAN"
case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf"
case"uppercase":return".INF"
case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf"
case"uppercase":return"-.INF"
case"camelcase":return"-.Inf"}else if(a.isNegativeZero(e))return"-0.0"
return e.toString(10)}function s(e){return"[object Number]"===Object.prototype.toString.call(e)&&(0!==e%1||a.isNegativeZero(e))}var a=e("../common"),u=e("../type"),c=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?|\\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$")
t.exports=new u("tag:yaml.org,2002:float",{kind:"scalar",resolve:r,construct:i,predicate:s,represent:o,defaultStyle:"lowercase"})},{"../common":75,"../type":86}],90:[function(e,t,n){"use strict"
function r(e){return e>=48&&57>=e||e>=65&&70>=e||e>=97&&102>=e}function i(e){return e>=48&&55>=e}function o(e){return e>=48&&57>=e}function s(e){if(null===e)return!1
var t,n=e.length,s=0,a=!1
if(!n)return!1
if(t=e[s],("-"===t||"+"===t)&&(t=e[++s]),"0"===t){if(s+1===n)return!0
if(t=e[++s],"b"===t){for(s++;n>s;s++)if(t=e[s],"_"!==t){if("0"!==t&&"1"!==t)return!1
a=!0}return a}if("x"===t){for(s++;n>s;s++)if(t=e[s],"_"!==t){if(!r(e.charCodeAt(s)))return!1
a=!0}return a}for(;n>s;s++)if(t=e[s],"_"!==t){if(!i(e.charCodeAt(s)))return!1
a=!0}return a}for(;n>s;s++)if(t=e[s],"_"!==t){if(":"===t)break
if(!o(e.charCodeAt(s)))return!1
a=!0}return a?":"!==t?!0:/^(:[0-5]?[0-9])+$/.test(e.slice(s)):!1}function a(e){var t,n,r=e,i=1,o=[]
return-1!==r.indexOf("_")&&(r=r.replace(/_/g,"")),t=r[0],("-"===t||"+"===t)&&("-"===t&&(i=-1),r=r.slice(1),t=r[0]),"0"===r?0:"0"===t?"b"===r[1]?i*parseInt(r.slice(2),2):"x"===r[1]?i*parseInt(r,16):i*parseInt(r,8):-1!==r.indexOf(":")?(r.split(":").forEach(function(e){o.unshift(parseInt(e,10))}),r=0,n=1,o.forEach(function(e){r+=e*n,n*=60}),i*r):i*parseInt(r,10)}function u(e){return"[object Number]"===Object.prototype.toString.call(e)&&0===e%1&&!c.isNegativeZero(e)}var c=e("../common"),l=e("../type")
t.exports=new l("tag:yaml.org,2002:int",{kind:"scalar",resolve:s,construct:a,predicate:u,represent:{binary:function(e){return"0b"+e.toString(2)},octal:function(e){return"0"+e.toString(8)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return"0x"+e.toString(16).toUpperCase()}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})},{"../common":75,"../type":86}],91:[function(e,t,n){"use strict"
function r(e){if(null===e)return!1
try{var t="("+e+")",n=a.parse(t,{range:!0})
return"Program"!==n.type||1!==n.body.length||"ExpressionStatement"!==n.body[0].type||"FunctionExpression"!==n.body[0].expression.type?!1:!0}catch(r){return!1}}function i(e){var t,n="("+e+")",r=a.parse(n,{range:!0}),i=[]
if("Program"!==r.type||1!==r.body.length||"ExpressionStatement"!==r.body[0].type||"FunctionExpression"!==r.body[0].expression.type)throw new Error("Failed to resolve function")
return r.body[0].expression.params.forEach(function(e){i.push(e.name)}),t=r.body[0].expression.body.range,new Function(i,n.slice(t[0]+1,t[1]-1))}function o(e){return e.toString()}function s(e){return"[object Function]"===Object.prototype.toString.call(e)}var a
try{a=e("esprima")}catch(u){"undefined"!=typeof window&&(a=window.esprima)}var c=e("../../type")
t.exports=new c("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:r,construct:i,predicate:s,represent:o})},{"../../type":86,esprima:103}],92:[function(e,t,n){"use strict"
function r(e){if(null===e)return!1
if(0===e.length)return!1
var t=e,n=/\/([gim]*)$/.exec(e),r=""
if("/"===t[0]){if(n&&(r=n[1]),r.length>3)return!1
if("/"!==t[t.length-r.length-1])return!1
t=t.slice(1,t.length-r.length-1)}try{new RegExp(t,r)
return!0}catch(i){return!1}}function i(e){var t=e,n=/\/([gim]*)$/.exec(e),r=""
return"/"===t[0]&&(n&&(r=n[1]),t=t.slice(1,t.length-r.length-1)),new RegExp(t,r)}function o(e){var t="/"+e.source+"/"
return e.global&&(t+="g"),e.multiline&&(t+="m"),e.ignoreCase&&(t+="i"),t}function s(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var a=e("../../type")
t.exports=new a("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:r,construct:i,predicate:s,represent:o})},{"../../type":86}],93:[function(e,t,n){"use strict"
function r(){return!0}function i(){return void 0}function o(){return""}function s(e){return"undefined"==typeof e}var a=e("../../type")
t.exports=new a("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:r,construct:i,predicate:s,represent:o})},{"../../type":86}],94:[function(e,t,n){"use strict"
var r=e("../type")
t.exports=new r("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}})},{"../type":86}],95:[function(e,t,n){"use strict"
function r(e){return"<<"===e||null===e}var i=e("../type")
t.exports=new i("tag:yaml.org,2002:merge",{kind:"scalar",resolve:r})},{"../type":86}],96:[function(e,t,n){"use strict"
function r(e){if(null===e)return!0
var t=e.length
return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)}function i(){return null}function o(e){return null===e}var s=e("../type")
t.exports=new s("tag:yaml.org,2002:null",{kind:"scalar",resolve:r,construct:i,predicate:o,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"})},{"../type":86}],97:[function(e,t,n){"use strict"
function r(e){if(null===e)return!0
var t,n,r,i,o,u=[],c=e
for(t=0,n=c.length;n>t;t+=1){if(r=c[t],o=!1,"[object Object]"!==a.call(r))return!1
for(i in r)if(s.call(r,i)){if(o)return!1
o=!0}if(!o)return!1
if(-1!==u.indexOf(i))return!1
u.push(i)}return!0}function i(e){return null!==e?e:[]}var o=e("../type"),s=Object.prototype.hasOwnProperty,a=Object.prototype.toString
t.exports=new o("tag:yaml.org,2002:omap",{kind:"sequence",resolve:r,construct:i})},{"../type":86}],98:[function(e,t,n){"use strict"
function r(e){if(null===e)return!0
var t,n,r,i,o,a=e
for(o=new Array(a.length),t=0,n=a.length;n>t;t+=1){if(r=a[t],"[object Object]"!==s.call(r))return!1
if(i=Object.keys(r),1!==i.length)return!1
o[t]=[i[0],r[i[0]]]}return!0}function i(e){if(null===e)return[]
var t,n,r,i,o,s=e
for(o=new Array(s.length),t=0,n=s.length;n>t;t+=1)r=s[t],i=Object.keys(r),o[t]=[i[0],r[i[0]]]
return o}var o=e("../type"),s=Object.prototype.toString
t.exports=new o("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:r,construct:i})},{"../type":86}],99:[function(e,t,n){"use strict"
var r=e("../type")
t.exports=new r("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}})},{"../type":86}],100:[function(e,t,n){"use strict"
function r(e){if(null===e)return!0
var t,n=e
for(t in n)if(s.call(n,t)&&null!==n[t])return!1
return!0}function i(e){return null!==e?e:{}}var o=e("../type"),s=Object.prototype.hasOwnProperty
t.exports=new o("tag:yaml.org,2002:set",{kind:"mapping",resolve:r,construct:i})},{"../type":86}],101:[function(e,t,n){"use strict"
var r=e("../type")
t.exports=new r("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}})},{"../type":86}],102:[function(e,t,n){"use strict"
function r(e){if(null===e)return!1
var t
return t=a.exec(e),null===t?!1:!0}function i(e){var t,n,r,i,o,s,u,c,l,h,f=0,p=null
if(t=a.exec(e),null===t)throw new Error("Date resolve error")
if(n=+t[1],r=+t[2]-1,i=+t[3],!t[4])return new Date(Date.UTC(n,r,i))
if(o=+t[4],s=+t[5],u=+t[6],t[7]){for(f=t[7].slice(0,3);f.length<3;)f+="0"
f=+f}return t[9]&&(c=+t[10],l=+(t[11]||0),p=6e4*(60*c+l),"-"===t[9]&&(p=-p)),h=new Date(Date.UTC(n,r,i,o,s,u,f)),p&&h.setTime(h.getTime()-p),h}function o(e){return e.toISOString()}var s=e("../type"),a=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$")
t.exports=new s("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:r,construct:i,instanceOf:Date,represent:o})},{"../type":86}],103:[function(e,t,n){!function(e,t){"use strict"
"function"==typeof define&&define.amd?define(["exports"],t):t("undefined"!=typeof n?n:e.esprima={})}(this,function(e){"use strict"
function t(e,t){if(!e)throw new Error("ASSERT: "+t)}function n(e){return e>=48&&57>=e}function r(e){return"0123456789abcdefABCDEF".indexOf(e)>=0}function i(e){return"01234567".indexOf(e)>=0}function o(e){var t="0"!==e,n="01234567".indexOf(e)
return dn>nn&&i(Xt[nn])&&(t=!0,n=8*n+"01234567".indexOf(Xt[nn++]),"0123".indexOf(e)>=0&&dn>nn&&i(Xt[nn])&&(n=8*n+"01234567".indexOf(Xt[nn++]))),{code:n,octal:t}}function s(e){return 32===e||9===e||11===e||12===e||160===e||e>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(e)>=0}function a(e){return 10===e||13===e||8232===e||8233===e}function u(e){return 36===e||95===e||e>=65&&90>=e||e>=97&&122>=e||92===e||e>=128&&Zt.NonAsciiIdentifierStart.test(String.fromCharCode(e))}function c(e){return 36===e||95===e||e>=65&&90>=e||e>=97&&122>=e||e>=48&&57>=e||92===e||e>=128&&Zt.NonAsciiIdentifierPart.test(String.fromCharCode(e))}function l(e){switch(e){case"enum":case"export":case"import":case"super":return!0
default:return!1}}function h(e){switch(e){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0
default:return!1}}function f(e){return"eval"===e||"arguments"===e}function p(e){switch(e.length){case 2:return"if"===e||"in"===e||"do"===e
case 3:return"var"===e||"for"===e||"new"===e||"try"===e||"let"===e
case 4:return"this"===e||"else"===e||"case"===e||"void"===e||"with"===e||"enum"===e
case 5:return"while"===e||"break"===e||"catch"===e||"throw"===e||"const"===e||"yield"===e||"class"===e||"super"===e
case 6:return"return"===e||"typeof"===e||"delete"===e||"switch"===e||"export"===e||"import"===e
case 7:return"default"===e||"finally"===e||"extends"===e
case 8:return"function"===e||"continue"===e||"debugger"===e
case 10:return"instanceof"===e
default:return!1}}function d(e,n,r,i,o){var s
t("number"==typeof r,"Comment must have valid position"),gn.lastCommentStart=r,s={type:e,value:n},vn.range&&(s.range=[r,i]),vn.loc&&(s.loc=o),vn.comments.push(s),vn.attachComment&&(vn.leadingComments.push(s),vn.trailingComments.push(s))}function m(e){var t,n,r,i
for(t=nn-e,n={start:{line:rn,column:nn-on-e}};dn>nn;)if(r=Xt.charCodeAt(nn),++nn,a(r))return sn=!0,vn.comments&&(i=Xt.slice(t+e,nn-1),n.end={line:rn,column:nn-on-1},d("Line",i,t,nn-1,n)),13===r&&10===Xt.charCodeAt(nn)&&++nn,++rn,void(on=nn)
vn.comments&&(i=Xt.slice(t+e,nn),n.end={line:rn,column:nn-on},d("Line",i,t,nn,n))}function g(){var e,t,n,r
for(vn.comments&&(e=nn-2,t={start:{line:rn,column:nn-on-2}});dn>nn;)if(n=Xt.charCodeAt(nn),a(n))13===n&&10===Xt.charCodeAt(nn+1)&&++nn,sn=!0,++rn,++nn,on=nn
else if(42===n){if(47===Xt.charCodeAt(nn+1))return++nn,++nn,void(vn.comments&&(r=Xt.slice(e+2,nn-2),t.end={line:rn,column:nn-on},d("Block",r,e,nn,t)));++nn}else++nn
vn.comments&&(t.end={line:rn,column:nn-on},r=Xt.slice(e+2,nn),d("Block",r,e,nn,t)),X()}function v(){var e,t
for(sn=!1,t=0===nn;dn>nn;)if(e=Xt.charCodeAt(nn),s(e))++nn
else if(a(e))sn=!0,++nn,13===e&&10===Xt.charCodeAt(nn)&&++nn,++rn,on=nn,t=!0
else if(47===e)if(e=Xt.charCodeAt(nn+1),47===e)++nn,++nn,m(2),t=!0
else{if(42!==e)break;++nn,++nn,g()}else if(t&&45===e){if(45!==Xt.charCodeAt(nn+1)||62!==Xt.charCodeAt(nn+2))break
nn+=3,m(3)}else{if(60!==e)break
if("!--"!==Xt.slice(nn+1,nn+4))break;++nn,++nn,++nn,++nn,m(4)}}function y(e){var t,n,i,o=0
for(n="u"===e?4:2,t=0;n>t;++t){if(!(dn>nn&&r(Xt[nn])))return""
i=Xt[nn++],o=16*o+"0123456789abcdef".indexOf(i.toLowerCase())}return String.fromCharCode(o)}function b(){var e,t,n,i
for(e=Xt[nn],t=0,"}"===e&&Z();dn>nn&&(e=Xt[nn++],r(e));)t=16*t+"0123456789abcdef".indexOf(e.toLowerCase())
return(t>1114111||"}"!==e)&&Z(),65535>=t?String.fromCharCode(t):(n=(t-65536>>10)+55296,i=(t-65536&1023)+56320,String.fromCharCode(n,i))}function w(){var e,t
for(e=Xt.charCodeAt(nn++),t=String.fromCharCode(e),92===e&&(117!==Xt.charCodeAt(nn)&&Z(),++nn,e=y("u"),e&&"\\"!==e&&u(e.charCodeAt(0))||Z(),t=e);dn>nn&&(e=Xt.charCodeAt(nn),c(e));)++nn,t+=String.fromCharCode(e),92===e&&(t=t.substr(0,t.length-1),117!==Xt.charCodeAt(nn)&&Z(),++nn,e=y("u"),e&&"\\"!==e&&c(e.charCodeAt(0))||Z(),t+=e)
return t}function x(){var e,t
for(e=nn++;dn>nn;){if(t=Xt.charCodeAt(nn),92===t)return nn=e,w()
if(!c(t))break;++nn}return Xt.slice(e,nn)}function k(){var e,t,n
return e=nn,t=92===Xt.charCodeAt(nn)?w():x(),n=1===t.length?Gt.Identifier:p(t)?Gt.Keyword:"null"===t?Gt.NullLiteral:"true"===t||"false"===t?Gt.BooleanLiteral:Gt.Identifier,{type:n,value:t,lineNumber:rn,lineStart:on,start:e,end:nn}}function E(){var e,t
switch(e={type:Gt.Punctuator,value:"",lineNumber:rn,lineStart:on,start:nn,end:nn},t=Xt[nn]){case"(":vn.tokenize&&(vn.openParenToken=vn.tokens.length),++nn
break
case"{":vn.tokenize&&(vn.openCurlyToken=vn.tokens.length),gn.curlyStack.push("{"),++nn
break
case".":++nn,"."===Xt[nn]&&"."===Xt[nn+1]&&(nn+=2,t="...")
break
case"}":++nn,gn.curlyStack.pop()
break
case")":case";":case",":case"[":case"]":case":":case"?":case"~":++nn
break
default:t=Xt.substr(nn,4),">>>="===t?nn+=4:(t=t.substr(0,3),"==="===t||"!=="===t||">>>"===t||"<<="===t||">>="===t?nn+=3:(t=t.substr(0,2),"&&"===t||"||"===t||"=="===t||"!="===t||"+="===t||"-="===t||"*="===t||"/="===t||"++"===t||"--"===t||"<<"===t||">>"===t||"&="===t||"|="===t||"^="===t||"%="===t||"<="===t||">="===t||"=>"===t?nn+=2:(t=Xt[nn],"<>=!+-*%&|^/".indexOf(t)>=0&&++nn)))}return nn===e.start&&Z(),e.end=nn,e.value=t,e}function _(e){for(var t="";dn>nn&&r(Xt[nn]);)t+=Xt[nn++]
return 0===t.length&&Z(),u(Xt.charCodeAt(nn))&&Z(),{type:Gt.NumericLiteral,value:parseInt("0x"+t,16),lineNumber:rn,lineStart:on,start:e,end:nn}}function S(e){var t,r
for(r="";dn>nn&&(t=Xt[nn],"0"===t||"1"===t);)r+=Xt[nn++]
return 0===r.length&&Z(),dn>nn&&(t=Xt.charCodeAt(nn),(u(t)||n(t))&&Z()),{type:Gt.NumericLiteral,value:parseInt(r,2),lineNumber:rn,lineStart:on,start:e,end:nn}}function A(e,t){var r,o
for(i(e)?(o=!0,r="0"+Xt[nn++]):(o=!1,++nn,r="");dn>nn&&i(Xt[nn]);)r+=Xt[nn++]
return o||0!==r.length||Z(),(u(Xt.charCodeAt(nn))||n(Xt.charCodeAt(nn)))&&Z(),{type:Gt.NumericLiteral,value:parseInt(r,8),octal:o,lineNumber:rn,lineStart:on,start:t,end:nn}}function T(){var e,t
for(e=nn+1;dn>e;++e){if(t=Xt[e],"8"===t||"9"===t)return!1
if(!i(t))return!0}return!0}function C(){var e,r,o
if(o=Xt[nn],t(n(o.charCodeAt(0))||"."===o,"Numeric literal must start with a decimal digit or a decimal point"),r=nn,e="","."!==o){if(e=Xt[nn++],o=Xt[nn],"0"===e){if("x"===o||"X"===o)return++nn,_(r)
if("b"===o||"B"===o)return++nn,S(r)
if("o"===o||"O"===o)return A(o,r)
if(i(o)&&T())return A(o,r)}for(;n(Xt.charCodeAt(nn));)e+=Xt[nn++]
o=Xt[nn]}if("."===o){for(e+=Xt[nn++];n(Xt.charCodeAt(nn));)e+=Xt[nn++]
o=Xt[nn]}if("e"===o||"E"===o)if(e+=Xt[nn++],o=Xt[nn],("+"===o||"-"===o)&&(e+=Xt[nn++]),n(Xt.charCodeAt(nn)))for(;n(Xt.charCodeAt(nn));)e+=Xt[nn++]
else Z()
return u(Xt.charCodeAt(nn))&&Z(),{type:Gt.NumericLiteral,value:parseFloat(e),lineNumber:rn,lineStart:on,start:r,end:nn}}function O(){var e,n,r,s,u,c="",l=!1
for(e=Xt[nn],t("'"===e||'"'===e,"String literal must starts with a quote"),n=nn,++nn;dn>nn;){if(r=Xt[nn++],r===e){e=""
break}if("\\"===r)if(r=Xt[nn++],r&&a(r.charCodeAt(0)))++rn,"\r"===r&&"\n"===Xt[nn]&&++nn,on=nn
else switch(r){case"u":case"x":if("{"===Xt[nn])++nn,c+=b()
else{if(s=y(r),!s)throw Z()
c+=s}break
case"n":c+="\n"
break
case"r":c+="\r"
break
case"t":c+="	"
break
case"b":c+="\b"
break
case"f":c+="\f"
break
case"v":c+=""
break
case"8":case"9":throw Z()
default:i(r)?(u=o(r),l=u.octal||l,c+=String.fromCharCode(u.code)):c+=r}else{if(a(r.charCodeAt(0)))break
c+=r}}return""!==e&&Z(),{type:Gt.StringLiteral,value:c,octal:l,lineNumber:hn,lineStart:fn,start:n,end:nn}}function N(){var e,t,r,o,s,u,c,l,h=""
for(o=!1,u=!1,t=nn,s="`"===Xt[nn],r=2,++nn;dn>nn;){if(e=Xt[nn++],"`"===e){r=1,u=!0,o=!0
break}if("$"===e){if("{"===Xt[nn]){gn.curlyStack.push("${"),++nn,o=!0
break}h+=e}else if("\\"===e)if(e=Xt[nn++],a(e.charCodeAt(0)))++rn,"\r"===e&&"\n"===Xt[nn]&&++nn,on=nn
else switch(e){case"n":h+="\n"
break
case"r":h+="\r"
break
case"t":h+="	"
break
case"u":case"x":"{"===Xt[nn]?(++nn,h+=b()):(c=nn,l=y(e),l?h+=l:(nn=c,h+=e))
break
case"b":h+="\b"
break
case"f":h+="\f"
break
case"v":h+=""
break
default:"0"===e?(n(Xt.charCodeAt(nn))&&Y(Jt.TemplateOctalLiteral),h+="\x00"):i(e)?Y(Jt.TemplateOctalLiteral):h+=e}else a(e.charCodeAt(0))?(++rn,"\r"===e&&"\n"===Xt[nn]&&++nn,on=nn,h+="\n"):h+=e}return o||Z(),s||gn.curlyStack.pop(),{type:Gt.Template,value:{cooked:h,raw:Xt.slice(t+1,nn-r)},head:s,tail:u,lineNumber:rn,lineStart:on,start:t,end:nn}}function L(e,t){var n=e
t.indexOf("u")>=0&&(n=n.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(e,t){return parseInt(t,16)<=1114111?"x":void Z(null,Jt.InvalidRegExp)}).replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"))
try{RegExp(n)}catch(r){Z(null,Jt.InvalidRegExp)}try{return new RegExp(e,t)}catch(i){return null}}function I(){var e,n,r,i,o
for(e=Xt[nn],t("/"===e,"Regular expression literal must start with a slash"),n=Xt[nn++],r=!1,i=!1;dn>nn;)if(e=Xt[nn++],n+=e,"\\"===e)e=Xt[nn++],a(e.charCodeAt(0))&&Z(null,Jt.UnterminatedRegExp),n+=e
else if(a(e.charCodeAt(0)))Z(null,Jt.UnterminatedRegExp)
else if(r)"]"===e&&(r=!1)
else{if("/"===e){i=!0
break}"["===e&&(r=!0)}return i||Z(null,Jt.UnterminatedRegExp),o=n.substr(1,n.length-2),{value:o,literal:n}}function R(){var e,t,n,r
for(t="",n="";dn>nn&&(e=Xt[nn],c(e.charCodeAt(0)));)if(++nn,"\\"===e&&dn>nn)if(e=Xt[nn],"u"===e){if(++nn,r=nn,e=y("u"))for(n+=e,t+="\\u";nn>r;++r)t+=Xt[r]
else nn=r,n+="u",t+="\\u"
X()}else t+="\\",X()
else n+=e,t+=e
return{value:n,literal:t}}function j(){pn=!0
var e,t,n,r
return mn=null,v(),e=nn,t=I(),n=R(),r=L(t.value,n.value),pn=!1,vn.tokenize?{type:Gt.RegularExpression,value:r,regex:{pattern:t.value,flags:n.value},lineNumber:rn,lineStart:on,start:e,end:nn}:{literal:t.literal+n.literal,value:r,regex:{pattern:t.value,flags:n.value},start:e,end:nn}}function P(){var e,t,n,r
return v(),e=nn,t={start:{line:rn,column:nn-on}},n=j(),t.end={line:rn,column:nn-on},vn.tokenize||(vn.tokens.length>0&&(r=vn.tokens[vn.tokens.length-1],r.range[0]===e&&"Punctuator"===r.type&&("/"===r.value||"/="===r.value)&&vn.tokens.pop()),vn.tokens.push({type:"RegularExpression",value:n.literal,regex:n.regex,range:[e,nn],loc:t})),n}function M(e){return e.type===Gt.Identifier||e.type===Gt.Keyword||e.type===Gt.BooleanLiteral||e.type===Gt.NullLiteral}function D(){var e,t
if(e=vn.tokens[vn.tokens.length-1],!e)return P()
if("Punctuator"===e.type){if("]"===e.value)return E()
if(")"===e.value)return t=vn.tokens[vn.openParenToken-1],!t||"Keyword"!==t.type||"if"!==t.value&&"while"!==t.value&&"for"!==t.value&&"with"!==t.value?E():P()
if("}"===e.value){if(vn.tokens[vn.openCurlyToken-3]&&"Keyword"===vn.tokens[vn.openCurlyToken-3].type){if(t=vn.tokens[vn.openCurlyToken-4],!t)return E()}else{if(!vn.tokens[vn.openCurlyToken-4]||"Keyword"!==vn.tokens[vn.openCurlyToken-4].type)return E()
if(t=vn.tokens[vn.openCurlyToken-5],!t)return P()}return Kt.indexOf(t.value)>=0?E():P()}return P()}return"Keyword"===e.type&&"this"!==e.value?P():E()}function F(){var e,t
return nn>=dn?{type:Gt.EOF,lineNumber:rn,lineStart:on,start:nn,end:nn}:(e=Xt.charCodeAt(nn),u(e)?(t=k(),en&&h(t.value)&&(t.type=Gt.Keyword),t):40===e||41===e||59===e?E():39===e||34===e?O():46===e?n(Xt.charCodeAt(nn+1))?C():E():n(e)?C():vn.tokenize&&47===e?D():96===e||125===e&&"${"===gn.curlyStack[gn.curlyStack.length-1]?N():E())}function B(){var e,t,n,r
return e={start:{line:rn,column:nn-on}},t=F(),e.end={line:rn,column:nn-on},t.type!==Gt.EOF&&(n=Xt.slice(t.start,t.end),r={type:$t[t.type],value:n,range:[t.start,t.end],loc:e},t.regex&&(r.regex={pattern:t.regex.pattern,flags:t.regex.flags}),vn.tokens.push(r)),t}function U(){var e
return pn=!0,an=nn,un=rn,cn=on,v(),e=mn,ln=nn,hn=rn,fn=on,mn="undefined"!=typeof vn.tokens?B():F(),pn=!1,e}function q(){pn=!0,v(),an=nn,un=rn,cn=on,ln=nn,hn=rn,fn=on,mn="undefined"!=typeof vn.tokens?B():F(),pn=!1}function z(){this.line=hn,this.column=ln-fn}function W(){this.start=new z,this.end=null}function V(e){this.start={line:e.lineNumber,column:e.start-e.lineStart},this.end=null}function H(){vn.range&&(this.range=[ln,0]),vn.loc&&(this.loc=new W)}function G(e){vn.range&&(this.range=[e.start,0]),vn.loc&&(this.loc=new V(e))}function $(e){var t,n
for(t=0;t<vn.errors.length;t++)if(n=vn.errors[t],n.index===e.index&&n.message===e.message)return
vn.errors.push(e)}function K(e,t,n){var r=new Error("Line "+e+": "+n)
return r.index=t,r.lineNumber=e,r.column=t-(pn?on:cn)+1,r.description=n,r}function Y(e){var n,r
throw n=Array.prototype.slice.call(arguments,1),r=e.replace(/%(\d)/g,function(e,r){return t(r<n.length,"Message reference must be in range"),n[r]}),K(un,an,r)}function Q(e){var n,r,i
if(n=Array.prototype.slice.call(arguments,1),r=e.replace(/%(\d)/g,function(e,r){return t(r<n.length,"Message reference must be in range"),n[r]}),i=K(rn,an,r),!vn.errors)throw i
$(i)}function J(e,t){var n,r=t||Jt.UnexpectedToken
return e?(t||(r=e.type===Gt.EOF?Jt.UnexpectedEOS:e.type===Gt.Identifier?Jt.UnexpectedIdentifier:e.type===Gt.NumericLiteral?Jt.UnexpectedNumber:e.type===Gt.StringLiteral?Jt.UnexpectedString:e.type===Gt.Template?Jt.UnexpectedTemplate:Jt.UnexpectedToken,e.type===Gt.Keyword&&(l(e.value)?r=Jt.UnexpectedReserved:en&&h(e.value)&&(r=Jt.StrictReservedWord))),n=e.type===Gt.Template?e.value.raw:e.value):n="ILLEGAL",r=r.replace("%0",n),e&&"number"==typeof e.lineNumber?K(e.lineNumber,e.start,r):K(pn?rn:un,pn?nn:an,r)}function Z(e,t){throw J(e,t)}function X(e,t){var n=J(e,t)
if(!vn.errors)throw n
$(n)}function ee(e){var t=U();(t.type!==Gt.Punctuator||t.value!==e)&&Z(t)}function te(){var e
vn.errors?(e=mn,e.type===Gt.Punctuator&&","===e.value?U():e.type===Gt.Punctuator&&";"===e.value?(U(),X(e)):X(e,Jt.UnexpectedToken)):ee(",")}function ne(e){var t=U();(t.type!==Gt.Keyword||t.value!==e)&&Z(t)}function re(e){return mn.type===Gt.Punctuator&&mn.value===e}function ie(e){return mn.type===Gt.Keyword&&mn.value===e}function oe(e){return mn.type===Gt.Identifier&&mn.value===e}function se(){var e
return mn.type!==Gt.Punctuator?!1:(e=mn.value,"="===e||"*="===e||"/="===e||"%="===e||"+="===e||"-="===e||"<<="===e||">>="===e||">>>="===e||"&="===e||"^="===e||"|="===e)}function ae(){return 59===Xt.charCodeAt(ln)||re(";")?void U():void(sn||(an=ln,un=hn,cn=fn,mn.type===Gt.EOF||re("}")||Z(mn)))}function ue(e){var t,n=yn,r=bn,i=wn
return yn=!0,bn=!0,wn=null,t=e(),null!==wn&&Z(wn),yn=n,bn=r,wn=i,t}function ce(e){var t,n=yn,r=bn,i=wn
return yn=!0,bn=!0,wn=null,t=e(),yn=yn&&n,bn=bn&&r,wn=i||wn,t}function le(){var e,t,n=new H,r=[]
for(ee("[");!re("]");)if(re(","))U(),r.push(null)
else{if(re("...")){t=new H,U(),e=Qe(),r.push(t.finishRestElement(e))
break}r.push(de()),re("]")||ee(",")}return ee("]"),n.finishArrayPattern(r)}function he(){var e,t,n=new H,r=re("[")
if(mn.type===Gt.Identifier){if(e=Qe(),re("="))return U(),t=He(),n.finishProperty("init",e,!1,new G(e).finishAssignmentPattern(e,t),!1,!1)
if(!re(":"))return n.finishProperty("init",e,!1,e,!1,!0)}else e=ye()
return ee(":"),t=de(),n.finishProperty("init",e,r,t,!1,!1)}function fe(){var e=new H,t=[]
for(ee("{");!re("}");)t.push(he()),re("}")||ee(",")
return U(),e.finishObjectPattern(t)}function pe(){return mn.type===Gt.Identifier?Qe():re("[")?le():re("{")?fe():void Z(mn)}function de(){var e,t,n=mn
return e=pe(),re("=")&&(U(),t=ue(He),e=new G(n).finishAssignmentPattern(e,t)),e}function me(){var e,t=[],n=new H
for(ee("[");!re("]");)re(",")?(U(),t.push(null)):re("...")?(e=new H,U(),e.finishSpreadElement(ce(He)),re("]")||(bn=yn=!1,ee(",")),t.push(e)):(t.push(ce(He)),re("]")||ee(","))
return U(),n.finishArrayExpression(t)}function ge(e,t){var n,r
return bn=yn=!1,n=en,r=ue(xt),en&&t.firstRestricted&&X(t.firstRestricted,t.message),en&&t.stricted&&X(t.stricted,t.message),en=n,e.finishFunctionExpression(null,t.params,t.defaults,r)}function ve(){var e,t,n=new H
return e=_t(),t=ge(n,e)}function ye(){var e,t,n=new H
switch(e=U(),e.type){case Gt.StringLiteral:case Gt.NumericLiteral:return en&&e.octal&&X(e,Jt.StrictOctalLiteral),n.finishLiteral(e)
case Gt.Identifier:case Gt.BooleanLiteral:case Gt.NullLiteral:case Gt.Keyword:return n.finishIdentifier(e.value)
case Gt.Punctuator:if("["===e.value)return t=ue(He),ee("]"),t}Z(e)}function be(){switch(mn.type){case Gt.Identifier:case Gt.StringLiteral:case Gt.BooleanLiteral:case Gt.NullLiteral:case Gt.NumericLiteral:case Gt.Keyword:return!0
case Gt.Punctuator:return"["===mn.value}return!1}function we(e,t,n,r){var i,o,s
if(e.type===Gt.Identifier){if("get"===e.value&&be())return n=re("["),t=ye(),s=new H,ee("("),ee(")"),i=ge(s,{params:[],defaults:[],stricted:null,firstRestricted:null,message:null}),r.finishProperty("get",t,n,i,!1,!1)
if("set"===e.value&&be())return n=re("["),t=ye(),s=new H,ee("("),o={params:[],defaultCount:0,defaults:[],firstRestricted:null,paramSet:{}},re(")")?X(mn):(Et(o),0===o.defaultCount&&(o.defaults=[])),ee(")"),i=ge(s,o),r.finishProperty("set",t,n,i,!1,!1)}return re("(")?(i=ve(),r.finishProperty("init",t,n,i,!0,!1)):null}function xe(e,t,n){t===!1&&(e.type===Yt.Identifier&&"__proto__"===e.name||e.type===Yt.Literal&&"__proto__"===e.value)&&(n.value?Q(Jt.DuplicateProtoProperty):n.value=!0)}function ke(e){var t,n,r,i,o=mn,s=new H
return t=re("["),n=ye(),(r=we(o,n,t,s))?(xe(r.key,r.computed,e),r):(xe(n,t,e),re(":")?(U(),i=ce(He),s.finishProperty("init",n,t,i,!1,!1)):o.type===Gt.Identifier?re("=")?(wn=mn,U(),i=ue(He),s.finishProperty("init",n,t,new G(o).finishAssignmentPattern(n,i),!1,!0)):s.finishProperty("init",n,t,n,!1,!0):void Z(mn))}function Ee(){var e=[],t={value:!1},n=new H
for(ee("{");!re("}");)e.push(ke(t)),re("}")||te()
return ee("}"),n.finishObjectExpression(e)}function _e(e){var t
switch(e.type){case Yt.Identifier:case Yt.MemberExpression:case Yt.RestElement:case Yt.AssignmentPattern:break
case Yt.SpreadElement:e.type=Yt.RestElement,_e(e.argument)
break
case Yt.ArrayExpression:for(e.type=Yt.ArrayPattern,t=0;t<e.elements.length;t++)null!==e.elements[t]&&_e(e.elements[t])
break
case Yt.ObjectExpression:for(e.type=Yt.ObjectPattern,t=0;t<e.properties.length;t++)_e(e.properties[t].value)
break
case Yt.AssignmentExpression:e.type=Yt.AssignmentPattern,_e(e.left)}}function Se(e){var t,n
return(mn.type!==Gt.Template||e.head&&!mn.head)&&Z(),t=new H,n=U(),t.finishTemplateElement({raw:n.value.raw,cooked:n.value.cooked},n.tail)}function Ae(){var e,t,n,r=new H
for(e=Se({head:!0}),t=[e],n=[];!e.tail;)n.push(Ge()),e=Se({head:!1}),t.push(e)
return r.finishTemplateLiteral(t,n)}function Te(){var e,t,n,r
if(ee("("),re(")"))return U(),re("=>")||ee("=>"),{type:Qt.ArrowParameterPlaceHolder,params:[]}
if(n=mn,re("..."))return e=rt(),ee(")"),re("=>")||ee("=>"),{type:Qt.ArrowParameterPlaceHolder,params:[e]}
if(yn=!0,e=ce(He),re(",")){for(bn=!1,t=[e];dn>ln&&re(",");){if(U(),re("...")){for(yn||Z(mn),t.push(rt()),ee(")"),re("=>")||ee("=>"),yn=!1,r=0;r<t.length;r++)_e(t[r])
return{type:Qt.ArrowParameterPlaceHolder,params:t}}t.push(ce(He))}e=new G(n).finishSequenceExpression(t)}if(ee(")"),re("=>")){if(yn||Z(mn),e.type===Yt.SequenceExpression)for(r=0;r<e.expressions.length;r++)_e(e.expressions[r])
else _e(e)
e={type:Qt.ArrowParameterPlaceHolder,params:e.type===Yt.SequenceExpression?e.expressions:[e]}}return yn=!1,e}function Ce(){var e,t,n,r
if(re("("))return yn=!1,ce(Te)
if(re("["))return ce(me)
if(re("{"))return ce(Ee)
if(e=mn.type,r=new H,e===Gt.Identifier)n=r.finishIdentifier(U().value)
else if(e===Gt.StringLiteral||e===Gt.NumericLiteral)bn=yn=!1,en&&mn.octal&&X(mn,Jt.StrictOctalLiteral),n=r.finishLiteral(U())
else if(e===Gt.Keyword){if(bn=yn=!1,ie("function"))return At()
if(ie("this"))return U(),r.finishThisExpression()
if(ie("class"))return Ot()
Z(U())}else e===Gt.BooleanLiteral?(bn=yn=!1,t=U(),t.value="true"===t.value,n=r.finishLiteral(t)):e===Gt.NullLiteral?(bn=yn=!1,t=U(),t.value=null,n=r.finishLiteral(t)):re("/")||re("/=")?(bn=yn=!1,nn=ln,t="undefined"!=typeof vn.tokens?P():j(),U(),n=r.finishLiteral(t)):e===Gt.Template?n=Ae():Z(U())
return n}function Oe(){var e=[]
if(ee("("),!re(")"))for(;dn>ln&&(e.push(ue(He)),!re(")"));)te()
return ee(")"),e}function Ne(){var e,t=new H
return e=U(),M(e)||Z(e),t.finishIdentifier(e.value)}function Le(){return ee("."),Ne()}function Ie(){var e
return ee("["),e=ue(Ge),ee("]"),e}function Re(){var e,t,n=new H
return ne("new"),e=ue(Pe),t=re("(")?Oe():[],bn=yn=!1,n.finishNewExpression(e,t)}function je(){var e,t,n,r,i,o=gn.allowIn
for(i=mn,gn.allowIn=!0,ie("super")&&gn.inFunctionBody?(t=new H,U(),t=t.finishSuper(),re("(")||re(".")||re("[")||Z(mn)):t=ce(ie("new")?Re:Ce);;)if(re("."))yn=!1,bn=!0,r=Le(),t=new G(i).finishMemberExpression(".",t,r)
else if(re("("))yn=!1,bn=!1,n=Oe(),t=new G(i).finishCallExpression(t,n)
else if(re("["))yn=!1,bn=!0,r=Ie(),t=new G(i).finishMemberExpression("[",t,r)
else{if(mn.type!==Gt.Template||!mn.head)break
e=Ae(),t=new G(i).finishTaggedTemplateExpression(t,e)}return gn.allowIn=o,t}function Pe(){var e,n,r,i
for(t(gn.allowIn,"callee of new expression always allow in keyword."),i=mn,ie("super")&&gn.inFunctionBody?(n=new H,U(),n=n.finishSuper(),re("[")||re(".")||Z(mn)):n=ce(ie("new")?Re:Ce);;)if(re("["))yn=!1,bn=!0,r=Ie(),n=new G(i).finishMemberExpression("[",n,r)
else if(re("."))yn=!1,bn=!0,r=Le(),n=new G(i).finishMemberExpression(".",n,r)
else{if(mn.type!==Gt.Template||!mn.head)break
e=Ae(),n=new G(i).finishTaggedTemplateExpression(n,e)}return n}function Me(){var e,t,n=mn
return e=ce(je),sn||mn.type!==Gt.Punctuator||(re("++")||re("--"))&&(en&&e.type===Yt.Identifier&&f(e.name)&&Q(Jt.StrictLHSPostfix),bn||Q(Jt.InvalidLHSInAssignment),bn=yn=!1,t=U(),e=new G(n).finishPostfixExpression(t.value,e)),e}function De(){var e,t,n
return mn.type!==Gt.Punctuator&&mn.type!==Gt.Keyword?t=Me():re("++")||re("--")?(n=mn,e=U(),t=ce(De),en&&t.type===Yt.Identifier&&f(t.name)&&Q(Jt.StrictLHSPrefix),bn||Q(Jt.InvalidLHSInAssignment),t=new G(n).finishUnaryExpression(e.value,t),bn=yn=!1):re("+")||re("-")||re("~")||re("!")?(n=mn,e=U(),t=ce(De),t=new G(n).finishUnaryExpression(e.value,t),bn=yn=!1):ie("delete")||ie("void")||ie("typeof")?(n=mn,e=U(),t=ce(De),t=new G(n).finishUnaryExpression(e.value,t),en&&"delete"===t.operator&&t.argument.type===Yt.Identifier&&Q(Jt.StrictDelete),bn=yn=!1):t=Me(),t}function Fe(e,t){var n=0
if(e.type!==Gt.Punctuator&&e.type!==Gt.Keyword)return 0
switch(e.value){case"||":n=1
break
case"&&":n=2
break
case"|":n=3
break
case"^":n=4
break
case"&":n=5
break
case"==":case"!=":case"===":case"!==":n=6
break
case"<":case">":case"<=":case">=":case"instanceof":n=7
break
case"in":n=t?7:0
break
case"<<":case">>":case">>>":n=8
break
case"+":case"-":n=9
break
case"*":case"/":case"%":n=11}return n}function Be(){var e,t,n,r,i,o,s,a,u,c
if(e=mn,u=ce(De),r=mn,i=Fe(r,gn.allowIn),0===i)return u
for(bn=yn=!1,r.prec=i,U(),t=[e,mn],s=ue(De),o=[u,r,s];(i=Fe(mn,gn.allowIn))>0;){for(;o.length>2&&i<=o[o.length-2].prec;)s=o.pop(),a=o.pop().value,u=o.pop(),t.pop(),n=new G(t[t.length-1]).finishBinaryExpression(a,u,s),o.push(n)
r=U(),r.prec=i,o.push(r),t.push(mn),n=ue(De),o.push(n)}for(c=o.length-1,n=o[c],t.pop();c>1;)n=new G(t.pop()).finishBinaryExpression(o[c-1].value,o[c-2],n),c-=2
return n}function Ue(){var e,t,n,r,i
return i=mn,e=ce(Be),re("?")&&(U(),t=gn.allowIn,gn.allowIn=!0,n=ue(He),gn.allowIn=t,ee(":"),r=ue(He),e=new G(i).finishConditionalExpression(e,n,r),bn=yn=!1),e}function qe(){return re("{")?xt():ue(He)}function ze(e,n){var r
switch(n.type){case Yt.Identifier:kt(e,n,n.name)
break
case Yt.RestElement:ze(e,n.argument)
break
case Yt.AssignmentPattern:ze(e,n.left)
break
case Yt.ArrayPattern:for(r=0;r<n.elements.length;r++)null!==n.elements[r]&&ze(e,n.elements[r])
break
default:for(t(n.type===Yt.ObjectPattern,"Invalid type"),r=0;r<n.properties.length;r++)ze(e,n.properties[r].value)}}function We(e){var t,n,r,i,o,s,a,u
switch(o=[],s=0,i=[e],e.type){case Yt.Identifier:break
case Qt.ArrowParameterPlaceHolder:i=e.params
break
default:return null}for(a={paramSet:{}},t=0,n=i.length;n>t;t+=1)switch(r=i[t],r.type){case Yt.AssignmentPattern:i[t]=r.left,o.push(r.right),++s,ze(a,r.left)
break
default:ze(a,r),i[t]=r,o.push(null)}return a.message===Jt.StrictParamDupe&&(u=en?a.stricted:a.firstRestricted,Z(u,a.message)),0===s&&(o=[]),{params:i,defaults:o,stricted:a.stricted,firstRestricted:a.firstRestricted,message:a.message}}function Ve(e,t){var n,r
return sn&&X(mn),ee("=>"),n=en,r=qe(),en&&e.firstRestricted&&Z(e.firstRestricted,e.message),en&&e.stricted&&X(e.stricted,e.message),en=n,t.finishArrowFunctionExpression(e.params,e.defaults,r,r.type!==Yt.BlockStatement)}function He(){var e,t,n,r,i
return i=mn,e=mn,t=Ue(),t.type===Qt.ArrowParameterPlaceHolder||re("=>")?(bn=yn=!1,r=We(t),r?(wn=null,Ve(r,new G(i))):t):(se()&&(bn||Q(Jt.InvalidLHSInAssignment),en&&t.type===Yt.Identifier&&f(t.name)&&X(e,Jt.StrictLHSAssignment),re("=")?_e(t):bn=yn=!1,e=U(),n=ue(He),t=new G(i).finishAssignmentExpression(e.value,t,n),wn=null),t)}function Ge(){var e,t,n=mn
if(e=ue(He),re(",")){for(t=[e];dn>ln&&re(",");)U(),t.push(ue(He))
e=new G(n).finishSequenceExpression(t)}return e}function $e(){if(mn.type===Gt.Keyword)switch(mn.value){case"export":return"module"!==tn&&X(mn,Jt.IllegalExportDeclaration),Pt()
case"import":return"module"!==tn&&X(mn,Jt.IllegalImportDeclaration),Ut()
case"const":case"let":return nt({inFor:!1})
case"function":return St(new H)
case"class":return Ct()}return wt()}function Ke(){for(var e=[];dn>ln&&!re("}");)e.push($e())
return e}function Ye(){var e,t=new H
return ee("{"),e=Ke(),ee("}"),t.finishBlockStatement(e)}function Qe(){var e,t=new H
return e=U(),e.type!==Gt.Identifier&&(en&&e.type===Gt.Keyword&&h(e.value)?X(e,Jt.StrictReservedWord):Z(e)),t.finishIdentifier(e.value)}function Je(){var e,t=null,n=new H
return e=pe(),en&&f(e.name)&&Q(Jt.StrictVarName),re("=")?(U(),t=ue(He)):e.type!==Yt.Identifier&&ee("="),n.finishVariableDeclarator(e,t)}function Ze(){var e=[]
do{if(e.push(Je()),!re(","))break
U()}while(dn>ln)
return e}function Xe(e){var t
return ne("var"),t=Ze(),ae(),e.finishVariableDeclaration(t)}function et(e,t){var n,r=null,i=new H
return n=pe(),en&&n.type===Yt.Identifier&&f(n.name)&&Q(Jt.StrictVarName),"const"===e?ie("in")||(ee("="),r=ue(He)):(!t.inFor&&n.type!==Yt.Identifier||re("="))&&(ee("="),r=ue(He)),i.finishVariableDeclarator(n,r)}function tt(e,t){var n=[]
do{if(n.push(et(e,t)),!re(","))break
U()}while(dn>ln)
return n}function nt(e){var n,r,i=new H
return n=U().value,t("let"===n||"const"===n,"Lexical declaration must be either let or const"),r=tt(n,e),ae(),i.finishLexicalDeclaration(r,n)}function rt(){var e,t=new H
return U(),re("{")&&Y(Jt.ObjectPatternAsRestParameter),e=Qe(),re("=")&&Y(Jt.DefaultRestParameter),re(")")||Y(Jt.ParameterAfterRestParameter),t.finishRestElement(e)}function it(e){return ee(";"),e.finishEmptyStatement()}function ot(e){var t=Ge()
return ae(),e.finishExpressionStatement(t)}function st(e){var t,n,r
return ne("if"),ee("("),t=Ge(),ee(")"),n=wt(),ie("else")?(U(),r=wt()):r=null,e.finishIfStatement(t,n,r)}function at(e){var t,n,r
return ne("do"),r=gn.inIteration,gn.inIteration=!0,t=wt(),gn.inIteration=r,ne("while"),ee("("),n=Ge(),ee(")"),re(";")&&U(),e.finishDoWhileStatement(t,n)}function ut(e){var t,n,r
return ne("while"),ee("("),t=Ge(),ee(")"),r=gn.inIteration,gn.inIteration=!0,n=wt(),gn.inIteration=r,e.finishWhileStatement(t,n)}function ct(e){var t,n,r,i,o,s,a,u,c,l,h,f=gn.allowIn
if(t=i=o=null,ne("for"),ee("("),re(";"))U()
else if(ie("var"))t=new H,U(),gn.allowIn=!1,t=t.finishVariableDeclaration(Ze()),gn.allowIn=f,1===t.declarations.length&&ie("in")?(U(),s=t,a=Ge(),t=null):ee(";")
else if(ie("const")||ie("let"))t=new H,u=U().value,gn.allowIn=!1,c=tt(u,{inFor:!0}),gn.allowIn=f,1===c.length&&null===c[0].init&&ie("in")?(t=t.finishLexicalDeclaration(c,u),U(),s=t,a=Ge(),t=null):(ae(),t=t.finishLexicalDeclaration(c,u))
else if(r=mn,gn.allowIn=!1,t=ce(He),gn.allowIn=f,ie("in"))bn||Q(Jt.InvalidLHSInForIn),U(),_e(t),s=t,a=Ge(),t=null
else{if(re(",")){for(n=[t];re(",");)U(),n.push(ue(He))
t=new G(r).finishSequenceExpression(n)}ee(";")}return"undefined"==typeof s&&(re(";")||(i=Ge()),ee(";"),re(")")||(o=Ge())),ee(")"),h=gn.inIteration,gn.inIteration=!0,l=ue(wt),gn.inIteration=h,"undefined"==typeof s?e.finishForStatement(t,i,o,l):e.finishForInStatement(s,a,l)}function lt(e){var t,n=null
return ne("continue"),59===Xt.charCodeAt(ln)?(U(),gn.inIteration||Y(Jt.IllegalContinue),e.finishContinueStatement(null)):sn?(gn.inIteration||Y(Jt.IllegalContinue),e.finishContinueStatement(null)):(mn.type===Gt.Identifier&&(n=Qe(),t="$"+n.name,Object.prototype.hasOwnProperty.call(gn.labelSet,t)||Y(Jt.UnknownLabel,n.name)),ae(),null!==n||gn.inIteration||Y(Jt.IllegalContinue),e.finishContinueStatement(n))}function ht(e){var t,n=null
return ne("break"),59===Xt.charCodeAt(an)?(U(),gn.inIteration||gn.inSwitch||Y(Jt.IllegalBreak),e.finishBreakStatement(null)):sn?(gn.inIteration||gn.inSwitch||Y(Jt.IllegalBreak),e.finishBreakStatement(null)):(mn.type===Gt.Identifier&&(n=Qe(),t="$"+n.name,Object.prototype.hasOwnProperty.call(gn.labelSet,t)||Y(Jt.UnknownLabel,n.name)),ae(),null!==n||gn.inIteration||gn.inSwitch||Y(Jt.IllegalBreak),e.finishBreakStatement(n))}function ft(e){var t=null
return ne("return"),gn.inFunctionBody||Q(Jt.IllegalReturn),32===Xt.charCodeAt(an)&&u(Xt.charCodeAt(an+1))?(t=Ge(),ae(),e.finishReturnStatement(t)):sn?e.finishReturnStatement(null):(re(";")||re("}")||mn.type===Gt.EOF||(t=Ge()),ae(),e.finishReturnStatement(t))}function pt(e){var t,n
return en&&Q(Jt.StrictModeWith),ne("with"),ee("("),t=Ge(),ee(")"),n=wt(),e.finishWithStatement(t,n)}function dt(){var e,t,n=[],r=new H
for(ie("default")?(U(),e=null):(ne("case"),e=Ge()),ee(":");dn>ln&&!(re("}")||ie("default")||ie("case"));)t=$e(),n.push(t)
return r.finishSwitchCase(e,n)}function mt(e){var t,n,r,i,o
if(ne("switch"),ee("("),t=Ge(),ee(")"),ee("{"),n=[],re("}"))return U(),e.finishSwitchStatement(t,n)
for(i=gn.inSwitch,gn.inSwitch=!0,o=!1;dn>ln&&!re("}");)r=dt(),null===r.test&&(o&&Y(Jt.MultipleDefaultsInSwitch),o=!0),n.push(r)
return gn.inSwitch=i,ee("}"),e.finishSwitchStatement(t,n)}function gt(e){var t
return ne("throw"),sn&&Y(Jt.NewlineAfterThrow),t=Ge(),ae(),e.finishThrowStatement(t)}function vt(){var e,t,n=new H
return ne("catch"),ee("("),re(")")&&Z(mn),e=pe(),en&&f(e.name)&&Q(Jt.StrictCatchVariable),ee(")"),t=Ye(),n.finishCatchClause(e,t)}function yt(e){var t,n=null,r=null
return ne("try"),t=Ye(),ie("catch")&&(n=vt()),ie("finally")&&(U(),r=Ye()),n||r||Y(Jt.NoCatchOrFinally),e.finishTryStatement(t,n,r)}function bt(e){return ne("debugger"),ae(),e.finishDebuggerStatement()}function wt(){var e,t,n,r,i=mn.type
if(i===Gt.EOF&&Z(mn),i===Gt.Punctuator&&"{"===mn.value)return Ye()
if(bn=yn=!0,r=new H,i===Gt.Punctuator)switch(mn.value){case";":return it(r)
case"(":return ot(r)}else if(i===Gt.Keyword)switch(mn.value){case"break":return ht(r)
case"continue":return lt(r)
case"debugger":return bt(r)
case"do":return at(r)
case"for":return ct(r)
case"function":return St(r)
case"if":return st(r)
case"return":return ft(r)
case"switch":return mt(r)
case"throw":return gt(r)
case"try":return yt(r)
case"var":return Xe(r)
case"while":return ut(r)
case"with":return pt(r)}return e=Ge(),e.type===Yt.Identifier&&re(":")?(U(),n="$"+e.name,Object.prototype.hasOwnProperty.call(gn.labelSet,n)&&Y(Jt.Redeclaration,"Label",e.name),gn.labelSet[n]=!0,t=wt(),delete gn.labelSet[n],r.finishLabeledStatement(e,t)):(ae(),r.finishExpressionStatement(e))}function xt(){var e,t,n,r,i,o,s,a,u,c=[],l=new H
for(ee("{");dn>ln&&mn.type===Gt.StringLiteral&&(t=mn,e=$e(),c.push(e),e.expression.type===Yt.Literal);)n=Xt.slice(t.start+1,t.end-1),"use strict"===n?(en=!0,r&&X(r,Jt.StrictOctalLiteral)):!r&&t.octal&&(r=t)
for(i=gn.labelSet,o=gn.inIteration,s=gn.inSwitch,a=gn.inFunctionBody,u=gn.parenthesizedCount,gn.labelSet={},gn.inIteration=!1,gn.inSwitch=!1,gn.inFunctionBody=!0,gn.parenthesizedCount=0;dn>ln&&!re("}");)c.push($e())
return ee("}"),gn.labelSet=i,gn.inIteration=o,gn.inSwitch=s,gn.inFunctionBody=a,gn.parenthesizedCount=u,l.finishBlockStatement(c)}function kt(e,t,n){var r="$"+n
en?(f(n)&&(e.stricted=t,e.message=Jt.StrictParamName),Object.prototype.hasOwnProperty.call(e.paramSet,r)&&(e.stricted=t,e.message=Jt.StrictParamDupe)):e.firstRestricted||(f(n)?(e.firstRestricted=t,e.message=Jt.StrictParamName):h(n)?(e.firstRestricted=t,e.message=Jt.StrictReservedWord):Object.prototype.hasOwnProperty.call(e.paramSet,r)&&(e.firstRestricted=t,e.message=Jt.StrictParamDupe)),e.paramSet[r]=!0}function Et(e){var t,n,r
return t=mn,"..."===t.value?(n=rt(),kt(e,n.argument,n.argument.name),e.params.push(n),e.defaults.push(null),!1):(n=de(),kt(e,t,t.value),n.type===Yt.AssignmentPattern&&(r=n.right,n=n.left,++e.defaultCount),e.params.push(n),e.defaults.push(r),!re(")"))}function _t(e){var t
if(t={params:[],defaultCount:0,defaults:[],firstRestricted:e},ee("("),!re(")"))for(t.paramSet={};dn>ln&&Et(t);)ee(",")
return ee(")"),0===t.defaultCount&&(t.defaults=[]),{params:t.params,defaults:t.defaults,stricted:t.stricted,firstRestricted:t.firstRestricted,message:t.message}}function St(e,t){var n,r,i,o,s,a,u,c=null,l=[],p=[]
return ne("function"),t&&re("(")||(r=mn,c=Qe(),en?f(r.value)&&X(r,Jt.StrictFunctionName):f(r.value)?(s=r,a=Jt.StrictFunctionName):h(r.value)&&(s=r,a=Jt.StrictReservedWord)),o=_t(s),l=o.params,p=o.defaults,i=o.stricted,s=o.firstRestricted,o.message&&(a=o.message),u=en,n=xt(),en&&s&&Z(s,a),en&&i&&X(i,a),en=u,e.finishFunctionDeclaration(c,l,p,n)}function At(){var e,t,n,r,i,o,s,a=null,u=[],c=[],l=new H
return ne("function"),re("(")||(e=mn,a=Qe(),en?f(e.value)&&X(e,Jt.StrictFunctionName):f(e.value)?(n=e,r=Jt.StrictFunctionName):h(e.value)&&(n=e,r=Jt.StrictReservedWord)),i=_t(n),u=i.params,c=i.defaults,t=i.stricted,n=i.firstRestricted,i.message&&(r=i.message),s=en,o=xt(),en&&n&&Z(n,r),en&&t&&X(t,r),en=s,l.finishFunctionExpression(a,u,c,o)}function Tt(){var e,t,n,r,i,o,s,a=!1
for(e=new H,ee("{"),r=[];!re("}");)re(";")?U():(i=new H,t=mn,n=!1,o=re("["),s=ye(),"static"===s.name&&be()&&(t=mn,n=!0,o=re("["),s=ye()),i=we(t,s,o,i),i?(i["static"]=n,"init"===i.kind&&(i.kind="method"),n?i.computed||"prototype"!==(i.key.name||i.key.value.toString())||Z(t,Jt.StaticPrototype):i.computed||"constructor"!==(i.key.name||i.key.value.toString())||(("method"!==i.kind||!i.method||i.value.generator)&&Z(t,Jt.ConstructorSpecialMethod),a?Z(t,Jt.DuplicateConstructor):a=!0,i.kind="constructor"),i.type=Yt.MethodDefinition,delete i.method,delete i.shorthand,r.push(i)):Z(mn))
return U(),e.finishClassBody(r)}function Ct(e){var t,n=null,r=null,i=new H,o=en
return en=!0,ne("class"),e&&mn.type!==Gt.Identifier||(n=Qe()),ie("extends")&&(U(),r=ue(je)),t=Tt(),en=o,i.finishClassDeclaration(n,r,t)}function Ot(){var e,t=null,n=null,r=new H,i=en
return en=!0,ne("class"),mn.type===Gt.Identifier&&(t=Qe()),ie("extends")&&(U(),n=ue(je)),e=Tt(),en=i,r.finishClassExpression(t,n,e)}function Nt(){var e=new H
return mn.type!==Gt.StringLiteral&&Y(Jt.InvalidModuleSpecifier),e.finishLiteral(U())}function Lt(){var e,t,n,r=new H
return ie("default")?(n=new H,U(),t=n.finishIdentifier("default")):t=Qe(),oe("as")&&(U(),e=Ne()),r.finishExportSpecifier(t,e)}function It(e){var t,n=null,r=null,i=[]
if(mn.type===Gt.Keyword)switch(mn.value){case"let":case"const":case"var":case"class":case"function":return n=$e(),e.finishExportNamedDeclaration(n,i,null)}if(ee("{"),!re("}"))do t=t||ie("default"),i.push(Lt())
while(re(",")&&U())
return ee("}"),oe("from")?(U(),r=Nt(),ae()):t?Y(mn.value?Jt.UnexpectedToken:Jt.MissingFromClause,mn.value):ae(),e.finishExportNamedDeclaration(n,i,r)}function Rt(e){var t=null,n=null
return ne("default"),ie("function")?(t=St(new H,!0),e.finishExportDefaultDeclaration(t)):ie("class")?(t=Ct(!0),e.finishExportDefaultDeclaration(t)):(oe("from")&&Y(Jt.UnexpectedToken,mn.value),n=re("{")?Ee():re("[")?me():He(),ae(),e.finishExportDefaultDeclaration(n))}function jt(e){var t
return ee("*"),oe("from")||Y(mn.value?Jt.UnexpectedToken:Jt.MissingFromClause,mn.value),U(),t=Nt(),ae(),e.finishExportAllDeclaration(t)}function Pt(){var e=new H
return gn.inFunctionBody&&Y(Jt.IllegalExportDeclaration),ne("export"),ie("default")?Rt(e):re("*")?jt(e):It(e)}function Mt(){var e,t,n=new H
return t=Ne(),oe("as")&&(U(),e=Qe()),n.finishImportSpecifier(e,t)}function Dt(){var e=[]
if(ee("{"),!re("}"))do e.push(Mt())
while(re(",")&&U())
return ee("}"),e}function Ft(){var e,t=new H
return e=Ne(),t.finishImportDefaultSpecifier(e)}function Bt(){var e,t=new H
return ee("*"),oe("as")||Y(Jt.NoAsAfterImportNamespace),U(),e=Ne(),t.finishImportNamespaceSpecifier(e)}function Ut(){var e,t,n=new H
return gn.inFunctionBody&&Y(Jt.IllegalImportDeclaration),ne("import"),e=[],mn.type===Gt.StringLiteral?(t=Nt(),ae(),n.finishImportDeclaration(e,t)):(!ie("default")&&M(mn)&&(e.push(Ft()),re(",")&&U()),re("*")?e.push(Bt()):re("{")&&(e=e.concat(Dt())),oe("from")||Y(mn.value?Jt.UnexpectedToken:Jt.MissingFromClause,mn.value),U(),t=Nt(),ae(),n.finishImportDeclaration(e,t))}function qt(){for(var e,t,n,r,i=[];dn>ln&&(t=mn,t.type===Gt.StringLiteral)&&(e=$e(),i.push(e),e.expression.type===Yt.Literal);)n=Xt.slice(t.start+1,t.end-1),"use strict"===n?(en=!0,r&&X(r,Jt.StrictOctalLiteral)):!r&&t.octal&&(r=t)
for(;dn>ln&&(e=$e(),"undefined"!=typeof e);)i.push(e)
return i}function zt(){var e,t
return q(),t=new H,e=qt(),t.finishProgram(e)}function Wt(){var e,t,n,r=[]
for(e=0;e<vn.tokens.length;++e)t=vn.tokens[e],n={type:t.type,value:t.value},t.regex&&(n.regex={pattern:t.regex.pattern,flags:t.regex.flags}),vn.range&&(n.range=t.range),vn.loc&&(n.loc=t.loc),r.push(n)
vn.tokens=r}function Vt(e,t){var n,r
n=String,"string"==typeof e||e instanceof String||(e=n(e)),Xt=e,nn=0,rn=Xt.length>0?1:0,on=0,ln=nn,hn=rn,fn=on,dn=Xt.length,mn=null,gn={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1,curlyStack:[]},vn={},t=t||{},t.tokens=!0,vn.tokens=[],vn.tokenize=!0,vn.openParenToken=-1,vn.openCurlyToken=-1,vn.range="boolean"==typeof t.range&&t.range,vn.loc="boolean"==typeof t.loc&&t.loc,"boolean"==typeof t.comment&&t.comment&&(vn.comments=[]),"boolean"==typeof t.tolerant&&t.tolerant&&(vn.errors=[])
try{if(q(),mn.type===Gt.EOF)return vn.tokens
for(U();mn.type!==Gt.EOF;)try{U()}catch(i){if(vn.errors){$(i)
break}throw i}Wt(),r=vn.tokens,"undefined"!=typeof vn.comments&&(r.comments=vn.comments),"undefined"!=typeof vn.errors&&(r.errors=vn.errors)}catch(o){throw o}finally{vn={}}return r}function Ht(e,t){var n,r
r=String,"string"==typeof e||e instanceof String||(e=r(e)),Xt=e,nn=0,rn=Xt.length>0?1:0,on=0,ln=nn,hn=rn,fn=on,dn=Xt.length,mn=null,gn={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1,curlyStack:[]},tn="script",en=!1,vn={},"undefined"!=typeof t&&(vn.range="boolean"==typeof t.range&&t.range,vn.loc="boolean"==typeof t.loc&&t.loc,vn.attachComment="boolean"==typeof t.attachComment&&t.attachComment,vn.loc&&null!==t.source&&void 0!==t.source&&(vn.source=r(t.source)),"boolean"==typeof t.tokens&&t.tokens&&(vn.tokens=[]),"boolean"==typeof t.comment&&t.comment&&(vn.comments=[]),"boolean"==typeof t.tolerant&&t.tolerant&&(vn.errors=[]),vn.attachComment&&(vn.range=!0,vn.comments=[],vn.bottomRightStack=[],vn.trailingComments=[],vn.leadingComments=[]),"module"===t.sourceType&&(tn=t.sourceType,en=!0))
try{n=zt(),"undefined"!=typeof vn.comments&&(n.comments=vn.comments),"undefined"!=typeof vn.tokens&&(Wt(),n.tokens=vn.tokens),"undefined"!=typeof vn.errors&&(n.errors=vn.errors)}catch(i){throw i}finally{vn={}}return n}var Gt,$t,Kt,Yt,Qt,Jt,Zt,Xt,en,tn,nn,rn,on,sn,an,un,cn,ln,hn,fn,pn,dn,mn,gn,vn,yn,bn,wn
Gt={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8,RegularExpression:9,Template:10},$t={},$t[Gt.BooleanLiteral]="Boolean",$t[Gt.EOF]="<end>",$t[Gt.Identifier]="Identifier",$t[Gt.Keyword]="Keyword",$t[Gt.NullLiteral]="Null",$t[Gt.NumericLiteral]="Numeric",$t[Gt.Punctuator]="Punctuator",$t[Gt.StringLiteral]="String",$t[Gt.RegularExpression]="RegularExpression",$t[Gt.Template]="Template",Kt=["(","{","[","in","typeof","instanceof","new","return","case","delete","throw","void","=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","&=","|=","^=",",","+","-","*","/","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","===","==",">=","<=","<",">","!=","!=="],Yt={AssignmentExpression:"AssignmentExpression",AssignmentPattern:"AssignmentPattern",ArrayExpression:"ArrayExpression",ArrayPattern:"ArrayPattern",ArrowFunctionExpression:"ArrowFunctionExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ClassBody:"ClassBody",ClassDeclaration:"ClassDeclaration",ClassExpression:"ClassExpression",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExportAllDeclaration:"ExportAllDeclaration",ExportDefaultDeclaration:"ExportDefaultDeclaration",ExportNamedDeclaration:"ExportNamedDeclaration",ExportSpecifier:"ExportSpecifier",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",ImportDeclaration:"ImportDeclaration",ImportDefaultSpecifier:"ImportDefaultSpecifier",ImportNamespaceSpecifier:"ImportNamespaceSpecifier",ImportSpecifier:"ImportSpecifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",MethodDefinition:"MethodDefinition",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",ObjectPattern:"ObjectPattern",Program:"Program",Property:"Property",RestElement:"RestElement",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SpreadElement:"SpreadElement",Super:"Super",SwitchCase:"SwitchCase",SwitchStatement:"SwitchStatement",TaggedTemplateExpression:"TaggedTemplateExpression",TemplateElement:"TemplateElement",TemplateLiteral:"TemplateLiteral",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement"},Qt={ArrowParameterPlaceHolder:"ArrowParameterPlaceHolder"},Jt={UnexpectedToken:"Unexpected token %0",UnexpectedNumber:"Unexpected number",UnexpectedString:"Unexpected string",UnexpectedIdentifier:"Unexpected identifier",UnexpectedReserved:"Unexpected reserved word",UnexpectedTemplate:"Unexpected quasi %0",UnexpectedEOS:"Unexpected end of input",NewlineAfterThrow:"Illegal newline after throw",InvalidRegExp:"Invalid regular expression",UnterminatedRegExp:"Invalid regular expression: missing /",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NoCatchOrFinally:"Missing catch or finally after try",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared",IllegalContinue:"Illegal continue statement",IllegalBreak:"Illegal break statement",IllegalReturn:"Illegal return statement",StrictModeWith:"Strict mode code may not include a with statement",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictReservedWord:"Use of future reserved word in strict mode",TemplateOctalLiteral:"Octal literals are not allowed in template strings.",ParameterAfterRestParameter:"Rest parameter must be last formal parameter",DefaultRestParameter:"Unexpected token =",ObjectPatternAsRestParameter:"Unexpected token {",DuplicateProtoProperty:"Duplicate __proto__ fields are not allowed in object literals",ConstructorSpecialMethod:"Class constructor may not be an accessor",DuplicateConstructor:"A class may only have one constructor",StaticPrototype:"Classes may not have static property named prototype",MissingFromClause:"Unexpected token",NoAsAfterImportNamespace:"Unexpected token",InvalidModuleSpecifier:"Unexpected token",IllegalImportDeclaration:"Unexpected token",IllegalExportDeclaration:"Unexpected token"},Zt={NonAsciiIdentifierStart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),NonAsciiIdentifierPart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԯԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠ-ࢲࣤ-ॣ०-९ॱ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಁ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲഁ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟ෦-෯ෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤞᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧ᪰-᪽ᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶ᳸᳹ᴀ-᷵᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚝꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꧠ-ꧾꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︭︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")},G.prototype=H.prototype={processComment:function(){var e,t,n,r,i,o=vn.bottomRightStack,s=o[o.length-1]
if(!(this.type===Yt.Program&&this.body.length>0)){if(vn.trailingComments.length>0){for(n=[],r=vn.trailingComments.length-1;r>=0;--r)i=vn.trailingComments[r],i.range[0]>=this.range[1]&&(n.unshift(i),vn.trailingComments.splice(r,1))
vn.trailingComments=[]}else s&&s.trailingComments&&s.trailingComments[0].range[0]>=this.range[1]&&(n=s.trailingComments,delete s.trailingComments)
if(s)for(;s&&s.range[0]>=this.range[0];)e=s,s=o.pop()
if(e)e.leadingComments&&e.leadingComments[e.leadingComments.length-1].range[1]<=this.range[0]&&(this.leadingComments=e.leadingComments,e.leadingComments=void 0)
else if(vn.leadingComments.length>0)for(t=[],r=vn.leadingComments.length-1;r>=0;--r)i=vn.leadingComments[r],i.range[1]<=this.range[0]&&(t.unshift(i),vn.leadingComments.splice(r,1))
t&&t.length>0&&(this.leadingComments=t),n&&n.length>0&&(this.trailingComments=n),o.push(this)}},finish:function(){vn.range&&(this.range[1]=an),vn.loc&&(this.loc.end={line:un,column:an-cn},vn.source&&(this.loc.source=vn.source)),vn.attachComment&&this.processComment()},finishArrayExpression:function(e){return this.type=Yt.ArrayExpression,this.elements=e,this.finish(),this},finishArrayPattern:function(e){return this.type=Yt.ArrayPattern,this.elements=e,this.finish(),this},finishArrowFunctionExpression:function(e,t,n,r){return this.type=Yt.ArrowFunctionExpression,this.id=null,this.params=e,this.defaults=t,this.body=n,this.generator=!1,this.expression=r,this.finish(),this},finishAssignmentExpression:function(e,t,n){return this.type=Yt.AssignmentExpression,this.operator=e,this.left=t,this.right=n,this.finish(),this},finishAssignmentPattern:function(e,t){return this.type=Yt.AssignmentPattern,this.left=e,this.right=t,this.finish(),this},finishBinaryExpression:function(e,t,n){return this.type="||"===e||"&&"===e?Yt.LogicalExpression:Yt.BinaryExpression,this.operator=e,this.left=t,this.right=n,this.finish(),this},finishBlockStatement:function(e){return this.type=Yt.BlockStatement,this.body=e,this.finish(),this},finishBreakStatement:function(e){return this.type=Yt.BreakStatement,this.label=e,this.finish(),this},finishCallExpression:function(e,t){return this.type=Yt.CallExpression,this.callee=e,this.arguments=t,this.finish(),this},finishCatchClause:function(e,t){return this.type=Yt.CatchClause,this.param=e,this.body=t,this.finish(),this},finishClassBody:function(e){return this.type=Yt.ClassBody,this.body=e,this.finish(),this},finishClassDeclaration:function(e,t,n){return this.type=Yt.ClassDeclaration,this.id=e,this.superClass=t,this.body=n,this.finish(),this},finishClassExpression:function(e,t,n){return this.type=Yt.ClassExpression,this.id=e,this.superClass=t,this.body=n,this.finish(),this},finishConditionalExpression:function(e,t,n){return this.type=Yt.ConditionalExpression,this.test=e,this.consequent=t,this.alternate=n,this.finish(),this},finishContinueStatement:function(e){return this.type=Yt.ContinueStatement,this.label=e,this.finish(),this},finishDebuggerStatement:function(){return this.type=Yt.DebuggerStatement,this.finish(),this},finishDoWhileStatement:function(e,t){return this.type=Yt.DoWhileStatement,this.body=e,this.test=t,this.finish(),this},finishEmptyStatement:function(){return this.type=Yt.EmptyStatement,this.finish(),this},finishExpressionStatement:function(e){return this.type=Yt.ExpressionStatement,this.expression=e,this.finish(),this},finishForStatement:function(e,t,n,r){return this.type=Yt.ForStatement,this.init=e,this.test=t,this.update=n,this.body=r,this.finish(),this},finishForInStatement:function(e,t,n){return this.type=Yt.ForInStatement,this.left=e,this.right=t,this.body=n,this.each=!1,this.finish(),this},finishFunctionDeclaration:function(e,t,n,r){return this.type=Yt.FunctionDeclaration,this.id=e,this.params=t,this.defaults=n,this.body=r,this.generator=!1,this.expression=!1,this.finish(),this},finishFunctionExpression:function(e,t,n,r){return this.type=Yt.FunctionExpression,this.id=e,this.params=t,this.defaults=n,this.body=r,this.generator=!1,this.expression=!1,this.finish(),this},finishIdentifier:function(e){return this.type=Yt.Identifier,this.name=e,this.finish(),this},finishIfStatement:function(e,t,n){return this.type=Yt.IfStatement,this.test=e,this.consequent=t,this.alternate=n,this.finish(),this},finishLabeledStatement:function(e,t){return this.type=Yt.LabeledStatement,this.label=e,this.body=t,this.finish(),this},finishLiteral:function(e){return this.type=Yt.Literal,this.value=e.value,this.raw=Xt.slice(e.start,e.end),e.regex&&(this.regex=e.regex),this.finish(),this},finishMemberExpression:function(e,t,n){return this.type=Yt.MemberExpression,this.computed="["===e,this.object=t,this.property=n,this.finish(),this},finishNewExpression:function(e,t){return this.type=Yt.NewExpression,this.callee=e,this.arguments=t,this.finish(),this},finishObjectExpression:function(e){return this.type=Yt.ObjectExpression,this.properties=e,this.finish(),this},finishObjectPattern:function(e){return this.type=Yt.ObjectPattern,this.properties=e,this.finish(),this},finishPostfixExpression:function(e,t){return this.type=Yt.UpdateExpression,this.operator=e,this.argument=t,this.prefix=!1,this.finish(),this},finishProgram:function(e){return this.type=Yt.Program,this.body=e,"module"===tn&&(this.sourceType=tn),this.finish(),this},finishProperty:function(e,t,n,r,i,o){return this.type=Yt.Property,this.key=t,this.computed=n,this.value=r,this.kind=e,this.method=i,this.shorthand=o,this.finish(),this},finishRestElement:function(e){return this.type=Yt.RestElement,this.argument=e,this.finish(),this},finishReturnStatement:function(e){return this.type=Yt.ReturnStatement,this.argument=e,this.finish(),this},finishSequenceExpression:function(e){return this.type=Yt.SequenceExpression,this.expressions=e,this.finish(),this},finishSpreadElement:function(e){return this.type=Yt.SpreadElement,this.argument=e,this.finish(),this},finishSwitchCase:function(e,t){return this.type=Yt.SwitchCase,this.test=e,this.consequent=t,this.finish(),this},finishSuper:function(){return this.type=Yt.Super,this.finish(),this},finishSwitchStatement:function(e,t){return this.type=Yt.SwitchStatement,this.discriminant=e,this.cases=t,this.finish(),this},finishTaggedTemplateExpression:function(e,t){return this.type=Yt.TaggedTemplateExpression,this.tag=e,this.quasi=t,this.finish(),this},finishTemplateElement:function(e,t){return this.type=Yt.TemplateElement,this.value=e,this.tail=t,this.finish(),this},finishTemplateLiteral:function(e,t){return this.type=Yt.TemplateLiteral,this.quasis=e,this.expressions=t,this.finish(),this},finishThisExpression:function(){return this.type=Yt.ThisExpression,this.finish(),this},finishThrowStatement:function(e){return this.type=Yt.ThrowStatement,this.argument=e,this.finish(),this},finishTryStatement:function(e,t,n){return this.type=Yt.TryStatement,this.block=e,this.guardedHandlers=[],this.handlers=t?[t]:[],this.handler=t,this.finalizer=n,this.finish(),this},finishUnaryExpression:function(e,t){return this.type="++"===e||"--"===e?Yt.UpdateExpression:Yt.UnaryExpression,this.operator=e,this.argument=t,this.prefix=!0,this.finish(),this},finishVariableDeclaration:function(e){return this.type=Yt.VariableDeclaration,this.declarations=e,this.kind="var",this.finish(),this},finishLexicalDeclaration:function(e,t){return this.type=Yt.VariableDeclaration,this.declarations=e,this.kind=t,this.finish(),this},finishVariableDeclarator:function(e,t){return this.type=Yt.VariableDeclarator,this.id=e,this.init=t,this.finish(),this},finishWhileStatement:function(e,t){return this.type=Yt.WhileStatement,this.test=e,this.body=t,this.finish(),this},finishWithStatement:function(e,t){return this.type=Yt.WithStatement,this.object=e,this.body=t,this.finish(),this},finishExportSpecifier:function(e,t){return this.type=Yt.ExportSpecifier,this.exported=t||e,this.local=e,this.finish(),this},finishImportDefaultSpecifier:function(e){return this.type=Yt.ImportDefaultSpecifier,this.local=e,this.finish(),this},finishImportNamespaceSpecifier:function(e){return this.type=Yt.ImportNamespaceSpecifier,this.local=e,this.finish(),this},finishExportNamedDeclaration:function(e,t,n){return this.type=Yt.ExportNamedDeclaration,this.declaration=e,this.specifiers=t,this.source=n,this.finish(),this},finishExportDefaultDeclaration:function(e){return this.type=Yt.ExportDefaultDeclaration,this.declaration=e,this.finish(),this},finishExportAllDeclaration:function(e){return this.type=Yt.ExportAllDeclaration,this.source=e,this.finish(),this},finishImportSpecifier:function(e,t){return this.type=Yt.ImportSpecifier,this.local=e||t,this.imported=t,this.finish(),this},finishImportDeclaration:function(e,t){return this.type=Yt.ImportDeclaration,this.specifiers=e,this.source=t,this.finish(),this}},e.version="2.2.0",e.tokenize=Vt,e.parse=Ht,e.Syntax=function(){var e,t={}
"function"==typeof Object.create&&(t=Object.create(null))
for(e in Yt)Yt.hasOwnProperty(e)&&(t[e]=Yt[e])
return"function"==typeof Object.freeze&&Object.freeze(t),t}()})},{}],104:[function(e,t,n){function r(e,t){return e+": "+(t.indexOf(":")>=0?'"'+t+'"':t)}function i(e){return e.replace(/^[\s\uFEFF\xA0]*\n/,"")}function o(e){for(var t=e.split("\n"),n=!1,i=!1,o=[],s=0;s<t.length&&!i;s++)if(n)i||(i=!/^\s*$/.test(t[s]))
else{var a=/^([^:]+):\s*([^\r\n]+)\s*$/.exec(t[s])
if(a&&3===a.length){var u=a[1].trim(),c=a[2].trim()
o.push(r(u,c))}else s>=0&&(n=!0)}var l="---\n"+o.join("\n")+"\n---\n",h=l+t.slice(s-1).join("\n")
return h}function s(e){0!==e.indexOf("---")&&(e=o(e))
var t=c(e),n={content:i(t.__content)}
return delete t.__content,n.metadata=t,n}function a(e,t){var n=s(t)
return n.metadata=e(n.metadata),n}var u=e("weak-type-wizard"),c=e("./js-yaml-front.js")
t.exports=function(e,t){var n=new u(t||{})
return a(n,e)}},{"./js-yaml-front.js":72,"weak-type-wizard":105}],105:[function(e,t,n){function r(e){return Object.keys(e).reduce(function(t,n){return a(!0,t,i(e[n],n))},{})}function i(e,t){return"string"==typeof e?i([e],t):Array.isArray(e)?e.reduce(function(e,n){return e[n]=t,e},{}):{}}function o(e,t,n){return Object.keys(t).filter(function(t){return"undefined"!=typeof e[t]}).forEach(function(r){var i=n[e[r]]
"function"==typeof i&&(t[r]=i(t[r]))}),t}function s(e,t,n){var i=function(r){var i=a(!0,{},t,r)
return o(e,i,n)}
return i.extend=function(i){var o=i["default"]
delete i["default"]
var c=i.cast
delete i.cast
var l=r(i)
return new s(a(!0,{},e,l),a(!0,{},t,o),a(!0,{},u,n,c))},i.getLevelUpEncoding=function(){return{buffer:!1,type:"weak-type-wizard",encode:JSON.stringify,decode:function(e){return i(JSON.parse(e))}}},i}var a=e("extend"),u={"boolean":function(e){return"false"!==e.toString().toLowerCase()&&!(/^\d+$/.test(e)&&0!==parseInt(e))},number:function(e){return parseFloat(e)},string:function(e){return e.toString()},date:function(e){return new Date(e)}},c=new s({},{})
t.exports=function(e){return c.extend(e)}},{extend:66}],106:[function(e,t,n){function r(e,t){for(var n=0,r=t.indexOf(e);-1!==r;)n++,r=t.indexOf(e,r+1)
return n}function i(e,t,n){return n.replace(/\[\[([\w.-]+)(?:\|([^\]>\n]+))?\]\]/gm,function(n,i,o,s,a){var u=r("<code",a.substr(0,s)),c=r("</code",a.substr(0,s))
return u!==c?n:(o=o||i,e.emit("link",i),'<a href="'+t+i+'">'+o+"</a>")})}var o=e("events").EventEmitter
t.exports=function(e){var t=Object.create(new o)
return t.linkify=i.bind(null,t,e),t}},{events:181}],107:[function(e,t,n){function r(e,t){function n(e){u.mixinHtml(e),u.parseTemplate(e),u.mixinChildPosts(e),u.mixinRenderedHtmlEmitter(e),e.on("all child posts fetched",function(e){e.templateElements.forEach(n)})}function r(e,t){var r=u.makeNewMixinObject(e)
n(r),r.on("final html rendered",function(e){t(null,e.renderedHtml)})}function o(e){u.mixinHtml(e),u.parseTemplate(e),u.mixinTemplateRactive(e),u.updateEmitterMixin(e),u.mixinTeardownChildren(e),u.mixinChildPosts(e),e.on("child post fetched",function(t){e.torndown||(o(t),e.children.push(t))}),e.on("post changed",function(t){var n=u.makeNewMixinObject(t)
n.elementId=e.elementId,n.data=e.data,e.ractive.teardown(),e.removeAllListeners(),o(n)}),e.ractive.on("teardown",function(){e.torndown=!0,e.teardownChildren(),e.removeAllListeners()})}function s(e){function t(t){e.teardownChildren(),a(t,e.ractive)}e.on("post changed",t),e.change=function(n){e.removeListener("post changed",t),t(n)},e.ractive.on("teardown",function(){e.teardownChildren(),e.torndown=!0})}function a(e,t){var n=u.makeNewMixinObject(e)
return n.ractive=t,u.mixinHtml(n),u.parseTemplate(n),u.updateEmitterMixin(n),u.mixinTeardownChildren(n),u.mixinChildPosts(n),s(n),n.on("child post fetched",function(e){n.torndown||(o(e),n.children.push(e))}),t.set({html:n.html,metadata:e.metadata,current:e.filename}),n.change}var u=i(e,t)
return{populateRootRactive:a,renderPost:r}}var i=e("./mixins")
t.exports=r},{"./mixins":108}],108:[function(e,t,n){(function(n){function r(e){try{return new d({el:null,data:e.data,template:e.renderedHtml||e.html,preserveWhitespace:!0}).toHTML()}catch(t){return e.emit("error",t),t.message}}function i(e){var t=Object.create(new p)
return e&&(t.post=e,t.postName=e.filename),t}function o(e,t){var n=h.generatePostDiv(t.elementId),r=e.renderedHtml||e.html
return e.renderedHtml=r.replace(n,t.renderedHtml),e}function s(e,t){function r(){t.emit("all child posts fetched",t)}var i=0
return t.templateElements.forEach(function(n){e(n.postName,function(e,o){i+=1,e?n.err=e:(n.post=o,t.emit("child post fetched",n)),i===t.templateElements.length&&r()})}),0===t.templateElements.length&&n.nextTick(r),t}function a(e,t){return t.html=e(f(t.post)),t}function u(e){return e.on("all child posts fetched",function(e){if(0===e.templateElements.length)e.renderedHtml=r(e),n.nextTick(function(){e.emit("final html rendered",e)})
else{var t=0,i=function(n){o(e,n),t+=1,t>=e.templateElements.length&&(e.renderedHtml=r(e),e.emit("final html rendered",e))}
e.templateElements.forEach(function(e){e.once("final html rendered",i)})}}),e}function c(e){try{e.ractive=new d({el:e.elementId,data:e.data,template:e.html,preserveWhitespace:!0})}catch(t){e.ractive=new d({el:e.elementId,data:{error:t.message},template:g}),e.emit("error",t)}e.emit("ractive created",e)}function l(e){e.children=[],e.teardownChildren=function(){e.children.forEach(function(e){e.ractive&&e.ractive.teardown(),e.torndown=!0})}}var h=e("./templateToolbox.js"),f=h.htmlify,p=e("events").EventEmitter,d=e("ractive"),m=e("./updateEmitterMixin.js"),g=d.parse("{{error}}")
t.exports=function(t,n){return{mixinHtml:a.bind(null,n),makeNewMixinObject:i,mixinRenderedHtmlEmitter:u,parseTemplate:e("./parseTemplate"),mixinChildPosts:s.bind(null,t.getPost),updateEmitterMixin:m(t),mixinTemplateRactive:c,mixinTeardownChildren:l}}}).call(this,e("WuQzkM"))},{"./parseTemplate":172,"./templateToolbox.js":173,"./updateEmitterMixin.js":174,WuQzkM:183,events:181,ractive:109}],109:[function(e,t,n){!function(e){"use strict"
var n=e.Ractive,r=void 0,i=function(){var e,t
return e={el:null,template:"",complete:null,preserveWhitespace:!1,append:!1,twoway:!0,modifyArrays:!0,lazy:!1,debug:!1,noIntro:!1,transitionsEnabled:!0,magic:!1,noCssTransform:!1,adapt:[],sanitize:!1,stripComments:!0,isolated:!1,delimiters:["{{","}}"],tripleDelimiters:["{{{","}}}"],computed:null},t={keys:Object.keys(e),defaults:e}}(r),o=function(){return"undefined"!=typeof document?document&&document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"):void 0}(),s={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},a=function(e,t){return e?function(e,n){return n&&n!==t.html?document.createElementNS(n,e):document.createElement(e)}:function(e,n){if(n&&n!==t.html)throw"This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information"
return document.createElement(e)}}(o,s),u="object"==typeof document,c=function(e){try{return Object.defineProperty({},"test",{value:0}),e&&Object.defineProperty(document.createElement("div"),"test",{value:0}),Object.defineProperty}catch(t){return function(e,t,n){e[t]=n.value}}}(u),l=function(e,t,n){try{try{Object.defineProperties({},{test:{value:0}})}catch(r){throw r}return n&&Object.defineProperties(e("div"),{test:{value:0}}),Object.defineProperties}catch(r){return function(e,n){var r
for(r in n)n.hasOwnProperty(r)&&t(e,r,n[r])}}}(a,c,u),h=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},f=function(e){return function(t,n,r){var i
if("string"!=typeof n||!e(r))throw new Error("Bad arguments")
if(i=+t.get(n)||0,!e(i))throw new Error("Cannot add to a non-numeric value")
return t.set(n,i+r)}}(h),p=function(e){return function(t,n){return e(this,t,void 0===n?1:+n)}}(f),d=function(e,t){return null===e&&null===t?!0:"object"==typeof e||"object"==typeof t?!1:e===t},m=function(){function e(e){setTimeout(e,0)}function t(e,t){return function(){for(var n;n=e.shift();)n(t)}}function n(e,t,i,o){var s
if(t===e)throw new TypeError("A promise's fulfillment handler cannot return the same promise")
if(t instanceof r)t.then(i,o)
else if(!t||"object"!=typeof t&&"function"!=typeof t)i(t)
else{try{s=t.then}catch(a){return void o(a)}if("function"==typeof s){var u,c,l
c=function(t){u||(u=!0,n(e,t,i,o))},l=function(e){u||(u=!0,o(e))}
try{s.call(t,c,l)}catch(a){if(!u)return o(a),void(u=!0)}}else i(t)}}var r,i={},o={},s={}
return r=function(a){var u,c,l,h,f,p,d=[],m=[],g=i
return l=function(n){return function(r){g===i&&(u=r,g=n,c=t(g===o?d:m,u),e(c))}},h=l(o),f=l(s),a(h,f),p={then:function(t,o){var s=new r(function(r,a){var u=function(e,t,i){t.push("function"==typeof e?function(t){var i
try{i=e(t),n(s,i,r,a)}catch(o){a(o)}}:i)}
u(t,d,r),u(o,m,a),g!==i&&e(c)})
return s}},p["catch"]=function(e){return this.then(null,e)},p},r.all=function(e){return new r(function(t,n){var r,i,o,s=[]
if(!e.length)return void t(s)
for(o=function(i){e[i].then(function(e){s[i]=e,--r||t(s)},n)},r=i=e.length;i--;)o(i)})},r.resolve=function(e){return new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r}(),g=function(){var e=/\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g
return function(t){return(t||"").replace(e,".$1")}}(),v=["o","ms","moz","webkit"],y=function(e){return"undefined"!=typeof window?(function(e,t,n){var r,i
if(!n.requestAnimationFrame){for(r=0;r<e.length&&!n.requestAnimationFrame;++r)n.requestAnimationFrame=n[e[r]+"RequestAnimationFrame"]
n.requestAnimationFrame||(i=n.setTimeout,n.requestAnimationFrame=function(e){var n,r,o
return n=Date.now(),r=Math.max(0,16-(n-t)),o=i(function(){e(n+r)},r),t=n+r,o})}}(e,0,window),window.requestAnimationFrame):void 0}(v),b=function(){return"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?function(){return window.performance.now()}:function(){return Date.now()}}(),w=[],x=function(e,t){var n=e.indexOf(t);-1!==n&&e.splice(n,1)},k=function(e,t,n){var r,i,o,s,a,u="/* Ractive.js component styles */\n",c={},l=[]
if(t)return e.push(function(){r=e.runloop}),i=document.createElement("style"),i.type="text/css",o=document.getElementsByTagName("head")[0],a=!1,s=i.styleSheet,{add:function(e){e.css&&(c[e._guid]||(c[e._guid]=0,l.push(e.css),r.scheduleCssUpdate()),c[e._guid]+=1)},remove:function(e){e.css&&(c[e._guid]-=1,c[e._guid]||(n(l,e.css),r.scheduleCssUpdate()))},update:function(){var e
l.length?(e=u+l.join(" "),s?s.cssText=e:i.innerHTML=e,a||o.appendChild(i)):a&&o.removeChild(i)}}}(w,u,x),E=function(e,t){var n,r,i,o,s,a
for(n=[],a=e._rendering?e.fragment.docFrag:e.el,r=a.querySelectorAll('input[type="checkbox"][name="{{'+t+'}}"]'),o=r.length,s=0;o>s;s+=1)i=r[s],(i.hasAttribute("checked")||i.checked)&&n.push(i._ractive.value)
return n},_=Object.prototype.hasOwnProperty,S=function(e){do if(e.context)return e.context
while(e=e.parent)
return""},A=function(e,t,n,r){var i,o='Could not resolve reference - too many "../" prefixes'
return e.push(function(){i=e.get}),function(e,s,a){var u,c,l,h,f,p,d,m,g
if(s=t(s),"."===s)return r(a)
if("."===s.charAt(0)){if(u=r(a),c=u?u.split("."):[],"../"===s.substr(0,3)){for(;"../"===s.substr(0,3);){if(!c.length)throw new Error(o)
c.pop(),s=s.substring(3)}return c.push(s),c.join(".")}return u?u+s:s.substring(1)}l=s.split("."),h=l.pop(),f=l.length?"."+l.join("."):""
do if(u=a.context,u&&(g=!0,p=u+f,d=i(e,p),(m=e._wrapped[p])&&(d=m.get()),d&&("object"==typeof d||"function"==typeof d)&&h in d))return u+"."+s
while(a=a.parent)
return g||e._parent&&!e.isolated?n.call(e.data,s)?s:void 0!==i(e,s)?s:void 0:s}}(w,g,_,S),T=function(e){var t,n,r,i,o=[""]
for(t=e.length;t--;)for(n=e[t],r=n.split(".");r.length>1;)r.pop(),i=r.join("."),o[i]!==!0&&(o.push(i),o[i]=!0)
return o},C=function(){function e(e,n,r){var o
for(e._patternObservers.length&&i(e,n,n,r,!0),o=0;o<e._deps.length;o+=1)t(e,n,o,r)}function t(e,t,i,o){var s=e._deps[i]
s&&(n(s[t]),o||r(e._depsMap[t],e,i))}function n(e){var t,n
if(e)for(n=e.length,t=0;n>t;t+=1)e[t].update()}function r(e,n,r,i){var o
if(e)for(o=e.length;o--;)t(n,e[o],r,i)}function i(e,t,n,r,s){var u,c,l,h,f,p,d,m
for(u=e._patternObservers.length;u--;)c=e._patternObservers[u],c.regex.test(n)&&c.update(n)
r||(m=function(t){if(l=e._depsMap[t])for(u=l.length;u--;)h=l[u],f=a.exec(h)[0],p=n?n+"."+f:f,i(e,h,p)},s?(d=o(n),d.forEach(m)):m(t))}function o(e){var t,n,r,i,o,a
for(t=e.split("."),n=s(t.length),o=[],r=function(e,n){return e?"*":t[n]},i=n.length;i--;)a=n[i].map(r).join("."),o[a]||(o.push(a),o[a]=!0)
return o}function s(e){var t,n,r,i,o,s=""
if(!u[e]){for(r=[];s.length<e;)s+=1
for(t=parseInt(s,2),i=function(e){return"1"===e},o=0;t>=o;o+=1){for(n=o.toString(2);n.length<e;)n="0"+n
r[o]=Array.prototype.map.call(n,i)}u[e]=r}return u[e]}var a,u={}
return a=/[^\.]+$/,e.multiple=function(e,n,r){var o,s,a
if(a=n.length,e._patternObservers.length)for(o=a;o--;)i(e,n[o],n[o],r,!0)
for(o=0;o<e._deps.length;o+=1)if(e._deps[o])for(s=a;s--;)t(e,n[s],o,r)},e}(),O=function(e){var t,n,r,i
return t=function(e,t){var o=[]
return o.detachQueue=[],o.remove=r,o.init=i,o._check=n,o._callback=e,o._previous=t,t&&t.push(o),o},n=function(){var e
if(this._ready&&!this.length){for(;e=this.detachQueue.pop();)e.detach()
"function"==typeof this._callback&&this._callback(),this._previous&&this._previous.remove(this)}},r=function(t){e(this,t),this._check()},i=function(){this._ready=!0,this._check()},t}(x),N=function(e,t,n,r,i,o,s,a){function u(){var e,n,r
for(b&&(b.focus(),b=null);e=_.pop();)e.update().deferred=!1
for(;e=w.pop();)e._sort()
for(;e=x.pop();)e.init()
for(;e=k.pop();)e.init()
for(;e=E.pop();)e.update()
for(;e=S.pop();)e.active=!1
for(;e=R.pop();)if(R[e._guid]=!1,e._changes.length){for(r={};n=e._changes.pop();)r[n]=f(e,n)
e.fire("change",r)}d&&(t.update(),d=!1)}function c(){var e,t,n
for(n=R.length;n--;)e=R[n],e._changes.length&&(t=o(e._changes),s.multiple(e,t,!0))
for(l();g;){for(g=!1;e=T.pop();)e.update()
for(;e=A.pop();)e.update().deferred=!1
for(;e=C.pop();)e.deferredUpdate()
for(;e=N.pop();)p(e.root,e.keypath,r(e.root,e.keypath))
for(;e=L.pop();)e.update()}}function l(){var e,t,n
if(I.length)for(e=I.splice(0,I.length);t=e.pop();)t.keypath||(n=i(t.root,t.ref,t.parentFragment),void 0!==n?t.resolve(n):I.push(t))}e.push(function(){f=e.get,p=e.set})
var h,f,p,d,m,g=!1,v=!1,y=0,b=null,w=[],x=[],k=[],E=[],_=[],S=[],A=[],T=[],C=[],O={},N=[],L=[],I=[],R=[]
return h={start:function(e,t){this.addInstance(e),v||(y+=1,m=a(t,m))},end:function(){return v?void l():(--y||(v=!0,c(),v=!1,u()),m.init(),void(m=m._previous))},trigger:function(){return y||v?void l():(v=!0,c(),v=!1,void u())},focus:function(e){b=e},addInstance:function(e){e&&!R[e._guid]&&(R.push(e),R[R._guid]=!0)},addLiveQuery:function(e){w.push(e)},addDecorator:function(e){x.push(e)},addTransition:function(e){e._manager=m,m.push(e),k.push(e)},addObserver:function(e){E.push(e)},addAttribute:function(e){_.push(e)},addBinding:function(e){e.active=!0,S.push(e)},scheduleCssUpdate:function(){y||v?d=!0:t.update()},addEvaluator:function(e){g=!0,A.push(e)},addComputation:function(e){g=!0,T.push(e)},addSelectValue:function(e){g=!0,C.push(e)},addCheckbox:function(e){O[e.keypath]||(g=!0,N.push(e))},addRadio:function(e){g=!0,L.push(e)},addUnresolved:function(e){g=!0,I.push(e)},removeUnresolved:function(e){n(I,e)},detachWhenReady:function(e){m.detachQueue.push(e)}},e.runloop=h,h}(w,k,x,E,A,T,C,O),L=function(e,t,n){var r=[],i={tick:function(){var o,s,a
for(a=t(),n.start(),o=0;o<r.length;o+=1)s=r[o],s.tick(a)||r.splice(o--,1)
n.end(),r.length?e(i.tick):i.running=!1},add:function(t){r.push(t),i.running||(i.running=!0,e(i.tick))},abort:function(e,t){for(var n,i=r.length;i--;)n=r[i],n.root===t&&n.keypath===e&&n.stop()}}
return i}(y,b,N),I=function(){var e=Object.prototype.toString
return function(t){return"[object Array]"===e.call(t)}}(),R=function(e){return function(t){var n,r
if(!t||"object"!=typeof t)return t
if(e(t))return t.slice()
n={}
for(r in t)t.hasOwnProperty(r)&&(n[r]=t[r])
return n}}(I),j={},P=function(e,t,n){switch(t){case"splice":return n
case"sort":case"reverse":return null
case"pop":return e.length?[-1]:null
case"push":return[e.length,0].concat(n)
case"shift":return[0,1]
case"unshift":return[0,0].concat(n)}},M=function(e,t){var n,r,i,o
return t?(n=+(t[0]<0?e.length+t[0]:t[0]),r=Math.max(0,t.length-2),i=void 0!==t[1]?t[1]:e.length-n,i=Math.min(i,e.length-n),o=r-i,{start:n,balance:o,added:r,removed:i}):null},D={TEXT:1,INTERPOLATOR:2,TRIPLE:3,SECTION:4,INVERTED:5,CLOSING:6,ELEMENT:7,PARTIAL:8,COMMENT:9,DELIMCHANGE:10,MUSTACHE:11,TAG:12,ATTRIBUTE:13,COMPONENT:15,NUMBER_LITERAL:20,STRING_LITERAL:21,ARRAY_LITERAL:22,OBJECT_LITERAL:23,BOOLEAN_LITERAL:24,GLOBAL:26,KEY_VALUE_PAIR:27,REFERENCE:30,REFINEMENT:31,MEMBER:32,PREFIX_OPERATOR:33,BRACKETED:34,CONDITIONAL:35,INFIX_OPERATOR:36,INVOCATION:40},F=function pi(e,t,n){var r,i
if(n||(i=e._wrapped[t])&&i.teardown()!==!1&&(e._wrapped[t]=null),e._cache[t]=void 0,r=e._cacheMap[t])for(;r.length;)pi(e,r.pop())},B=function(){var e=/^\s*[0-9]+\s*$/
return function(t){return e.test(t)?[]:{}}}(),U=function(e,t,n,r,i){function o(e,a,u,c){var l,h,f,p,d,m,g,v
t(e._cache[a],u)||(d=e._computations[a],m=e._wrapped[a],g=e._evaluators[a],d&&!d.setting&&d.set(u),m&&m.reset&&(v=m.reset(u)!==!1,v&&(u=m.get())),g&&(g.value=u),d||g||v||(l=a.split("."),h=l.pop(),f=l.join("."),m=e._wrapped[f],m&&m.set?m.set(h,u):(p=m?m.get():s(e,f),p||(p=n(h),o(e,f,p,!0)),p[h]=u)),r(e,a,v),c||(e._changes.push(a),i(e,a)))}var s
return e.push(function(){s=e.get}),e.set=o,o}(w,d,B,F,C),q=function(e,t,n,r){return function(i,o,s,a){var u,c,l,h,f,p,d,m,g,v
if(u=i.root,c=i.keypath,u._changes.push(c),"sort"===s||"reverse"===s)return void r(u,c,o)
if(a){for(l=a.balance?o.length-Math.min(a.balance,0):a.added,f=a.start;l>f;f+=1)t(u,c+"."+f)
if(h=function(t){t.keypath===c&&t.type===e.SECTION&&!t.inverted&&t.docFrag?t.splice(a):t.update()},u._deps.forEach(function(e){var t=e[c]
t&&t.forEach(h)}),a.added&&a.removed)for(p=Math.max(a.added,a.removed),d=a.start,m=d+p,v=a.added===a.removed,f=d;m>f;f+=1)g=c+"."+f,n(u,g)
v||(t(u,c+".length"),n(u,c+".length",!0))}}}(D,F,C,U),z=function(e,t,n,r,i){var o,s,a,u=[],c=["pop","push","reverse","shift","sort","splice","unshift"]
return c.forEach(function(o){var s=function(){var t,s,a,u,c
for(t=n(this,o,Array.prototype.slice.call(arguments)),s=r(this,t),a=Array.prototype[o].apply(this,arguments),this._ractive.setting=!0,c=this._ractive.wrappers.length;c--;)u=this._ractive.wrappers[c],e.start(u.root),i(u,this,o,s),e.end()
return this._ractive.setting=!1,a}
t(u,o,{value:s})}),o={},o.__proto__?(s=function(e){e.__proto__=u},a=function(e){e.__proto__=Array.prototype}):(s=function(e){var n,r
for(n=c.length;n--;)r=c[n],t(e,r,{value:u[r],configurable:!0})},a=function(e){var t
for(t=c.length;t--;)delete e[c[t]]}),s.unpatch=a,s}(N,c,P,M,q),W=function(e,t,n){var r,i,o
return r={filter:function(e){return t(e)&&(!e._ractive||!e._ractive.setting)},wrap:function(e,t,n){return new i(e,t,n)}},i=function(t,r,i){this.root=t,this.value=r,this.keypath=i,r._ractive||(e(r,"_ractive",{value:{wrappers:[],instances:[],setting:!1},configurable:!0}),n(r)),r._ractive.instances[t._guid]||(r._ractive.instances[t._guid]=0,r._ractive.instances.push(t)),r._ractive.instances[t._guid]+=1,r._ractive.wrappers.push(this)},i.prototype={get:function(){return this.value},teardown:function(){var e,t,r,i,s
if(e=this.value,t=e._ractive,r=t.wrappers,i=t.instances,t.setting)return!1
if(s=r.indexOf(this),-1===s)throw new Error(o)
if(r.splice(s,1),r.length){if(i[this.root._guid]-=1,!i[this.root._guid]){if(s=i.indexOf(this.root),-1===s)throw new Error(o)
i.splice(s,1)}}else delete e._ractive,n.unpatch(this.value)}},o="Something went wrong in a rather interesting way",r}(c,I,z),V=function(e,t,n,r,i){function o(t,n,o){function s(t){var o,s
t.value=n,t.updating||(s=t.ractive,o=t.keypath,t.updating=!0,e.start(s),s._changes.push(o),r(s,o),i(s,o),e.end(),t.updating=!1)}var a,u,c,l,h,f
if(a=t.obj,u=t.prop,o&&!o.configurable){if("length"===u)return
throw new Error('Cannot use magic mode with property "'+u+'" - object is not configurable')}o&&(c=o.get,l=o.set),h=c||function(){return n},f=function(e){l&&l(e),n=c?c():e,f._ractiveWrappers.forEach(s)},f._ractiveWrappers=[t],Object.defineProperty(a,u,{get:h,set:f,enumerable:!0,configurable:!0})}var s,a
try{Object.defineProperty({},"test",{value:0})}catch(u){return!1}return s={filter:function(e,t,r){var i,o,s,a,u
return t?(i=t.split("."),o=i.pop(),s=i.join("."),(a=r._wrapped[s])&&!a.magic?!1:(u=r.get(s),n(u)&&/^[0-9]+$/.test(o)?!1:u&&("object"==typeof u||"function"==typeof u))):!1},wrap:function(e,t,n){return new a(e,t,n)}},a=function(e,t,n){var r,i,s,a
return this.magic=!0,this.ractive=e,this.keypath=n,this.value=t,r=n.split("."),this.prop=r.pop(),i=r.join("."),this.obj=i?e.get(i):e.data,s=this.originalDescriptor=Object.getOwnPropertyDescriptor(this.obj,this.prop),s&&s.set&&(a=s.set._ractiveWrappers)?void(-1===a.indexOf(this)&&a.push(this)):void o(this,t,s)},a.prototype={get:function(){return this.value},reset:function(e){this.updating||(this.updating=!0,this.obj[this.prop]=e,r(this.ractive,this.keypath),this.updating=!1)},set:function(e,n){this.updating||(this.obj[this.prop]||(this.updating=!0,this.obj[this.prop]=t(e),this.updating=!1),this.obj[this.prop][e]=n)},teardown:function(){var e,t,n,r,i
return this.updating?!1:(e=Object.getOwnPropertyDescriptor(this.obj,this.prop),t=e&&e.set,void(t&&(r=t._ractiveWrappers,i=r.indexOf(this),-1!==i&&r.splice(i,1),r.length||(n=this.obj[this.prop],Object.defineProperty(this.obj,this.prop,this.originalDescriptor||{writable:!0,enumerable:!0,configurable:!0}),this.obj[this.prop]=n))))}},s}(N,B,I,F,C),H=function(e,t){if(!e)return!1
var n,r
return n={filter:function(n,r,i){return e.filter(n,r,i)&&t.filter(n)},wrap:function(e,t,n){return new r(e,t,n)}},r=function(n,r,i){this.value=r,this.magic=!0,this.magicWrapper=e.wrap(n,r,i),this.arrayWrapper=t.wrap(n,r,i)},r.prototype={get:function(){return this.value},teardown:function(){this.arrayWrapper.teardown(),this.magicWrapper.teardown()},reset:function(e){return this.magicWrapper.reset(e)}},n}(V,W),G=function(e,t,n,r){function i(e,t){var n,r={}
if(!t)return e
t+="."
for(n in e)e.hasOwnProperty(n)&&(r[t+n]=e[n])
return r}function o(e){var t
return s[e]||(t=e?e+".":"",s[e]=function(n,r){var o
return"string"==typeof n?(o={},o[t+n]=r,o):"object"==typeof n?t?i(n,e):n:void 0}),s[e]}var s={}
return function(i,s,a,u){var c,l,h,f
for(c=i.adapt.length,l=0;c>l;l+=1){if(h=i.adapt[l],"string"==typeof h){if(!e[h])throw new Error('Missing adaptor "'+h+'"')
h=i.adapt[l]=e[h]}if(h.filter(a,s,i))return f=i._wrapped[s]=h.wrap(i,a,s,o(s)),f.value=a,a}return u||(i.magic?r.filter(a,s,i)?i._wrapped[s]=r.wrap(i,a,s):n.filter(a,s,i)&&(i._wrapped[s]=n.wrap(i,a,s)):i.modifyArrays&&t.filter(a,s,i)&&(i._wrapped[s]=t.wrap(i,a,s))),a}}(j,W,V,H),$=function(){function e(e,t){var n,r,i
for(n=t.split(".");n.length;)n.pop(),r=n.join("."),i=e._depsMap[r]||(e._depsMap[r]=[]),void 0===i[t]&&(i[t]=0,i[i.length]=t),i[t]+=1,t=r}return function(t){var n,r,i,o,s
i=t.root,o=t.keypath,s=t.priority,n=i._deps[s]||(i._deps[s]={}),r=n[o]||(n[o]=[]),r.push(t),t.registered=!0,o&&e(i,o)}}(),K=function(){function e(e,t){var n,r,i
for(n=t.split(".");n.length;)n.pop(),r=n.join("."),i=e._depsMap[r],i[t]-=1,i[t]||(i.splice(i.indexOf(t),1),i[t]=void 0),t=r}return function(t){var n,r,i,o,s
if(i=t.root,o=t.keypath,s=t.priority,n=i._deps[s][o],r=n.indexOf(t),-1===r||!t.registered)throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks")
n.splice(r,1),t.registered=!1,o&&e(i,o)}}(),Y=function(e,t,n,r,i,o){var s,a
e.push(function(){s=e.get,a=e.set})
var u=function(e,t,n,r,o){this.root=e,this.keypath=t,this.priority=o,this.otherInstance=n,this.otherKeypath=r,i(this),this.value=s(this.root,this.keypath)}
return u.prototype={update:function(){var e
this.updating||this.counterpart&&this.counterpart.updating||(e=s(this.root,this.keypath),n(e)&&e._ractive&&e._ractive.setting||r(e,this.value)||(this.updating=!0,t.addInstance(this.otherInstance),a(this.otherInstance,this.otherKeypath,e),this.value=e,this.updating=!1))},reassign:function(e){o(this),o(this.counterpart),this.keypath=e,this.counterpart.otherKeypath=e,i(this),i(this.counterpart)},teardown:function(){o(this)}},function(e,t,n,r){var i,o,s,a,c,l
i=n+"="+r,s=e.bindings,s[i]||(s[i]=!0,o=e.instance,a=e.parentFragment.priority,c=new u(t,n,o,r,a),s.push(c),o.twoway&&(l=new u(o,r,t,n,1),s.push(l),c.counterpart=l,l.counterpart=c))}}(w,N,I,d,$,K),Q=function(e,t,n){function r(e,r,i,o,s){n(r,o,s,!0),t(r.component,e,i,o)}var i
return e.push(function(){i=e.get}),function(e,t){var n,o,s,a,u
if(n=e._parent,o=e.component.parentFragment,o.indexRefs&&void 0!==(u=o.indexRefs[t]))return e.component.indexRefBindings[t]=t,u
do if(o.context&&(s=o.context+"."+t,a=i(n,s),void 0!==a))return r(n,e,s,t,a),a
while(o=o.parent)
return a=i(n,t),void 0!==a?(r(n,e,t,t,a),a):void 0}}(w,Y,U),J={FAILED_LOOKUP:!0},Z=function(e,t,n,r,i,o){function s(e,t,n){var s,u,c,l,h=e._cache
return void 0===h[t]?((u=e._computations[t])?s=u.value:(c=e._wrapped[t])?s=c.value:t?s=(l=e._evaluators[t])?l.value:a(e,t):(r(e,"",e.data),s=e.data),h[t]=s):s=h[t],s===o&&(s=e._parent&&!e.isolated?i(e,t,n):void 0),n&&n.evaluateWrapped&&(c=e._wrapped[t])&&(s=c.get()),s}function a(e,i){var a,u,c,l,h,f,p,d
return a=i.split("."),u=a.pop(),c=a.join("."),l=s(e,c),(p=e._wrapped[c])&&(l=p.get()),null!==l&&void 0!==l?((h=e._cacheMap[c])?-1===h.indexOf(i)&&h.push(i):e._cacheMap[c]=[i],"object"!=typeof l||u in l?(d=!t.call(l,u),f=d?n(l[u]):l[u],f=r(e,i,f,!1),e._cache[i]=f,f):e._cache[i]=o):void 0}return e.get=s,s}(w,_,R,G,Q,J),X=function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&"function"==typeof console.warn.apply?function(){console.warn.apply(console,arguments)}:function(){}}(),ee=function(){var e=Object.prototype.toString
return function(t){return"object"==typeof t&&"[object Object]"===e.call(t)}}(),te=function(e,t,n,r,i){var o,s,a
return e.push(function(){s=e.interpolate}),a=/^([+-]?[0-9]+\.?(?:[0-9]+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/,o={number:function(e,t){var n
return i(e)&&i(t)?(e=+e,t=+t,n=t-e,n?function(t){return e+t*n}:function(){return e}):null},array:function(e,t){var r,i,o,a
if(!n(e)||!n(t))return null
for(r=[],i=[],a=o=Math.min(e.length,t.length);a--;)i[a]=s(e[a],t[a])
for(a=o;a<e.length;a+=1)r[a]=e[a]
for(a=o;a<t.length;a+=1)r[a]=t[a]
return function(e){for(var t=o;t--;)r[t]=i[t](e)
return r}},object:function(e,n){var i,o,a,u,c
if(!r(e)||!r(n))return null
i=[],u={},a={}
for(c in e)t.call(e,c)&&(t.call(n,c)?(i.push(c),a[c]=s(e[c],n[c])):u[c]=e[c])
for(c in n)t.call(n,c)&&!t.call(e,c)&&(u[c]=n[c])
return o=i.length,function(e){for(var t,n=o;n--;)t=i[n],u[t]=a[t](e)
return u}},cssLength:function(e,t){var n,r,i,o,s,u,c,l
return 0!==e&&"string"!=typeof e||0!==t&&"string"!=typeof t?null:(n=a.exec(e),r=a.exec(t),i=n?n[2]:"",o=r?r[2]:"",i&&o&&i!==o?null:(c=i||o,s=n?+n[1]:0,u=r?+r[1]:0,l=u-s,l?function(e){return s+e*l+c}:function(){return s+c}))}}}(w,_,I,ee,h),ne=function(e,t,n){function r(e){return function(){return e}}var i=function(e,i,o,s){if(e===i)return r(i)
if(s){if(o.interpolators[s])return o.interpolators[s](e,i)||r(i)
t('Missing "'+s+'" interpolator. You may need to download a plugin from [TODO]')}return n.number(e,i)||n.array(e,i)||n.object(e,i)||n.cssLength(e,i)||r(i)}
return e.interpolate=i,i}(w,X,te),re=function(e,t,n,r){var i=function(e){var t
this.startTime=Date.now()
for(t in e)e.hasOwnProperty(t)&&(this[t]=e[t])
this.interpolator=n(this.from,this.to,this.root,this.interpolator),this.running=!0}
return i.prototype={tick:function(){var n,i,o,s,a,u
return u=this.keypath,this.running?(s=Date.now(),n=s-this.startTime,n>=this.duration?(null!==u&&(t.start(this.root),r(this.root,u,this.to),t.end()),this.step&&this.step(1,this.to),this.complete(this.to),a=this.root._animations.indexOf(this),-1===a&&e("Animation was not found"),this.root._animations.splice(a,1),this.running=!1,!1):(i=this.easing?this.easing(n/this.duration):n/this.duration,null!==u&&(o=this.interpolator(i),t.start(this.root),r(this.root,u,o),t.end()),this.step&&this.step(i,o),!0)):!1},stop:function(){var t
this.running=!1,t=this.root._animations.indexOf(this),-1===t&&e("Animation was not found"),this.root._animations.splice(t,1)}},i}(X,N,ne,U),ie=function(e,t,n,r,i,o){function s(t,s,a,c){var l,h,f,p
return s&&(s=n(s)),null!==s&&(p=i(t,s)),r.abort(s,t),e(p,a)?(c.complete&&c.complete(c.to),u):(c.easing&&(l="function"==typeof c.easing?c.easing:t.easing[c.easing],"function"!=typeof l&&(l=null)),h=void 0===c.duration?400:c.duration,f=new o({keypath:s,from:p,to:a,root:t,duration:h,easing:l,interpolator:c.interpolator,step:c.step,complete:c.complete}),r.add(f),t._animations.push(f),f)}var a=function(){},u={stop:a}
return function(e,n,r){var i,o,u,c,l,h,f,p,d,m,g,v,y,b
if(i=new t(function(e){o=e}),"object"==typeof e){r=n||{},h=r.easing,f=r.duration,l=[],p=r.step,d=r.complete,(p||d)&&(g={},r.step=null,r.complete=null,m=function(e){return function(t,n){g[e]=n}})
for(u in e)e.hasOwnProperty(u)&&((p||d)&&(v=m(u),r={easing:h,duration:f},p&&(r.step=v)),r.complete=d?v:a,l.push(s(this,u,e[u],r)))
return(p||d)&&(b={easing:h,duration:f},p&&(b.step=function(e){p(e,g)}),d&&i.then(function(e){d(e,g)}),b.complete=o,y=s(this,null,null,b),l.push(y)),{stop:function(){for(var e;e=l.pop();)e.stop()
y&&y.stop()}}}return r=r||{},r.complete&&i.then(r.complete),r.complete=o,c=s(this,e,n,r),i.stop=function(){c.stop()},i}}(d,m,g,L,Z,re),oe=function(){return this.fragment.detach()},se=function(e){return this.el?this.fragment.find(e):null},ae=function(e,t,n){var r,i,o,s,a,u,c
if(e){for(r=n("div"),i=["matches","matchesSelector"],c=function(e){return function(t,n){return t[e](n)}},a=i.length;a--;){if(o=i[a],r[o])return c(o)
for(u=t.length;u--;)if(s=t[a]+o.substr(0,1).toUpperCase()+o.substring(1),r[s])return c(s)}return function(e,t){var n,r
for(n=(e.parentNode||e.document).querySelectorAll(t),r=n.length;r--;)if(n[r]===e)return!0
return!1}}}(u,v,a),ue=function(e){return function(t,n){var r=this._isComponentQuery?!this.selector||t.name===this.selector:e(t.node,this.selector)
return r?(this.push(t.node||t.instance),n||this._makeDirty(),!0):void 0}}(ae),ce=function(){var e,t,n
e=this._root[this._isComponentQuery?"liveComponentQueries":"liveQueries"],t=this.selector,n=e.indexOf(t),-1!==n&&(e.splice(n,1),e[t]=null)},le=function(){function e(e){var t
return(t=e.parentFragment)?t.owner:e.component&&(t=e.component.parentFragment)?t.owner:void 0}function t(t){var n,r
for(n=[t],r=e(t);r;)n.push(r),r=e(r)
return n}return function(e,n){var r,i,o,s,a,u,c,l,h,f
for(r=t(e.component||e._ractive.proxy),i=t(n.component||n._ractive.proxy),o=r[r.length-1],s=i[i.length-1];o&&o===s;)r.pop(),i.pop(),a=o,o=r[r.length-1],s=i[i.length-1]
if(o=o.component||o,s=s.component||s,h=o.parentFragment,f=s.parentFragment,h===f)return u=h.items.indexOf(o),c=f.items.indexOf(s),u-c||r.length-i.length
if(l=a.fragments)return u=l.indexOf(h),c=l.indexOf(f),u-c||r.length-i.length
throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!")}}(),he=function(e){return function(t,n){var r
return t.compareDocumentPosition?(r=t.compareDocumentPosition(n),2&r?1:-1):e(t,n)}}(le),fe=function(e,t){return function(){this.sort(this._isComponentQuery?t:e),this._dirty=!1}}(he,le),pe=function(e){return function(){this._dirty||(e.addLiveQuery(this),this._dirty=!0)}}(N),de=function(e){var t=this.indexOf(this._isComponentQuery?e.instance:e);-1!==t&&this.splice(t,1)},me=function(e,t,n,r,i,o){return function(s,a,u,c){var l=[]
return e(l,{selector:{value:a},live:{value:u},_isComponentQuery:{value:c},_test:{value:t}}),u?(e(l,{cancel:{value:n},_root:{value:s},_sort:{value:r},_makeDirty:{value:i},_remove:{value:o},_dirty:{value:!1,writable:!0}}),l):l}}(l,ue,ce,fe,pe,de),ge=function(e){return function(t,n){var r,i
return this.el?(n=n||{},r=this._liveQueries,(i=r[t])?n&&n.live?i:i.slice():(i=e(this,t,!!n.live,!1),i.live&&(r.push(t),r[t]=i),this.fragment.findAll(t,i),i)):[]}}(me),ve=function(e){return function(t,n){var r,i
return n=n||{},r=this._liveComponentQueries,(i=r[t])?n&&n.live?i:i.slice():(i=e(this,t,!!n.live,!0),i.live&&(r.push(t),r[t]=i),this.fragment.findAllComponents(t,i),i)}}(me),ye=function(e){return this.fragment.findComponent(e)},be=function(e){var t,n,r,i=this._subs[e]
if(i)for(t=Array.prototype.slice.call(arguments,1),n=0,r=i.length;r>n;n+=1)i[n].apply(this,t)},we=function(e,t,n,r){var i,o={}
e.push(function(){i=e.get})
var s=function(e,t){this.root=e,this.ref=t,this.parentFragment=o,e._unresolvedImplicitDependencies[t]=!0,e._unresolvedImplicitDependencies.push(this),n.addUnresolved(this)}
return s.prototype={resolve:function(){var e=this.root
r(e,this.ref),e._unresolvedImplicitDependencies[this.ref]=!1,t(e._unresolvedImplicitDependencies,this)},teardown:function(){n.removeUnresolved(this)}},s}(w,x,N,C),xe=function(e,t,n){var r={isTopLevel:!0}
return function(i){var o
return i=e(i),o=t(this,i,r),this._captured&&this._captured[i]!==!0&&(this._captured.push(i),this._captured[i]=!0,void 0===o&&this._unresolvedImplicitDependencies[i]!==!0&&new n(this,i)),o}}(g,Z,we),ke=function(e){var t
return"undefined"!=typeof window&&document&&e?e.nodeType?e:"string"==typeof e&&(t=document.getElementById(e),!t&&document.querySelector&&(t=document.querySelector(e)),t&&t.nodeType)?t:e[0]&&e[0].nodeType?e[0]:null:null},Ee=function(e){return function(t,n){if(t=e(t),n=e(n)||null,!t)throw new Error("You must specify a valid target to insert into")
t.insertBefore(this.detach(),n),this.fragment.pNode=this.el=t}}(ke),_e=function(e,t){var n,r,i,o
return n={},r=0,i=e.map(function(e,i){var s,a,u
a=r,u=t.length
do{if(s=t.indexOf(e,a),-1===s)return o=!0,-1
a=s+1}while(n[s]&&u>a)
return s===r&&(r+=1),s!==i&&(o=!0),n[s]=!0,s}),i.unchanged=!o,i},Se=function(e,t){return function(n,r,i,o){var s
n._changes.push(r),s=function(t){t.type===e.REFERENCE?t.update():t.keypath===r&&t.type===e.SECTION&&!t.inverted&&t.docFrag?t.merge(i):t.update()},n._deps.forEach(function(e){var t=e[r]
t&&t.forEach(s)}),o||t(n,r+".length",!0)}}(D,C),Ae=function(e,t,n,r,i,o,s){function a(e){return JSON.stringify(e)}function u(e){if(e===!0)return a
if("string"==typeof e)return c[e]||(c[e]=function(t){return t[e]}),c[e]
if("function"==typeof e)return e
throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)")}var c={}
return function(a,c,l){var h,f,p,d,m,g,v,y
if(h=this.get(a),!n(h)||!n(c))return this.set(a,c,l&&l.complete)
if(m=h.length===c.length,l&&l.compare){d=u(l.compare)
try{f=h.map(d),p=c.map(d)}catch(b){if(this.debug)throw b
t("Merge operation: comparison failed. Falling back to identity checking"),f=h,p=c}}else f=h,p=c
return g=o(f,p),v=new r(function(e){y=e}),e.start(this,y),i(this,a,c,!0),s(this,a,g,m),e.end(),l&&l.complete&&v.then(l.complete),v}}(N,X,I,m,U,_e,Se),Te=function(e,t,n){var r=function(e,t,n,r){var i=this
this.root=e,this.keypath=t,this.callback=n,this.defer=r.defer,this.debug=r.debug,this.proxy={update:function(){i.reallyUpdate()}},this.priority=0,this.context=r&&r.context?r.context:e}
return r.prototype={init:function(e){e!==!1?this.update():this.value=n(this.root,this.keypath)},update:function(){return this.defer&&this.ready?void e.addObserver(this.proxy):void this.reallyUpdate()},reallyUpdate:function(){var e,r
if(e=this.value,r=n(this.root,this.keypath),this.value=r,!this.updating){if(this.updating=!0,!t(r,e)||!this.ready)try{this.callback.call(this.context,r,e,this.keypath)}catch(i){if(this.debug||this.root.debug)throw i}this.updating=!1}}},r}(N,d,Z),Ce=function(e){return function(t,n){var r,i,o,s,a,u,c
for(r=n.split("."),s=[],u=function(n){var r,i
r=t._wrapped[n]?t._wrapped[n].get():t.get(n)
for(i in r)!r.hasOwnProperty(i)||"_ractive"===i&&e(r)||a.push(n+"."+i)},c=function(e){return e+"."+i};i=r.shift();)"*"===i?(a=[],s.forEach(u),s=a):s[0]?s=s.map(c):s[0]=i
return o={},s.forEach(function(e){o[e]=t.get(e)}),o}}(I),Oe=function(e,t,n,r){var i,o=/\*/
return i=function(e,t,n,r){this.root=e,this.callback=n,this.defer=r.defer,this.debug=r.debug,this.keypath=t,this.regex=new RegExp("^"+t.replace(/\./g,"\\.").replace(/\*/g,"[^\\.]+")+"$"),this.values={},this.defer&&(this.proxies=[]),this.priority="pattern",this.context=r&&r.context?r.context:e},i.prototype={init:function(e){var t,n
if(t=r(this.root,this.keypath),e!==!1)for(n in t)t.hasOwnProperty(n)&&this.update(n)
else this.values=t},update:function(t){var n
{if(!o.test(t))return this.defer&&this.ready?void e.addObserver(this.getProxy(t)):void this.reallyUpdate(t)
n=r(this.root,t)
for(t in n)n.hasOwnProperty(t)&&this.update(t)}},reallyUpdate:function(e){var r=n(this.root,e)
if(this.updating)return void(this.values[e]=r)
if(this.updating=!0,!t(r,this.values[e])||!this.ready){try{this.callback.call(this.context,r,this.values[e],e)}catch(i){if(this.debug||this.root.debug)throw i}this.values[e]=r}this.updating=!1},getProxy:function(e){var t=this
return this.proxies[e]||(this.proxies[e]={update:function(){t.reallyUpdate(e)}}),this.proxies[e]}},i}(N,d,Z,Ce),Ne=function(e,t,n,r,i){var o=/\*/,s={}
return function(a,u,c,l){var h,f
return u=e(u),l=l||s,o.test(u)?(h=new i(a,u,c,l),a._patternObservers.push(h),f=!0):h=new r(a,u,c,l),t(h),h.init(l.init),h.ready=!0,{cancel:function(){var e
f&&(e=a._patternObservers.indexOf(h),-1!==e&&a._patternObservers.splice(e,1)),n(h)}}}}(g,$,K,Te,Oe),Le=function(e,t){return function(n,r,i){var o,s,a,u
if(e(n)){i=r,s=n,o=[]
for(n in s)s.hasOwnProperty(n)&&(r=s[n],o.push(this.observe(n,r,i)))
return{cancel:function(){for(;o.length;)o.pop().cancel()}}}if("function"==typeof n)return i=r,r=n,n="",t(this,n,r,i)
if(a=n.split(" "),1===a.length)return t(this,n,r,i)
for(o=[],u=a.length;u--;)n=a[u],n&&o.push(t(this,n,r,i))
return{cancel:function(){for(;o.length;)o.pop().cancel()}}}}(ee,Ne),Ie=function(e,t){var n,r
if(!t)if(e)this._subs[e]=[]
else for(e in this._subs)delete this._subs[e]
n=this._subs[e],n&&(r=n.indexOf(t),-1!==r&&n.splice(r,1))},Re=function(e,t){var n,r,i=this
if("object"==typeof e){n=[]
for(r in e)e.hasOwnProperty(r)&&n.push(this.on(r,e[r]))
return{cancel:function(){for(var e;e=n.pop();)e.cancel()}}}return this._subs[e]?this._subs[e].push(t):this._subs[e]=[t],{cancel:function(){i.off(e,t)}}},je=function(){var e
try{Object.create(null),e=Object.create}catch(t){e=function(){var e=function(){}
return function(t,n){var r
return null===t?{}:(e.prototype=t,r=new e,n&&Object.defineProperties(r,n),r)}}()}return e}(),Pe=function(e,t){return function(n,r){var i,o,s,a,u
if(n.owner=r.owner,s=n.parent=n.owner.parentFragment,n.root=r.root,n.pNode=r.pNode,n.pElement=r.pElement,n.context=r.context,n.owner.type===e.SECTION&&(n.index=r.index),s&&(a=s.indexRefs)){n.indexRefs=t(null)
for(u in a)n.indexRefs[u]=a[u]}for(n.priority=s?s.priority+1:1,r.indexRef&&(n.indexRefs||(n.indexRefs={}),n.indexRefs[r.indexRef]=r.index),n.items=[],i=r.descriptor?r.descriptor.length:0,o=0;i>o;o+=1)n.items[n.items.length]=n.createItem({parentFragment:n,pElement:r.pElement,descriptor:r.descriptor[o],index:o})}}(D,je),Me=function(e,t){return e.substr(0,t.length+1)===t+"."},De=function(e){return function(t,n){return t===n||e(t,n)}}(Me),Fe=function(e){return function(t,n,r){return t===n?r:e(t,n)?t.replace(n+".",r+"."):void 0}}(Me),Be=function(e,t){return function(n,r,i,o){n[r]&&!e(n[r],o)&&(n[r]=t(n[r],i,o))}}(De,Fe),Ue=function(e){return function(t,n,r,i){void 0===this.html&&(e(this,"context",r,i),this.indexRefs&&void 0!==this.indexRefs[t]&&this.indexRefs[t]!==n&&(this.indexRefs[t]=n),this.items.forEach(function(e){e.reassign(t,n,r,i)}))}}(Be),qe=function(e,t){return{init:e,reassign:t}}(Pe,Ue),ze=function(e,t){function n(e){return o[e]||(o[e]=t(e))}var r,i,o={}
try{t("table").innerHTML="foo"}catch(s){r=!0,i={TABLE:['<table class="x">',"</table>"],THEAD:['<table><thead class="x">',"</thead></table>"],TBODY:['<table><tbody class="x">',"</tbody></table>"],TR:['<table><tr class="x">',"</tr></table>"],SELECT:['<select class="x">',"</select>"]}}return function(t,o,s,a){var u,c,l=[]
if(t)for(r&&(c=i[o])?(u=n("DIV"),u.innerHTML=c[0]+t+c[1],u=u.querySelector(".x")):s===e.svg?(u=n("DIV"),u.innerHTML='<svg class="x">'+t+"</svg>",u=u.querySelector(".x")):(u=n(o),u.innerHTML=t);u.firstChild;)l.push(u.firstChild),a.appendChild(u.firstChild)
return l}}(s,a),We=function(){var e,t=this.node
return t&&(e=t.parentNode)?(e.removeChild(t),t):void 0},Ve=function(e,t){var n,r,i
return r=/</g,i=/>/g,n=function(t,n){this.type=e.TEXT,this.descriptor=t.descriptor,n&&(this.node=document.createTextNode(t.descriptor),n.appendChild(this.node))},n.prototype={detach:t,reassign:function(){},teardown:function(e){e&&this.detach()},firstNode:function(){return this.node},toString:function(){return(""+this.descriptor).replace(r,"&lt;").replace(i,"&gt;")}},n}(D,We),He=function(e,t){return function(n){n.keypath?t(n):e.removeUnresolved(n)}}(N,K),Ge=function(e){var t=function(t,n,r,i){this.root=t,this.ref=n,this.parentFragment=r,this.resolve=i,e.addUnresolved(this)}
return t.prototype={teardown:function(){e.removeUnresolved(this)}},t}(N),$e=function(e,t,n,r,i){function o(e,t,r){var i,o,s
if(!a.test(e.toString()))return n(e,"_nowrap",{value:!0}),e
if(!e["_"+t._guid]){n(e,"_"+t._guid,{value:function(){var n,r,i,s
if(n=t._captured,n||(t._captured=[]),r=e.apply(t,arguments),t._captured.length)for(i=o.length;i--;)s=o[i],s.updateSoftDependencies(t._captured)
return t._captured=n,r},writable:!0})
for(i in e)e.hasOwnProperty(i)&&(e["_"+t._guid][i]=e[i])
e["_"+t._guid+"_evaluators"]=[]}return o=e["_"+t._guid+"_evaluators"],s=o.indexOf(r),-1===s&&o.push(r),e["_"+t._guid]}var s,a
return a=/this/,s=function(t,n,i,s,a){var u
this.evaluator=i,this.keypath=n,this.root=t,this.argNum=s,this.type=e.REFERENCE,this.priority=a,u=t.get(n),"function"==typeof u&&(u=o(u,t,i)),this.value=i.values[s]=u,r(this)},s.prototype={update:function(){var e=this.root.get(this.keypath)
"function"!=typeof e||e._nowrap||(e=o(e,this.root,this.evaluator)),t(e,this.value)||(this.evaluator.values[this.argNum]=e,this.evaluator.bubble(),this.value=e)},teardown:function(){i(this)}},s}(D,d,c,$,K),Ke=function(e,t,n){var r=function(e,n,r){this.root=e,this.keypath=n,this.priority=r.priority,this.evaluator=r,t(this)}
return r.prototype={update:function(){var t=this.root.get(this.keypath)
e(t,this.value)||(this.evaluator.bubble(),this.value=t)},teardown:function(){n(this)}},r}(d,$,K),Ye=function(e,t,n,r,i,o,s,a){function u(e,t){var n,r
if(e=e.replace(/\$\{([0-9]+)\}/g,"_$1"),l[e])return l[e]
for(r=[];t--;)r[t]="_"+t
return n=new Function(r.join(","),"return("+e+")"),l[e]=n,n}var c,l={}
return c=function(e,t,n,r,i,o){var a=this
a.root=e,a.uniqueString=n,a.keypath=t,a.priority=o,a.fn=u(r,i.length),a.values=[],a.refs=[],i.forEach(function(t,n){t&&(t.indexRef?a.values[n]=t.value:a.refs.push(new s(e,t.keypath,a,n,o)))}),a.selfUpdating=a.refs.length<=1},c.prototype={bubble:function(){this.selfUpdating?this.update():this.deferred||(e.addEvaluator(this),this.deferred=!0)},update:function(){var e
if(this.evaluating)return this
this.evaluating=!0
try{e=this.fn.apply(null,this.values)}catch(s){this.root.debug&&t('Error evaluating "'+this.uniqueString+'": '+s.message||s),e=void 0}return n(e,this.value)||(this.value=e,r(this.root,this.keypath),o(this.root,this.keypath,e,!0),i(this.root,this.keypath)),this.evaluating=!1,this},teardown:function(){for(;this.refs.length;)this.refs.pop().teardown()
r(this.root,this.keypath),this.root._evaluators[this.keypath]=null},refresh:function(){this.selfUpdating||(this.deferred=!0)
for(var e=this.refs.length;e--;)this.refs[e].update()
this.deferred&&(this.update(),this.deferred=!1)},updateSoftDependencies:function(e){var t,n,r
for(this.softRefs||(this.softRefs=[]),t=this.softRefs.length;t--;)r=this.softRefs[t],e[r.keypath]||(this.softRefs.splice(t,1),this.softRefs[r.keypath]=!1,r.teardown())
for(t=e.length;t--;)n=e[t],this.softRefs[n]||(r=new a(this.root,n,this),this.softRefs.push(r),this.softRefs[n]=!0)
this.selfUpdating=this.refs.length+this.softRefs.length<=1}},c}(N,X,d,F,C,G,$e,Ke),Qe=function(e,t,n,r,i){function o(e,t){return e.replace(/\$\{([0-9]+)\}/g,function(e,n){return t[n]?t[n].value||t[n].keypath:"undefined"})}function s(e){return"${"+e.replace(/[\.\[\]]/g,"-")+"}"}var a=function(r,i,o,s){var a,u,c,l=this
return a=r.root,this.root=a,this.callback=s,this.owner=r,this.str=o.s,this.args=c=[],this.unresolved=[],this.pending=0,u=i.indexRefs,o.r&&o.r.length?(o.r.forEach(function(r,o){var s,h,f
return u&&void 0!==(s=u[r])?void(c[o]={indexRef:r,value:s}):(h=t(a,r,i))?void(c[o]={keypath:h}):(c[o]=void 0,l.pending+=1,f=new n(a,r,i,function(t){l.resolve(o,t),e(l.unresolved,f)}),void l.unresolved.push(f))}),this.ready=!0,void this.bubble()):(this.resolved=this.ready=!0,void this.bubble())}
return a.prototype={bubble:function(){this.ready&&(this.uniqueString=o(this.str,this.args),this.keypath=s(this.uniqueString),this.createEvaluator(),this.callback(this.keypath))},teardown:function(){for(var e;e=this.unresolved.pop();)e.teardown()},resolve:function(e,t){this.args[e]={keypath:t},this.bubble(),this.resolved=!--this.pending},createEvaluator:function(){var e
this.root._evaluators[this.keypath]?this.root._evaluators[this.keypath].refresh():(e=new r(this.root,this.keypath,this.uniqueString,this.str,this.args,this.owner.priority),this.root._evaluators[this.keypath]=e,e.update())},reassign:function(e,t,n,r){var o
this.args.forEach(function(s){var a
s.keypath&&(a=i(s.keypath,n,r))?(s.keypath=a,o=!0):s.indexRef===e&&(s.value=t,o=!0)}),o&&this.bubble()}},a}(x,A,Ge,Ye,Fe),Je=function(e,t,n,r,i,o,s){var a=function(i,o,a){var c,l,h,f,p,d=this
return c=i.root,l=i.parentFragment,this.ref=o.r,this.root=i.root,this.mustache=i,this.callback=a,this.pending=0,this.unresolved=[],p=this.members=[],this.indexRefMembers=[],this.keypathObservers=[],this.expressionResolvers=[],o.m.forEach(function(o,a){var m,g,v,y,b,w
return"string"==typeof o?void(d.members[a]=o):o.t===e.REFERENCE?(m=o.n,g=l.indexRefs,g&&void 0!==(v=g[m])?(p[a]=v,void d.indexRefMembers.push({ref:m,index:a})):(f=!0,y=function(e){var t=new u(c,e,i.priority,d,a)
d.keypathObservers.push(t)},(h=n(c,m,l))?void y(h):(p[a]=void 0,d.pending+=1,b=new r(c,m,l,function(e){d.resolve(a,e),t(d.unresolved,b)}),d.unresolved.push(b),null))):(f=!0,d.pending+=1,w=new s(d,l,o,function(e){d.resolve(a,e),t(d.unresolved,w)}),void d.unresolved.push(w))}),f?(this.ready=!0,void this.bubble()):(h=this.getKeypath(),void a(h))}
a.prototype={getKeypath:function(){return this.ref+"."+this.members.join(".")},bubble:function(){this.ready&&!this.pending&&this.callback(this.getKeypath())},resolve:function(e,t){var n=new u(this.root,t,this.mustache.priority,this,e)
n.update(),this.keypathObservers.push(n),this.resolved=!--this.pending,this.bubble()},teardown:function(){for(var e;e=this.unresolved.pop();)e.teardown()},reassign:function(e,t){var n,r,i
for(r=this.indexRefMembers.length;r--;)i=this.indexRefMembers[r],i.ref===e&&(n=!0,this.members[i.index]=t)
n&&this.bubble()}}
var u=function(e,t,n,r,o){this.root=e,this.keypath=t,this.priority=n,this.resolver=r,this.index=o,i(this),this.update()}
return u.prototype={update:function(){var e=this.resolver
e.members[this.index]=this.root.get(this.keypath),e.bubble()},teardown:function(){o(this)}},a}(D,x,A,Ge,$,K,Qe),Ze=function(e,t,n,r){return function(i,o){var s,a,u,c,l,h,f
l=o.parentFragment,h=o.descriptor,i.root=l.root,i.parentFragment=l,i.descriptor=o.descriptor,i.index=o.index||0,i.priority=l.priority,i.type=o.descriptor.t,f=function(e){i.resolve(e)},(s=h.r)&&(u=l.indexRefs,u&&void 0!==(c=u[s])?(i.indexRef=s,i.value=c,i.render(i.value)):(a=t(i.root,s,i.parentFragment),void 0!==a?f(a):(i.ref=s,e.addUnresolved(i)))),o.descriptor.x&&(i.resolver=new r(i,l,o.descriptor.x,f)),o.descriptor.kx&&(i.resolver=new n(i,o.descriptor.kx,f)),i.descriptor.n&&!i.hasOwnProperty("value")&&i.render(void 0)}}(N,A,Je,Qe),Xe=function(e,t){var n={evaluateWrapped:!0}
return function(){var r=t(this.root,this.keypath,n)
e(r,this.value)||(this.render(r),this.value=r)}}(d,Z),et=function(e,t,n){return function(r){var i
if(r!==this.keypath){if(this.registered&&(n(this),this.type===e.SECTION))for(i=this.fragments.length;i--;)this.fragments[i].reassign(null,null,this.keypath,r)
this.keypath=r,t(this),this.update()}}}(D,$,K),tt=function(e){return function(t,n,r,i){var o,s
if(this.resolver?this.resolver.reassign(t,n,r,i):this.keypath?(o=e(this.keypath,r,i),o&&this.resolve(o)):void 0!==t&&this.indexRef===t&&(this.value=n,this.render(n)),this.fragments)for(s=this.fragments.length;s--;)this.fragments[s].reassign(t,n,r,i)}}(Fe),nt=function(e,t,n,r){return{init:e,update:t,resolve:n,reassign:r}}(Ze,Xe,et,tt),rt=function(e,t,n,r){var i,o,s
return o=/</g,s=/>/g,i=function(t,r){this.type=e.INTERPOLATOR,r&&(this.node=document.createTextNode(""),r.appendChild(this.node)),n.init(this,t)},i.prototype={update:n.update,resolve:n.resolve,reassign:n.reassign,detach:r,teardown:function(e){e&&this.detach(),t(this)},render:function(e){this.node&&(this.node.data=void 0==e?"":e)},firstNode:function(){return this.node},toString:function(){var e=void 0!=this.value?""+this.value:""
return e.replace(o,"&lt;").replace(s,"&gt;")}},i}(D,He,nt,We),it=function(){var e=[]
return function(t){var n,r,i,o,s,a,u,c,l=this
for(n=this.parentFragment,s=[],t.forEach(function(t,n){var i,o,a,u
return t===n?void(s[t]=l.fragments[n]):(void 0===r&&(r=n),-1===t?void e.push(l.fragments[n]):(i=l.fragments[n],o=t-n,a=l.keypath+"."+n,u=l.keypath+"."+t,i.reassign(l.descriptor.i,n,t,o,a,u),void(s[t]=i)))});u=e.pop();)u.teardown(!0)
if(void 0===r&&(r=this.length),this.length=o=this.root.get(this.keypath).length,o!==r){for(a={descriptor:this.descriptor.f,root:this.root,pNode:n.pNode,owner:this},this.descriptor.i&&(a.indexRef=this.descriptor.i),i=r;o>i;i+=1)(u=s[i])?this.docFrag.appendChild(u.detach(!1)):(a.context=this.keypath+"."+i,a.index=i,u=this.createFragment(a)),this.fragments[i]=u
c=n.findNextNode(this),n.pNode.insertBefore(this.docFrag,c)}}}(),ot=function(e,t){function n(e,t,n){var r,i,o
if(i=t.length,i<e.length)for(o=e.fragments.splice(i,e.length-i);o.length;)o.pop().teardown(!0)
else if(i>e.length)for(r=e.length;i>r;r+=1)n.context=e.keypath+"."+r,n.index=r,e.descriptor.i&&(n.indexRef=e.descriptor.i),e.fragments[r]=e.createFragment(n)
e.length=i}function r(e,t,n){var r,i,o,s
for(o=e.hasKey||(e.hasKey={}),i=e.fragments.length;i--;)s=e.fragments[i],s.index in t||(e.fragments[i].teardown(!0),e.fragments.splice(i,1),o[s.index]=!1)
for(r in t)o[r]||(n.context=e.keypath+"."+r,n.index=r,e.descriptor.i&&(n.indexRef=e.descriptor.i),e.fragments.push(e.createFragment(n)),o[r]=!0)
e.length=e.fragments.length}function i(e,t){e.length||(t.context=e.keypath,t.index=0,e.fragments[0]=e.createFragment(t),e.length=1)}function o(t,n,r,i){var o,s,a,u
if(s=e(n)&&0===n.length,o=r?s||!n:n&&!s){if(t.length||(i.index=0,t.fragments[0]=t.createFragment(i),t.length=1),t.length>1)for(a=t.fragments.splice(1);u=a.pop();)u.teardown(!0)}else t.length&&(t.teardownFragments(!0),t.length=0)}return function(s,a){var u={descriptor:s.descriptor.f,root:s.root,pNode:s.parentFragment.pNode,pElement:s.parentFragment.pElement,owner:s}
return s.descriptor.n?void o(s,a,!0,u):void(e(a)?n(s,a,u):t(a)||"function"==typeof a?s.descriptor.i?r(s,a,u):i(s,u):o(s,a,!1,u))}}(I,ee),st=function(e,t){return function(n){var r,i;(i=this.root._wrapped[this.keypath])&&(n=i.get()),this.rendering||(this.rendering=!0,t(this,n),this.rendering=!1,(!this.docFrag||this.docFrag.childNodes.length)&&!this.initialising&&e&&(r=this.parentFragment.findNextNode(this),r&&r.parentNode===this.parentFragment.pNode?this.parentFragment.pNode.insertBefore(this.docFrag,r):this.parentFragment.pNode.appendChild(this.docFrag)))}}(u,ot),at=function(e,t,n,r){var i,o,s,a,u
for(s=e.descriptor.i,i=t;n>i;i+=1)o=e.fragments[i],a=e.keypath+"."+(i-r),u=e.keypath+"."+i,o.index=i,o.reassign(s,i,a,u)},ut=function(e){function t(e){e.teardown(!0)}function n(e,t,n){var r,i,o
for(e.rendering=!0,r={descriptor:e.descriptor.f,root:e.root,pNode:e.parentFragment.pNode,owner:e,indexRef:e.descriptor.i},i=t;n>i;i+=1)r.context=e.keypath+"."+i,r.index=i,e.fragments[i]=e.createFragment(r)
o=e.fragments[n]?e.fragments[n].firstNode():e.parentFragment.findNextNode(e),e.parentFragment.pNode.insertBefore(e.docFrag,o),e.rendering=!1}return function(r){var i,o,s,a,u,c=this
if(i=r.balance){if(o=r.start,c.length+=i,0>i)return c.fragments.splice(o,-i).forEach(t),void e(c,o,c.length,i)
s=o+r.removed,a=o+r.added,u=[s,0],u.length+=i,c.fragments.splice.apply(c.fragments,u),e(c,a,c.length,i),n(c,s,a)}}}(at),ct=function(e,t,n,r,i,o,s){var a,u
return s.push(function(){u=s.DomFragment}),a=function(n,r){this.type=e.SECTION,this.inverted=!!n.descriptor.n,this.fragments=[],this.length=0,r&&(this.docFrag=document.createDocumentFragment()),this.initialising=!0,t.init(this,n),r&&r.appendChild(this.docFrag),this.initialising=!1},a.prototype={update:t.update,resolve:t.resolve,reassign:t.reassign,splice:i,merge:n,detach:function(){var e,t
if(this.docFrag){for(t=this.fragments.length,e=0;t>e;e+=1)this.docFrag.appendChild(this.fragments[e].detach())
return this.docFrag}},teardown:function(e){this.teardownFragments(e),o(this)},firstNode:function(){return this.fragments[0]?this.fragments[0].firstNode():this.parentFragment.findNextNode(this)},findNextNode:function(e){return this.fragments[e.index+1]?this.fragments[e.index+1].firstNode():this.parentFragment.findNextNode(this)},teardownFragments:function(e){for(var t;t=this.fragments.shift();)t.teardown(e)},render:r,createFragment:function(e){var t=new u(e)
return this.docFrag&&this.docFrag.appendChild(t.docFrag),t},toString:function(){var e,t,n
for(e="",t=0,n=this.length,t=0;n>t;t+=1)e+=this.fragments[t].toString()
return e},find:function(e){var t,n,r
for(n=this.fragments.length,t=0;n>t;t+=1)if(r=this.fragments[t].find(e))return r
return null},findAll:function(e,t){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAll(e,t)},findComponent:function(e){var t,n,r
for(n=this.fragments.length,t=0;n>t;t+=1)if(r=this.fragments[t].findComponent(e))return r
return null},findAllComponents:function(e,t){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAllComponents(e,t)}},a}(D,nt,it,st,ut,He,w),lt=function(e,t,n,r,i){var o=function(t,r){this.type=e.TRIPLE,r&&(this.nodes=[],this.docFrag=document.createDocumentFragment()),this.initialising=!0,n.init(this,t),r&&r.appendChild(this.docFrag),this.initialising=!1}
return o.prototype={update:n.update,resolve:n.resolve,reassign:n.reassign,detach:function(){var e,t
if(this.docFrag){for(e=this.nodes.length,t=0;e>t;t+=1)this.docFrag.appendChild(this.nodes[t])
return this.docFrag}},teardown:function(e){e&&(this.detach(),this.docFrag=this.nodes=null),i(this)},firstNode:function(){return this.nodes[0]?this.nodes[0]:this.parentFragment.findNextNode(this)},render:function(e){var t,n
if(this.nodes){for(;this.nodes.length;)t=this.nodes.pop(),t.parentNode.removeChild(t)
if(!e)return void(this.nodes=[])
n=this.parentFragment.pNode,this.nodes=r(e,n.tagName,n.namespaceURI,this.docFrag),this.initialising||n.insertBefore(this.docFrag,this.parentFragment.findNextNode(this)),"SELECT"===n.tagName&&n._ractive&&n._ractive.binding&&n._ractive.binding.update()}},toString:function(){return void 0!=this.value?this.value:""},find:function(e){var n,r,i,o
for(r=this.nodes.length,n=0;r>n;n+=1)if(i=this.nodes[n],1===i.nodeType){if(t(i,e))return i
if(o=i.querySelector(e))return o}return null},findAll:function(e,n){var r,i,o,s,a,u
for(i=this.nodes.length,r=0;i>r;r+=1)if(o=this.nodes[r],1===o.nodeType&&(t(o,e)&&n.push(o),s=o.querySelectorAll(e)))for(a=s.length,u=0;a>u;u+=1)n.push(s[u])}},o}(D,ae,nt,ze,He),ht=function(e){return function(t,n){return t.a&&t.a.xmlns?t.a.xmlns:"svg"===t.e?e.svg:n.namespaceURI||e.html}}(s),ft=function(){var e,t,n,r
return e="altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" "),t="attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" "),n=function(e){for(var t={},n=e.length;n--;)t[e[n].toLowerCase()]=e[n]
return t},r=n(e.concat(t)),function(e){var t=e.toLowerCase()
return r[t]||t}}(),pt=function(e,t){return function(n,r){var i,o
if(i=r.indexOf(":"),-1===i||(o=r.substr(0,i),"xmlns"===o))n.name=n.element.namespace!==e.html?t(r):r,n.lcName=n.name.toLowerCase()
else if(r=r.substring(i+1),n.name=t(r),n.lcName=n.name.toLowerCase(),n.namespace=e[o.toLowerCase()],!n.namespace)throw'Unknown namespace ("'+o+'")'}}(s,ft),dt=function(e){return function(t,n){var r,i=null===n.value?"":n.value;(r=n.pNode)&&(t.namespace?r.setAttributeNS(t.namespace,n.name,i):"style"===n.name&&r.style.setAttribute?r.style.setAttribute("cssText",i):"class"!==n.name||r.namespaceURI&&r.namespaceURI!==e.html?r.setAttribute(n.name,i):r.className=i,"id"===t.name&&(n.root.nodes[n.value]=r),"value"===t.name&&(r._ractive.value=n.value)),t.value=n.value}}(s),mt=function(e){var t={"accept-charset":"acceptCharset",accesskey:"accessKey",bgcolor:"bgColor","class":"className",codebase:"codeBase",colspan:"colSpan",contenteditable:"contentEditable",datetime:"dateTime",dirname:"dirName","for":"htmlFor","http-equiv":"httpEquiv",ismap:"isMap",maxlength:"maxLength",novalidate:"noValidate",pubdate:"pubDate",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",usemap:"useMap"}
return function(n,r){var i
!n.pNode||n.namespace||r.pNode.namespaceURI&&r.pNode.namespaceURI!==e.html||(i=t[n.name]||n.name,void 0!==r.pNode[i]&&(n.propertyName=i),("boolean"==typeof r.pNode[i]||"value"===i)&&(n.useProperty=!0))}}(s),gt=function(e){return function(t){var n,r
return n=t.fragment.items,1===n.length&&(r=n[0],r.type===e.INTERPOLATOR&&(r.keypath||r.ref))?r:void 0}}(D),vt=function(e){return function(t,n){var r
if(!e(t)||!e(n))return!1
if(t.length!==n.length)return!1
for(r=t.length;r--;)if(t[r]!==n[r])return!1
return!0}}(I),yt=function(e,t,n,r,i,o){var s,a,u,c,l,h,f,p,d,m,g,v,y,b,w='For two-way binding to work, attribute value must be a single interpolator (e.g. value="{{foo}}")',x="You cannot set up two-way binding against an expression "
return s=function(){var e,n,r,i=this.pNode
return(e=this.interpolator)?e.keypath&&"${"===e.keypath.substr?(t(x+e.keypath),!1):(e.keypath||e.resolve(e.descriptor.r),this.keypath=e.keypath,(n=l(this))?(i._ractive.binding=this.element.binding=n,this.twoway=!0,r=this.root._twowayBindings[this.keypath]||(this.root._twowayBindings[this.keypath]=[]),r.push(n),!0):!1):(t(w),!1)},a=function(){e.start(this._ractive.root),this._ractive.binding.update(),e.end()},u={evaluateWrapped:!0},c=function(){var e=i(this._ractive.root,this._ractive.binding.keypath,u)
this.value=void 0==e?"":e},l=function(e){var t=e.pNode
if("SELECT"===t.tagName)return t.multiple?new f(e,t):new p(e,t)
if("checkbox"===t.type||"radio"===t.type){if("name"===e.propertyName){if("checkbox"===t.type)return new m(e,t)
if("radio"===t.type)return new d(e,t)}return"checked"===e.propertyName?new g(e,t):null}if("value"!==e.lcName)throw new Error("Attempted to set up an illegal two-way binding. This error is unexpected - if you can, please file an issue at https://github.com/RactiveJS/Ractive, or contact @RactiveJS on Twitter. Thanks!")
return"file"===t.type?new v(e,t):t.getAttribute("contenteditable")?new y(e,t):new b(e,t)},f=function(e,t){var n
h(this,e,t),t.addEventListener("change",a,!1),n=i(this.root,this.keypath),void 0===n&&this.update()},f.prototype={value:function(){var e,t,n,r,i,o
for(e=[],t=this.node.options,r=t.length,n=0;r>n;n+=1)i=t[n],i.selected&&(o=i._ractive?i._ractive.value:i.value,e.push(o))
return e},update:function(){var t,r,i
return t=this.attr,r=t.value,i=this.value(),void 0!==r&&n(i,r)||(e.addBinding(t),t.value=i,o(this.root,this.keypath,i),e.trigger()),this},deferUpdate:function(){this.deferred!==!0&&(e.addAttribute(this),this.deferred=!0)},teardown:function(){this.node.removeEventListener("change",a,!1)}},p=function(e,t){var n
h(this,e,t),t.addEventListener("change",a,!1),n=i(this.root,this.keypath),void 0===n&&this.update()},p.prototype={value:function(){var e,t,n,r,i
for(e=this.node.options,n=e.length,t=0;n>t;t+=1)if(r=e[t],e[t].selected)return i=r._ractive?r._ractive.value:r.value},update:function(){var t=this.value()
return e.addBinding(this.attr),this.attr.value=t,o(this.root,this.keypath,t),e.trigger(),this},deferUpdate:function(){this.deferred!==!0&&(e.addAttribute(this),this.deferred=!0)},teardown:function(){this.node.removeEventListener("change",a,!1)}},d=function(t,n){var r
this.radioName=!0,h(this,t,n),n.name="{{"+t.keypath+"}}",n.addEventListener("change",a,!1),n.attachEvent&&n.addEventListener("click",a,!1),r=i(this.root,this.keypath),void 0!==r?n.checked=r==n._ractive.value:e.addRadio(this)},d.prototype={value:function(){return this.node._ractive?this.node._ractive.value:this.node.value},update:function(){var t=this.node
t.checked&&(e.addBinding(this.attr),o(this.root,this.keypath,this.value()),e.trigger())},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("click",a,!1)}},m=function(t,n){var r,o
this.checkboxName=!0,h(this,t,n),n.name="{{"+this.keypath+"}}",n.addEventListener("change",a,!1),n.attachEvent&&n.addEventListener("click",a,!1),r=i(this.root,this.keypath),void 0!==r?(o=-1!==r.indexOf(n._ractive.value),n.checked=o):e.addCheckbox(this)},m.prototype={changed:function(){return this.node.checked!==!!this.checked},update:function(){this.checked=this.node.checked,e.addBinding(this.attr),o(this.root,this.keypath,r(this.root,this.keypath)),e.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("click",a,!1)}},g=function(e,t){h(this,e,t),t.addEventListener("change",a,!1),t.attachEvent&&t.addEventListener("click",a,!1)},g.prototype={value:function(){return this.node.checked},update:function(){e.addBinding(this.attr),o(this.root,this.keypath,this.value()),e.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("click",a,!1)}},v=function(e,t){h(this,e,t),t.addEventListener("change",a,!1)},v.prototype={value:function(){return this.attr.pNode.files},update:function(){o(this.attr.root,this.attr.keypath,this.value()),e.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1)}},y=function(e,t){h(this,e,t),t.addEventListener("change",a,!1),this.root.lazy||(t.addEventListener("input",a,!1),t.attachEvent&&t.addEventListener("keyup",a,!1))},y.prototype={update:function(){e.addBinding(this.attr),o(this.root,this.keypath,this.node.innerHTML),e.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("input",a,!1),this.node.removeEventListener("keyup",a,!1)}},b=function(e,t){h(this,e,t),t.addEventListener("change",a,!1),this.root.lazy||(t.addEventListener("input",a,!1),t.attachEvent&&t.addEventListener("keyup",a,!1)),this.node.addEventListener("blur",c,!1)},b.prototype={value:function(){var e=this.attr.pNode.value
return+e+""===e&&-1===e.indexOf("e")&&(e=+e),e},update:function(){var t=this.attr,n=this.value()
e.addBinding(t),o(t.root,t.keypath,n),e.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("input",a,!1),this.node.removeEventListener("keyup",a,!1),this.node.removeEventListener("blur",c,!1)}},h=function(e,t,n){e.attr=t,e.node=n,e.root=t.root,e.keypath=t.keypath},s}(N,X,vt,E,Z,U),bt=function(e,t,n){var r,i,o,s,a,u,c,l,h,f,p,d
return r=function(){var e
if(!this.ready)return this
if(e=this.pNode,"SELECT"===e.tagName&&"value"===this.lcName)return this.update=o,this.deferredUpdate=s,this.update()
if(this.isFileInputValue)return this.update=i,this
if(this.twoway&&"name"===this.lcName){if("radio"===e.type)return this.update=c,this.update()
if("checkbox"===e.type)return this.update=l,this.update()}return"style"===this.lcName&&e.style.setAttribute?(this.update=h,this.update()):"class"!==this.lcName||e.namespaceURI&&e.namespaceURI!==t.html?e.getAttribute("contenteditable")&&"value"===this.lcName?(this.update=p,this.update()):(this.update=d,this.update()):(this.update=f,this.update())},i=function(){return this},s=function(){this.deferredUpdate=this.pNode.multiple?u:a,this.deferredUpdate()},o=function(){return e.addSelectValue(this),this},a=function(){var e,t,n,r,i=this.fragment.getValue()
for(this.value=this.pNode._ractive.value=i,e=this.pNode.options,r=e.length;r--;)if(t=e[r],n=t._ractive?t._ractive.value:t.value,n==i)return t.selected=!0,this
return this},u=function(){var e,t,r,i,o=this.fragment.getValue()
for(n(o)||(o=[o]),e=this.pNode.options,t=e.length;t--;)r=e[t],i=r._ractive?r._ractive.value:r.value,r.selected=-1!==o.indexOf(i)
return this.value=o,this},c=function(){var e,t
return e=this.pNode,t=this.fragment.getValue(),e.checked=t==e._ractive.value,this},l=function(){var e,t
return e=this.pNode,t=this.fragment.getValue(),n(t)?(e.checked=-1!==t.indexOf(e._ractive.value),this):(e.checked=t==e._ractive.value,this)},h=function(){var e,t
return e=this.pNode,t=this.fragment.getValue(),void 0===t&&(t=""),t!==this.value&&(e.style.setAttribute("cssText",t),this.value=t),this},f=function(){var e,t
return e=this.pNode,t=this.fragment.getValue(),void 0===t&&(t=""),t!==this.value&&(e.className=t,this.value=t),this},p=function(){var e,t
return e=this.pNode,t=this.fragment.getValue(),void 0===t&&(t=""),t!==this.value&&(this.active||(e.innerHTML=t),this.value=t),this},d=function(){var e,t,n
if(e=this.pNode,t=this.fragment.getValue(),this.isValueAttribute&&(e._ractive.value=t),void 0==t&&(t=""),t!==this.value){if(this.useProperty)return this.active||(e[this.propertyName]=t),"OPTION"===e.tagName&&e.selected&&(n=this.element.select.binding)&&n.update(),this.value=t,this
if(this.namespace)return e.setAttributeNS(this.namespace,this.name,t),this.value=t,this
"id"===this.lcName&&(void 0!==this.value&&(this.root.nodes[this.value]=void 0),this.root.nodes[t]=e),e.setAttribute(this.name,t),this.value=t}return this},r}(N,s,I),wt=function(e){var t
return t=this.str.substr(this.pos,e.length),t===e?(this.pos+=e.length,e):null},xt=function(){var e=/^\s+/
return function(){var t=e.exec(this.remaining())
return t?(this.pos+=t[0].length,t[0]):null}}(),kt=function(e){return function(t){var n=e.exec(t.str.substring(t.pos))
return n?(t.pos+=n[0].length,n[1]||n[0]):null}},Et=function(e){var t,n,r
return t=e(/^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/),n=e(/^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/),r=e(/^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/),function(e){return function(i){var o,s,a,u
for(o=i.pos,s='"',a=!1;!a;)u=t(i)||n(i)||i.getStringMatch(e),u?s+='"'===u?'\\"':"\\'"===u?"'":u:(u=r(i),u?s+="\\u"+("000"+u.charCodeAt(1).toString(16)).slice(-4):a=!0)
return s+='"',JSON.parse(s)}}}(kt),_t=function(e){return e('"')}(Et),St=function(e){return e("'")}(Et),At=function(e,t,n){return function(r){var i,o
return i=r.pos,r.getStringMatch('"')?(o=n(r),r.getStringMatch('"')?{t:e.STRING_LITERAL,v:o}:(r.pos=i,null)):r.getStringMatch("'")?(o=t(r),r.getStringMatch("'")?{t:e.STRING_LITERAL,v:o}:(r.pos=i,null)):null}}(D,_t,St),Tt=function(e,t){var n=t(/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/)
return function(t){var r
return(r=n(t))?{t:e.NUMBER_LITERAL,v:r}:null}}(D,kt),Ct=function(e){return e(/^[a-zA-Z_$][a-zA-Z_$0-9]*/)}(kt),Ot=function(e,t,n){var r=/^[a-zA-Z_$][a-zA-Z_$0-9]*$/
return function(i){var o
return(o=e(i))?r.test(o.v)?o.v:'"'+o.v.replace(/"/g,'\\"')+'"':(o=t(i))?o.v:(o=n(i))?o:void 0}}(At,Tt,Ct),Nt=function(e,t,n,r){function i(e){var t,n,i
return e.allowWhitespace(),(t=r(e))?(i={key:t},e.allowWhitespace(),e.getStringMatch(":")?(e.allowWhitespace(),(n=e.getToken())?(i.value=n.v,i):null):null):null}var o,s,a,u,c,l
return s={"true":!0,"false":!1,undefined:void 0,"null":null},a=new RegExp("^(?:"+Object.keys(s).join("|")+")"),u=/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,c=/\$\{([^\}]+)\}/g,l=/^\$\{([^\}]+)\}/,o=function(e,t){this.str=e,this.values=t,this.pos=0,this.result=this.getToken()},o.prototype={remaining:function(){return this.str.substring(this.pos)},getStringMatch:e,getToken:function(){return this.allowWhitespace(),this.getPlaceholder()||this.getSpecial()||this.getNumber()||this.getString()||this.getObject()||this.getArray()},getPlaceholder:function(){var e
return this.values?(e=l.exec(this.remaining()))&&this.values.hasOwnProperty(e[1])?(this.pos+=e[0].length,{v:this.values[e[1]]}):void 0:null},getSpecial:function(){var e
return(e=a.exec(this.remaining()))?(this.pos+=e[0].length,{v:s[e[0]]}):void 0},getNumber:function(){var e
return(e=u.exec(this.remaining()))?(this.pos+=e[0].length,{v:+e[0]}):void 0},getString:function(){var e,t=n(this)
return t&&(e=this.values)?{v:t.v.replace(c,function(t,n){return e[n]||n})}:t},getObject:function(){var e,t
if(!this.getStringMatch("{"))return null
for(e={};t=i(this);){if(e[t.key]=t.value,this.allowWhitespace(),this.getStringMatch("}"))return{v:e}
if(!this.getStringMatch(","))return null}return null},getArray:function(){var e,t
if(!this.getStringMatch("["))return null
for(e=[];t=this.getToken();){if(e.push(t.v),this.getStringMatch("]"))return{v:e}
if(!this.getStringMatch(","))return null}return null},allowWhitespace:t},function(e,t){var n=new o(e,t)
return n.result?{value:n.result.v,remaining:n.remaining()}:null}}(wt,xt,At,Ot),Lt=function(e,t,n){function r(e){return"string"==typeof e?e:JSON.stringify(e)}var i=function(t){this.type=e.INTERPOLATOR,n.init(this,t)}
return i.prototype={update:n.update,resolve:n.resolve,reassign:n.reassign,render:function(e){this.value=e,this.parentFragment.bubble()},teardown:function(){t(this)},toString:function(){return void 0==this.value?"":r(this.value)}},i}(D,He,nt),It=function(e,t,n,r,i){var o,s
return i.push(function(){s=i.StringFragment}),o=function(n){this.type=e.SECTION,this.fragments=[],this.length=0,t.init(this,n)},o.prototype={update:t.update,resolve:t.resolve,reassign:t.reassign,teardown:function(){this.teardownFragments(),r(this)},teardownFragments:function(){for(;this.fragments.length;)this.fragments.shift().teardown()
this.length=0},bubble:function(){this.value=this.fragments.join(""),this.parentFragment.bubble()},render:function(e){var t;(t=this.root._wrapped[this.keypath])&&(e=t.get()),n(this,e),this.parentFragment.bubble()},createFragment:function(e){return new s(e)},toString:function(){return this.fragments.join("")}},o}(D,nt,ot,He,w),Rt=function(e){var t=function(t){this.type=e.TEXT,this.text=t}
return t.prototype={toString:function(){return this.text},reassign:function(){},teardown:function(){}},t}(D),jt=function(e,t){return function(){var n,r,i,o,s,a,u
if(!this.argsList||this.dirty){if(n={},r=0,o=this.root._guid,u=function(e){return e.map(function(e){var t,i,s
return e.text?e.text:e.fragments?e.fragments.map(function(e){return u(e.items)}).join(""):(t=o+"-"+r++,s=(i=e.root._wrapped[e.keypath])?i.value:e.value,n[t]=s,"${"+t+"}")}).join("")},i=u(this.items),a=t("["+i+"]",n))this.argsList=a.value
else{if(s="Could not parse directive arguments ("+this.toString()+"). If you think this is a bug, please file an issue at http://github.com/RactiveJS/Ractive/issues",this.root.debug)throw new Error(s)
e(s),this.argsList=[i]}this.dirty=!1}return this.argsList}}(X,Nt),Pt=function(e,t,n,r,i,o,s,a){var u=function(e){n.init(this,e)}
return u.prototype={reassign:n.reassign,createItem:function(t){if("string"==typeof t.descriptor)return new o(t.descriptor)
switch(t.descriptor.t){case e.INTERPOLATOR:return new r(t)
case e.TRIPLE:return new r(t)
case e.SECTION:return new i(t)
default:throw"Something went wrong in a rather interesting way"}},bubble:function(){this.dirty=!0,this.owner.bubble()},teardown:function(){var e,t
for(e=this.items.length,t=0;e>t;t+=1)this.items[t].teardown()},getValue:function(){var t
return 1===this.items.length&&this.items[0].type===e.INTERPOLATOR&&(t=this.items[0].value,void 0!==t)?t:this.toString()},isSimple:function(){var t,n,r
if(void 0!==this.simple)return this.simple
for(t=this.items.length;t--;)if(n=this.items[t],n.type!==e.TEXT){if(n.type!==e.INTERPOLATOR)return this.simple=!1
if(r)return!1
r=!0}return this.simple=!0},toString:function(){return this.items.join("")},toJSON:function(){var e,n=this.getValue()
return"string"==typeof n&&(e=t(n),n=e?e.value:n),n},toArgsList:s},a.StringFragment=u,u}(D,Nt,qe,Lt,It,Rt,jt,w),Mt=function(e,t,n,r,i,o,s,a,u){var c=function(e){return this.type=t.ATTRIBUTE,this.element=e.element,n(this,e.name),null===e.value||"string"==typeof e.value?void r(this,e):(this.root=e.root,this.pNode=e.pNode,this.parentFragment=this.element.parentFragment,this.fragment=new u({descriptor:e.value,root:this.root,owner:this}),this.interpolator=o(this),void(this.pNode&&("value"===this.name&&(this.isValueAttribute=!0,"INPUT"===this.pNode.tagName&&"file"===this.pNode.type&&(this.isFileInputValue=!0)),i(this,e),this.selfUpdating=this.fragment.isSimple(),this.ready=!0)))}
return c.prototype={bind:s,update:a,updateBindings:function(){this.keypath=this.interpolator.keypath||this.interpolator.ref,"name"===this.propertyName&&(this.pNode.name="{{"+this.keypath+"}}")},reassign:function(e,t,n,r){this.fragment&&(this.fragment.reassign(e,t,n,r),this.twoway&&this.updateBindings())},teardown:function(){var e
if(this.boundEvents)for(e=this.boundEvents.length;e--;)this.pNode.removeEventListener(this.boundEvents[e],this.updateModel,!1)
this.fragment&&this.fragment.teardown()},bubble:function(){this.selfUpdating?this.update():!this.deferred&&this.ready&&(e.addAttribute(this),this.deferred=!0)},toString:function(){var e,t
if(null===this.value)return this.name
if("value"!==this.name||"select"!==this.element.lcName)return"name"===this.name&&"input"===this.element.lcName&&(t=this.interpolator)?"name={{"+(t.keypath||t.ref)+"}}":this.fragment?(e=this.fragment.toString(),this.name+"="+JSON.stringify(e)):this.name+"="+JSON.stringify(this.value)}},c}(N,D,pt,dt,mt,gt,yt,bt,Pt),Dt=function(e){return function(t,n,r){var i=new e({element:t,name:n,value:r,root:t.root,pNode:t.node})
t.attributes.push(t.attributes[n]=i),"name"!==n&&i.update()}}(Mt),Ft=function(e){return function(t,n){var r
t.attributes=[]
for(r in n)n.hasOwnProperty(r)&&e(t,r,n[r])
return t.attributes}}(Dt),Bt=function(e){for(var t=[],n=e.length;n--;)t[n]=e[n]
return t},Ut=function(e){return function(t,n){return t.matchingStaticNodes[n]||(t.matchingStaticNodes[n]=e(t.node.querySelectorAll(n))),t.matchingStaticNodes[n]}}(Bt),qt=function(e,t,n,r,i){function o(e){var t,n,i,o,s,a,u
i=e.node,t=e.root
do for(n=t._liveQueries,u=n.length;u--;)o=n[u],s=n[o],a=r(e,o),s.push.apply(s,a)
while(t=t._parent)}var s,a,u
return i.push(function(){s=i.DomFragment}),a=function(){var e=this.node,t=this.fragment.toString()
e.styleSheet?e.styleSheet.cssText=t:e.innerHTML=t},u=function(){this.node.type&&"text/javascript"!==this.node.type||e("Script tag was updated. This does not cause the code to be re-evaluated!"),this.node.text=this.fragment.toString()},function(e,r,i,c){return"script"===e.lcName||"style"===e.lcName?(e.fragment=new n({descriptor:i.f,root:e.root,owner:e}),void(c&&("script"===e.lcName?(e.bubble=u,e.node.text=e.fragment.toString()):(e.bubble=a,e.bubble())))):void("string"!=typeof i.f||r&&r.namespaceURI&&r.namespaceURI!==t.html?(e.fragment=new s({descriptor:i.f,root:e.root,pNode:r,owner:e,pElement:e}),c&&r.appendChild(e.fragment.docFrag)):(e.html=i.f,c&&(r.innerHTML=e.html,e.matchingStaticNodes={},o(e))))}}(X,s,Pt,Ut,w),zt=function(e,t){var n=function(n,r,i){var o,s,a,u=this
if(u.root=r,u.node=i.node,o=n.n||n,"string"!=typeof o&&(s=new t({descriptor:o,root:r,owner:i}),o=s.toString(),s.teardown()),n.a?u.params=n.a:n.d&&(u.fragment=new t({descriptor:n.d,root:r,owner:i}),u.params=u.fragment.toArgsList(),u.fragment.bubble=function(){this.dirty=!0,u.params=this.toArgsList(),u.ready&&u.update()}),u.fn=r.decorators[o],!u.fn){if(a='Missing "'+o+'" decorator. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#decorators',r.debug)throw new Error(a)
e(a)}}
return n.prototype={init:function(){var e,t
if(this.params?(t=[this.node].concat(this.params),e=this.fn.apply(this.root,t)):e=this.fn.call(this.root,this.node),!e||!e.teardown)throw new Error("Decorator definition must return an object with a teardown method")
this.actual=e,this.ready=!0},update:function(){this.actual.update?this.actual.update.apply(this.root,this.params):(this.actual.teardown(!0),this.init())},teardown:function(e){this.actual.teardown(),!e&&this.fragment&&this.fragment.teardown()}},n}(X,Pt),Wt=function(e,t){return function(n,r,i){var o=new t(n,r,i)
o.fn&&(i.decorator=o,e.addDecorator(i.decorator))}}(N,zt),Vt=function(e,t){var n,r,i,o,s,a,u,c,l
return n=function(e,t,n,i){var o,s
o=e.node._ractive.events,s=o[t]||(o[t]=new r(e,t,i)),s.add(n)},r=function(t,n){var r
this.element=t,this.root=t.root,this.node=t.node,this.name=n,this.proxies=[],(r=this.root.events[n])?this.custom=r(this.node,l(n)):("on"+n in this.node||e('Missing "'+this.name+'" event. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#events'),this.node.addEventListener(n,c,!1))},r.prototype={add:function(e){this.proxies.push(new i(this.element,this.root,e))},teardown:function(){var e
for(this.custom?this.custom.teardown():this.node.removeEventListener(this.name,c,!1),e=this.proxies.length;e--;)this.proxies[e].teardown()},fire:function(e){for(var t=this.proxies.length;t--;)this.proxies[t].fire(e)}},i=function(e,n,r){var i
return this.root=n,i=r.n||r,"string"==typeof i?this.n=i:this.n=new t({descriptor:r.n,root:this.root,owner:e}),r.a?(this.a=r.a,void(this.fire=s)):r.d?(this.d=new t({descriptor:r.d,root:this.root,owner:e}),void(this.fire=a)):void(this.fire=o)},i.prototype={teardown:function(){this.n.teardown&&this.n.teardown(),this.d&&this.d.teardown()},bubble:function(){}},o=function(e){this.root.fire(this.n.toString(),e)},s=function(e){this.root.fire.apply(this.root,[this.n.toString(),e].concat(this.a))},a=function(e){var t=this.d.toArgsList()
"string"==typeof t&&(t=t.substr(1,t.length-2)),this.root.fire.apply(this.root,[this.n.toString(),e].concat(t))},c=function(e){var t=this._ractive
t.events[e.type].fire({node:this,original:e,index:t.index,keypath:t.keypath,context:t.root.get(t.keypath)})},u={},l=function(e){return u[e]?u[e]:u[e]=function(t){var n=t.node._ractive
t.index=n.index,t.keypath=n.keypath,t.context=n.root.get(n.keypath),n.events[e].fire(t)}},n}(X,Pt),Ht=function(e){return function(t,n){var r,i,o
for(i in n)if(n.hasOwnProperty(i))for(o=i.split("-"),r=o.length;r--;)e(t,o[r],n[i])}}(Vt),Gt=function(e){var t,n,r,i,o
t=e.root
do for(n=t._liveQueries,r=n.length;r--;)i=n[r],o=n[i],o._test(e)&&(e.liveQueries||(e.liveQueries=[])).push(o)
while(t=t._parent)},$t=function(){if(this._inited)throw new Error("Cannot initialize a transition more than once")
this._inited=!0,this._fn.apply(this.root,[this].concat(this.params))},Kt=function(e,t,n){var r,i
if(e)return r={},i=n("div").style,function(e){var n,o,s
if(!r[e])if(void 0!==i[e])r[e]=e
else for(s=e.charAt(0).toUpperCase()+e.substring(1),n=t.length;n--;)if(o=t[n],void 0!==i[o+s]){r[e]=o+s
break}return r[e]}}(u,v,a),Yt=function(e,t,n,r){var i
if(t)return i=window.getComputedStyle||e.getComputedStyle,function(e){var t,i,o,s,a
if(t=window.getComputedStyle(this.node),"string"==typeof e)return a=t[r(e)],"0px"===a&&(a=0),a
if(!n(e))throw new Error("Transition#getStyle must be passed a string, or an array of strings representing CSS properties")
for(i={},o=e.length;o--;)s=e[o],a=t[r(s)],"0px"===a&&(a=0),i[s]=a
return i}}(r,u,I,Kt),Qt=function(e){return function(t,n){var r
if("string"==typeof t)this.node.style[e(t)]=n
else for(r in t)t.hasOwnProperty(r)&&(this.node.style[e(r)]=t[r])
return this}}(Kt),Jt=function(e){return e.replace(/-([a-zA-Z])/g,function(e,t){return t.toUpperCase()})},Zt=function(e,t,n){function r(e){return e}var i=function(i){var o
this.duration=i.duration,this.step=i.step,this.complete=i.complete,"string"==typeof i.easing?(o=i.root.easing[i.easing],o||(e('Missing easing function ("'+i.easing+'"). You may need to download a plugin from [TODO]'),o=r)):o="function"==typeof i.easing?i.easing:r,this.easing=o,this.start=t(),this.end=this.start+this.duration,this.running=!0,n.add(this)}
return i.prototype={tick:function(e){var t,n
return this.running?e>this.end?(this.step&&this.step(1),this.complete&&this.complete(1),!1):(t=e-this.start,n=this.easing(t/this.duration),this.step&&this.step(n),!0):!1},stop:function(){this.abort&&this.abort(),this.running=!1}},i}(X,b,L),Xt=function(e){var t=new RegExp("^-(?:"+e.join("|")+")-")
return function(e){return e.replace(t,"")}}(v),en=function(e){var t=new RegExp("^(?:"+e.join("|")+")([A-Z])")
return function(e){var n
return e?(t.test(e)&&(e="-"+e),n=e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})):""}}(v),tn=function(e,t,n,r,i,o,s,a,u){var c,l,h,f,p,d,m,g={},v={}
if(e)return c=n("div").style,function(){void 0!==c.transition?(l="transition",h="transitionend",f=!0):void 0!==c.webkitTransition?(l="webkitTransition",h="webkitTransitionEnd",f=!0):f=!1}(),l&&(p=l+"Duration",d=l+"Property",m=l+"TimingFunction"),function(e,n,c,l,f,y){setTimeout(function(){var b,w,x,k
k=function(){w&&x&&y()},b=e.node.namespaceURI+e.node.tagName,e.node.style[d]=l.map(s).map(u).join(","),e.node.style[m]=u(c.easing||"linear"),e.node.style[p]=c.duration/1e3+"s",f=function(t){var n
n=l.indexOf(r(a(t.propertyName))),-1!==n&&l.splice(n,1),l.length||(e.root.fire(e.name+":end"),e.node.removeEventListener(h,f,!1),x=!0,k())},e.node.addEventListener(h,f,!1),setTimeout(function(){for(var a,u,p,d,m=l.length,y=[];m--;)d=l[m],a=b+d,g[a]?e.node.style[s(d)]=n[d]:u=e.getStyle(d),void 0===g[a]&&(e.node.style[s(d)]=n[d],g[a]=e.getStyle(d)!=n[d],v[a]=!g[a]),v[a]&&(p=l.indexOf(d),-1===p?t("Something very strange happened with transitions. If you see this message, please let @RactiveJS know. Thanks!"):l.splice(p,1),e.node.style[s(d)]=u,y.push({name:s(d),interpolator:i(u,n[d])}))
y.length?new o({root:e.root,duration:c.duration,easing:r(c.easing),step:function(t){var n,r
for(r=y.length;r--;)n=y[r],e.node.style[n.name]=n.interpolator(t)},complete:function(){w=!0,k()}}):w=!0,l.length||(e.node.removeEventListener(h,f,!1),x=!0,k())},0)},c.delay||0)}}(u,X,a,Jt,ne,Zt,Kt,Xt,en),nn=function(e,t,n,r,i,o){var s
if(t)return s=window.getComputedStyle||e.getComputedStyle,function(e,t,s,a){var u,c=this
"string"==typeof e?(u={},u[e]=t):(u=e,a=s,s=t),s||(n('The "'+c.name+'" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340'),s=c,a=c.complete)
var l=new r(function(e){var t,n,r,a,l,h,f,p
if(!s.duration)return c.setStyle(u),void e()
for(t=Object.keys(u),n=[],r=window.getComputedStyle(c.node),l={},f=t.length;f--;)p=t[f],a=r[i(p)],"0px"===a&&(a=0),a!=u[p]&&(n.push(p),c.node.style[i(p)]=a)
return n.length?void o(c,u,s,n,h,e):void e()})
return a&&(n("t.animateStyle returns a Promise as of 0.4.0. Transition authors should do t.animateStyle(...).then(callback)"),l.then(a)),l}}(r,u,X,m,Kt,tn),rn=function(e,t){var n
for(n in t)!t.hasOwnProperty(n)||n in e||(e[n]=t[n])
return e},on=function(e){return function(t,n){return"number"==typeof t?t={duration:t}:"string"==typeof t?t="slow"===t?{duration:600}:"fast"===t?{duration:200}:{duration:400}:t||(t={}),e(t,n)}}(rn),sn=function(){this.originalStyle?this.node.setAttribute("style",this.originalStyle):(this.node.getAttribute("style"),this.node.removeAttribute("style"))},an=function(e,t,n,r,i,o,s,a){var u
return u=function(n,r,i,o){var s,a,u,c=this
if(this.root=r,this.node=i.node,this.isIntro=o,this.originalStyle=this.node.getAttribute("style"),c.complete=function(e){!e&&c.isIntro&&c.resetStyle(),c.node._ractive.transition=null,c._manager.remove(c)},s=n.n||n,"string"!=typeof s&&(a=new t({descriptor:s,root:this.root,owner:i}),s=a.toString(),a.teardown()),this.name=s,n.a?this.params=n.a:n.d&&(a=new t({descriptor:n.d,root:this.root,owner:i}),this.params=a.toArgsList(),a.teardown()),this._fn=r.transitions[s],!this._fn){if(u='Missing "'+s+'" transition. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#transitions',r.debug)throw new Error(u)
return void e(u)}},u.prototype={init:n,getStyle:r,setStyle:i,animateStyle:o,processParams:s,resetStyle:a},u}(X,Pt,$t,Yt,Qt,nn,on,sn),un=function(e,t){return function(n,r,i,o){var s,a,u
!r.transitionsEnabled||r._parent&&!r._parent.transitionsEnabled||(s=new t(n,r,i,o),s._fn&&(a=s.node,(u=a._ractive.transition)&&u.complete(),a._ractive.transition=s,e.addTransition(s)))}}(N,an),cn=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d,m,g){function v(e){do if("select"===e.lcName)return e
while(e=e.parent)}return function(y,b,w){var x,k,E,_,S,A,T,C,O,N,L,I
if(y.type=t.ELEMENT,x=y.parentFragment=b.parentFragment,k=x.pNode,E=y.descriptor=b.descriptor,y.parent=b.pElement,y.root=N=x.root,y.index=b.index,y.lcName=E.e.toLowerCase(),y.eventListeners=[],y.customEventListeners=[],y.cssDetachQueue=[],k&&(_=y.namespace=u(E,k),S=_!==n.html?g(E.e):E.e,y.node=s(S,_),N.css&&k===N.el&&y.node.setAttribute("data-rvcguid",N.constructor._guid||N._guid),i(y.node,"_ractive",{value:{proxy:y,keypath:a(x),index:x.indexRefs,events:r(null),root:N}})),A=l(y,E.a),E.f){if(y.node&&y.node.getAttribute("contenteditable")&&y.node.innerHTML){if(I="A pre-populated contenteditable element should not have children",N.debug)throw new Error(I)
o(I)}h(y,y.node,E,w)}w&&E.v&&p(y,E.v),w&&(N.twoway&&(y.bind(),y.node.getAttribute("contenteditable")&&y.node._ractive.binding&&y.node._ractive.binding.update()),A.name&&!A.name.twoway&&A.name.update(),"IMG"===y.node.tagName&&((T=y.attributes.width)||(C=y.attributes.height))&&y.node.addEventListener("load",O=function(){T&&(y.node.width=T.value),C&&(y.node.height=C.value),y.node.removeEventListener("load",O,!1)},!1),w.appendChild(y.node),E.o&&f(E.o,N,y),E.t1&&m(E.t1,N,y,!0),"OPTION"===y.node.tagName&&("SELECT"===k.tagName&&(L=k._ractive.binding)&&L.deferUpdate(),A.value||c(y,"value",E.f),y.node._ractive.value==k._ractive.value&&(y.node.selected=!0)),y.node.autofocus&&e.focus(y.node)),"option"===y.lcName&&(y.select=v(y.parent)),d(y)}}(N,D,s,je,c,X,a,S,ht,Dt,Ft,qt,Wt,Ht,Gt,un,ft),ln=function(e,t){function n(e){var t,n,r,i,o
for(i=e.liveQueries.length;i--;)if(t=e.liveQueries[i],n=t.selector,t._remove(e.node),e.matchingStaticNodes&&(r=e.matchingStaticNodes[n]))for(o=r.length;o--;)t.remove(r[o])}return function(r){var i,o,s
for(r&&(this.willDetach=!0,e.detachWhenReady(this)),this.fragment&&this.fragment.teardown(!1);this.attributes.length;)this.attributes.pop().teardown()
if(this.node){for(i in this.node._ractive.events)this.node._ractive.events[i].teardown();(o=this.node._ractive.binding)&&(o.teardown(),s=this.root._twowayBindings[o.attr.keypath],s.splice(s.indexOf(o),1))}this.decorator&&this.decorator.teardown(),this.descriptor.t2&&t(this.descriptor.t2,this.root,this,!1),this.liveQueries&&n(this)}}(N,un),hn=function(e){return function(t,n,r,i){var o,s,a,u,c,l,h,f,p
for(o=this.attributes.length;o--;)this.attributes[o].reassign(t,n,r,i)
if(s=this.node._ractive){e(s,"keypath",r,i),void 0!=t&&(s.index[t]=n)
for(a in s.events)for(u=s.events[a].proxies,o=u.length;o--;)c=u[o],"object"==typeof c.n&&c.a.reassign(t,n,r,i),c.d&&c.d.reassign(t,n,r,i);(l=s.binding)&&l.keypath.substr(0,r.length)===r&&(h=s.root._twowayBindings[l.keypath],h.splice(h.indexOf(l),1),l.keypath=l.keypath.replace(r,i),h=s.root._twowayBindings[l.keypath]||(s.root._twowayBindings[l.keypath]=[]),h.push(l))}if(this.fragment&&this.fragment.reassign(t,n,r,i),f=this.liveQueries)for(p=this.root,o=f.length;o--;)f[o]._makeDirty()}}(Be),fn="area base br col command doctype embed hr img input keygen link meta param source track wbr".split(" "),pn=function(e,t){function n(e){var n,r,i,o,s
if(n=e.attributes.value.value,r=e.select.attributes.value,i=r.interpolator){if(o=e.root.get(i.keypath||i.ref),o==n)return!0
if(e.select.attributes.multiple&&t(o))for(s=o.length;s--;)if(o[s]==n)return!0}}function r(e){var t,n,r,i
return t=e.attributes,n=t.type,r=t.value,i=t.name,n&&"radio"===n.value&&r&&i.interpolator&&r.value===i.interpolator.value?!0:void 0}return function(){var t,i,o,s
for(t="<"+(this.descriptor.y?"!doctype":this.descriptor.e),o=this.attributes.length,i=0;o>i;i+=1)(s=this.attributes[i].toString())&&(t+=" "+s)
return"option"===this.lcName&&n(this)&&(t+=" selected"),"input"===this.lcName&&r(this)&&(t+=" checked"),t+=">",this.html?t+=this.html:this.fragment&&(t+=this.fragment.toString()),-1===e.indexOf(this.descriptor.e)&&(t+="</"+this.descriptor.e+">"),this.stringifying=!1,t}}(fn,I),dn=function(e){return function(t){var n
return e(this.node,t)?this.node:this.html&&(n=this.node.querySelector(t))?n:this.fragment&&this.fragment.find?this.fragment.find(t):void 0}}(ae),mn=function(e){return function(t,n){var r,i
n._test(this,!0)&&n.live&&(this.liveQueries||(this.liveQueries=[])).push(n),this.html&&(r=e(this,t),n.push.apply(n,r),n.live&&!i&&(this.liveQueries||(this.liveQueries=[])).push(n)),this.fragment&&this.fragment.findAll(t,n)}}(Ut),gn=function(e){return this.fragment?this.fragment.findComponent(e):void 0},vn=function(e,t){this.fragment&&this.fragment.findAllComponents(e,t)},yn=function(){var e=this.attributes
if(this.node&&(this.binding&&(this.binding.teardown(),this.binding=null),!(this.node.getAttribute("contenteditable")&&e.value&&e.value.bind())))switch(this.descriptor.e){case"select":case"textarea":return void(e.value&&e.value.bind())
case"input":if("radio"===this.node.type||"checkbox"===this.node.type){if(e.name&&e.name.bind())return
if(e.checked&&e.checked.bind())return}if(e.value&&e.value.bind())return}},bn=function(e,t,n,r,i,o,s,a,u,c,l){var h=function(e,t){n(this,e,t)}
return h.prototype={detach:function(){var n
if(this.node)return this.node.parentNode&&this.node.parentNode.removeChild(this.node),this.node
if(this.cssDetachQueue.length){for(e.start();n===this.cssDetachQueue.pop();)t.remove(n)
e.end()}},teardown:r,reassign:i,firstNode:function(){return this.node},findNextNode:function(){return null},bubble:function(){},toString:o,find:s,findAll:a,findComponent:u,findAllComponents:c,bind:l},h}(N,k,cn,ln,hn,pn,dn,mn,gn,vn,yn),wn={missingParser:"Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser"},xn={},kn=function(e){var t,n,r
for(r="";e.length;){if(t=e.indexOf("<!--"),n=e.indexOf("-->"),-1===t&&-1===n){r+=e
break}if(-1!==t&&-1===n)throw"Illegal HTML - expected closing comment sequence ('-->')"
if(-1!==n&&-1===t||t>n)throw"Illegal HTML - unexpected closing comment sequence ('-->')"
r+=e.substr(0,t),e=e.substring(n+3)}return r},En=function(e){return function(t){var n,r,i,o,s,a
for(s=/^\s*\r?\n/,a=/\r?\n\s*$/,n=2;n<t.length;n+=1)r=t[n],i=t[n-1],o=t[n-2],r.type===e.TEXT&&i.type===e.MUSTACHE&&i.mustacheType!==e.PARTIAL&&o.type===e.TEXT&&a.test(o.value)&&s.test(r.value)&&(i.mustacheType!==e.INTERPOLATOR&&i.mustacheType!==e.TRIPLE&&(o.value=o.value.replace(a,"\n")),r.value=r.value.replace(s,""),""===r.value&&t.splice(n--,1))
return t}}(D),_n=function(e){return function(t){var n,r,i,o
for(n=0;n<t.length;n+=1)r=t[n],i=t[n-1],o=t[n+1],(r.mustacheType===e.COMMENT||r.mustacheType===e.DELIMCHANGE)&&(t.splice(n,1),i&&o&&i.type===e.TEXT&&o.type===e.TEXT&&(i.value+=o.value,t.splice(n,1)),n-=1)
return t}}(D),Sn=function(e){var t=e(/^[^\s=]+/)
return function(e){var n,r,i
return e.getStringMatch("=")?(n=e.pos,e.allowWhitespace(),(r=t(e))?(e.allowWhitespace(),(i=t(e))?(e.allowWhitespace(),e.getStringMatch("=")?[r,i]:(e.pos=n,null)):(e.pos=n,null)):(e.pos=n,null)):null}}(kt),An=function(e){var t={"#":e.SECTION,"^":e.INVERTED,"/":e.CLOSING,">":e.PARTIAL,"!":e.COMMENT,"&":e.TRIPLE}
return function(e){var n=t[e.str.charAt(e.pos)]
return n?(e.pos+=1,n):null}}(D),Tn=function(e,t,n){function r(t){for(var n=[];t.t===e.MEMBER&&t.r.t===e.REFINEMENT;)n.unshift(t.r),t=t.x
return t.t!==e.REFERENCE?null:{r:t.n,m:n}}var i=t(/^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/),o=/^[0-9][1-9]*$/
return function(t,s){var a,u,c,l,h,f,p,d,m
if(a=t.pos,u={type:s?e.TRIPLE:e.MUSTACHE},!(s||((l=t.getExpression())&&(u.mustacheType=e.INTERPOLATOR,t.allowWhitespace(),t.getStringMatch(t.delimiters[1])?t.pos-=t.delimiters[1].length:(t.pos=a,l=null)),l||(c=n(t),c===e.TRIPLE?u={type:e.TRIPLE}:u.mustacheType=c||e.INTERPOLATOR,c!==e.COMMENT&&c!==e.CLOSING||(f=t.remaining(),p=f.indexOf(t.delimiters[1]),-1===p)))))return u.ref=f.substr(0,p),t.pos+=p,u
if(!l&&(t.allowWhitespace(),l=t.getExpression(),f=t.remaining(),d=s?t.tripleDelimiters[1]:t.delimiters[1],f.substr(0,d.length)!==d&&":"!==f.charAt(0)&&(t.pos=a,f=t.remaining(),p=f.indexOf(t.delimiters[1]),-1!==p)))return u.ref=f.substr(0,p).trim(),t.pos+=p,u
for(;l.t===e.BRACKETED&&l.x;)l=l.x
return l.t===e.REFERENCE?u.ref=l.n:l.t===e.NUMBER_LITERAL&&o.test(l.v)?u.ref=l.v:(m=r(l))?u.keypathExpression=m:u.expression=l,h=i(t),null!==h&&(u.indexRef=h),u}}(D,kt,An),Cn=function(e,t,n){function r(r,i){var o,s,a=r.pos
return s=i?r.tripleDelimiters:r.delimiters,r.getStringMatch(s[0])?(o=t(r))?r.getStringMatch(s[1])?(r[i?"tripleDelimiters":"delimiters"]=o,{type:e.MUSTACHE,mustacheType:e.DELIMCHANGE}):(r.pos=a,null):(r.allowWhitespace(),o=n(r,i),null===o?(r.pos=a,null):(r.allowWhitespace(),r.getStringMatch(s[1])?o:(r.pos=a,null))):null}return function(){var e=this.tripleDelimiters[0].length>this.delimiters[0].length
return r(this,e)||r(this,!e)}}(D,Sn,Tn),On=function(e){return function(){var t,n,r
if(!this.getStringMatch("<!--"))return null
if(n=this.remaining(),r=n.indexOf("-->"),-1===r)throw new Error('Unexpected end of input (expected "-->" to close comment)')
return t=n.substr(0,r),this.pos+=r+3,{type:e.COMMENT,content:t}}}(D),Nn=function(e,t){var n,r,i
for(n=t.length;n--;){if(r=e.indexOf(t[n]),!r)return 0;-1!==r&&(!i||i>r)&&(i=r)}return i||-1},Ln=function(e,t,n){var r,i,o,s,a,u,c,l,h,f,p,d,m
return r=function(){return i(this)||o(this)},i=function(t){var n,r,i,o
return n=t.pos,t.inside?null:t.getStringMatch("<")?(r={type:e.TAG},t.getStringMatch("!")&&(r.doctype=!0),r.name=s(t),r.name?(i=a(t),i&&(r.attrs=i),t.allowWhitespace(),t.getStringMatch("/")&&(r.selfClosing=!0),t.getStringMatch(">")?(o=r.name.toLowerCase(),("script"===o||"style"===o)&&(t.inside=o),r):(t.pos=n,null)):(t.pos=n,null)):null},o=function(t){var n,r,i
if(n=t.pos,i=function(e){throw new Error("Unexpected character "+t.remaining().charAt(0)+" (expected "+e+")")},!t.getStringMatch("<"))return null
if(r={type:e.TAG,closing:!0},t.getStringMatch("/")||i('"/"'),r.name=s(t),r.name||i("tag name"),t.getStringMatch(">")||i('">"'),t.inside){if(r.name.toLowerCase()!==t.inside)return t.pos=n,null
t.inside=null}return r},s=t(/^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/),a=function(e){var t,n,r
if(t=e.pos,!e.getStringMatch(" ")&&!e.getStringMatch("\n"))return null
if(e.allowWhitespace(),r=u(e),!r)return e.pos=t,null
for(n=[];null!==r;)n.push(r),e.allowWhitespace(),r=u(e)
return n},u=function(e){var t,n,r
return(n=c(e))?(t={name:n},r=l(e),r&&(t.value=r),t):null},c=t(/^[^\s"'>\/=]+/),l=function(e){var t,n
return t=e.pos,e.allowWhitespace(),e.getStringMatch("=")?(e.allowWhitespace(),n=m(e,"'")||m(e,'"')||h(e),null===n?(e.pos=t,null):n):(e.pos=t,null)},p=t(/^[^\s"'=<>`]+/),f=function(t){var n,r,i
return n=t.pos,(r=p(t))?(-1!==(i=r.indexOf(t.delimiters[0]))&&(r=r.substr(0,i),t.pos=n+r.length),{type:e.TEXT,value:r}):null},h=function(e){var t,n
for(t=[],n=e.getMustache()||f(e);null!==n;)t.push(n),n=e.getMustache()||f(e)
return t.length?t:null},m=function(e,t){var n,r,i
if(n=e.pos,!e.getStringMatch(t))return null
for(r=[],i=e.getMustache()||d(e,t);null!==i;)r.push(i),i=e.getMustache()||d(e,t)
return e.getStringMatch(t)?r:(e.pos=n,null)},d=function(t,r){var i,o,s
if(i=t.pos,s=t.remaining(),o=n(s,[r,t.delimiters[0],t.delimiters[1]]),-1===o)throw new Error("Quoted attribute value must have a closing quote")
return o?(t.pos+=o,{type:e.TEXT,value:s.substr(0,o)}):null},r}(D,kt,Nn),In=function(e,t){return function(){var n,r,i
return r=this.remaining(),i=this.inside?"</"+this.inside:"<",(n=this.inside&&!this.interpolate[this.inside]?r.indexOf(i):t(r,[i,this.delimiters[0],this.tripleDelimiters[0]]))?(-1===n&&(n=r.length),this.pos+=n,{type:e.TEXT,value:r.substr(0,n)}):null}}(D,Nn),Rn=function(e){return function(t){var n=t.remaining()
return"true"===n.substr(0,4)?(t.pos+=4,{t:e.BOOLEAN_LITERAL,v:"true"}):"false"===n.substr(0,5)?(t.pos+=5,{t:e.BOOLEAN_LITERAL,v:"false"}):null}}(D),jn=function(e,t){return function(n){var r,i,o
return r=n.pos,n.allowWhitespace(),i=t(n),null===i?(n.pos=r,null):(n.allowWhitespace(),n.getStringMatch(":")?(n.allowWhitespace(),o=n.getExpression(),null===o?(n.pos=r,null):{t:e.KEY_VALUE_PAIR,k:i,v:o}):(n.pos=r,null))}}(D,Ot),Pn=function(e){return function t(n){var r,i,o,s
return r=n.pos,o=e(n),null===o?null:(i=[o],n.getStringMatch(",")?(s=t(n),s?i.concat(s):(n.pos=r,null)):i)}}(jn),Mn=function(e,t){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.getStringMatch("{")?(i=t(n),n.allowWhitespace(),n.getStringMatch("}")?{t:e.OBJECT_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(D,Pn),Dn=function di(e){var t,n,r,i
if(t=e.pos,e.allowWhitespace(),r=e.getExpression(),null===r)return null
if(n=[r],e.allowWhitespace(),e.getStringMatch(",")){if(i=di(e),null===i)return e.pos=t,null
n=n.concat(i)}return n},Fn=function(e,t){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.getStringMatch("[")?(i=t(n),n.getStringMatch("]")?{t:e.ARRAY_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(D,Dn),Bn=function(e,t,n,r,i){return function(o){var s=e(o)||t(o)||n(o)||r(o)||i(o)
return s}}(Tt,Rn,At,Mn,Fn),Un=function(e,t,n){var r,i,o,s
return r=t(/^\.[a-zA-Z_$0-9]+/),i=function(e){var t=o(e)
return t?"."+t:null},o=t(/^\[(0|[1-9][0-9]*)\]/),s=/^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/,function(t){var o,a,u,c,l,h,f
for(o=t.pos,a="";t.getStringMatch("../");)a+="../"
if(a||(c=t.getStringMatch(".")||""),u=n(t)||"",!a&&!c&&s.test(u))return{t:e.GLOBAL,v:u}
if("this"!==u||a||c||(u=".",o+=3),l=(a||c)+u,!l)return null
for(;h=r(t)||i(t);)l+=h
return t.getStringMatch("(")&&(f=l.lastIndexOf("."),-1!==f?(l=l.substr(0,f),t.pos=o+l.length):t.pos-=1),{t:e.REFERENCE,n:l}}}(D,kt,Ct),qn=function(e){return function(t){var n,r
return n=t.pos,t.getStringMatch("(")?(t.allowWhitespace(),(r=t.getExpression())?(t.allowWhitespace(),t.getStringMatch(")")?{t:e.BRACKETED,x:r}:(t.pos=n,null)):(t.pos=n,null)):null}}(D),zn=function(e,t,n){return function(r){return e(r)||t(r)||n(r)}}(Bn,Un,qn),Wn=function(e,t){return function(n){var r,i,o
if(r=n.pos,n.allowWhitespace(),n.getStringMatch(".")){if(n.allowWhitespace(),i=t(n))return{t:e.REFINEMENT,n:i}
n.expected("a property name")}return n.getStringMatch("[")?(n.allowWhitespace(),o=n.getExpression(),o||n.expected("an expression"),n.allowWhitespace(),n.getStringMatch("]")||n.expected('"]"'),{t:e.REFINEMENT,x:o}):null}}(D,Ct),Vn=function(e,t,n,r){return function(i){var o,s,a,u
if(s=t(i),!s)return null
for(;s;)if(o=i.pos,a=r(i))s={t:e.MEMBER,x:s,r:a}
else{if(!i.getStringMatch("("))break
if(i.allowWhitespace(),u=n(i),i.allowWhitespace(),!i.getStringMatch(")")){i.pos=o
break}s={t:e.INVOCATION,x:s},u&&(s.o=u)}return s}}(D,zn,Dn,Wn),Hn=function(e,t){var n,r
return r=function(t,n){return function(r){var i,o
return r.getStringMatch(t)?(i=r.pos,r.allowWhitespace(),o=r.getExpression(),o||r.expected("an expression"),{s:t,o:o,t:e.PREFIX_OPERATOR}):n(r)}},function(){var e,i,o,s,a
for(s="! ~ + - typeof".split(" "),a=t,e=0,i=s.length;i>e;e+=1)o=r(s[e],a),a=o
n=a}(),n}(D,Vn),Gn=function(e,t){var n,r
return r=function(t,n){return function(r){var i,o,s
if(o=n(r),!o)return null
for(;;){if(i=r.pos,r.allowWhitespace(),!r.getStringMatch(t))return r.pos=i,o
if("in"===t&&/[a-zA-Z_$0-9]/.test(r.remaining().charAt(0)))return r.pos=i,o
if(r.allowWhitespace(),s=n(r),!s)return r.pos=i,o
o={t:e.INFIX_OPERATOR,s:t,o:[o,s]}}}},function(){var e,i,o,s,a
for(s="* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "),a=t,e=0,i=s.length;i>e;e+=1)o=r(s[e],a),a=o
n=a}(),n}(D,Hn),$n=function(e,t){return function(n){var r,i,o,s
return(i=t(n))?(r=n.pos,n.allowWhitespace(),n.getStringMatch("?")?(n.allowWhitespace(),(o=n.getExpression())?(n.allowWhitespace(),n.getStringMatch(":")?(n.allowWhitespace(),s=n.getExpression(),s?{t:e.CONDITIONAL,o:[i,o,s]}:(n.pos=r,i)):(n.pos=r,i)):(n.pos=r,i)):(n.pos=r,i)):null}}(D,Gn),Kn=function(e){return function(){return e(this)}}($n),Yn=function(e,t,n,r,i,o,s){var a
return a=function(e,t){var n
for(this.str=e,this.pos=0,this.delimiters=t.delimiters,this.tripleDelimiters=t.tripleDelimiters,this.interpolate=t.interpolate,this.tokens=[];this.pos<this.str.length;)n=this.getToken(),null===n&&this.remaining()&&this.fail(),this.tokens.push(n)},a.prototype={getToken:function(){var e=this.getMustache()||this.getComment()||this.getTag()||this.getText()
return e},getMustache:e,getComment:t,getTag:n,getText:r,getExpression:i,allowWhitespace:o,getStringMatch:s,remaining:function(){return this.str.substring(this.pos)},fail:function(){var e,t
throw e=this.str.substr(0,this.pos).substr(-20),20===e.length&&(e="..."+e),t=this.remaining().substr(0,20),20===t.length&&(t+="..."),new Error("Could not parse template: "+(e?e+"<- ":"")+"failed at character "+this.pos+" ->"+t)},expected:function(e){var t=this.remaining().substr(0,40)
throw 40===t.length&&(t+="..."),new Error('Tokenizer failed: unexpected string "'+t+'" (expected '+e+")")}},a}(Cn,On,Ln,In,Kn,xt,wt),Qn=function(e,t,n,r,i){return function(o,s){var a,u
return s=s||{},s.stripComments!==!1&&(o=t(o)),a=new i(o,{delimiters:s.delimiters||e.defaults.delimiters,tripleDelimiters:s.tripleDelimiters||e.defaults.tripleDelimiters,interpolate:{script:s.interpolateScripts!==!1?!0:!1,style:s.interpolateStyles!==!1?!0:!1}}),u=a.tokens,n(u),r(u),u}}(i,kn,En,_n,Yn),Jn=function(e){var t,n,r,i,o,s,a,u,c
return t=function(e,t){this.text=t?e.value:e.value.replace(c," ")},t.prototype={type:e.TEXT,toJSON:function(){return this.decoded||(this.decoded=u(this.text))},toString:function(){return this.text}},n={quot:34,amp:38,apos:39,lt:60,gt:62,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,copy:169,ordf:170,laquo:171,not:172,shy:173,reg:174,macr:175,deg:176,plusmn:177,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,sup1:185,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,Agrave:192,Aacute:193,Acirc:194,Atilde:195,Auml:196,Aring:197,AElig:198,Ccedil:199,Egrave:200,Eacute:201,Ecirc:202,Euml:203,Igrave:204,Iacute:205,Icirc:206,Iuml:207,ETH:208,Ntilde:209,Ograve:210,Oacute:211,Ocirc:212,Otilde:213,Ouml:214,times:215,Oslash:216,Ugrave:217,Uacute:218,Ucirc:219,Uuml:220,Yacute:221,THORN:222,szlig:223,agrave:224,aacute:225,acirc:226,atilde:227,auml:228,aring:229,aelig:230,ccedil:231,egrave:232,eacute:233,ecirc:234,euml:235,igrave:236,iacute:237,icirc:238,iuml:239,eth:240,ntilde:241,ograve:242,oacute:243,ocirc:244,otilde:245,ouml:246,divide:247,oslash:248,ugrave:249,uacute:250,ucirc:251,uuml:252,yacute:253,thorn:254,yuml:255,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,"int":8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},r=[8364,129,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,141,381,143,144,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,157,382,376],i=new RegExp("&("+Object.keys(n).join("|")+");?","g"),o=/&#x([0-9]+);?/g,s=/&#([0-9]+);?/g,a=function(e){return e?10===e?32:128>e?e:159>=e?r[e-128]:55296>e?e:57343>=e?65533:65535>=e?e:65533:65533},u=function(e){var t
return t=e.replace(i,function(e,t){return n[t]?String.fromCharCode(n[t]):e}),t=t.replace(o,function(e,t){return String.fromCharCode(a(parseInt(t,16)))}),t=t.replace(s,function(e,t){return String.fromCharCode(a(t))})},c=/\s+/g,t}(D),Zn=function(e,t){return function(n,r){return n.type===e.TEXT?(this.pos+=1,new t(n,r)):null}}(D,Jn),Xn=function(e){var t
return t=function(e){this.content=e.content},t.prototype={toJSON:function(){return{t:e.COMMENT,f:this.content}},toString:function(){return"<!--"+this.content+"-->"}},t}(D),er=function(e,t){return function(n){return n.type===e.COMMENT?(this.pos+=1,new t(n,this.preserveWhitespace)):null}}(D,Xn),tr=function(e,t){function n(e){return JSON.stringify(String(e))}function r(n,i){var o,s
if(n.t===e.REFERENCE&&-1===i.indexOf(n.n)&&i.unshift(n.n),s=n.o||n.m)if(t(s))r(s,i)
else for(o=s.length;o--;)r(s[o],i)
n.x&&r(n.x,i),n.r&&r(n.r,i),n.v&&r(n.v,i)}function i(t,r){var o=function(e){return i(e,r)}
switch(t.t){case e.BOOLEAN_LITERAL:case e.GLOBAL:case e.NUMBER_LITERAL:return t.v
case e.STRING_LITERAL:return n(t.v)
case e.ARRAY_LITERAL:return"["+(t.m?t.m.map(o).join(","):"")+"]"
case e.OBJECT_LITERAL:return"{"+(t.m?t.m.map(o).join(","):"")+"}"
case e.KEY_VALUE_PAIR:return t.k+":"+i(t.v,r)
case e.PREFIX_OPERATOR:return("typeof"===t.s?"typeof ":t.s)+i(t.o,r)
case e.INFIX_OPERATOR:return i(t.o[0],r)+("in"===t.s.substr(0,2)?" "+t.s+" ":t.s)+i(t.o[1],r)
case e.INVOCATION:return i(t.x,r)+"("+(t.o?t.o.map(o).join(","):"")+")"
case e.BRACKETED:return"("+i(t.x,r)+")"
case e.MEMBER:return i(t.x,r)+i(t.r,r)
case e.REFINEMENT:return t.n?"."+t.n:"["+i(t.x,r)+"]"
case e.CONDITIONAL:return i(t.o[0],r)+"?"+i(t.o[1],r)+":"+i(t.o[2],r)
case e.REFERENCE:return"${"+r.indexOf(t.n)+"}"
default:throw new Error("Could not stringify expression token. This error is unexpected")}}var o=function(e){this.refs=[],r(e,this.refs),this.str=i(e,this.refs)}
return o.prototype={toJSON:function(){return this.json||(this.json={r:this.refs,s:this.str}),this.json}},o}(D,ee),nr=function(e,t){function n(n){return n.n?n.n:n.x.t===e.STRING_LITERAL||n.x.t===e.NUMBER_LITERAL?n.x.v:n.x.t===e.REFERENCE?n.x:new t(n.x).toJSON()}var r
return r=function(e){this.json={r:e.r,m:e.m.map(n)}},r.prototype={toJSON:function(){return this.json}},r}(D,tr),rr=function(e,t,n){var r=function(r,i){this.type=r.type===e.TRIPLE?e.TRIPLE:r.mustacheType,r.ref&&(this.ref=r.ref),r.keypathExpression&&(this.keypathExpr=new t(r.keypathExpression)),r.expression&&(this.expr=new n(r.expression)),i.pos+=1}
return r.prototype={toJSON:function(){var e
return this.json?this.json:(e={t:this.type},this.ref&&(e.r=this.ref),this.keypathExpr&&(e.kx=this.keypathExpr.toJSON()),this.expr&&(e.x=this.expr.toJSON()),this.json=e,e)},toString:function(){return!1}},r}(D,nr,tr),ir=function(e){var t,n,r,i=""
if(!e)return""
for(n=0,r=e.length;r>n;n+=1){if(t=e[n].toString(),t===!1)return!1
i+=t}return i},or=function(e){return function(t,n,r){var i,o
return r||n||(i=e(t),i===!1)?o=t.map(function(e){return e.toJSON(n)}):i}}(ir),sr=function(e,t,n,r,i){function o(e,n){var r=e.ref,i=t(n.ref.trim())
if(r&&i&&(e.indexRef&&(r+=":"+e.indexRef),r.substr(0,i.length)!==i))throw new Error("Could not parse template: Illegal closing section {{/"+i+"}}. Expected {{/"+e.ref+"}}.")}var s=function(t,n){var s
for(this.ref=t.ref,this.indexRef=t.indexRef,this.inverted=t.mustacheType===e.INVERTED,t.keypathExpression&&(this.keypathExpr=new r(t.keypathExpression)),t.expression&&(this.expr=new i(t.expression)),n.pos+=1,this.items=[],s=n.next();s;){if(s.mustacheType===e.CLOSING){o(this,s),n.pos+=1
break}this.items.push(n.getStub()),s=n.next()}}
return s.prototype={toJSON:function(t){var r
return this.json?this.json:(r={t:e.SECTION},this.ref&&(r.r=this.ref),this.indexRef&&(r.i=this.indexRef),this.inverted&&(r.n=!0),this.expr&&(r.x=this.expr.toJSON()),this.keypathExpr&&(r.kx=this.keypathExpr.toJSON()),this.items.length&&(r.f=n(this.items,t)),this.json=r,r)},toString:function(){return!1}},s}(D,g,or,nr,tr),ar=function(e,t,n){return function(r){return r.type===e.MUSTACHE||r.type===e.TRIPLE?r.mustacheType===e.SECTION||r.mustacheType===e.INVERTED?new n(r,this):new t(r,this):void 0}}(D,rr,sr),ur={li:["li"],dt:["dt","dd"],dd:["dt","dd"],p:"address article aside blockquote dir div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr menu nav ol p pre section table ul".split(" "),rt:["rt","rp"],rp:["rp","rt"],optgroup:["optgroup"],option:["option","optgroup"],thead:["tbody","tfoot"],tbody:["tbody","tfoot"],tr:["tr"],td:["td","th"],th:["td","th"]},cr=function(e){function t(n){var r,i
if("object"!=typeof n)return n
if(e(n))return n.map(t)
r={}
for(i in n)n.hasOwnProperty(i)&&(r[i]=t(n[i]))
return r}return function(e){var n,r,i,o,s,a
for(i={},n=[],r=[],s=e.length,o=0;s>o;o+=1)if(a=e[o],"intro"===a.name){if(i.intro)throw new Error("An element can only have one intro transition")
i.intro=a}else if("outro"===a.name){if(i.outro)throw new Error("An element can only have one outro transition")
i.outro=a}else if("intro-outro"===a.name){if(i.intro||i.outro)throw new Error("An element can only have one intro and one outro transition")
i.intro=a,i.outro=t(a)}else"proxy-"===a.name.substr(0,6)?(a.name=a.name.substring(6),r.push(a)):"on-"===a.name.substr(0,3)?(a.name=a.name.substring(3),r.push(a)):"decorator"===a.name?i.decorator=a:n.push(a)
return i.attrs=n,i.proxies=r,i}}(I),lr=function(e,t){return function(n){var r,i,o,s,a,u,c,l
for(a=function(){throw new Error("Illegal directive")},n.name&&n.value||a(),r={directiveType:n.name},i=n.value,u=[],c=[];i.length;)if(o=i.shift(),o.type===e.TEXT){if(s=o.value.indexOf(":"),-1!==s){s&&u.push({type:e.TEXT,value:o.value.substr(0,s)}),o.value.length>s+1&&(c[0]={type:e.TEXT,value:o.value.substring(s+1)})
break}u.push(o)}else u.push(o)
return c=c.concat(i),1===u.length&&u[0].type===e.TEXT?r.name=u[0].value:r.name=u,c.length&&(1===c.length&&c[0].type===e.TEXT?(l=t("["+c[0].value+"]"),r.args=l?l.value:c[0].value):r.dynamicArgs=c),r}}(D,Nt),hr=function(e,t){var n
return n=function(e,t){var n
for(this.tokens=e||[],this.pos=0,this.options=t,this.result=[];n=this.getStub();)this.result.push(n)},n.prototype={getStub:function(){var e=this.next()
return e?this.getText(e)||this.getMustache(e):null},getText:e,getMustache:t,next:function(){return this.tokens[this.pos]}},n}(Zn,ar),fr=function(e,t,n){var r
return r=function(t){var n=new e(t)
this.stubs=n.result},r.prototype={toJSON:function(e){var t
return this["json_"+e]?this["json_"+e]:t=this["json_"+e]=n(this.stubs,e)},toString:function(){return void 0!==this.str?this.str:(this.str=t(this.stubs),this.str)}},r}(hr,ir,or),pr=function(e){return function(t){var n,r
if("string"==typeof t.name){if(!t.args&&!t.dynamicArgs)return t.name
r=t.name}else r=new e(t.name).toJSON()
return n={n:r},t.args?(n.a=t.args,n):(t.dynamicArgs&&(n.d=new e(t.dynamicArgs).toJSON()),n)}}(fr),dr=function(e,t,n){return function(r){var i,o,s,a,u,c,l
if(this["json_"+r])return this["json_"+r]
if(i={t:e.ELEMENT,e:this.tag},this.doctype&&(i.y=1),this.attributes&&this.attributes.length)for(i.a={},c=this.attributes.length,u=0;c>u;u+=1){if(l=this.attributes[u],o=l.name,i.a[o])throw new Error("You cannot have multiple attributes with the same name")
s=null===l.value?null:l.value.toJSON(r),i.a[o]=s}if(this.items&&this.items.length&&(i.f=t(this.items,r)),this.proxies&&this.proxies.length)for(i.v={},c=this.proxies.length,u=0;c>u;u+=1)a=this.proxies[u],i.v[a.directiveType]=n(a)
return this.intro&&(i.t1=n(this.intro)),this.outro&&(i.t2=n(this.outro)),this.decorator&&(i.o=n(this.decorator)),this["json_"+r]=i,i}}(D,or,pr),mr=function(e,t){var n
return n="a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "),function(){var r,i,o,s,a,u,c,l
if(void 0!==this.str)return this.str
if(-1===n.indexOf(this.tag.toLowerCase()))return this.str=!1
if(this.proxies||this.intro||this.outro||this.decorator)return this.str=!1
if(c=e(this.items),c===!1)return this.str=!1
if(l=-1!==t.indexOf(this.tag.toLowerCase()),r="<"+this.tag,this.attributes)for(i=0,o=this.attributes.length;o>i;i+=1){if(a=this.attributes[i].name,-1!==a.indexOf(":"))return this.str=!1
if("id"===a||"intro"===a||"outro"===a)return this.str=!1
if(s=" "+a,null!==this.attributes[i].value){if(u=this.attributes[i].value.toString(),u===!1)return this.str=!1
""!==u&&(s+="=",s+=/[\s"'=<>`]/.test(u)?'"'+u.replace(/"/g,"&quot;")+'"':u)}r+=s}return this.selfClosing&&!l?(r+="/>",this.str=r):(r+=">",l?this.str=r:(r+=c,r+="</"+this.tag+">",this.str=r))}}(ir,fn),gr=function(e,t,n,r,i,o,s,a,u){var c,l,h,f,p,d=/^\s+/,m=/\s+$/
return c=function(s,a,c){var l,h,f,g,v,y,b
if(a.pos+=1,y=function(e){return{name:e.name,value:e.value?new u(e.value):null}},this.tag=s.name,b=s.name.toLowerCase(),"rv-"===b.substr(0,3)&&(n('The "rv-" prefix for components has been deprecated. Support will be removed in a future version'),this.tag=this.tag.substring(3)),c=c||"pre"===b||"style"===b||"script"===b,s.attrs&&(f=i(s.attrs),h=f.attrs,g=f.proxies,a.options.sanitize&&a.options.sanitize.eventAttributes&&(h=h.filter(p)),h.length&&(this.attributes=h.map(y)),g.length&&(this.proxies=g.map(o)),f.intro&&(this.intro=o(f.intro)),f.outro&&(this.outro=o(f.outro)),f.decorator&&(this.decorator=o(f.decorator))),s.doctype&&(this.doctype=!0),s.selfClosing&&(this.selfClosing=!0),-1!==t.indexOf(b)&&(this.isVoid=!0),!this.selfClosing&&!this.isVoid){for(this.siblings=r[b],this.items=[],l=a.next();l&&l.mustacheType!==e.CLOSING;){if(l.type===e.TAG){if(l.closing){l.name.toLowerCase()===b&&(a.pos+=1)
break}if(this.siblings&&-1!==this.siblings.indexOf(l.name.toLowerCase()))break}this.items.push(a.getStub(c)),l=a.next()}c||(v=this.items[0],v&&v.type===e.TEXT&&(v.text=v.text.replace(d,""),v.text||this.items.shift()),v=this.items[this.items.length-1],v&&v.type===e.TEXT&&(v.text=v.text.replace(m,""),v.text||this.items.pop()))}},c.prototype={toJSON:s,toString:a},l="a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "),h="li dd rt rp optgroup option tbody tfoot tr td th".split(" "),f=/^on[a-zA-Z]/,p=function(e){var t=!f.test(e.name)
return t},c}(D,fn,X,ur,cr,lr,dr,mr,fr),vr=function(e){return function(t){return this.options.sanitize&&this.options.sanitize.elements&&-1!==this.options.sanitize.elements.indexOf(t.name.toLowerCase())?null:new e(t,this,this.preserveWhitespace)}}(gr),yr=function(e,t,n,r,i){var o
return o=function(e,t){var n,r
for(this.tokens=e||[],this.pos=0,this.options=t,this.preserveWhitespace=t.preserveWhitespace,r=[];n=this.getStub();)r.push(n)
this.result=i(r,t.noStringify,!0)},o.prototype={getStub:function(e){var t=this.next()
return t?this.getText(t,this.preserveWhitespace||e)||this.getComment(t)||this.getMustache(t)||this.getElement(t):null},getText:e,getComment:t,getMustache:n,getElement:r,next:function(){return this.tokens[this.pos]}},o}(Zn,er,ar,vr,or),br=function(e,t,n){var r,i,o,s,a
return i=/^\s*$/,o=/<!--\s*\{\{\s*>\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/,s=/<!--\s*\{\{\s*\/\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/,r=function(r,s){var u,c,l
return s=s||{},o.test(r)?a(r,s):(s.sanitize===!0&&(s.sanitize={elements:"applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),eventAttributes:!0}),u=e(r,s),s.preserveWhitespace||(l=u[0],l&&l.type===t.TEXT&&i.test(l.value)&&u.shift(),l=u[u.length-1],l&&l.type===t.TEXT&&i.test(l.value)&&u.pop()),c=new n(u,s).result,"string"==typeof c?[c]:c)},a=function(e,t){var n,i,a,u,c,l
for(a={},n="",i=e;c=o.exec(i);){if(u=c[1],n+=i.substr(0,c.index),i=i.substring(c.index+c[0].length),l=s.exec(i),!l||l[1]!==u)throw new Error("Inline partials must have a closing delimiter, and cannot be nested")
a[u]=r(i.substr(0,l.index),t),i=i.substring(l.index+l[0].length)}return{main:r(n,t),partials:a}},r}(Qn,D,yr),wr=function(){function e(e,t){var r=n.exec(t)[0]
return null===e||r.length<e.length?r:e}var t=/^\s*$/,n=/^\s*/
return function(n){var r,i,o,s
return r=n.split("\n"),i=r[0],void 0!==i&&t.test(i)&&r.shift(),o=r[r.length-1],void 0!==o&&t.test(o)&&r.pop(),s=r.reduce(e,null),s&&(n=r.map(function(e){return e.replace(s,"")}).join("\n")),n}}(),xr=function(e,t,n,r,i,o,s){var a,u,c,l
return a=function(r,a){var h,f,p
if(f=c(r,a))return f
if(t&&(h=document.getElementById(a),h&&"SCRIPT"===h.tagName)){if(!o)throw new Error(e.missingParser)
u(o(s(h.text),r.parseOptions),a,i)}if(f=i[a],!f){if(p='Could not find descriptor for partial "'+a+'"',r.debug)throw new Error(p)
return n(p),[]}return l(f)},c=function(t,n){var r
if(t.partials[n]){if("string"==typeof t.partials[n]){if(!o)throw new Error(e.missingParser)
r=o(t.partials[n],t.parseOptions),u(r,n,t.partials)}return l(t.partials[n])}},u=function(e,t,n){var i
if(r(e)){n[t]=e.main
for(i in e.partials)e.partials.hasOwnProperty(i)&&(n[i]=e.partials[i])}else n[t]=e},l=function(e){return 1===e.length&&"string"==typeof e[0]?e[0]:e},a}(wn,u,X,ee,xn,br,wr),kr=function(e,t){var n
return t?n=e.split("\n").map(function(e,n){return n?t+e:e}).join("\n"):e},Er=function(e,t,n,r){var i,o
return r.push(function(){o=r.DomFragment}),i=function(n,r){var i,s=this.parentFragment=n.parentFragment
if(this.type=e.PARTIAL,this.name=n.descriptor.r,this.index=n.index,!n.descriptor.r)throw new Error("Partials must have a static reference (no expressions). This may change in a future version of Ractive.")
i=t(s.root,n.descriptor.r),this.fragment=new o({descriptor:i,root:s.root,pNode:s.pNode,owner:this}),r&&r.appendChild(this.fragment.docFrag)},i.prototype={firstNode:function(){return this.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},detach:function(){return this.fragment.detach()},reassign:function(e,t,n,r){return this.fragment.reassign(e,t,n,r)},teardown:function(e){this.fragment.teardown(e)},toString:function(){var t,r,i,o
return t=this.fragment.toString(),r=this.parentFragment.items[this.index-1],r&&r.type===e.TEXT?(i=r.descriptor.split("\n").pop(),(o=/^\s+$/.exec(i))?n(t,o[0]):t):t},find:function(e){return this.fragment.find(e)},findAll:function(e,t){return this.fragment.findAll(e,t)},findComponent:function(e){return this.fragment.findComponent(e)},findAllComponents:function(e,t){return this.fragment.findAllComponents(e,t)}},i}(D,xr,kr,w),_r=function(e,t){var n=function(e,n,r){this.parentFragment=e.parentFragment,this.component=e,this.key=n,this.fragment=new t({descriptor:r,root:e.root,owner:this}),this.selfUpdating=this.fragment.isSimple(),this.value=this.fragment.getValue()}
return n.prototype={bubble:function(){this.selfUpdating?this.update():!this.deferred&&this.ready&&(e.addAttribute(this),this.deferred=!0)},update:function(){var e=this.fragment.getValue()
this.component.instance.set(this.key,e),this.value=e},teardown:function(){this.fragment.teardown()}},n}(N,Pt),Sr=function(e,t,n,r,i){function o(o,s,a,u){var c,l,h,f,p,d
return h=o.root,f=o.parentFragment,"string"==typeof a?(l=t(a),l?l.value:a):null===a?!0:1===a.length&&a[0].t===e.INTERPOLATOR&&a[0].r?f.indexRefs&&void 0!==f.indexRefs[d=a[0].r]?(o.indexRefBindings[d]=s,f.indexRefs[d]):(p=n(h,a[0].r,f)||a[0].r,u.push({childKeypath:s,parentKeypath:p}),r(h,p)):(c=new i(o,s,a),o.complexParameters.push(c),c.value)}return function(e,t,n,r){var i,s,a
i={},e.complexParameters=[]
for(s in n)n.hasOwnProperty(s)&&(a=o(e,s,n[s],r),(void 0!==a||void 0===t[s])&&(i[s]=a))
return i}}(D,Nt,A,Z,_r),Ar=function(){function e(e,t){var n,r,i
if(n=e.adapt.length?e.adapt.map(function(t){return"object"==typeof t?t:e.adaptors[t]||t}):[],r=t.length)for(i=0;r>i;i+=1)-1===n.indexOf(t[i])&&n.push(t[i])
return n}return function(t,n,r,i,o){var s,a,u,c,l
return a=t.parentFragment,c=t.root,u={content:o||[]},l=e(c,n.defaults.adapt,n.adaptors),s=new n({el:a.pNode,append:!0,data:r,partials:u,magic:c.magic||n.defaults.magic,modifyArrays:c.modifyArrays,_parent:c,_component:t,adapt:l}),i&&(s.insert(i),s.fragment.pNode=s.el=a.pNode),s}}(),Tr=function(e,t,n){return function(r,i){i.forEach(function(i){var o,s
e(r,r.root,i.parentKeypath,i.childKeypath),o=t(r.instance,i.childKeypath),s=t(r.root,i.parentKeypath),void 0!==o&&void 0===s&&n(r.root,i.parentKeypath,o)})}}(Y,Z,U),Cr=function(e){function t(t,r,i,o){if("string"!=typeof o){if(r.debug)throw new Error(n)
return void e(n)}t.on(i,function(){var e=Array.prototype.slice.call(arguments)
e.unshift(o),r.fire.apply(r,e)})}var n="Components currently only support simple events - you cannot include arguments. Sorry!"
return function(e,n){var r
for(r in n)n.hasOwnProperty(r)&&t(e.instance,e.root,r,n[r])}}(X),Or=function(e){var t,n
for(t=e.root;t;)(n=t._liveComponentQueries[e.name])&&n.push(e.instance),t=t._parent},Nr=function(e,t,n,r,i,o,s){return function(a,u,c){var l,h,f,p,d
if(l=a.parentFragment=u.parentFragment,h=l.root,a.root=h,a.type=e.COMPONENT,a.name=u.descriptor.e,a.index=u.index,a.indexRefBindings={},a.bindings=[],f=h.components[u.descriptor.e],!f)throw new Error('Component "'+u.descriptor.e+'" not found')
d=[],p=n(a,f.data||{},u.descriptor.a,d),r(a,f,p,c,u.descriptor.f),i(a,d),o(a,u.descriptor.v),(u.descriptor.t1||u.descriptor.t2||u.descriptor.o)&&t('The "intro", "outro" and "decorator" directives have no effect on components'),s(a)}}(D,X,Sr,Ar,Tr,Cr,Or),Lr=function(e,t){function n(e){var t,n
t=e.root
do(n=t._liveComponentQueries[e.name])&&n._remove(e)
while(t=t._parent)}var r=function(t,n){e(this,t,n)}
return r.prototype={firstNode:function(){return this.instance.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},detach:function(){return this.instance.fragment.detach()},teardown:function(e){for(;this.complexParameters.length;)this.complexParameters.pop().teardown()
for(;this.bindings.length;)this.bindings.pop().teardown()
n(this),this.shouldDestroy=e,this.instance.teardown()},reassign:function(e,n,r,i){var o,s,a=this.instance,u=a._parent
this.bindings.forEach(function(o){var s
o.root===u&&(o.keypath===e&&a.set(o.otherKeypath,n),(s=t(o.keypath,r,i))&&o.reassign(s))}),(o=this.indexRefBindings[e])&&a.set(o,n),(s=this.root._liveComponentQueries[this.name])&&s._makeDirty()},toString:function(){return this.instance.fragment.toString()},find:function(e){return this.instance.fragment.find(e)},findAll:function(e,t){return this.instance.fragment.findAll(e,t)},findComponent:function(e){return e&&e!==this.name?this.instance.fragment?this.instance.fragment.findComponent(e):null:this.instance},findAllComponents:function(e,t){t._test(this,!0),this.instance.fragment&&this.instance.fragment.findAllComponents(e,t)}},r}(Nr,Fe),Ir=function(e,t){var n=function(t,n){this.type=e.COMMENT,this.descriptor=t.descriptor,n&&(this.node=document.createComment(t.descriptor.f),n.appendChild(this.node))}
return n.prototype={detach:t,teardown:function(e){e&&this.detach()},firstNode:function(){return this.node},toString:function(){return"<!--"+this.descriptor.f+"-->"}},n}(D,We),Rr=function(e,t,n,r,i,o,s,a,u,c,l,h,f){var p=function(e){e.pNode&&(this.docFrag=document.createDocumentFragment()),"string"==typeof e.descriptor?(this.html=e.descriptor,this.docFrag&&(this.nodes=r(this.html,e.pNode.tagName,e.pNode.namespaceURI,this.docFrag))):n.init(this,e)}
return p.prototype={reassign:n.reassign,detach:function(){var e,t
if(this.docFrag){if(this.nodes)for(e=this.nodes.length,t=0;e>t;t+=1)this.docFrag.appendChild(this.nodes[t])
else if(this.items)for(e=this.items.length,t=0;e>t;t+=1)this.docFrag.appendChild(this.items[t].detach())
return this.docFrag}},createItem:function(t){if("string"==typeof t.descriptor)return new i(t,this.docFrag)
switch(t.descriptor.t){case e.INTERPOLATOR:return new o(t,this.docFrag)
case e.SECTION:return new s(t,this.docFrag)
case e.TRIPLE:return new a(t,this.docFrag)
case e.ELEMENT:return this.root.components[t.descriptor.e]?new l(t,this.docFrag):new u(t,this.docFrag)
case e.PARTIAL:return new c(t,this.docFrag)
case e.COMMENT:return new h(t,this.docFrag)
default:throw new Error("Something very strange happened. Please file an issue at https://github.com/RactiveJS/Ractive/issues. Thanks!")}},teardown:function(e){var t
if(this.nodes&&e)for(;t=this.nodes.pop();)t.parentNode.removeChild(t)
else if(this.items)for(;this.items.length;)this.items.pop().teardown(e)
this.nodes=this.items=this.docFrag=null},firstNode:function(){return this.items&&this.items[0]?this.items[0].firstNode():this.nodes?this.nodes[0]||null:null},findNextNode:function(e){var t=e.index
return this.items[t+1]?this.items[t+1].firstNode():this.owner===this.root?this.owner.component?this.owner.component.findNextNode():null:this.owner.findNextNode(this)},toString:function(){var e,t,n,r
if(this.html)return this.html
if(e="",!this.items)return e
for(n=this.items.length,t=0;n>t;t+=1)r=this.items[t],e+=r.toString()
return e},find:function(e){var n,r,i,o,s
if(this.nodes){for(r=this.nodes.length,n=0;r>n;n+=1)if(o=this.nodes[n],1===o.nodeType){if(t(o,e))return o
if(s=o.querySelector(e))return s}return null}if(this.items){for(r=this.items.length,n=0;r>n;n+=1)if(i=this.items[n],i.find&&(s=i.find(e)))return s
return null}},findAll:function(e,n){var r,i,o,s,a,u,c
if(this.nodes){for(i=this.nodes.length,r=0;i>r;r+=1)if(s=this.nodes[r],1===s.nodeType&&(t(s,e)&&n.push(s),a=s.querySelectorAll(e)))for(u=a.length,c=0;u>c;c+=1)n.push(a[c])}else if(this.items)for(i=this.items.length,r=0;i>r;r+=1)o=this.items[r],o.findAll&&o.findAll(e,n)
return n},findComponent:function(e){var t,n,r,i
if(this.items){for(t=this.items.length,n=0;t>n;n+=1)if(r=this.items[n],r.findComponent&&(i=r.findComponent(e)))return i
return null}},findAllComponents:function(e,t){var n,r,i
if(this.items)for(r=this.items.length,n=0;r>n;n+=1)i=this.items[n],i.findAllComponents&&i.findAllComponents(e,t)
return t}},f.DomFragment=p,p}(D,ae,qe,ze,Ve,rt,ct,lt,bn,Er,Lr,Ir,w),jr=function(e,t,n){function r(e){for(var t;t=e._childInitQueue.pop();)t.instance.init&&t.instance.init(t.options),r(t.instance)}return function(i,o){if(this._rendering=!0,e.start(this,o),!this._initing)throw new Error("You cannot call ractive.render() directly!")
this.constructor.css&&t.add(this.constructor),this.fragment=new n({descriptor:this.template,root:this,owner:this,pNode:i}),i&&i.appendChild(this.fragment.docFrag),this._parent&&this._parent._rendering||r(this),delete this._rendering,e.end()}}(N,k,Rr),Pr=function(e){return function(){return e("renderHTML() has been deprecated and will be removed in a future version. Please use toHTML() instead"),this.toHTML()}}(X),Mr=function(e,t,n,r){return function(i,o){var s,a,u
if("function"==typeof i?(o=i,i={}):i=i||{},"object"!=typeof i)throw new Error("The reset method takes either no arguments, or an object containing new data")
return s=new e(function(e){a=e}),o&&s.then(o),t.start(this,a),(u=this._wrapped[""])&&u.reset?u.reset(i)===!1&&(this.data=i):this.data=i,n(this,""),r(this,""),t.end(),this.fire("reset",i),s}}(m,N,F,C),Dr=function(e,t,n,r,i){return function(o,s,a){var u,c,l
if(c=new r(function(e){l=e}),e.start(this,l),t(o)){u=o,a=s
for(o in u)u.hasOwnProperty(o)&&(s=u[o],o=n(o),i(this,o,s))}else o=n(o),i(this,o,s)
return e.end(),a&&c.then(a.bind(this)),c}}(N,ee,g,m,U),Fr=function(e){return function(t,n){return e(this,t,void 0===n?-1:-n)}}(f),Br=function(e,t,n,r,i){return function(o){var s,a,u,c,l,h,f,p
if(this.fire("teardown"),c=!this.component||this.component.shouldDestroy,this.constructor.css)if(c)l=o,o=function(){l&&l.call(this),t.remove(this.constructor)}
else{h=this.component.parentFragment
do h.owner.type===e.ELEMENT&&h.owner.willDetach&&(f=h.owner)
while(!f&&(h=h.parent))
if(!f)throw new Error("A component is being torn down but doesn't have a nearest detaching element... this shouldn't happen!")
f.cssDetachQueue.push(this.constructor)}for(a=new r(function(e){u=e}),n.start(this,u),this.fragment.teardown(c);this._animations[0];)this._animations[0].stop()
for(s in this._cache)i(this,s)
for(;p=this._unresolvedImplicitDependencies.pop();)p.teardown()
return n.end(),o&&a.then(o.bind(this)),a}}(D,k,N,m,F),Ur=function(){return this.fragment.toString()},qr=function(e,t){var n
{if("string"==typeof e)return n=this.get(e),this.set(e,!n,t)
if(this.debug)throw new Error("Bad arguments")}},zr=function(e,t,n,r){return function(i,o){var s,a
return"function"==typeof i?(o=i,i=""):i=i||"",s=new t(function(e){a=e}),e.start(this,a),n(this,i),r(this,i),e.end(),this.fire("update",i),o&&s.then(o.bind(this)),s}}(N,m,F,C),Wr=function(e,t,n){function r(e,i,o,s,a){var u,c,l,h,f,p
if(u=e._twowayBindings[i])for(l=u.length;l--;)h=u[l],(!h.radioName||h.node.checked)&&(h.checkboxName?h.changed()&&s[i]!==!0&&(s[i]=!0,s.push(i)):(f=h.attr.value,p=h.value(),t(f,p)||n(f,p)||(o[i]=p)))
if(a&&(c=e._depsMap[i]))for(l=c.length;l--;)r(e,c[l],o,s,a)}return function(t,n){var i,o,s
if("string"!=typeof t&&(t="",n=!0),r(this,t,i={},o=[],n),s=o.length)for(;s--;)t=o[s],i[t]=e(this,t)
this.set(i)}}(E,vt,d),Vr=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d,m,g,v,y,b,w,x,k,E){return{add:e,animate:t,detach:n,find:r,findAll:i,findAllComponents:o,findComponent:s,fire:a,get:u,insert:c,merge:l,observe:h,off:f,on:p,render:d,renderHTML:m,reset:g,set:v,subtract:y,teardown:b,toHTML:w,toggle:x,update:k,updateModel:E}}(p,ie,oe,se,ge,ve,ye,be,xe,Ee,Ae,Le,Ie,Re,jr,Pr,Mr,Dr,Fr,Br,Ur,qr,zr,Wr),Hr={},Gr={linear:function(e){return e},easeIn:function(e){return Math.pow(e,3)},easeOut:function(e){return Math.pow(e-1,3)+1},easeInOut:function(e){return(e/=.5)<1?.5*Math.pow(e,3):.5*(Math.pow(e-2,3)+2)}},$r=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t,n
return t=16*Math.random()|0,n="x"==e?t:3&t|8,n.toString(16)})},Kr=function(e){for(var t,n,r=Array.prototype.slice.call(arguments,1);n=r.shift();)for(t in n)n.hasOwnProperty(t)&&(e[t]=n[t])
return e},Yr=["adaptors","components","decorators","easing","events","interpolators","partials","transitions","data"],Qr=function(){function e(e){return e.trim?e.trim():e.replace(/^\s+/,"").replace(/\s+$/,"")}function t(e){return e.str}var n=/(?:^|\})?\s*([^\{\}]+)\s*\{/g,r=/\/\*.*?\*\//g,i=/((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~]+)?\s*[\s\+\>\~]?)\s*/g
return function(o,s){var a,u
return u=function(e){var n,r,o,a,u,c,l,h,f=[]
for(n=[];r=i.exec(e);)n.push({str:r[0],base:r[1],modifiers:r[2]})
for(a='[data-rvcguid="'+s+'"]',u=n.map(t),h=n.length;h--;)l=u.slice(),o=n[h],l[h]=o.base+a+o.modifiers||"",c=u.slice(),c[h]=a+" "+c[h],f.push(l.join(" "),c.join(" "))
return f.join(", ")},a=o.replace(r,"").replace(n,function(t,n){var r,i
return r=n.split(",").map(e),i=r.map(u).join(", ")+" ",t.replace(n,i)})}}(),Jr=function(e,t,n,r){return function(i,o){e.forEach(function(e){o[e]&&(i[e]=t(o[e]))}),n(i,"defaults",{value:t(o.defaults)}),o.css&&n(i,"css",{value:o.defaults.noCssTransform?o.css:r(o.css,i._guid)})}}(Yr,je,c,Qr),Zr=function(e,t){return/_super/.test(e)?function(){var n,r=this._super
return this._super=t,n=e.apply(this,arguments),this._super=r,n}:e},Xr=function(e,t){var n
for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n])
return e},ei=function(e,t,n,r,i,o){var s={}
return t.concat(e.keys).forEach(function(e){s[e]=!0}),function(a,u){var c,l
t.forEach(function(e){var t=u[e]
t&&(a[e]?i(a[e],t):a[e]=t)}),e.keys.forEach(function(e){var t=u[e]
void 0!==t&&("function"==typeof t&&"function"==typeof a[e]?a.defaults[e]=r(t,a[e]):a.defaults[e]=u[e])})
for(c in u)!s[c]&&u.hasOwnProperty(c)&&(l=u[c],"function"==typeof l&&"function"==typeof a.prototype[c]?a.prototype[c]=r(l,a.prototype[c]):a.prototype[c]=l)
u.css&&n(a,"css",{value:a.defaults.noCssTransform?u.css:o(u.css,a._guid)})}}(i,Yr,c,Zr,Xr,Qr),ti=function(e,t){return function(n,r){e(n.defaults.template)&&(n.partials||(n.partials={}),t(n.partials,n.defaults.template.partials),r.partials&&t(n.partials,r.partials),n.defaults.template=n.defaults.template.main)}}(ee,Xr),ni=function(e,t,n){return function(r){var i
if("string"==typeof r.defaults.template){if(!n)throw new Error(e.missingParser)
if("#"===r.defaults.template.charAt(0)&&t){if(i=document.getElementById(r.defaults.template.substring(1)),!i||"SCRIPT"!==i.tagName)throw new Error("Could not find template element ("+r.defaults.template+")")
r.defaults.template=n(i.innerHTML,r)}else r.defaults.template=n(r.defaults.template,r.defaults)}}}(wn,u,br),ri=function(e,t){return function(n){var r
if(n.partials)for(r in n.partials)if(n.partials.hasOwnProperty(r)&&"string"==typeof n.partials[r]){if(!t)throw new Error(e.missingParser)
n.partials[r]=t(n.partials[r],n)}}}(wn,br),ii=function(){function e(e){var n="var __ractive=this;return("+e.replace(t,function(e,t){return'__ractive.get("'+t+'")'})+")"
return new Function(n)}var t=/\$\{([^\}]+)\}/g
return function(t){return"function"==typeof t?{get:t}:"string"==typeof t?{get:e(t)}:("object"==typeof t&&"string"==typeof t.get&&(t={get:e(t.get),set:t.set}),t)}}(),oi=function(e,t,n){var r=function(e,n){this.root=e.ractive,this.keypath=n,this.priority=0,this.computation=e,t(this)}
return r.prototype={update:function(){var t
t=this.root.get(this.keypath),e(t,this.value)||this.computation.bubble()},teardown:function(){n(this)}},r}(d,$,K),si=function(e,t,n,r){function i(e,t,n){var i,o,s
for(i=t.length;i--;)o=t[i],n[o.keypath]||(t.splice(i,1),t[o.keypath]=null,o.teardown())
for(i=n.length;i--;)s=n[i],t[s]||(o=new r(e,s),t.push(t[s]=o))}var o=function(e,t,n){this.ractive=e,this.key=t,this.getter=n.get,this.setter=n.set,this.watchers=[],this.update()}
return o.prototype={set:function(e){if(this.setting)return void(this.value=e)
if(!this.setter)throw new Error("Computed properties without setters are read-only in the current version")
this.setter.call(this.ractive,e)},update:function(){var t,r,o,s
t=this.ractive,r=t._captured,r||(t._captured=[])
try{o=this.getter.call(t)}catch(a){t.debug&&e('Failed to compute "'+this.key+'": '+a.message||a),s=!0}i(this,this.watchers,t._captured),t._captured=r,s||(this.setting=!0,this.value=o,n(t,this.key,o),this.setting=!1),this.deferred=!1},bubble:function(){this.watchers.length<=1?this.update():this.deferred||(t.addComputation(this),this.deferred=!0)}},o}(X,N,U,oi),ai=function(e,t){return function(n,r){var i,o
for(i in r)o=e(r[i]),n._computations[i]=new t(n,i,o)}}(ii,si),ui=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d,m,g){var v=["adapt","modifyArrays","magic","twoway","lazy","debug","isolated"]
return function(y,b){var w,x,k,E,_,S,A
if(h(b.adaptors)&&(i("The `adaptors` option, to indicate which adaptors should be used with a given Ractive instance, has been deprecated in favour of `adapt`. See [TODO] for more information"),b.adapt=b.adaptors,delete b.adaptors),w=y.constructor.defaults,n.keys.forEach(function(e){void 0===b[e]&&(b[e]=w[e])}),v.forEach(function(e){y[e]=b[e]}),"string"==typeof y.adapt&&(y.adapt=[y.adapt]),y.magic&&!d)throw new Error("Getters and setters (magic mode) are not supported in this browser")
if(u(y,{_initing:{value:!0,writable:!0},_guid:{value:f()},_subs:{value:o(null),configurable:!0},_cache:{value:{}},_cacheMap:{value:o(null)},_deps:{value:[]},_depsMap:{value:o(null)},_patternObservers:{value:[]},_evaluators:{value:o(null)},_computations:{value:o(null)},_twowayBindings:{value:{}},_animations:{value:[]},nodes:{value:{}},_wrapped:{value:o(null)},_liveQueries:{value:[]},_liveComponentQueries:{value:[]},_childInitQueue:{value:[]},_changes:{value:[]},_unresolvedImplicitDependencies:{value:[]}}),b._parent&&b._component&&(u(y,{_parent:{value:b._parent},component:{value:b._component}}),b._component.instance=y),b.el&&(y.el=c(b.el),!y.el&&y.debug))throw new Error("Could not find container element")
if(b.eventDefinitions&&(i("ractive.eventDefinitions has been deprecated in favour of ractive.events. Support will be removed in future versions"),b.events=b.eventDefinitions),r.forEach(function(e){y.constructor[e]?y[e]=s(o(y.constructor[e]),b[e]):b[e]&&(y[e]=b[e])}),y.data||(y.data={}),A=w.computed?s(o(w.computed),b.computed):b.computed,A&&g(y,A),x=b.template,"string"==typeof x){if(!m)throw new Error(t.missingParser)
if("#"===x.charAt(0)&&e){if(k=document.getElementById(x.substring(1)),!k)throw new Error("Could not find template element ("+x+")")
E=m(k.innerHTML,b)}else E=m(x,b)}else E=x
l(E)&&(a(y.partials,E.partials),E=E.main),E&&1===E.length&&"string"==typeof E[0]&&(E=E[0]),y.template=E,s(y.partials,b.partials),y.parseOptions={preserveWhitespace:b.preserveWhitespace,sanitize:b.sanitize,stripComments:b.stripComments},y.transitionsEnabled=b.noIntro?!1:b.transitionsEnabled,e&&!y.el&&(y.el=document.createDocumentFragment()),y.el&&!b.append&&(y.el.innerHTML=""),_=new p(function(e){S=e}),y.render(y.el,S),b.complete&&_.then(b.complete.bind(y)),y.transitionsEnabled=b.transitionsEnabled,y._initing=!1}}(u,wn,i,Yr,X,je,Kr,rn,l,ke,ee,I,$r,m,V,br,ai),ci=function(e,t,n){return function(r,i,o){e.keys.forEach(function(e){var n=o[e],r=i.defaults[e]
"function"==typeof n&&"function"==typeof r&&(o[e]=t(n,r))}),r.beforeInit&&r.beforeInit(o),n(r,o),o._parent&&o._parent._rendering?o._parent._childInitQueue.push({instance:r,options:o}):r.init&&r.init(o)}}(i,Zr,ui),li=function(e,t,n,r,i,o,s,a,u,c,l){var h
return l.push(function(){h=l.Ractive}),function(l){var f,p,d,m=this
if(l.prototype instanceof h&&(l=r({},l,l.prototype,l.defaults)),f=function(e){c(this,f,e||{})},f.prototype=e(m.prototype),f.prototype.constructor=f,t(f,{extend:{value:m.extend},_guid:{value:n()}}),i(f,m),o(f,l),f.adaptors&&(d=f.defaults.adapt.length))for(;d--;)p=f.defaults.adapt[d],"string"==typeof p&&(f.defaults.adapt[d]=f.adaptors[p]||p)
return l.template&&(a(f),s(f,l),u(f)),f}}(je,l,$r,Kr,Jr,ei,ti,ni,ri,ci,w),hi=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p){var d=function(e){f(this,e)}
return d.prototype=r,n(d,{partials:{value:i},adaptors:{value:o},easing:{value:a},transitions:{value:{}},events:{value:{}},components:{value:s},decorators:{value:{}},interpolators:{value:u},defaults:{value:e.defaults},svg:{value:t},VERSION:{value:"0.4.0"}}),d.eventDefinitions=d.events,d.prototype.constructor=d,d.Promise=c,d.extend=l,d.parse=h,p.Ractive=d,d}(i,o,l,Vr,xn,j,Hr,Gr,te,m,li,br,ui,w),fi=function(e,t){for(var n="function";t.length;)t.pop()()
if(typeof Date.now!==n||typeof String.prototype.trim!==n||typeof Object.keys!==n||typeof Array.prototype.indexOf!==n||typeof Array.prototype.forEach!==n||typeof Array.prototype.map!==n||typeof Array.prototype.filter!==n||"undefined"!=typeof window&&typeof window.addEventListener!==n)throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.")
return"undefined"!=typeof window&&window.Node&&!window.Node.prototype.contains&&window.HTMLElement&&window.HTMLElement.prototype.contains&&(window.Node.prototype.contains=window.HTMLElement.prototype.contains),e}(hi,w,r)
"undefined"!=typeof t&&t.exports?t.exports=fi:"function"==typeof define&&define.amd&&define(function(){return fi}),e.Ractive=fi,fi.noConflict=function(){return e.Ractive=n,fi}}("undefined"!=typeof window?window:this)},{}],110:[function(e,t,n){"use strict"
t.exports=e("./lib/")},{"./lib/":124}],111:[function(e,t,n){"use strict"
t.exports={Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",AMP:"&",amp:"&",And:"⩓",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",ap:"≈",apacir:"⩯",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",Barwed:"⌆",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",Because:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxDL:"╗",boxDl:"╖",boxdL:"╕",boxdl:"┐",boxDR:"╔",boxDr:"╓",boxdR:"╒",boxdr:"┌",boxH:"═",boxh:"─",boxHD:"╦",boxHd:"╤",boxhD:"╥",boxhd:"┬",boxHU:"╩",boxHu:"╧",boxhU:"╨",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxUL:"╝",boxUl:"╜",boxuL:"╛",boxul:"┘",boxUR:"╚",boxUr:"╙",boxuR:"╘",boxur:"└",boxV:"║",boxv:"│",boxVH:"╬",boxVh:"╫",boxvH:"╪",boxvh:"┼",boxVL:"╣",boxVl:"╢",boxvL:"╡",boxvl:"┤",boxVR:"╠",boxVr:"╟",boxvR:"╞",boxvr:"├",bprime:"‵",Breve:"˘",breve:"˘",brvbar:"¦",Bscr:"ℬ",bscr:"𝒷",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",Cap:"⋒",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",CenterDot:"·",centerdot:"·",Cfr:"ℭ",cfr:"𝔠",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",cir:"○",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",Colon:"∷",colon:":",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",Conint:"∯",conint:"∮",ContourIntegral:"∮",Copf:"ℂ",copf:"𝕔",coprod:"∐",Coproduct:"∐",COPY:"©",copy:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",Cross:"⨯",cross:"✗",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",Cup:"⋓",cup:"∪",cupbrcap:"⩈",CupCap:"≍",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",Dagger:"‡",dagger:"†",daleth:"ℸ",Darr:"↡",dArr:"⇓",darr:"↓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",DD:"ⅅ",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",Diamond:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",Downarrow:"⇓",downarrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",ecir:"≖",Ecirc:"Ê",ecirc:"ê",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",eDot:"≑",edot:"ė",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp:" ",emsp13:" ",emsp14:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",Escr:"ℰ",escr:"ℯ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",ExponentialE:"ⅇ",exponentiale:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",ForAll:"∀",forall:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",Fscr:"ℱ",fscr:"𝒻",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",gE:"≧",ge:"≥",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",Gg:"⋙",gg:"≫",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gl:"≷",gla:"⪥",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gnE:"≩",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",GT:">",Gt:"≫",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",hArr:"⇔",harr:"↔",harrcir:"⥈",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",Hfr:"ℌ",hfr:"𝔥",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",Hopf:"ℍ",hopf:"𝕙",horbar:"―",HorizontalLine:"─",Hscr:"ℋ",hscr:"𝒽",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",Ifr:"ℑ",ifr:"𝔦",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Im:"ℑ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",Implies:"⇒","in":"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",Int:"∬","int":"∫",intcal:"⊺",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",Iscr:"ℐ",iscr:"𝒾",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",Lang:"⟪",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",Larr:"↞",lArr:"⇐",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",lAtail:"⤛",latail:"⤙",late:"⪭",lates:"⪭︀",lBarr:"⤎",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",lE:"≦",le:"≤",LeftAngleBracket:"⟨",LeftArrow:"←",Leftarrow:"⇐",leftarrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",Ll:"⋘",ll:"≪",llarr:"⇇",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnap:"⪉",lnapprox:"⪉",lnE:"≨",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftarrow:"⟵",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longleftrightarrow:"⟷",longmapsto:"⟼",LongRightArrow:"⟶",Longrightarrow:"⟹",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",Lscr:"ℒ",lscr:"𝓁",Lsh:"↰",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",LT:"<",Lt:"≪",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",Mscr:"ℳ",mscr:"𝓂",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",ne:"≠",nearhk:"⤤",neArr:"⇗",nearr:"↗",nearrow:"↗",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:"\n",nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlArr:"⇍",nlarr:"↚",nldr:"‥",nlE:"≦̸",nle:"≰",nLeftarrow:"⇍",nleftarrow:"↚",nLeftrightarrow:"⇎",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",Nopf:"ℕ",nopf:"𝕟",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nRightarrow:"⇏",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nVDash:"⊯",nVdash:"⊮",nvDash:"⊭",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwArr:"⇖",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",ocir:"⊚",Ocirc:"Ô",ocirc:"ô",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",Or:"⩔",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",Otimes:"⨷",otimes:"⊗",otimesas:"⨶",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",Popf:"ℙ",popf:"𝕡",pound:"£",Pr:"⪻",pr:"≺",prap:"⪷",prcue:"≼",prE:"⪳",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",Prime:"″",prime:"′",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportion:"∷",Proportional:"∝",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",Qopf:"ℚ",qopf:"𝕢",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",QUOT:'"',quot:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",Rang:"⟫",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",Rarr:"↠",rArr:"⇒",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",rAtail:"⤜",ratail:"⤚",ratio:"∶",rationals:"ℚ",RBarr:"⤐",rBarr:"⤏",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",Re:"ℜ",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",REG:"®",reg:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",Rfr:"ℜ",rfr:"𝔯",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrow:"→",Rightarrow:"⇒",rightarrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",Ropf:"ℝ",ropf:"𝕣",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",Rscr:"ℛ",rscr:"𝓇",Rsh:"↱",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",Sc:"⪼",sc:"≻",scap:"⪸",Scaron:"Š",scaron:"š",sccue:"≽",scE:"⪴",sce:"⪰",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",searhk:"⤥",seArr:"⇘",searr:"↘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",Square:"□",square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",Sub:"⋐",sub:"⊂",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",Subset:"⋐",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",Sum:"∑",sum:"∑",sung:"♪",Sup:"⋑",sup:"⊃",sup1:"¹",sup2:"²",sup3:"³",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",Supset:"⋑",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swArr:"⇙",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"	",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",Therefore:"∴",therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",thinsp:" ",ThinSpace:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",Tilde:"∼",tilde:"˜",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",TRADE:"™",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",Uarr:"↟",uArr:"⇑",uarr:"↑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrow:"↑",Uparrow:"⇑",uparrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",Updownarrow:"⇕",updownarrow:"↕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",upsi:"υ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTee:"⊥",UpTeeArrow:"↥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",vArr:"⇕",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",Vbar:"⫫",vBar:"⫨",vBarv:"⫩",Vcy:"В",vcy:"в",VDash:"⊫",Vdash:"⊩",vDash:"⊨",vdash:"⊢",Vdashl:"⫦",Vee:"⋁",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",Verbar:"‖",verbar:"|",Vert:"‖",vert:"|",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",Wedge:"⋀",wedge:"∧",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xhArr:"⟺",xharr:"⟷",Xi:"Ξ",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",Yuml:"Ÿ",yuml:"ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",Zfr:"ℨ",zfr:"𝔷",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",Zopf:"ℤ",zopf:"𝕫",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}},{}],112:[function(e,t,n){"use strict"
var r={};["article","aside","button","blockquote","body","canvas","caption","col","colgroup","dd","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","iframe","li","map","object","ol","output","p","pre","progress","script","section","style","table","tbody","td","textarea","tfoot","th","tr","thead","ul","video"].forEach(function(e){r[e]=!0}),t.exports=r},{}],113:[function(e,t,n){"use strict"
function r(e,t){return e=e.source,t=t||"",function n(r,i){return r?(i=i.source||i,e=e.replace(r,i),n):new RegExp(e,t)}}var i=/[a-zA-Z_:][a-zA-Z0-9:._-]*/,o=/[^"'=<>`\x00-\x20]+/,s=/'[^']*'/,a=/"[^"]*"/,u=r(/(?:unquoted|single_quoted|double_quoted)/)("unquoted",o)("single_quoted",s)("double_quoted",a)(),c=r(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name",i)("attr_value",u)(),l=r(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute",c)(),h=/<\/[A-Za-z][A-Za-z0-9]*\s*>/,f=/<!--([^-]+|[-][^-]+)*-->/,p=/<[?].*?[?]>/,d=/<![A-Z]+\s+[^>]*>/,m=/<!\[CDATA\[([^\]]+|\][^\]]|\]\][^>])*\]\]>/,g=r(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag",l)("close_tag",h)("comment",f)("processing",p)("declaration",d)("cdata",m)()
t.exports.HTML_TAG_RE=g},{}],114:[function(e,t,n){"use strict"
t.exports=["coap","doi","javascript","aaa","aaas","about","acap","cap","cid","crid","data","dav","dict","dns","file","ftp","geo","go","gopher","h323","http","https","iax","icap","im","imap","info","ipp","iris","iris.beep","iris.xpc","iris.xpcs","iris.lwz","ldap","mailto","mid","msrp","msrps","mtqp","mupdate","news","nfs","ni","nih","nntp","opaquelocktoken","pop","pres","rtsp","service","session","shttp","sieve","sip","sips","sms","snmp","soap.beep","soap.beeps","tag","tel","telnet","tftp","thismessage","tn3270","tip","tv","urn","vemmi","ws","wss","xcon","xcon-userid","xmlrpc.beep","xmlrpc.beeps","xmpp","z39.50r","z39.50s","adiumxtra","afp","afs","aim","apt","attachment","aw","beshare","bitcoin","bolo","callto","chrome","chrome-extension","com-eventbrite-attendee","content","cvs","dlna-playsingle","dlna-playcontainer","dtn","dvb","ed2k","facetime","feed","finger","fish","gg","git","gizmoproject","gtalk","hcp","icon","ipn","irc","irc6","ircs","itms","jar","jms","keyparc","lastfm","ldaps","magnet","maps","market","message","mms","ms-help","msnim","mumble","mvn","notes","oid","palm","paparazzi","platform","proxy","psyc","query","res","resource","rmi","rsync","rtmp","secondlife","sftp","sgn","skype","smb","soldat","spotify","ssh","steam","svn","teamspeak","things","udp","unreal","ut2004","ventrilo","view-source","webcal","wtai","wyciwyg","xfire","xri","ymsgr"]},{}],115:[function(e,t,n){"use strict"
function r(e){return Object.prototype.toString.call(e)}function i(e){return"[object String]"===r(e)}function o(e,t){return e?d.call(e,t):!1}function s(e){var t=[].slice.call(arguments,1)
return t.forEach(function(t){if(t){if("object"!=typeof t)throw new TypeError(t+"must be object")
Object.keys(t).forEach(function(n){e[n]=t[n]})}}),e}function a(e){return e.indexOf("\\")<0?e:e.replace(m,"$1")}function u(e){return e>=55296&&57343>=e?!1:e>=64976&&65007>=e?!1:65535===(65535&e)||65534===(65535&e)?!1:e>=0&&8>=e?!1:11===e?!1:e>=14&&31>=e?!1:e>=127&&159>=e?!1:e>1114111?!1:!0}function c(e){if(e>65535){e-=65536
var t=55296+(e>>10),n=56320+(1023&e)
return String.fromCharCode(t,n)}return String.fromCharCode(e)}function l(e,t){var n=0
return o(y,t)?y[t]:35===t.charCodeAt(0)&&v.test(t)&&(n="x"===t[1].toLowerCase()?parseInt(t.slice(2),16):parseInt(t.slice(1),10),u(n))?c(n):e}function h(e){return e.indexOf("&")<0?e:e.replace(g,l)}function f(e){return x[e]}function p(e){return b.test(e)?e.replace(w,f):e}var d=Object.prototype.hasOwnProperty,m=/\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g,g=/&([a-z#][a-z0-9]{1,31});/gi,v=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,y=e("./entities"),b=/[&<>"]/,w=/[&<>"]/g,x={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}
n.assign=s,n.isString=i,n.has=o,n.unescapeMd=a,n.isValidEntityCode=u,n.fromCodePoint=c,n.replaceEntities=h,n.escapeHtml=p},{"./entities":111}],116:[function(e,t,n){"use strict"
t.exports={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["block","inline","references","abbr2"]},block:{rules:["blockquote","code","fences","heading","hr","htmlblock","lheading","list","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","htmltag","links","newline","text"]}}}},{}],117:[function(e,t,n){"use strict"
t.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["block","inline","references","replacements","linkify","smartquotes","references","abbr2","footnote_tail"]},block:{rules:["blockquote","code","fences","heading","hr","htmlblock","lheading","list","paragraph","table"]},inline:{rules:["autolink","backticks","del","emphasis","entity","escape","footnote_ref","htmltag","links","newline","text"]}}}},{}],118:[function(e,t,n){"use strict"
t.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{},block:{},inline:{}}}},{}],119:[function(e,t,n){"use strict"
var r=e("../common/utils").replaceEntities
t.exports=function(e){var t=r(e)
try{t=decodeURI(t)}catch(n){}return encodeURI(t)}},{"../common/utils":115}],120:[function(e,t,n){"use strict"
t.exports=function(e){return e.trim().replace(/\s+/g," ").toUpperCase()}},{}],121:[function(e,t,n){"use strict"
var r=e("./normalize_link"),i=e("../common/utils").unescapeMd
t.exports=function(e,t){var n,o,s,a=t,u=e.posMax
if(60===e.src.charCodeAt(t)){for(t++;u>t;){if(n=e.src.charCodeAt(t),10===n)return!1
if(62===n)return s=r(i(e.src.slice(a+1,t))),e.parser.validateLink(s)?(e.pos=t+1,e.linkContent=s,!0):!1
92===n&&u>t+1?t+=2:t++}return!1}for(o=0;u>t&&(n=e.src.charCodeAt(t),32!==n)&&!(32>n||127===n);)if(92===n&&u>t+1)t+=2
else{if(40===n&&(o++,o>1))break
if(41===n&&(o--,0>o))break
t++}return a===t?!1:(s=r(i(e.src.slice(a,t))),e.parser.validateLink(s)?(e.linkContent=s,e.pos=t,!0):!1)}},{"../common/utils":115,"./normalize_link":119}],122:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i,o=-1,s=e.posMax,a=e.pos,u=e.isInLabel
if(e.isInLabel)return-1
if(e.labelUnmatchedScopes)return e.labelUnmatchedScopes--,-1
for(e.pos=t+1,e.isInLabel=!0,n=1;e.pos<s;){if(i=e.src.charCodeAt(e.pos),91===i)n++
else if(93===i&&(n--,0===n)){r=!0
break}e.parser.skipToken(e)}return r?(o=e.pos,e.labelUnmatchedScopes=0):e.labelUnmatchedScopes=n-1,e.pos=a,e.isInLabel=u,o}},{}],123:[function(e,t,n){"use strict"
var r=e("../common/utils").unescapeMd
t.exports=function(e,t){var n,i=t,o=e.posMax,s=e.src.charCodeAt(t)
if(34!==s&&39!==s&&40!==s)return!1
for(t++,40===s&&(s=41);o>t;){if(n=e.src.charCodeAt(t),n===s)return e.pos=t+1,e.linkContent=r(e.src.slice(i+1,t)),!0
92===n&&o>t+1?t+=2:t++}return!1}},{"../common/utils":115}],124:[function(e,t,n){"use strict"
function r(e,t,n){this.src=t,this.env=n,this.options=e.options,this.tokens=[],this.inlineMode=!1,this.inline=e.inline,this.block=e.block,this.renderer=e.renderer,this.typographer=e.typographer}function i(e,t){"string"!=typeof e&&(t=e,e="default"),this.inline=new c,this.block=new u,this.core=new a,this.renderer=new s,this.ruler=new l,this.options={},this.configure(h[e]),this.set(t||{})}var o=e("./common/utils").assign,s=e("./renderer"),a=e("./parser_core"),u=e("./parser_block"),c=e("./parser_inline"),l=e("./ruler"),h={"default":e("./configs/default"),full:e("./configs/full"),commonmark:e("./configs/commonmark")}
i.prototype.set=function(e){o(this.options,e)},i.prototype.configure=function(e){var t=this
if(!e)throw new Error("Wrong `remarkable` preset, check name/content")
e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(n){e.components[n].rules&&t[n].ruler.enable(e.components[n].rules,!0)})},i.prototype.use=function(e,t){return e(this,t),this},i.prototype.parse=function(e,t){var n=new r(this,e,t)
return this.core.process(n),n.tokens},i.prototype.render=function(e,t){return t=t||{},this.renderer.render(this.parse(e,t),this.options,t)},i.prototype.parseInline=function(e,t){var n=new r(this,e,t)
return n.inlineMode=!0,this.core.process(n),n.tokens},i.prototype.renderInline=function(e,t){return t=t||{},this.renderer.render(this.parseInline(e,t),this.options,t)},t.exports=i,t.exports.utils=e("./common/utils")},{"./common/utils":115,"./configs/commonmark":116,"./configs/default":117,"./configs/full":118,"./parser_block":125,"./parser_core":126,"./parser_inline":127,"./renderer":128,"./ruler":129}],125:[function(e,t,n){"use strict"
function r(){this.ruler=new i
for(var e=0;e<s.length;e++)this.ruler.push(s[e][0],s[e][1],{alt:(s[e][2]||[]).slice()})}var i=e("./ruler"),o=e("./rules_block/state_block"),s=[["code",e("./rules_block/code")],["fences",e("./rules_block/fences"),["paragraph","blockquote","list"]],["blockquote",e("./rules_block/blockquote"),["paragraph","blockquote","list"]],["hr",e("./rules_block/hr"),["paragraph","blockquote","list"]],["list",e("./rules_block/list"),["paragraph","blockquote"]],["footnote",e("./rules_block/footnote"),["paragraph"]],["heading",e("./rules_block/heading"),["paragraph","blockquote"]],["lheading",e("./rules_block/lheading")],["htmlblock",e("./rules_block/htmlblock"),["paragraph","blockquote"]],["table",e("./rules_block/table"),["paragraph"]],["deflist",e("./rules_block/deflist"),["paragraph"]],["paragraph",e("./rules_block/paragraph")]]
r.prototype.tokenize=function(e,t,n){for(var r,i,o=this.ruler.getRules(""),s=o.length,a=t,u=!1;n>a&&(e.line=a=e.skipEmptyLines(a),!(a>=n))&&!(e.tShift[a]<e.blkIndent);){for(i=0;s>i&&!(r=o[i](e,a,n,!1));i++);if(e.tight=!u,e.isEmpty(e.line-1)&&(u=!0),a=e.line,n>a&&e.isEmpty(a)){if(u=!0,a++,n>a&&"list"===e.parentType&&e.isEmpty(a))break
e.line=a}}}
var a=/[\n\t]/g,u=/\r[\n\u0085]|[\u2424\u2028\u0085]/g,c=/\u00a0/g
r.prototype.parse=function(e,t,n,r){var i,s=0,l=0
return e?(e=e.replace(c," "),e=e.replace(u,"\n"),e.indexOf("	")>=0&&(e=e.replace(a,function(t,n){var r
return 10===e.charCodeAt(n)?(s=n+1,l=0,t):(r="    ".slice((n-s-l)%4),l=n-s+1,r)})),i=new o(e,this,t,n,r),void this.tokenize(i,i.line,i.lineMax)):[]},t.exports=r},{"./ruler":129,"./rules_block/blockquote":131,"./rules_block/code":132,"./rules_block/deflist":133,"./rules_block/fences":134,"./rules_block/footnote":135,"./rules_block/heading":136,"./rules_block/hr":137,"./rules_block/htmlblock":138,"./rules_block/lheading":139,"./rules_block/list":140,"./rules_block/paragraph":141,"./rules_block/state_block":142,"./rules_block/table":143}],126:[function(e,t,n){"use strict"
function r(){this.options={},this.ruler=new i
for(var e=0;e<o.length;e++)this.ruler.push(o[e][0],o[e][1])}var i=e("./ruler"),o=[["block",e("./rules_core/block")],["abbr",e("./rules_core/abbr")],["references",e("./rules_core/references")],["inline",e("./rules_core/inline")],["footnote_tail",e("./rules_core/footnote_tail")],["abbr2",e("./rules_core/abbr2")],["replacements",e("./rules_core/replacements")],["smartquotes",e("./rules_core/smartquotes")],["linkify",e("./rules_core/linkify")]]
r.prototype.process=function(e){var t,n,r
for(r=this.ruler.getRules(""),t=0,n=r.length;n>t;t++)r[t](e)},t.exports=r},{"./ruler":129,"./rules_core/abbr":144,"./rules_core/abbr2":145,"./rules_core/block":146,"./rules_core/footnote_tail":147,"./rules_core/inline":148,"./rules_core/linkify":149,"./rules_core/references":150,"./rules_core/replacements":151,"./rules_core/smartquotes":152}],127:[function(e,t,n){"use strict"
function r(){this.ruler=new o
for(var e=0;e<u.length;e++)this.ruler.push(u[e][0],u[e][1])
this.validateLink=i}function i(e){var t=["vbscript","javascript","file"],n=e.trim().toLowerCase()
return n=a.replaceEntities(n),-1!==n.indexOf(":")&&-1!==t.indexOf(n.split(":")[0])?!1:!0}var o=e("./ruler"),s=e("./rules_inline/state_inline"),a=e("./common/utils"),u=[["text",e("./rules_inline/text")],["newline",e("./rules_inline/newline")],["escape",e("./rules_inline/escape")],["backticks",e("./rules_inline/backticks")],["del",e("./rules_inline/del")],["ins",e("./rules_inline/ins")],["mark",e("./rules_inline/mark")],["emphasis",e("./rules_inline/emphasis")],["sub",e("./rules_inline/sub")],["sup",e("./rules_inline/sup")],["links",e("./rules_inline/links")],["footnote_inline",e("./rules_inline/footnote_inline")],["footnote_ref",e("./rules_inline/footnote_ref")],["autolink",e("./rules_inline/autolink")],["htmltag",e("./rules_inline/htmltag")],["entity",e("./rules_inline/entity")]]
r.prototype.skipToken=function(e){var t,n,r=this.ruler.getRules(""),i=r.length,o=e.pos
if((n=e.cacheGet(o))>0)return void(e.pos=n)
for(t=0;i>t;t++)if(r[t](e,!0))return void e.cacheSet(o,e.pos)
e.pos++,e.cacheSet(o,e.pos)},r.prototype.tokenize=function(e){for(var t,n,r=this.ruler.getRules(""),i=r.length,o=e.posMax;e.pos<o;){for(n=0;i>n&&!(t=r[n](e,!1));n++);if(t){if(e.pos>=o)break}else e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},r.prototype.parse=function(e,t,n,r){var i=new s(e,this,t,n,r)
this.tokenize(i)},t.exports=r},{"./common/utils":115,"./ruler":129,"./rules_inline/autolink":153,"./rules_inline/backticks":154,"./rules_inline/del":155,"./rules_inline/emphasis":156,"./rules_inline/entity":157,"./rules_inline/escape":158,"./rules_inline/footnote_inline":159,"./rules_inline/footnote_ref":160,"./rules_inline/htmltag":161,"./rules_inline/ins":162,"./rules_inline/links":163,"./rules_inline/mark":164,"./rules_inline/newline":165,"./rules_inline/state_inline":166,"./rules_inline/sub":167,"./rules_inline/sup":168,"./rules_inline/text":169}],128:[function(e,t,n){"use strict"
function r(){this.rules=i.assign({},o),this.getBreak=o.getBreak}var i=e("./common/utils"),o=e("./rules")
t.exports=r,r.prototype.renderInline=function(e,t,n){for(var r=this.rules,i=e.length,o=0,s="";i--;)s+=r[e[o].type](e,o++,t,n,this)
return s},r.prototype.render=function(e,t,n){for(var r=this.rules,i=e.length,o=-1,s="";++o<i;)s+="inline"===e[o].type?this.renderInline(e[o].children,t,n):r[e[o].type](e,o,t,n,this)
return s}},{"./common/utils":115,"./rules":130}],129:[function(e,t,n){"use strict"
function r(){this.__rules__=[],this.__cache__=null}r.prototype.__find__=function(e){for(var t=this.__rules__.length,n=-1;t--;)if(this.__rules__[++n].name===e)return n
return-1},r.prototype.__compile__=function(){var e=this,t=[""]
e.__rules__.forEach(function(e){e.enabled&&e.alt.forEach(function(e){t.indexOf(e)<0&&t.push(e)})}),e.__cache__={},t.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||e.__cache__[t].push(n.fn))})})},r.prototype.at=function(e,t,n){var r=this.__find__(e),i=n||{}
if(-1===r)throw new Error("Parser rule not found: "+e)
this.__rules__[r].fn=t,this.__rules__[r].alt=i.alt||[],this.__cache__=null},r.prototype.before=function(e,t,n,r){var i=this.__find__(e),o=r||{}
if(-1===i)throw new Error("Parser rule not found: "+e)
this.__rules__.splice(i,0,{name:t,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null},r.prototype.after=function(e,t,n,r){var i=this.__find__(e),o=r||{}
if(-1===i)throw new Error("Parser rule not found: "+e)
this.__rules__.splice(i+1,0,{name:t,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null},r.prototype.push=function(e,t,n){var r=n||{}
this.__rules__.push({name:e,enabled:!0,fn:t,alt:r.alt||[]}),this.__cache__=null},r.prototype.enable=function(e,t){e=Array.isArray(e)?e:[e],t&&this.__rules__.forEach(function(e){e.enabled=!1}),e.forEach(function(e){var t=this.__find__(e)
if(0>t)throw new Error("Rules manager: invalid rule name "+e)
this.__rules__[t].enabled=!0},this),this.__cache__=null},r.prototype.disable=function(e){e=Array.isArray(e)?e:[e],e.forEach(function(e){var t=this.__find__(e)
if(0>t)throw new Error("Rules manager: invalid rule name "+e)
this.__rules__[t].enabled=!1},this),this.__cache__=null},r.prototype.getRules=function(e){return null===this.__cache__&&this.__compile__(),this.__cache__[e]},t.exports=r},{}],130:[function(e,t,n){"use strict"
function r(e,t){return++t>=e.length-2?t:"paragraph_open"===e[t].type&&e[t].tight&&"inline"===e[t+1].type&&0===e[t+1].content.length&&"paragraph_close"===e[t+2].type&&e[t+2].tight?r(e,t+2):t}var i=e("./common/utils").has,o=e("./common/utils").unescapeMd,s=e("./common/utils").replaceEntities,a=e("./common/utils").escapeHtml,u={}
u.blockquote_open=function(){return"<blockquote>\n"},u.blockquote_close=function(e,t){return"</blockquote>"+c(e,t)},u.code=function(e,t){return e[t].block?"<pre><code>"+a(e[t].content)+"</code></pre>"+c(e,t):"<code>"+a(e[t].content)+"</code>"},u.fence=function(e,t,n,r,u){var l,h,f=e[t],p="",d=n.langPrefix,m=""
if(f.params){if(l=f.params.split(/\s+/g)[0],i(u.rules.fence_custom,l))return u.rules.fence_custom[l](e,t,n,r,u)
m=a(s(o(l))),p=' class="'+d+m+'"'}return h=n.highlight?n.highlight(f.content,m)||a(f.content):a(f.content),"<pre><code"+p+">"+h+"</code></pre>"+c(e,t)},u.fence_custom={},u.heading_open=function(e,t){return"<h"+e[t].hLevel+">"},u.heading_close=function(e,t){return"</h"+e[t].hLevel+">\n"},u.hr=function(e,t,n){return(n.xhtmlOut?"<hr />":"<hr>")+c(e,t)},u.bullet_list_open=function(){return"<ul>\n"},u.bullet_list_close=function(e,t){return"</ul>"+c(e,t)},u.list_item_open=function(){return"<li>"},u.list_item_close=function(){return"</li>\n"},u.ordered_list_open=function(e,t){var n=e[t],r=n.order>1?' start="'+n.order+'"':""
return"<ol"+r+">\n"},u.ordered_list_close=function(e,t){return"</ol>"+c(e,t)},u.paragraph_open=function(e,t){return e[t].tight?"":"<p>"},u.paragraph_close=function(e,t){var n=!(e[t].tight&&t&&"inline"===e[t-1].type&&!e[t-1].content)
return(e[t].tight?"":"</p>")+(n?c(e,t):"")},u.link_open=function(e,t){var n=e[t].title?' title="'+a(s(e[t].title))+'"':""
return'<a href="'+a(e[t].href)+'"'+n+">"},u.link_close=function(){return"</a>"},u.image=function(e,t,n){var r=' src="'+a(e[t].src)+'"',i=e[t].title?' title="'+a(s(e[t].title))+'"':"",o=' alt="'+(e[t].alt?a(s(e[t].alt)):"")+'"',u=n.xhtmlOut?" /":""
return"<img"+r+o+i+u+">"},u.table_open=function(){return"<table>\n"},u.table_close=function(){return"</table>\n"},u.thead_open=function(){return"<thead>\n"},u.thead_close=function(){return"</thead>\n"},u.tbody_open=function(){return"<tbody>\n"},u.tbody_close=function(){return"</tbody>\n"},u.tr_open=function(){return"<tr>"},u.tr_close=function(){return"</tr>\n"},u.th_open=function(e,t){var n=e[t]
return"<th"+(n.align?' style="text-align:'+n.align+'"':"")+">"},u.th_close=function(){return"</th>"},u.td_open=function(e,t){var n=e[t]
return"<td"+(n.align?' style="text-align:'+n.align+'"':"")+">"},u.td_close=function(){return"</td>"},u.strong_open=function(){return"<strong>"},u.strong_close=function(){return"</strong>"},u.em_open=function(){return"<em>"},u.em_close=function(){return"</em>"},u.del_open=function(){return"<del>"},u.del_close=function(){return"</del>"},u.ins_open=function(){return"<ins>"},u.ins_close=function(){return"</ins>"},u.mark_open=function(){return"<mark>"},u.mark_close=function(){return"</mark>"},u.sub=function(e,t){return"<sub>"+a(e[t].content)+"</sub>"},u.sup=function(e,t){return"<sup>"+a(e[t].content)+"</sup>"},u.hardbreak=function(e,t,n){return n.xhtmlOut?"<br />\n":"<br>\n"},u.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?"<br />\n":"<br>\n":"\n"},u.text=function(e,t){return a(e[t].content)},u.htmlblock=function(e,t){return e[t].content},u.htmltag=function(e,t){return e[t].content},u.abbr_open=function(e,t){return'<abbr title="'+a(s(e[t].title))+'">'},u.abbr_close=function(){return"</abbr>"},u.footnote_ref=function(e,t){var n=Number(e[t].id+1).toString(),r="fnref"+n
return e[t].subId>0&&(r+=":"+e[t].subId),'<sup class="footnote-ref"><a href="#fn'+n+'" id="'+r+'">['+n+"]</a></sup>"},u.footnote_block_open=function(e,t,n){var r=n.xhtmlOut?'<hr class="footnotes-sep" />\n':'<hr class="footnotes-sep">\n'
return r+'<section class="footnotes">\n<ol class="footnotes-list">\n'},u.footnote_block_close=function(){return"</ol>\n</section>\n"},u.footnote_open=function(e,t){var n=Number(e[t].id+1).toString()
return'<li id="fn'+n+'"  class="footnote-item">'},u.footnote_close=function(){return"</li>\n"},u.footnote_anchor=function(e,t){var n=Number(e[t].id+1).toString(),r="fnref"+n
return e[t].subId>0&&(r+=":"+e[t].subId),' <a href="#'+r+'" class="footnote-backref">↩</a>'},u.dl_open=function(){return"<dl>\n"},u.dt_open=function(){return"<dt>"},u.dd_open=function(){return"<dd>"},u.dl_close=function(){return"</dl>\n"},u.dt_close=function(){return"</dt>\n"},u.dd_close=function(){return"</dd>\n"}
var c=u.getBreak=function(e,t){return t=r(e,t),t<e.length&&"list_item_close"===e[t].type?"":"\n"}
t.exports=u},{"./common/utils":115}],131:[function(e,t,n){"use strict"
t.exports=function(e,t,n,r){var i,o,s,a,u,c,l,h,f,p,d,m=e.bMarks[t]+e.tShift[t],g=e.eMarks[t]
if(m>g)return!1
if(62!==e.src.charCodeAt(m++))return!1
if(e.level>=e.options.maxNesting)return!1
if(r)return!0
for(32===e.src.charCodeAt(m)&&m++,u=e.blkIndent,e.blkIndent=0,a=[e.bMarks[t]],e.bMarks[t]=m,m=g>m?e.skipSpaces(m):m,o=m>=g,s=[e.tShift[t]],e.tShift[t]=m-e.bMarks[t],h=e.parser.ruler.getRules("blockquote"),i=t+1;n>i&&(m=e.bMarks[i]+e.tShift[i],g=e.eMarks[i],!(m>=g));i++)if(62!==e.src.charCodeAt(m++)){if(o)break
for(d=!1,f=0,p=h.length;p>f;f++)if(h[f](e,i,n,!0)){d=!0
break}if(d)break
a.push(e.bMarks[i]),s.push(e.tShift[i]),e.tShift[i]=-1337}else 32===e.src.charCodeAt(m)&&m++,a.push(e.bMarks[i]),e.bMarks[i]=m,m=g>m?e.skipSpaces(m):m,o=m>=g,s.push(e.tShift[i]),e.tShift[i]=m-e.bMarks[i]
for(c=e.parentType,e.parentType="blockquote",e.tokens.push({type:"blockquote_open",lines:l=[t,0],level:e.level++}),e.parser.tokenize(e,t,i),e.tokens.push({type:"blockquote_close",level:--e.level}),e.parentType=c,l[1]=e.line,f=0;f<s.length;f++)e.bMarks[f+t]=a[f],e.tShift[f+t]=s[f]
return e.blkIndent=u,!0}},{}],132:[function(e,t,n){"use strict"
t.exports=function(e,t,n){var r,i
if(e.tShift[t]-e.blkIndent<4)return!1
for(i=r=t+1;n>r;)if(e.isEmpty(r))r++
else{if(!(e.tShift[r]-e.blkIndent>=4))break
r++,i=r}return e.line=r,e.tokens.push({type:"code",content:e.getLines(t,i,4+e.blkIndent,!0),block:!0,lines:[t,e.line],level:e.level}),!0}},{}],133:[function(e,t,n){"use strict"
function r(e,t){var n,r,i=e.bMarks[t]+e.tShift[t],o=e.eMarks[t]
return i>=o?-1:(r=e.src.charCodeAt(i++),126!==r&&58!==r?-1:(n=e.skipSpaces(i),i===n?-1:n>=o?-1:n))}function i(e,t){var n,r,i=e.level+2
for(n=t+2,r=e.tokens.length-2;r>n;n++)e.tokens[n].level===i&&"paragraph_open"===e.tokens[n].type&&(e.tokens[n+2].tight=!0,e.tokens[n].tight=!0,n+=2)}t.exports=function(e,t,n,o){var s,a,u,c,l,h,f,p,d,m,g,v,y,b
if(o)return e.ddIndent<0?!1:r(e,t)>=0
if(f=t+1,e.isEmpty(f)&&++f>n)return!1
if(e.tShift[f]<e.blkIndent)return!1
if(s=r(e,f),0>s)return!1
if(e.level>=e.options.maxNesting)return!1
h=e.tokens.length,e.tokens.push({type:"dl_open",lines:l=[t,0],level:e.level++}),u=t,a=f
e:for(;;){for(b=!0,y=!1,e.tokens.push({type:"dt_open",lines:[u,u],level:e.level++}),e.tokens.push({type:"inline",content:e.getLines(u,u+1,e.blkIndent,!1).trim(),level:e.level+1,lines:[u,u],children:[]}),e.tokens.push({type:"dt_close",level:--e.level});;){if(e.tokens.push({type:"dd_open",lines:c=[f,0],level:e.level++}),v=e.tight,d=e.ddIndent,p=e.blkIndent,g=e.tShift[a],m=e.parentType,e.blkIndent=e.ddIndent=e.tShift[a]+2,e.tShift[a]=s-e.bMarks[a],e.tight=!0,e.parentType="deflist",e.parser.tokenize(e,a,n,!0),(!e.tight||y)&&(b=!1),y=e.line-a>1&&e.isEmpty(e.line-1),e.tShift[a]=g,e.tight=v,e.parentType=m,e.blkIndent=p,e.ddIndent=d,e.tokens.push({type:"dd_close",level:--e.level}),c[1]=f=e.line,f>=n)break e
if(e.tShift[f]<e.blkIndent)break e
if(s=r(e,f),0>s)break
a=f}if(f>=n)break
if(u=f,e.isEmpty(u))break
if(e.tShift[u]<e.blkIndent)break
if(a=u+1,a>=n)break
if(e.isEmpty(a)&&a++,a>=n)break
if(e.tShift[a]<e.blkIndent)break
if(s=r(e,a),0>s)break}return e.tokens.push({type:"dl_close",level:--e.level}),l[1]=f,e.line=f,b&&i(e,h),!0}},{}],134:[function(e,t,n){"use strict"
t.exports=function(e,t,n,r){var i,o,s,a,u,c=!1,l=e.bMarks[t]+e.tShift[t],h=e.eMarks[t]
if(l+3>h)return!1
if(i=e.src.charCodeAt(l),126!==i&&96!==i)return!1
if(u=l,l=e.skipChars(l,i),o=l-u,3>o)return!1
if(s=e.src.slice(l,h).trim(),s.indexOf("`")>=0)return!1
if(r)return!0
for(a=t;(a++,!(a>=n))&&(l=u=e.bMarks[a]+e.tShift[a],h=e.eMarks[a],!(h>l&&e.tShift[a]<e.blkIndent));)if(e.src.charCodeAt(l)===i&&!(e.tShift[a]-e.blkIndent>=4||(l=e.skipChars(l,i),o>l-u||(l=e.skipSpaces(l),h>l)))){c=!0
break}return o=e.tShift[t],e.line=a+(c?1:0),e.tokens.push({type:"fence",params:s,content:e.getLines(t+1,a,o,!0),lines:[t,e.line],level:e.level}),!0}},{}],135:[function(e,t,n){"use strict"
t.exports=function(e,t,n,r){var i,o,s,a,u,c=e.bMarks[t]+e.tShift[t],l=e.eMarks[t]
if(c+4>l)return!1
if(91!==e.src.charCodeAt(c))return!1
if(94!==e.src.charCodeAt(c+1))return!1
if(e.level>=e.options.maxNesting)return!1
for(a=c+2;l>a;a++){if(32===e.src.charCodeAt(a))return!1
if(93===e.src.charCodeAt(a))break}return a===c+2?!1:a+1>=l||58!==e.src.charCodeAt(++a)?!1:r?!0:(a++,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={}),u=e.src.slice(c+2,a-2),e.env.footnotes.refs[":"+u]=-1,e.tokens.push({type:"footnote_reference_open",label:u,level:e.level++}),i=e.bMarks[t],o=e.tShift[t],s=e.parentType,e.tShift[t]=e.skipSpaces(a)-a,e.bMarks[t]=a,e.blkIndent+=4,e.parentType="footnote",e.tShift[t]<e.blkIndent&&(e.tShift[t]+=e.blkIndent,e.bMarks[t]-=e.blkIndent),e.parser.tokenize(e,t,n,!0),e.parentType=s,e.blkIndent-=4,e.tShift[t]=o,e.bMarks[t]=i,e.tokens.push({type:"footnote_reference_close",level:--e.level}),!0)}},{}],136:[function(e,t,n){"use strict"
t.exports=function(e,t,n,r){var i,o,s,a=e.bMarks[t]+e.tShift[t],u=e.eMarks[t]
if(a>=u)return!1
if(i=e.src.charCodeAt(a),35!==i||a>=u)return!1
for(o=1,i=e.src.charCodeAt(++a);35===i&&u>a&&6>=o;)o++,i=e.src.charCodeAt(++a)
return o>6||u>a&&32!==i?!1:r?!0:(u=e.skipCharsBack(u,32,a),s=e.skipCharsBack(u,35,a),s>a&&32===e.src.charCodeAt(s-1)&&(u=s),e.line=t+1,e.tokens.push({type:"heading_open",hLevel:o,lines:[t,e.line],level:e.level}),u>a&&e.tokens.push({type:"inline",content:e.src.slice(a,u).trim(),level:e.level+1,lines:[t,e.line],children:[]}),e.tokens.push({type:"heading_close",hLevel:o,level:e.level}),!0)}},{}],137:[function(e,t,n){"use strict"
t.exports=function(e,t,n,r){var i,o,s,a=e.bMarks[t],u=e.eMarks[t]
if(a+=e.tShift[t],a>u)return!1
if(i=e.src.charCodeAt(a++),42!==i&&45!==i&&95!==i)return!1
for(o=1;u>a;){if(s=e.src.charCodeAt(a++),s!==i&&32!==s)return!1
s===i&&o++}return 3>o?!1:r?!0:(e.line=t+1,e.tokens.push({type:"hr",lines:[t,e.line],level:e.level}),!0)}},{}],138:[function(e,t,n){"use strict"
function r(e){var t=32|e
return t>=97&&122>=t}var i=e("../common/html_blocks"),o=/^<([a-zA-Z]{1,15})[\s\/>]/,s=/^<\/([a-zA-Z]{1,15})[\s>]/
t.exports=function(e,t,n,a){var u,c,l,h=e.bMarks[t],f=e.eMarks[t],p=e.tShift[t]
if(h+=p,!e.options.html)return!1
if(p>3||h+2>=f)return!1
if(60!==e.src.charCodeAt(h))return!1
if(u=e.src.charCodeAt(h+1),33===u||63===u){if(a)return!0}else{if(47!==u&&!r(u))return!1
if(47===u){if(c=e.src.slice(h,f).match(s),!c)return!1}else if(c=e.src.slice(h,f).match(o),!c)return!1
if(i[c[1].toLowerCase()]!==!0)return!1
if(a)return!0}for(l=t+1;l<e.lineMax&&!e.isEmpty(l);)l++
return e.line=l,e.tokens.push({type:"htmlblock",level:e.level,lines:[t,e.line],content:e.getLines(t,l,0,!0)}),!0}},{"../common/html_blocks":112}],139:[function(e,t,n){"use strict"
t.exports=function(e,t,n){var r,i,o,s=t+1
return s>=n?!1:e.tShift[s]<e.blkIndent?!1:e.tShift[s]-e.blkIndent>3?!1:(i=e.bMarks[s]+e.tShift[s],o=e.eMarks[s],i>=o?!1:(r=e.src.charCodeAt(i),45!==r&&61!==r?!1:(i=e.skipChars(i,r),i=e.skipSpaces(i),o>i?!1:(i=e.bMarks[t]+e.tShift[t],e.line=s+1,e.tokens.push({type:"heading_open",hLevel:61===r?1:2,lines:[t,e.line],level:e.level}),e.tokens.push({type:"inline",content:e.src.slice(i,e.eMarks[t]).trim(),level:e.level+1,lines:[t,e.line-1],children:[]}),e.tokens.push({type:"heading_close",hLevel:61===r?1:2,level:e.level}),!0))))}},{}],140:[function(e,t,n){"use strict"
function r(e,t){var n,r,i
return r=e.bMarks[t]+e.tShift[t],i=e.eMarks[t],r>=i?-1:(n=e.src.charCodeAt(r++),42!==n&&45!==n&&43!==n?-1:i>r&&32!==e.src.charCodeAt(r)?-1:r)}function i(e,t){var n,r=e.bMarks[t]+e.tShift[t],i=e.eMarks[t]
if(r+1>=i)return-1
if(n=e.src.charCodeAt(r++),48>n||n>57)return-1
for(;;){if(r>=i)return-1
if(n=e.src.charCodeAt(r++),!(n>=48&&57>=n)){if(41===n||46===n)break
return-1}}return i>r&&32!==e.src.charCodeAt(r)?-1:r}function o(e,t){var n,r,i=e.level+2
for(n=t+2,r=e.tokens.length-2;r>n;n++)e.tokens[n].level===i&&"paragraph_open"===e.tokens[n].type&&(e.tokens[n+2].tight=!0,e.tokens[n].tight=!0,n+=2)}t.exports=function(e,t,n,s){var a,u,c,l,h,f,p,d,m,g,v,y,b,w,x,k,E,_,S,A,T,C,O=!0
if((d=i(e,t))>=0)b=!0
else{if(!((d=r(e,t))>=0))return!1
b=!1}if(e.level>=e.options.maxNesting)return!1
if(y=e.src.charCodeAt(d-1),s)return!0
for(x=e.tokens.length,b?(p=e.bMarks[t]+e.tShift[t],v=Number(e.src.substr(p,d-p-1)),e.tokens.push({type:"ordered_list_open",order:v,lines:E=[t,0],level:e.level++})):e.tokens.push({type:"bullet_list_open",lines:E=[t,0],level:e.level++}),a=t,k=!1,S=e.parser.ruler.getRules("list");!(!(n>a)||(w=e.skipSpaces(d),m=e.eMarks[a],g=w>=m?1:w-d,g>4&&(g=1),1>g&&(g=1),u=d-e.bMarks[a]+g,e.tokens.push({type:"list_item_open",lines:_=[t,0],level:e.level++}),l=e.blkIndent,h=e.tight,c=e.tShift[t],f=e.parentType,e.tShift[t]=w-e.bMarks[t],e.blkIndent=u,e.tight=!0,e.parentType="list",e.parser.tokenize(e,t,n,!0),(!e.tight||k)&&(O=!1),k=e.line-t>1&&e.isEmpty(e.line-1),e.blkIndent=l,e.tShift[t]=c,e.tight=h,e.parentType=f,e.tokens.push({type:"list_item_close",level:--e.level}),a=t=e.line,_[1]=a,w=e.bMarks[t],a>=n)||e.isEmpty(a)||e.tShift[a]<e.blkIndent);){for(C=!1,A=0,T=S.length;T>A;A++)if(S[A](e,a,n,!0)){C=!0
break}if(C)break
if(b){if(d=i(e,a),0>d)break}else if(d=r(e,a),0>d)break
if(y!==e.src.charCodeAt(d-1))break}return e.tokens.push({type:b?"ordered_list_close":"bullet_list_close",level:--e.level}),E[1]=a,e.line=a,O&&o(e,x),!0}},{}],141:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i,o,s,a,u=t+1
if(n=e.lineMax,n>u&&!e.isEmpty(u))for(a=e.parser.ruler.getRules("paragraph");n>u&&!e.isEmpty(u);u++)if(!(e.tShift[u]-e.blkIndent>3)){for(i=!1,o=0,s=a.length;s>o;o++)if(a[o](e,u,n,!0)){i=!0
break}if(i)break}return r=e.getLines(t,u,e.blkIndent,!1).trim(),e.line=u,r.length&&(e.tokens.push({type:"paragraph_open",tight:!1,lines:[t,e.line],level:e.level}),e.tokens.push({type:"inline",content:r,level:e.level+1,lines:[t,e.line],children:[]}),e.tokens.push({type:"paragraph_close",tight:!1,level:e.level})),!0}},{}],142:[function(e,t,n){"use strict"
function r(e,t,n,r,i){var o,s,a,u,c,l,h
for(this.src=e,this.parser=t,this.options=n,this.env=r,this.tokens=i,this.bMarks=[],this.eMarks=[],this.tShift=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.parentType="root",this.ddIndent=-1,this.level=0,this.result="",s=this.src,l=0,h=!1,a=u=l=0,c=s.length;c>u;u++){if(o=s.charCodeAt(u),!h){if(32===o){l++
continue}h=!0}(10===o||u===c-1)&&(10!==o&&u++,this.bMarks.push(a),this.eMarks.push(u),this.tShift.push(l),h=!1,l=0,a=u+1)}this.bMarks.push(s.length),this.eMarks.push(s.length),this.tShift.push(0),this.lineMax=this.bMarks.length-1}r.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},r.prototype.skipEmptyLines=function(e){for(var t=this.lineMax;t>e&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},r.prototype.skipSpaces=function(e){for(var t=this.src.length;t>e&&32===this.src.charCodeAt(e);e++);return e},r.prototype.skipChars=function(e,t){for(var n=this.src.length;n>e&&this.src.charCodeAt(e)===t;e++);return e},r.prototype.skipCharsBack=function(e,t,n){if(n>=e)return e
for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1
return e},r.prototype.getLines=function(e,t,n,r){var i,o,s,a,u,c=e
if(e>=t)return""
if(c+1===t)return o=this.bMarks[c]+Math.min(this.tShift[c],n),s=r?this.bMarks[t]:this.eMarks[t-1],this.src.slice(o,s)
for(a=new Array(t-e),i=0;t>c;c++,i++)u=this.tShift[c],u>n&&(u=n),0>u&&(u=0),o=this.bMarks[c]+u,s=t>c+1||r?this.eMarks[c]+1:this.eMarks[c],a[i]=this.src.slice(o,s)
return a.join("")},t.exports=r},{}],143:[function(e,t,n){"use strict"
function r(e,t){var n=e.bMarks[t]+e.blkIndent,r=e.eMarks[t]
return e.src.substr(n,r-n)}t.exports=function(e,t,n,i){var o,s,a,u,c,l,h,f,p,d
if(t+2>n)return!1
if(c=t+1,e.tShift[c]<e.blkIndent)return!1
if(a=e.bMarks[c]+e.tShift[c],a>=e.eMarks[c])return!1
if(o=e.src.charCodeAt(a),124!==o&&45!==o&&58!==o)return!1
if(s=r(e,t+1),!/^[-:| ]+$/.test(s))return!1
if(l=s.split("|"),2>=l)return!1
for(h=[],u=0;u<l.length;u++){if(f=l[u].trim(),!f){if(0===u||u===l.length-1)continue
return!1}if(!/^:?-+:?$/.test(f))return!1
h.push(58===f.charCodeAt(f.length-1)?58===f.charCodeAt(0)?"center":"right":58===f.charCodeAt(0)?"left":"")}if(s=r(e,t).trim(),-1===s.indexOf("|"))return!1
if(l=s.replace(/^\||\|$/g,"").split("|"),h.length!==l.length)return!1
if(i)return!0
for(e.tokens.push({type:"table_open",lines:p=[t,0],level:e.level++}),e.tokens.push({type:"thead_open",lines:[t,t+1],level:e.level++}),e.tokens.push({type:"tr_open",lines:[t,t+1],level:e.level++}),u=0;u<l.length;u++)e.tokens.push({type:"th_open",align:h[u],lines:[t,t+1],level:e.level++}),e.tokens.push({type:"inline",content:l[u].trim(),lines:[t,t+1],level:e.level,children:[]}),e.tokens.push({type:"th_close",level:--e.level})
for(e.tokens.push({type:"tr_close",level:--e.level}),e.tokens.push({type:"thead_close",level:--e.level}),e.tokens.push({type:"tbody_open",lines:d=[t+2,0],level:e.level++}),c=t+2;n>c&&!(e.tShift[c]<e.blkIndent)&&(s=r(e,c).trim(),-1!==s.indexOf("|"));c++){for(l=s.replace(/^\||\|$/g,"").split("|"),e.tokens.push({type:"tr_open",level:e.level++}),u=0;u<l.length;u++)e.tokens.push({type:"td_open",align:h[u],level:e.level++}),e.tokens.push({type:"inline",content:l[u].replace(/^\|? *| *\|?$/g,""),level:e.level,children:[]}),e.tokens.push({type:"td_close",level:--e.level})
e.tokens.push({type:"tr_close",level:--e.level})}return e.tokens.push({type:"tbody_close",level:--e.level}),e.tokens.push({type:"table_close",level:--e.level}),p[1]=d[1]=c,e.line=c,!0}},{}],144:[function(e,t,n){"use strict"
function r(e,t,n,r){var s,a,u,c,l,h
if(42!==e.charCodeAt(0))return-1
if(91!==e.charCodeAt(1))return-1
if(-1===e.indexOf("]:"))return-1
if(s=new i(e,t,n,r,[]),a=o(s,1),0>a||58!==e.charCodeAt(a+1))return-1
for(c=s.posMax,u=a+2;c>u&&10!==s.src.charCodeAt(u);u++);return l=e.slice(2,a),h=e.slice(a+2,u).trim(),0===h.length?-1:(r.abbreviations||(r.abbreviations={}),"undefined"==typeof r.abbreviations[":"+l]&&(r.abbreviations[":"+l]=h),u)}var i=e("../rules_inline/state_inline"),o=e("../helpers/parse_link_label")
t.exports=function(e){var t,n,i,o,s=e.tokens
if(!e.inlineMode)for(t=1,n=s.length-1;n>t;t++)if("paragraph_open"===s[t-1].type&&"inline"===s[t].type&&"paragraph_close"===s[t+1].type){for(i=s[t].content;i.length&&(o=r(i,e.inline,e.options,e.env),!(0>o));)i=i.slice(o).trim()
s[t].content=i,i.length||(s[t-1].tight=!0,s[t+1].tight=!0)}}},{"../helpers/parse_link_label":122,"../rules_inline/state_inline":166}],145:[function(e,t,n){"use strict"
function r(e){return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1")}var i=" \n()[]'\".,!?-"
t.exports=function(e){var t,n,o,s,a,u,c,l,h,f,p,d,m=e.tokens
if(e.env.abbreviations)for(e.env.abbrRegExp||(d="(^|["+i.split("").map(r).join("")+"])("+Object.keys(e.env.abbreviations).map(function(e){return e.substr(1)}).sort(function(e,t){return t.length-e.length}).map(r).join("|")+")($|["+i.split("").map(r).join("")+"])",e.env.abbrRegExp=new RegExp(d,"g")),f=e.env.abbrRegExp,n=0,o=m.length;o>n;n++)if("inline"===m[n].type)for(s=m[n].children,t=s.length-1;t>=0;t--)if(a=s[t],"text"===a.type){for(l=0,u=a.content,f.lastIndex=0,h=a.level,c=[];p=f.exec(u);)f.lastIndex>l&&c.push({type:"text",content:u.slice(l,p.index+p[1].length),level:h}),c.push({type:"abbr_open",title:e.env.abbreviations[":"+p[2]],level:h++}),c.push({type:"text",content:p[2],level:h}),c.push({type:"abbr_close",level:--h}),l=f.lastIndex-p[3].length
c.length&&(l<u.length&&c.push({type:"text",content:u.slice(l),level:h}),m[n].children=s=[].concat(s.slice(0,t),c,s.slice(t+1)))}}},{}],146:[function(e,t,n){"use strict"
t.exports=function(e){e.inlineMode?e.tokens.push({type:"inline",content:e.src.replace(/\n/g," ").trim(),level:0,lines:[0,1],children:[]}):e.block.parse(e.src,e.options,e.env,e.tokens)}},{}],147:[function(e,t,n){"use strict"
t.exports=function(e){var t,n,r,i,o,s,a,u,c,l=0,h=!1,f={}
if(e.env.footnotes&&(e.tokens=e.tokens.filter(function(e){return"footnote_reference_open"===e.type?(h=!0,u=[],c=e.label,!1):"footnote_reference_close"===e.type?(h=!1,f[":"+c]=u,!1):(h&&u.push(e),!h)}),e.env.footnotes.list)){for(s=e.env.footnotes.list,e.tokens.push({type:"footnote_block_open",level:l++}),t=0,n=s.length;n>t;t++){for(e.tokens.push({type:"footnote_open",id:t,level:l++}),s[t].tokens?(a=[],a.push({type:"paragraph_open",tight:!1,level:l++}),a.push({type:"inline",content:"",level:l,children:s[t].tokens}),a.push({type:"paragraph_close",tight:!1,level:--l})):s[t].label&&(a=f[":"+s[t].label]),e.tokens=e.tokens.concat(a),o="paragraph_close"===e.tokens[e.tokens.length-1].type?e.tokens.pop():null,i=s[t].count>0?s[t].count:1,r=0;i>r;r++)e.tokens.push({type:"footnote_anchor",id:t,subId:r,level:l})
o&&e.tokens.push(o),e.tokens.push({type:"footnote_close",level:--l})}e.tokens.push({type:"footnote_block_close",level:--l})}}},{}],148:[function(e,t,n){"use strict"
t.exports=function(e){var t,n,r,i=e.tokens
for(n=0,r=i.length;r>n;n++)t=i[n],"inline"===t.type&&e.inline.parse(t.content,e.options,e.env,t.children)}},{}],149:[function(e,t,n){"use strict"
function r(e){return/^<a[>\s]/i.test(e)}function i(e){return/^<\/a\s*>/i.test(e)}function o(){var e=[],t=new s({stripPrefix:!1,url:!0,email:!0,twitter:!1,replaceFn:function(t,n){switch(n.getType()){case"url":e.push({text:n.matchedText,url:n.getUrl()})
break
case"email":e.push({text:n.matchedText,url:"mailto:"+n.getEmail().replace(/^mailto:/i,"")})}return!1}})
return{links:e,autolinker:t}}var s=e("autolinker"),a=/www|@|\:\/\//
t.exports=function(e){var t,n,s,u,c,l,h,f,p,d,m,g,v,y=e.tokens,b=null
if(e.options.linkify)for(n=0,s=y.length;s>n;n++)if("inline"===y[n].type)for(u=y[n].children,m=0,t=u.length-1;t>=0;t--)if(c=u[t],"link_close"!==c.type){if("htmltag"===c.type&&(r(c.content)&&m>0&&m--,i(c.content)&&m++),!(m>0)&&"text"===c.type&&a.test(c.content)){if(b||(b=o(),g=b.links,v=b.autolinker),l=c.content,g.length=0,v.link(l),!g.length)continue
for(h=[],d=c.level,f=0;f<g.length;f++)e.inline.validateLink(g[f].url)&&(p=l.indexOf(g[f].text),p&&(d=d,h.push({type:"text",content:l.slice(0,p),level:d})),h.push({type:"link_open",href:g[f].url,title:"",level:d++}),h.push({type:"text",content:g[f].text,level:d}),h.push({type:"link_close",level:--d}),l=l.slice(p+g[f].text.length))
l.length&&h.push({type:"text",content:l,level:d}),y[n].children=u=[].concat(u.slice(0,t),h,u.slice(t+1))}}else for(t--;u[t].level!==c.level&&"link_open"!==u[t].type;)t--}},{autolinker:170}],150:[function(e,t,n){"use strict"
function r(e,t,n,r){var c,l,h,f,p,d,m,g,v
if(91!==e.charCodeAt(0))return-1
if(-1===e.indexOf("]:"))return-1
if(c=new i(e,t,n,r,[]),l=o(c,0),0>l||58!==e.charCodeAt(l+1))return-1
for(f=c.posMax,h=l+2;f>h&&(p=c.src.charCodeAt(h),32===p||10===p);h++);if(!s(c,h))return-1
for(m=c.linkContent,h=c.pos,d=h,h+=1;f>h&&(p=c.src.charCodeAt(h),32===p||10===p);h++);for(f>h&&d!==h&&a(c,h)?(g=c.linkContent,h=c.pos):(g="",h=d);f>h&&32===c.src.charCodeAt(h);)h++
return f>h&&10!==c.src.charCodeAt(h)?-1:(v=u(e.slice(1,l)),"undefined"==typeof r.references[v]&&(r.references[v]={title:g,href:m}),h)}var i=e("../rules_inline/state_inline"),o=e("../helpers/parse_link_label"),s=e("../helpers/parse_link_destination"),a=e("../helpers/parse_link_title"),u=e("../helpers/normalize_reference")
t.exports=function(e){var t,n,i,o,s=e.tokens
if(e.env.references=e.env.references||{},!e.inlineMode)for(t=1,n=s.length-1;n>t;t++)if("inline"===s[t].type&&"paragraph_open"===s[t-1].type&&"paragraph_close"===s[t+1].type){for(i=s[t].content;i.length&&(o=r(i,e.inline,e.options,e.env),!(0>o));)i=i.slice(o).trim()
s[t].content=i,i.length||(s[t-1].tight=!0,s[t+1].tight=!0)}}},{"../helpers/normalize_reference":120,"../helpers/parse_link_destination":121,"../helpers/parse_link_label":122,"../helpers/parse_link_title":123,"../rules_inline/state_inline":166}],151:[function(e,t,n){"use strict"
function r(e){return e.indexOf("(")<0?e:e.replace(o,function(e,t){return s[t.toLowerCase()]})}var i=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,o=/\((c|tm|r|p)\)/gi,s={c:"©",r:"®",p:"§",tm:"™"}
t.exports=function(e){var t,n,o,s,a
if(e.options.typographer)for(a=e.tokens.length-1;a>=0;a--)if("inline"===e.tokens[a].type)for(s=e.tokens[a].children,t=s.length-1;t>=0;t--)n=s[t],"text"===n.type&&(o=n.content,o=r(o),i.test(o)&&(o=o.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---([^-]|$)/gm,"$1—$2").replace(/(^|\s)--(\s|$)/gm,"$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm,"$1–$2")),n.content=o)}},{}],152:[function(e,t,n){"use strict"
function r(e,t){return 0>t||t>=e.length?!1:!a.test(e[t])}function i(e,t,n){return e.substr(0,t)+n+e.substr(t+1)}var o=/['"]/,s=/['"]/g,a=/[-\s()\[\]]/,u="’"
t.exports=function(e){var t,n,a,c,l,h,f,p,d,m,g,v,y,b,w,x,k
if(e.options.typographer)for(k=[],w=e.tokens.length-1;w>=0;w--)if("inline"===e.tokens[w].type)for(x=e.tokens[w].children,k.length=0,t=0;t<x.length;t++)if(n=x[t],"text"===n.type&&!o.test(n.text)){for(f=x[t].level,y=k.length-1;y>=0&&!(k[y].level<=f);y--);k.length=y+1,a=n.content,l=0,h=a.length
e:for(;h>l&&(s.lastIndex=l,c=s.exec(a));)if(p=!r(a,c.index-1),l=c.index+1,b="'"===c[0],d=!r(a,l),d||p){if(g=!d,v=!p)for(y=k.length-1;y>=0&&(m=k[y],!(k[y].level<f));y--)if(m.single===b&&k[y].level===f){m=k[y],b?(x[m.token].content=i(x[m.token].content,m.pos,e.options.quotes[2]),n.content=i(n.content,c.index,e.options.quotes[3])):(x[m.token].content=i(x[m.token].content,m.pos,e.options.quotes[0]),n.content=i(n.content,c.index,e.options.quotes[1])),k.length=y
continue e}g?k.push({token:t,pos:c.index,single:b,level:f}):v&&b&&(n.content=i(n.content,c.index,u))}else b&&(n.content=i(n.content,c.index,u))}}},{}],153:[function(e,t,n){"use strict"
var r=e("../common/url_schemas"),i=e("../helpers/normalize_link"),o=/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,s=/^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/
t.exports=function(e,t){var n,a,u,c,l,h=e.pos
return 60!==e.src.charCodeAt(h)?!1:(n=e.src.slice(h),n.indexOf(">")<0?!1:(a=n.match(s))?r.indexOf(a[1].toLowerCase())<0?!1:(c=a[0].slice(1,-1),l=i(c),e.parser.validateLink(c)?(t||(e.push({type:"link_open",href:l,level:e.level}),e.push({type:"text",content:c,level:e.level+1}),e.push({type:"link_close",level:e.level})),e.pos+=a[0].length,!0):!1):(u=n.match(o),u?(c=u[0].slice(1,-1),l=i("mailto:"+c),e.parser.validateLink(l)?(t||(e.push({type:"link_open",href:l,level:e.level}),e.push({type:"text",content:c,level:e.level+1}),e.push({type:"link_close",level:e.level})),e.pos+=u[0].length,!0):!1):!1))}},{"../common/url_schemas":114,"../helpers/normalize_link":119}],154:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i,o,s,a=e.pos,u=e.src.charCodeAt(a)
if(96!==u)return!1
for(n=a,a++,r=e.posMax;r>a&&96===e.src.charCodeAt(a);)a++
for(i=e.src.slice(n,a),o=s=a;-1!==(o=e.src.indexOf("`",s));){for(s=o+1;r>s&&96===e.src.charCodeAt(s);)s++
if(s-o===i.length)return t||e.push({type:"code",content:e.src.slice(a,o).replace(/[ \n]+/g," ").trim(),block:!1,level:e.level}),e.pos=s,!0}return t||(e.pending+=i),e.pos+=i.length,!0}},{}],155:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i,o,s,a=e.posMax,u=e.pos
if(126!==e.src.charCodeAt(u))return!1
if(t)return!1
if(u+4>=a)return!1
if(126!==e.src.charCodeAt(u+1))return!1
if(e.level>=e.options.maxNesting)return!1
if(o=u>0?e.src.charCodeAt(u-1):-1,s=e.src.charCodeAt(u+2),126===o)return!1
if(126===s)return!1
if(32===s||10===s)return!1
for(r=u+2;a>r&&126===e.src.charCodeAt(r);)r++
if(r>u+3)return e.pos+=r-u,t||(e.pending+=e.src.slice(u,r)),!0
for(e.pos=u+2,i=1;e.pos+1<a;){if(126===e.src.charCodeAt(e.pos)&&126===e.src.charCodeAt(e.pos+1)&&(o=e.src.charCodeAt(e.pos-1),s=e.pos+2<a?e.src.charCodeAt(e.pos+2):-1,126!==s&&126!==o&&(32!==o&&10!==o?i--:32!==s&&10!==s&&i++,0>=i))){n=!0
break}e.parser.skipToken(e)}return n?(e.posMax=e.pos,e.pos=u+2,t||(e.push({type:"del_open",level:e.level++}),e.parser.tokenize(e),e.push({type:"del_close",level:--e.level})),e.pos=e.posMax+2,e.posMax=a,!0):(e.pos=u,!1)}},{}],156:[function(e,t,n){"use strict"
function r(e){return e>=48&&57>=e||e>=65&&90>=e||e>=97&&122>=e}function i(e,t){var n,i,o,s=t,a=!0,u=!0,c=e.posMax,l=e.src.charCodeAt(t)
for(n=t>0?e.src.charCodeAt(t-1):-1;c>s&&e.src.charCodeAt(s)===l;)s++
return s>=c&&(a=!1),o=s-t,o>=4?a=u=!1:(i=c>s?e.src.charCodeAt(s):-1,(32===i||10===i)&&(a=!1),(32===n||10===n)&&(u=!1),95===l&&(r(n)&&(a=!1),r(i)&&(u=!1))),{can_open:a,can_close:u,delims:o}}t.exports=function(e,t){var n,r,o,s,a,u,c,l=e.posMax,h=e.pos,f=e.src.charCodeAt(h)
if(95!==f&&42!==f)return!1
if(t)return!1
if(c=i(e,h),n=c.delims,!c.can_open)return e.pos+=n,t||(e.pending+=e.src.slice(h,e.pos)),!0
if(e.level>=e.options.maxNesting)return!1
for(e.pos=h+n,u=[n];e.pos<l;)if(e.src.charCodeAt(e.pos)!==f)e.parser.skipToken(e)
else{if(c=i(e,e.pos),r=c.delims,c.can_close){for(s=u.pop(),a=r;s!==a;){if(s>a){u.push(s-a)
break}if(a-=s,0===u.length)break
e.pos+=s,s=u.pop()}if(0===u.length){n=s,o=!0
break}e.pos+=r
continue}c.can_open&&u.push(r),e.pos+=r}return o?(e.posMax=e.pos,e.pos=h+n,t||((2===n||3===n)&&e.push({type:"strong_open",level:e.level++}),(1===n||3===n)&&e.push({type:"em_open",level:e.level++}),e.parser.tokenize(e),(1===n||3===n)&&e.push({type:"em_close",level:--e.level}),(2===n||3===n)&&e.push({type:"strong_close",level:--e.level})),e.pos=e.posMax+n,e.posMax=l,!0):(e.pos=h,!1)}},{}],157:[function(e,t,n){"use strict"
var r=e("../common/entities"),i=e("../common/utils").has,o=e("../common/utils").isValidEntityCode,s=e("../common/utils").fromCodePoint,a=/^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,u=/^&([a-z][a-z0-9]{1,31});/i
t.exports=function(e,t){var n,c,l,h=e.pos,f=e.posMax
if(38!==e.src.charCodeAt(h))return!1
if(f>h+1)if(n=e.src.charCodeAt(h+1),35===n){if(l=e.src.slice(h).match(a))return t||(c="x"===l[1][0].toLowerCase()?parseInt(l[1].slice(1),16):parseInt(l[1],10),e.pending+=s(o(c)?c:65533)),e.pos+=l[0].length,!0}else if(l=e.src.slice(h).match(u),l&&i(r,l[1]))return t||(e.pending+=r[l[1]]),e.pos+=l[0].length,!0
return t||(e.pending+="&"),e.pos++,!0}},{"../common/entities":111,"../common/utils":115}],158:[function(e,t,n){"use strict"
for(var r=[],i=0;256>i;i++)r.push(0)
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){r[e.charCodeAt(0)]=1}),t.exports=function(e,t){var n,i=e.pos,o=e.posMax
if(92!==e.src.charCodeAt(i))return!1
if(i++,o>i){if(n=e.src.charCodeAt(i),256>n&&0!==r[n])return t||(e.pending+=e.src[i]),e.pos+=2,!0
if(10===n){for(t||e.push({type:"hardbreak",level:e.level}),i++;o>i&&32===e.src.charCodeAt(i);)i++
return e.pos=i,!0}}return t||(e.pending+="\\"),e.pos++,!0}},{}],159:[function(e,t,n){"use strict"
var r=e("../helpers/parse_link_label")
t.exports=function(e,t){var n,i,o,s,a=e.posMax,u=e.pos
return u+2>=a?!1:94!==e.src.charCodeAt(u)?!1:91!==e.src.charCodeAt(u+1)?!1:e.level>=e.options.maxNesting?!1:(n=u+2,i=r(e,u+1),0>i?!1:(t||(e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.list||(e.env.footnotes.list=[]),o=e.env.footnotes.list.length,e.pos=n,e.posMax=i,e.push({type:"footnote_ref",id:o,level:e.level}),e.linkLevel++,s=e.tokens.length,e.parser.tokenize(e),e.env.footnotes.list[o]={tokens:e.tokens.splice(s)},e.linkLevel--),e.pos=i+1,e.posMax=a,!0))}},{"../helpers/parse_link_label":122}],160:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i,o,s=e.posMax,a=e.pos
if(a+3>s)return!1
if(!e.env.footnotes||!e.env.footnotes.refs)return!1
if(91!==e.src.charCodeAt(a))return!1
if(94!==e.src.charCodeAt(a+1))return!1
if(e.level>=e.options.maxNesting)return!1
for(r=a+2;s>r;r++){if(32===e.src.charCodeAt(r))return!1
if(10===e.src.charCodeAt(r))return!1
if(93===e.src.charCodeAt(r))break}return r===a+2?!1:r>=s?!1:(r++,n=e.src.slice(a+2,r-1),"undefined"==typeof e.env.footnotes.refs[":"+n]?!1:(t||(e.env.footnotes.list||(e.env.footnotes.list=[]),e.env.footnotes.refs[":"+n]<0?(i=e.env.footnotes.list.length,e.env.footnotes.list[i]={label:n,count:0},e.env.footnotes.refs[":"+n]=i):i=e.env.footnotes.refs[":"+n],o=e.env.footnotes.list[i].count,e.env.footnotes.list[i].count++,e.push({type:"footnote_ref",id:i,subId:o,level:e.level})),e.pos=r,e.posMax=s,!0))}},{}],161:[function(e,t,n){"use strict"
function r(e){var t=32|e
return t>=97&&122>=t}var i=e("../common/html_re").HTML_TAG_RE
t.exports=function(e,t){var n,o,s,a=e.pos
return e.options.html?(s=e.posMax,60!==e.src.charCodeAt(a)||a+2>=s?!1:(n=e.src.charCodeAt(a+1),(33===n||63===n||47===n||r(n))&&(o=e.src.slice(a).match(i))?(t||e.push({type:"htmltag",content:e.src.slice(a,a+o[0].length),level:e.level}),e.pos+=o[0].length,!0):!1)):!1}},{"../common/html_re":113}],162:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i,o,s,a=e.posMax,u=e.pos
if(43!==e.src.charCodeAt(u))return!1
if(t)return!1
if(u+4>=a)return!1
if(43!==e.src.charCodeAt(u+1))return!1
if(e.level>=e.options.maxNesting)return!1
if(o=u>0?e.src.charCodeAt(u-1):-1,s=e.src.charCodeAt(u+2),43===o)return!1
if(43===s)return!1
if(32===s||10===s)return!1
for(r=u+2;a>r&&43===e.src.charCodeAt(r);)r++
if(r!==u+2)return e.pos+=r-u,t||(e.pending+=e.src.slice(u,r)),!0
for(e.pos=u+2,i=1;e.pos+1<a;){if(43===e.src.charCodeAt(e.pos)&&43===e.src.charCodeAt(e.pos+1)&&(o=e.src.charCodeAt(e.pos-1),s=e.pos+2<a?e.src.charCodeAt(e.pos+2):-1,43!==s&&43!==o&&(32!==o&&10!==o?i--:32!==s&&10!==s&&i++,0>=i))){n=!0
break}e.parser.skipToken(e)}return n?(e.posMax=e.pos,e.pos=u+2,t||(e.push({type:"ins_open",level:e.level++}),e.parser.tokenize(e),e.push({type:"ins_close",level:--e.level})),e.pos=e.posMax+2,e.posMax=a,!0):(e.pos=u,!1)}},{}],163:[function(e,t,n){"use strict"
var r=e("../helpers/parse_link_label"),i=e("../helpers/parse_link_destination"),o=e("../helpers/parse_link_title"),s=e("../helpers/normalize_reference")
t.exports=function(e,t){var n,a,u,c,l,h,f,p,d=!1,m=e.pos,g=e.posMax,v=e.pos,y=e.src.charCodeAt(v)
if(33===y&&(d=!0,y=e.src.charCodeAt(++v)),91!==y)return!1
if(e.level>=e.options.maxNesting)return!1
if(n=v+1,a=r(e,v),0>a)return!1
if(h=a+1,g>h&&40===e.src.charCodeAt(h)){for(h++;g>h&&(p=e.src.charCodeAt(h),32===p||10===p);h++);if(h>=g)return!1
for(v=h,i(e,h)?(c=e.linkContent,h=e.pos):c="",v=h;g>h&&(p=e.src.charCodeAt(h),32===p||10===p);h++);if(g>h&&v!==h&&o(e,h))for(l=e.linkContent,h=e.pos;g>h&&(p=e.src.charCodeAt(h),32===p||10===p);h++);else l=""
if(h>=g||41!==e.src.charCodeAt(h))return e.pos=m,!1
h++}else{if(e.linkLevel>0)return!1
for(;g>h&&(p=e.src.charCodeAt(h),32===p||10===p);h++);if(g>h&&91===e.src.charCodeAt(h)&&(v=h+1,h=r(e,h),h>=0?u=e.src.slice(v,h++):h=v-1),u||(u=e.src.slice(n,a)),f=e.env.references[s(u)],!f)return e.pos=m,!1
c=f.href,l=f.title}return t||(e.pos=n,e.posMax=a,d?e.push({type:"image",src:c,title:l,alt:e.src.substr(n,a-n),level:e.level}):(e.push({type:"link_open",href:c,title:l,level:e.level++}),e.linkLevel++,e.parser.tokenize(e),e.linkLevel--,e.push({type:"link_close",level:--e.level}))),e.pos=h,e.posMax=g,!0}},{"../helpers/normalize_reference":120,"../helpers/parse_link_destination":121,"../helpers/parse_link_label":122,"../helpers/parse_link_title":123}],164:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i,o,s,a=e.posMax,u=e.pos
if(61!==e.src.charCodeAt(u))return!1
if(t)return!1
if(u+4>=a)return!1
if(61!==e.src.charCodeAt(u+1))return!1
if(e.level>=e.options.maxNesting)return!1
if(o=u>0?e.src.charCodeAt(u-1):-1,s=e.src.charCodeAt(u+2),61===o)return!1
if(61===s)return!1
if(32===s||10===s)return!1
for(r=u+2;a>r&&61===e.src.charCodeAt(r);)r++
if(r!==u+2)return e.pos+=r-u,t||(e.pending+=e.src.slice(u,r)),!0
for(e.pos=u+2,i=1;e.pos+1<a;){if(61===e.src.charCodeAt(e.pos)&&61===e.src.charCodeAt(e.pos+1)&&(o=e.src.charCodeAt(e.pos-1),s=e.pos+2<a?e.src.charCodeAt(e.pos+2):-1,61!==s&&61!==o&&(32!==o&&10!==o?i--:32!==s&&10!==s&&i++,0>=i))){n=!0
break}e.parser.skipToken(e)}return n?(e.posMax=e.pos,e.pos=u+2,t||(e.push({type:"mark_open",level:e.level++}),e.parser.tokenize(e),e.push({type:"mark_close",level:--e.level})),e.pos=e.posMax+2,e.posMax=a,!0):(e.pos=u,!1)}},{}],165:[function(e,t,n){"use strict"
t.exports=function(e,t){var n,r,i=e.pos
if(10!==e.src.charCodeAt(i))return!1
for(n=e.pending.length-1,r=e.posMax,t||(n>=0&&32===e.pending.charCodeAt(n)?n>=1&&32===e.pending.charCodeAt(n-1)?(e.pending=e.pending.replace(/ +$/,""),e.push({type:"hardbreak",level:e.level})):(e.pending=e.pending.slice(0,-1),e.push({type:"softbreak",level:e.level})):e.push({type:"softbreak",level:e.level})),i++;r>i&&32===e.src.charCodeAt(i);)i++
return e.pos=i,!0}},{}],166:[function(e,t,n){"use strict"
function r(e,t,n,r,i){this.src=e,this.env=r,this.options=n,this.parser=t,this.tokens=i,this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache=[],this.isInLabel=!1,this.linkLevel=0,this.linkContent="",this.labelUnmatchedScopes=0}r.prototype.pushPending=function(){this.tokens.push({type:"text",content:this.pending,level:this.pendingLevel}),this.pending=""},r.prototype.push=function(e){this.pending&&this.pushPending(),this.tokens.push(e),this.pendingLevel=this.level},r.prototype.cacheSet=function(e,t){for(var n=this.cache.length;e>=n;n++)this.cache.push(0)
this.cache[e]=t},r.prototype.cacheGet=function(e){return e<this.cache.length?this.cache[e]:0},t.exports=r},{}],167:[function(e,t,n){"use strict"
var r=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g
t.exports=function(e,t){var n,i,o=e.posMax,s=e.pos
if(126!==e.src.charCodeAt(s))return!1
if(t)return!1
if(s+2>=o)return!1
if(e.level>=e.options.maxNesting)return!1
for(e.pos=s+1;e.pos<o;){if(126===e.src.charCodeAt(e.pos)){n=!0
break}e.parser.skipToken(e)}return n&&s+1!==e.pos?(i=e.src.slice(s+1,e.pos),i.match(/(^|[^\\])(\\\\)*\s/)?(e.pos=s,!1):(e.posMax=e.pos,e.pos=s+1,t||e.push({type:"sub",level:e.level,content:i.replace(r,"$1")}),e.pos=e.posMax+1,e.posMax=o,!0)):(e.pos=s,!1)}},{}],168:[function(e,t,n){"use strict"
var r=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g
t.exports=function(e,t){var n,i,o=e.posMax,s=e.pos
if(94!==e.src.charCodeAt(s))return!1
if(t)return!1
if(s+2>=o)return!1
if(e.level>=e.options.maxNesting)return!1
for(e.pos=s+1;e.pos<o;){if(94===e.src.charCodeAt(e.pos)){n=!0
break}e.parser.skipToken(e)}return n&&s+1!==e.pos?(i=e.src.slice(s+1,e.pos),i.match(/(^|[^\\])(\\\\)*\s/)?(e.pos=s,!1):(e.posMax=e.pos,e.pos=s+1,t||e.push({type:"sup",level:e.level,content:i.replace(r,"$1")}),e.pos=e.posMax+1,e.posMax=o,!0)):(e.pos=s,!1)}},{}],169:[function(e,t,n){"use strict"
function r(e){switch(e){case 10:case 92:case 96:case 42:case 95:case 94:case 91:case 93:case 33:case 38:case 60:case 62:case 123:case 125:case 36:case 37:case 64:case 126:case 43:case 61:case 58:return!0
default:return!1}}t.exports=function(e,t){for(var n=e.pos;n<e.posMax&&!r(e.src.charCodeAt(n));)n++
return n===e.pos?!1:(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}},{}],170:[function(e,t,n){!function(e,r){"function"==typeof define&&define.amd?define([],function(){return e.Autolinker=r()}):"object"==typeof n?t.exports=r():e.Autolinker=r()}(this,function(){var e=function(t){e.Util.assign(this,t)}
return e.prototype={constructor:e,urls:!0,email:!0,twitter:!0,newWindow:!0,stripPrefix:!0,truncate:void 0,className:"",htmlParser:void 0,matchParser:void 0,tagBuilder:void 0,link:function(e){for(var t=this.getHtmlParser(),n=t.parse(e),r=0,i=[],o=0,s=n.length;s>o;o++){var a=n[o],u=a.getType(),c=a.getText()
if("element"===u)"a"===a.getTagName()&&(a.isClosing()?r=Math.max(r-1,0):r++),i.push(c)
else if("entity"===u)i.push(c)
else if(0===r){var l=this.linkifyStr(c)
i.push(l)}else i.push(c)}return i.join("")},linkifyStr:function(e){return this.getMatchParser().replace(e,this.createMatchReturnVal,this)},createMatchReturnVal:function(t){var n
if(this.replaceFn&&(n=this.replaceFn.call(this,this,t)),"string"==typeof n)return n
if(n===!1)return t.getMatchedText()
if(n instanceof e.HtmlTag)return n.toString()
var r=this.getTagBuilder(),i=r.build(t)
return i.toString()},getHtmlParser:function(){var t=this.htmlParser
return t||(t=this.htmlParser=new e.htmlParser.HtmlParser),t},getMatchParser:function(){var t=this.matchParser
return t||(t=this.matchParser=new e.matchParser.MatchParser({urls:this.urls,email:this.email,twitter:this.twitter,stripPrefix:this.stripPrefix})),t},getTagBuilder:function(){var t=this.tagBuilder
return t||(t=this.tagBuilder=new e.AnchorTagBuilder({newWindow:this.newWindow,truncate:this.truncate,className:this.className})),t}},e.link=function(t,n){var r=new e(n)
return r.link(t)},e.match={},e.htmlParser={},e.matchParser={},e.Util={abstractMethod:function(){throw"abstract"},assign:function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])
return e},extend:function(t,n){var r=t.prototype,i=function(){}
i.prototype=r
var o
o=n.hasOwnProperty("constructor")?n.constructor:function(){r.constructor.apply(this,arguments)}
var s=o.prototype=new i
return s.constructor=o,s.superclass=r,delete n.constructor,e.Util.assign(s,n),o},ellipsis:function(e,t,n){return e.length>t&&(n=null==n?"..":n,e=e.substring(0,t-n.length)+n),e},indexOf:function(e,t){if(Array.prototype.indexOf)return e.indexOf(t)
for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n
return-1},splitAndCapture:function(e,t){if(!t.global)throw new Error("`splitRegex` must have the 'g' flag set")
for(var n,r=[],i=0;n=t.exec(e);)r.push(e.substring(i,n.index)),r.push(n[0]),i=n.index+n[0].length
return r.push(e.substring(i)),r}},e.HtmlTag=e.Util.extend(Object,{whitespaceRegex:/\s+/,constructor:function(t){e.Util.assign(this,t),this.innerHtml=this.innerHtml||this.innerHTML},setTagName:function(e){return this.tagName=e,this},getTagName:function(){return this.tagName||""},setAttr:function(e,t){var n=this.getAttrs()
return n[e]=t,this},getAttr:function(e){return this.getAttrs()[e]},setAttrs:function(t){var n=this.getAttrs()
return e.Util.assign(n,t),this},getAttrs:function(){return this.attrs||(this.attrs={})},setClass:function(e){return this.setAttr("class",e)},addClass:function(t){for(var n,r=this.getClass(),i=this.whitespaceRegex,o=e.Util.indexOf,s=r?r.split(i):[],a=t.split(i);n=a.shift();)-1===o(s,n)&&s.push(n)
return this.getAttrs()["class"]=s.join(" "),this},removeClass:function(t){for(var n,r=this.getClass(),i=this.whitespaceRegex,o=e.Util.indexOf,s=r?r.split(i):[],a=t.split(i);s.length&&(n=a.shift());){var u=o(s,n);-1!==u&&s.splice(u,1)}return this.getAttrs()["class"]=s.join(" "),this},getClass:function(){return this.getAttrs()["class"]||""},hasClass:function(e){return-1!==(" "+this.getClass()+" ").indexOf(" "+e+" ")},setInnerHtml:function(e){return this.innerHtml=e,this},getInnerHtml:function(){return this.innerHtml||""},toString:function(){var e=this.getTagName(),t=this.buildAttrsStr()
return t=t?" "+t:"",["<",e,t,">",this.getInnerHtml(),"</",e,">"].join("")},buildAttrsStr:function(){if(!this.attrs)return""
var e=this.getAttrs(),t=[]
for(var n in e)e.hasOwnProperty(n)&&t.push(n+'="'+e[n]+'"')
return t.join(" ")}}),e.AnchorTagBuilder=e.Util.extend(Object,{constructor:function(t){e.Util.assign(this,t)},build:function(t){var n=new e.HtmlTag({tagName:"a",attrs:this.createAttrs(t.getType(),t.getAnchorHref()),innerHtml:this.processAnchorText(t.getAnchorText())})
return n},createAttrs:function(e,t){var n={href:t},r=this.createCssClass(e)
return r&&(n["class"]=r),this.newWindow&&(n.target="_blank"),n},createCssClass:function(e){var t=this.className
return t?t+" "+t+"-"+e:""},processAnchorText:function(e){return e=this.doTruncate(e)},doTruncate:function(t){return e.Util.ellipsis(t,this.truncate||Number.POSITIVE_INFINITY)}}),e.htmlParser.HtmlParser=e.Util.extend(Object,{htmlRegex:function(){var e=/[0-9a-zA-Z][0-9a-zA-Z:]*/,t=/[^\s\0"'>\/=\x01-\x1F\x7F]+/,n=/(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/,r=t.source+"(?:\\s*=\\s*"+n.source+")?"
return new RegExp(["(?:","<(!DOCTYPE)","(?:","\\s+","(?:",r,"|",n.source+")",")*",">",")","|","(?:","<(/)?","("+e.source+")","(?:","\\s+",r,")*","\\s*/?",">",")"].join(""),"gi")}(),htmlCharacterEntitiesRegex:/(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,parse:function(e){for(var t,n,r=this.htmlRegex,i=0,o=[];null!==(t=r.exec(e));){var s=t[0],a=t[1]||t[3],u=!!t[2],c=e.substring(i,t.index)
c&&(n=this.parseTextAndEntityNodes(c),o.push.apply(o,n)),o.push(this.createElementNode(s,a,u)),i=t.index+s.length}if(i<e.length){var l=e.substring(i)
l&&(n=this.parseTextAndEntityNodes(l),o.push.apply(o,n))}return o},parseTextAndEntityNodes:function(t){for(var n=[],r=e.Util.splitAndCapture(t,this.htmlCharacterEntitiesRegex),i=0,o=r.length;o>i;i+=2){var s=r[i],a=r[i+1]
s&&n.push(this.createTextNode(s)),a&&n.push(this.createEntityNode(a))}return n},createElementNode:function(t,n,r){return new e.htmlParser.ElementNode({text:t,tagName:n.toLowerCase(),closing:r})},createEntityNode:function(t){return new e.htmlParser.EntityNode({text:t})},createTextNode:function(t){return new e.htmlParser.TextNode({text:t})}}),e.htmlParser.HtmlNode=e.Util.extend(Object,{text:"",constructor:function(t){e.Util.assign(this,t)},getType:e.Util.abstractMethod,getText:function(){return this.text}}),e.htmlParser.ElementNode=e.Util.extend(e.htmlParser.HtmlNode,{tagName:"",closing:!1,getType:function(){return"element"},getTagName:function(){return this.tagName},isClosing:function(){return this.closing}}),e.htmlParser.EntityNode=e.Util.extend(e.htmlParser.HtmlNode,{getType:function(){return"entity"}}),e.htmlParser.TextNode=e.Util.extend(e.htmlParser.HtmlNode,{getType:function(){return"text"}}),e.matchParser.MatchParser=e.Util.extend(Object,{urls:!0,email:!0,twitter:!0,stripPrefix:!0,matcherRegex:function(){var e=/(^|[^\w])@(\w{1,15})/,t=/(?:[\-;:&=\+\$,\w\.]+@)/,n=/(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/,r=/(?:www\.)/,i=/[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,o=/\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,s=/[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/
return new RegExp(["(",e.source,")","|","(",t.source,i.source,o.source,")","|","(","(?:","(",n.source,i.source,")","|","(?:","(.?//)?",r.source,i.source,")","|","(?:","(.?//)?",i.source,o.source,")",")","(?:"+s.source+")?",")"].join(""),"gi")}(),charBeforeProtocolRelMatchRegex:/^(.)?\/\//,constructor:function(t){e.Util.assign(this,t),this.matchValidator=new e.MatchValidator},replace:function(e,t,n){var r=this
return e.replace(this.matcherRegex,function(e,i,o,s,a,u,c,l,h){var f=r.processCandidateMatch(e,i,o,s,a,u,c,l,h)
if(f){var p=t.call(n,f.match)
return f.prefixStr+p+f.suffixStr}return e})},processCandidateMatch:function(t,n,r,i,o,s,a,u,c){var l,h=u||c,f="",p=""
if(n&&!this.twitter||o&&!this.email||s&&!this.urls||!this.matchValidator.isValidMatch(s,a,h))return null
if(this.matchHasUnbalancedClosingParen(t)&&(t=t.substr(0,t.length-1),p=")"),o)l=new e.match.Email({matchedText:t,email:o})
else if(n)r&&(f=r,t=t.slice(1)),l=new e.match.Twitter({matchedText:t,twitterHandle:i})
else{if(h){var d=h.match(this.charBeforeProtocolRelMatchRegex)[1]||""
d&&(f=d,t=t.slice(1))}l=new e.match.Url({matchedText:t,url:t,protocolUrlMatch:!!a,protocolRelativeMatch:!!h,stripPrefix:this.stripPrefix})}return{prefixStr:f,suffixStr:p,match:l}},matchHasUnbalancedClosingParen:function(e){var t=e.charAt(e.length-1)
if(")"===t){var n=e.match(/\(/g),r=e.match(/\)/g),i=n&&n.length||0,o=r&&r.length||0
if(o>i)return!0}return!1}}),e.MatchValidator=e.Util.extend(Object,{invalidProtocolRelMatchRegex:/^[\w]\/\//,hasFullProtocolRegex:/^[A-Za-z][-.+A-Za-z0-9]+:\/\//,uriSchemeRegex:/^[A-Za-z][-.+A-Za-z0-9]+:/,hasWordCharAfterProtocolRegex:/:[^\s]*?[A-Za-z]/,isValidMatch:function(e,t,n){return t&&!this.isValidUriScheme(t)||this.urlMatchDoesNotHaveProtocolOrDot(e,t)||this.urlMatchDoesNotHaveAtLeastOneWordChar(e,t)||this.isInvalidProtocolRelativeMatch(n)?!1:!0},isValidUriScheme:function(e){var t=e.match(this.uriSchemeRegex)[0].toLowerCase()
return"javascript:"!==t&&"vbscript:"!==t},urlMatchDoesNotHaveProtocolOrDot:function(e,t){return!(!e||t&&this.hasFullProtocolRegex.test(t)||-1!==e.indexOf("."))},urlMatchDoesNotHaveAtLeastOneWordChar:function(e,t){return e&&t?!this.hasWordCharAfterProtocolRegex.test(e):!1},isInvalidProtocolRelativeMatch:function(e){return!!e&&this.invalidProtocolRelMatchRegex.test(e)}}),e.match.Match=e.Util.extend(Object,{constructor:function(t){e.Util.assign(this,t)},getType:e.Util.abstractMethod,getMatchedText:function(){return this.matchedText},getAnchorHref:e.Util.abstractMethod,getAnchorText:e.Util.abstractMethod}),e.match.Email=e.Util.extend(e.match.Match,{getType:function(){return"email"},getEmail:function(){return this.email},getAnchorHref:function(){return"mailto:"+this.email},getAnchorText:function(){return this.email}}),e.match.Twitter=e.Util.extend(e.match.Match,{getType:function(){return"twitter"},getTwitterHandle:function(){return this.twitterHandle},getAnchorHref:function(){return"https://twitter.com/"+this.twitterHandle},getAnchorText:function(){return"@"+this.twitterHandle}}),e.match.Url=e.Util.extend(e.match.Match,{urlPrefixRegex:/^(https?:\/\/)?(www\.)?/i,protocolRelativeRegex:/^\/\//,protocolPrepended:!1,getType:function(){return"url"},getUrl:function(){var e=this.url
return this.protocolRelativeMatch||this.protocolUrlMatch||this.protocolPrepended||(e=this.url="http://"+e,this.protocolPrepended=!0),e},getAnchorHref:function(){var e=this.getUrl()
return e.replace(/&amp;/g,"&")},getAnchorText:function(){var e=this.getUrl()
return this.protocolRelativeMatch&&(e=this.stripProtocolRelativePrefix(e)),this.stripPrefix&&(e=this.stripUrlPrefix(e)),e=this.removeTrailingSlash(e)},stripUrlPrefix:function(e){return e.replace(this.urlPrefixRegex,"")},stripProtocolRelativePrefix:function(e){return e.replace(this.protocolRelativeRegex,"")},removeTrailingSlash:function(e){return"/"===e.charAt(e.length-1)&&(e=e.slice(0,-1)),e}}),e})},{}],171:[function(e,t,n){t.exports=function(e,t){for(var n=0,r=t.indexOf(e);-1!==r;)n++,r=t.indexOf(e,r+1)
return n}},{}],172:[function(e,t,n){function r(){return Object.create(new u)}function i(e,t){var n=Object.create(e),r=0
return t.forEach(function(e){var t,i,o=e.split("=")
o.length>1?(t=o[0],i=o[1]):(r++,t=r,i=o[0]),n[t]=i}),n}function o(e){var t=e.data
return t||(t=e.ractive?e.ractive.get():{}),e.templateElements=[],e.html=e.html.replace(/::([^:]+)::/gm,function(n,o,u,c){var l=a("<code",c.substr(0,u)),h=a("</code",c.substr(0,u))
if(l!==h)return n
var f=r(),p=o.split("|")
return f.postName=p.shift(0),f.elementId=s.generateId(f.postName),f.data=i(t,p),e.templateElements.push(f),s.generatePostDiv(f.elementId)}),e}var s=e("./templateToolbox"),a=e("./numberOfOccurrances"),u=e("events").EventEmitter
t.exports=o},{"./numberOfOccurrances":171,"./templateToolbox":173,events:181}],173:[function(e,t,n){function r(e){return e.metadata.markdown!==!1?f.render(e.content):e.content}function i(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"==e?t:3&t|8
return n.toString(16)})}function o(e){return"noddity_post_"+e+"_"+i()}function s(e){var t=h.exec(e)
return null!==t?t[1]:void 0}function a(e){return h.test(e)}function u(e){return'<span class="noddity-template" id="'+e+'"></span>'}function c(e,t){var n=Object.create(t),r=0
return e.forEach(function(e){var t,i,o=e.split("=")
o.length>1?(t=o[0],i=o[1]):(r++,t=r,i=o[0]),n[t]=i}),n}var l=e("remarkable"),h=/noddity_post_(.+)_[\da-z]{12}4[\da-z]{19}/,f=new l("full",{html:!0,linkify:!0})
t.exports={generateId:o,getPostName:s,generatePostDiv:u,isAPostDiv:a,getTemplateDataObject:c,htmlify:r}},{remarkable:110}],174:[function(e,t,n){t.exports=function(e){var t={}
return e.on("post changed",function(e,n,r){t[e]&&t[e].forEach(function(e){e.emit("post changed",n)})}),function(e){"undefined"==typeof t[e.postName]&&(t[e.postName]=[]),t[e.postName].push(e),e.ractive.on("teardown",function(){t[e.postName]=t[e.postName].filter(function(t){return t!==e})})}}},{}],175:[function(e,t,n){!function(e){"use strict"
var n=e.Ractive,r=function(){var e={el:void 0,append:!1,template:{v:1,t:[]},"yield":null,preserveWhitespace:!1,sanitize:!1,stripComments:!0,data:{},computed:{},magic:!1,modifyArrays:!0,adapt:[],isolated:!1,twoway:!0,lazy:!1,noIntro:!1,transitionsEnabled:!0,complete:void 0,noCssTransform:!1,debug:!1}
return e}(),i={linear:function(e){return e},easeIn:function(e){return Math.pow(e,3)},easeOut:function(e){return Math.pow(e-1,3)+1},easeInOut:function(e){return(e/=.5)<1?.5*Math.pow(e,3):.5*(Math.pow(e-2,3)+2)}},o=[],s=Object.prototype.hasOwnProperty,a=function(){var e=Object.prototype.toString
return function(t){return"[object Array]"===e.call(t)}}(),u=function(){var e=Object.prototype.toString
return function(t){return t&&"[object Object]"===e.call(t)}}(),c=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},l=function(e,t,n,r,i){var o,s,a
return e.push(function(){s=e.interpolate}),a=/^([+-]?[0-9]+\.?(?:[0-9]+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/,o={number:function(e,t){var n
return i(e)&&i(t)?(e=+e,t=+t,n=t-e,n?function(t){return e+t*n}:function(){return e}):null},array:function(e,t){var r,i,o,a
if(!n(e)||!n(t))return null
for(r=[],i=[],a=o=Math.min(e.length,t.length);a--;)i[a]=s(e[a],t[a])
for(a=o;a<e.length;a+=1)r[a]=e[a]
for(a=o;a<t.length;a+=1)r[a]=t[a]
return function(e){for(var t=o;t--;)r[t]=i[t](e)
return r}},object:function(e,n){var i,o,a,u,c
if(!r(e)||!r(n))return null
i=[],u={},a={}
for(c in e)t.call(e,c)&&(t.call(n,c)?(i.push(c),a[c]=s(e[c],n[c])):u[c]=e[c])
for(c in n)t.call(n,c)&&!t.call(e,c)&&(u[c]=n[c])
return o=i.length,function(e){for(var t,n=o;n--;)t=i[n],u[t]=a[t](e)
return u}}}}(o,s,a,u,c),h=function(){var e
return e="undefined"==typeof document?!1:document&&document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")}(),f=function(){function e(e){var t,r,i,o,s,a=""
if(!n[e]){for(i=[];a.length<e;)a+=1
for(t=parseInt(a,2),o=function(e){return"1"===e},s=0;t>=s;s+=1){for(r=s.toString(2);r.length<e;)r="0"+r
i[s]=Array.prototype.map.call(r,o)}n[e]=i}return n[e]}var t,n={}
return t=function(t){var r,i,o,s,a,u
for(r=t.split("."),(i=n[r.length])||(i=e(r.length)),a=[],o=function(e,t){return e?"*":r[t]},s=i.length;s--;)u=i[s].map(o).join("."),a.hasOwnProperty(u)||(a.push(u),a[u]=!0)
return a}}(),p=function(e){function t(r,i,o,s){var a=arguments[4]
void 0===a&&(a=!1)
var u,c,l=!0
for(c=i.length;c>=0;c--)u=r._subs[i[c]],u&&(l=n(r,u,o,s)&&l)
if(r._parent&&l){if(a&&r.component){var h=r.component.name+"."+i[i.length-1]
i=e(h),o&&(o.component=r)}t(r._parent,i,o,s)}}function n(e,t,n,r){var i=null,o=!1
n&&(r=[n].concat(r))
for(var s=0,a=t.length;a>s;s+=1)t[s].apply(e,r)===!1&&(o=!0)
return n&&o&&(i=n.original)&&(i.preventDefault&&i.preventDefault(),i.stopPropagation&&i.stopPropagation()),!o}var r
return r=function(n,r){var i=arguments[2]
if(void 0===i&&(i={}),r){var o=e(r)
t(n,o,i.event,i.args,!0)}}}(f),d=function(e,t){var n=e.indexOf(t);-1!==n&&e.splice(n,1)},m=function(){function e(e){setTimeout(e,0)}function t(e,t){return function(){for(var n;n=e.shift();)n(t)}}function n(e,t,r,o){var s
if(t===e)throw new TypeError("A promise's fulfillment handler cannot return the same promise")
if(t instanceof i)t.then(r,o)
else if(!t||"object"!=typeof t&&"function"!=typeof t)r(t)
else{try{s=t.then}catch(a){return void o(a)}if("function"==typeof s){var u,c,l
c=function(t){u||(u=!0,n(e,t,r,o))},l=function(e){u||(u=!0,o(e))}
try{s.call(t,c,l)}catch(a){if(!u)return o(a),void(u=!0)}}else r(t)}}var r,i,o={},s={},a={}
return"function"==typeof m?i=m:(i=function(r){var u,c,l,h,f,p,d=[],m=[],g=o
l=function(n){return function(r){g===o&&(u=r,g=n,c=t(g===s?d:m,u),e(c))}},h=l(s),f=l(a)
try{r(h,f)}catch(v){f(v)}return p={then:function(t,r){var s=new i(function(i,a){var u=function(e,t,r){t.push("function"==typeof e?function(t){var r
try{r=e(t),n(s,r,i,a)}catch(o){a(o)}}:r)}
u(t,d,i),u(r,m,a),g!==o&&e(c)})
return s}},p["catch"]=function(e){return this.then(null,e)},p},i.all=function(e){return new i(function(t,n){var r,i,o,s=[]
if(!e.length)return void t(s)
for(o=function(i){e[i].then(function(e){s[i]=e,--r||t(s)},n)},r=i=e.length;i--;)o(i)})},i.resolve=function(e){return new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})}),r=i}(),g=function(){var e=/\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g
return function(t){return(t||"").replace(e,".$1")}}(),v=function(e){do if(void 0!==e.context)return e.context
while(e=e.parent)
return""},y=function(e,t){return null===e&&null===t?!0:"object"==typeof e||"object"==typeof t?!1:e===t},b=function(e,t,n){var r
e.push(function(){return r=e.runloop})
var i=function(e,t,n,r,i){this.root=e,this.keypath=t,this.priority=i,this.otherInstance=n,this.otherKeypath=r,this.bind(),this.value=this.root.viewmodel.get(this.keypath)}
return i.prototype={setValue:function(e){var i=this
return this.updating||this.counterpart&&this.counterpart.updating?void(this.value=e):void(t(e)&&e._ractive&&e._ractive.setting||n(e,this.value)||(this.updating=!0,r.addViewmodel(this.otherInstance.viewmodel),this.otherInstance.viewmodel.set(this.otherKeypath,e),this.value=e,r.scheduleTask(function(){return i.updating=!1})))},bind:function(){this.root.viewmodel.register(this.keypath,this)},rebind:function(e){this.unbind(),this.keypath=e,this.counterpart.otherKeypath=e,this.bind()},unbind:function(){this.root.viewmodel.unregister(this.keypath,this)}},function(e,t,n,r){var o,s,a,u,c,l
o=n+"="+r,a=e.bindings,a[o]||(s=e.instance,u=e.parentFragment.priority,c=new i(t,n,s,r,u),a.push(c),s.twoway&&(l=new i(s,r,t,n,1),a.push(l),c.counterpart=l,l.counterpart=c),a[o]=c)}}(o,a,y),w=function(e,t,n){function r(e,t){var n
if("."===t)return e
if(n=e?e.split("."):[],"../"===t.substr(0,3)){for(;"../"===t.substr(0,3);){if(!n.length)throw new Error(o)
n.pop(),t=t.substring(3)}return n.push(t),n.join(".")}return e?e+t.replace(/^\.\//,"."):t.replace(/^\.\/?/,"")}var i,o,s
return o='Could not resolve reference - too many "../" prefixes',s={evaluateWrapped:!0},i=function a(i,o,u){var c,l,h,f,p,d,m,g,v,y
if(o=e(o),"~/"===o.substr(0,2))return o.substring(2)
if("."===o.charAt(0))return r(t(u),o)
l=o.split(".")[0]
do if(c=u.context,c&&(d=!0,p=i.viewmodel.get(c,s),p&&("object"==typeof p||"function"==typeof p)&&l in p))return c+"."+o
while(u=u.parent)
if(l in i.data||l in i.viewmodel.computations)return o
if(i._parent&&!i.isolated){if(u=i.component.parentFragment,u.indexRefs&&void 0!==(h=u.indexRefs[o]))return i.component.indexRefBindings[o]=o,void i.viewmodel.set(o,h,!0)
if(f=a(i._parent,o,u)){for(m=f.split("."),g=o.split(".");m.length>1&&g.length>1&&m[m.length-1]===g[g.length-1];)m.pop(),g.pop()
return v=m.join("."),y=g.join("."),i.viewmodel.set(y,i._parent.viewmodel.get(v),!0),n(i.component,i._parent,v,y),o}}return d?void 0!==i.viewmodel.get(o)?o:void 0:o}}(g,v,b),x=function(e){function t(e){e.detach()}function n(e){e.detachNodes()}function r(e){!e.ready||e.outros.length||e.outroChildren||(e.outrosComplete||(e.parent?e.parent.decrementOutros(e):e.detachNodes(),e.outrosComplete=!0),e.intros.length||e.totalChildren||("function"==typeof e.callback&&e.callback(),e.parent&&e.parent.decrementTotal()))}var i=function(e,t){this.callback=e,this.parent=t,this.intros=[],this.outros=[],this.children=[],this.totalChildren=this.outroChildren=0,this.detachQueue=[],this.outrosComplete=!1,t&&t.addChild(this)}
return i.prototype={addChild:function(e){this.children.push(e),this.totalChildren+=1,this.outroChildren+=1},decrementOutros:function(){this.outroChildren-=1,r(this)},decrementTotal:function(){this.totalChildren-=1,r(this)},add:function(e){var t=e.isIntro?this.intros:this.outros
t.push(e)},remove:function(t){var n=t.isIntro?this.intros:this.outros
e(n,t),r(this)},init:function(){this.ready=!0,r(this)},detachNodes:function(){this.detachQueue.forEach(t),this.children.forEach(n)}},i}(d),k=function(e,t,n,r,i,o){function s(){var e,n,r
for(e=0;e<l.viewmodels.length;e+=1)n=l.viewmodels[e],r=n.applyChanges(),r&&t(n.ractive,"change",{args:[r]})
for(l.viewmodels.length=0,a(),e=0;e<l.views.length;e+=1)l.views[e].update()
for(l.views.length=0,e=0;e<l.tasks.length;e+=1)l.tasks[e]()
return l.tasks.length=0,l.viewmodels.length?s():void 0}function a(){var e,t,n,r
for(e=f.length;e--;)t=f[e],t.keypath&&f.splice(e,1),(n=i(t.root,t.ref,t.parentFragment))&&((r||(r=[])).push({item:t,keypath:n}),f.splice(e,1))
r&&r.forEach(u)}function u(e){e.item.resolve(e.keypath)}var c,l,h,f=[]
return h={start:function(e,t){var n,i
return t&&(n=new r(function(e){return i=e})),l={previousBatch:l,transitionManager:new o(i,l&&l.transitionManager),views:[],tasks:[],viewmodels:[]},e&&l.viewmodels.push(e.viewmodel),n},end:function(){s(),l.transitionManager.init(),l=l.previousBatch},addViewmodel:function(e){l?-1===l.viewmodels.indexOf(e)&&l.viewmodels.push(e):e.applyChanges()},registerTransition:function(e){e._manager=l.transitionManager,l.transitionManager.add(e)},addView:function(e){l.views.push(e)},addUnresolved:function(e){f.push(e)},removeUnresolved:function(e){n(f,e)},detachWhenReady:function(e){l.transitionManager.detachQueue.push(e)},scheduleTask:function(e){l?l.tasks.push(e):e()}},e.runloop=h,c=h}(o,p,d,m,w,x),E=function(){var e=/^\s*[0-9]+\s*$/
return function(t){return e.test(t)?[]:{}}}(),_=function(e,t,n){function r(t,n,r){function i(t){var r,i
t.value=n,t.updating||(i=t.ractive,r=t.keypath,t.updating=!0,e.start(i),i.viewmodel.mark(r),e.end(),t.updating=!1)}var o,s,a,u,c,l
if(o=t.obj,s=t.prop,r&&!r.configurable){if("length"===s)return
throw new Error('Cannot use magic mode with property "'+s+'" - object is not configurable')}r&&(a=r.get,u=r.set),c=a||function(){return n},l=function(e){u&&u(e),n=a?a():e,l._ractiveWrappers.forEach(i)},l._ractiveWrappers=[t],Object.defineProperty(o,s,{get:c,set:l,enumerable:!0,configurable:!0})}var i,o,s
try{Object.defineProperty({},"test",{value:0}),o={filter:function(e,t,r){var i,o,s,a,u
return t?(i=t.split("."),o=i.pop(),s=i.join("."),(a=r.viewmodel.wrapped[s])&&!a.magic?!1:(u=r.get(s),n(u)&&/^[0-9]+$/.test(o)?!1:u&&("object"==typeof u||"function"==typeof u))):!1},wrap:function(e,t,n){return new s(e,t,n)}},s=function(e,t,n){var i,o,s,a
return this.magic=!0,this.ractive=e,this.keypath=n,this.value=t,i=n.split("."),this.prop=i.pop(),o=i.join("."),this.obj=o?e.get(o):e.data,s=this.originalDescriptor=Object.getOwnPropertyDescriptor(this.obj,this.prop),s&&s.set&&(a=s.set._ractiveWrappers)?void(-1===a.indexOf(this)&&a.push(this)):void r(this,t,s)},s.prototype={get:function(){return this.value},reset:function(t){this.updating||(this.updating=!0,this.obj[this.prop]=t,e.addViewmodel(this.ractive.viewmodel),this.ractive.viewmodel.mark(this.keypath),this.updating=!1)},set:function(e,n){this.updating||(this.obj[this.prop]||(this.updating=!0,this.obj[this.prop]=t(e),this.updating=!1),this.obj[this.prop][e]=n)},teardown:function(){var e,t,n,r,i
return this.updating?!1:(e=Object.getOwnPropertyDescriptor(this.obj,this.prop),t=e&&e.set,void(t&&(r=t._ractiveWrappers,i=r.indexOf(this),-1!==i&&r.splice(i,1),r.length||(n=this.obj[this.prop],Object.defineProperty(this.obj,this.prop,this.originalDescriptor||{writable:!0,enumerable:!0,configurable:!0}),this.obj[this.prop]=n))))}}}catch(a){o=!1}return i=o}(k,E,a),S=function(e){return!!e}(_),A={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},T=function(e,t){var n
return n=e?function(e,n){return n&&n!==t.html?document.createElementNS(n,e):document.createElement(e)}:function(e,n){if(n&&n!==t.html)throw"This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information"
return document.createElement(e)}}(h,A),C=function(){var e="object"==typeof document
return e}(),O=function(e){var t
try{Object.defineProperty({},"test",{value:0}),e&&Object.defineProperty(document.createElement("div"),"test",{value:0}),t=Object.defineProperty}catch(n){t=function(e,t,n){e[t]=n.value}}return t}(C),N=function(e,t,n){var r
try{try{Object.defineProperties({},{test:{value:0}})}catch(i){throw i}n&&Object.defineProperties(e("div"),{test:{value:0}}),r=Object.defineProperties}catch(i){r=function(e,n){var r
for(r in n)n.hasOwnProperty(r)&&t(e,r,n[r])}}return r}(T,O,C),L=function(e){return function(t,n,r){var i
if("string"!=typeof n||!e(r))throw new Error("Bad arguments")
if(i=+t.get(n)||0,!e(i))throw new Error("Cannot add to a non-numeric value")
return t.set(n,i+r)}}(c),I=function(e){return function(t,n){return e(this,t,void 0===n?1:+n)}}(L),R=function(e){var t=/^\.+/
return function(n){return e(n).replace(t,"")}}(g),j=["o","ms","moz","webkit"],P=function(e){var t
return"undefined"==typeof window?t=null:(!function(e,t,n){var r,i
if(!n.requestAnimationFrame){for(r=0;r<e.length&&!n.requestAnimationFrame;++r)n.requestAnimationFrame=n[e[r]+"RequestAnimationFrame"]
n.requestAnimationFrame||(i=n.setTimeout,n.requestAnimationFrame=function(e){var n,r,o
return n=Date.now(),r=Math.max(0,16-(n-t)),o=i(function(){e(n+r)},r),t=n+r,o})}}(e,0,window),t=window.requestAnimationFrame),t}(j),M=function(){var e
return e="undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?function(){return window.performance.now()}:function(){return Date.now()}}(),D=function(e,t,n){var r=[],i={tick:function(){var o,s,a
for(a=t(),n.start(),o=0;o<r.length;o+=1)s=r[o],s.tick(a)||r.splice(o--,1)
n.end(),r.length?e(i.tick):i.running=!1},add:function(t){r.push(t),i.running||(i.running=!0,e(i.tick))},abort:function(e,t){for(var n,i=r.length;i--;)n=r[i],n.root===t&&n.keypath===e&&n.stop()}}
return i}(P,M,k),F=function(){var e,t={}
return e="undefined"!=typeof console&&"function"==typeof console.warn&&"function"==typeof console.warn.apply?function(e,n){if(!n){if(t[e])return
t[e]=!0}console.warn(e)}:function(){}}(),B=function(){function e(e){return e.trim?e.trim():e.replace(/^\s+/,"").replace(/\s+$/,"")}function t(e){return e.str}var n,r=/(?:^|\})?\s*([^\{\}]+)\s*\{/g,i=/\/\*.*?\*\//g,o=/((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~]+)?\s*[\s\+\>\~]?)\s*/g,s=/^@media/,a=/\[data-rvcguid="[a-z0-9-]+"]/g
return n=function(n,u){var c,l
return l=function(e){var n,r,i,s,a,c,l,h,f=[]
for(n=[];r=o.exec(e);)n.push({str:r[0],base:r[1],modifiers:r[2]})
for(s='[data-rvcguid="'+u+'"]',a=n.map(t),h=n.length;h--;)l=a.slice(),i=n[h],l[h]=i.base+s+i.modifiers||"",c=a.slice(),c[h]=s+" "+c[h],f.push(l.join(" "),c.join(" "))
return f.join(", ")},c=a.test(n)?n.replace(a,'[data-rvcguid="'+u+'"]'):n.replace(i,"").replace(r,function(t,n){var r,i
return s.test(n)?t:(r=n.split(",").map(e),i=r.map(l).join(", ")+" ",t.replace(n,i))})}}(),U=function(e){function t(e,t,r){var i,o=t.constructor._guid;(i=n(r.css,r,o)||n(e.css,e,o))&&(t.constructor.css=i)}function n(t,n,r){return t?n.noCssTransform?t:e(t,r):void 0}var r={name:"css",extend:t,init:function(){}}
return r}(B),q=function(){function e(e,t){return"function"==typeof t&&/_super/.test(e)}var t
return t=function(t,n,r){return r||e(t,n)?function(){var e,r="_super"in this,i=this._super
return this._super=n,e=t.apply(this,arguments),r&&(this._super=i),e}:t}}(),z=function(e){function t(e,t,n){var r=n.data||{},i=o(e.prototype.data)
return s(i,r)}function n(e,n,r){n.data=t(e,n,r)}function r(e,n,r){var i=r.data,o=t(e,n,r)
return"function"==typeof o&&(o=o.call(n,i)||i),n.data=o||{}}function i(e){var t=this.init(e.constructor,e,e)
return t?(e.data=t,!0):void 0}function o(e){if("function"!=typeof e||!Object.keys(e).length)return e
var t={}
return a(e,t),s(e,t)}function s(e,t){return"function"==typeof t?l(t,e):"function"==typeof e?c(t,e):u(t,e)}function a(e,t,n){for(var r in e)n&&r in t||(t[r]=e[r])}function u(e,t){return e=e||{},t?(a(t,e,!0),e):e}function c(e,t){return function(n){var r
if(e){r=[]
for(var i in e)n&&i in n||r.push(i)}return n=t.call(this,n)||n,r&&r.length&&(n=n||{},r.forEach(function(t){n[t]=e[t]})),n}}function l(t,n){var r
return r="function"!=typeof n?function(e){u(e,n)}:function(t){return n=e(n,function(){},!0),n.call(this,t)||t},e(t,r)}var h,f={name:"data",extend:n,init:r,reset:i}
return h=f}(q),W={missingParser:"Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser",mergeComparisonFail:"Merge operation: comparison failed. Falling back to identity checking",noComponentEventArguments:"Components currently only support simple events - you cannot include arguments. Sorry!",noTemplateForPartial:'Could not find template for partial "{name}"',noNestedPartials:"Partials ({{>{name}}}) cannot contain nested inline partials",evaluationError:'Error evaluating "{uniqueString}": {err}',badArguments:"Bad arguments \"{arguments}\". I'm not allowed to argue unless you've paid.",failedComputation:'Failed to compute "{key}": {err}',missingPlugin:'Missing "{name}" {plugin} plugin. You may need to download a {plugin} via http://docs.ractivejs.org/latest/plugins#{plugin}s',badRadioInputBinding:"A radio input can have two-way binding on its name attribute, or its checked attribute - not both",noRegistryFunctionReturn:'A function was specified for "{name}" {registry}, but no {registry} was returned',defaultElSpecified:"The <{name}/> component has a default `el` property; it has been disregarded",noElementProxyEventWildcards:'Only component proxy-events may contain "*" wildcards, <{element} on-{event}/> is not valid.'},V={TEXT:1,INTERPOLATOR:2,TRIPLE:3,SECTION:4,INVERTED:5,CLOSING:6,ELEMENT:7,PARTIAL:8,COMMENT:9,DELIMCHANGE:10,MUSTACHE:11,TAG:12,ATTRIBUTE:13,CLOSING_TAG:14,COMPONENT:15,NUMBER_LITERAL:20,STRING_LITERAL:21,ARRAY_LITERAL:22,OBJECT_LITERAL:23,BOOLEAN_LITERAL:24,GLOBAL:26,KEY_VALUE_PAIR:27,REFERENCE:30,REFINEMENT:31,MEMBER:32,PREFIX_OPERATOR:33,BRACKETED:34,CONDITIONAL:35,INFIX_OPERATOR:36,INVOCATION:40,SECTION_IF:50,SECTION_UNLESS:51,SECTION_EACH:52,SECTION_WITH:53},H=function(){var e
try{Object.create(null),e=Object.create}catch(t){e=function(){var e=function(){}
return function(t,n){var r
return null===t?{}:(e.prototype=t,r=new e,n&&Object.defineProperties(r,n),r)}}()}return e}(),G={expectedExpression:"Expected a JavaScript expression",expectedParen:"Expected closing paren"},$=function(e){var t=/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/
return function(n){var r
return(r=n.matchPattern(t))?{t:e.NUMBER_LITERAL,v:r}:null}}(V),K=function(e){return function(t){var n=t.remaining()
return"true"===n.substr(0,4)?(t.pos+=4,{t:e.BOOLEAN_LITERAL,v:"true"}):"false"===n.substr(0,5)?(t.pos+=5,{t:e.BOOLEAN_LITERAL,v:"false"}):null}}(V),Y=function(){var e,t,n
return e=/^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/,t=/^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/,n=/^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/,function(r){return function(i){var o,s,a,u
for(o=i.pos,s='"',a=!1;!a;)u=i.matchPattern(e)||i.matchPattern(t)||i.matchString(r),u?s+='"'===u?'\\"':"\\'"===u?"'":u:(u=i.matchPattern(n),u?s+="\\u"+("000"+u.charCodeAt(1).toString(16)).slice(-4):a=!0)
return s+='"',JSON.parse(s)}}}(),Q=function(e){return e('"')}(Y),J=function(e){return e("'")}(Y),Z=function(e,t,n){return function(r){var i,o
return i=r.pos,r.matchString('"')?(o=n(r),r.matchString('"')?{t:e.STRING_LITERAL,v:o}:(r.pos=i,null)):r.matchString("'")?(o=t(r),r.matchString("'")?{t:e.STRING_LITERAL,v:o}:(r.pos=i,null)):null}}(V,Q,J),X={name:/^[a-zA-Z_$][a-zA-Z_$0-9]*/},ee=function(e,t,n){var r=/^[a-zA-Z_$][a-zA-Z_$0-9]*$/
return function(i){var o
return(o=e(i))?r.test(o.v)?o.v:'"'+o.v.replace(/"/g,'\\"')+'"':(o=t(i))?o.v:(o=i.matchPattern(n.name))?o:void 0}}(Z,$,X),te=function(e,t){return function(n){var r,i,o
return r=n.pos,n.allowWhitespace(),i=t(n),null===i?(n.pos=r,null):(n.allowWhitespace(),n.matchString(":")?(n.allowWhitespace(),o=n.readExpression(),null===o?(n.pos=r,null):{t:e.KEY_VALUE_PAIR,k:i,v:o}):(n.pos=r,null))}}(V,ee),ne=function(e){return function t(n){var r,i,o,s
return r=n.pos,o=e(n),null===o?null:(i=[o],n.matchString(",")?(s=t(n),s?i.concat(s):(n.pos=r,null)):i)}}(te),re=function(e,t){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.matchString("{")?(i=t(n),n.allowWhitespace(),n.matchString("}")?{t:e.OBJECT_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(V,ne),ie=function(e){return function t(n){function r(e){o.push(e)}var i,o,s,a
return i=n.pos,n.allowWhitespace(),s=n.readExpression(),null===s?null:(o=[s],n.allowWhitespace(),n.matchString(",")&&(a=t(n),null===a&&n.error(e.expectedExpression),a.forEach(r)),o)}}(G),oe=function(e,t){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.matchString("[")?(i=t(n),n.matchString("]")?{t:e.ARRAY_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(V,ie),se=function(e,t,n,r,i){return function(o){var s=e(o)||t(o)||n(o)||r(o)||i(o)
return s}}($,K,Z,re,oe),ae=function(e,t){var n,r,i,o,s
return n=/^\.[a-zA-Z_$0-9]+/,i=function(e){var t=e.matchPattern(r)
return t?"."+t:null},r=/^\[(0|[1-9][0-9]*)\]/,o=/^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/,s=/^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/,function(r){var a,u,c,l,h,f,p
if(a=r.pos,r.matchString("~/"))u="~/"
else for(u="";r.matchString("../");)u+="../"
if(u||(l=r.matchString(".")||""),c=r.matchPattern(/^@(?:index|key)/)||r.matchPattern(t.name)||"",s.test(c))return r.pos=a,null
if(!u&&!l&&o.test(c))return{t:e.GLOBAL,v:c}
if(h=(u||l)+c,!h)return null
for(;f=r.matchPattern(n)||i(r);)h+=f
return r.matchString("(")&&(p=h.lastIndexOf("."),-1!==p?(h=h.substr(0,p),r.pos=a+h.length):r.pos-=1),{t:e.REFERENCE,n:h.replace(/^this\./,"./").replace(/^this$/,".")}}}(V,X),ue=function(e,t){return function(n){var r,i
return r=n.pos,n.matchString("(")?(n.allowWhitespace(),i=n.readExpression(),i||n.error(t.expectedExpression),n.allowWhitespace(),n.matchString(")")||n.error(t.expectedParen),{t:e.BRACKETED,x:i}):null}}(V,G),ce=function(e,t,n){return function(r){return e(r)||t(r)||n(r)}}(se,ae,ue),le=function(e,t,n){return function(r){var i,o,s
if(i=r.pos,r.allowWhitespace(),r.matchString(".")){if(r.allowWhitespace(),o=r.matchPattern(n.name))return{t:e.REFINEMENT,n:o}
r.error("Expected a property name")}return r.matchString("[")?(r.allowWhitespace(),s=r.readExpression(),s||r.error(t.expectedExpression),r.allowWhitespace(),r.matchString("]")||r.error("Expected ']'"),{t:e.REFINEMENT,x:s}):null}}(V,G,X),he=function(e,t,n,r,i){return function(o){var s,a,u,c
if(a=t(o),!a)return null
for(;a;)if(s=o.pos,u=r(o))a={t:e.MEMBER,x:a,r:u}
else{if(!o.matchString("("))break
o.allowWhitespace(),c=n(o),o.allowWhitespace(),o.matchString(")")||o.error(i.expectedParen),a={t:e.INVOCATION,x:a},c&&(a.o=c)}return a}}(V,ce,ie,le,G),fe=function(e,t,n){var r,i
return i=function(n,r){return function(i){var o
return(o=r(i))?o:i.matchString(n)?(i.allowWhitespace(),o=i.readExpression(),o||i.error(t.expectedExpression),{s:n,o:o,t:e.PREFIX_OPERATOR}):null}},function(){var e,t,o,s,a
for(s="! ~ + - typeof".split(" "),a=n,e=0,t=s.length;t>e;e+=1)o=i(s[e],a),a=o
r=a}(),r}(V,G,he),pe=function(e,t){var n,r
return r=function(t,n){return function(r){var i,o,s
if(o=n(r),!o)return null
for(;;){if(i=r.pos,r.allowWhitespace(),!r.matchString(t))return r.pos=i,o
if("in"===t&&/[a-zA-Z_$0-9]/.test(r.remaining().charAt(0)))return r.pos=i,o
if(r.allowWhitespace(),s=n(r),!s)return r.pos=i,o
o={t:e.INFIX_OPERATOR,s:t,o:[o,s]}}}},function(){var e,i,o,s,a
for(s="* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "),a=t,e=0,i=s.length;i>e;e+=1)o=r(s[e],a),a=o
n=a}(),n}(V,fe),de=function(e,t,n){return function(r){var i,o,s,a
return(o=t(r))?(i=r.pos,r.allowWhitespace(),r.matchString("?")?(r.allowWhitespace(),s=r.readExpression(),s||r.error(n.expectedExpression),r.allowWhitespace(),r.matchString(":")||r.error('Expected ":"'),r.allowWhitespace(),a=r.readExpression(),a||r.error(n.expectedExpression),{t:e.CONDITIONAL,o:[o,s,a]}):(r.pos=i,o)):null}}(V,pe,G),me=function(e,t){function n(e){return JSON.stringify(String(e))}function r(n,i){var o,s
if(n.t===e.REFERENCE&&-1===i.indexOf(n.n)&&i.unshift(n.n),s=n.o||n.m)if(t(s))r(s,i)
else for(o=s.length;o--;)r(s[o],i)
n.x&&r(n.x,i),n.r&&r(n.r,i),n.v&&r(n.v,i)}function i(t,r,o){var s=function(e){return i(t,e,o)}
switch(r.t){case e.BOOLEAN_LITERAL:case e.GLOBAL:case e.NUMBER_LITERAL:return r.v
case e.STRING_LITERAL:return n(r.v)
case e.ARRAY_LITERAL:return"["+(r.m?r.m.map(s).join(","):"")+"]"
case e.OBJECT_LITERAL:return"{"+(r.m?r.m.map(s).join(","):"")+"}"
case e.KEY_VALUE_PAIR:return r.k+":"+i(t,r.v,o)
case e.PREFIX_OPERATOR:return("typeof"===r.s?"typeof ":r.s)+i(t,r.o,o)
case e.INFIX_OPERATOR:return i(t,r.o[0],o)+("in"===r.s.substr(0,2)?" "+r.s+" ":r.s)+i(t,r.o[1],o)
case e.INVOCATION:return i(t,r.x,o)+"("+(r.o?r.o.map(s).join(","):"")+")"
case e.BRACKETED:return"("+i(t,r.x,o)+")"
case e.MEMBER:return i(t,r.x,o)+i(t,r.r,o)
case e.REFINEMENT:return r.n?"."+r.n:"["+i(t,r.x,o)+"]"
case e.CONDITIONAL:return i(t,r.o[0],o)+"?"+i(t,r.o[1],o)+":"+i(t,r.o[2],o)
case e.REFERENCE:return"_"+o.indexOf(r.n)
default:t.error("Expected legal JavaScript")}}var o
return o=function(e){var t,n=[]
return r(e,n),t={r:n,s:i(this,e,n)}}}(V,u),ge=function(e,t,n,r,i){var o,s,a=/^\s+/
return s=function(e){this.name="ParseError",this.message=e
try{throw new Error(e)}catch(t){this.stack=t.stack}},s.prototype=Error.prototype,o=function(e,t){var n,r,i=0
for(this.str=e,this.options=t||{},this.pos=0,this.lines=this.str.split("\n"),this.lineEnds=this.lines.map(function(e){var t=i+e.length+1
return i=t,t},0),this.init&&this.init(e,t),n=[];this.pos<this.str.length&&(r=this.read());)n.push(r)
this.leftover=this.remaining(),this.result=this.postProcess?this.postProcess(n,t):n},o.prototype={read:function(e){var t,n,r,i
for(e||(e=this.converters),t=this.pos,r=e.length,n=0;r>n;n+=1)if(this.pos=t,i=e[n](this))return i
return null},readExpression:function(){return r(this)},flattenExpression:i,getLinePos:function(e){for(var t,n=0,r=0;e>=this.lineEnds[n];)r=this.lineEnds[n],n+=1
return t=e-r,[n+1,t+1]},error:function(e){var t,n,r,i,o,a
throw t=this.getLinePos(this.pos),n=t[0],r=t[1],i=this.lines[t[0]-1],o=i+"\n"+new Array(t[1]).join(" ")+"^----",a=new s(e+" at line "+n+" character "+r+":\n"+o),a.line=t[0],a.character=t[1],a.shortMessage=e,a},matchString:function(e){return this.str.substr(this.pos,e.length)===e?(this.pos+=e.length,e):void 0},matchPattern:function(e){var t
return(t=e.exec(this.remaining()))?(this.pos+=t[0].length,t[1]||t[0]):void 0},allowWhitespace:function(){this.matchPattern(a)},remaining:function(){return this.str.substring(this.pos)},nextChar:function(){return this.str.charAt(this.pos)}},o.extend=function(e){var r,i,s=this
r=function(e,t){o.call(this,e,t)},r.prototype=t(s.prototype)
for(i in e)n.call(e,i)&&(r.prototype[i]=e[i])
return r.extend=o.extend,r},e.Parser=o,o}(o,H,s,de,me),ve=function(){var e=/^[^\s=]+/,t=/^\s+/
return function(n){var r,i,o
return n.matchString("=")?(r=n.pos,n.allowWhitespace(),(i=n.matchPattern(e))?n.matchPattern(t)?(o=n.matchPattern(e))?(n.allowWhitespace(),n.matchString("=")?[i,o]:(n.pos=r,null)):(n.pos=r,null):null:(n.pos=r,null)):null}}(),ye=[{delimiters:"delimiters",isTriple:!1,isStatic:!1},{delimiters:"tripleDelimiters",isTriple:!0,isStatic:!1},{delimiters:"staticDelimiters",isTriple:!1,isStatic:!0},{delimiters:"staticTripleDelimiters",isTriple:!0,isStatic:!0}],be=function(e){var t={"#":e.SECTION,"^":e.INVERTED,"/":e.CLOSING,">":e.PARTIAL,"!":e.COMMENT,"&":e.TRIPLE}
return function(e){var n=t[e.str.charAt(e.pos)]
return n?(e.pos+=1,n):null}}(V),we=function(e){return{"if":e.SECTION_IF,unless:e.SECTION_UNLESS,"with":e.SECTION_WITH,each:e.SECTION_EACH}}(V),xe=null,ke=function(e,t,n){function r(t,n,r){var o
if(n){for(;n.t===e.BRACKETED&&n.x;)n=n.x
return n.t===e.REFERENCE?r.r=n.n:n.t===e.NUMBER_LITERAL&&u.test(n.v)?r.r=n.v:(o=i(t,n))?r.rx=o:r.x=t.flattenExpression(n),r}}function i(t,n){for(var r,i=[];n.t===e.MEMBER&&n.r.t===e.REFINEMENT;)r=n.r,i.unshift(r.x?r.x.t===e.REFERENCE?r.x:t.flattenExpression(r.x):r.n),n=n.x
return n.t!==e.REFERENCE?null:{r:n.n,m:i}}var o,s,a=/^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,u=/^[0-9][1-9]*$/,c=new RegExp("^("+Object.keys(n).join("|")+")\\b")
return s=/^[a-zA-Z$_0-9]+(?:(\.[a-zA-Z$_0-9]+)|(\[[a-zA-Z$_0-9]+\]))*$/,o=function(n,i){var o,u,l,h,f,p,d,m,g,v
if(o=n.pos,l={},v=n[i.delimiters],i.isStatic&&(l.s=!0),i.isTriple)l.t=e.TRIPLE
else{if("!"===n.remaining()[0]){try{p=n.readExpression(),n.allowWhitespace(),n.remaining().indexOf(v[1])?p=null:l.t=e.INTERPOLATOR}catch(y){}if(!p)return g=n.remaining().indexOf(v[1]),~g?n.pos+=g:n.error("Expected closing delimiter ('"+v[1]+"')"),{t:e.COMMENT}}if(!p)if(h=t(n),l.t=h||e.INTERPOLATOR,h===e.SECTION)(f=n.matchPattern(c))&&(l.n=f),n.allowWhitespace()
else if((h===e.COMMENT||h===e.CLOSING)&&(m=n.remaining(),g=m.indexOf(v[1]),-1!==g))return l.r=m.substr(0,g).split(" ")[0],n.pos+=g,l}if(!p){n.allowWhitespace(),p=n.readExpression()
var b
if(l.t===e.PARTIAL&&p&&(b=n.readExpression())&&(l={contextPartialExpression:p},p=b),m=n.remaining(),m.substr(0,v[1].length)!==v[1]&&":"!==m.charAt(0)){if(u=n.pos,n.pos=o,m=n.remaining(),g=m.indexOf(v[1]),-1!==g)return l.r=m.substr(0,g).trim(),s.test(l.r)||n.error("Expected a legal Mustache reference"),n.pos+=g,l
n.pos=u}}return r(n,p,l),l.contextPartialExpression&&(l.contextPartialExpression=[r(n,l.contextPartialExpression,{t:e.PARTIAL})]),(d=n.matchPattern(a))&&(l.i=d),l}}(V,be,we,xe),Ee=function(e,t,n,r,i){function o(e){var t
return e.interpolate[e.inside]===!1?null:(t=n.slice().sort(function(t,n){return e[n.delimiters][0].length-e[t.delimiters][0].length}),function r(n){return n?s(e,n)||r(t.shift()):null}(t.shift()))}function s(n,o){var s,u,c,h,p,d,m,g,v
if(s=n.pos,c=n[o.delimiters],!n.matchString(c[0]))return null
if(u=t(n))return n.matchString(c[1])?(n[o.delimiters]=u,f):null
if(n.allowWhitespace(),u=r(n,o),null===u)return n.pos=s,null
if(n.allowWhitespace(),n.matchString(c[1])||n.error("Expected closing delimiter '"+c[1]+"' after reference"),u.t===e.COMMENT&&(u.exclude=!0),u.t===e.CLOSING&&(n.sectionDepth-=1,n.sectionDepth<0&&(n.pos=s,n.error("Attempted to close a section that wasn't open"))),u.contextPartialExpression)u.f=u.contextPartialExpression,u.t=e.SECTION,u.n="with",delete u.contextPartialExpression
else if(l(u)){for(n.sectionDepth+=1,h=[],m=h,p=u.n;g=n.read();){if(g.t===e.CLOSING){p&&g.r!==p&&n.error("Expected {{/"+p+"}}")
break}if(g.t===e.INTERPOLATOR&&"else"===g.r)switch(u.n){case"unless":n.error("{{else}} not allowed in {{#unless}}")
break
case"with":n.error("{{else}} not allowed in {{#with}}")
break
default:m=d=[]
continue}m.push(g)}h.length&&(u.f=h,!u.i&&"each"===u.n&&(v=a(u.f))&&(u.i=v)),d&&d.length&&(u.l=d)}return n.includeLinePositions&&(u.p=n.getLinePos(s)),u.n?u.n=i[u.n]:u.t===e.INVERTED&&(u.t=e.SECTION,u.n=e.SECTION_UNLESS),u}function a(t){var n,r,i,o
if(t)for(n=t.length;n--;){if(r=t[n],r.t===e.ELEMENT){if(i=a(r.o&&r.o.d)||a(r.t0&&r.t0.d)||a(r.t1&&r.t1.d)||a(r.t2&&r.t2.d)||a(r.f))return i
for(o in r.v)if(r.v.hasOwnProperty(o)&&r.v[o].d&&(i=a(r.v[o].d)))return i
for(o in r.a)if(r.a.hasOwnProperty(o)&&(i=a(r.a[o])))return i}if(r.t===e.INTERPOLATOR||r.t===e.TRIPLE||r.t===e.SECTION){if(r.r&&p.test(r.r))return r.r
if(r.x&&(i=u(r.x)))return i
if(r.rx&&(i=c(r.rx)))return i}}}function u(e){var t
for(t=e.r.length;t--;)if(p.test(e.r[t]))return e.r[t]}function c(t){var n,r,i
for(n=t.m.length;n--;){if(i=t.m[n],i.r&&(r=u(i)))return r
if(i.t===e.REFERENCE&&p.test(i.n))return i.n}}function l(t){return t.t===e.SECTION||t.t===e.INVERTED}var h,f={t:e.DELIMCHANGE,exclude:!0},p=/^@(?:index|key)$/
return h=o}(V,ve,ye,ke,we),_e=function(e){var t="<!--",n="-->"
return function(r){var i,o,s,a,u
return i=r.pos,r.matchString(t)?(s=r.remaining(),a=s.indexOf(n),-1===a&&r.error("Illegal HTML - expected closing comment sequence ('-->')"),o=s.substr(0,a),r.pos+=a+3,u={t:e.COMMENT,c:o},r.includeLinePositions&&(u.p=r.getLinePos(i)),u):null}}(V),Se=function(){var e=/^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i
return e}(),Ae=function(e,t){var n,r,i
for(n=t.length;n--;){if(r=e.indexOf(t[n]),!r)return 0;-1!==r&&(!i||i>r)&&(i=r)}return i||-1},Te=function(e){return function(t){var n,r,i,o
return r=t.remaining(),o=t.inside?"</"+t.inside:"<",t.inside&&!t.interpolate[t.inside]?n=r.indexOf(o):(i=[o,t.delimiters[0],t.tripleDelimiters[0],t.staticDelimiters[0],t.staticTripleDelimiters[0]],t.inAttribute===!0?i.push('"',"'","=",">","`"):t.inAttribute&&i.push(t.inAttribute),n=e(r,i)),n?(-1===n&&(n=r.length),t.pos+=n,r.substr(0,n)):null}}(Ae),Ce=function(e){var t=/^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/
return function(n){var r
return n.matchString("</")?(r=n.matchPattern(t))?{t:e.CLOSING_TAG,e:r}:(n.pos-=2,void n.error("Illegal closing tag")):null}}(V),Oe=function(){function e(e){return e?10===e?32:128>e?e:159>=e?r[e-128]:55296>e?e:57343>=e?65533:65535>=e?e:65533:65533}var t,n,r,i
return n={quot:34,amp:38,apos:39,lt:60,gt:62,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,copy:169,ordf:170,laquo:171,not:172,shy:173,reg:174,macr:175,deg:176,plusmn:177,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,sup1:185,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,Agrave:192,Aacute:193,Acirc:194,Atilde:195,Auml:196,Aring:197,AElig:198,Ccedil:199,Egrave:200,Eacute:201,Ecirc:202,Euml:203,Igrave:204,Iacute:205,Icirc:206,Iuml:207,ETH:208,Ntilde:209,Ograve:210,Oacute:211,Ocirc:212,Otilde:213,Ouml:214,times:215,Oslash:216,Ugrave:217,Uacute:218,Ucirc:219,Uuml:220,Yacute:221,THORN:222,szlig:223,agrave:224,aacute:225,acirc:226,atilde:227,auml:228,aring:229,aelig:230,ccedil:231,egrave:232,eacute:233,ecirc:234,euml:235,igrave:236,iacute:237,icirc:238,iuml:239,eth:240,ntilde:241,ograve:242,oacute:243,ocirc:244,otilde:245,ouml:246,divide:247,oslash:248,ugrave:249,uacute:250,ucirc:251,uuml:252,yacute:253,thorn:254,yuml:255,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,"int":8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},r=[8364,129,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,141,381,143,144,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,157,382,376],i=new RegExp("&(#?(?:x[\\w\\d]+|\\d+|"+Object.keys(n).join("|")+"));?","g"),t=function(t){return t.replace(i,function(t,r){var i
return i="#"!==r[0]?n[r]:"x"===r[1]?parseInt(r.substring(2),16):parseInt(r.substring(1),10),i?String.fromCharCode(e(i)):t})}}(xe),Ne=function(e,t,n){function r(e){var t,n,r
return e.allowWhitespace(),(n=e.matchPattern(l))?(t={name:n},r=i(e),r&&(t.value=r),t):null}function i(e){var t,r,i,o
return t=e.pos,e.allowWhitespace(),e.matchString("=")?(e.allowWhitespace(),r=e.pos,i=e.sectionDepth,o=a(e,"'")||a(e,'"')||s(e),e.sectionDepth!==i&&(e.pos=r,e.error("An attribute value must contain as many opening section tags as closing section tags")),null===o?(e.pos=t,null):o.length?1===o.length&&"string"==typeof o[0]?n(o[0]):o:null):(e.pos=t,null)}function o(t){var n,r,i,o,s
return n=t.pos,(r=t.matchPattern(h))?(i=r,o=[t.delimiters[0],t.tripleDelimiters[0],t.staticDelimiters[0],t.staticTripleDelimiters[0]],-1!==(s=e(i,o))&&(r=r.substr(0,s),t.pos=n+r.length),r):null}function s(e){var n,r
for(e.inAttribute=!0,n=[],r=t(e)||o(e);null!==r;)n.push(r),r=t(e)||o(e)
return n.length?(e.inAttribute=!1,n):null}function a(e,n){var r,i,o
if(r=e.pos,!e.matchString(n))return null
for(e.inAttribute=n,i=[],o=t(e)||u(e,n);null!==o;)i.push(o),o=t(e)||u(e,n)
return e.matchString(n)?(e.inAttribute=!1,i):(e.pos=r,null)}function u(t,n){var r,i,o,s
return r=t.pos,o=t.remaining(),s=[n,t.delimiters[0],t.tripleDelimiters[0],t.staticDelimiters[0],t.staticTripleDelimiters[0]],i=e(o,s),-1===i&&t.error("Quoted attribute value must have a closing quote"),i?(t.pos+=i,o.substr(0,i)):null}var c,l=/^[^\s"'>\/=]+/,h=/^[^\s"'=<>`]+/
return c=r}(Ae,Ee,Oe),Le=function(e,t,n){function r(e){var t,r,i
return e.allowWhitespace(),(t=n(e))?(i={key:t},e.allowWhitespace(),e.matchString(":")?(e.allowWhitespace(),(r=e.read())?(i.value=r.v,i):null):null):null}var i,o,s,a,u,c,l
return o={"true":!0,"false":!1,undefined:void 0,"null":null},s=new RegExp("^(?:"+Object.keys(o).join("|")+")"),a=/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,u=/\$\{([^\}]+)\}/g,c=/^\$\{([^\}]+)\}/,l=/^\s*$/,i=e.extend({init:function(e,t){this.values=t.values,this.allowWhitespace()},postProcess:function(e){return 1===e.length&&l.test(this.leftover)?{value:e[0].v}:null},converters:[function(e){var t
return e.values?(t=e.matchPattern(c),t&&e.values.hasOwnProperty(t)?{v:e.values[t]}:void 0):null},function(e){var t
return(t=e.matchPattern(s))?{v:o[t]}:void 0},function(e){var t
return(t=e.matchPattern(a))?{v:+t}:void 0},function(e){var n,r=t(e)
return r&&(n=e.values)?{v:r.v.replace(u,function(e,t){return t in n?n[t]:t})}:r},function(e){var t,n
if(!e.matchString("{"))return null
if(t={},e.allowWhitespace(),e.matchString("}"))return{v:t}
for(;n=r(e);){if(t[n.key]=n.value,e.allowWhitespace(),e.matchString("}"))return{v:t}
if(!e.matchString(","))return null}return null},function(e){var t,n
if(!e.matchString("["))return null
if(t=[],e.allowWhitespace(),e.matchString("]"))return{v:t}
for(;n=e.read();){if(t.push(n.v),e.allowWhitespace(),e.matchString("]"))return{v:t}
if(!e.matchString(","))return null
e.allowWhitespace()}return null}]}),function(e,t){var n=new i(e,{values:t})
return n.result}}(ge,Z,ee),Ie=function(e,t,n,r){var i,o=/^([a-zA-Z_$][a-zA-Z_$0-9]*)\(/
return i=e.extend({converters:[t]}),function(e){var t,s,a,u,c,l,h,f,p
if("string"==typeof e){if(s=o.exec(e))return t={m:s[1]},u="["+e.slice(t.m.length+1,-1)+"]",a=new i(u),t.a=n(a.result[0]),t
if(-1===e.indexOf(":"))return e.trim()
e=[e]}for(t={},h=[],f=[];e.length;)if(c=e.shift(),"string"==typeof c){if(l=c.indexOf(":"),-1!==l){l&&h.push(c.substr(0,l)),c.length>l+1&&(f[0]=c.substring(l+1))
break}h.push(c)}else h.push(c)
return f=f.concat(e),f.length||"string"!=typeof h?(t={n:1===h.length&&"string"==typeof h[0]?h[0]:h},1===f.length&&"string"==typeof f[0]?(p=r("["+f[0]+"]"),t.a=p?p.value:f[0].trim()):t.d=f):t=h,t}}(ge,de,me,Le),Re=function(e,t,n,r,i,o,s,a){function u(n){var r,i,o,u,l,f,w,x,k,E,_
if(r=n.pos,n.inside)return null
if(!n.matchString("<"))return null
if("/"===n.nextChar())return null
if(i={t:e.ELEMENT},n.includeLinePositions&&(i.p=n.getLinePos(r)),n.matchString("!")&&(i.y=1),i.e=n.matchPattern(p),!i.e)return null
for(d.test(n.nextChar())||n.error("Illegal tag name"),f=function(e,t){var r=t.n||t
v.test(r)&&(n.pos-=r.length,n.error("Cannot use reserved event names (change, reset, teardown, update)")),i.v[e]=t};w=s(n);)(u=y[w.name])?i[u]=a(w.value):(l=g.exec(w.name))?(i.v||(i.v={}),x=a(w.value),f(l[1],x)):n.sanitizeEventAttributes&&m.test(w.name)||(i.a||(i.a={}),i.a[w.name]=w.value||0)
if(n.allowWhitespace(),n.matchString("/")&&(k=!0),!n.matchString(">"))return null
if(o=i.e.toLowerCase(),!k&&!t.test(i.e)){for(("script"===o||"style"===o)&&(n.inside=o),E=[];c(o,n.remaining())&&(_=n.read(h))&&_.t!==e.CLOSING&&_.t!==e.CLOSING_TAG;)E.push(_)
E.length&&(i.f=E)}return n.inside=null,n.sanitizeElements&&-1!==n.sanitizeElements.indexOf(o)?b:i}function c(e,t){var n,r
return n=/^<([a-zA-Z][a-zA-Z0-9]*)/.exec(t),r=f[e],n&&r?!~r.indexOf(n[1].toLowerCase()):!0}var l,h,f,p=/^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/,d=/^[\s\n\/>]/,m=/^on/,g=/^on-([a-zA-Z\\*\\.$_][a-zA-Z\\*\\.$_0-9\-]+)$/,v=/^(?:change|reset|teardown|update)$/,y={"intro-outro":"t0",intro:"t1",outro:"t2",decorator:"o"},b={exclude:!0}
return h=[n,r,u,i,o],f={li:["li"],dt:["dt","dd"],dd:["dt","dd"],p:"address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul".split(" "),rt:["rt","rp"],rp:["rt","rp"],optgroup:["optgroup"],option:["option","optgroup"],thead:["tbody","tfoot"],tbody:["tbody","tfoot"],tfoot:["tbody"],tr:["tr","tbody"],td:["td","th","tr"],th:["td","th","tr"]},l=u}(V,Se,Ee,_e,Te,Ce,Ne,Ie),je=function(){var e=/^[ \t\f\r\n]+/,t=/[ \t\f\r\n]+$/
return function(n,r,i){var o
r&&(o=n[0],"string"==typeof o&&(o=o.replace(e,""),o?n[0]=o:n.shift())),i&&(o=n[n.length-1],"string"==typeof o&&(o=o.replace(t,""),o?n[n.length-1]=o:n.pop()))}}(),Pe=function(e){function t(e){return"string"==typeof e}function n(t){return t.t===e.COMMENT||t.t===e.DELIMCHANGE}function r(t){return(t.t===e.SECTION||t.t===e.INVERTED)&&t.f}var i,o=/^\s*\r?\n/,s=/\r?\n\s*$/
return i=function(e){var i,a,u,c,l
for(i=1;i<e.length;i+=1)a=e[i],u=e[i-1],c=e[i-2],t(a)&&n(u)&&t(c)&&s.test(c)&&o.test(a)&&(e[i-2]=c.replace(s,"\n"),e[i]=a.replace(o,"")),r(a)&&t(u)&&s.test(u)&&t(a.f[0])&&o.test(a.f[0])&&(e[i-1]=u.replace(s,"\n"),a.f[0]=a.f[0].replace(o,"")),t(a)&&r(u)&&(l=u.f[u.f.length-1],t(l)&&s.test(l)&&o.test(a)&&(u.f[u.f.length-1]=l.replace(s,"\n"),e[i]=a.replace(o,"")))
return e}}(V),Me=function(){var e=/[-\/\\^$*+?.()|[\]{}]/g
return function(t){return t.replace(e,"\\$&")}}(),De=function(e,t,n,r,i,o,s,a,u){function c(t,n,r,i,o,u){var l,h,f,p,y,b,w,x,k
for(a(t),l=t.length;l--;)h=t[l],h.exclude?t.splice(l,1):n&&h.t===e.COMMENT&&t.splice(l,1)
for(s(t,i,o),l=t.length;l--;)if(h=t[l],h.f&&(y=r||h.t===e.ELEMENT&&m.test(h.e),y||(f=t[l-1],p=t[l+1],(!f||"string"==typeof f&&v.test(f))&&(b=!0),(!p||"string"==typeof p&&g.test(p))&&(w=!0)),c(h.f,n,y,b,w,u)),h.l&&(c(h.l,n,r,b,w,u),u&&(x={t:4,n:e.SECTION_UNLESS,f:h.l},h.r&&(x.r=h.r),h.x&&(x.x=h.x),h.rx&&(x.rx=h.rx),t.splice(l+1,0,x),delete h.l)),h.a)for(k in h.a)h.a.hasOwnProperty(k)&&"string"!=typeof h.a[k]&&c(h.a[k],n,r,b,w,u)
for(l=t.length;l--;)"string"==typeof t[l]&&("string"==typeof t[l+1]&&(t[l]=t[l]+t[l+1],t.splice(l+1,1)),r||(t[l]=t[l].replace(d," ")),""===t[l]&&t.splice(l,1))}function l(e){var t=arguments[1]
void 0===t&&(t=e),t.delimiters=e.delimiters||["{{","}}"],t.tripleDelimiters=e.tripleDelimiters||["{{{","}}}"],t.staticDelimiters=e.staticDelimiters||["[[","]]"],t.staticTripleDelimiters=e.staticTripleDelimiters||["[[[","]]]"]}var h,f,p,d=/[ \t\f\r\n]+/g,m=/^(?:pre|script|style|textarea)$/i,g=/^\s+/,v=/\s+$/
return f=t.extend({init:function(e,t){l(t,this),this.sectionDepth=0,this.interpolate={script:!t.interpolate||t.interpolate.script!==!1,style:!t.interpolate||t.interpolate.style!==!1},t.sanitize===!0&&(t.sanitize={elements:"applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),eventAttributes:!0}),this.sanitizeElements=t.sanitize&&t.sanitize.elements,this.sanitizeEventAttributes=t.sanitize&&t.sanitize.eventAttributes,this.includeLinePositions=t.includeLinePositions},postProcess:function(e,t){return this.sectionDepth>0&&this.error("A section was left open"),c(e,t.stripComments!==!1,t.preserveWhitespace,!t.preserveWhitespace,!t.preserveWhitespace,t.rewriteElse!==!1),e},converters:[n,r,i,o]}),p=function(e){var t=arguments[1]
void 0===t&&(t={})
var n,r,i,o,s,a,c,h
if(l(t),c=new RegExp("<!--\\s*"+u(t.delimiters[0])+"\\s*>\\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\\s*"+u(t.delimiters[1])+"\\s*-->"),h=new RegExp("<!--\\s*"+u(t.delimiters[0])+"\\s*\\/\\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\\s*"+u(t.delimiters[1])+"\\s*-->"),n={v:1},c.test(e)){for(r=e,e="";s=c.exec(r);){if(o=s[1],e+=r.substr(0,s.index),r=r.substring(s.index+s[0].length),a=h.exec(r),!a||a[1]!==o)throw new Error('Inline partials must have a closing delimiter, and cannot be nested. Expected closing for "'+o+'", but '+(a?'instead found "'+a[1]+'"':" no closing found"));(i||(i={}))[o]=new f(r.substr(0,a.index),t).result,r=r.substring(a.index+a[0].length)}e+=r,n.p=i}return n.t=new f(e,t).result,n},h=p}(V,ge,Ee,_e,Re,Te,je,Pe,Me),Fe=function(){return function(e,t){var n=e.map(t)
return e.forEach(function(e,t){n[e]=n[t]}),n}}(xe),Be=function(e){var t,n
return t=["preserveWhitespace","sanitize","stripComments","delimiters","tripleDelimiters","interpolate"],n=e(t,function(e){return e})}(Fe),Ue=function(e,t,n,r,i){function o(e){var t=r(h)
return t.parse=function(t,n){return s(t,n||e)},t}function s(t,r){if(!n)throw new Error(e.missingParser)
return n(t,r||this.options)}function a(e,n){var r
if(!t){if(n&&n.noThrow)return
throw new Error("Cannot retrieve template #"+e+" as Ractive is not running in a browser.")}if(u(e)&&(e=e.substring(1)),!(r=document.getElementById(e))){if(n&&n.noThrow)return
throw new Error("Could not find template element with id #"+e)}if("SCRIPT"!==r.tagName.toUpperCase()){if(n&&n.noThrow)return
throw new Error("Template element with id #"+e+", must be a <script> element")}return r.innerHTML}function u(e){return"#"===e.charAt(0)}function c(e){return!("string"==typeof e)}function l(e){return e.defaults&&(e=e.defaults),i.reduce(function(t,n){return t[n]=e[n],t},{})}var h={parse:s,fromId:a,isHashedId:u,isParsed:c,getParseOptions:l,createHelper:o}
return h}(W,C,De,H,Be),qe=function(e,t){function n(e){var t,n=e._config.template
if(n&&n.fn)return t=r(e,n.fn),t!==n.result?(n.result=t,t=i(t,e)):void 0}function r(t,n){var r=e.createHelper(e.getParseOptions(t))
return n.call(t,t.data,r)}function i(n,r){if("string"==typeof n)"#"===n[0]&&(n=e.fromId(n)),n=t(n,e.getParseOptions(r))
else if(1!==n.v)throw new Error("Mismatched template version! Please ensure you are using the latest version of Ractive.js in your build process as well as in your app")
return n}function o(e,t,n){if(t)for(var r in t)(n||!e.hasOwnProperty(r))&&(e[r]=t[r])}var s={name:"template",extend:function(e,t,n){var r
"template"in n&&(r=n.template,"function"==typeof r?t.template=r:t.template=i(r,t))},init:function(e,t,n){var s,a
s="template"in n?n.template:e.prototype.template,"function"==typeof s&&(a=s,s=r(t,a),t._config.template={fn:a,result:s}),s=i(s,t),t.template=s.t,s.p&&o(t.partials,s.p)},reset:function(e){var t,r=n(e)
return r?(t=i(r,e),e.template=t.t,o(e.partials,t.p,!0),!0):void 0}}
return s}(Ue,De),ze=function(e){function t(e,t){this.name=e,this.useDefaults=t}function n(e,t){var r,i
return(r=t(e))?r:!e.isolated&&(i=e._parent)?n(i,t):void 0}return t.prototype={constructor:t,extend:function(e,t,n){this.configure(this.useDefaults?e.defaults:e,this.useDefaults?t:t.constructor,n)},init:function(e,t,n){this.configure(this.useDefaults?e.defaults:e,t,n)},configure:function(t,n,r){var i,o=this.name,s=r[o]
i=e(t[o])
for(var a in s)i[a]=s[a]
n[o]=i},reset:function(e){var t=e[this.name],n=!1
return Object.keys(t).forEach(function(e){var r=t[e]
r._fn&&(r._fn.isOwner?t[e]=r._fn:delete t[e],n=!0)}),n},findOwner:function(e,t){return e[this.name].hasOwnProperty(t)?e:this.findConstructor(e.constructor,t)},findConstructor:function(e,t){return e?e[this.name].hasOwnProperty(t)?e:this.findConstructor(e._parent,t):void 0},find:function(e,t){var r=this
return n(e,function(e){return e[r.name][t]})},findInstance:function(e,t){var r=this
return n(e,function(e){return e[r.name][t]?e:void 0})}},t}(H,xe),We=function(e,t){var n=["adaptors","components","computed","decorators","easing","events","interpolators","partials","transitions"],r=e(n,function(e){return new t(e,"computed"===e)})
return r}(Fe,ze),Ve=function(){},He=function(e){function t(t,n){var r
if(n in t){var i=t[n]
r="function"==typeof i?i:function(){return i}}else r=e
return r}var n
return n=function(e,n,r){if(!/_super/.test(r))return r
var i=function(){var e,o=t(i._parent,n),s="_super"in this,a=this._super
return this._super=o,e=r.apply(this,arguments),s?this._super=a:delete this._super,e}
return i._parent=e,i._method=r,i}}(Ve),Ge=function(e,t){function n(t,n,i){if(n in t){if(i in t)throw new Error(r(n,i,!0))
e(r(n,i)),t[i]=t[n]}}function r(e,t,n){return"options."+e+" has been deprecated in favour of options."+t+"."+(n?" You cannot specify both options, please use options."+t+".":"")}function i(e){n(e,"eventDefinitions","events")}function o(e){t(e.adaptors)&&n(e,"adaptors","adapt")}return function(e){i(e),o(e)}}(F,a),$e=function(e,t,n,r,i,o,s,a){function u(e,t,n,r,i){l[t][e](n,r,i)}function c(e,t,r,i){a(i),u(e,"data",t,r,i),f.parseOptions.forEach(function(e){e in i&&(r[e]=i[e])})
for(var o in i)if(o in n&&!(o in f.parseOptions)&&!(o in l)){var c=i[o]
r[o]="function"==typeof c?s(t.prototype,o,c):c}f.registries.forEach(function(n){n[e](t,r,i)}),u(e,"template",t,r,i),u(e,"css",t,r,i)}var l,h,f
l={data:t,template:r,css:e},h=Object.keys(n).filter(function(e){return!o[e]&&!l[e]&&!i[e]}),f=[].concat(l.data,i,h,o,l.template,l.css)
for(var p in l)f[p]=l[p]
return f.keys=Object.keys(n).concat(o.map(function(e){return e.name})).concat(["css"]),f.parseOptions=i,f.registries=o,f.extend=function(e,t,n){c("extend",e,t,n)},f.init=function(e,t,n){c("init",e,t,n),t._config&&(t._config.options=n)},f.reset=function(e){return f.filter(function(t){return t.reset&&t.reset(e)}).map(function(e){return e.name})},f}(U,z,r,qe,Be,We,He,Ge),Ke=function(e,t,n,r){function i(e){return function(){return e}}var o,s=function(e,o,s,a){if(e===o)return i(o)
if(a){var u=r.registries.interpolators.find(s,a)
if(u)return u(e,o)||i(o)
t('Missing "'+a+'" interpolator. You may need to download a plugin from [TODO]')}return n.number(e,o)||n.array(e,o)||n.object(e,o)||i(o)}
return e.interpolate=s,o=s}(o,F,l,$e),Ye=function(e,t,n){var r=function(e){var t
this.startTime=Date.now()
for(t in e)e.hasOwnProperty(t)&&(this[t]=e[t])
this.interpolator=n(this.from,this.to,this.root,this.interpolator),this.running=!0,this.tick()}
return r.prototype={tick:function(){var n,r,i,o,s,a
return a=this.keypath,this.running?(o=Date.now(),n=o-this.startTime,n>=this.duration?(null!==a&&(t.start(this.root),this.root.viewmodel.set(a,this.to),t.end()),this.step&&this.step(1,this.to),this.complete(this.to),s=this.root._animations.indexOf(this),-1===s&&e("Animation was not found"),this.root._animations.splice(s,1),this.running=!1,!1):(r=this.easing?this.easing(n/this.duration):n/this.duration,null!==a&&(i=this.interpolator(r),t.start(this.root),this.root.viewmodel.set(a,i),t.end()),this.step&&this.step(r,i),!0)):!1},stop:function(){var t
this.running=!1,t=this.root._animations.indexOf(this),-1===t&&e("Animation was not found"),this.root._animations.splice(t,1)}},r}(F,k,Ke),Qe=function(e,t,n,r,i){function o(t,o,s,a){var c,l,h,f
return o&&(o=n(o)),null!==o&&(f=t.viewmodel.get(o)),r.abort(o,t),e(f,s)?(a.complete&&a.complete(a.to),u):(a.easing&&(c="function"==typeof a.easing?a.easing:t.easing[a.easing],"function"!=typeof c&&(c=null)),l=void 0===a.duration?400:a.duration,h=new i({keypath:o,from:f,to:s,root:t,duration:l,easing:c,interpolator:a.interpolator,step:a.step,complete:a.complete}),r.add(h),t._animations.push(h),h)}var s,a=function(){},u={stop:a}
return s=function(e,n,r){var i,s,u,c,l,h,f,p,d,m,g,v,y,b
if(i=new t(function(e){s=e}),"object"==typeof e){r=n||{},h=r.easing,f=r.duration,l=[],p=r.step,d=r.complete,(p||d)&&(g={},r.step=null,r.complete=null,m=function(e){return function(t,n){g[e]=n}})
for(u in e)e.hasOwnProperty(u)&&((p||d)&&(v=m(u),r={easing:h,duration:f},p&&(r.step=v)),r.complete=d?v:a,l.push(o(this,u,e[u],r)))
return b={easing:h,duration:f},p&&(b.step=function(e){p(e,g)}),d&&i.then(function(e){d(e,g)}),b.complete=s,y=o(this,null,null,b),l.push(y),i.stop=function(){for(var e;e=l.pop();)e.stop()
y&&y.stop()},i}return r=r||{},r.complete&&i.then(r.complete),r.complete=s,c=o(this,e,n,r),i.stop=function(){c.stop()},i}}(y,m,R,D,Ye),Je=function(e){return function(){return this.detached?this.detached:(this.el&&e(this.el.__ractive_instances__,this),this.detached=this.fragment.detach(),this.detached)}}(d),Ze=function(e){return this.el?this.fragment.find(e):null},Xe=function(e,t,n){var r,i,o,s,a,u,c,l
if(e){for(i=n("div"),o=["matches","matchesSelector"],l=function(e){return function(t,n){return t[e](n)}},u=o.length;u--&&!r;)if(s=o[u],i[s])r=l(s)
else for(c=t.length;c--;)if(a=t[u]+s.substr(0,1).toUpperCase()+s.substring(1),i[a]){r=l(a)
break}r||(r=function(e,t){var n,r,o
for(r=e.parentNode,r||(i.innerHTML="",r=i,e=e.cloneNode(),i.appendChild(e)),n=r.querySelectorAll(t),o=n.length;o--;)if(n[o]===e)return!0
return!1})}else r=null
return r}(C,j,T),et=function(e){return function(t,n){var r=this._isComponentQuery?!this.selector||t.name===this.selector:e(t.node,this.selector)
return r?(this.push(t.node||t.instance),n||this._makeDirty(),!0):void 0}}(Xe),tt=function(){var e,t,n
e=this._root[this._isComponentQuery?"liveComponentQueries":"liveQueries"],t=this.selector,n=e.indexOf(t),-1!==n&&(e.splice(n,1),e[t]=null)},nt=function(){function e(e){var t
return(t=e.parentFragment)?t.owner:e.component&&(t=e.component.parentFragment)?t.owner:void 0}function t(t){var n,r
for(n=[t],r=e(t);r;)n.push(r),r=e(r)
return n}var n
return n=function(e,n){var r,i,o,s,a,u,c,l,h,f
for(r=t(e.component||e._ractive.proxy),i=t(n.component||n._ractive.proxy),o=r[r.length-1],s=i[i.length-1];o&&o===s;)r.pop(),i.pop(),a=o,o=r[r.length-1],s=i[i.length-1]
if(o=o.component||o,s=s.component||s,h=o.parentFragment,f=s.parentFragment,h===f)return u=h.items.indexOf(o),c=f.items.indexOf(s),u-c||r.length-i.length
if(l=a.fragments)return u=l.indexOf(h),c=l.indexOf(f),u-c||r.length-i.length
throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!")}}(),rt=function(e){return function(t,n){var r
return t.compareDocumentPosition?(r=t.compareDocumentPosition(n),2&r?1:-1):e(t,n)}}(nt),it=function(e,t){return function(){this.sort(this._isComponentQuery?t:e),this._dirty=!1}}(rt,nt),ot=function(e){return function(){var t=this
this._dirty||(this._dirty=!0,e.scheduleTask(function(){t._sort()}))}}(k),st=function(e){var t=this.indexOf(this._isComponentQuery?e.instance:e);-1!==t&&this.splice(t,1)},at=function(e,t,n,r,i,o){return function(s,a,u,c){var l=[]
return e(l,{selector:{value:a},live:{value:u},_isComponentQuery:{value:c},_test:{value:t}}),u?(e(l,{cancel:{value:n},_root:{value:s},_sort:{value:r},_makeDirty:{value:i},_remove:{value:o},_dirty:{value:!1,writable:!0}}),l):l}}(N,et,tt,it,ot,st),ut=function(e){return function(t,n){var r,i
return this.el?(n=n||{},r=this._liveQueries,(i=r[t])?n&&n.live?i:i.slice():(i=e(this,t,!!n.live,!1),i.live&&(r.push(t),r["_"+t]=i),this.fragment.findAll(t,i),i)):[]}}(at),ct=function(e){return function(t,n){var r,i
return n=n||{},r=this._liveComponentQueries,(i=r[t])?n&&n.live?i:i.slice():(i=e(this,t,!!n.live,!0),i.live&&(r.push(t),r["_"+t]=i),this.fragment.findAllComponents(t,i),i)}}(at),lt=function(e){return this.fragment.findComponent(e)},ht=function(e){return function(t){var n={args:Array.prototype.slice.call(arguments,1)}
e(this,t,n)}}(p),ft=function(e){var t={capture:!0}
return function(n){return n=e(n),this.viewmodel.get(n,t)}}(R),pt=function(e){var t
if(e&&"boolean"!=typeof e)return"undefined"!=typeof window&&document&&e?e.nodeType?e:"string"==typeof e&&(t=document.getElementById(e),!t&&document.querySelector&&(t=document.querySelector(e)),t&&t.nodeType)?t:e[0]&&e[0].nodeType?e[0]:null:null},dt=function(e){return function(t,n){if(!this.rendered)throw new Error("The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.")
if(t=e(t),n=e(n)||null,!t)throw new Error("You must specify a valid target to insert into")
t.insertBefore(this.detach(),n),this.el=t,(t.__ractive_instances__||(t.__ractive_instances__=[])).push(this),this.detached=null}}(pt),mt=function(e,t,n){return function(r,i,o){var s,a
return r=n(r),s=this.viewmodel.get(r),t(s)&&t(i)?(a=e.start(this,!0),this.viewmodel.merge(r,s,i,o),e.end(),o&&o.complete&&a.then(o.complete),a):this.set(r,i,o&&o.complete)}}(k,a,R),gt=function(e,t){var n=function(e,t,n,r){this.root=e,this.keypath=t,this.callback=n,this.defer=r.defer,this.priority=0,this.context=r&&r.context?r.context:e}
return n.prototype={init:function(e){this.value=this.root.viewmodel.get(this.keypath),e!==!1?this.update():this.oldValue=this.value},setValue:function(n){var r=this
t(n,this.value)||(this.value=n,this.defer&&this.ready?e.scheduleTask(function(){return r.update()}):this.update())},update:function(){this.updating||(this.updating=!0,this.callback.call(this.context,this.value,this.oldValue,this.keypath),this.oldValue=this.value,this.updating=!1)}},n}(k,y),vt=function(e){return function(t,n){function r(n,r){var i,o,s
i=t.viewmodel.wrapped[r]?t.viewmodel.wrapped[r].get():t.get(r)
for(o in i)!i.hasOwnProperty(o)||"_ractive"===o&&e(i)||(s=r?r+"."+o:o,n.push(s))
return n}function i(e){return function(t){return t?t+"."+e:e}}var o,s,a
for(o=n.split("."),a=[""];s=o.shift();)"*"===s?a=a.reduce(r,[]):""===a[0]?a[0]=s:a=a.map(i(s))
return a}}(a),yt=function(e){return function(t,n){var r,i
return r=e(t,n),i={},r.forEach(function(e){i[e]=t.get(e)}),i}}(vt),bt=function(e,t,n){var r,i=/\*/,o=Array.prototype.slice
return r=function(e,t,n,r){this.root=e,this.callback=n,this.defer=r.defer,this.keypath=t,this.regex=new RegExp("^"+t.replace(/\./g,"\\.").replace(/\*/g,"([^\\.]+)")+"$"),this.values={},this.defer&&(this.proxies=[]),this.priority="pattern",this.context=r&&r.context?r.context:e},r.prototype={init:function(e){var t,r
if(t=n(this.root,this.keypath),e!==!1)for(r in t)t.hasOwnProperty(r)&&this.update(r)
else this.values=t},update:function(t){var r,o=this
if(i.test(t)){r=n(this.root,t)
for(t in r)r.hasOwnProperty(t)&&this.update(t)}else if(!this.root.viewmodel.implicitChanges[t])return this.defer&&this.ready?void e.scheduleTask(function(){return o.getProxy(t).update()}):void this.reallyUpdate(t)},reallyUpdate:function(e){var n,r,i
return n=this.root.viewmodel.get(e),this.updating?void(this.values[e]=n):(this.updating=!0,t(n,this.values[e])&&this.ready||(r=o.call(this.regex.exec(e),1),i=[n,this.values[e],e].concat(r),this.callback.apply(this.context,i),this.values[e]=n),void(this.updating=!1))},getProxy:function(e){var t=this
return this.proxies[e]||(this.proxies[e]={update:function(){t.reallyUpdate(e)}}),this.proxies[e]}},r}(k,y,yt),wt=function(e,t,n){var r=/\*/,i={}
return function(o,s,a,u){var c,l,h
return s=e(s),u=u||i,r.test(s)?(c=new n(o,s,a,u),o.viewmodel.patternObservers.push(c),l=!0):c=new t(o,s,a,u),o.viewmodel.register(s,c,l?"patternObservers":"observers"),c.init(u.init),c.ready=!0,{cancel:function(){var e
h||(l?(e=o.viewmodel.patternObservers.indexOf(c),o.viewmodel.patternObservers.splice(e,1),o.viewmodel.unregister(s,c,"patternObservers")):o.viewmodel.unregister(s,c,"observers"),h=!0)}}}}(R,gt,bt),xt=function(e,t){return function(n,r,i){var o,s,a,u
if(e(n)){i=r,s=n,o=[]
for(n in s)s.hasOwnProperty(n)&&(r=s[n],o.push(this.observe(n,r,i)))
return{cancel:function(){for(;o.length;)o.pop().cancel()}}}if("function"==typeof n)return i=r,r=n,n="",t(this,n,r,i)
if(a=n.split(" "),1===a.length)return t(this,n,r,i)
for(o=[],u=a.length;u--;)n=a[u],n&&o.push(t(this,n,r,i))
return{cancel:function(){for(;o.length;)o.pop().cancel()}}}}(u,wt),kt=function(e){return e.trim()},Et=function(e){return""!==e},_t=function(e,t){return function(n,r){var i,o=this
if(n)i=n.split(" ").map(e).filter(t),i.forEach(function(e){var t,n;(t=o._subs[e])&&(r?(n=t.indexOf(r),-1!==n&&t.splice(n,1)):o._subs[e]=[])})
else for(n in this._subs)delete this._subs[n]
return this}}(kt,Et),St=function(e,t){return function(n,r){var i,o,s,a=this,u=this
if("object"==typeof n){i=[]
for(o in n)n.hasOwnProperty(o)&&i.push(this.on(o,n[o]))
return{cancel:function(){for(var e;e=i.pop();)e.cancel()}}}return s=n.split(" ").map(e).filter(t),s.forEach(function(e){(a._subs[e]||(a._subs[e]=[])).push(r)}),{cancel:function(){u.off(n,r)}}}}(kt,Et),At=function(e,t,n){switch(t){case"splice":return n
case"sort":case"reverse":return null
case"pop":return e.length?[-1]:null
case"push":return[e.length,0].concat(n)
case"shift":return[0,1]
case"unshift":return[0,0].concat(n)}},Tt=function(e,t){var n,r,i,o,s,a
return t?(n=+(t[0]<0?e.length+t[0]:t[0]),0>n?n=0:n>e.length&&(n=e.length),o=Math.max(0,t.length-2),s=void 0!==t[1]?t[1]:e.length-n,s=Math.min(s,e.length-n),a=o-s,i=e.length+a,r=a?Math.max(e.length,i):n+o,{rangeStart:n,rangeEnd:r,balance:a,added:o,removed:s}):null},Ct=function(e,t,n,r){var i=Array.prototype
return function(o){return function(s){var a,u,c,l,h,f=Array.prototype.slice,p=f.call(arguments,1)
if(a=this.get(s),!e(a))throw new Error("Called ractive."+o+"('"+s+"'), but '"+s+"' does not refer to an array")
return u=n(a,o,p),c=r(a,u),h=c?i.splice.apply(a,u):i[o].apply(a,p),l=t.start(this,!0),c?this.viewmodel.splice(s,c):this.viewmodel.mark(s),t.end(),("splice"===o||"pop"===o||"shift"===o)&&(l=l.then(function(){return h})),l}}}(a,k,At,Tt),Ot=function(e){return e("pop")}(Ct),Nt=function(e){return e("push")}(Ct),Lt=function(e,t,n){var r,i,o,s,a,u,c,l="/* Ractive.js component styles */\n",h={},f=[]
return t?(e.push(function(){o=e.runloop}),s=document.createElement("style"),s.type="text/css",a=document.getElementsByTagName("head")[0],c=!1,u=s.styleSheet,i=function(){var e
f.length?(e=l+f.join(" "),u?u.cssText=e:s.innerHTML=e,c||(a.appendChild(s),c=!0)):c&&(a.removeChild(s),c=!1)},r={add:function(e){e.css&&(h[e._guid]||(h[e._guid]=0,f.push(e.css),o.scheduleTask(i)),h[e._guid]+=1)},remove:function(e){e.css&&(h[e._guid]-=1,h[e._guid]||(n(f,e.css),o.scheduleTask(i)))}}):r=null,r}(o,C,d),It=function(e,t,n){function r(e){var t=i(e)
for(e.init&&e.init(e._config.options);t.length;)r(t.shift())
s[e._guid]=null}function i(e){return s[e._guid]||(s[e._guid]=[])}var o,s={},a={}
return o=function(o,s){var u,c,l,h=this
if(a[this._guid]=!0,l=this.transitionsEnabled,this.noIntro&&(this.transitionsEnabled=!1),u=e.start(this,!0),this.rendered)throw new Error("You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first")
return o=n(o)||this.el,s=n(s)||this.anchor,this.el=o,this.anchor=s,this.constructor.css&&t.add(this.constructor),o&&((c=o.__ractive_instances__)?c.push(this):o.__ractive_instances__=[this],s?o.insertBefore(this.fragment.render(),s):o.appendChild(this.fragment.render())),this._hasInited||(this._hasInited=!0,this._parent&&a[this._parent._guid]?i(this._parent).push(this):r(this)),a[this._guid]=!1,e.end(),this.rendered=!0,this.transitionsEnabled=l,this.complete&&u.then(function(){return h.complete()}),u}}(k,Lt,pt),Rt=function(){this.dirtyValue=this.dirtyArgs=!0,this.bound&&"function"==typeof this.owner.bubble&&this.owner.bubble()},jt=function(){var e
return 1===this.items.length?this.items[0].detach():(e=document.createDocumentFragment(),this.items.forEach(function(t){e.appendChild(t.detach())}),e)},Pt=function(e){var t,n,r,i
if(this.items){for(n=this.items.length,t=0;n>t;t+=1)if(r=this.items[t],r.find&&(i=r.find(e)))return i
return null}},Mt=function(e,t){var n,r,i
if(this.items)for(r=this.items.length,n=0;r>n;n+=1)i=this.items[n],i.findAll&&i.findAll(e,t)
return t},Dt=function(e,t){var n,r,i
if(this.items)for(r=this.items.length,n=0;r>n;n+=1)i=this.items[n],i.findAllComponents&&i.findAllComponents(e,t)
return t},Ft=function(e){var t,n,r,i
if(this.items){for(t=this.items.length,n=0;t>n;n+=1)if(r=this.items[n],r.findComponent&&(i=r.findComponent(e)))return i
return null}},Bt=function(e){var t,n=e.index
return t=this.items[n+1]?this.items[n+1].firstNode():this.owner===this.root?this.owner.component?this.owner.component.findNextNode():null:this.owner.findNextNode(this)},Ut=function(){return this.items&&this.items[0]?this.items[0].firstNode():null},qt=function(){var e=this
do if(e.pElement)return e.pElement.node
while(e=e.parent)
return this.root.detached||this.root.el},zt=function(e){function t(e,n,r,i){return i=i||0,e.map(function(e){var o,s,a
return e.text?e.text:e.fragments?e.fragments.map(function(e){return t(e.items,n,r,i)}).join(""):(o=r+"-"+i++,a=(s=e.root.viewmodel.wrapped[e.keypath])?s.value:e.getValue(),n[o]=a,"${"+o+"}")}).join("")}var n,r={}
return n=function(){var n=arguments[0]
void 0===n&&(n=r)
var i,o,s,a,u,c,l
return i=n.args,u=i?"argsList":"value",c=i?"dirtyArgs":"dirtyValue",this[c]&&(s=t(this.items,o={},this.root._guid),a=e(i?"["+s+"]":s,o),l=a?a.value:i?[this.toString()]:this.toString(),this[u]=l,this[c]=!1),this[u]}}(Le),Wt=function(){var e=/</g,t=/>/g
return function(n){return n.replace(e,"&lt;").replace(t,"&gt;")}}(),Vt=function(e){return e&&e.parentNode&&e.parentNode.removeChild(e),e},Ht=function(e){return function(){return e(this.node)}}(Vt),Gt=function(e,t,n,r){var i=function(t){this.type=e.TEXT,this.text=t.template}
return i.prototype={detach:n,firstNode:function(){return this.node},render:function(){return this.node||(this.node=document.createTextNode(r(this.text))),this.node},toString:function(e){return e?t(this.text):this.text},unrender:function(e){return e?this.detach():void 0}},i}(V,Wt,Ht,Oe),$t=function(e){return function(){this.keypath?this.root.viewmodel.unregister(this.keypath,this):e.removeUnresolved(this),this.resolver&&this.resolver.unbind()}}(k),Kt=function(){return this.value},Yt=function(e){var t=function(t,n,r,i){this.root=t,this.ref=n,this.parentFragment=r,this.resolve=i,e.addUnresolved(this)}
return t.prototype={unbind:function(){e.removeUnresolved(this)}},t}(k),Qt=function(e,t){return e&&t&&e.substr(0,t.length+1)===t+"."},Jt=function(e){return function(t,n,r){return t===n?void 0!==r?r:null:e(t,n)?null===r?r:t.replace(n+".",r+"."):void 0}}(Qt),Zt=function(e,t){function n(e){var n=t[e.message]||e.message||""
return r(n,e.args)}function r(e,t){return e.replace(/{([^{}]*)}/g,function(e,n){return t[n]})}var i={warn:function(e,t){(e.debug||t)&&this.logger(n(e),e.allowDuplicates)},error:function(e){this.errorOnly(e),e.debug||this.warn(e,!0)},errorOnly:function(e){e.debug&&this.critical(e)},critical:function(e){var t=e.err||new Error(n(e))
this.thrower(t)},logger:e,thrower:function(e){throw e}}
return i}(F,W),Xt=function(){var e={}
return function(t,n){var r,i
if(e[t])return e[t]
for(i=[];n--;)i[n]="_"+n
return r=new Function(i.join(","),"return("+t+")"),e[t]=r,r}}(),en=function(e,t,n){var r,i
for(r=t.length;r--;)i=t[r],-1===n.indexOf(i)&&e.viewmodel.unregister(i,e,"computed")
for(r=n.length;r--;)i=n[r],-1===t.indexOf(i)&&e.viewmodel.register(i,e,"computed")
e.dependencies=n.slice()},tn=function(e,t,n,r,i){function o(e,t){var r,i,o
if(e._noWrap)return e
if(i="__ractive_"+t._guid,r=e[i])return r
if(/this/.test(e.toString())){n(e,i,{value:c.call(e,t)})
for(o in e)e.hasOwnProperty(o)&&(e[i][o]=e[o])
return e[i]}return n(e,"__ractive_nowrap",{value:e}),e.__ractive_nowrap}function s(e){return"function"==typeof e?e():e}var a,u,c=Function.prototype.bind
return u=function(e,t,n,i,s,a){var u=this,c=e.viewmodel
u.root=e,u.viewmodel=c,u.uniqueString=n,u.keypath=t,u.priority=a,u.fn=r(i,s.length),u.explicitDependencies=[],u.dependencies=[],u.argumentGetters=s.map(function(t){var n,r
return t?t.indexRef?r=t.value:(n=t.keypath,u.explicitDependencies.push(n),c.register(n,u,"computed"),function(){var t=c.get(n)
return"function"==typeof t?o(t,e):t}):void 0})},u.prototype={wake:function(){this.awake=!0},sleep:function(){this.awake=!1},getValue:function(){var t,n,r
if(t=this.argumentGetters.map(s),!this.updating){this.updating=!0,this.viewmodel.capture()
try{n=this.fn.apply(null,t)}catch(o){this.root.debug&&e.warn({debug:this.root.debug,message:"evaluationError",args:{uniqueString:this.uniqueString,err:o.message||o}}),n=void 0}return r=this.viewmodel.release(),i(this,this.dependencies,r),this.updating=!1,n}},update:function(){var e=this.getValue()
return t(e,this.value)||(this.value=e,this.root.viewmodel.mark(this.keypath)),this},teardown:function(){var e=this
this.explicitDependencies.concat(this.dependencies).forEach(function(t){return e.viewmodel.unregister(t,e,"computed")}),this.root.viewmodel.evaluators[this.keypath]=null}},a=u}(Zt,y,O,Xt,en,xe),nn=function(e,t,n,r,i){function o(e,t){return e.replace(/_([0-9]+)/g,function(e,n){var r=t[n]
return r?r.indexRef?r.value:r.keypath:"undefined"})}function s(e){return"${"+e.replace(/[\.\[\]]/g,"-")+"}"}var a,u=function(r,i,o,s){var a,u,c,l=this
return a=r.root,this.root=a,this.callback=s,this.owner=r,this.str=o.s,this.args=c=[],this.unresolved=[],this.pending=0,u=i.indexRefs,o.r&&o.r.length?(o.r.forEach(function(r,o){var s,h,f
return u&&void 0!==(s=u[r])?void(c[o]={indexRef:r,value:s}):(h=t(a,r,i))?void(c[o]={keypath:h}):"."===r?void(c[o]={"":""}):(c[o]=null,l.pending+=1,f=new n(a,r,i,function(t){l.resolve(o,t),e(l.unresolved,f)}),void l.unresolved.push(f))}),this.ready=!0,void this.bubble()):(this.resolved=this.ready=!0,void this.bubble())}
return u.prototype={bubble:function(){this.ready&&(this.uniqueString=o(this.str,this.args),this.keypath=s(this.uniqueString),this.createEvaluator(),this.callback(this.keypath))},unbind:function(){for(var e;e=this.unresolved.pop();)e.unbind()},resolve:function(e,t){this.args[e]={keypath:t},this.bubble(),this.resolved=!--this.pending},createEvaluator:function(){var e=this.root.viewmodel.evaluators[this.keypath]
e||(e=new r(this.root,this.keypath,this.uniqueString,this.str,this.args,this.owner.priority),this.root.viewmodel.evaluators[this.keypath]=e),e.update()},rebind:function(e,t,n,r){var o
this.args.forEach(function(s){var a
s&&(s.keypath&&(a=i(s.keypath,n,r))?(s.keypath=a,o=!0):s.indexRef&&s.indexRef===e&&(s.value=t,o=!0))}),o&&this.bubble()}},a=u}(d,w,Yt,tn,Jt),rn=function(e,t,n,r,i){var o=function(r,o,s){var a,u,c,l,h,f=this
f.resolver=o,f.root=o.root,f.viewmodel=o.root.viewmodel,"string"==typeof r?f.value=r:r.t===e.REFERENCE?(a=f.ref=r.n,(u=s.indexRefs)&&void 0!==(c=u[a])?(f.indexRef=a,f.value=c):(l=o.root,(h=t(l,a,s))?f.resolve(h):f.unresolved=new n(l,a,s,function(e){f.unresolved=null,f.resolve(e)}))):new i(o,s,r,function(e){f.resolve(e)})}
return o.prototype={resolve:function(e){this.keypath=e,this.value=this.viewmodel.get(e),this.bind(),this.resolver.bubble()},bind:function(){this.viewmodel.register(this.keypath,this)},rebind:function(e,t,n,i){var o
if(e&&this.indexRef===e){if(t!==this.value)return this.value=t,!0}else if(this.keypath&&(o=r(this.keypath,n,i)))return this.unbind(),this.keypath=o,this.value=this.root.viewmodel.get(o),this.bind(),!0},setValue:function(e){this.value=e,this.resolver.bubble()},unbind:function(){this.keypath&&this.root.viewmodel.unregister(this.keypath,this),this.unresolved&&this.unresolved.unbind()},forceResolution:function(){this.unresolved&&(this.unresolved.unbind(),this.unresolved=null,this.keypath=this.ref,this.value=this.viewmodel.get(this.ref),this.bind())}},o}(V,w,Yt,Jt,nn),on=function(e,t,n){function r(e){return e.value}function i(e){return void 0!=e}function o(e){e.unbind()}var s=function(r,i,o){var s,a,u,c,l=this,h=this
c=r.parentFragment,h.root=s=r.root,h.mustache=r,h.priority=r.priority,h.ref=a=i.r,h.callback=o,h.unresolved=[],(u=e(s,a,c))?h.base=u:h.baseResolver=new t(s,a,c,function(e){h.base=e,h.baseResolver=null,h.bubble()}),h.members=i.m.map(function(e){return new n(e,l,c)}),h.ready=!0,h.bubble()}
return s.prototype={getKeypath:function(){var e=this.members.map(r)
return!e.every(i)||this.baseResolver?null:this.base+"."+e.join(".")},bubble:function(){this.ready&&!this.baseResolver&&this.callback(this.getKeypath())},unbind:function(){this.members.forEach(o)},rebind:function(e,t,n,r){var i
this.members.forEach(function(o){o.rebind(e,t,n,r)&&(i=!0)}),i&&this.bubble()},forceResolution:function(){this.baseResolver&&(this.base=this.ref,this.baseResolver.unbind(),this.baseResolver=null),this.members.forEach(function(e){return e.forceResolution()}),this.bubble()}},s}(w,Yt,rn),sn=function(e,t,n,r,i){return function(o,s){function a(e){var t=o.keypath
e!==t&&(o.resolve(e),void 0!==t&&o.fragments&&o.fragments.forEach(function(n){n.rebind(null,null,t,e)}))}var u,c,l,h,f,p
if(f=s.parentFragment,p=s.template,o.root=f.root,o.parentFragment=f,o.pElement=f.pElement,o.template=s.template,o.index=s.index||0,o.priority=f.priority,o.isStatic=s.template.s,o.type=s.template.t,u=p.r){if(l=f.indexRefs,l&&void 0!==(h=l[u]))return o.indexRef=u,void o.setValue(h)
c=n(o.root,u,o.parentFragment),void 0!==c?o.resolve(c):(o.ref=u,t.addUnresolved(o))}s.template.x&&(o.resolver=new i(o,f,s.template.x,a)),s.template.rx&&(o.resolver=new r(o,s.template.rx,a)),o.template.n!==e.SECTION_UNLESS||o.hasOwnProperty("value")||o.setValue(void 0)}}(V,k,w,on,nn),an=function(e){var t,n,r
void 0!=this.keypath&&(this.root.viewmodel.unregister(this.keypath,this),t=!0),this.keypath=e,void 0!=e&&(n=this.root.viewmodel.get(e),this.root.viewmodel.register(e,this)),this.setValue(n),t&&(r=this.twowayBinding)&&r.rebound()},un=function(e){return function(t,n,r,i){var o
this.fragments&&this.fragments.forEach(function(e){return e.rebind(t,n,r,i)}),this.resolver&&this.resolver.rebind(t,n,r,i),void 0!==this.keypath?(o=e(this.keypath,r,i),void 0!==o&&this.resolve(o)):void 0!==t&&this.indexRef===t&&this.setValue(n)}}(Jt),cn=function(e,t,n,r){return{getValue:e,init:t,resolve:n,rebind:r}}(Kt,sn,an,un),ln=function(e,t,n,r,i,o,s,a){var u=function(t){this.type=e.INTERPOLATOR,s.init(this,t)}
return u.prototype={update:function(){this.node.data=void 0==this.value?"":this.value},resolve:s.resolve,rebind:s.rebind,detach:a,unbind:o,render:function(){return this.node||(this.node=document.createTextNode(void 0!=this.value?this.value:"")),this.node},unrender:function(e){e&&r(this.node)},getValue:s.getValue,setValue:function(e){var n;(n=this.root.viewmodel.wrapped[this.keypath])&&(e=n.get()),i(e,this.value)||(this.value=e,this.parentFragment.bubble(),this.node&&t.addView(this))},firstNode:function(){return this.node},toString:function(e){var t=void 0!=this.value?""+this.value:""
return e?n(t):t}},u}(V,k,Wt,Vt,y,$t,cn,Ht),hn=function(){this.parentFragment.bubble()},fn=function(){var e
return 1===this.fragments.length?this.fragments[0].detach():(e=document.createDocumentFragment(),this.fragments.forEach(function(t){e.appendChild(t.detach())}),e)},pn=function(e){var t,n,r
for(n=this.fragments.length,t=0;n>t;t+=1)if(r=this.fragments[t].find(e))return r
return null},dn=function(e,t){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAll(e,t)},mn=function(e,t){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAllComponents(e,t)},gn=function(e){var t,n,r
for(n=this.fragments.length,t=0;n>t;t+=1)if(r=this.fragments[t].findComponent(e))return r
return null},vn=function(e){return this.fragments[e.index+1]?this.fragments[e.index+1].firstNode():this.parentFragment.findNextNode(this)},yn=function(){var e,t,n
if(e=this.fragments.length)for(t=0;e>t;t+=1)if(n=this.fragments[t].firstNode())return n
return this.parentFragment.findNextNode(this)},bn=function(e,t){var n
return t.push(function(){n=t.Fragment}),function(t){var n,r,i,o,s,a,u,c,l=this
if(!this.unbound){if(n=this.parentFragment,s=[],t.forEach(function(e,t){var n,i,o,a
return e===t?void(s[e]=l.fragments[t]):(n=l.fragments[t],void 0===r&&(r=t),-1===e?(l.fragmentsToUnrender.push(n),void n.unbind()):(i=e-t,o=l.keypath+"."+t,a=l.keypath+"."+e,n.rebind(l.template.i,e,o,a),void(s[e]=n)))}),o=this.root.get(this.keypath).length,void 0===r){if(this.length===o)return
r=this.length}for(this.length=this.fragments.length=o,e.addView(this),a={template:this.template.f,root:this.root,owner:this},this.template.i&&(a.indexRef=this.template.i),i=r;o>i;i+=1)(u=s[i])?this.docFrag.appendChild(u.detach(!1)):this.fragmentsToCreate.push(i),this.fragments[i]=u
c=n.findNextNode(this),this.parentFragment.getNode().insertBefore(this.docFrag,c)}}}(k,o),wn=function(){var e
return e=this.docFrag=document.createDocumentFragment(),this.update(),this.rendered=!0,e},xn=function(e,t,n,r,i){function o(r,i){var o={template:r.template.f,root:r.root,pElement:r.parentFragment.pElement,owner:r}
if(r.subtype)switch(r.subtype){case e.SECTION_IF:return c(r,i,!1,o)
case e.SECTION_UNLESS:return c(r,i,!0,o)
case e.SECTION_WITH:return u(r,o)
case e.SECTION_EACH:if(n(i))return a(r,i,o)}return r.ordered=!!t(i),r.ordered?s(r,i,o):n(i)||"function"==typeof i?r.template.i?a(r,i,o):u(r,o):c(r,i,!1,o)}function s(e,t,n){var r,i,o
if(i=t.length,i===e.length)return!1
if(i<e.length)e.fragmentsToUnrender=e.fragments.splice(i,e.length-i),e.fragmentsToUnrender.forEach(l)
else if(i>e.length)for(r=e.length;i>r;r+=1)n.context=e.keypath+"."+r,n.index=r,e.template.i&&(n.indexRef=e.template.i),o=new p(n),e.fragmentsToRender.push(e.fragments[r]=o)
return e.length=i,!0}function a(e,t,n){var r,i,o,s,a
for(o=e.hasKey||(e.hasKey={}),i=e.fragments.length;i--;)s=e.fragments[i],s.index in t||(a=!0,s.unbind(),e.fragmentsToUnrender.push(s),e.fragments.splice(i,1),o[s.index]=!1)
for(r in t)o[r]||(a=!0,n.context=e.keypath+"."+r,n.index=r,e.template.i&&(n.indexRef=e.template.i),s=new p(n),e.fragmentsToRender.push(s),e.fragments.push(s),o[r]=!0)
return e.length=e.fragments.length,a}function u(e,t){var n
return e.length?void 0:(t.context=e.keypath,t.index=0,n=new p(t),e.fragmentsToRender.push(e.fragments[0]=n),e.length=1,!0)}function c(e,n,r,i){var o,s,a
if(s=t(n)&&0===n.length,o=r?s||!n:n&&!s){if(!e.length)return i.index=0,a=new p(i),e.fragmentsToRender.push(e.fragments[0]=a),e.length=1,!0
if(e.length>1)return e.fragmentsToUnrender=e.fragments.splice(1),e.fragmentsToUnrender.forEach(l),!0}else if(e.length)return e.fragmentsToUnrender=e.fragments.splice(0,e.fragments.length).filter(h),e.fragmentsToUnrender.forEach(l),e.length=e.fragmentsToRender.length=0,!0}function l(e){e.unbind()}function h(e){return e.rendered}var f,p
return i.push(function(){p=i.Fragment}),f=function(e){var t,n,i=this
this.updating||(this.updating=!0,(t=this.root.viewmodel.wrapped[this.keypath])&&(e=t.get()),this.fragmentsToCreate.length?(n={template:this.template.f,root:this.root,pElement:this.pElement,owner:this,indexRef:this.template.i},this.fragmentsToCreate.forEach(function(e){var t
n.context=i.keypath+"."+e,n.index=e,t=new p(n),i.fragmentsToRender.push(i.fragments[e]=t)}),this.fragmentsToCreate.length=0):o(this,e)&&(this.bubble(),this.rendered&&r.addView(this)),this.value=e,this.updating=!1)}}(V,a,u,k,o),kn=function(e,t){function n(e){e.unbind()}function r(e,t){var n,r=[]
for(n=e;t>n;n+=1)r.push(n)
return r}function i(e,t,n,r){var i,o,s,a,u
for(s=e.template.i,i=t;n>i;i+=1)o=e.fragments[i],a=e.keypath+"."+(i-r),u=e.keypath+"."+i,o.index=i,o.rebind(s,i,a,u)}var o,s
return t.push(function(){s=t.Fragment}),o=function(t){var o,s,a,u,c,l=this
if(!this.unbound&&(o=t.balance)){if(e.addView(l),s=t.rangeStart,l.length+=o,0>o)return l.fragmentsToUnrender=l.fragments.splice(s,-o),l.fragmentsToUnrender.forEach(n),void i(l,s,l.length,o)
a=s+t.removed,u=s+t.added,c=[a,0],c.length+=o,l.fragments.splice.apply(l.fragments,c),i(l,u,l.length,o),l.fragmentsToCreate=r(a,u)}}}(k,o),En=function(e){var t,n,r
for(t="",n=0,r=this.length,n=0;r>n;n+=1)t+=this.fragments[n].toString(e)
return t},_n=function(e){function t(e){e.unbind()}var n
return n=function(){this.fragments.forEach(t),e.call(this),this.length=0,this.unbound=!0}}($t),Sn=function(){function e(e){e.unrender(!0)}function t(e){e.unrender(!1)}var n
return n=function(n){this.fragments.forEach(n?e:t)}}(),An=function(){for(var e,t,n,r,i;e=this.fragmentsToUnrender.pop();)e.unrender(!0)
if(this.fragmentsToRender.length){for(this.rendered&&(i=this.parentFragment.getNode());e=this.fragmentsToRender.shift();)t=e.render(),this.docFrag.appendChild(t),this.rendered&&this.ordered&&(n=this.fragments[e.index+1],n&&n.rendered&&i.insertBefore(this.docFrag,n.firstNode()||null))
this.rendered&&this.docFrag.childNodes.length&&(r=this.parentFragment.findNextNode(this),i.insertBefore(this.docFrag,r))}},Tn=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d,m,g,v){var y=function(n){this.type=e.SECTION,this.subtype=n.template.n,this.inverted=this.subtype===e.SECTION_UNLESS,this.pElement=n.pElement,this.fragments=[],this.fragmentsToCreate=[],this.fragmentsToRender=[],this.fragmentsToUnrender=[],this.length=0,t.init(this,n)}
return y.prototype={bubble:n,detach:r,find:i,findAll:o,findAllComponents:s,findComponent:a,findNextNode:u,firstNode:c,getValue:t.getValue,merge:l,rebind:t.rebind,render:h,resolve:t.resolve,setValue:f,splice:p,toString:d,unbind:m,unrender:g,update:v},y}(V,cn,hn,fn,pn,dn,mn,gn,vn,yn,bn,wn,xn,kn,En,_n,Sn,An),Cn=function(){var e,t
if(this.docFrag){for(e=this.nodes.length,t=0;e>t;t+=1)this.docFrag.appendChild(this.nodes[t])
return this.docFrag}},On=function(e){return function(t){var n,r,i,o
for(r=this.nodes.length,n=0;r>n;n+=1)if(i=this.nodes[n],1===i.nodeType){if(e(i,t))return i
if(o=i.querySelector(t))return o}return null}}(Xe),Nn=function(e){return function(t,n){var r,i,o,s,a,u
for(i=this.nodes.length,r=0;i>r;r+=1)if(o=this.nodes[r],1===o.nodeType&&(e(o,t)&&n.push(o),s=o.querySelectorAll(t)))for(a=s.length,u=0;a>u;u+=1)n.push(s[u])}}(Xe),Ln=function(){return this.rendered&&this.nodes[0]?this.nodes[0]:this.parentFragment.findNextNode(this)},In=function(e,t){function n(e){return s[e]||(s[e]=t(e))}var r,i,o,s={}
try{t("table").innerHTML="foo"}catch(a){i=!0,o={TABLE:['<table class="x">',"</table>"],THEAD:['<table><thead class="x">',"</thead></table>"],TBODY:['<table><tbody class="x">',"</tbody></table>"],TR:['<table><tr class="x">',"</tr></table>"],SELECT:['<select class="x">',"</select>"]}}return r=function(t,r,s){var a,u,c,l,h,f=[]
if(null!=t&&""!==t){for(i&&(u=o[r.tagName])?(a=n("DIV"),a.innerHTML=u[0]+t+u[1],a=a.querySelector(".x"),"SELECT"===a.tagName&&(c=a.options[a.selectedIndex])):r.namespaceURI===e.svg?(a=n("DIV"),a.innerHTML='<svg class="x">'+t+"</svg>",a=a.querySelector(".x")):(a=n(r.tagName),a.innerHTML=t);l=a.firstChild;)f.push(l),s.appendChild(l)
if(i&&"SELECT"===r.tagName)for(h=f.length;h--;)f[h]!==c&&(f[h].selected=!1)}return f}}(A,T),Rn=function(e){for(var t=[],n=e.length;n--;)t[n]=e[n]
return t},jn=function(e){function t(e){return e.selected}var n
return n=function(n){var r,i,o
n&&"select"===n.name&&n.binding&&(r=e(n.node.options).filter(t),n.getAttribute("multiple")?o=r.map(function(e){return e.value}):(i=r[0])&&(o=i.value),void 0!==o&&n.binding.setValue(o),n.bubble())}}(Rn),Pn=function(e,t){return function(){if(this.rendered)throw new Error("Attempted to render an item that was already rendered")
return this.docFrag=document.createDocumentFragment(),this.nodes=e(this.value,this.parentFragment.getNode(),this.docFrag),t(this.pElement),this.rendered=!0,this.docFrag}}(In,jn),Mn=function(e){return function(t){var n;(n=this.root.viewmodel.wrapped[this.keypath])&&(t=n.get()),t!==this.value&&(this.value=t,this.parentFragment.bubble(),this.rendered&&e.addView(this))}}(k),Dn=function(e){return function(){return void 0!=this.value?e(""+this.value):""}}(Oe),Fn=function(e){return function(t){this.rendered&&t&&(this.nodes.forEach(e),this.rendered=!1)}}(Vt),Bn=function(e,t){return function(){var n,r
if(this.rendered){for(;this.nodes&&this.nodes.length;)n=this.nodes.pop(),n.parentNode.removeChild(n)
r=this.parentFragment.getNode(),this.nodes=e(this.value,r,this.docFrag),r.insertBefore(this.docFrag,this.parentFragment.findNextNode(this)),t(this.pElement)}}}(In,jn),Un=function(e,t,n,r,i,o,s,a,u,c,l,h){var f=function(n){this.type=e.TRIPLE,t.init(this,n)}
return f.prototype={detach:n,find:r,findAll:i,firstNode:o,getValue:t.getValue,rebind:t.rebind,render:s,resolve:t.resolve,setValue:a,toString:u,unbind:h,unrender:c,update:l},f}(V,cn,Cn,On,Nn,Ln,Pn,Mn,Dn,Fn,Bn,$t),qn=function(){this.parentFragment.bubble()},zn=function(){var e,t=this.node
return t?((e=t.parentNode)&&e.removeChild(t),t):void 0},Wn=function(e){return function(t){return e(this.node,t)?this.node:this.fragment&&this.fragment.find?this.fragment.find(t):void 0}}(Xe),Vn=function(e,t){t._test(this,!0)&&t.live&&(this.liveQueries||(this.liveQueries=[])).push(t),this.fragment&&this.fragment.findAll(e,t)},Hn=function(e,t){this.fragment&&this.fragment.findAllComponents(e,t)},Gn=function(e){return this.fragment?this.fragment.findComponent(e):void 0},$n=function(){return null},Kn=function(){return this.node},Yn=function(e){return this.attributes&&this.attributes[e]?this.attributes[e].value:void 0},Qn=function(){var e,t,n,r
return e="altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" "),t="attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" "),n=function(e){for(var t={},n=e.length;n--;)t[e[n].toLowerCase()]=e[n]
return t},r=n(e.concat(t)),function(e){var t=e.toLowerCase()
return r[t]||t}}(),Jn=function(e){return function(){var t=this.fragment.getValue()
t!==this.value&&("id"===this.name&&this.value&&delete this.root.nodes[this.value],this.value=t,"value"===this.name&&this.node&&(this.node._ractive.value=t),this.rendered&&e.addView(this))}}(k),Zn=function(){var e=/^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|draggable|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i
return e}(),Xn=function(e,t){return function(n,r){var i,o
if(i=r.indexOf(":"),-1===i||(o=r.substr(0,i),"xmlns"===o))n.name=n.element.namespace!==e.html?t(r):r
else if(r=r.substring(i+1),n.name=t(r),n.namespace=e[o.toLowerCase()],!n.namespace)throw'Unknown namespace ("'+o+'")'}}(A,Qn),er=function(e){return function(t){var n=t.fragment.items
if(1===n.length)return n[0].type===e.INTERPOLATOR?n[0]:void 0}}(V),tr=function(e,t){var n={"accept-charset":"acceptCharset",accesskey:"accessKey",bgcolor:"bgColor","class":"className",codebase:"codeBase",colspan:"colSpan",contenteditable:"contentEditable",datetime:"dateTime",dirname:"dirName","for":"htmlFor","http-equiv":"httpEquiv",ismap:"isMap",maxlength:"maxLength",novalidate:"noValidate",pubdate:"pubDate",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",usemap:"useMap"}
return function(r,i){var o
!r.pNode||r.namespace||i.pNode.namespaceURI&&i.pNode.namespaceURI!==e.html||(o=n[r.name]||r.name,void 0!==i.pNode[o]&&(r.propertyName=o),(t.test(o)||"value"===o)&&(r.useProperty=!0))}}(A,Zn),nr=function(e,t,n,r,i,o){var s
return o.push(function(){s=o.Fragment}),function(o){return this.type=e.ATTRIBUTE,this.element=o.element,this.root=o.root,n(this,o.name),o.value&&"string"!=typeof o.value?(this.parentFragment=this.element.parentFragment,this.fragment=new s({template:o.value,root:this.root,owner:this}),this.value=this.fragment.getValue(),this.interpolator=r(this),this.isBindable=!!this.interpolator&&!this.interpolator.isStatic,i(this,o),void(this.ready=!0)):void(this.value=t.test(this.name)?!0:o.value||"")}}(V,Zn,Xn,er,tr,o),rr=function(e,t,n,r){this.fragment&&this.fragment.rebind(e,t,n,r)},ir=function(e,t){var n={"accept-charset":"acceptCharset",accesskey:"accessKey",bgcolor:"bgColor","class":"className",codebase:"codeBase",colspan:"colSpan",contenteditable:"contentEditable",datetime:"dateTime",dirname:"dirName","for":"htmlFor","http-equiv":"httpEquiv",ismap:"isMap",maxlength:"maxLength",novalidate:"noValidate",pubdate:"pubDate",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",usemap:"useMap"}
return function(r){var i
this.node=r,r.namespaceURI&&r.namespaceURI!==e.html||(i=n[this.name]||this.name,void 0!==r[i]&&(this.propertyName=i),(t.test(i)||"value"===i)&&(this.useProperty=!0),"value"===i&&(this.useProperty=!0,r._ractive.value=this.value)),this.rendered=!0,this.update()}}(A,Zn),or=function(e){function t(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var n
return n=function(){var n=(o=this).name,r=o.value,i=o.interpolator,o=o.fragment
if(("value"!==n||"select"!==this.element.name&&"textarea"!==this.element.name)&&("value"!==n||void 0===this.element.getAttribute("contenteditable")))return"name"===n&&"input"===this.element.name&&i?"name={{"+(i.keypath||i.ref)+"}}":e.test(n)?r?n:"":(o&&(r=o.toString()),r?n+'="'+t(r)+'"':n)}}(Zn),sr=function(){this.fragment&&this.fragment.unbind()},ar=function(){var e,t,n,r,i=this.value
if(!this.locked)for(this.node._ractive.value=i,e=this.node.options,r=e.length;r--;)if(t=e[r],n=t._ractive?t._ractive.value:t.value,n==i){t.selected=!0
break}},ur=function(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]==t)return!0
return!1},cr=function(e,t){return function(){var n,r,i,o,s=this.value
for(t(s)||(s=[s]),n=this.node.options,r=n.length;r--;)i=n[r],o=i._ractive?i._ractive.value:i.value,i.selected=e(s,o)}}(ur,a),lr=function(){var e=(t=this).node,t=t.value
e.checked=t==e._ractive.value},hr=function(e){return function(){var t,n,r,i,o=this.node
if(t=o.checked,o.value=this.element.getAttribute("value"),o.checked=this.element.getAttribute("value")===this.element.getAttribute("name"),t&&!o.checked&&this.element.binding&&(r=this.element.binding.siblings,i=r.length)){for(;i--;){if(n=r[i],!n.element.node)return
if(n.element.node.checked)return e.addViewmodel(n.root.viewmodel),n.handleChange()}e.addViewmodel(n.root.viewmodel),this.root.viewmodel.set(n.keypath,void 0)}}}(k),fr=function(e){return function(){var t,n
t=this.node,n=this.value,e(n)?t.checked=-1!==n.indexOf(t._ractive.value):t.checked=n==t._ractive.value}}(a),pr=function(){var e,t
e=this.node,t=this.value,void 0===t&&(t=""),e.className=t},dr=function(){var e,t
e=this.node,t=this.value,void 0!==t&&(this.root.nodes[t]=void 0),this.root.nodes[t]=e,e.id=t},mr=function(){var e,t
e=this.node,t=this.value,void 0===t&&(t=""),e.style.setAttribute("cssText",t)},gr=function(){var e=this.value
void 0===e&&(e=""),this.locked||(this.node.innerHTML=e)},vr=function(){var e=(t=this).node,t=t.value
e._ractive.value=t,this.locked||(e.value=void 0==t?"":t)},yr=function(){this.locked||(this.node[this.propertyName]=this.value)},br=function(e){return function(){var t=(o=this).node,n=o.namespace,r=o.name,i=o.value,o=o.fragment
n?t.setAttributeNS(n,r,(o||i).toString()):e.test(r)?i?t.setAttribute(r,""):t.removeAttribute(r):t.setAttribute(r,(o||i).toString())}}(Zn),wr=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p){return function(){var d,m,g=(y=this).name,v=y.element,y=y.node
"id"===g?m=u:"value"===g?"select"===v.name&&"value"===g?m=v.getAttribute("multiple")?r:n:"textarea"===v.name?m=h:null!=v.getAttribute("contenteditable")?m=l:"input"===v.name&&(d=v.getAttribute("type"),m="file"===d?t:"radio"===d&&v.binding&&"name"===v.binding.name?o:h):this.twoway&&"name"===g?"radio"===y.type?m=i:"checkbox"===y.type&&(m=s):"style"===g&&y.style.setAttribute?m=c:"class"!==g||y.namespaceURI&&y.namespaceURI!==e.html?this.useProperty&&(m=f):m=a,m||(m=p),this.update=m,this.update()}}(A,Ve,ar,cr,lr,hr,fr,pr,dr,mr,gr,vr,yr,br),xr=function(e,t,n,r,i,o,s){var a=function(e){this.init(e)}
return a.prototype={bubble:e,init:t,rebind:n,render:r,toString:i,unbind:o,update:s},a}(Jn,nr,rr,ir,or,sr,wr),kr=function(e){return function(t,n){var r,i,o=[]
for(r in n)n.hasOwnProperty(r)&&(i=new e({element:t,name:r,value:n[r],root:t.root}),o.push(o[r]=i))
return o}}(xr),Er=function(e){for(var t,n,r=Array.prototype.slice,i=r.call(arguments,1);n=i.shift();)for(t in n)n.hasOwnProperty(t)&&(e[t]=n[t])
return e},_r=function(e,t,n,r,i){var o=function(e){var n,r,i
return this.element=e,this.root=e.root,this.attribute=e.attributes[this.name||"value"],n=this.attribute.interpolator,n.twowayBinding=this,n.keypath&&"${"===n.keypath.substr?(t("Two-way binding does not work with expressions: "+n.keypath),!1):(n.keypath||(n.ref&&n.resolve(n.ref),n.resolver&&n.resolver.forceResolution()),this.keypath=r=n.keypath,void(void 0===this.root.viewmodel.get(r)&&this.getInitialValue&&(i=this.getInitialValue(),void 0!==i&&this.root.viewmodel.set(r,i))))}
return o.prototype={handleChange:function(){var t=this
e.start(this.root),this.attribute.locked=!0,this.root.viewmodel.set(this.keypath,this.getValue()),e.scheduleTask(function(){return t.attribute.locked=!1}),e.end()},rebound:function(){var e,t,n
t=this.keypath,n=this.attribute.interpolator.keypath,t!==n&&(i(this.root._twowayBindings[t],this),this.keypath=n,e=this.root._twowayBindings[n]||(this.root._twowayBindings[n]=[]),e.push(this))},unbind:function(){}},o.extend=function(e){var t,i=this
return t=function(e){o.call(this,e),this.init&&this.init()},t.prototype=n(i.prototype),r(t.prototype,e),t.extend=o.extend,t},o}(k,F,H,Er,d),Sr=function(){this._ractive.binding.handleChange()},Ar=function(e,t){var n=e.extend({getInitialValue:function(){return this.element.fragment?this.element.fragment.toString():""},render:function(){var e=this.element.node
e.addEventListener("change",t,!1),this.root.lazy||(e.addEventListener("input",t,!1),e.attachEvent&&e.addEventListener("keyup",t,!1))},unrender:function(){var e=this.element.node
e.removeEventListener("change",t,!1),e.removeEventListener("input",t,!1),e.removeEventListener("keyup",t,!1)},getValue:function(){return this.element.node.innerHTML}})
return n}(_r,Sr),Tr=function(){var e={}
return function(t,n,r){var i=t+n+r
return e[i]||(e[i]=[])}}(),Cr=function(e,t,n,r,i){var o=n.extend({name:"checked",init:function(){this.siblings=r(this.root._guid,"radio",this.element.getAttribute("name")),this.siblings.push(this)},render:function(){var e=this.element.node
e.addEventListener("change",i,!1),e.attachEvent&&e.addEventListener("click",i,!1)},unrender:function(){var e=this.element.node
e.removeEventListener("change",i,!1),e.removeEventListener("click",i,!1)},handleChange:function(){e.start(this.root),this.siblings.forEach(function(e){e.root.viewmodel.set(e.keypath,e.getValue())}),e.end()},getValue:function(){return this.element.node.checked},unbind:function(){t(this.siblings,this)}})
return o}(k,d,_r,Tr,Sr),Or=function(e,t,n,r){var i=t.extend({name:"name",init:function(){this.siblings=r(this.root._guid,"radioname",this.keypath),this.siblings.push(this),this.radioName=!0,this.attribute.twoway=!0},getInitialValue:function(){return this.element.getAttribute("checked")?this.element.getAttribute("value"):void 0},render:function(){var e=this.element.node
e.name="{{"+this.keypath+"}}",e.checked=this.root.viewmodel.get(this.keypath)==this.element.getAttribute("value"),e.addEventListener("change",n,!1),e.attachEvent&&e.addEventListener("click",n,!1)},unrender:function(){var e=this.element.node
e.removeEventListener("change",n,!1),e.removeEventListener("click",n,!1)},getValue:function(){var e=this.element.node
return e._ractive?e._ractive.value:e.value},handleChange:function(){this.element.node.checked&&t.prototype.handleChange.call(this)},rebound:function(e,n,r,i){var o
t.prototype.rebound.call(this,e,n,r,i),(o=this.element.node)&&(o.name="{{"+this.keypath+"}}")},unbind:function(){e(this.siblings,this)}})
return i}(d,_r,Sr,Tr),Nr=function(e,t,n,r,i){function o(e){return e.isChecked}function s(e){return e.element.getAttribute("value")}var a=n.extend({name:"name",getInitialValue:function(){return this.noInitialValue=!0,[]},init:function(){var t,n,i
this.checkboxName=!0,this.siblings=r(this.root._guid,"checkboxes",this.keypath),this.siblings.push(this),this.noInitialValue&&(this.siblings.noInitialValue=!0),i=this.siblings.noInitialValue,t=this.root.viewmodel.get(this.keypath),n=this.element.getAttribute("value"),i?(this.isChecked=this.element.getAttribute("checked"),this.isChecked&&t.push(n)):this.isChecked=e(t)?-1!==t.indexOf(n):t===n},unbind:function(){t(this.siblings,this)},render:function(){var e=this.element.node
e.name="{{"+this.keypath+"}}",e.checked=this.isChecked,e.addEventListener("change",i,!1),e.attachEvent&&e.addEventListener("click",i,!1)},unrender:function(){var e=this.element.node
e.removeEventListener("change",i,!1),e.removeEventListener("click",i,!1)},changed:function(){var e=!!this.isChecked
return this.isChecked=this.element.node.checked,this.isChecked===e},handleChange:function(){this.isChecked=this.element.node.checked,n.prototype.handleChange.call(this)},getValue:function(){return this.siblings.filter(o).map(s)}})
return a}(a,d,_r,Tr,Sr),Lr=function(e,t){var n=e.extend({name:"checked",render:function(){var e=this.element.node
e.addEventListener("change",t,!1),e.attachEvent&&e.addEventListener("click",t,!1)},unrender:function(){var e=this.element.node
e.removeEventListener("change",t,!1),e.removeEventListener("click",t,!1)},getValue:function(){return this.element.node.checked}})
return n}(_r,Sr),Ir=function(e,t,n){var r=t.extend({getInitialValue:function(){var e,t,n,r,i=this.element.options
if(void 0===this.element.getAttribute("value")&&(t=e=i.length,e)){for(;t--;)if(i[t].getAttribute("selected")){n=i[t].getAttribute("value"),r=!0
break}if(!r)for(;++t<e;)if(!i[t].getAttribute("disabled")){n=i[t].getAttribute("value")
break}return void 0!==n&&(this.element.attributes.value.value=n),n}},render:function(){this.element.node.addEventListener("change",n,!1)},unrender:function(){this.element.node.removeEventListener("change",n,!1)},setValue:function(t){e.addViewmodel(this.root.viewmodel),this.root.viewmodel.set(this.keypath,t)},getValue:function(){var e,t,n,r,i
for(e=this.element.node.options,n=e.length,t=0;n>t;t+=1)if(r=e[t],e[t].selected)return i=r._ractive?r._ractive.value:r.value},forceUpdate:function(){var t=this,n=this.getValue()
void 0!==n&&(this.attribute.locked=!0,e.addViewmodel(this.root.viewmodel),e.scheduleTask(function(){return t.attribute.locked=!1}),this.root.viewmodel.set(this.keypath,n))}})
return r}(k,_r,Sr),Rr=function(e){return function(t,n){var r
if(!e(t)||!e(n))return!1
if(t.length!==n.length)return!1
for(r=t.length;r--;)if(t[r]!==n[r])return!1
return!0}}(a),jr=function(e,t,n,r){var i=n.extend({getInitialValue:function(){return this.element.options.filter(function(e){return e.getAttribute("selected")}).map(function(e){return e.getAttribute("value")})},render:function(){var e
this.element.node.addEventListener("change",r,!1),e=this.root.viewmodel.get(this.keypath),void 0===e&&this.handleChange()},unrender:function(){this.element.node.removeEventListener("change",r,!1)},setValue:function(){throw new Error("TODO not implemented yet")},getValue:function(){var e,t,n,r,i,o
for(e=[],t=this.element.node.options,r=t.length,n=0;r>n;n+=1)i=t[n],i.selected&&(o=i._ractive?i._ractive.value:i.value,e.push(o))
return e},handleChange:function(){var e,r,i
return e=this.attribute,r=e.value,i=this.getValue(),void 0!==r&&t(i,r)||n.prototype.handleChange.call(this),this},forceUpdate:function(){var t=this,n=this.getValue()
void 0!==n&&(this.attribute.locked=!0,e.addViewmodel(this.root.viewmodel),e.scheduleTask(function(){return t.attribute.locked=!1}),this.root.viewmodel.set(this.keypath,n))},updateModel:function(){void 0!==this.attribute.value&&this.attribute.value.length||this.root.viewmodel.set(this.keypath,this.initialValue)}})
return i}(k,Rr,Ir,Sr),Pr=function(e,t){var n=e.extend({render:function(){this.element.node.addEventListener("change",t,!1)},unrender:function(){this.element.node.removeEventListener("change",t,!1)},getValue:function(){return this.element.node.files}})
return n}(_r,Sr),Mr=function(e,t){function n(){var e
t.call(this),e=this._ractive.root.viewmodel.get(this._ractive.binding.keypath,o),this.value=void 0==e?"":e}var r,i,o
return o={evaluateWrapped:!0},i=e.extend({getInitialValue:function(){return""},getValue:function(){return this.element.node.value},render:function(){var e=this.element.node
e.addEventListener("change",t,!1),this.root.lazy||(e.addEventListener("input",t,!1),e.attachEvent&&e.addEventListener("keyup",t,!1)),e.addEventListener("blur",n,!1)},unrender:function(){var e=this.element.node
e.removeEventListener("change",t,!1),e.removeEventListener("input",t,!1),e.removeEventListener("keyup",t,!1),e.removeEventListener("blur",n,!1)}}),r=i}(_r,Sr),Dr=function(e){return e.extend({getInitialValue:function(){return void 0},getValue:function(){var e=parseFloat(this.element.node.value)
return isNaN(e)?void 0:e}})}(Mr),Fr=function(e,t,n,r,i,o,s,a,u,c,l){function h(e){return e&&e.isBindable}var f
return f=function(f){var p,d,m,g,v=f.attributes
return f.binding&&(f.binding.teardown(),f.binding=null),f.getAttribute("contenteditable")&&h(v.value)?d=t:"input"===f.name?(p=f.getAttribute("type"),"radio"===p||"checkbox"===p?(m=h(v.name),g=h(v.checked),m&&g&&e.error({message:"badRadioInputBinding"}),m?d="radio"===p?r:i:g&&(d="radio"===p?n:o)):"file"===p&&h(v.value)?d=u:h(v.value)&&(d="number"===p||"range"===p?c:l)):"select"===f.name&&h(v.value)?d=f.getAttribute("multiple")?a:s:"textarea"===f.name&&h(v.value)&&(d=l),d?new d(f):void 0}}(Zt,Ar,Cr,Or,Nr,Lr,Ir,jr,Pr,Dr,Mr),Br=function(){var e=this.getAction()
e&&!this.hasListener?this.listen():!e&&this.hasListener&&this.unrender()},Ur=function(e){return function(t){e(this.root,this.getAction(),{event:t})}}(p),qr=function(){return this.action.toString().trim()},zr=function(e,t,n,r,i,o,s){function a(e){var t,n,r
if(t=this.root,"function"!=typeof t[this.method])throw new Error('Attempted to call a non-existent method ("'+this.method+'")')
n=this.args.map(function(n){var r,i,o
if(!n)return void 0
if(n.indexRef)return n.value
if(n.eventObject){if(r=e,i=n.refinements.length)for(o=0;i>o;o+=1)r=r[n.refinements[o]]}else r=t.get(n.keypath)
return r}),r=this.fn.apply(null,n),t[this.method].apply(t,r)}function u(e){o(this.root,this.getAction(),{event:e,args:this.params})}function c(e){var t=this.dynamicParams.getValue(f)
"string"==typeof t&&(t=t.substr(1,t.length-2)),o(this.root,this.getAction(),{event:e,args:t})}var l,h,f={args:!0},p=/^event(?:\.(.+))?/
return i.push(function(){h=i.Fragment}),l=function(i,o,l){var f,d,m,g,v,y=this
y.element=i,y.root=i.root,y.name=o,-1!==o.indexOf("*")&&(s.error({debug:this.root.debug,message:"noElementProxyEventWildcards",args:{element:i.tagName,event:o}}),this.invalid=!0),l.m?(y.method=l.m,y.args=d=[],y.unresolved=[],y.refs=l.a.r,y.fn=t(l.a.s,y.refs.length),v=i.parentFragment,m=v.indexRefs,g=y.root,l.a.r.forEach(function(t,i){var o,s,a,u
return m&&void 0!==(o=m[t])?void(d[i]={indexRef:t,value:o}):(a=p.exec(t))?void(d[i]={eventObject:!0,refinements:a[1]?a[1].split("."):[]}):(s=n(g,t,v))?void(d[i]={keypath:s}):(d[i]=null,u=new r(g,t,v,function(t){y.resolve(i,t),e(y.unresolved,u)}),void y.unresolved.push(u))}),this.fire=a):(f=l.n||l,"string"!=typeof f&&(f=new h({template:f,root:this.root,owner:this})),this.action=f,l.d?(this.dynamicParams=new h({template:l.d,root:this.root,owner:this.element}),this.fire=c):l.a&&(this.params=l.a,this.fire=u))}}(d,Xt,w,Yt,o,p,Zt),Wr=function(e){var t,n
t=this._ractive,n=t.events[e.type],n.fire({node:this,original:e,index:t.index,keypath:t.keypath,context:t.root.get(t.keypath)})},Vr=function(e,t,n){function r(e){return o[e]||(o[e]=function(t){var n=t.node._ractive
t.index=n.index,t.keypath=n.keypath,t.context=n.root.get(n.keypath),n.events[e].fire(t)}),o[e]}var i,o={}
return i=function(){var i,o=this.name
this.invalid||((i=e.registries.events.find(this.root,o))?this.custom=i(this.node,r(o)):("on"+o in this.node||window&&"on"+o in window||n.error({debug:this.root.debug,message:"missingPlugin",args:{plugin:"event",name:o}}),this.node.addEventListener(o,t,!1)),this.hasListener=!0)}}($e,Wr,Zt),Hr=function(e){return function(t,n,r,i){return this.method?void this.args.forEach(function(o){o.indexRef&&o.indexRef===t&&(o.value=n),o.keypath&&(i=e(o.keypath,r,i))&&(o.keypath=i)}):("string"!=typeof this.action&&this.action.rebind(t,n,r,i),void(this.dynamicParams&&this.dynamicParams.rebind(t,n,r,i)))}}(Jt),Gr=function(){this.node=this.element.node,this.node._ractive.events[this.name]=this,(this.method||this.getAction())&&this.listen()},$r=function(e,t){this.args[e]={keypath:t}},Kr=function(){function e(e){e.teardown()}var t
return t=function(){return this.method?void this.unresolved.forEach(e):("string"!=typeof this.action&&this.action.unbind(),void(this.dynamicParams&&this.dynamicParams.unbind()))}}(),Yr=function(e){return function(){this.custom?this.custom.teardown():this.node.removeEventListener(this.name,e,!1),this.hasListener=!1}}(Wr),Qr=function(e,t,n,r,i,o,s,a,u,c){var l=function(e,t,n){this.init(e,t,n)}
return l.prototype={bubble:e,fire:t,getAction:n,init:r,listen:i,rebind:o,render:s,resolve:a,unbind:u,unrender:c},l}(Br,Ur,qr,zr,Vr,Hr,Gr,$r,Kr,Yr),Jr=function(e){return function(t,n){var r,i,o,s,a=[]
for(i in n)if(n.hasOwnProperty(i))for(o=i.split("-"),r=o.length;r--;)s=new e(t,o[r],n[i]),a.push(s)
return a}}(Qr),Zr=function(e,t,n){var r,i,o
return t.push(function(){r=t.Fragment}),i={args:!0},o=function(t,o){var s,a,u,c=this
c.element=t,c.root=s=t.root,a=o.n||o,"string"!=typeof a&&(u=new r({template:a,root:s,owner:t}),a=u.toString(),u.unbind()),o.a?c.params=o.a:o.d&&(c.fragment=new r({template:o.d,root:s,owner:t}),c.params=c.fragment.getValue(i),c.fragment.bubble=function(){this.dirtyArgs=this.dirtyValue=!0,c.params=this.getValue(i),c.ready&&c.update()}),c.fn=n.registries.decorators.find(s,a),c.fn||e.error({debug:s.debug,message:"missingPlugin",args:{plugin:"decorator",name:a}})},o.prototype={init:function(){var e,t,n,r=this
if(e=r.element.node,r.params?(n=[e].concat(r.params),t=r.fn.apply(r.root,n)):t=r.fn.call(r.root,e),!t||!t.teardown)throw new Error("Decorator definition must return an object with a teardown method")
r.actual=t,r.ready=!0},update:function(){this.actual.update?this.actual.update.apply(this.root,this.params):(this.actual.teardown(!0),this.init())},rebind:function(e,t,n,r){this.fragment&&this.fragment.rebind(e,t,n,r)},teardown:function(e){this.actual.teardown(),!e&&this.fragment&&this.fragment.unbind()}},o}(Zt,o,$e),Xr=function(e){function t(e,t){for(var n=e.length;n--;)if(e[n]==t)return!0}var n
return n=function(n){var r,i,o,s,a
r=n.node,r&&(s=e(r.options),i=n.getAttribute("value"),o=n.getAttribute("multiple"),void 0!==i?(s.forEach(function(e){var n,r
n=e._ractive?e._ractive.value:e.value,r=o?t(i,n):i==n,r&&(a=!0),e.selected=r}),a||(s[0]&&(s[0].selected=!0),n.binding&&n.binding.forceUpdate())):n.binding&&n.binding.forceUpdate())}}(Rn),ei=function(e,t){return function(){var n=this
this.dirty||(this.dirty=!0,e.scheduleTask(function(){t(n),n.dirty=!1})),this.parentFragment.bubble()}}(k,Xr),ti=function(e){do if("select"===e.name)return e
while(e=e.parent)},ni=function(e){return function(t,n){t.select=e(t.parent),t.select&&(t.select.options.push(t),n.a||(n.a={}),n.a.value||n.a.hasOwnProperty("disabled")||(n.a.value=n.f),"selected"in n.a&&void 0!==t.select.getAttribute("value")&&delete n.a.selected)}}(ti),ri=function(e,t,n,r,i,o,s,a,u){var c
return u.push(function(){c=u.Fragment}),function(u){var l,h,f,p,d
this.type=e.ELEMENT,l=this.parentFragment=u.parentFragment,h=this.template=u.template,this.parent=u.pElement||l.pElement,this.root=f=l.root,this.index=u.index,this.name=t(h.e),"option"===this.name&&a(this,h),"select"===this.name&&(this.options=[],this.bubble=s),this.attributes=n(this,h.a),h.f&&(this.fragment=new c({template:h.f,root:f,owner:this,pElement:this})),f.twoway&&(p=r(this,h.a))&&(this.binding=p,d=this.root._twowayBindings[p.keypath]||(this.root._twowayBindings[p.keypath]=[]),d.push(p)),h.v&&(this.eventHandlers=i(this,h.v)),h.o&&(this.decorator=new o(this,h.o)),this.intro=h.t0||h.t1,this.outro=h.t0||h.t2}}(V,Qn,kr,Fr,Jr,Zr,ei,ni,o),ii=function(e){return function(t,n){return t===n||e(t,n)}}(Qt),oi=function(e,t){return function(n,r,i,o){var s=n[r]
s&&!e(s,o)&&e(s,i)&&(n[r]=t(s,i,o))}}(ii,Jt),si=function(e){return function(t,n,r,i){function o(e){e.rebind(t,n,r,i)}var s,a,u,c
if(this.attributes&&this.attributes.forEach(o),this.eventHandlers&&this.eventHandlers.forEach(o),this.decorator&&o(this.decorator),this.fragment&&o(this.fragment),u=this.liveQueries)for(c=this.root,s=u.length;s--;)u[s]._makeDirty()
this.node&&(a=this.node._ractive)&&(e(a,"keypath",r,i),void 0!=t&&(a.index[t]=n))}}(oi),ai=function(e){var t;(e.attributes.width||e.attributes.height)&&e.node.addEventListener("load",t=function(){var n=e.getAttribute("width"),r=e.getAttribute("height")
void 0!==n&&e.node.setAttribute("width",n),void 0!==r&&e.node.setAttribute("height",r),e.node.removeEventListener("load",t,!1)},!1)},ui=function(e,t,n){var r,i={}
return n.push(function(){r=n.Fragment}),function(n,o,s){var a,u,c,l=this
return l.element=n,l.root=a=n.root,l.isIntro=s,u=o.n||o,"string"!=typeof u&&(c=new r({template:u,root:a,owner:n}),u=c.toString(),c.unbind()),l.name=u,o.a?l.params=o.a:o.d&&(c=new r({template:o.d,root:a,owner:n}),l.params=c.getValue(i),c.unbind()),l._fn=t.registries.transitions.find(a,u),l._fn?void 0:void e.error({debug:a.debug,message:"missingPlugin",args:{plugin:"transition",name:u}})}}(Zt,$e,o),ci=function(e){return e.replace(/-([a-zA-Z])/g,function(e,t){return t.toUpperCase()})},li=function(e,t,n,r){var i,o,s
return e?(o={},s=n("div").style,i=function(e){var n,i,a
if(e=r(e),!o[e])if(void 0!==s[e])o[e]=e
else for(a=e.charAt(0).toUpperCase()+e.substring(1),n=t.length;n--;)if(i=t[n],void 0!==s[i+a]){o[e]=i+a
break}return o[e]}):i=null,i}(C,j,T,ci),hi=function(e,t,n,r){var i,o
return t?(o=window.getComputedStyle||e.getComputedStyle,i=function(e){var t,i,s,a,u
if(t=o(this.node),"string"==typeof e)return u=t[r(e)],"0px"===u&&(u=0),u
if(!n(e))throw new Error("Transition$getStyle must be passed a string, or an array of strings representing CSS properties")
for(i={},s=e.length;s--;)a=e[s],u=t[r(a)],"0px"===u&&(u=0),i[a]=u
return i}):i=null,i}(xe,C,a,li),fi=function(e){return function(t,n){var r
if("string"==typeof t)this.node.style[e(t)]=n
else for(r in t)t.hasOwnProperty(r)&&(this.node.style[e(r)]=t[r])
return this}}(li),pi=function(e,t,n){function r(e){return e}var i,o=function(i){var o
this.duration=i.duration,this.step=i.step,this.complete=i.complete,"string"==typeof i.easing?(o=i.root.easing[i.easing],o||(e('Missing easing function ("'+i.easing+'"). You may need to download a plugin from [TODO]'),o=r)):o="function"==typeof i.easing?i.easing:r,this.easing=o,this.start=t(),this.end=this.start+this.duration,this.running=!0,n.add(this)}
return o.prototype={tick:function(e){var t,n
return this.running?e>this.end?(this.step&&this.step(1),this.complete&&this.complete(1),!1):(t=e-this.start,n=this.easing(t/this.duration),this.step&&this.step(n),!0):!1},stop:function(){this.abort&&this.abort(),this.running=!1}},i=o}(F,M,D),di=function(e){var t=new RegExp("^-(?:"+e.join("|")+")-")
return function(e){return e.replace(t,"")}}(j),mi=function(e){var t=new RegExp("^(?:"+e.join("|")+")([A-Z])")
return function(e){var n
return e?(t.test(e)&&(e="-"+e),n=e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})):""}}(j),gi=function(e,t,n,r,i,o,s,a,u){var c,l,h,f,p,d,m,g,v={},y={}
return e?(l=n("div").style,function(){void 0!==l.transition?(h="transition",f="transitionend",p=!0):void 0!==l.webkitTransition?(h="webkitTransition",f="webkitTransitionEnd",p=!0):p=!1}(),h&&(d=h+"Duration",m=h+"Property",g=h+"TimingFunction"),c=function(e,n,c,l,h){setTimeout(function(){var b,w,x,k,E
k=function(){w&&x&&(e.root.fire(e.name+":end",e.node,e.isIntro),h())},b=(e.node.namespaceURI||"")+e.node.tagName,e.node.style[m]=l.map(s).map(u).join(","),e.node.style[g]=u(c.easing||"linear"),e.node.style[d]=c.duration/1e3+"s",E=function(t){var n
n=l.indexOf(r(a(t.propertyName))),-1!==n&&l.splice(n,1),l.length||(e.node.removeEventListener(f,E,!1),x=!0,k())},e.node.addEventListener(f,E,!1),setTimeout(function(){for(var a,u,h,d,m,g=l.length,_=[];g--;)d=l[g],a=b+d,p&&!y[a]&&(e.node.style[s(d)]=n[d],v[a]||(u=e.getStyle(d),v[a]=e.getStyle(d)!=n[d],y[a]=!v[a],y[a]&&(e.node.style[s(d)]=u))),(!p||y[a])&&(void 0===u&&(u=e.getStyle(d)),h=l.indexOf(d),-1===h?t("Something very strange happened with transitions. If you see this message, please let @RactiveJS know. Thanks!"):l.splice(h,1),m=/[^\d]*$/.exec(n[d])[0],_.push({name:s(d),interpolator:i(parseFloat(u),parseFloat(n[d])),suffix:m}))
_.length?new o({root:e.root,duration:c.duration,easing:r(c.easing||""),step:function(t){var n,r
for(r=_.length;r--;)n=_[r],e.node.style[n.name]=n.interpolator(t)+n.suffix},complete:function(){w=!0,k()}}):w=!0,l.length||(e.node.removeEventListener(f,E,!1),x=!0,k())},0)},c.delay||0)}):c=null,c}(C,F,T,ci,Ke,pi,li,di,mi),vi=function(e){function t(){u.hidden=document[i]}function n(){u.hidden=!0}function r(){u.hidden=!1}var i,o,s,a,u
if("undefined"!=typeof document){if(i="hidden",u={},i in document)s=""
else for(a=e.length;a--;)o=e[a],i=o+"Hidden",i in document&&(s=o)
void 0!==s?(document.addEventListener(s+"visibilitychange",t),t()):("onfocusout"in document?(document.addEventListener("focusout",n),document.addEventListener("focusin",r)):(window.addEventListener("pagehide",n),window.addEventListener("blur",n),window.addEventListener("pageshow",r),window.addEventListener("focus",r)),u.hidden=!1)}return u}(j),yi=function(e,t,n,r,i,o,s){var a,u,c
return t?(u=window.getComputedStyle||e.getComputedStyle,a=function(e,t,a,l){var h,f=this
if(s.hidden)return this.setStyle(e,t),c||(c=r.resolve())
"string"==typeof e?(h={},h[e]=t):(h=e,l=a,a=t),a||(n('The "'+f.name+'" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340'),a=f,l=f.complete)
var p=new r(function(e){var t,n,r,s,c,l,p
if(!a.duration)return f.setStyle(h),void e()
for(t=Object.keys(h),n=[],r=u(f.node),c={},l=t.length;l--;)p=t[l],s=r[i(p)],"0px"===s&&(s=0),s!=h[p]&&(n.push(p),f.node.style[i(p)]=s)
return n.length?void o(f,h,a,n,e):void e()})
return l&&(n("t.animateStyle returns a Promise as of 0.4.0. Transition authors should do t.animateStyle(...).then(callback)"),p.then(l)),p}):a=null,a}(xe,C,F,m,li,gi,vi),bi=function(e,t){var n
for(n in t)!t.hasOwnProperty(n)||n in e||(e[n]=t[n])
return e},wi=function(e){return function(t,n){return"number"==typeof t?t={duration:t}:"string"==typeof t?t="slow"===t?{duration:600}:"fast"===t?{duration:200}:{duration:400}:t||(t={}),e(t,n)}}(bi),xi=function(){function e(e,t){t?e.setAttribute("style",t):(e.getAttribute("style"),e.removeAttribute("style"))}var t
return t=function(){var t,n,r=this
return t=r.node=r.element.node,n=t.getAttribute("style"),r.complete=function(i){!i&&r.isIntro&&e(t,n),t._ractive.transition=null,r._manager.remove(r)},r._fn?void r._fn.apply(r.root,[r].concat(r.params)):void r.complete()}}(),ki=function(e,t,n,r,i,o,s){var a,u
return s.push(function(){a=s.Fragment}),u=function(e,t,n){this.init(e,t,n)},u.prototype={init:e,start:o,getStyle:t,setStyle:n,animateStyle:r,processParams:i},u}(ui,hi,fi,yi,wi,xi,o),Ei=function(e,t,n,r,i,o,s,a,u,c,l){function h(t){var n,r,i
return n=(r=t.getAttribute("xmlns"))?r:"svg"===t.name?e.svg:(i=t.parent)?"foreignObject"===i.name?e.html:i.node.namespaceURI:t.root.el.namespaceURI}function f(e){var n,r,i
if(e.select&&(r=e.select.getAttribute("value"),void 0!==r))if(n=e.getAttribute("value"),e.select.node.multiple&&t(r)){for(i=r.length;i--;)if(n==r[i]){e.node.selected=!0
break}}else e.node.selected=n==r}function p(e){var t,n,r,i,o
t=e.root
do for(n=t._liveQueries,r=n.length;r--;)i=n[r],o=n["_"+i],o._test(e)&&(e.liveQueries||(e.liveQueries=[])).push(o)
while(t=t._parent)}var d,m,g
return m=function(){var e=this.node,t=this.fragment.toString(!1)
if(e.styleSheet)e.styleSheet.cssText=t
else{for(;e.hasChildNodes();)e.removeChild(e.firstChild)
e.appendChild(document.createTextNode(t))}},g=function(){this.node.type&&"text/javascript"!==this.node.type||n("Script tag was updated. This does not cause the code to be re-evaluated!"),this.node.text=this.fragment.toString(!1)},d=function(){var e,t,n=this,d=this.root
if(e=h(this),t=this.node=i(this.name,e),d.constructor.css&&this.parentFragment.getNode()===d.el&&this.node.setAttribute("data-rvcguid",d.constructor._guid),o(this.node,"_ractive",{value:{proxy:this,keypath:u(this.parentFragment),index:this.parentFragment.indexRefs,events:r(null),root:d}}),this.attributes.forEach(function(e){return e.render(t)}),this.fragment&&("script"===this.name?(this.bubble=g,this.node.text=this.fragment.toString(!1),this.fragment.unrender=s):"style"===this.name?(this.bubble=m,this.bubble(),this.fragment.unrender=s):this.binding&&this.getAttribute("contenteditable")?this.fragment.unrender=s:this.node.appendChild(this.fragment.render())),this.eventHandlers&&this.eventHandlers.forEach(function(e){return e.render()}),this.binding&&(this.binding.render(),this.node._ractive.binding=this.binding),"img"===this.name&&c(this),this.decorator&&this.decorator.fn&&a.scheduleTask(function(){n.decorator.init()}),d.transitionsEnabled&&this.intro){var v=new l(this,this.intro,!0)
a.registerTransition(v),a.scheduleTask(function(){return v.start()})}return"option"===this.name&&f(this),this.node.autofocus&&a.scheduleTask(function(){return n.node.focus()}),p(this),this.node}}(A,a,F,H,T,O,Ve,k,v,ai,ki),_i=function(e,t,n){function r(e){var n,r,i
if(n=e.getAttribute("value"),void 0===n||!e.select)return!1
if(r=e.select.getAttribute("value"),r==n)return!0
if(e.select.getAttribute("multiple")&&t(r))for(i=r.length;i--;)if(r[i]==n)return!0}function i(e){var t,n,r,i
return t=e.attributes,n=t.type,r=t.value,i=t.name,n&&"radio"===n.value&&r&&i.interpolator&&r.value===i.interpolator.value?!0:void 0}function o(e){var t=e.toString()
return t?" "+t:""}var s
return s=function(){var t,s
return t="<"+(this.template.y?"!DOCTYPE":this.template.e),t+=this.attributes.map(o).join(""),"option"===this.name&&r(this)&&(t+=" selected"),"input"===this.name&&i(this)&&(t+=" checked"),t+=">","textarea"===this.name&&void 0!==this.getAttribute("value")?t+=n(this.getAttribute("value")):void 0!==this.getAttribute("contenteditable")&&(t+=this.getAttribute("value")),this.fragment&&(s="script"!==this.name&&"style"!==this.name,t+=this.fragment.toString(s)),e.test(this.template.e)||(t+="</"+this.template.e+">"),t}}(Se,a,Wt),Si=function(e){return function(t){t.select&&e(t.select.options,t)}}(d),Ai=function(e){function t(e){e.unbind()}var n
return n=function(){this.fragment&&this.fragment.unbind(),this.binding&&this.binding.unbind(),this.eventHandlers&&this.eventHandlers.forEach(t),"option"===this.name&&e(this),this.attributes.forEach(t)}}(Si),Ti=function(e,t){function n(e){var t,n,r
for(r=e.liveQueries.length;r--;)t=e.liveQueries[r],n=t.selector,t._remove(e.node)}var r
return r=function(r){var i,o
if("option"===this.name?this.detach():r&&e.detachWhenReady(this),this.fragment&&this.fragment.unrender(!1),(i=this.binding)&&(this.binding.unrender(),this.node._ractive.binding=null,o=this.root._twowayBindings[i.keypath],o.splice(o.indexOf(i),1)),this.eventHandlers&&this.eventHandlers.forEach(function(e){return e.unrender()}),this.decorator&&this.decorator.teardown(),this.root.transitionsEnabled&&this.outro){var s=new t(this,this.outro,!1)
e.registerTransition(s),e.scheduleTask(function(){return s.start()})}this.liveQueries&&n(this),this.node.id&&delete this.root.nodes[this.node.id]}}(k,ki),Ci=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d){var m=function(e){this.init(e)}
return m.prototype={bubble:e,detach:t,find:n,findAll:r,findAllComponents:i,findComponent:o,findNextNode:s,firstNode:a,getAttribute:u,init:c,rebind:l,render:h,toString:f,unbind:p,unrender:d},m}(qn,zn,Wn,Vn,Hn,Gn,$n,Kn,Yn,ri,si,Ei,_i,Ai,Ti),Oi=function(){function e(e,t){var n=r.exec(t)[0]
return null===e||n.length<e.length?n:e}var t,n=/^\s*$/,r=/^\s*/
return t=function(t){var r,i,o,s
return r=t.split("\n"),i=r[0],void 0!==i&&n.test(i)&&r.shift(),o=r[r.length-1],void 0!==o&&n.test(o)&&r.pop(),s=r.reduce(e,null),s&&(t=r.map(function(e){return e.replace(s,"")}).join("\n")),t}}(),Ni=function(e,t,n,r){function i(r,i){var o=t.registries.partials,s=o.findInstance(r,i)
if(s){var a,u=s.partials[i]
if("function"==typeof u&&(a=u.bind(s),a.isOwner=s.partials.hasOwnProperty(i),u=a(s.data,n)),!u)return void e.warn({debug:r.debug,message:"noRegistryFunctionReturn",args:{registry:"partial",name:i}})
if(!n.isParsed(u)){var c=n.parse(u,n.getParseOptions(s))
c.p&&e.warn({debug:r.debug,message:"noNestedPartials",args:{rname:i}})
var l=a?s:o.findOwner(s,i)
l.partials[i]=u=c.t}return a&&(u._fn=a),u.v?u.t:u}}var o
return o=function(t,o){var s
if(s=i(t,o))return s
if(s=n.fromId(o,{noThrow:!0})){s=r(s)
var a=n.parse(s,n.getParseOptions(t))
return t.partials[o]=a.t}return e.error({debug:t.debug,message:"noTemplateForPartial",args:{name:o}}),[]}}(Zt,$e,Ue,Oi),Li=function(e,t){var n
return t?n=e.split("\n").map(function(e,n){return n?t+e:e}).join("\n"):e},Ii=function(e,t,n,r,i,o,s,a){var u,c
return r.push(function(){c=r.Fragment}),u=function(t){var n=this.parentFragment=t.parentFragment
this.type=e.PARTIAL,this.name=t.template.r,this.index=t.index,this.root=n.root,o.init(this,t),this.update()},u.prototype={bubble:function(){this.parentFragment.bubble()},firstNode:function(){return this.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},detach:function(){return this.fragment.detach()},render:function(){return this.update(),this.rendered=!0,this.fragment.render()},unrender:function(e){this.rendered&&(this.fragment.unrender(e),this.rendered=!1)},rebind:function(e,t,n,r){return this.fragment.rebind(e,t,n,r)},unbind:function(){this.fragment&&this.fragment.unbind()},toString:function(t){var r,i,o,s
return r=this.fragment.toString(t),i=this.parentFragment.items[this.index-1],i&&i.type===e.TEXT?(o=i.text.split("\n").pop(),(s=/^\s+$/.exec(o))?n(r,s[0]):r):r},find:function(e){return this.fragment.find(e)},findAll:function(e,t){return this.fragment.findAll(e,t)},findComponent:function(e){return this.fragment.findComponent(e)},findAllComponents:function(e,t){return this.fragment.findAllComponents(e,t)},getValue:function(){return this.fragment.getValue()},resolve:o.resolve,setValue:function(e){this.value!==e&&(this.fragment&&this.rendered&&this.fragment.unrender(!0),this.fragment=null,this.value=e,this.rendered?i.addView(this):(this.update(),this.bubble()))},update:function(){var e,n,r,i
this.fragment||(e=this.name&&(s.registries.partials.findInstance(this.root,this.name)||a.fromId(this.name,{noThrow:!0}))?t(this.root,this.name):this.value?t(this.root,this.value):[],this.fragment=new c({template:e,root:this.root,owner:this,pElement:this.parentFragment.pElement}),this.rendered&&(r=this.parentFragment.getNode(),n=this.fragment.render(),i=this.parentFragment.findNextNode(this),r.insertBefore(n,i)))}},u}(V,Ni,Li,o,k,cn,$e,Ue),Ri=function(e,t,n){var r
return n.push(function(){r=n.Ractive}),function i(n,r){var o,s=e.registries.components.findInstance(n,r)
if(s&&(o=s.components[r],!o._parent)){var a=o.bind(s)
if(a.isOwner=s.components.hasOwnProperty(r),o=a(s.data),!o)return void t.warn({debug:n.debug,message:"noRegistryFunctionReturn",args:{registry:"component",name:r}})
"string"==typeof o&&(o=i(n,o)),o._fn=a,s.components[r]=o}return o}}($e,Zt,o),ji=function(){return this.instance.fragment.detach()},Pi=function(e){return this.instance.fragment.find(e)},Mi=function(e,t){return this.instance.fragment.findAll(e,t)},Di=function(e,t){t._test(this,!0),this.instance.fragment&&this.instance.fragment.findAllComponents(e,t)},Fi=function(e){return e&&e!==this.name?this.instance.fragment?this.instance.fragment.findComponent(e):null:this.instance},Bi=function(){return this.parentFragment.findNextNode(this)},Ui=function(){return this.rendered?this.instance.fragment.firstNode():null},qi=function(e,t){var n,r
return t.push(function(){n=t.Fragment}),r=function(e,t,r){this.parentFragment=e.parentFragment,this.component=e,this.key=t,this.fragment=new n({template:r,root:e.root,owner:this}),this.value=this.fragment.getValue()},r.prototype={bubble:function(){this.dirty||(this.dirty=!0,e.addView(this))},update:function(){var t=this.fragment.getValue()
this.component.instance.viewmodel.set(this.key,t),e.addViewmodel(this.component.instance.viewmodel),this.value=t,this.dirty=!1},rebind:function(e,t,n,r){this.fragment.rebind(e,t,n,r)},unbind:function(){this.fragment.unbind()}},r}(k,o),zi=function(e,t){var n=function(n,r,i,o){var s=this
this.root=n.root,this.parentFragment=n.parentFragment,this.ready=!1,this.hash=null,this.resolver=new e(this,i,function(e){s.binding||(s.binding=n.bindings[s.hash])?(n.bindings[s.hash]=null,s.binding.rebind(e),s.hash=e+"="+r,n.bindings[s.hash]):s.ready?t(n,n.root,e,r):o.push({childKeypath:r,parentKeypath:e}),s.value=n.root.viewmodel.get(e)})}
return n.prototype={rebind:function(e,t,n,r){this.resolver.rebind(e,t,n,r)},unbind:function(){this.resolver.unbind()}},n}(on,b),Wi=function(e,t,n,r,i){function o(o,s,a,u){var c,l,h,f,p,d
if(h=o.root,f=o.parentFragment,"string"==typeof a)return l=t(a),l?l.value:a
if(null===a)return!0
if(1===a.length&&a[0].t===e.INTERPOLATOR){if(a[0].r)return f.indexRefs&&void 0!==f.indexRefs[d=a[0].r]?(o.indexRefBindings[d]=s,f.indexRefs[d]):(p=n(h,a[0].r,f)||a[0].r,u.push({childKeypath:s,parentKeypath:p}),h.viewmodel.get(p))
if(a[0].rx)return c=new i(o,s,a[0].rx,u),o.complexParameters.push(c),c.ready=!0,c.value}return c=new r(o,s,a),o.complexParameters.push(c),c.value}var s
return s=function(e,t,n,r){var i,s,a={}
e.complexParameters=[]
for(i in n)n.hasOwnProperty(i)&&(s=o(e,i,n[i],r),(void 0!==s||void 0===t[i])&&(a[i]=s))
return a}}(V,Le,w,qi,zi),Vi=function(e){return function(t,n,r,i){var o,s,a,u
return s=t.parentFragment,u=t.root,a={content:i||[]},n.defaults.el&&e.warn({debug:u.debug,message:"defaultElSpecified",args:{name:t.name}}),o=new n({el:null,append:!0,data:r,partials:a,magic:u.magic||n.defaults.magic,modifyArrays:u.modifyArrays,_parent:u,_component:t,adapt:u.adapt,"yield":{template:i,instance:u}})}}(Zt),Hi=function(e){return function(t,n){n.forEach(function(n){var r,i
e(t,t.root,n.parentKeypath,n.childKeypath),r=t.instance.viewmodel.get(n.childKeypath),i=t.root.viewmodel.get(n.parentKeypath),void 0!==r&&void 0===i&&t.root.viewmodel.set(n.parentKeypath,r)})}}(b),Gi=function(e,t,n){function r(e,r,i,o){"string"!=typeof o&&n.error({debug:r.debug,message:"noComponentEventArguments"}),e.on(i,function(){var e,n
return arguments.length&&arguments[0].node&&(e=Array.prototype.shift.call(arguments)),n=Array.prototype.slice.call(arguments),t(r,o,{event:e,args:n}),!1})}var i,o
return e.push(function(){o=e.Fragment}),i=function(e,t){var n
for(n in t)t.hasOwnProperty(n)&&r(e.instance,e.root,n,t[n])}}(o,p,Zt),$i=function(e){var t,n
for(t=e.root;t;)(n=t._liveComponentQueries["_"+e.name])&&n.push(e.instance),t=t._parent},Ki=function(e,t,n,r,i,o,s){return function(a,u){var c,l,h,f
if(c=this.parentFragment=a.parentFragment,l=c.root,this.root=l,this.type=e.COMPONENT,this.name=a.template.e,this.index=a.index,this.indexRefBindings={},this.bindings=[],this.yielder=null,!u)throw new Error('Component "'+this.name+'" not found')
f=[],h=n(this,u.defaults.data||{},a.template.a,f),r(this,u,h,a.template.f),i(this,f),o(this,a.template.v),(a.template.t1||a.template.t2||a.template.o)&&t('The "intro", "outro" and "decorator" directives have no effect on components'),s(this)}}(V,F,Wi,Vi,Hi,Gi,$i),Yi=function(e,t){return function(n,r,i,o){function s(e){e.rebind(n,r,i,o)}var a,u,c=this.instance,l=c._parent
this.bindings.forEach(function(e){var n
e.root===l&&(n=t(e.keypath,i,o))&&e.rebind(n)}),this.complexParameters.forEach(s),this.yielder&&s(this.yielder),(a=this.indexRefBindings[n])&&(e.addViewmodel(c.viewmodel),c.viewmodel.set(a,r)),(u=this.root._liveComponentQueries["_"+this.name])&&u._makeDirty()}}(k,Jt),Qi=function(){var e=this.instance
return e.render(this.parentFragment.getNode()),this.rendered=!0,e.fragment.detach()},Ji=function(){return this.instance.fragment.toString()},Zi=function(){function e(e){e.unbind()}function t(e){var t,n
t=e.root
do(n=t._liveComponentQueries["_"+e.name])&&n._remove(e)
while(t=t._parent)}var n
return n=function(){this.complexParameters.forEach(e),this.bindings.forEach(e),t(this),this.instance.fragment.unbind()}}(),Xi=function(e){return function(t){e(this.instance,"teardown"),this.shouldDestroy=t,this.instance.unrender()}}(p),eo=function(e,t,n,r,i,o,s,a,u,c,l,h,f){var p=function(e,t){this.init(e,t)}
return p.prototype={detach:e,find:t,findAll:n,findAllComponents:r,findComponent:i,findNextNode:o,firstNode:s,init:a,rebind:u,render:c,toString:l,unbind:h,unrender:f},p}(ji,Pi,Mi,Di,Fi,Bi,Ui,Ki,Yi,Qi,Ji,Zi,Xi),to=function(e,t){var n=function(t){this.type=e.COMMENT,this.value=t.template.c}
return n.prototype={detach:t,firstNode:function(){return this.node},render:function(){return this.node||(this.node=document.createComment(this.value)),this.node},toString:function(){return"<!--"+this.value+"-->"},unrender:function(e){e&&this.node.parentNode.removeChild(this.node)}},n}(V,Ht),no=function(e){var t
e.push(function(){t=e.Fragment})
var n=function(e){var n,r
if(n=e.parentFragment.root,this.component=r=n.component,this.surrogateParent=e.parentFragment,this.parentFragment=r.parentFragment,r.yielder)throw new Error("A component template can only have one {{yield}} declaration at a time")
this.fragment=new t({owner:this,root:n["yield"].instance,template:n["yield"].template}),r.yielder=this}
return n.prototype={detach:function(){return this.fragment.detach()},find:function(e){return this.fragment.find(e)},findAll:function(e,t){return this.fragment.findAll(e,t)},findComponent:function(e){return this.fragment.findComponent(e)},findAllComponents:function(e,t){return this.fragment.findAllComponents(e,t)},findNextNode:function(){return this.surrogateParent.findNextNode(this)},firstNode:function(){return this.fragment.firstNode()},getValue:function(e){return this.fragment.getValue(e)},render:function(){return this.fragment.render()},unbind:function(){this.fragment.unbind()},unrender:function(e){this.fragment.unrender(e),this.component.yielder=void 0},rebind:function(e,t,n,r){this.fragment.rebind(e,t,n,r)},toString:function(){return this.fragment.toString()}},n}(o),ro=function(e,t,n,r,i,o,s,a,u,c,l){return function(h){if("string"==typeof h.template)return new t(h)
switch(h.template.t){case e.INTERPOLATOR:return"yield"===h.template.r?new l(h):new n(h)
case e.SECTION:return new r(h)
case e.TRIPLE:return new i(h)
case e.ELEMENT:var f
return(f=a(h.parentFragment.root,h.template.e))?new u(h,f):new o(h)
case e.PARTIAL:return new s(h)
case e.COMMENT:return new c(h)
default:throw new Error("Something very strange happened. Please file an issue at https://github.com/ractivejs/ractive/issues. Thanks!")}}}(V,Gt,ln,Tn,Un,Ci,Ii,Ri,eo,to,no),io=function(e,t,n){return function(r){var i,o,s,a=this
if(this.owner=r.owner,i=this.parent=this.owner.parentFragment,this.root=r.root,this.pElement=r.pElement,this.context=r.context,this.owner.type===e.SECTION&&(this.index=r.index),i&&(o=i.indexRefs)){this.indexRefs=t(null)
for(s in o)this.indexRefs[s]=o[s]}this.priority=i?i.priority+1:1,r.indexRef&&(this.indexRefs||(this.indexRefs={}),this.indexRefs[r.indexRef]=r.index),"string"==typeof r.template?r.template=[r.template]:r.template||(r.template=[]),this.items=r.template.map(function(e,t){return n({parentFragment:a,pElement:r.pElement,template:e,index:t})}),this.value=this.argsList=null,this.dirtyArgs=this.dirtyValue=!0,this.bound=!0}}(V,H,ro),oo=function(e){return function(t,n,r,i){e(this,"context",r,i),this.indexRefs&&void 0!==this.indexRefs[t]&&(this.indexRefs[t]=n),this.items.forEach(function(e){e.rebind&&e.rebind(t,n,r,i)})}}(oi),so=function(){var e
return 1===this.items.length?e=this.items[0].render():(e=document.createDocumentFragment(),this.items.forEach(function(t){e.appendChild(t.render())})),this.rendered=!0,e},ao=function(e){return this.items?this.items.map(function(t){return t.toString(e)}).join(""):""},uo=function(){function e(e){e.unbind&&e.unbind()}var t
return t=function(){this.bound&&(this.items.forEach(e),this.bound=!1)}}(),co=function(e){if(!this.rendered)throw new Error("Attempted to unrender a fragment that was not rendered")
this.items.forEach(function(t){return t.unrender(e)}),this.rendered=!1},lo=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d,m,g){var v=function(e){this.init(e)}
return v.prototype={bubble:e,detach:t,find:n,findAll:r,findAllComponents:i,findComponent:o,findNextNode:s,firstNode:a,getNode:u,getValue:c,init:l,rebind:h,render:f,toString:p,unbind:d,unrender:m},g.Fragment=v,v}(Rt,jt,Pt,Mt,Dt,Ft,Bt,Ut,qt,zt,io,oo,so,ao,uo,co,o),ho=function(e,t,n,r){var i=["template","partials","components","decorators","events"]
return function(o,s){var a,u,c,l,h
if("function"!=typeof o||s?o=o||{}:(s=o,o={}),"object"!=typeof o)throw new Error("The reset method takes either no arguments, or an object containing new data")
for((u=this.viewmodel.wrapped[""])&&u.reset?u.reset(o)===!1&&(this.data=o):this.data=o,c=r.reset(this),l=c.length;l--;)if(i.indexOf(c[l])>-1){h=!0
break}if(h){var f
this.viewmodel.mark(""),(f=this.component)&&(f.shouldDestroy=!0),this.unrender(),f&&(f.shouldDestroy=!1),this.fragment.template!==this.template&&(this.fragment.unbind(),this.fragment=new n({template:this.template,root:this,owner:this})),a=this.render(this.el,this.anchor)}else a=t.start(this,!0),this.viewmodel.mark(""),t.end()
return e(this,"reset",{args:[o]}),s&&a.then(s),a}}(p,k,lo,$e),fo=function(e,t){return function(n){var r,i
e.template.init(null,this,{template:n}),r=this.transitionsEnabled,this.transitionsEnabled=!1,(i=this.component)&&(i.shouldDestroy=!0),this.unrender(),i&&(i.shouldDestroy=!1),this.fragment.unbind(),this.fragment=new t({template:this.template,root:this,owner:this}),this.render(this.el,this.anchor),this.transitionsEnabled=r}}($e,lo),po=function(e){return e("reverse")}(Ct),mo=function(e,t,n,r){var i=/\*/
return function(o,s,a){var u,c,l=this
if(c=e.start(this,!0),t(o)){u=o,a=s
for(o in u)u.hasOwnProperty(o)&&(s=u[o],o=n(o),this.viewmodel.set(o,s))}else o=n(o),i.test(o)?r(this,o).forEach(function(e){l.viewmodel.set(e,s)}):this.viewmodel.set(o,s)
return e.end(),a&&c.then(a.bind(this)),c}}(k,u,R,vt),go=function(e){return e("shift")}(Ct),vo=function(e){return e("sort")}(Ct),yo=function(e){return e("splice")}(Ct),bo=function(e){return function(t,n){return e(this,t,void 0===n?-1:-n)}}(L),wo=function(e,t,n){return function(r){var i
return e(this,"teardown"),this.fragment.unbind(),this.viewmodel.teardown(),this.rendered&&this.el.__ractive_instances__&&t(this.el.__ractive_instances__,this),this.shouldDestroy=!0,i=this.rendered?this.unrender():n.resolve(),r&&i.then(r.bind(this)),i}}(p,d,m),xo=function(e){return function(t,n){var r
return"string"!=typeof t&&e.errorOnly({debug:this.debug,messsage:"badArguments",arg:{arguments:t}}),r=this.get(t),this.set(t,!r,n)}}(Zt),ko=function(){return this.fragment.toString(!0)},Eo=function(e,t,n,r,i){return function(){var o,s,a=this
if(!this.rendered)return r.warn({debug:this.debug,message:"ractive.unrender() was called on a Ractive instance that was not rendered"}),i.resolve()
for(o=t.start(this,!0),s=!this.component||this.component.shouldDestroy||this.shouldDestroy,this.constructor.css&&o.then(function(){n.remove(a.constructor)});this._animations[0];)this._animations[0].stop()
return this.fragment.unrender(s),this.rendered=!1,e(this.el.__ractive_instances__,this),t.end(),o}}(d,k,Lt,Zt,m),_o=function(e){return e("unshift")}(Ct),So=function(e,t){return function(n,r){var i
return"function"==typeof n?(r=n,n=""):n=n||"",i=t.start(this,!0),this.viewmodel.mark(n),t.end(),e(this,"update",{args:[n]}),r&&i.then(r.bind(this)),i}}(p,k),Ao=function(e,t){function n(r,i,o,s){var a,u,c,l,h,f,p=[]
if(a=r._twowayBindings[i],a&&(c=a.length))for(;c--;)l=a[c],(!l.radioName||l.element.node.checked)&&(l.checkboxName?p[l.keypath]||l.changed()||(p.push(l.keypath),p[l.keypath]=l):(h=l.attribute.value,f=l.getValue(),e(h,f)||t(h,f)||(o[i]=f)))
if(p.length&&p.forEach(function(t){var n,r,i
n=p[t],r=n.attribute.value,i=n.getValue(),e(r,i)||(o[t]=i)}),s&&(u=r.viewmodel.depsMap["default"][i]))for(c=u.length;c--;)n(r,u[c],o,s)}var r
return r=function(e,t){var r
return"string"!=typeof e&&(e="",t=!0),n(this,e,r={},t),this.set(r)}}(Rr,y),To=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d,m,g,v,y,b,w,x,k,E,_,S,A,T,C,O,N,L){return{add:e,animate:t,detach:n,find:r,findAll:i,findAllComponents:o,findComponent:s,fire:a,get:u,insert:c,merge:l,observe:h,off:f,on:p,pop:d,push:m,render:g,reset:v,resetTemplate:y,reverse:b,set:w,shift:x,sort:k,splice:E,subtract:_,teardown:S,toggle:A,toHTML:T,unrender:C,unshift:O,update:N,updateModel:L}}(I,Qe,Je,Ze,ut,ct,lt,ht,ft,dt,mt,xt,_t,St,Ot,Nt,It,ho,fo,po,mo,go,vo,yo,bo,wo,xo,ko,Eo,_o,So,Ao),Co=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t,n
return t=16*Math.random()|0,n="x"==e?t:3&t|8,n.toString(16)})},Oo=function(){var e=0
return function(){return"r-"+e++}}(),No=function(e,t,n,r){var i=e.root,o=e.keypath
return"sort"===n||"reverse"===n?void i.viewmodel.set(o,t):void(r&&i.viewmodel.splice(o,r))},Lo=function(e,t,n,r,i){var o,s,a,u=[],c=["pop","push","reverse","shift","sort","splice","unshift"]
return c.forEach(function(o){var s=function(){var t,s,a,u,c
for(t=n(this,o,Array.prototype.slice.call(arguments)),s=r(this,t),a=Array.prototype[o].apply(this,arguments),this._ractive.setting=!0,c=this._ractive.wrappers.length;c--;)u=this._ractive.wrappers[c],e.start(u.root),i(u,this,o,s),e.end()
return this._ractive.setting=!1,a}
t(u,o,{value:s})}),o={},o.__proto__?(s=function(e){e.__proto__=u},a=function(e){e.__proto__=Array.prototype}):(s=function(e){var n,r
for(n=c.length;n--;)r=c[n],t(e,r,{value:u[r],configurable:!0})},a=function(e){var t
for(t=c.length;t--;)delete e[c[t]]}),s.unpatch=a,s}(k,O,At,Tt,No),Io=function(e,t,n){var r,i,o
return r={filter:function(e){return t(e)&&(!e._ractive||!e._ractive.setting)},wrap:function(e,t,n){return new i(e,t,n)}},i=function(t,r,i){this.root=t,this.value=r,this.keypath=i,r._ractive||(e(r,"_ractive",{value:{wrappers:[],instances:[],setting:!1},configurable:!0}),n(r)),r._ractive.instances[t._guid]||(r._ractive.instances[t._guid]=0,r._ractive.instances.push(t)),r._ractive.instances[t._guid]+=1,r._ractive.wrappers.push(this)},i.prototype={get:function(){return this.value},teardown:function(){var e,t,r,i,s
if(e=this.value,t=e._ractive,r=t.wrappers,i=t.instances,t.setting)return!1
if(s=r.indexOf(this),-1===s)throw new Error(o)
if(r.splice(s,1),r.length){if(i[this.root._guid]-=1,!i[this.root._guid]){if(s=i.indexOf(this.root),-1===s)throw new Error(o)
i.splice(s,1)}}else delete e._ractive,n.unpatch(this.value)}},o="Something went wrong in a rather interesting way",r}(O,a,Lo),Ro=function(e,t){var n,r
return e&&(n={filter:function(n,r,i){return e.filter(n,r,i)&&t.filter(n)},wrap:function(e,t,n){return new r(e,t,n)}},r=function(n,r,i){this.value=r,this.magic=!0,this.magicWrapper=e.wrap(n,r,i),this.arrayWrapper=t.wrap(n,r,i)},r.prototype={get:function(){return this.value},teardown:function(){this.arrayWrapper.teardown(),this.magicWrapper.teardown()},reset:function(e){return this.magicWrapper.reset(e)}}),n}(_,Io),jo=function(e,t,n,r){function i(e,t){var n,r={}
if(!t)return e
t+="."
for(n in e)e.hasOwnProperty(n)&&(r[t+n]=e[n])
return r}function o(e){var t
return a[e]||(t=e?e+".":"",a[e]=function(n,r){var o
return"string"==typeof n?(o={},o[t+n]=r,o):"object"==typeof n?t?i(n,e):n:void 0}),a[e]}var s,a={}
return s=function(i,s){var a,u,c,l,h=this.ractive
for(a=h.adapt.length,u=0;a>u;u+=1){if(c=h.adapt[u],"string"==typeof c){var f=e.registries.adaptors.find(h,c)
if(!f)throw new Error('Missing adaptor "'+c+'"')
c=h.adapt[u]=f}if(c.filter(s,i,h))return l=this.wrapped[i]=c.wrap(h,s,i,o(i)),l.value=s,s}return h.magic?r.filter(s,i,h)?this.wrapped[i]=r.wrap(h,s,i):n.filter(s,i,h)&&(this.wrapped[i]=n.wrap(h,s,i)):h.modifyArrays&&t.filter(s,i,h)&&(this.wrapped[i]=t.wrap(h,s,i)),s}}($e,Io,_,Ro),Po=function(e){var t,n,r,i,o=[""]
for(t=e.length;t--;)for(n=e[t],r=n.split(".");r.length>1;)r.pop(),i=r.join("."),-1===o.indexOf(i)&&o.push(i)
return o},Mo=function(){function e(e){var t,r,i,o,s,a=""
if(!n[e]){for(i=[];a.length<e;)a+=1
for(t=parseInt(a,2),o=function(e){return"1"===e},s=0;t>=s;s+=1){for(r=s.toString(2);r.length<e;)r="0"+r
i[s]=Array.prototype.map.call(r,o)}n[e]=i}return n[e]}var t,n={}
return t=function(t){var n,r,i,o
return n=t.split("."),r=e(n.length),i=function(e,t){return e?"*":n[t]},o=r.map(function(e){return e.map(i).join(".")})}}(),Do=function(e){function t(t,i,o){var s
r(t,i),o||(s=e(i),s.forEach(function(e){n(t,e,i)}))}function n(e,t,i){var s,a,u
s=e.depsMap.patternObservers,a=s[t],a&&a.forEach(function(t){var s=o.exec(t)[0]
u=i?i+"."+s:s,r(e,u),n(e,t,u)})}function r(e,t){e.patternObservers.forEach(function(e){e.regex.test(t)&&e.update(t)})}var i,o=/[^\.]+$/
return i=t}(Mo),Fo=function(e,t){function n(e){e.update()}function r(e,t,n){var r,i;(r=o(e,t,n))&&(i=e.get(t),r.forEach(function(e){return e.setValue(i)}))}function i(e,t,n){function r(e){e.forEach(i),e.forEach(s)}function i(t){var r=o(e,t,n)
r&&u.push({keypath:t,deps:r})}function s(t){var i;(i=e.depsMap[n][t])&&r(i)}function a(t){var n=e.get(t.keypath)
t.deps.forEach(function(e){return e.setValue(n)})}var u=[]
r(t),u.forEach(a)}function o(e,t,n){var r=e.deps[n]
return r?r[t]:null}function s(e,t){t.forEach(function(t){-1===e.indexOf(t)&&e.push(t)})}var a,u=["observers","default"]
return a=function(){var o,a,c,l,h,f=this,p=this,d=[],m={}
if(this.changes.length){l=function(e){var t;(t=p.deps.computed[e])&&s(c,t)},h=function(e){var t
l(e),(t=p.depsMap.computed[e])&&t.forEach(h)}
do o=this.changes,s(d,o),this.changes=[],c=[],a=e(o),a.forEach(l),o.forEach(h),c.forEach(n)
while(this.changes.length)
return a=e(d),this.patternObservers.length&&(a.forEach(function(e){return t(f,e,!0)}),d.forEach(function(e){return t(f,e)})),u.forEach(function(e){f.deps[e]&&(a.forEach(function(t){return r(f,t,e)}),i(f,d,e))}),d.forEach(function(e){m[e]=f.get(e)}),this.implicitChanges={},m}}}(Po,Do),Bo=function(){this.capturing=!0,this.captured=[]},Uo=function(e,t){var n,r,i
if(t||(r=this.wrapped[e])&&r.teardown()!==!1&&(this.wrapped[e]=null),(i=this.computations[e])&&i.compute(),this.cache[e]=void 0,n=this.cacheMap[e])for(;n.length;)this.clearCache(n.pop())},qo={FAILED_LOOKUP:!0},zo=function(e,t){var n={},r=function(e,r){this.viewmodel=e,this.root=e.ractive,this.ref=r,this.parentFragment=n,e.unresolvedImplicitDependencies[r]=!0,e.unresolvedImplicitDependencies.push(this),t.addUnresolved(this)}
return r.prototype={resolve:function(){this.viewmodel.mark(this.ref),this.viewmodel.unresolvedImplicitDependencies[this.ref]=!1,e(this.viewmodel.unresolvedImplicitDependencies,this)},teardown:function(){t.removeUnresolved(this)}},r}(d,k),Wo=function(e,t){function n(t,n){var r,i,o,s,a,u,c
return r=n.split("."),i=r.pop(),o=r.join("."),s=t.get(o),(c=t.wrapped[o])&&(s=c.get()),null!==s&&void 0!==s?((a=t.cacheMap[o])?-1===a.indexOf(n)&&a.push(n):t.cacheMap[o]=[n],"object"!=typeof s||i in s?(u=s[i],t.adapt(n,u,!1),t.cache[n]=u,u):t.cache[n]=e):void 0}var r,i={}
return r=function(r){var o=arguments[1]
void 0===o&&(o=i)
var s,a,u,c,l=this.ractive,h=this.cache
return void 0===h[r]?((a=this.computations[r])?s=a.value:(u=this.wrapped[r])?s=u.value:r?s=(c=this.evaluators[r])?c.value:n(this,r):(this.adapt("",l.data),s=l.data),h[r]=s):s=h[r],o.evaluateWrapped&&(u=this.wrapped[r])&&(s=u.get()),o.capture&&this.capturing&&-1===this.captured.indexOf(r)&&(this.captured.push(r),s===e&&this.unresolvedImplicitDependencies[r]!==!0&&new t(this,r)),s===e?void 0:s}}(qo,zo),Vo=function(e,t){t&&(this.implicitChanges[e]=!0),-1===this.changes.indexOf(e)&&(this.changes.push(e),this.clearCache(e))},Ho=function(e,t){var n,r,i,o
return n={},r=0,i=e.map(function(e,i){var s,a,u
a=r,u=t.length
do{if(s=t.indexOf(e,a),-1===s)return o=!0,-1
a=s+1}while(n[s]&&u>a)
return s===r&&(r+=1),s!==i&&(o=!0),n[s]=!0,s}),i.unchanged=!o,i},Go=function(e,t,n){function r(t){return"function"==typeof t.merge&&(!t.subtype||t.subtype===e.SECTION_EACH)}function i(e){return JSON.stringify(e)}function o(e){if(e===!0)return i
if("string"==typeof e)return a[e]||(a[e]=function(t){return t[e]}),a[e]
if("function"==typeof e)return e
throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)")}var s,a={}
return s=function(e,i,s,a){var u,c,l,h,f,p=this
if(this.mark(e),a&&a.compare){l=o(a.compare)
try{u=i.map(l),c=s.map(l)}catch(d){if(this.debug)throw d
t("Merge operation: comparison failed. Falling back to identity checking"),u=i,c=s}}else u=i,c=s
h=n(u,c),h.forEach(function(t,n){-1===t&&p.mark(e+"."+n)}),this.set(e,s,!0),(f=this.deps["default"][e])&&f.filter(r).forEach(function(e){return e.merge(h)}),i.length!==s.length&&this.mark(e+".length",!0)}}(V,F,Ho),$o=function(){function e(e,t,n){var r,i,o,s
for(r=t.split(".");r.length;)r.pop(),i=r.join("."),o=e.depsMap[n]||(e.depsMap[n]={}),s=o[i]||(o[i]=[]),void 0===s[t]&&(s[t]=0,s.push(t)),s[t]+=1,t=i}var t
return t=function(t,n){var r=arguments[2]
void 0===r&&(r="default")
var i,o,s
n.isStatic||(i=this.deps[r]||(this.deps[r]={}),o=i[t]||(i[t]=[]),o.push(n),t&&((s=this.evaluators[t])&&(s.dependants||s.wake(),s.dependants+=1),e(this,t,r)))}}(),Ko=function(){return this.capturing=!1,this.captured},Yo=function(e,t){return function(n,r,i){var o,s,a,u,c,l,h,f
c=this.computations[n],c&&!c.setting&&(c.set(r),r=c.get()),e(this.cache[n],r)||(l=this.wrapped[n],h=this.evaluators[n],l&&l.reset&&(f=l.reset(r)!==!1,f&&(r=l.get())),h&&(h.value=r),c||h||f||(o=n.split("."),s=o.pop(),a=o.join("."),l=this.wrapped[a],l&&l.set?l.set(s,r):(u=l?l.get():this.get(a),u||(u=t(s),this.set(a,u,!0)),u[s]=r)),i?this.clearCache(n):this.mark(n))}}(y,E),Qo=function(e){function t(t){return t.type===e.SECTION&&(!t.subtype||t.subtype===e.SECTION_EACH)&&t.rendered}var n
return n=function(e,n){var r,i,o=this
for(r=n.rangeStart;r<n.rangeEnd;r+=1)o.mark(e+"."+r)
n.balance&&o.mark(e+".length",!0),(i=o.deps["default"][e])&&i.filter(t).forEach(function(e){return e.splice(n)})}}(V),Jo=function(){var e,t=this
for(Object.keys(this.cache).forEach(function(e){return t.clearCache(e)});e=this.unresolvedImplicitDependencies.pop();)e.teardown()},Zo=function(){function e(e,t,n){var r,i,o,s
for(r=t.split(".");r.length;)r.pop(),i=r.join("."),o=e.depsMap[n],s=o[i],s[t]-=1,s[t]||(s.splice(s.indexOf(t),1),s[t]=void 0),t=i}var t
return t=function(t,n){var r=arguments[2]
void 0===r&&(r="default")
var i,o,s
if(!n.isStatic){if(i=this.deps[r][t],o=i.indexOf(n),-1===o)throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks")
i.splice(o,1),t&&((s=this.evaluators[t])&&(s.dependants-=1,s.dependants||s.sleep()),e(this,t,r))}}}(),Xo=function(){function e(e){var t="var __ractive=this;return("+e.replace(n,function(e,t){return'__ractive.get("'+t+'")'})+")"
return new Function(t)}var t,n=/\$\{([^\}]+)\}/g
return t=function(t){return"function"==typeof t?{get:t}:"string"==typeof t?{get:e(t)}:("object"==typeof t&&"string"==typeof t.get&&(t={get:e(t.get),set:t.set}),t)}}(),es=function(e,t,n){var r=function(e,t,n){var r
this.ractive=e,this.viewmodel=e.viewmodel,this.key=t,this.getter=n.get,this.setter=n.set,this.dependencies=[],(r=e.viewmodel.get(t))&&this.set(r),this.update()}
return r.prototype={get:function(){return this.compute(),this.value},set:function(e){if(this.setting)return void(this.value=e)
if(!this.setter)throw new Error("Computed properties without setters are read-only. (This may change in a future version of Ractive!)")
this.setter.call(this.ractive,e)},compute:function(){var t,r,i
t=this.ractive,t.viewmodel.capture()
try{this.value=this.getter.call(t)}catch(o){e.warn({debug:t.debug,message:"failedComputation",args:{key:this.key,err:o.message||o}}),r=!0}return i=t.viewmodel.release(),n(this,this.dependencies,i),r?!1:!0},update:function(){var e=this.value
this.compute()&&!t(this.value,e)&&this.ractive.viewmodel.mark(this.key)}},r}(Zt,y,en),ts=function(e,t){return function(n,r){var i,o
for(i in r)o=e(r[i]),n.viewmodel.computations[i]=new t(n,i,o)}}(Xo,es),ns=function(){function e(e){return"string"==typeof e&&(e=[e]),e}var t={lookup:function(e,t){var n,r=e.adapt
if(!r||!r.length)return r
if(t&&Object.keys(t).length&&(n=r.length))for(;n--;){var i=r[n]
"string"==typeof i&&(r[n]=t[i]||i)}return r},combine:function(t,n){return t=e(t),n=e(n),t&&t.length?n&&n.length?(t.forEach(function(e){-1===n.indexOf(e)&&n.push(e)}),n):t.slice():n}}
return t}(),rs=function(e,t,n,r,i,o,s,a,u,c,l,h,f,p,d,m){var g
try{Object.defineProperty({},"test",{value:0})}catch(v){g=!0}var y=function(t){this.ractive=t,y.extend(t.constructor,t),this.cache={},this.cacheMap=e(null),this.deps={computed:{},"default":{}},this.depsMap={computed:{},"default":{}},this.patternObservers=[],this.wrapped=e(null),this.evaluators=e(null),this.computations=e(null),this.captured=null,this.unresolvedImplicitDependencies=[],this.changes=[],this.implicitChanges={}}
return y.extend=function(e,t){if(t.magic&&g)throw new Error("Getters and setters (magic mode) are not supported in this browser")
t.adapt=m.combine(e.prototype.adapt,t.adapt)||[],t.adapt=m.lookup(t,t.adaptors)},y.prototype={adapt:t,applyChanges:n,capture:r,clearCache:i,get:o,mark:s,merge:a,register:u,release:c,set:l,splice:h,teardown:f,unregister:p,compute:function(){d(this.ractive,this.ractive.computed)}},y}(H,jo,Fo,Bo,Uo,Wo,Vo,Go,$o,Ko,Yo,Qo,Jo,Zo,ts,ns),is=function(e,t,n,r,i,o){function s(e){var t
if(t=n(e.el)){if(t&&!e.append){if(t.__ractive_instances__)try{t.__ractive_instances__.splice(0,t.__ractive_instances__.length).forEach(function(e){return e.teardown()})}catch(r){}t.innerHTML=""}e.render(t,e.append)}}function a(e,n){e._guid=r(),e._subs=t(null),e._config={},e._twowayBindings=t(null),e._animations=[],e.nodes={},e._liveQueries=[],e._liveComponentQueries=[],n._parent&&n._component&&(e._parent=n._parent,e.component=n._component,n._component.instance=e)}var u
return u=function(t){var n=arguments[1]
void 0===n&&(n={}),a(t,n),e.init(t.constructor,t,n),t.viewmodel=new i(t),t.viewmodel.compute(),t.template&&(t.fragment=new o({template:t.template,root:t,owner:t})),s(t)}}($e,H,pt,Oo,rs,lo),os=function(e){return function(t,n,r){t.beforeInit&&t.beforeInit(r),e(t,r)}}(is),ss=function(e,t,n,r){function i(t,n,r){for(var i in r)if(!(i in c)&&r.hasOwnProperty(i)){var o=r[i]
"function"==typeof o&&(o=e(t,i,o)),n[i]=o}}function o(e){if(!(e.prototype instanceof u))return e
for(var n={};e;)h.forEach(function(t){s(t.useDefaults?e.prototype:e,n,t.name)}),Object.keys(e.prototype).forEach(function(r){if("computed"!==r){var i=e.prototype[r]
if(r in n){if("function"==typeof n[r]&&"function"==typeof i&&n[r]._method){var o,s=i._method
s&&(i=i._method),o=t(n[r]._method,i),s&&(o._method=o),n[r]=o}}else n[r]=i._method?i._method:i}}),e=e._parent!==u?e._parent:!1
return n}function s(e,t,n){var r,i=Object.keys(e[n])
i.length&&((r=t[n])||(r=t[n]={}),i.filter(function(e){return!(e in r)}).forEach(function(t){return r[t]=e[n][t]}))}var a,u,c={_parent:!0,_component:!0},l={toPrototype:i,toOptions:o},h=n.registries
return n.keys.forEach(function(e){return c[e]=!0}),r.push(function(){u=r.Ractive}),a=l}(He,q,$e,o),as=function(e,t,n,r,i,o,s){return function a(){var u=arguments[0]
void 0===u&&(u={})
var c,l,h,f=this
return u=s.toOptions(u),c=function(e){i(this,c,e)},l=e(f.prototype),l.constructor=c,h={_guid:{value:n()},defaults:{value:l},extend:{value:a,writable:!0,configurable:!0},_parent:{value:f}},t(c,h),r.extend(f,l,u),o.extend(f,l),s.toPrototype(f.prototype,l,u),c.prototype=l,c}}(H,N,Co,$e,os,rs,ss),us=function(e,t,n,r,i,o,s,a,u,c,l,h,f){var p,d
for(p=function(e){h(this,e)},d={extend:{value:c},parse:{value:l},Promise:{value:a},svg:{value:r},magic:{value:i},VERSION:{value:"0.5.8"},adaptors:{writable:!0,value:{}},components:{writable:!0,value:{}},decorators:{writable:!0,value:{}},easing:{writable:!0,value:t},events:{writable:!0,value:{}},interpolators:{writable:!0,value:n},partials:{writable:!0,value:{}},transitions:{writable:!0,value:{}}},o(p,d),p.prototype=u(s,e),p.prototype.constructor=p,p.defaults=p.prototype,f.Ractive=p;f.length;)f.pop()()
var m="function"
if(typeof Date.now!==m||typeof String.prototype.trim!==m||typeof Object.keys!==m||typeof Array.prototype.indexOf!==m||typeof Array.prototype.forEach!==m||typeof Array.prototype.map!==m||typeof Array.prototype.filter!==m||"undefined"!=typeof window&&typeof window.addEventListener!==m)throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.")
return p}(r,i,l,h,S,N,To,m,Er,as,De,is,o)
"undefined"!=typeof t&&t.exports?t.exports=us:"function"==typeof define&&define.amd&&define(function(){return us}),e.Ractive=us,us.noConflict=function(){return e.Ractive=n,us}}("undefined"!=typeof window?window:this)},{}],176:[function(e,t,n){},{}],177:[function(e,t,n){function r(e,t,n){if(!(this instanceof r))return new r(e,t,n)
var i,o=typeof e
if("number"===o)i=e>0?e>>>0:0
else if("string"===o)"base64"===t&&(e=E(e)),i=r.byteLength(e,t)
else{if("object"!==o||null===e)throw new TypeError("must start with number, buffer, array or string")
"Buffer"===e.type&&P(e.data)&&(e=e.data),i=+e.length>0?Math.floor(+e.length):0}if(this.length>M)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+M.toString(16)+" bytes")
var s
r.TYPED_ARRAY_SUPPORT?s=r._augment(new Uint8Array(i)):(s=this,s.length=i,s._isBuffer=!0)
var a
if(r.TYPED_ARRAY_SUPPORT&&"number"==typeof e.byteLength)s._set(e)
else if(S(e))if(r.isBuffer(e))for(a=0;i>a;a++)s[a]=e.readUInt8(a)
else for(a=0;i>a;a++)s[a]=(e[a]%256+256)%256
else if("string"===o)s.write(e,0,t)
else if("number"===o&&!r.TYPED_ARRAY_SUPPORT&&!n)for(a=0;i>a;a++)s[a]=0
return s}function i(e,t,n,r){n=Number(n)||0
var i=e.length-n
r?(r=Number(r),r>i&&(r=i)):r=i
var o=t.length
if(o%2!==0)throw new Error("Invalid hex string")
r>o/2&&(r=o/2)
for(var s=0;r>s;s++){var a=parseInt(t.substr(2*s,2),16)
if(isNaN(a))throw new Error("Invalid hex string")
e[n+s]=a}return s}function o(e,t,n,r){var i=L(T(t),e,n,r)
return i}function s(e,t,n,r){var i=L(C(t),e,n,r)
return i}function a(e,t,n,r){return s(e,t,n,r)}function u(e,t,n,r){var i=L(N(t),e,n,r)
return i}function c(e,t,n,r){var i=L(O(t),e,n,r,2)
return i}function l(e,t,n){return R.fromByteArray(0===t&&n===e.length?e:e.slice(t,n))}function h(e,t,n){var r="",i=""
n=Math.min(e.length,n)
for(var o=t;n>o;o++)e[o]<=127?(r+=I(i)+String.fromCharCode(e[o]),i=""):i+="%"+e[o].toString(16)
return r+I(i)}function f(e,t,n){var r=""
n=Math.min(e.length,n)
for(var i=t;n>i;i++)r+=String.fromCharCode(e[i])
return r}function p(e,t,n){return f(e,t,n)}function d(e,t,n){var r=e.length;(!t||0>t)&&(t=0),(!n||0>n||n>r)&&(n=r)
for(var i="",o=t;n>o;o++)i+=A(e[o])
return i}function m(e,t,n){for(var r=e.slice(t,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1])
return i}function g(e,t,n){if(e%1!==0||0>e)throw new RangeError("offset is not uint")
if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function v(e,t,n,i,o,s){if(!r.isBuffer(e))throw new TypeError("buffer must be a Buffer instance")
if(t>o||s>t)throw new TypeError("value is out of bounds")
if(n+i>e.length)throw new TypeError("index out of range")}function y(e,t,n,r){0>t&&(t=65535+t+1)
for(var i=0,o=Math.min(e.length-n,2);o>i;i++)e[n+i]=(t&255<<8*(r?i:1-i))>>>8*(r?i:1-i)}function b(e,t,n,r){0>t&&(t=4294967295+t+1)
for(var i=0,o=Math.min(e.length-n,4);o>i;i++)e[n+i]=t>>>8*(r?i:3-i)&255}function w(e,t,n,r,i,o){if(t>i||o>t)throw new TypeError("value is out of bounds")
if(n+r>e.length)throw new TypeError("index out of range")}function x(e,t,n,r,i){return i||w(e,t,n,4,3.4028234663852886e38,-3.4028234663852886e38),j.write(e,t,n,r,23,4),n+4}function k(e,t,n,r,i){return i||w(e,t,n,8,1.7976931348623157e308,-1.7976931348623157e308),j.write(e,t,n,r,52,8),n+8}function E(e){for(e=_(e).replace(F,"");e.length%4!==0;)e+="="
return e}function _(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function S(e){return P(e)||r.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function A(e){return 16>e?"0"+e.toString(16):e.toString(16)}function T(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n)
if(127>=r)t.push(r)
else{var i=n
r>=55296&&57343>=r&&n++
for(var o=encodeURIComponent(e.slice(i,n+1)).substr(1).split("%"),s=0;s<o.length;s++)t.push(parseInt(o[s],16))}}return t}function C(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n))
return t}function O(e){for(var t,n,r,i=[],o=0;o<e.length;o++)t=e.charCodeAt(o),n=t>>8,r=t%256,i.push(r),i.push(n)
return i}function N(e){return R.toByteArray(e)}function L(e,t,n,r,i){i&&(r-=r%i)
for(var o=0;r>o&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o]
return o}function I(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}var R=e("base64-js"),j=e("ieee754"),P=e("is-array")
n.Buffer=r,n.SlowBuffer=r,n.INSPECT_MAX_BYTES=50,r.poolSize=8192
var M=1073741823
r.TYPED_ARRAY_SUPPORT=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e)
return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray&&0===new Uint8Array(1).subarray(1,1).byteLength}catch(n){return!1}}(),r.isBuffer=function(e){return!(null==e||!e._isBuffer)},r.compare=function(e,t){if(!r.isBuffer(e)||!r.isBuffer(t))throw new TypeError("Arguments must be Buffers")
for(var n=e.length,i=t.length,o=0,s=Math.min(n,i);s>o&&e[o]===t[o];o++);return o!==s&&(n=e[o],i=t[o]),i>n?-1:n>i?1:0},r.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0
default:return!1}},r.concat=function(e,t){if(!P(e))throw new TypeError("Usage: Buffer.concat(list[, length])")
if(0===e.length)return new r(0)
if(1===e.length)return e[0]
var n
if(void 0===t)for(t=0,n=0;n<e.length;n++)t+=e[n].length
var i=new r(t),o=0
for(n=0;n<e.length;n++){var s=e[n]
s.copy(i,o),o+=s.length}return i},r.byteLength=function(e,t){var n
switch(e+="",t||"utf8"){case"ascii":case"binary":case"raw":n=e.length
break
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length
break
case"hex":n=e.length>>>1
break
case"utf8":case"utf-8":n=T(e).length
break
case"base64":n=N(e).length
break
default:n=e.length}return n},r.prototype.length=void 0,r.prototype.parent=void 0,r.prototype.toString=function(e,t,n){var r=!1
if(t>>>=0,n=void 0===n||n===1/0?this.length:n>>>0,e||(e="utf8"),0>t&&(t=0),n>this.length&&(n=this.length),t>=n)return""
for(;;)switch(e){case"hex":return d(this,t,n)
case"utf8":case"utf-8":return h(this,t,n)
case"ascii":return f(this,t,n)
case"binary":return p(this,t,n)
case"base64":return l(this,t,n)
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return m(this,t,n)
default:if(r)throw new TypeError("Unknown encoding: "+e)
e=(e+"").toLowerCase(),r=!0}},r.prototype.equals=function(e){if(!r.isBuffer(e))throw new TypeError("Argument must be a Buffer")
return 0===r.compare(this,e)},r.prototype.inspect=function(){var e="",t=n.INSPECT_MAX_BYTES
return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},r.prototype.compare=function(e){if(!r.isBuffer(e))throw new TypeError("Argument must be a Buffer")
return r.compare(this,e)},r.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},r.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},r.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0)
else{var l=r
r=t,t=n,n=l}t=Number(t)||0
var h=this.length-t
n?(n=Number(n),n>h&&(n=h)):n=h,r=String(r||"utf8").toLowerCase()
var f
switch(r){case"hex":f=i(this,e,t,n)
break
case"utf8":case"utf-8":f=o(this,e,t,n)
break
case"ascii":f=s(this,e,t,n)
break
case"binary":f=a(this,e,t,n)
break
case"base64":f=u(this,e,t,n)
break
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":f=c(this,e,t,n)
break
default:throw new TypeError("Unknown encoding: "+r)}return f},r.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},r.prototype.slice=function(e,t){var n=this.length
if(e=~~e,t=void 0===t?n:~~t,0>e?(e+=n,0>e&&(e=0)):e>n&&(e=n),0>t?(t+=n,0>t&&(t=0)):t>n&&(t=n),e>t&&(t=e),r.TYPED_ARRAY_SUPPORT)return r._augment(this.subarray(e,t))
for(var i=t-e,o=new r(i,void 0,!0),s=0;i>s;s++)o[s]=this[s+e]
return o},r.prototype.readUInt8=function(e,t){return t||g(e,1,this.length),this[e]},r.prototype.readUInt16LE=function(e,t){return t||g(e,2,this.length),this[e]|this[e+1]<<8},r.prototype.readUInt16BE=function(e,t){return t||g(e,2,this.length),this[e]<<8|this[e+1]},r.prototype.readUInt32LE=function(e,t){return t||g(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},r.prototype.readUInt32BE=function(e,t){return t||g(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},r.prototype.readInt8=function(e,t){return t||g(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},r.prototype.readInt16LE=function(e,t){t||g(e,2,this.length)
var n=this[e]|this[e+1]<<8
return 32768&n?4294901760|n:n},r.prototype.readInt16BE=function(e,t){t||g(e,2,this.length)
var n=this[e+1]|this[e]<<8
return 32768&n?4294901760|n:n},r.prototype.readInt32LE=function(e,t){return t||g(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},r.prototype.readInt32BE=function(e,t){return t||g(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},r.prototype.readFloatLE=function(e,t){return t||g(e,4,this.length),j.read(this,e,!0,23,4)},r.prototype.readFloatBE=function(e,t){return t||g(e,4,this.length),j.read(this,e,!1,23,4)},r.prototype.readDoubleLE=function(e,t){return t||g(e,8,this.length),j.read(this,e,!0,52,8)},r.prototype.readDoubleBE=function(e,t){return t||g(e,8,this.length),j.read(this,e,!1,52,8)},r.prototype.writeUInt8=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,1,255,0),r.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=e,t+1},r.prototype.writeUInt16LE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,2,65535,0),r.TYPED_ARRAY_SUPPORT?(this[t]=e,this[t+1]=e>>>8):y(this,e,t,!0),t+2},r.prototype.writeUInt16BE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,2,65535,0),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=e):y(this,e,t,!1),t+2},r.prototype.writeUInt32LE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,4,4294967295,0),r.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e):b(this,e,t,!0),t+4},r.prototype.writeUInt32BE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,4,4294967295,0),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e):b(this,e,t,!1),t+4},r.prototype.writeInt8=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,1,127,-128),r.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),0>e&&(e=255+e+1),this[t]=e,t+1},r.prototype.writeInt16LE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,2,32767,-32768),r.TYPED_ARRAY_SUPPORT?(this[t]=e,this[t+1]=e>>>8):y(this,e,t,!0),t+2},r.prototype.writeInt16BE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,2,32767,-32768),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=e):y(this,e,t,!1),t+2},r.prototype.writeInt32LE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,4,2147483647,-2147483648),r.TYPED_ARRAY_SUPPORT?(this[t]=e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):b(this,e,t,!0),t+4},r.prototype.writeInt32BE=function(e,t,n){return e=+e,t>>>=0,n||v(this,e,t,4,2147483647,-2147483648),0>e&&(e=4294967295+e+1),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e):b(this,e,t,!1),t+4},r.prototype.writeFloatLE=function(e,t,n){return x(this,e,t,!0,n)},r.prototype.writeFloatBE=function(e,t,n){return x(this,e,t,!1,n)},r.prototype.writeDoubleLE=function(e,t,n){return k(this,e,t,!0,n)},r.prototype.writeDoubleBE=function(e,t,n){return k(this,e,t,!1,n)},r.prototype.copy=function(e,t,n,i){var o=this
if(n||(n=0),i||0===i||(i=this.length),t||(t=0),i!==n&&0!==e.length&&0!==o.length){if(n>i)throw new TypeError("sourceEnd < sourceStart")
if(0>t||t>=e.length)throw new TypeError("targetStart out of bounds")
if(0>n||n>=o.length)throw new TypeError("sourceStart out of bounds")
if(0>i||i>o.length)throw new TypeError("sourceEnd out of bounds")
i>this.length&&(i=this.length),e.length-t<i-n&&(i=e.length-t+n)
var s=i-n
if(1e3>s||!r.TYPED_ARRAY_SUPPORT)for(var a=0;s>a;a++)e[a+t]=this[a+n]
else e._set(this.subarray(n,n+s),t)}},r.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),t>n)throw new TypeError("end < start")
if(n!==t&&0!==this.length){if(0>t||t>=this.length)throw new TypeError("start out of bounds")
if(0>n||n>this.length)throw new TypeError("end out of bounds")
var r
if("number"==typeof e)for(r=t;n>r;r++)this[r]=e
else{var i=T(e.toString()),o=i.length
for(r=t;n>r;r++)this[r]=i[r%o]}return this}},r.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(r.TYPED_ARRAY_SUPPORT)return new r(this).buffer
for(var e=new Uint8Array(this.length),t=0,n=e.length;n>t;t+=1)e[t]=this[t]
return e.buffer}throw new TypeError("Buffer.toArrayBuffer not supported in this browser")}
var D=r.prototype
r._augment=function(e){return e.constructor=r,e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=D.get,e.set=D.set,e.write=D.write,e.toString=D.toString,e.toLocaleString=D.toString,e.toJSON=D.toJSON,e.equals=D.equals,e.compare=D.compare,e.copy=D.copy,e.slice=D.slice,e.readUInt8=D.readUInt8,e.readUInt16LE=D.readUInt16LE,e.readUInt16BE=D.readUInt16BE,e.readUInt32LE=D.readUInt32LE,e.readUInt32BE=D.readUInt32BE,e.readInt8=D.readInt8,e.readInt16LE=D.readInt16LE,e.readInt16BE=D.readInt16BE,e.readInt32LE=D.readInt32LE,e.readInt32BE=D.readInt32BE,e.readFloatLE=D.readFloatLE,e.readFloatBE=D.readFloatBE,e.readDoubleLE=D.readDoubleLE,e.readDoubleBE=D.readDoubleBE,e.writeUInt8=D.writeUInt8,e.writeUInt16LE=D.writeUInt16LE,e.writeUInt16BE=D.writeUInt16BE,e.writeUInt32LE=D.writeUInt32LE,e.writeUInt32BE=D.writeUInt32BE,e.writeInt8=D.writeInt8,e.writeInt16LE=D.writeInt16LE,e.writeInt16BE=D.writeInt16BE,e.writeInt32LE=D.writeInt32LE,e.writeInt32BE=D.writeInt32BE,e.writeFloatLE=D.writeFloatLE,e.writeFloatBE=D.writeFloatBE,e.writeDoubleLE=D.writeDoubleLE,e.writeDoubleBE=D.writeDoubleBE,e.fill=D.fill,e.inspect=D.inspect,e.toArrayBuffer=D.toArrayBuffer,e}
var F=/[^+\/0-9A-z]/g},{"base64-js":178,ieee754:179,"is-array":180}],178:[function(e,t,n){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
!function(e){"use strict"
function t(e){var t=e.charCodeAt(0)
return t===s?62:t===a?63:u>t?-1:u+10>t?t-u+26+26:l+26>t?t-l:c+26>t?t-c+26:void 0}function n(e){function n(e){c[h++]=e}var r,i,s,a,u,c
if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4")
var l=e.length
u="="===e.charAt(l-2)?2:"="===e.charAt(l-1)?1:0,c=new o(3*e.length/4-u),s=u>0?e.length-4:e.length
var h=0
for(r=0,i=0;s>r;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a)
return 2===u?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===u&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),c}function i(e){function t(e){return r.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var i,o,s,a=e.length%3,u=""
for(i=0,s=e.length-a;s>i;i+=3)o=(e[i]<<16)+(e[i+1]<<8)+e[i+2],u+=n(o)
switch(a){case 1:o=e[e.length-1],u+=t(o>>2),u+=t(o<<4&63),u+="=="
break
case 2:o=(e[e.length-2]<<8)+e[e.length-1],u+=t(o>>10),u+=t(o>>4&63),u+=t(o<<2&63),u+="="}return u}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,s="+".charCodeAt(0),a="/".charCodeAt(0),u="0".charCodeAt(0),c="a".charCodeAt(0),l="A".charCodeAt(0)
e.toByteArray=n,e.fromByteArray=i}("undefined"==typeof n?this.base64js={}:n)},{}],179:[function(e,t,n){n.read=function(e,t,n,r,i){var o,s,a=8*i-r-1,u=(1<<a)-1,c=u>>1,l=-7,h=n?i-1:0,f=n?-1:1,p=e[t+h]
for(h+=f,o=p&(1<<-l)-1,p>>=-l,l+=a;l>0;o=256*o+e[t+h],h+=f,l-=8);for(s=o&(1<<-l)-1,o>>=-l,l+=r;l>0;s=256*s+e[t+h],h+=f,l-=8);if(0===o)o=1-c
else{if(o===u)return s?NaN:(p?-1:1)*(1/0)
s+=Math.pow(2,r),o-=c}return(p?-1:1)*s*Math.pow(2,o-r)},n.write=function(e,t,n,r,i,o){var s,a,u,c=8*o-i-1,l=(1<<c)-1,h=l>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:o-1,d=r?1:-1,m=0>t||0===t&&0>1/t?1:0
for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=l):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),t+=s+h>=1?f/u:f*Math.pow(2,1-h),t*u>=2&&(s++,u/=2),s+h>=l?(a=0,s=l):s+h>=1?(a=(t*u-1)*Math.pow(2,i),s+=h):(a=t*Math.pow(2,h-1)*Math.pow(2,i),s=0));i>=8;e[n+p]=255&a,p+=d,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;e[n+p]=255&s,p+=d,s/=256,c-=8);e[n+p-d]|=128*m}},{}],180:[function(e,t,n){var r=Array.isArray,i=Object.prototype.toString
t.exports=r||function(e){return!!e&&"[object Array]"==i.call(e)}},{}],181:[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function o(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!o(e)||0>e||isNaN(e))throw TypeError("n must be a positive number")
return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,o,u,c
if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t
throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],a(n))return!1
if(i(n))switch(arguments.length){case 1:n.call(this)
break
case 2:n.call(this,arguments[1])
break
case 3:n.call(this,arguments[1],arguments[2])
break
default:for(r=arguments.length,o=new Array(r-1),u=1;r>u;u++)o[u-1]=arguments[u]
n.apply(this,o)}else if(s(n)){for(r=arguments.length,o=new Array(r-1),u=1;r>u;u++)o[u-1]=arguments[u]
for(c=n.slice(),r=c.length,u=0;r>u;u++)c[u].apply(this,o)}return!0},r.prototype.addListener=function(e,t){var n
if(!i(t))throw TypeError("listener must be a function")
if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned){var n
n=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function")
var r=!1
return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,o,a
if(!i(t))throw TypeError("listener must be a function")
if(!this._events||!this._events[e])return this
if(n=this._events[e],o=n.length,r=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t)
else if(s(n)){for(a=o;a-->0;)if(n[a]===t||n[a].listener&&n[a].listener===t){r=a
break}if(0>r)return this
1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n
if(!this._events)return this
if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this
if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t)
return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],i(n))this.removeListener(e,n)
else for(;n.length;)this.removeListener(e,n[n.length-1])
return delete this._events[e],this},r.prototype.listeners=function(e){var t
return t=this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.listenerCount=function(e,t){var n
return n=e._events&&e._events[t]?i(e._events[t])?1:e._events[t].length:0}},{}],182:[function(e,t,n){t.exports=e(44)},{}],183:[function(e,t,n){function r(){}var i=t.exports={}
i.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener
if(e)return function(e){return window.setImmediate(e)}
if(t){var n=[]
return window.addEventListener("message",function(e){var t=e.source
if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift()
r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),i.title="browser",i.browser=!0,i.env={},i.argv=[],i.on=r,i.addListener=r,i.once=r,i.off=r,i.removeListener=r,i.removeAllListeners=r,i.emit=r,i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")}},{}],184:[function(e,t,n){(function(e){!function(r){function i(e){throw RangeError(R[e])}function o(e,t){for(var n=e.length;n--;)e[n]=t(e[n])
return e}function s(e,t){return o(e.split(I),t).join(".")}function a(e){for(var t,n,r=[],i=0,o=e.length;o>i;)t=e.charCodeAt(i++),t>=55296&&56319>=t&&o>i?(n=e.charCodeAt(i++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),i--)):r.push(t)
return r}function u(e){return o(e,function(e){var t=""
return e>65535&&(e-=65536,t+=M(e>>>10&1023|55296),e=56320|1023&e),t+=M(e)}).join("")}function c(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:k}function l(e,t){return e+22+75*(26>e)-((0!=t)<<5)}function h(e,t,n){var r=0
for(e=n?P(e/A):e>>1,e+=P(e/t);e>j*_>>1;r+=k)e=P(e/j)
return P(r+(j+1)*e/(e+S))}function f(e){var t,n,r,o,s,a,l,f,p,d,m=[],g=e.length,v=0,y=C,b=T
for(n=e.lastIndexOf(O),0>n&&(n=0),r=0;n>r;++r)e.charCodeAt(r)>=128&&i("not-basic"),m.push(e.charCodeAt(r))
for(o=n>0?n+1:0;g>o;){for(s=v,a=1,l=k;o>=g&&i("invalid-input"),f=c(e.charCodeAt(o++)),(f>=k||f>P((x-v)/a))&&i("overflow"),v+=f*a,p=b>=l?E:l>=b+_?_:l-b,!(p>f);l+=k)d=k-p,a>P(x/d)&&i("overflow"),a*=d
t=m.length+1,b=h(v-s,t,0==s),P(v/t)>x-y&&i("overflow"),y+=P(v/t),v%=t,m.splice(v++,0,y)}return u(m)}function p(e){var t,n,r,o,s,u,c,f,p,d,m,g,v,y,b,w=[]
for(e=a(e),g=e.length,t=C,n=0,s=T,u=0;g>u;++u)m=e[u],128>m&&w.push(M(m))
for(r=o=w.length,o&&w.push(O);g>r;){for(c=x,u=0;g>u;++u)m=e[u],m>=t&&c>m&&(c=m)
for(v=r+1,c-t>P((x-n)/v)&&i("overflow"),n+=(c-t)*v,t=c,u=0;g>u;++u)if(m=e[u],t>m&&++n>x&&i("overflow"),m==t){for(f=n,p=k;d=s>=p?E:p>=s+_?_:p-s,!(d>f);p+=k)b=f-d,y=k-d,w.push(M(l(d+b%y,0))),f=P(b/y)
w.push(M(l(f,0))),s=h(n,v,r==o),n=0,++r}++n,++t}return w.join("")}function d(e){return s(e,function(e){return N.test(e)?f(e.slice(4).toLowerCase()):e})}function m(e){return s(e,function(e){return L.test(e)?"xn--"+p(e):e})}var g="object"==typeof n&&n,v="object"==typeof t&&t&&t.exports==g&&t,y="object"==typeof e&&e;(y.global===y||y.window===y)&&(r=y)
var b,w,x=2147483647,k=36,E=1,_=26,S=38,A=700,T=72,C=128,O="-",N=/^xn--/,L=/[^ -~]/,I=/\x2E|\u3002|\uFF0E|\uFF61/g,R={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},j=k-E,P=Math.floor,M=String.fromCharCode
if(b={version:"1.2.4",ucs2:{decode:a,encode:u},decode:f,encode:p,toASCII:m,toUnicode:d},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return b})
else if(g&&!g.nodeType)if(v)v.exports=b
else for(w in b)b.hasOwnProperty(w)&&(g[w]=b[w])
else r.punycode=b}(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],185:[function(e,t,n){"use strict"
function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,o){t=t||"&",n=n||"="
var s={}
if("string"!=typeof e||0===e.length)return s
var a=/\+/g
e=e.split(t)
var u=1e3
o&&"number"==typeof o.maxKeys&&(u=o.maxKeys)
var c=e.length
u>0&&c>u&&(c=u)
for(var l=0;c>l;++l){var h,f,p,d,m=e[l].replace(a,"%20"),g=m.indexOf(n)
g>=0?(h=m.substr(0,g),f=m.substr(g+1)):(h=m,f=""),p=decodeURIComponent(h),d=decodeURIComponent(f),r(s,p)?i(s[p])?s[p].push(d):s[p]=[s[p],d]:s[p]=d}return s}
var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],186:[function(e,t,n){"use strict"
function r(e,t){if(e.map)return e.map(t)
for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r))
return n}var i=function(e){switch(typeof e){case"string":return e
case"boolean":return e?"true":"false"
case"number":return isFinite(e)?e:""
default:return""}}
t.exports=function(e,t,n,a){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(s(e),function(s){var a=encodeURIComponent(i(s))+n
return o(e[s])?r(e[s],function(e){return a+encodeURIComponent(i(e))}).join(t):a+encodeURIComponent(i(e[s]))}).join(t):a?encodeURIComponent(i(a))+n+encodeURIComponent(i(e)):""}
var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s=Object.keys||function(e){var t=[]
for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n)
return t}},{}],187:[function(e,t,n){"use strict"
n.decode=n.parse=e("./decode"),n.encode=n.stringify=e("./encode")},{"./decode":185,"./encode":186}],188:[function(e,t,n){t.exports=e("./lib/_stream_duplex.js")},{"./lib/_stream_duplex.js":189}],189:[function(e,t,n){t.exports=e(38)},{"./_stream_readable":191,"./_stream_writable":193,WuQzkM:183,"core-util-is":194,inherits:182}],190:[function(e,t,n){t.exports=e(39)},{"./_stream_transform":192,"core-util-is":194,inherits:182}],191:[function(e,t,n){t.exports=e(40)},{WuQzkM:183,buffer:177,"core-util-is":194,events:181,inherits:182,isarray:195,stream:201,"string_decoder/":196}],192:[function(e,t,n){t.exports=e(41)},{"./_stream_duplex":189,"core-util-is":194,inherits:182}],193:[function(e,t,n){t.exports=e(42)},{"./_stream_duplex":189,WuQzkM:183,buffer:177,"core-util-is":194,inherits:182,stream:201}],194:[function(e,t,n){t.exports=e(43)},{buffer:177}],195:[function(e,t,n){t.exports=e(9)},{}],196:[function(e,t,n){t.exports=e(46)},{buffer:177}],197:[function(e,t,n){t.exports=e("./lib/_stream_passthrough.js")},{"./lib/_stream_passthrough.js":190}],198:[function(e,t,n){t.exports=e(47)},{"./lib/_stream_duplex.js":189,"./lib/_stream_passthrough.js":190,"./lib/_stream_readable.js":191,"./lib/_stream_transform.js":192,"./lib/_stream_writable.js":193,stream:201}],199:[function(e,t,n){t.exports=e("./lib/_stream_transform.js")},{"./lib/_stream_transform.js":192}],200:[function(e,t,n){t.exports=e("./lib/_stream_writable.js")},{"./lib/_stream_writable.js":193}],201:[function(e,t,n){function r(){i.call(this)}t.exports=r
var i=e("events").EventEmitter,o=e("inherits")
o(r,i),r.Readable=e("readable-stream/readable.js"),r.Writable=e("readable-stream/writable.js"),r.Duplex=e("readable-stream/duplex.js"),r.Transform=e("readable-stream/transform.js"),r.PassThrough=e("readable-stream/passthrough.js"),r.Stream=r,r.prototype.pipe=function(e,t){function n(t){e.writable&&!1===e.write(t)&&c.pause&&c.pause()}function r(){c.readable&&c.resume&&c.resume()}function o(){l||(l=!0,e.end())}function s(){l||(l=!0,"function"==typeof e.destroy&&e.destroy())}function a(e){if(u(),0===i.listenerCount(this,"error"))throw e}function u(){c.removeListener("data",n),e.removeListener("drain",r),c.removeListener("end",o),c.removeListener("close",s),c.removeListener("error",a),e.removeListener("error",a),c.removeListener("end",u),c.removeListener("close",u),e.removeListener("close",u)}var c=this
c.on("data",n),e.on("drain",r),e._isStdio||t&&t.end===!1||(c.on("end",o),c.on("close",s))
var l=!1
return c.on("error",a),e.on("error",a),c.on("end",u),c.on("close",u),e.on("close",u),e.emit("pipe",c),e}},{events:181,inherits:182,"readable-stream/duplex.js":188,"readable-stream/passthrough.js":197,"readable-stream/readable.js":198,"readable-stream/transform.js":199,"readable-stream/writable.js":200}],202:[function(e,t,n){function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function i(e,t,n){if(e&&c(e)&&e instanceof r)return e
var i=new r
return i.parse(e,t,n),i}function o(e){return u(e)&&(e=i(e)),e instanceof r?e.format():r.prototype.format.call(e)}function s(e,t){return i(e,!1,!0).resolve(t)}function a(e,t){return e?i(e,!1,!0).resolveObject(t):t}function u(e){return"string"==typeof e}function c(e){return"object"==typeof e&&null!==e}function l(e){return null===e}function h(e){return null==e}var f=e("punycode")
n.parse=i,n.resolve=s,n.resolveObject=a,n.format=o,n.Url=r
var p=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,m=["<",">",'"',"`"," ","\r","\n","	"],g=["{","}","|","\\","^","`"].concat(m),v=["'"].concat(g),y=["%","/","?",";","#"].concat(v),b=["/","?","#"],w=255,x=/^[a-z0-9A-Z_-]{0,63}$/,k=/^([a-z0-9A-Z_-]{0,63})(.*)$/,E={javascript:!0,"javascript:":!0},_={javascript:!0,"javascript:":!0},S={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},A=e("querystring")
r.prototype.parse=function(e,t,n){if(!u(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e)
var r=e
r=r.trim()
var i=p.exec(r)
if(i){i=i[0]
var o=i.toLowerCase()
this.protocol=o,r=r.substr(i.length)}if(n||i||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var s="//"===r.substr(0,2)
!s||i&&_[i]||(r=r.substr(2),this.slashes=!0)}if(!_[i]&&(s||i&&!S[i])){for(var a=-1,c=0;c<b.length;c++){var l=r.indexOf(b[c]);-1!==l&&(-1===a||a>l)&&(a=l)}var h,d
d=-1===a?r.lastIndexOf("@"):r.lastIndexOf("@",a),-1!==d&&(h=r.slice(0,d),r=r.slice(d+1),this.auth=decodeURIComponent(h)),a=-1
for(var c=0;c<y.length;c++){var l=r.indexOf(y[c]);-1!==l&&(-1===a||a>l)&&(a=l)}-1===a&&(a=r.length),this.host=r.slice(0,a),r=r.slice(a),this.parseHost(),this.hostname=this.hostname||""
var m="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1]
if(!m)for(var g=this.hostname.split(/\./),c=0,T=g.length;T>c;c++){var C=g[c]
if(C&&!C.match(x)){for(var O="",N=0,L=C.length;L>N;N++)O+=C.charCodeAt(N)>127?"x":C[N]
if(!O.match(x)){var I=g.slice(0,c),R=g.slice(c+1),j=C.match(k)
j&&(I.push(j[1]),R.unshift(j[2])),R.length&&(r="/"+R.join(".")+r),this.hostname=I.join(".")
break}}}if(this.hostname.length>w?this.hostname="":this.hostname=this.hostname.toLowerCase(),!m){for(var P=this.hostname.split("."),M=[],c=0;c<P.length;++c){var D=P[c]
M.push(D.match(/[^A-Za-z0-9_-]/)?"xn--"+f.encode(D):D)}this.hostname=M.join(".")}var F=this.port?":"+this.port:"",B=this.hostname||""
this.host=B+F,this.href+=this.host,m&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==r[0]&&(r="/"+r))}if(!E[o])for(var c=0,T=v.length;T>c;c++){var U=v[c],q=encodeURIComponent(U)
q===U&&(q=escape(U)),r=r.split(U).join(q)}var z=r.indexOf("#");-1!==z&&(this.hash=r.substr(z),r=r.slice(0,z))
var W=r.indexOf("?")
if(-1!==W?(this.search=r.substr(W),this.query=r.substr(W+1),t&&(this.query=A.parse(this.query)),r=r.slice(0,W)):t&&(this.search="",this.query={}),r&&(this.pathname=r),S[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var F=this.pathname||"",D=this.search||""
this.path=F+D}return this.href=this.format(),this},r.prototype.format=function(){var e=this.auth||""
e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@")
var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",i=!1,o=""
this.host?i=e+this.host:this.hostname&&(i=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&c(this.query)&&Object.keys(this.query).length&&(o=A.stringify(this.query))
var s=this.search||o&&"?"+o||""
return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||S[t])&&i!==!1?(i="//"+(i||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):i||(i=""),r&&"#"!==r.charAt(0)&&(r="#"+r),s&&"?"!==s.charAt(0)&&(s="?"+s),n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),s=s.replace("#","%23"),t+i+n+s+r},r.prototype.resolve=function(e){return this.resolveObject(i(e,!1,!0)).format()},r.prototype.resolveObject=function(e){if(u(e)){var t=new r
t.parse(e,!1,!0),e=t}var n=new r
if(Object.keys(this).forEach(function(e){n[e]=this[e]},this),n.hash=e.hash,""===e.href)return n.href=n.format(),n
if(e.slashes&&!e.protocol)return Object.keys(e).forEach(function(t){"protocol"!==t&&(n[t]=e[t])}),S[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n
if(e.protocol&&e.protocol!==n.protocol){if(!S[e.protocol])return Object.keys(e).forEach(function(t){n[t]=e[t]}),n.href=n.format(),n
if(n.protocol=e.protocol,e.host||_[e.protocol])n.pathname=e.pathname
else{for(var i=(e.pathname||"").split("/");i.length&&!(e.host=i.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==i[0]&&i.unshift(""),i.length<2&&i.unshift(""),n.pathname=i.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var o=n.pathname||"",s=n.search||""
n.path=o+s}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var a=n.pathname&&"/"===n.pathname.charAt(0),c=e.host||e.pathname&&"/"===e.pathname.charAt(0),f=c||a||n.host&&e.pathname,p=f,d=n.pathname&&n.pathname.split("/")||[],i=e.pathname&&e.pathname.split("/")||[],m=n.protocol&&!S[n.protocol]
if(m&&(n.hostname="",n.port=null,n.host&&(""===d[0]?d[0]=n.host:d.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===i[0]?i[0]=e.host:i.unshift(e.host)),e.host=null),f=f&&(""===i[0]||""===d[0])),c)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,d=i
else if(i.length)d||(d=[]),d.pop(),d=d.concat(i),n.search=e.search,n.query=e.query
else if(!h(e.search)){if(m){n.hostname=n.host=d.shift()
var g=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1
g&&(n.auth=g.shift(),n.host=n.hostname=g.shift())}return n.search=e.search,n.query=e.query,l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!d.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n
for(var v=d.slice(-1)[0],y=(n.host||e.host)&&("."===v||".."===v)||""===v,b=0,w=d.length;w>=0;w--)v=d[w],"."==v?d.splice(w,1):".."===v?(d.splice(w,1),b++):b&&(d.splice(w,1),b--)
if(!f&&!p)for(;b--;b)d.unshift("..")
!f||""===d[0]||d[0]&&"/"===d[0].charAt(0)||d.unshift(""),y&&"/"!==d.join("/").substr(-1)&&d.push("")
var x=""===d[0]||d[0]&&"/"===d[0].charAt(0)
if(m){n.hostname=n.host=x?"":d.length?d.shift():""
var g=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1
g&&(n.auth=g.shift(),n.host=n.hostname=g.shift())}return f=f||n.host&&d.length,f&&!x&&d.unshift(""),d.length?n.pathname=d.join("/"):(n.pathname=null,n.path=null),l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var e=this.host,t=d.exec(e)
t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{punycode:184,querystring:187}],203:[function(e,t,n){t.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},{}],204:[function(e,t,n){(function(t,r){function i(e,t){var r={seen:[],stylize:s}
return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),m(t)?r.showHidden=t:t&&n._extend(r,t),x(r.showHidden)&&(r.showHidden=!1),x(r.depth)&&(r.depth=2),x(r.colors)&&(r.colors=!1),x(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=o),u(r,e,r.depth)}function o(e,t){var n=i.styles[t]
return n?"["+i.colors[n][0]+"m"+e+"["+i.colors[n][1]+"m":e}function s(e,t){return e}function a(e){var t={}
return e.forEach(function(e,n){t[e]=!0}),t}function u(e,t,r){if(e.customInspect&&t&&A(t.inspect)&&t.inspect!==n.inspect&&(!t.constructor||t.constructor.prototype!==t)){var i=t.inspect(r,e)
return b(i)||(i=u(e,i,r)),i}var o=c(e,t)
if(o)return o
var s=Object.keys(t),m=a(s)
if(e.showHidden&&(s=Object.getOwnPropertyNames(t)),S(t)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return l(t)
if(0===s.length){if(A(t)){var g=t.name?": "+t.name:""
return e.stylize("[Function"+g+"]","special")}if(k(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp")
if(_(t))return e.stylize(Date.prototype.toString.call(t),"date")
if(S(t))return l(t)}var v="",y=!1,w=["{","}"]
if(d(t)&&(y=!0,w=["[","]"]),A(t)){var x=t.name?": "+t.name:""
v=" [Function"+x+"]"}if(k(t)&&(v=" "+RegExp.prototype.toString.call(t)),_(t)&&(v=" "+Date.prototype.toUTCString.call(t)),S(t)&&(v=" "+l(t)),0===s.length&&(!y||0==t.length))return w[0]+v+w[1]
if(0>r)return k(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special")
e.seen.push(t)
var E
return E=y?h(e,t,r,m,s):s.map(function(n){return f(e,t,r,m,n,y)}),e.seen.pop(),p(E,v,w)}function c(e,t){if(x(t))return e.stylize("undefined","undefined")
if(b(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'"
return e.stylize(n,"string")}return y(t)?e.stylize(""+t,"number"):m(t)?e.stylize(""+t,"boolean"):g(t)?e.stylize("null","null"):void 0}function l(e){return"["+Error.prototype.toString.call(e)+"]"}function h(e,t,n,r,i){for(var o=[],s=0,a=t.length;a>s;++s)o.push(L(t,String(s))?f(e,t,n,r,String(s),!0):"")
return i.forEach(function(i){i.match(/^\d+$/)||o.push(f(e,t,n,r,i,!0))}),o}function f(e,t,n,r,i,o){var s,a,c
if(c=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]},c.get?a=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(a=e.stylize("[Setter]","special")),L(r,i)||(s="["+i+"]"),a||(e.seen.indexOf(c.value)<0?(a=g(n)?u(e,c.value,null):u(e,c.value,n-1),a.indexOf("\n")>-1&&(a=o?a.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+a.split("\n").map(function(e){return"   "+e}).join("\n"))):a=e.stylize("[Circular]","special")),x(s)){if(o&&i.match(/^\d+$/))return a
s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+a}function p(e,t,n){var r=0,i=e.reduce(function(e,t){return r++,t.indexOf("\n")>=0&&r++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)
return i>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function d(e){return Array.isArray(e)}function m(e){return"boolean"==typeof e}function g(e){return null===e}function v(e){return null==e}function y(e){return"number"==typeof e}function b(e){return"string"==typeof e}function w(e){return"symbol"==typeof e}function x(e){return void 0===e}function k(e){return E(e)&&"[object RegExp]"===C(e)}function E(e){return"object"==typeof e&&null!==e}function _(e){return E(e)&&"[object Date]"===C(e)}function S(e){return E(e)&&("[object Error]"===C(e)||e instanceof Error)}function A(e){return"function"==typeof e}function T(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function C(e){return Object.prototype.toString.call(e)}function O(e){return 10>e?"0"+e.toString(10):e.toString(10)}function N(){var e=new Date,t=[O(e.getHours()),O(e.getMinutes()),O(e.getSeconds())].join(":")
return[e.getDate(),P[e.getMonth()],t].join(" ")}function L(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var I=/%[sdj%]/g
n.format=function(e){if(!b(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(i(arguments[n]))
return t.join(" ")}for(var n=1,r=arguments,o=r.length,s=String(e).replace(I,function(e){if("%%"===e)return"%"
if(n>=o)return e
switch(e){case"%s":return String(r[n++])
case"%d":return Number(r[n++])
case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return e}}),a=r[n];o>n;a=r[++n])s+=g(a)||!E(a)?" "+a:" "+i(a)
return s},n.deprecate=function(e,i){function o(){if(!s){if(t.throwDeprecation)throw new Error(i)
t.traceDeprecation?console.trace(i):console.error(i),s=!0}return e.apply(this,arguments)}if(x(r.process))return function(){return n.deprecate(e,i).apply(this,arguments)}
if(t.noDeprecation===!0)return e
var s=!1
return o}
var R,j={}
n.debuglog=function(e){if(x(R)&&(R=t.env.NODE_DEBUG||""),e=e.toUpperCase(),!j[e])if(new RegExp("\\b"+e+"\\b","i").test(R)){var r=t.pid
j[e]=function(){var t=n.format.apply(n,arguments)
console.error("%s %d: %s",e,r,t)}}else j[e]=function(){}
return j[e]},n.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},n.isArray=d,n.isBoolean=m,n.isNull=g,n.isNullOrUndefined=v,n.isNumber=y,n.isString=b,n.isSymbol=w,n.isUndefined=x,n.isRegExp=k,n.isObject=E,n.isDate=_,n.isError=S,n.isFunction=A,n.isPrimitive=T,n.isBuffer=e("./support/isBuffer")
var P=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
n.log=function(){console.log("%s - %s",N(),n.format.apply(n,arguments))},n.inherits=e("inherits"),n._extend=function(e,t){if(!t||!E(t))return e
for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]]
return e}}).call(this,e("WuQzkM"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":203,WuQzkM:183,inherits:182}]},{},[2])
