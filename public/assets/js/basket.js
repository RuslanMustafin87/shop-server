!function(e){function t(t){for(var r,i,c=t[0],u=t[1],s=t[2],f=0,l=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&l.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(d&&d(t);l.length;)l.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={2:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var d=u;a.push([71,0]),n()}({65:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);n(11),n(65);var r=n(1),o=n(8),a=n.n(o),i=n(9),c=n.n(i),u=(new r.a,document.forms.formOrder),s=function e(t,n,r){a()(this,e),this.id=t,this.name=n,this.price=r};u.addEventListener("submit",(function(e){e.preventDefault();var t=Array.from(document.querySelectorAll(".product")),n=[],r=0;t.forEach((function(e){r+=parseInt(e.dataset.price)})),t.forEach((function(e,t){n[t]=new s(e.dataset.id,e.dataset.name,e.dataset.price)})),fetch("http://127.0.0.1:3007/api/clients",{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({name:u.name.value,phone:u.phone.value,sum:r,productList:n})}).then((function(e){return e.json()}),(function(e){c.a.start("Сервер не доступен")})).then((function(e){c.a.start(e.status)}))}));var d=new r.a,f=document.querySelector(".button-reset-basket"),l=document.querySelector(".products"),p=document.querySelector(".basket__sum");function m(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function h(e){var t,n,r=document.createElement("li"),o=document.createElement("button");r.classList.add("product","products__item"),o.classList.add("product__button-delete"),o.innerHTML="Удалить",r.append(o),e.forEach((function(e){var t=r.cloneNode(!0);t.dataset.id=e.id,t.dataset.name=e.name,t.dataset.price=e.price,t.prepend("".concat(e.name,": ").concat(e.price)),t.style.backgroundColor=e.background,l.append(t)})),p.innerHTML=(t=e,n=0,(t=Array.from(t)).forEach((function(e){n+=parseInt(e.price)})),n)}l.addEventListener("click",(function(e){var t=e.target.closest(".product__button-delete");if(t){var n=t.closest("li");d.deleteProductFromBasket(n.dataset.id),p.innerHTML=parseInt(p.innerHTML)-n.dataset.price,n.remove(),l.firstChild||(l.innerHTML="Корзина пуста")}})),f.addEventListener("click",(function(){m(l),d.resetBasket(),l.innerHTML="Корзина пуста",p.innerHTML=0})),document.addEventListener("DOMContentLoaded",(function(){var e=d.getProductsFromBasket();e?h(e):l.innerHTML="Корзина пуста"})),window.addEventListener("storage",(function(){m(l);var e=d.getProductsFromBasket();e?h(e):l.innerHTML="Корзина пуста"}))}});