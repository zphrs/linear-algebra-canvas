import{S as ee,i as te,s as ne,k as Ie,l as We,m as Le,h as he,n as Re,b as Me,J as ke,H as Z,K as Ce,w as ae,L as Ye,y as ge,z as me,A as ve,M as xe,g as Q,d as V,B as ye,N as G,C as De,a as $e,c as Fe,O as Ne,D as Ue,E as je,F as Be,o as qe}from"../chunks/index.97c05fc3.js";import{w as Se}from"../chunks/index.794fae6f.js";class w{constructor(e,n){this.x=e,this.y=n}static zero=new w(0,0);add(e,n){return new w(this.x+e,this.y+n)}addVec(e){return new w(this.x+e.x,this.y+e.y)}sub(e,n){return new w(this.x-e,this.y-n)}subVec(e){return new w(this.x-e.x,this.y-e.y)}mul(e){return new w(this.x*e.x,this.y*e.y)}mulScalar(e){return new w(this.x*e,this.y*e)}div(e){return new w(this.x/e.x,this.y/e.y)}mag(){return Math.sqrt(this.mag2())}mag2(){return this.x*this.x+this.y*this.y}normalize(){return this.divScalar(this.mag())}divScalar(e){return new w(this.x/e,this.y/e)}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}rotate(e){const n=Math.sin(e),a=Math.cos(e);return new w(this.x*a-this.y*n,this.x*n+this.y*a)}rotateAround(e,n){const a=Math.sin(n),i=Math.cos(n),h=this.x-e.x,r=this.y-e.y;return new w(h*i-r*a+e.x,h*a+r*i+e.y)}copy(){return new w(this.x,this.y)}distanceTo(e){return Math.sqrt(this.distanceTo2(e))}distanceTo2(e){return Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2)}map(e){return new w(e(this.x),e(this.y))}static lerpFunc=(e,n,a)=>e+(n-e)*a;lerp(e,n){return new w(w.lerpFunc(this.x,e.x,n),w.lerpFunc(this.y,e.y,n))}}function Ge(t,e){let n=!1,a={},i=0,h=1,r=null,l=null;function p(s){let c=t.getBoundingClientRect();const g=s;return g.relativeX=s.clientX-c.left,g.relativeY=s.clientY-c.top,g}function f(s){const c=s;return c.downAt=performance.now(),c.downX=s.relativeX,c.downY=s.relativeY,c}t.addEventListener("pointerdown",s=>{n=!0;const c=p(s),g=f(c);if(a[s.pointerId]={...g},i==0&&e("ppanstart",g),i==1){const _=Object.keys(a).map(u=>parseInt(u));_.forEach(u=>{f(a[u])});const m=a[_[0]],v=a[_[1]];r=Math.sqrt(Math.pow(m.relativeX-v.relativeX,2)+Math.pow(m.relativeY-v.relativeY,2)),e("ppinchdown",{points:[m,v],scaleAmount:h});const b={...v};b.relativeX=(m.relativeX+v.relativeX)/2,b.relativeY=(m.relativeY+v.relativeY)/2,l=f(b),l.fromPointer=!1,e("ppanstart",l)}i++});let d=s=>{p(s);const c=Object.keys(a).map(g=>parseInt(g));i==2?(e("ppinchup",{points:[a[c[0]],a[c[1]]],scaleAmount:h}),l&&(e("ppanup",l),l=null)):i==1&&(Math.sqrt(Math.pow(a[c[0]].relativeX-a[c[0]].downX,2)+Math.pow(a[c[0]].relativeY-a[c[0]].downY,2))<10?performance.now()-a[c[0]].downAt<500?e("ptap",a[c[0]]):e("pholdup",a[c[0]]):e("ppanup",a[c[0]])),delete a[s.pointerId],i--,i<=0&&(n=!1,i=0)};t.addEventListener("pointerup",d),t.addEventListener("pointercancel",d),t.addEventListener("pointerleave",d),t.addEventListener("pointerout",d),t.addEventListener("pointermove",s=>{const c=p(s);i==0&&e("pmove",c);let g=a[s.pointerId];if(g&&(g.relativeX=c.relativeX,g.relativeY=c.relativeY,n))if(i==2){if(!r)return;const _=Object.keys(a).map(u=>parseInt(u)),m=a[_[0]],v=a[_[1]],b=Math.sqrt(Math.pow(m.relativeX-v.relativeX,2)+Math.pow(m.relativeY-v.relativeY,2));e("ppinch",{points:[m,v],scaleAmount:b/r}),l&&(l.relativeX=(m.relativeX+v.relativeX)/2,l.relativeY=(m.relativeY+v.relativeY)/2,e("ppan",l)),e("zoom",{scaleAmount:b/r,relativeX:(m.relativeX+v.relativeX)/2,relativeY:(m.relativeY+v.relativeY)/2}),r=b}else i==1&&e("ppan",{...g,fromPointer:!0})}),t.addEventListener("wheel",s=>{if(s.preventDefault(),s.ctrlKey){let c=s;p(c),e("zoom",{scaleAmount:s.deltaY>0?(1-s.deltaY*.01)/1:1/(1+.01*s.deltaY),relativeX:c.relativeX,relativeY:c.relativeY})}else{const c=new PointerEvent("pointerdown",{clientX:s.clientX,clientY:s.clientY}),g=p(c);g.downX=g.relativeX,g.downY=g.relativeY,g.downAt=performance.now(),e("ppanstart",g);const _=new PointerEvent("pointermove",{clientX:s.clientX+s.deltaX,clientY:s.clientY+s.deltaY}),m=p(_);m.downX=g.downX,m.downY=g.downY;const v=m;v.fromPointer=!1,e("ppan",v)}},{passive:!1})}function Ze(t){let e,n,a;return{c(){e=Ie("canvas"),this.h()},l(i){e=We(i,"CANVAS",{class:!0}),Le(e).forEach(he),this.h()},h(){Re(e,"class","svelte-5tod0y")},m(i,h){Me(i,e,h),t[2](e),n||(a=ke(Ge.call(null,e,t[1])),n=!0)},p:Z,i:Z,o:Z,d(i){i&&he(e),t[2](null),n=!1,a()}}}function He(t,e,n){const a=Ce();let{canvas:i}=e;function h(r){ae[r?"unshift":"push"](()=>{i=r,n(0,i)})}return t.$$set=r=>{"canvas"in r&&n(0,i=r.canvas)},[i,a,h]}class Je extends ee{constructor(e){super(),te(this,e,He,Ze,ne,{canvas:0})}}class _e{constructor(e,n){this.min=e,this.max=n}asRect(){return new z(this.min.x,this.min.y,this.max.x-this.min.x,this.max.y-this.min.y)}union(e){return new _e(new w(Math.min(this.min.x,e.min.x),Math.min(this.min.y,e.min.y)),new w(Math.max(this.max.x,e.max.x),Math.max(this.max.y,e.max.y)))}}class z extends w{constructor(e,n,a,i){super(e,n),this.x=e,this.y=n,this.width=a,this.height=i}insideOf(e){const{min:n,max:a}=this.toBounds();return e.contains(n)&&e.contains(a)}getBounding(){return new z(this.x,this.y,this.width,this.height)}toBounds(){return new _e(new w(this.x,this.y),new w(this.x+this.width,this.y+this.height))}getCenter(){return new w((this.x+this.width)/2,(this.y+this.height)/2)}contains(e){return e.x>=this.x&&e.x<=this.x+this.width&&e.y>=this.y&&e.y<=this.y+this.height}}class U extends w{constructor(e,n,a){super(e,n),this.x=e,this.y=n,this.radius=a}insideOf(e){if(e instanceof U)return e.radius<=this.radius?!1:this.distanceTo(e)+this.radius<=e.radius;if(e instanceof z){const{min:n,max:a}=this.getBounding().toBounds();return e.contains(n)&&e.contains(a)}else return!1}getBounding(){return{x:this.x+this.radius,y:this.y+this.radius,width:this.radius*2,height:this.radius*2}}getCenter(){return new w(this.x,this.y)}contains(e){return this.distanceTo(e)<=this.radius}}function Ke(t){let e,n,a;function i(r){t[19](r)}let h={};return t[0]!==void 0&&(h.canvas=t[0]),e=new Je({props:h}),ae.push(()=>Ye(e,"canvas",i)),e.$on("ppanstart",t[20]),e.$on("zoom",t[3]),e.$on("ppan",t[4]),e.$on("ppanup",t[21]),e.$on("pholdup",t[22]),e.$on("ptap",t[23]),e.$on("pmove",t[24]),{c(){ge(e.$$.fragment)},l(r){me(e.$$.fragment,r)},m(r,l){ve(e,r,l),a=!0},p(r,[l]){const p={};!n&&l&1&&(n=!0,p.canvas=r[0],xe(()=>n=!1)),e.$set(p)},i(r){a||(Q(e.$$.fragment,r),a=!0)},o(r){V(e.$$.fragment,r),a=!1},d(r){ye(e,r)}}}function Qe(t,e,n){let{canvas:a}=e,{children:i}=e,{pointersWritable:h=Se({})}=e,{pointersWritableProxy:r=Se({})}=e,{pPan:l=()=>!0}=e;const p=Ce();let f,d=1,s=new w(0,0);r.subscribe(o=>{const y=JSON.parse(JSON.stringify(o));Object.values(y).forEach(S=>{if(!f)return;const X=m(S.relativeX,S.relativeY,f);S.relativeX=X.x,S.relativeY=X.y}),h.set(y)});function c(o){o.clearRect(0,0,o.canvas.width,o.canvas.height),o.save(),o.translate(o.canvas.width/2,o.canvas.height/2),o.scale(d,d),o.translate(s.x,s.y),i.map(y=>y.draw(o)),o.restore()}function g(){f&&c(f)}function _(o){f&&(console.log("drawElement"),f.save(),f.translate(f.canvas.width/2,f.canvas.height/2),f.scale(d,d),f.translate(s.x,s.y),o.draw(f),f.restore())}function m(o,y,S){return v(new w(o,y),S)}function v(o,y){return o.sub(y.canvas.width/2,y.canvas.height/2).divScalar(d).subVec(s)}function b(){return d}function u(){return f}function re(o,y){if(f)return new w((o+s.x)*d+f.canvas.width/2,(y+s.y)*d+f.canvas.height/2)}function oe(o){if(f)return o.addVec(s).mulScalar(d).add(f.canvas.width/2,f.canvas.height/2)}function le(o){const y=m(0,0,o);return new z(y.x,y.y,o.canvas.width/d,o.canvas.height/d)}let W=null;function L(){W=s.copy()}function ce(o){if(!f||!a)return;const{scaleAmount:y,relativeX:S,relativeY:X}=o.detail,j=d;d*=y;const B=d,q=S-f.canvas.width/2,be=X-f.canvas.height/2;s=s.add(q/B-q/j,be/B-be/j),c(f),p("zoom",o.detail)}function fe(o){if(!f||!a||!l(o,f)||!W)return;const{relativeX:y,relativeY:S,downX:X,downY:j}=o.detail,B=y-X,q=S-j;s=W.add(B/d,q/d),c(f),p("ppan",o.detail)}function R(o){a=o,n(0,a)}const k=o=>{L(),p("ppanstart",o.detail)};function Xe(o){G.call(this,t,o)}function Te(o){G.call(this,t,o)}function Oe(o){G.call(this,t,o)}function Ae(o){G.call(this,t,o)}return t.$$set=o=>{"canvas"in o&&n(0,a=o.canvas),"children"in o&&n(5,i=o.children),"pointersWritable"in o&&n(6,h=o.pointersWritable),"pointersWritableProxy"in o&&n(7,r=o.pointersWritableProxy),"pPan"in o&&n(8,l=o.pPan)},t.$$.update=()=>{t.$$.dirty&262145&&(n(18,f=a?.getContext("2d")),f&&(p("initialized"),c(f)))},[a,p,L,ce,fe,i,h,r,l,g,_,m,v,b,u,re,oe,le,f,R,k,Xe,Te,Oe,Ae]}class Ve extends ee{constructor(e){super(),te(this,e,Qe,Ke,ne,{canvas:0,children:5,pointersWritable:6,pointersWritableProxy:7,pPan:8,draw:9,drawElement:10,screenSpaceToCanvasSpace:11,vecScreenSpaceToCanvasSpace:12,getScale:13,getContext:14,canvasSpaceToScreenSpace:15,vecCanvasSpaceToScreenSpace:16,getScreenSize:17})}get draw(){return this.$$.ctx[9]}get drawElement(){return this.$$.ctx[10]}get screenSpaceToCanvasSpace(){return this.$$.ctx[11]}get vecScreenSpaceToCanvasSpace(){return this.$$.ctx[12]}get getScale(){return this.$$.ctx[13]}get getContext(){return this.$$.ctx[14]}get canvasSpaceToScreenSpace(){return this.$$.ctx[15]}get vecCanvasSpaceToScreenSpace(){return this.$$.ctx[16]}get getScreenSize(){return this.$$.ctx[17]}}const C={gold100:"#413900",gold300:"#846905",gold500:"#ce9409",gold700:"#ffd140",gold900:"#fff4b8",sea100:"#193632",sea300:"#345348",sea500:"#6e9d87",sea700:"#ace9c5",sea900:"#d9ffe8",violet100:"#040421",violet300:"#2d27a4",violet500:"#645cee",violet700:"#a8a9f4",violet900:"#cfd3ff",fire100:"#3b1a00",fire300:"#743002",fire500:"#ce5509",fire700:"#f58f53",fire900:"#ffc7a3",gray100:"#212121",gray300:"#525252",gray500:"#7d7d7d",gray700:"#a3a3a3",gray900:"#c1c1c1"},I=100,A=15;function et(t,e,n){const{x:a,y:i,radius:h}=t.size;n.beginPath(),n.fillStyle=C.violet500+"20",n.arc(a,i,h,0,2*Math.PI),n.fill(),n.beginPath(),n.fillStyle=C.violet500+"20",n.arc(a,i,I,0,2*Math.PI),n.fill();const r=e.sub(a,i),l=r.normalize(),p=r.mag(),f=l.x*p/2,d=l.y*p/2;n.beginPath(),n.arc(a+f,i+d,A,0,2*Math.PI),n.fillStyle=C.violet900,n.fill()}function tt(t,e,n){const{x:a,y:i,radius:h}=t.size;n.beginPath(),n.fillStyle=C.violet500+"40",n.arc(a,i,h,0,2*Math.PI),n.fill();const r=e.sub(a,i),l=r.normalize(),p=r.mag(),f=Math.min(p-A,I-A),d=l.x*f,s=l.y*f;n.beginPath(),n.arc(a+d,i+s,A,0,2*Math.PI),n.fillStyle=C.violet900,n.fill()}function nt(t,e,n){t.state==Y?et(t,e,n):t.state==E&&tt(t,e,n)}function at(t,e){e.fillStyle=C.violet900,e.beginPath();const{x:n,y:a,radius:i}=t.size;e.arc(n,a,i,0,2*Math.PI),e.fill()}function ue(t,e){const n=e.map(h=>{const r=h/I+.5;return Math.floor(r)*I}),a=n.distanceTo(e);let i=w.lerpFunc(2,A,1-a/A);i<0&&(i=0),t.size=new U(n.x,n.y,i)}function it(t,e){if(!t.selected)return;const a=t.size.getCenter().subVec(e).mag();t.state==Y&&a>50?t.state=E:t.state==E&&a>100&&(t.state=se)}function st(t,e){if(!t.selected)return!0;const a=t.size.getCenter().subVec(e).mag();return t.state==Y&&a>50?t.state=E:t.state==E&&a>100&&(t.state=se),!(t.typeOfSelect==ie||t.typeOfSelect==O&&t.size.contains(t.downCoords))}function rt(t,e){t.typeOfSelect==ie&&t.state!=se&&(t.selected=!1),t.typeOfSelect==O&&t.state==E&&!t.size.contains(e)&&(t.selected=!1)}function ot(t,e){t.downCoords=e.copy(),!t.selected&&t.size.contains(e)&&(t.selected=!0,t.typeOfSelect=ie,t.state=Y)}function lt(t,e){if(t.selected){if(t.typeOfSelect==O&&t.state!=se&&!t.size.contains(e)){t.selected=!1;return}if(t.typeOfSelect==ie&&t.state==Y){t.typeOfSelect=O;return}t.typeOfSelect==O&&t.state==Y&&(t.selected=!1)}else t.size.contains(e)&&(t.typeOfSelect=O,t.selected=!0)}const O=0,ie=1,Y=0,E=1,se=2;function ct(t){let e=null;const n={size:new U(0,0,0),draw:function(a){if(e){if(n.selected){nt(n,e,a);return}at(n,a)}},get selected(){return n._selected},set selected(a){if(n._selected=a,n.state=Y,e&&!a){const i=e.map(r=>Math.floor((r+50)/100)*100);let h=0;n.size=new U(i.x,i.y,h)}t.draw()},_selected:!1,_children:[],onPPan:a=>{const i=t.getContext();if(!i||(e=t.vecScreenSpaceToCanvasSpace(new w(a.relativeX,a.relativeY),i),!e))return!0;n.selected||ue(n,e);const h=st(n,e);return t.draw(),h},onPPanStart:a=>{const i=t.getContext();i&&(e=t.vecScreenSpaceToCanvasSpace(new w(a.relativeX,a.relativeY),i),!n.selected&&e&&ue(n,e),e&&ot(n,e))},onPTap:a=>{e&&lt(n,e),t.draw()},onPMove:a=>{const i=t.getContext();i&&(e=t.vecScreenSpaceToCanvasSpace(new w(a.relativeX,a.relativeY),i),!n.selected&&e&&ue(n,e),e&&it(n,e),t.draw())},onPPanUp:a=>{e&&rt(n,e)},_state:0,set state(a){switch(a){case Y:n.size.radius=I/2;break;case E:n.size.radius=I;break}n._state=a},get state(){return n._state},_typeOfSelect:0,set typeOfSelect(a){n._typeOfSelect=a},get typeOfSelect(){return n._typeOfSelect},downCoords:w.zero};return n}function ft(t){let e,n,a,i,h,r;function l(s){t[10](s)}let p={children:[t[4],t[2]],pPan:t[8]};t[0]!==void 0&&(p.canvas=t[0]),e=new Ve({props:p}),t[9](e),ae.push(()=>Ye(e,"canvas",l)),e.$on("ptap",t[11]),e.$on("ppanstart",t[12]),e.$on("pmove",t[13]),e.$on("ppanup",t[14]);const f=t[6].default,d=De(f,t,t[5],null);return{c(){ge(e.$$.fragment),a=$e(),d&&d.c()},l(s){me(e.$$.fragment,s),a=Fe(s),d&&d.l(s)},m(s,c){ve(e,s,c),Me(s,a,c),d&&d.m(s,c),i=!0,h||(r=Ne(window,"resize",t[7]),h=!0)},p(s,[c]){const g={};c&4&&(g.children=[s[4],s[2]]),c&4&&(g.pPan=s[8]),!n&&c&1&&(n=!0,g.canvas=s[0],xe(()=>n=!1)),e.$set(g),d&&d.p&&(!i||c&32)&&Ue(d,f,s,s[5],i?Be(f,s[5],c,null):je(s[5]),null)},i(s){i||(Q(e.$$.fragment,s),Q(d,s),i=!0)},o(s){V(e.$$.fragment,s),V(d,s),i=!1},d(s){t[9](null),ye(e,s),s&&he(a),d&&d.d(s),h=!1,r()}}}function ut(t,e,n){let a,{$$slots:i={},$$scope:h}=e,r,l;function p(u){u&&(u.removeAttribute("width"),u.removeAttribute("height"),u.width=u.clientWidth,u.height=u.clientHeight,l.draw())}new z(-50,-50,100,100);const f={size:new z(0,0,0,0),draw(u){this.size=l.getScreenSize(u),u.fillStyle=C.violet900;const{x:re,y:oe,width:le,height:W}=this.size,{max:L}=this.size.toBounds();if(le>1e4||W>1e4)return;const ce=Math.floor(re/100)*100,fe=Math.floor(oe/100)*100;for(let R=ce;R<L.x+2*l.getScale();R+=100)for(let k=fe;k<L.y+2*l.getScale();k+=100)u.beginPath(),u.arc(R,k,2,0,2*Math.PI),u.fill()},_children:[]},d=()=>p(r),s=u=>a.onPPan(u.detail);function c(u){ae[u?"unshift":"push"](()=>{l=u,n(1,l)})}function g(u){r=u,n(0,r)}const _=u=>a.onPTap(u.detail),m=u=>a.onPPanStart(u.detail),v=u=>a.onPMove(u.detail),b=u=>a.onPPanUp(u.detail);return t.$$set=u=>{"$$scope"in u&&n(5,h=u.$$scope)},t.$$.update=()=>{t.$$.dirty&2&&n(2,a=ct(l)),t.$$.dirty&1&&p(r)},[r,l,a,p,f,h,i,d,s,c,g,_,m,v,b]}class dt extends ee{constructor(e){super(),te(this,e,ut,ft,ne,{})}}let P;const M=new Array(128).fill(void 0);M.push(void 0,null,!0,!1);let N=M.length;function T(t){N===M.length&&M.push(M.length+1);const e=N;return N=M[e],M[e]=t,e}function x(t){return M[t]}function ht(t){t<132||(M[t]=N,N=t)}function pe(t){const e=x(t);return ht(t),e}const ze=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});ze.decode();let D=null;function H(){return(D===null||D.byteLength===0)&&(D=new Uint8Array(P.memory.buffer)),D}function de(t,e){return ze.decode(H().subarray(t,t+e))}function Pe(t){return t==null}let $=null;function pt(){return($===null||$.byteLength===0)&&($=new Float64Array(P.memory.buffer)),$}let F=null;function J(){return(F===null||F.byteLength===0)&&(F=new Int32Array(P.memory.buffer)),F}let we=0;const K=new TextEncoder("utf-8"),wt=typeof K.encodeInto=="function"?function(t,e){return K.encodeInto(t,e)}:function(t,e){const n=K.encode(t);return e.set(n),{read:t.length,written:n.length}};function gt(t,e,n){if(n===void 0){const l=K.encode(t),p=e(l.length);return H().subarray(p,p+l.length).set(l),we=l.length,p}let a=t.length,i=e(a);const h=H();let r=0;for(;r<a;r++){const l=t.charCodeAt(r);if(l>127)break;h[i+r]=l}if(r!==a){r!==0&&(t=t.slice(r)),i=n(i,a,a=r+t.length*3);const l=H().subarray(i+r,i+a),p=wt(t,l);r+=p.written}return we=r,i}function mt(t,e){try{const h=P.__wbindgen_add_to_stack_pointer(-16),r=gt(e,P.__wbindgen_malloc,P.__wbindgen_realloc),l=we;P.m1_op_to_matrix(h,T(t),r,l);var n=J()[h/4+0],a=J()[h/4+1],i=J()[h/4+2];if(i)throw pe(a);return pe(n)}finally{P.__wbindgen_add_to_stack_pointer(16)}}async function vt(t,e){if(typeof Response=="function"&&t instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,e)}catch(a){if(t.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",a);else throw a}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}else{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}function yt(){const t={};return t.wbg={},t.wbg.__wbindgen_number_new=function(e){return T(e)},t.wbg.__wbindgen_object_drop_ref=function(e){pe(e)},t.wbg.__wbg_alert_1bbd7e743d159645=function(e,n){alert(de(e,n))},t.wbg.__wbindgen_string_new=function(e,n){const a=de(e,n);return T(a)},t.wbg.__wbindgen_number_get=function(e,n){const a=x(n),i=typeof a=="number"?a:void 0;pt()[e/8+1]=Pe(i)?0:i,J()[e/4+0]=!Pe(i)},t.wbg.__wbg_get_27fe3dac1c4d0224=function(e,n){const a=x(e)[n>>>0];return T(a)},t.wbg.__wbg_length_e498fbc24f9c1d4f=function(e){return x(e).length},t.wbg.__wbg_new_b525de17f44a8943=function(){const e=new Array;return T(e)},t.wbg.__wbg_from_67ca20fa722467e6=function(e){const n=Array.from(x(e));return T(n)},t.wbg.__wbg_push_49c286f04dd3bf59=function(e,n){return x(e).push(x(n))},t.wbg.__wbindgen_throw=function(e,n){throw new Error(de(e,n))},t}function _t(t,e){return P=t.exports,Ee.__wbindgen_wasm_module=e,$=null,F=null,D=null,P}async function Ee(t){typeof t>"u"&&(t=new URL(""+new URL("../assets/linear_algebra_bg.5dc1cdfe.wasm",import.meta.url).href,self.location));const e=yt();(typeof t=="string"||typeof Request=="function"&&t instanceof Request||typeof URL=="function"&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:a}=await vt(await t,e);return _t(n,a)}function bt(t){let e,n;return e=new dt({}),{c(){ge(e.$$.fragment)},l(a){me(e.$$.fragment,a)},m(a,i){ve(e,a,i),n=!0},p:Z,i(a){n||(Q(e.$$.fragment,a),n=!0)},o(a){V(e.$$.fragment,a),n=!1},d(a){ye(e,a)}}}function St(t){return qe(async()=>{await Ee(),console.log(mt([[1,2,3],[4,5,6],[7,8,9]],"rref"))}),[]}class Ct extends ee{constructor(e){super(),te(this,e,St,bt,ne,{})}}export{Ct as default};