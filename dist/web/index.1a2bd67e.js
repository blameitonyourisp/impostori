!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire5df6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequire5df6=o);var a=o.register;a("5LG4Q",function(t,n){e(t.exports,"PixelButton",function(){return o("dCg6x").PixelButton}),e(t.exports,"StatefulLoadingContainer",function(){return o("cQA11").StatefulLoadingContainer}),o("dCg6x"),o("cQA11")}),a("dCg6x",function(t,n){e(t.exports,"PixelButton",function(){return r});class r extends HTMLButtonElement{#e;constructor(e){super(),this.#e=e}connectedCallback(){let e=document.createElement("p");e.innerText=this.#e;let t=document.createElement("div");t.appendChild(e),this.appendChild(t),this.classList.add("pixel-button")}}}),a("cQA11",function(t,n){e(t.exports,"StatefulLoadingContainer",function(){return a});var r=o("9c5Tu");class a extends HTMLElement{#t="false"!==this.dataset.loading;#n=new r.Boutique({});#r=this.#n.createRedaction((e,t)=>{Object.assign(e,t)});#o={keyframes:[{opacity:1},{opacity:0}],options:{easing:"ease-out",duration:300},reverse:{direction:"reverse"}};constructor(){super()}connectedCallback(){this.dataset.loading?.match(/^true$|^false$/)||(this.dataset.loading=(!0).toString());let e=document.createElement("div");e.classList.add("loading","loading-container");let t=document.createElement("p");t.innerText=this.dataset.text||"Loading...";let n=document.createElement("div");n.classList.add("pixel-container","loading-bar");let r=document.createElement("div");r.classList.add("pixel-container","loading-bounce"),n.appendChild(r),e.append(t,n);let o=document.createElement("div");o.classList.add("content"),this.classList.add("stateful-loading-container"),this.append(e,o)}load(e){return new Promise(t=>{let{keyframes:n,options:r,reverse:o}=this.#o,a=()=>{this.contentContainer.replaceWith(e),this.contentContainer.animate(n,{...r,...o}).addEventListener("finish",()=>{t({})})};this.loading?this.loadingContainer.animate(n,r).addEventListener("finish",()=>{this.loading=!1,a()}):this.contentContainer.animate(n,r).addEventListener("finish",a)})}unload(){return new Promise(e=>{this.loading&&e({});let{keyframes:t,options:n,reverse:r}=this.#o;this.contentContainer.animate(t,n).addEventListener("finish",()=>{this.loading=!0,this.loadingContainer.animate(t,{...n,...r}).addEventListener("finish",()=>{e({})})})})}redact(e){this.#r(e)}get loading(){return this.#t}set loading(e){this.dataset.loading=e.toString(),this.#t=e}get loadingContainer(){return this.getElementsByClassName("loading")[0]}get contentContainer(){return this.getElementsByClassName("content")[0]}get createRedaction(){return this.#n.createRedaction.bind(this.#n)}get createListener(){return this.#n.createListener.bind(this.#n)}get addListener(){return this.#n.addListener.bind(this.#n)}get removeListener(){return this.#n.removeListener.bind(this.#n)}get state(){return this.#n.state}static contentContainer(){let e=document.createElement("div");return e.classList.add("content"),e}}}),a("9c5Tu",function(t,n){e(t.exports,"Boutique",function(){return r});class r{constructor(e){this.evs={},this.state=e}createRedaction(e){return t=>{let{state:n,tracer:r}=this.proxy;this.redact(r,e(n,t))}}createListener(e){let{state:t,tracer:n}=this.proxy;return e(t),{func:n=>e(t,n)(),deps:n.map(e=>e.key)}}addListener(e){e.deps.forEach(t=>{this.evs[t]=[...this.evs[t]||[],e]})}removeListener(e){e.deps.forEach(t=>{this.evs[t]=this.evs[t].filter(t=>t!==e)})}redact(e,t,n=[]){e.forEach(e=>{if(e.value){let t=this.state;e.key.split(".").slice(1).reduce((r,o,a,i)=>(a!==i.length-1?t=t[o]||{}:t[o]=e.value,r=`${r}.${o}`,n.push(...this.evs[r]||[]),r),"")}}),[...new Set(n)].forEach(e=>e.func(t))}handler(e,t=""){return{get:(n,r)=>{let o=`${t}.${r}`;t&&o.includes(e[0].key)?e.splice(0,1,{key:o}):e.unshift({key:o});let a=n[r];return"object"!=typeof a?a:new Proxy(a,this.handler(e,o))},set:(n,r,o)=>!!e.push({key:`${t}.${r}`,value:o})}}get proxy(){let e=[];return{state:new Proxy(this.state,this.handler(e)),tracer:e}}}}),a("8iDW5",function(t,n){e(t.exports,"runSelector",function(){return i}),o("5LG4Q");var r=o("cQA11"),a=o("dCg6x");let i=e=>{let{dailyPuzzles:t}=e.state,n=(0,r.StatefulLoadingContainer).contentContainer();for(let r in t){let o=new a.PixelButton(r.toUpperCase());o.addEventListener("click",()=>{history.replaceState({page:"home"},""),history.pushState({},""),e.redact({serializedPuzzle:t[r][0]})}),n.appendChild(o)}e.load(n)}}),function(){var e=function(e,t){var n=function(e){for(var t=0,n=e.length;t<n;t++)r(e[t])},r=function(e){var t=e.target,n=e.attributeName,r=e.oldValue;t.attributeChangedCallback(n,r,t.getAttribute(n))};return function(o,a){var i=o.constructor.observedAttributes;return i&&e(a).then(function(){new t(n).observe(o,{attributes:!0,attributeOldValue:!0,attributeFilter:i});for(var e=0,a=i.length;e<a;e++)o.hasAttribute(i[e])&&r({target:o,attributeName:i[e],oldValue:null})}),o}};function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function n(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,void 0);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,void 0)}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return s=e.done,e},e:function(e){l=!0,i=e},f:function(){try{s||null==r.return||r.return()}finally{if(l)throw i}}}}var r="querySelectorAll",o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:MutationObserver,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:["*"],i=function t(o,a,i,s,l,c){var u,d=n(o);try{for(d.s();!(u=d.n()).done;){var f=u.value;(c||r in f)&&(l?i.has(f)||(i.add(f),s.delete(f),e(f,l)):s.has(f)||(s.add(f),i.delete(f),e(f,l)),c||t(f[r](a),a,i,s,l,!0))}}catch(e){d.e(e)}finally{d.f()}},s=new o(function(e){if(a.length){var t,r=a.join(","),o=new Set,s=new Set,l=n(e);try{for(l.s();!(t=l.n()).done;){var c=t.value,u=c.addedNodes,d=c.removedNodes;i(d,r,o,s,!1,!1),i(u,r,o,s,!0,!1)}}catch(e){l.e(e)}finally{l.f()}}}),l=s.observe;return(s.observe=function(e){return l.call(s,e,{subtree:!0,childList:!0})})(t),s},a="querySelectorAll",i=self,s=i.document,l=i.Element,c=i.MutationObserver,u=i.Set,d=i.WeakMap,f=function(e){return a in e},h=[].filter,p=function(e){var t=new d,n=function(n,r){var o;if(r)for(var a,s=n.matches||n.webkitMatchesSelector||n.msMatchesSelector,l=0,c=i.length;l<c;l++)s.call(n,a=i[l])&&(t.has(n)||t.set(n,new u),(o=t.get(n)).has(a)||(o.add(a),e.handle(n,r,a)));else t.has(n)&&(o=t.get(n),t.delete(n),o.forEach(function(t){e.handle(n,r,t)}))},r=function(e){for(var t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=0,o=e.length;r<o;r++)n(e[r],t)},i=e.query,p=e.root||s,v=o(n,p,c,i),g=l.prototype.attachShadow;return g&&(l.prototype.attachShadow=function(e){var t=g.call(this,e);return v.observe(t),t}),i.length&&r(p[a](i)),{drop:function(e){for(var n=0,r=e.length;n<r;n++)t.delete(e[n])},flush:function(){for(var e=v.takeRecords(),t=0,n=e.length;t<n;t++)r(h.call(e[t].removedNodes,f),!1),r(h.call(e[t].addedNodes,f),!0)},observer:v,parse:r}},v=self,g=v.document,m=v.Map,y=v.MutationObserver,b=v.Object,w=v.Set,E=v.WeakMap,L=v.Element,x=v.HTMLElement,C=v.Node,S=v.Error,A=v.TypeError,P=v.Reflect,O=b.defineProperty,k=b.keys,T=b.getOwnPropertyNames,M=b.setPrototypeOf,N=!self.customElements,q=function(e){for(var t=k(e),n=[],r=new w,o=t.length,a=0;a<o;a++){n[a]=e[t[a]];try{delete e[t[a]]}catch(e){r.add(a)}}return function(){for(var a=0;a<o;a++)r.has(a)||(e[t[a]]=n[a])}};if(N){var $=function(){var e=this.constructor;if(!D.has(e))throw new A("Illegal constructor");var t=D.get(e);return _?z(_,t):z(M(B.call(g,t),e.prototype),t)},B=g.createElement,D=new m,R=new m,I=new m,j=new m,H=[],Q=p({query:H,handle:function(e,t,n){var r=I.get(n);if(t&&!r.isPrototypeOf(e)){var o=q(e);_=M(e,r);try{new r.constructor}finally{_=null,o()}}var a="".concat(t?"":"dis","connectedCallback");a in r&&e[a]()}}).parse,_=null,U=function(e){if(!R.has(e)){var t,n=new Promise(function(e){t=e});R.set(e,{$:n,_:t})}return R.get(e).$},z=e(U,y);self.customElements={define:function(e,t){if(j.has(e))throw new S('the name "'.concat(e,'" has already been used with this registry'));D.set(t,e),I.set(e,t.prototype),j.set(e,t),H.push(e),U(e).then(function(){Q(g.querySelectorAll(e))}),R.get(e)._(t)},get:function(e){return j.get(e)},whenDefined:U},O($.prototype=x.prototype,"constructor",{value:$}),self.HTMLElement=$,g.createElement=function(e,t){var n=t&&t.is,r=n?j.get(n):j.get(e);return r?new r:B.call(g,e)},"isConnected"in C.prototype||O(C.prototype,"isConnected",{configurable:!0,get:function(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}else if(N=!self.customElements.get("extends-br"))try{var W=function e(){return self.Reflect.construct(HTMLBRElement,[],e)};W.prototype=HTMLLIElement.prototype;var G="extends-br";self.customElements.define("extends-br",W,{extends:"br"}),N=0>g.createElement("br",{is:G}).outerHTML.indexOf(G);var V=self.customElements,F=V.get,J=V.whenDefined;self.customElements.whenDefined=function(e){var t=this;return J.call(this,e).then(function(n){return n||F.call(t,e)})}}catch(e){}if(N){var K=function(e){ef(er.get(e).querySelectorAll(this),e.isConnected)},X=self.customElements,Y=g.createElement,Z=X.define,ee=X.get,et=X.upgrade,en=(P||{construct:function(e){return e.call(this)}}).construct,er=new E,eo=new w,ea=new m,ei=new m,es=new m,el=new m,ec=[],eu=[],ed=function(e){return el.get(e)||ee.call(X,e)},ef=p({query:eu,handle:function(e,t,n){var r=es.get(n);if(t&&!r.isPrototypeOf(e)){var o=q(e);em=M(e,r);try{new r.constructor}finally{em=null,o()}}var a="".concat(t?"":"dis","connectedCallback");a in r&&e[a]()}}).parse,eh=p({query:ec,handle:function(e,t){er.has(e)&&(t?eo.add(e):eo.delete(e),eu.length&&K.call(eu,e))}}).parse,ep=L.prototype.attachShadow;ep&&(L.prototype.attachShadow=function(e){var t=ep.call(this,e);return er.set(this,t),t});var ev=function(e){if(!ei.has(e)){var t,n=new Promise(function(e){t=e});ei.set(e,{$:n,_:t})}return ei.get(e).$},eg=e(ev,y),em=null;T(self).filter(function(e){return/^HTML.*Element$/.test(e)}).forEach(function(e){var t=self[e];function n(){var e=this.constructor;if(!ea.has(e))throw new A("Illegal constructor");var n=ea.get(e),r=n.is,o=n.tag;if(!r)return en.call(this,t,[],e);if(em)return eg(em,r);var a=Y.call(g,o);return a.setAttribute("is",r),eg(M(a,e.prototype),r)}O(n.prototype=t.prototype,"constructor",{value:n}),O(self,e,{value:n})}),g.createElement=function(e,t){var n=t&&t.is;if(n){var r=el.get(n);if(r&&ea.get(r).tag===e)return new r}var o=Y.call(g,e);return n&&o.setAttribute("is",n),o},X.get=ed,X.whenDefined=ev,X.upgrade=function(e){var t=e.getAttribute("is");if(t){var n=el.get(t);if(n){eg(M(e,n.prototype),t);return}}et.call(X,e)},X.define=function(e,t,n){if(ed(e))throw new S("'".concat(e,"' has already been defined as a custom element"));var r,o=n&&n.extends;ea.set(t,o?{is:e,tag:o}:{is:"",tag:e}),o?(r="".concat(o,'[is="').concat(e,'"]'),es.set(r,t.prototype),el.set(e,t),eu.push(r)):(Z.apply(X,arguments),ec.push(r=e)),ev(e).then(function(){o?(ef(g.querySelectorAll(r)),eo.forEach(K,[r])):eh(g.querySelectorAll(r))}),ei.get(e)._(t)}}}(),o("5LG4Q");var i=o("dCg6x"),s=o("cQA11"),l=o("8iDW5");customElements.define("pixel-button",i.PixelButton,{extends:"button"}),customElements.define("stateful-loading-container",s.StatefulLoadingContainer),(()=>{let e=!1,t=()=>{e?document.body.classList.remove("hoverable"):document.body.classList.add("hoverable")};document.addEventListener("touchstart",()=>{e=!0,t()}),document.addEventListener("mousemove",()=>{t(),e=!1}),t()})();let c=document.createElement("nav");c.classList.add("pixel-container");let u=new i.PixelButton("Sign In"),d=new i.PixelButton("Sign Up");c.append(u,d);let f=new s.StatefulLoadingContainer;f.id="root",f.classList.add("pixel-container"),document.body.append(c,f),window.addEventListener("popstate",e=>{if(e&&e.state){let{page:t}=e.state;(0,l.runSelector)(f)}})}();
//# sourceMappingURL=index.1a2bd67e.js.map