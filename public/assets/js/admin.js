!function(){"use strict";var e,t={711:function(e,t,n){var r=n(861),a=n(757),c=n.n(a),o=n(803),u=JSON.parse('{"p":3007,"P":"http://localhost"}'),s=new o.Z,i=new Intl.NumberFormat("ru",{style:"currency",currency:"RUB",useGrouping:!0,maximumFractionDigits:0});function f(e){var t=e.get("price"),n=e.get("name");return t=parseInt(t),n=(n=n.trim())[0].toUpperCase()+n.slice(1).toLowerCase(),isNaN(t)?s.start("Введите цену в формате числа"):(t=i.format(t),e.set("price",t),e.set("name",n),e)}function p(e,t){for(var n=0;n<e.files.length;n++)t.append("image_".concat(n),e.files[n],e.files[n].name)}var d=document.forms.addProduct,l=document.querySelector("#addImageProduct"),m=document.querySelector("#addImageProductSpan");d.onsubmit=function(){var e=(0,r.Z)(c().mark((function e(t){var n,r,a;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),(n=f(n=new FormData(this))).delete("image"),p(l,n),e.prev=5,e.next=8,fetch("".concat(u.P,":").concat(u.p,"/admin/addproduct"),{method:"POST",body:n});case 8:r=e.sent,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(5),s.start("Ошибка");case 14:return e.next=16,r.json();case 16:a=e.sent,s.start(a.message),d.reset();case 19:case"end":return e.stop()}}),e,this,[[5,11]])})));return function(t){return e.apply(this,arguments)}}(),l.onchange=function(e){0===this.files.length?m.innerHTML="Файл не выбран":m.innerHTML=this.files[0].name},d.onreset=function(){m.innerHTML="Файл не выбран"};var h=document.forms.deleteProduct;h.onsubmit=function(){var e=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,fetch("".concat(u.P,":").concat(u.p,"/api/products/deleteproduct?id=").concat(this.id.value),{method:"DELETE"});case 4:n=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),s.start("Ошибка");case 10:return e.next=12,n.json();case 12:r=e.sent,s.start(r.message),h.reset();case 15:case"end":return e.stop()}}),e,this,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();var v=document.forms.updateProduct;v.onsubmit=function(){var e=(0,r.Z)(c().mark((function e(t){var n,r,a;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=new FormData(this),""!==this.name.value||""!==this.price.value||0!==this.image.files.length){e.next=5;break}return s.start("Введите значение, которое надо изменить"),e.abrupt("return");case 5:return n=f(n),e.prev=6,e.next=9,fetch("".concat(u.P,":").concat(u.p,"/admin/updateproduct"),{method:"POST",body:n});case 9:r=e.sent,e.next=15;break;case 12:e.prev=12,e.t0=e.catch(6),s.start("Ошибка");case 15:return e.next=17,r.json();case 17:a=e.sent,s.start(a.message),v.reset();case 20:case"end":return e.stop()}}),e,this,[[6,12]])})));return function(t){return e.apply(this,arguments)}}();var g=document.querySelector("#updateImageProduct"),b=document.querySelector("#updateImageProductSpan");g.onchange=function(e){0===this.files.length?b.innerHTML="Файл не выбран":b.innerHTML=this.files[0].name},v.onreset=function(){b.innerHTML="Файл не выбран"}}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var c=n[e]={exports:{}};return t[e](c,c.exports,r),c.exports}r.m=t,e=[],r.O=function(t,n,a,c){if(!n){var o=1/0;for(f=0;f<e.length;f++){n=e[f][0],a=e[f][1],c=e[f][2];for(var u=!0,s=0;s<n.length;s++)(!1&c||o>=c)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(u=!1,c<o&&(o=c));if(u){e.splice(f--,1);var i=a();void 0!==i&&(t=i)}}return t}c=c||0;for(var f=e.length;f>0&&e[f-1][2]>c;f--)e[f]=e[f-1];e[f]=[n,a,c]},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.j=328,function(){var e={328:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,c,o=n[0],u=n[1],s=n[2],i=0;if(o.some((function(t){return 0!==e[t]}))){for(a in u)r.o(u,a)&&(r.m[a]=u[a]);if(s)var f=s(r)}for(t&&t(n);i<o.length;i++)c=o[i],r.o(e,c)&&e[c]&&e[c][0](),e[o[i]]=0;return r.O(f)},n=self.webpackChunktest=self.webpackChunktest||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var a=r.O(void 0,[592],(function(){return r(711)}));a=r.O(a)}();