(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",function(){const r=window.location.pathname,o=document.querySelector(".header-nav-home"),c=document.querySelector(".header-nav-favorites");r.includes("index.html")?o.classList.add("active"):r.includes("favorites.html")&&c.classList.add("active")});const s=document.querySelector(".icon-change-color"),l=document.querySelector(".icon-change-color-circle");s.addEventListener("click",()=>{l.classList.toggle("clicked")});
//# sourceMappingURL=main-BvMtbKpA.js.map
