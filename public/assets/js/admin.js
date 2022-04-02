(()=>{"use strict";var e,t={711:(e,t,r)=>{var n=r(861),a=r(757),s=r.n(a),c=r(166),o=JSON.parse('{"p":3007,"J":"http://localhost"}'),u=new c.Z;function i(e){if(e.has("name")){var t=e.get("name");t=(t=t.trim())[0].toUpperCase()+t.slice(1).toLowerCase(),e.set("name",t)}if(e.has("price")){var r=e.get("price");if(!function(e){if(e=parseInt(e.replace(/\s+/g,"")),isNaN(e))return u.start("Введите цену в формате числа"),!1;return!0}(r))return;r=parseInt(r.replace(/\s+/g,"")),e.set("price",r)}return e}function p(e,t){for(var r=0;r<e.files.length;r++)t.append("image_".concat(r),e.files[r],e.files[r].name)}var f=document.forms.addProduct,d=document.querySelector("#addImageProduct"),l=document.querySelector("#addImageProductSpan");f.onsubmit=function(){var e=(0,n.Z)(s().mark((function e(t){var r,n,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),void 0!==(r=i(r=new FormData(this)))){e.next=5;break}return e.abrupt("return");case 5:return r.delete("image"),p(d,r),e.prev=7,e.next=10,fetch("".concat(o.J,":").concat(o.p,"/admin/addproduct"),{method:"POST",body:r});case 10:n=e.sent,e.next=16;break;case 13:e.prev=13,e.t0=e.catch(7),u.start("Ошибка");case 16:return e.next=18,n.json();case 18:a=e.sent,u.start(a.message),f.reset();case 21:case"end":return e.stop()}}),e,this,[[7,13]])})));return function(t){return e.apply(this,arguments)}}(),d.onchange=function(e){0===this.files.length?l.innerHTML="Файл не выбран":l.innerHTML=this.files[0].name},f.onreset=function(){l.innerHTML="Файл не выбран"};var v=document.forms.deleteProduct;v.onsubmit=function(){var e=(0,n.Z)(s().mark((function e(t){var r,n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,fetch("".concat(o.J,":").concat(o.p,"/api/products/deleteproduct?id=").concat(this.id.value),{method:"DELETE"});case 4:r=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),u.start("Ошибка");case 10:return e.next=12,r.json();case 12:n=e.sent,u.start(n.message),v.reset();case 15:case"end":return e.stop()}}),e,this,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();var h=document.forms.updateProduct;h.onsubmit=function(){var e=(0,n.Z)(s().mark((function e(t){var r,n,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r=new FormData(this),""!==this.name.value||""!==this.price.value||0!==this.image.files.length){e.next=5;break}return u.start("Введите значение, которое надо изменить"),e.abrupt("return");case 5:if(""===r.get("name")&&r.delete("name"),""===r.get("price")&&r.delete("price"),void 0!==(r=i(r))){e.next=10;break}return e.abrupt("return");case 10:return e.prev=10,e.next=13,fetch("".concat(o.J,":").concat(o.p,"/admin/updateproduct"),{method:"PUT",body:r});case 13:n=e.sent,e.next=20;break;case 16:return e.prev=16,e.t0=e.catch(10),u.start(e.t0),e.abrupt("return");case 20:return e.next=22,n.json();case 22:a=e.sent,u.start(a.message),h.reset();case 25:case"end":return e.stop()}}),e,this,[[10,16]])})));return function(t){return e.apply(this,arguments)}}();var m=document.querySelector("#updateImageProduct"),g=document.querySelector("#updateImageProductSpan");m.onchange=function(e){0===this.files.length?g.innerHTML="Файл не выбран":g.innerHTML=this.files[0].name},h.onreset=function(){g.innerHTML="Файл не выбран"}}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var s=r[e]={exports:{}};return t[e](s,s.exports,n),s.exports}n.m=t,e=[],n.O=(t,r,a,s)=>{if(!r){var c=1/0;for(p=0;p<e.length;p++){r=e[p][0],a=e[p][1],s=e[p][2];for(var o=!0,u=0;u<r.length;u++)(!1&s||c>=s)&&Object.keys(n.O).every((e=>n.O[e](r[u])))?r.splice(u--,1):(o=!1,s<c&&(c=s));if(o){e.splice(p--,1);var i=a();void 0!==i&&(t=i)}}return t}s=s||0;for(var p=e.length;p>0&&e[p-1][2]>s;p--)e[p]=e[p-1];e[p]=[r,a,s]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.j=328,(()=>{var e={328:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,s,c=r[0],o=r[1],u=r[2],i=0;if(c.some((t=>0!==e[t]))){for(a in o)n.o(o,a)&&(n.m[a]=o[a]);if(u)var p=u(n)}for(t&&t(r);i<c.length;i++)s=c[i],n.o(e,s)&&e[s]&&e[s][0](),e[c[i]]=0;return n.O(p)},r=self.webpackChunktest=self.webpackChunktest||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[592],(()=>n(711)));a=n.O(a)})();