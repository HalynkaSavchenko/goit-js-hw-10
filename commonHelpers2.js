import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as t}from"./assets/vendor-77e16229.js";const n=document.querySelector(".form");n.addEventListener("submit",function(s){s.preventDefault();const o=Number(document.querySelector("[name=delay]").value),i=document.querySelector("[name=state]:checked").value;new Promise((e,c)=>{setTimeout(i==="fulfilled"?()=>e(o):()=>c(o),o)}).then(e=>{t.success({title:"✅",message:`Fulfilled promise in ${e}ms`,messageColor:"#FFFFFF",backgroundColor:"#59A10D",icon:"",close:!1,position:"topRight"})}).catch(e=>{t.success({title:"❌",message:`Rejected promise in ${e}ms`,messageColor:"#FFFFFF",backgroundColor:"#B51B1B",icon:"",close:!1,position:"topRight"})})});
//# sourceMappingURL=commonHelpers2.js.map
