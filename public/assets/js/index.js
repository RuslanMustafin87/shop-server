(()=>{"use strict";var e,t={402:(e,t,n)=>{var r=n(861),o=n(757),a=n.n(o),c=(n(39),JSON.parse('{"p":3007,"P":"http://localhost"}')),s=n(671),i=n(144),u=function(){function e(){(0,s.Z)(this,e)}return(0,i.Z)(e,[{key:"sortByIncrease",value:function(e){e.sort((function(e,t){return e.dataset.price.replace(/\D/g,"")-t.dataset.price.replace(/\D/g,"")}))}},{key:"sortByDecrease",value:function(e){e.sort((function(e,t){return t.dataset.price.replace(/\D/g,"")-e.dataset.price.replace(/\D/g,"")}))}},{key:"sortByAlphabet",value:function(e){e.sort((function(e,t){return e.dataset.name<t.dataset.name?-1:1}))}}]),e}(),l=n(690),d=new l.Z;document.addEventListener("mousedown",(function(){var e=event.target.closest(".products__item");if(e&&1===event.which){var t=function(e){e.hidden=!0;var t=document.elementFromPoint(event.clientX,event.clientY);if(e.hidden=!1,t){if(t=t.closest(".basket"))return t.style.transform="scale(1.5) translateY(-50%)",void(i=!0);r.style.transform="scale(1) translateY(-50%)",i=!1}},n=function(n){var r,i;a||(!function(e,t){document.body.append(e),e.style.width=t.offsetWidth+"px",e.style.height=t.offsetHeight+"px",e.style.zIndex=1e3,e.style.position="fixed",e.style.opacity=".4",e.style.margin="0"}(o,e),o.style.left=e.getBoundingClientRect().left+"px",o.style.top=e.getBoundingClientRect().top+"px",c=n.clientX-o.getBoundingClientRect().left,s=n.clientY-o.getBoundingClientRect().top,a=!0),r=n.clientX,i=n.clientY,o.style.left=r-c+"px",o.style.top=i-s+"px",t(o)},r=document.querySelector(".basket"),o=e.cloneNode(!0);o.ondragstart=function(){return!1};var a=!1,c=0,s=0,i=!1;document.addEventListener("mousemove",n),document.onmouseup=function(){i&&(d.addProductInBasket(o.dataset.id),r.style.transform="scale(1) translateY(-50%)",i=!1),document.removeEventListener("mousemove",n),document.onmouseup=null,o.remove(),a=!1}}}));var p,f=new u,v=new l.Z,m=document.querySelector(".products"),y=null,h=null;function g(e){e.forEach((function(e,t){m.append(e)}))}function b(e){for(var t=document.querySelectorAll(".product-card__image"),n=0;n<t.length;n++){var r=new Blob([new Uint8Array(e[n].images[0].data)],{type:"image/jpeg"});t[n].src=URL.createObjectURL(r)}}(p=(0,r.Z)(a().mark((function e(){var t,n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.prev=1,e.next=4,fetch("".concat(c.P,":").concat(c.p,"/api/products"));case 4:return n=e.sent,e.next=7,n.json();case 7:t=e.sent,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.error(e.t0);case 13:t&&(b(t),y=h=Array.from(document.querySelectorAll(".product-card")));case 15:case"end":return e.stop()}}),e,null,[[1,10]])}))),function(){return p.apply(this,arguments)})(),m.addEventListener("mousedown",(function(e){e.preventDefault();var t=e.target.closest(".product-card__button");if(t&&m.contains(t)){var n=t.closest(".products-card__item");v.addProductInBasket(n.dataset.id)}}));var x=document.querySelector(".sort-products"),k=new Event("change");function w(e){for(;e.firstChild;)e.removeChild(e.firstChild)}x.addEventListener("change",(function(e){switch(w(m),e.target.value){case"sortIncreasedPrice":f.sortByIncrease(h),g(h);break;case"sortDecreasedPrice":f.sortByDecrease(h),g(h);break;case"sortAlphabet":f.sortByAlphabet(h),g(h)}})),document.querySelector(".sort-products-by-category").onchange=function(e){if("all"===e.target.value)return w(m),h=y,void x.dispatchEvent(k);var t,n;t=y,n=e.target.value,w(m),h=t.filter((function(e){return e.dataset.category===n})),x.dispatchEvent(k)}},39:(e,t,n)=>{e.exports=n.p+"images/logo-light.png"}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,n,o,a)=>{if(!n){var c=1/0;for(l=0;l<e.length;l++){n=e[l][0],o=e[l][1],a=e[l][2];for(var s=!0,i=0;i<n.length;i++)(!1&a||c>=a)&&Object.keys(r.O).every((e=>r.O[e](n[i])))?n.splice(i--,1):(s=!1,a<c&&(c=a));if(s){e.splice(l--,1);var u=o();void 0!==u&&(t=u)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[n,o,a]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.j=826,r.p="/assets/",(()=>{var e={826:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,c=n[0],s=n[1],i=n[2],u=0;if(c.some((t=>0!==e[t]))){for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(i)var l=i(r)}for(t&&t(n);u<c.length;u++)a=c[u],r.o(e,a)&&e[a]&&e[a][0](),e[c[u]]=0;return r.O(l)},n=self.webpackChunktest=self.webpackChunktest||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[592],(()=>r(402)));o=r.O(o)})();