(()=>{"use strict";var e,t={85:(e,t,n)=>{var r=n(861),a=n(757),c=n.n(a),i=JSON.parse('{"p":3007,"P":"http://localhost"}'),o=new(n(690).Z),s=new Intl.NumberFormat("ru",{style:"currency",currency:"RUB",useGrouping:!0,maximumFractionDigits:0}),d=document.getElementById("button-reset"),u=document.getElementById("products"),p=document.getElementById("total-sum");function l(e){var t=document.createElement("li"),n=document.createElement("a"),r=document.createElement("img"),a=document.createElement("ul"),c=document.createElement("li"),i=document.createElement("h1"),o=document.createElement("span"),s=document.createElement("button");t.classList.add("product","products__item"),n.classList.add("product__link"),r.classList.add("product__image"),a.classList.add("product__rating","rating"),c.classList.add("rating__star"),i.classList.add("product__name"),o.classList.add("product__price"),s.classList.add("product__button-delete"),s.innerHTML="Удалить";var d=new Blob([new Uint8Array(e.image.data)],{type:"image/jpeg"});r.src=URL.createObjectURL(d),n.href="/product?id=".concat(e._id);for(var u=0;u<5;u++)a.append(c.cloneNode(!0));return e.rating.roundedRating&&Array.from(a.children)[5-e.rating.roundedRating].setAttribute("data-rating","true"),i.innerHTML=e.name,o.innerHTML=e.price,t.dataset.id=e._id,t.dataset.name=e.name,t.dataset.price=e.price,n.append(r),t.append(n),t.append(a),t.append(i),t.append(o),t.append(s),t}function m(){return(m=(0,r.Z)(c().mark((function e(t){var n,r,a,o,d;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.parse(t),r=n[n.length-1],e.prev=2,e.next=5,fetch("".concat(i.P,":").concat(i.p,"/basket/getimages"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify([r])});case 5:return o=e.sent,e.next=8,o.json();case 8:a=e.sent,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),console.error(e.t0);case 14:d=l(a[0]),u.firstElementChild||(u.innerHTML=""),u.append(d),p.innerHTML=s.format(+p.innerHTML.replace(/\D/g,"")+ +a[0].price.replace(/\D/g,""));case 18:case"end":return e.stop()}}),e,null,[[2,11]])})))).apply(this,arguments)}u.addEventListener("click",(function(e){var t=e.target.closest(".product__button-delete");if(t){var n=t.closest("li");return o.deleteProductFromBasket(n.dataset.id),p.innerHTML=s.format(p.innerHTML.replace(/\D/g,"")-n.dataset.price.replace(/\D/g,"")),n.remove(),u.firstChild?void 0:(u.innerHTML="Корзина пуста",void(p.innerHTML="0 &#8381"))}})),d.addEventListener("click",(function(){!function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(u),o.resetBasket(),u.innerHTML="Корзина пуста",p.innerHTML="0 &#8381"})),document.addEventListener("DOMContentLoaded",(0,r.Z)(c().mark((function e(){var t,n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=o.getProductsFromBasket()){e.next=5;break}return u.innerHTML="Корзина пуста",p.innerHTML="0 &#8381",e.abrupt("return");case 5:return[],e.prev=6,e.next=9,fetch("".concat(i.P,":").concat(i.p,"/basket/getimages"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 9:return n=e.sent,e.next=12,n.json();case 12:e.sent,e.next=18;break;case 15:e.prev=15,e.t0=e.catch(6),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[6,15]])})))),window.addEventListener("storage",(function(e){e.newValue&&function(e){m.apply(this,arguments)}(e.newValue)}))}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var c=n[e]={exports:{}};return t[e](c,c.exports,r),c.exports}r.m=t,e=[],r.O=(t,n,a,c)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],c=e[u][2];for(var o=!0,s=0;s<n.length;s++)(!1&c||i>=c)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(o=!1,c<i&&(i=c));if(o){e.splice(u--,1);var d=a();void 0!==d&&(t=d)}}return t}c=c||0;for(var u=e.length;u>0&&e[u-1][2]>c;u--)e[u]=e[u-1];e[u]=[n,a,c]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.j=130,(()=>{var e={130:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,c,i=n[0],o=n[1],s=n[2],d=0;if(i.some((t=>0!==e[t]))){for(a in o)r.o(o,a)&&(r.m[a]=o[a]);if(s)var u=s(r)}for(t&&t(n);d<i.length;d++)c=i[d],r.o(e,c)&&e[c]&&e[c][0](),e[i[d]]=0;return r.O(u)},n=self.webpackChunktest=self.webpackChunktest||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=r.O(void 0,[592],(()=>r(85)));a=r.O(a)})();