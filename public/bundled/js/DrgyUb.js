import{W as e,s as t,n,f as a,l as s,g as o,h as i,r as c,j as r,c as d,i as l}from"./main.js";const p=new e(!1);function m(e,t){return Math.floor(Math.random()*(t-e+1))+e}let u,g,h,f,y,v,w,E=[],x=[],T=[],L=-1,b=!1;function k(){l.get()||(l.set(!0),T[t.get().index].scrollIntoView({block:"center",behavior:"auto"}),v.to(g,{y:"100%",ease:"power3.inOut",duration:1}),v.to(h,{opacity:0,duration:1.2,delay:.4}),setTimeout((()=>{a.set(!0),l.set(!1),L=-1}),1600))}let I=[];function B(e){o(e),!l.get()&&b&&(l.set(!0),v.to(h,{opacity:1,duration:1}),v.to(g,{y:0,ease:"power3.inOut",duration:1,delay:.4}),setTimeout((()=>{a.set(!1),l.set(!1)}),1400))}function N(e){(function(e){!function(e){const t=document.createElement("div");t.className="collection";for(const[n,a]of e.entries()){const e=0!==n?m(-25,25):0,s=0!==n?m(-30,30):0,o=document.createElement("img");o.dataset.src=a.loUrl,o.height=a.loImgH,o.width=a.loImgW,o.alt=a.alt,o.style.transform=`translate3d(${e}%, ${s-50}%, 0)`,t.append(o)}d.append(t)}(e);const t=document.getElementsByClassName("collection").item(0);p.addWatcher((e=>{e?t.classList.remove("hidden"):t.classList.add("hidden")})),I=Array.from(t.getElementsByTagName("img")),I.forEach(((e,t)=>{var n,a;t<5&&(e.src=e.dataset.src),e.addEventListener("click",(()=>{B(t)}),{passive:!0}),e.addEventListener("keydown",(()=>{B(t)}),{passive:!0}),n=e,a=e=>!(e.intersectionRatio<=0||(t+5<I.length&&(I[t+5].src=I[t+5].dataset.src),0)),new IntersectionObserver(((e,t)=>{for(const n of e)if(a(n)){t.disconnect();break}})).observe(n)}))})(e),function(e){!function(e){g=r("gallery"),function(e){const n=r("swiper-wrapper"),a=d.dataset.loading+"...";for(const s of e){const e=r("swiper-slide"),o=r("loadingText");o.innerText=a;const i=document.createElement("img");i.dataset.src=s.hiUrl,i.height=s.hiImgH,i.width=s.hiImgW,i.alt=s.alt,i.style.opacity="0",i.addEventListener("load",(()=>{t.get().index!==s.index?(v.set(i,{opacity:1}),v.set(o,{opacity:0})):(v.to(i,{opacity:1,delay:.5,duration:.5,ease:"power3.out"}),v.to(o,{opacity:0,duration:.5,ease:"power3.in"}))}),{once:!0,passive:!0});const c=r("slideContainer");c.append(i,o),e.append(c),n.append(e)}u=r("galleryInner"),u.append(n)}(e),function(){f=document.createElement("div"),f.insertAdjacentHTML("afterbegin",'<span class="num"></span><span class="num"></span><span class="num"></span><span class="num"></span>\n    <span>/</span>\n    <span class="num"></span><span class="num"></span><span class="num"></span><span class="num"></span>');const e=document.createElement("div");var t;e.innerText=(t=d.dataset.close).charAt(0).toUpperCase()+t.slice(1),e.addEventListener("click",(()=>{k()}),{passive:!0}),e.addEventListener("keydown",(()=>{k()}),{passive:!0}),y=r("nav"),y.append(f,e)}(),g.append(u,y),h=r("curtain"),d.append(g,h)}(e),E=Array.from(f.getElementsByClassName("num")??[]),x=Array.from(g.getElementsByTagName("img")),T=Array.from(document.getElementsByClassName("collection").item(0)?.getElementsByTagName("img")??[]),t.addWatcher((e=>{var a;e.index!==L&&(-1===L?n.set("none"):e.index<L?n.set("prev"):e.index>L?n.set("next"):n.set("none"),a=e.index,function(){let e=[];const a=t.get().index,s=Math.min(a+1,t.get().length-1),o=Math.max(a-1,0);switch(n.get()){case"next":e=[s];break;case"prev":e=[o];break;case"none":e=[a,s,o]}c(e).forEach((e=>{const t=x[e];t.src!==t.dataset.src&&(t.src=t.dataset.src)}))}(),w.slideTo(a,0),function(){const e=i(t.get().index+1),n=i(t.get().length);E.forEach(((t,a)=>{t.innerText=a<4?e[a]:n[a-4]}))}(),L=e.index)})),p.addWatcher((e=>{e&&a.set(!0)})),window.addEventListener("touchstart",(()=>{s().then((e=>{v=e})).catch((e=>{console.log(e)})),async function(){return(await import("./CUdXu0.js")).Swiper}().then((e=>{w=new e(u,{spaceBetween:20}),w.on("slideChange",(({realIndex:e})=>{o(e)}))})).catch((e=>{console.log(e)})),b=!0}),{once:!0,passive:!0}),p.set(!0)}(e)}export{N as initMobile};