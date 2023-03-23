(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Pt(t,e){t.indexOf(e)===-1&&t.push(e)}const pt=(t,e,n)=>Math.min(Math.max(n,t),e),m={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},L=t=>typeof t=="number",x=t=>Array.isArray(t)&&!L(t[0]),Dt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function Mt(t,e){return x(t)?t[Dt(0,t.length,e)]:t}const gt=(t,e,n)=>-n*t+n*e+t,mt=()=>{},v=t=>t,U=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function yt(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=U(0,e,i);t.push(gt(n,1,s))}}function vt(t){const e=[0];return yt(e,t-1),e}function wt(t,e=vt(t.length),n=v){const i=t.length,s=i-e.length;return s>0&&yt(e,s),r=>{let o=0;for(;o<i-2&&!(r<e[o+1]);o++);let c=pt(0,1,U(e[o],e[o+1],r));return c=Mt(n,o)(c),gt(t[o],t[o+1],c)}}const Et=t=>Array.isArray(t)&&L(t[0]),Z=t=>typeof t=="object"&&Boolean(t.createAnimation),b=t=>typeof t=="function",tt=t=>typeof t=="string",H={ms:t=>t*1e3,s:t=>t/1e3};function Wt(t,e){return e?t*(1e3/e):0}const Ot=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Rt=1e-7,Ht=12;function It(t,e,n,i,s){let r,o,c=0;do o=e+(n-e)/2,r=Ot(o,i,s)-t,r>0?n=o:e=o;while(Math.abs(r)>Rt&&++c<Ht);return o}function R(t,e,n,i){if(t===e&&n===i)return v;const s=r=>It(r,0,1,t,n);return r=>r===0||r===1?r:Ot(s(r),e,i)}const Ft=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return pt(0,1,s/t)},it={ease:R(.25,.1,.25,1),"ease-in":R(.42,0,1,1),"ease-in-out":R(.42,0,.58,1),"ease-out":R(0,0,.58,1)},_t=/\((.*?)\)/;function st(t){if(b(t))return t;if(Et(t))return R(...t);if(it[t])return it[t];if(t.startsWith("steps")){const e=_t.exec(t);if(e){const n=e[1].split(",");return Ft(parseFloat(n[0]),n[1].trim())}}return v}class bt{constructor(e,n=[0,1],{easing:i,duration:s=m.duration,delay:r=m.delay,endDelay:o=m.endDelay,repeat:c=m.repeat,offset:h,direction:l="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=v,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((f,a)=>{this.resolve=f,this.reject=a}),i=i||m.easing,Z(i)){const f=i.createAnimation(n);i=f.easing,n=f.keyframes||n,s=f.duration||s}this.repeat=c,this.easing=x(i)?v:st(i),this.updateDuration(s);const p=wt(n,h,x(i)?i.map(st):v);this.tick=f=>{var a;r=r;let g=0;this.pauseTime!==void 0?g=this.pauseTime:g=(f-this.startTime)*this.rate,this.t=g,g/=1e3,g=Math.max(g-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(g=this.totalDuration);const z=g/this.duration;let P=Math.floor(z),w=z%1;!w&&z>=1&&(w=1),w===1&&P--;const _=P%2;(l==="reverse"||l==="alternate"&&_||l==="alternate-reverse"&&!_)&&(w=1-w);const D=g>=this.totalDuration?1:Math.min(w,1),S=p(this.easing(D));e(S),this.pauseTime===void 0&&(this.playState==="finished"||g>=this.totalDuration+o)?(this.playState="finished",(a=this.resolve)===null||a===void 0||a.call(this,S)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Vt{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const K=new WeakMap;function Tt(t){return K.has(t)||K.set(t,{transforms:[],values:new Map}),K.get(t)}function jt(t,e){return t.has(e)||t.set(e,new Vt),t.get(e)}const $t=["","X","Y","Z"],qt=["translate","scale","rotate","skew"],N={x:"translateX",y:"translateY",z:"translateZ"},rt={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Bt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:rt,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:v},skew:rt},F=new Map,et=t=>`--motion-${t}`,C=["x","y","z"];qt.forEach(t=>{$t.forEach(e=>{C.push(t+e),F.set(et(t+e),Bt[t])})});const Nt=(t,e)=>C.indexOf(t)-C.indexOf(e),Ct=new Set(C),St=t=>Ct.has(t),Ut=(t,e)=>{N[e]&&(e=N[e]);const{transforms:n}=Tt(t);Pt(n,e),t.style.transform=Kt(n)},Kt=t=>t.sort(Nt).reduce(Gt,"").trim(),Gt=(t,e)=>`${t} ${e}(var(${et(e)}))`,J=t=>t.startsWith("--"),ot=new Set;function kt(t){if(!ot.has(t)){ot.add(t);try{const{syntax:e,initialValue:n}=F.has(t)?F.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const G=(t,e)=>document.createElement("div").animate(t,e),at={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{G({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(G({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{G({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},k={},A={};for(const t in at)A[t]=()=>(k[t]===void 0&&(k[t]=at[t]()),k[t]);const Xt=.015,Zt=(t,e)=>{let n="";const i=Math.round(e/Xt);for(let s=0;s<i;s++)n+=t(U(0,i-1,s))+", ";return n.substring(0,n.length-2)},ct=(t,e)=>b(t)?A.linearEasing()?`linear(${Zt(t,e)})`:m.easing:Et(t)?Jt(t):t,Jt=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function Qt(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const Yt=t=>Array.isArray(t)?t:[t];function Q(t){return N[t]&&(t=N[t]),St(t)?et(t):t}const $={get:(t,e)=>{e=Q(e);let n=J(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=F.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=Q(e),J(e)?t.style.setProperty(e,n):t.style[e]=n}};function At(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function te(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||v;const s=t[t.length-1];if(tt(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=o=>o+r)}return i}function ee(){return window.__MOTION_DEV_TOOLS_RECORD}function ne(t,e,n,i={},s){const r=ee(),o=i.record!==!1&&r;let c,{duration:h=m.duration,delay:l=m.delay,endDelay:p=m.endDelay,repeat:f=m.repeat,easing:a=m.easing,persist:g=!1,direction:z,offset:P,allowWebkitAcceleration:w=!1}=i;const _=Tt(t),D=St(e);let S=A.waapi();D&&Ut(t,e);const y=Q(e),V=jt(_.values,y),E=F.get(y);return At(V.animation,!(Z(a)&&V.generator)&&i.record!==!1),()=>{const j=()=>{var u,M;return(M=(u=$.get(t,y))!==null&&u!==void 0?u:E==null?void 0:E.initialValue)!==null&&M!==void 0?M:0};let d=Qt(Yt(n),j);const nt=te(d,E);if(Z(a)){const u=a.createAnimation(d,e!=="opacity",j,y,V);a=u.easing,d=u.keyframes||d,h=u.duration||h}if(J(y)&&(A.cssRegisterProperty()?kt(y):S=!1),D&&!A.linearEasing()&&(b(a)||x(a)&&a.some(b))&&(S=!1),S){E&&(d=d.map(T=>L(T)?E.toDefaultUnit(T):T)),d.length===1&&(!A.partialKeyframes()||o)&&d.unshift(j());const u={delay:H.ms(l),duration:H.ms(h),endDelay:H.ms(p),easing:x(a)?void 0:ct(a,h),direction:z,iterations:f+1,fill:"both"};c=t.animate({[y]:d,offset:P,easing:x(a)?a.map(T=>ct(T,h)):void 0},u),c.finished||(c.finished=new Promise((T,zt)=>{c.onfinish=T,c.oncancel=zt}));const M=d[d.length-1];c.finished.then(()=>{g||($.set(t,y,M),c.cancel())}).catch(mt),w||(c.playbackRate=1.000001)}else if(s&&D)d=d.map(u=>typeof u=="string"?parseFloat(u):u),d.length===1&&d.unshift(parseFloat(j())),c=new s(u=>{$.set(t,y,nt?nt(u):u)},d,Object.assign(Object.assign({},i),{duration:h,easing:a}));else{const u=d[d.length-1];$.set(t,y,E&&L(u)?E.toDefaultUnit(u):u)}return o&&r(t,e,d,{duration:h,delay:l,easing:a,repeat:f,offset:P},"motion-one"),V.setAnimation(c),c}}const ie=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function xt(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const se=t=>t(),Lt=(t,e,n=m.duration)=>new Proxy({animations:t.map(se).filter(Boolean),duration:n,options:e},oe),re=t=>t.animations[0],oe={get:(t,e)=>{const n=re(t);switch(e){case"duration":return t.duration;case"currentTime":return H.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(ae)).catch(mt)),t.finished;case"stop":return()=>{t.animations.forEach(i=>At(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=H.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},ae=t=>t.finished;function ce(t,e,n){return b(t)?t(e,n):t}function le(t){return function(n,i,s={}){n=xt(n);const r=n.length,o=[];for(let c=0;c<r;c++){const h=n[c];for(const l in i){const p=ie(s,l);p.delay=ce(p.delay,c,r);const f=ne(h,l,i[l],p,t);o.push(f)}}return Lt(o,s,s.duration)}}const fe=le(bt);function ue(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(n[i[s]]=t[i[s]]);return n}const q=new WeakMap;let O;function de(t,e){if(e){const{inlineSize:n,blockSize:i}=e[0];return{width:n,height:i}}else return t instanceof SVGElement&&"getBBox"in t?t.getBBox():{width:t.offsetWidth,height:t.offsetHeight}}function he({target:t,contentRect:e,borderBoxSize:n}){var i;(i=q.get(t))===null||i===void 0||i.forEach(s=>{s({target:t,contentSize:e,get size(){return de(t,n)}})})}function pe(t){t.forEach(he)}function ge(){typeof ResizeObserver>"u"||(O=new ResizeObserver(pe))}function me(t,e){O||ge();const n=xt(t);return n.forEach(i=>{let s=q.get(i);s||(s=new Set,q.set(i,s)),s.add(e),O==null||O.observe(i)}),()=>{n.forEach(i=>{const s=q.get(i);s==null||s.delete(e),s!=null&&s.size||O==null||O.unobserve(i)})}}const B=new Set;let I;function ye(){I=()=>{const t={width:window.innerWidth,height:window.innerHeight},e={target:window,size:t,contentSize:t};B.forEach(n=>n(e))},window.addEventListener("resize",I)}function ve(t){return B.add(t),I||ye(),()=>{B.delete(t),!B.size&&I&&(I=void 0)}}function we(t,e){return b(t)?ve(t):me(t,e)}const Ee=50,lt=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Oe=()=>({time:0,x:lt(),y:lt()}),be={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function ft(t,e,n,i){const s=n[e],{length:r,position:o}=be[e],c=s.current,h=n.time;s.current=t["scroll"+o],s.scrollLength=t["scroll"+r]-t["client"+r],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=U(0,s.scrollLength,s.current);const l=i-h;s.velocity=l>Ee?0:Wt(s.current-c,l)}function Te(t,e,n){ft(t,"x",e,n),ft(t,"y",e,n),e.time=n}function Se(t,e){let n={x:0,y:0},i=t;for(;i&&i!==e;)if(i instanceof HTMLElement)n.x+=i.offsetLeft,n.y+=i.offsetTop,i=i.offsetParent;else if(i instanceof SVGGraphicsElement&&"getBBox"in i){const{top:s,left:r}=i.getBBox();for(n.x+=r,n.y+=s;i&&i.tagName!=="svg";)i=i.parentNode}return n}const Ae={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Y={start:0,center:.5,end:1};function ut(t,e,n=0){let i=0;if(Y[t]!==void 0&&(t=Y[t]),tt(t)){const s=parseFloat(t);t.endsWith("px")?i=s:t.endsWith("%")?t=s/100:t.endsWith("vw")?i=s/100*document.documentElement.clientWidth:t.endsWith("vh")?i=s/100*document.documentElement.clientHeight:t=s}return L(t)&&(i=e*t),n+i}const xe=[0,0];function Le(t,e,n,i){let s=Array.isArray(t)?t:xe,r=0,o=0;return L(t)?s=[t,t]:tt(t)&&(t=t.trim(),t.includes(" ")?s=t.split(" "):s=[t,Y[t]?t:"0"]),r=ut(s[0],n,i),o=ut(s[1],e),r-o}const ze={x:0,y:0};function Pe(t,e,n){let{offset:i=Ae.All}=n;const{target:s=t,axis:r="y"}=n,o=r==="y"?"height":"width",c=s!==t?Se(s,t):ze,h=s===t?{width:t.scrollWidth,height:t.scrollHeight}:{width:s.clientWidth,height:s.clientHeight},l={width:t.clientWidth,height:t.clientHeight};e[r].offset.length=0;let p=!e[r].interpolate;const f=i.length;for(let a=0;a<f;a++){const g=Le(i[a],l[o],h[o],c[r]);!p&&g!==e[r].interpolatorOffsets[a]&&(p=!0),e[r].offset[a]=g}p&&(e[r].interpolate=wt(vt(f),e[r].offset),e[r].interpolatorOffsets=[...e[r].offset]),e[r].progress=e[r].interpolate(e[r].current)}function De(t,e=t,n){if(n.x.targetOffset=0,n.y.targetOffset=0,e!==t){let i=e;for(;i&&i!=t;)n.x.targetOffset+=i.offsetLeft,n.y.targetOffset+=i.offsetTop,i=i.offsetParent}n.x.targetLength=e===t?e.scrollWidth:e.clientWidth,n.y.targetLength=e===t?e.scrollHeight:e.clientHeight,n.x.containerLength=t.clientWidth,n.y.containerLength=t.clientHeight}function Me(t,e,n,i={}){const s=i.axis||"y";return{measure:()=>De(t,i.target,n),update:r=>{Te(t,n,r),(i.offset||i.target)&&Pe(t,n,i)},notify:b(e)?()=>e(n):We(e,n[s])}}function We(t,e){return t.pause(),t.forEachNative((n,{easing:i})=>{var s,r;if(n.updateDuration)i||(n.easing=v),n.updateDuration(1);else{const o={duration:1e3};i||(o.easing="linear"),(r=(s=n.effect)===null||s===void 0?void 0:s.updateTiming)===null||r===void 0||r.call(s,o)}}),()=>{t.currentTime=e.progress}}const W=new WeakMap,dt=new WeakMap,X=new WeakMap,ht=t=>t===document.documentElement?window:t;function Re(t,e={}){var{container:n=document.documentElement}=e,i=ue(e,["container"]);let s=X.get(n);s||(s=new Set,X.set(n,s));const r=Oe(),o=Me(n,t,r,i);if(s.add(o),!W.has(n)){const l=()=>{const f=performance.now();for(const a of s)a.measure();for(const a of s)a.update(f);for(const a of s)a.notify()};W.set(n,l);const p=ht(n);window.addEventListener("resize",l,{passive:!0}),n!==document.documentElement&&dt.set(n,we(n,l)),p.addEventListener("scroll",l,{passive:!0})}const c=W.get(n),h=requestAnimationFrame(c);return()=>{var l;typeof t!="function"&&t.stop(),cancelAnimationFrame(h);const p=X.get(n);if(!p||(p.delete(o),p.size))return;const f=W.get(n);W.delete(n),f&&(ht(n).removeEventListener("scroll",f),(l=dt.get(n))===null||l===void 0||l(),window.removeEventListener("resize",f))}}function He(t,e={}){return Lt([()=>{const n=new bt(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function Ie(t,e,n){return(b(t)?He:fe)(t,e,n)}Re(Ie(".progress",{strokeDasharray:["0,1","1,1"]}));
