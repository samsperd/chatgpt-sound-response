parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pILq":[function(require,module,exports) {
console.log("console of content script is working");const e="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400";function t(){const t=document.getElementsByClassName("dark:bg-[#444654]");chrome.runtime.onMessage.addListener(e=>{if("interrupted"===e.trigger){const t=document.getElementsByClassName("dark:bg-[#444654]")[e.previousId].getElementsByClassName("visible");for(let e=0;e<t.length;e++){const s=t[e].querySelector(".play-button"),n=t[e].querySelector(".pause-button"),o=t[e].querySelector(".resume-button");n.style.display="none",o.style.display="none",s.style.display="block"}}});for(let s=0;s<t.length;s++){const n=t[s].getElementsByClassName("visible");t[s].getElementsByClassName("break-words");for(let o=0;o<n.length;o++)if(!n[o].querySelector(".speech-button")){const l=document.createElement("button"),r=document.createElement("button"),i=document.createElement("button");l.className=`speech-button play-button ${e}`,r.className=`speech-button pause-button ${e}`,i.className="speech-button resume-button",l.innerHTML='<svg stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" style="stroke:#111;stroke-width:5;stroke-linejoin:round;" /><path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#111;stroke-width:5;stroke-linecap:round"/></svg>',r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" stroke="#000" stroke-width="2" fill="none"/><rect x="14" y="4" width="4" height="16" stroke="#000" stroke-width="2" fill="none"/></svg>',i.innerText="Resume",r.style.display="none",i.style.display="none",chrome.runtime.onMessage.addListener(e=>{"finished"===e.trigger&&(r.style.display="none",i.style.display="none",l.style.display="block")}),l.addEventListener("click",()=>{const e=t[s].innerText.trim();chrome.runtime.sendMessage({type:"play",text:e,id:s}),l.style.display="none",r.style.display="block"}),r.addEventListener("click",()=>{"none"==l.style.display&&(r.style.display="none",i.style.display="block",chrome.runtime.sendMessage({type:"pause"}))}),i.addEventListener("click",()=>{"none"==l.style.display&&(i.style.display="none",r.style.display="block",chrome.runtime.sendMessage({type:"resume"}))}),n[o].appendChild(l),n[o].appendChild(r),n[o].appendChild(i)}}}const s=new MutationObserver(e=>{for(let s=0;s<e.length;s++){e[s].addedNodes.length>0&&t()}});s.observe(document.body,{childList:!0,subtree:!0}),t();
},{}]},{},["pILq"], null)
//# sourceMappingURL=/content.js.map