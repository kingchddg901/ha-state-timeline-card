var wt=Object.defineProperty;var At=(r,t,e)=>t in r?wt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var C=(r,t,e)=>At(r,typeof t!="symbol"?t+"":t,e);var H=globalThis,B=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),rt=new WeakMap,D=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(B&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=rt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&rt.set(e,t))}return t}toString(){return this.cssText}},nt=r=>new D(typeof r=="string"?r:r+"",void 0,q),W=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new D(e,r,q)},ot=(r,t)=>{if(B)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=H.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},J=B?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return nt(e)})(r):r;var{is:kt,defineProperty:It,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:Dt,getOwnPropertySymbols:Nt,getPrototypeOf:Pt}=Object,b=globalThis,at=b.trustedTypes,Ot=at?at.emptyScript:"",Tt=b.reactiveElementPolyfillSupport,N=(r,t)=>r,Z={toAttribute(r,t){switch(t){case Boolean:r=r?Ot:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ct=(r,t)=>!kt(r,t),lt={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&It(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Ct(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let p=i?.call(this);n?.call(this,o),this.requestUpdate(t,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,s=[...Dt(e),...Nt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(J(i))}else t!==void 0&&e.push(J(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ot(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:Z).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Z;this._$Em=i;let p=o.fromAttribute(e,n.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??(s=o.getPropertyOptions(t)),!((s.hasChanged??ct)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,p=this[i];o!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,n,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[N("elementProperties")]=new Map,y[N("finalized")]=new Map,Tt?.({ReactiveElement:y}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");var O=globalThis,dt=r=>r,V=O.trustedTypes,ht=V?V.createPolicy("lit-html",{createHTML:r=>r}):void 0,gt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+x,Mt=`<${vt}>`,w=document,T=()=>w.createComment(""),M=r=>r===null||typeof r!="object"&&typeof r!="function",et=Array.isArray,Rt=r=>et(r)||typeof r?.[Symbol.iterator]=="function",K=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,S=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,mt=/"/g,yt=/^(?:script|style|textarea|title)$/i,st=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),_=st(1),Qt=st(2),Xt=st(3),A=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ft=new WeakMap,E=w.createTreeWalker(w,129);function $t(r,t){if(!et(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}var Ut=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=P;for(let p=0;p<e;p++){let d=r[p],h,l,a=-1,c=0;for(;c<d.length&&(o.lastIndex=c,l=o.exec(d),l!==null);)c=o.lastIndex,o===P?l[1]==="!--"?o=pt:l[1]!==void 0?o=ut:l[2]!==void 0?(yt.test(l[2])&&(i=RegExp("</"+l[2],"g")),o=S):l[3]!==void 0&&(o=S):o===S?l[0]===">"?(o=i??P,a=-1):l[1]===void 0?a=-2:(a=o.lastIndex-l[2].length,h=l[1],o=l[3]===void 0?S:l[3]==='"'?mt:_t):o===mt||o===_t?o=S:o===pt||o===ut?o=P:(o=S,i=void 0);let u=o===S&&r[p+1].startsWith("/>")?" ":"";n+=o===P?d+Mt:a>=0?(s.push(h),d.slice(0,a)+gt+d.slice(a)+x+u):d+x+(a===-2?p:u)}return[$t(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},R=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,p=t.length-1,d=this.parts,[h,l]=Ut(t,e);if(this.el=r.createElement(h,s),E.currentNode=this.el.content,e===2||e===3){let a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(i=E.nextNode())!==null&&d.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let a of i.getAttributeNames())if(a.endsWith(gt)){let c=l[o++],u=i.getAttribute(a).split(x),f=/([.?@])?(.*)/.exec(c);d.push({type:1,index:n,name:f[2],strings:u,ctor:f[1]==="."?Y:f[1]==="?"?Q:f[1]==="@"?X:I}),i.removeAttribute(a)}else a.startsWith(x)&&(d.push({type:6,index:n}),i.removeAttribute(a));if(yt.test(i.tagName)){let a=i.textContent.split(x),c=a.length-1;if(c>0){i.textContent=V?V.emptyScript:"";for(let u=0;u<c;u++)i.append(a[u],T()),E.nextNode(),d.push({type:2,index:++n});i.append(a[c],T())}}}else if(i.nodeType===8)if(i.data===vt)d.push({type:2,index:n});else{let a=-1;for(;(a=i.data.indexOf(x,a+1))!==-1;)d.push({type:7,index:n}),a+=x.length-1}n++}}static createElement(t,e){let s=w.createElement("template");return s.innerHTML=t,s}};function k(r,t,e=r,s){if(t===A)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=M(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=k(r,i._$AS(r,t.values),i,s)),t}var G=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??w).importNode(e,!0);E.currentNode=i;let n=E.nextNode(),o=0,p=0,d=s[0];for(;d!==void 0;){if(o===d.index){let h;d.type===2?h=new U(n,n.nextSibling,this,t):d.type===1?h=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(h=new tt(n,this,t)),this._$AV.push(h),d=s[++p]}o!==d?.index&&(n=E.nextNode(),o++)}return E.currentNode=w,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},U=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),M(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Rt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=R.createElement($t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new G(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new R(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=dt(t).nextSibling;dt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=k(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let p=t,d,h;for(t=n[0],d=0;d<n.length-1;d++)h=k(this,p[s+d],e,d),h===A&&(h=this._$AH[d]),o||(o=!M(h)||h!==this._$AH[d]),h===m?t=m:t!==m&&(t+=(h??"")+n[d+1]),this._$AH[d]=h}o&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Y=class extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},Q=class extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},X=class extends I{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??m)===A)return;let s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},tt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}};var zt=O.litHtmlPolyfillSupport;zt?.(R,U),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.3");var bt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new U(t.insertBefore(T(),n),n,void 0,e??{})}return i._$AI(r),i};var z=globalThis,$=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};$._$litElement$=!0,$.finalized=!0,z.litElementHydrateSupport?.({LitElement:$});var Lt=z.litElementPolyfillSupport;Lt?.({LitElement:$});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");function j(r,t){if(!r)return"";let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(r),s={};for(let n of e)s[n.type]=n.value;let i=s.hour==="24"?"00":s.hour;return`${s.year}-${s.month}-${s.day}T${i}:${s.minute}`}function it(r,t){if(!r)return null;let e=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(r);if(!e)return null;let[,s,i,n,o,p,d]=e,h=new Date(`${s}-${i}-${n}T${o}:${p}:${d||"00"}.000Z`);if(isNaN(h.getTime()))return null;let l;try{l=Et(h,t)}catch{return null}if(!Number.isFinite(l))return null;let a=new Date(h.getTime()-l);return isNaN(a.getTime())?null:a}function Et(r,t){let e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(r),s={};for(let n of e)s[n.type]=n.value;return Date.UTC(+s.year,+s.month-1,+s.day,s.hour==="24"?0:+s.hour,+s.minute,+(s.second||0))-r.getTime()}function xt(r,t){let e=new Date(r);if(isNaN(e.getTime()))return"";let s=new Intl.DateTimeFormat("en-GB",{timeZone:t,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(e),i=new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(e);return`${s}  ${i}`}function Ft(r,t){return j(r,t).replace("T","_").replace(":","-")}function jt(r){if(r==null||isNaN(r))return"\u2014";let t=Math.max(0,Math.round(r));return t<60?`${t}s`:t<3600?`${Math.floor(t/60)}m ${String(t%60).padStart(2,"0")}s`:`${Math.floor(t/3600)}h ${String(Math.floor(t%3600/60)).padStart(2,"0")}m`}function Ht(r,t){let e=new Date(r);if(isNaN(e.getTime()))return r;let s=j(e,t),i=new Intl.DateTimeFormat("en-GB",{timeZone:t,second:"2-digit",hour12:!1}).format(e),n=Et(e,t),o=n>=0?"+":"-",p=Math.abs(n),d=String(Math.floor(p/36e5)).padStart(2,"0"),h=String(Math.floor(p%36e5/6e4)).padStart(2,"0");return`${s}:${i}${o}${d}:${h}`}var St="ha-state-timeline-card:v1",Bt=["_selectedDeviceId","_selectedEntities","_addedEntities","_driverEntityId","_beginInput","_endInput"],L=class extends ${constructor(){super(),this._config={},this._selectedDeviceId=null,this._selectedEntities=new Set,this._addedEntities=new Set,this._driverEntityId=null,this._beginInput="",this._endInput="",this._loading=!1,this._error="",this._steps=[],this._currentStep=0,this._markStart=null,this._markEnd=null,this._expanded=new Set,this._reference=null,this._refCurrentStep=0,this._entityCollapsed=!1,this._collapsedDomains=new Set}connectedCallback(){super.connectedCallback();try{let t=localStorage.getItem(St);if(!t)return;let e=JSON.parse(t);e.selectedDeviceId&&(this._selectedDeviceId=e.selectedDeviceId),Array.isArray(e.selectedEntities)&&(this._selectedEntities=new Set(e.selectedEntities)),Array.isArray(e.addedEntities)&&(this._addedEntities=new Set(e.addedEntities)),e.driverEntityId&&(this._driverEntityId=e.driverEntityId),typeof e.beginInput=="string"&&(this._beginInput=e.beginInput),typeof e.endInput=="string"&&(this._endInput=e.endInput)}catch{}}updated(t){if(Bt.some(e=>t.has(e)))try{localStorage.setItem(St,JSON.stringify({selectedDeviceId:this._selectedDeviceId,selectedEntities:Array.from(this._selectedEntities),addedEntities:Array.from(this._addedEntities),driverEntityId:this._driverEntityId,beginInput:this._beginInput,endInput:this._endInput}))}catch{}}setConfig(t){let e=t||{},s=Number(e.fast_flip_threshold_seconds),i=Number(e.recorder_keep_days);this._config={fast_flip_threshold_seconds:Number.isFinite(s)&&s>0?s:5,recorder_keep_days:Number.isFinite(i)&&i>0?i:10}}static getConfigElement(){return document.createElement("ha-state-timeline-card-editor")}static getStubConfig(){return{fast_flip_threshold_seconds:5,recorder_keep_days:10}}getCardSize(){return 6}get _timeZone(){return this.hass&&this.hass.config&&this.hass.config.time_zone||"UTC"}_entitiesForDevice(t){if(!t||!this.hass||!this.hass.entities)return{};let e={};for(let s of Object.keys(this.hass.entities)){let i=this.hass.entities[s];if(i.device_id!==t||i.disabled_by||i.hidden_by)continue;let n=s.split(".")[0];(e[n]=e[n]||[]).push(s)}for(let s of Object.keys(e))e[s].sort();return e}_friendlyName(t){if(!this.hass)return t;let e=this.hass.states&&this.hass.states[t];if(e&&e.attributes&&e.attributes.friendly_name)return e.attributes.friendly_name;let s=this.hass.entities&&this.hass.entities[t];return s&&s.name?s.name:t}_onDeviceChanged(t){this._selectedDeviceId=t.target.value||null}_sortedDevices(){if(!this.hass||!this.hass.devices)return[];let t=this.hass.areas||{};return Object.values(this.hass.devices).filter(e=>!e.disabled_by).map(e=>({id:e.id,label:e.name_by_user||e.name||e.id,area:e.area_id&&t[e.area_id]?t[e.area_id].name:""})).sort((e,s)=>e.label.localeCompare(s.label))}_toggleEntity(t){let e=new Set(this._selectedEntities);e.has(t)?(e.delete(t),this._driverEntityId===t&&(this._driverEntityId=null)):e.add(t),this._selectedEntities=e}_setDriver(t){if(this._driverEntityId===t){this._driverEntityId=null;return}if(this._driverEntityId=t,!this._selectedEntities.has(t)){let e=new Set(this._selectedEntities);e.add(t),this._selectedEntities=e}}_selectAllForDevice(){let t=this._entitiesForDevice(this._selectedDeviceId),e=new Set(this._selectedEntities);for(let s of Object.keys(t))for(let i of t[s])e.add(i);this._selectedEntities=e}_toggleDomain(t){let e=new Set(this._collapsedDomains);e.has(t)?e.delete(t):e.add(t),this._collapsedDomains=e}_toggleAllInDomain(t){let e=this._entitiesForDevice(this._selectedDeviceId)[t]||[],s=e.length>0&&e.every(n=>this._selectedEntities.has(n)),i=new Set(this._selectedEntities);if(s)for(let n of e)i.delete(n),this._driverEntityId===n&&(this._driverEntityId=null);else for(let n of e)i.add(n);this._selectedEntities=i}_deselectAllForDevice(){let t=this._entitiesForDevice(this._selectedDeviceId),e=new Set(this._selectedEntities);for(let s of Object.keys(t))for(let i of t[s])e.delete(i),this._driverEntityId===i&&(this._driverEntityId=null);this._selectedEntities=e}_removeAddedEntity(t){let e=new Set(this._addedEntities);e.delete(t),this._addedEntities=e;let s=new Set(this._selectedEntities);s.delete(t),this._selectedEntities=s,this._driverEntityId===t&&(this._driverEntityId=null)}_onAddEntity(t){let e=t.target.value;if(!e)return;if(!this.hass||!this.hass.states||!this.hass.states[e]){t.target.value="";return}let s=new Set(this._addedEntities);s.add(e),this._addedEntities=s;let i=new Set(this._selectedEntities);i.add(e),this._selectedEntities=i,t.target.value=""}_setPreset(t){let e=new Date;this._beginInput=j(new Date(e.getTime()-t*6e4),this._timeZone),this._endInput=j(e,this._timeZone)}_setEndToNow(){this._endInput=j(new Date,this._timeZone)}_onBeginInput(t){this._beginInput=t.target.value}_onEndInput(t){this._endInput=t.target.value}async _search(){this._error="";let t=Array.from(this._selectedEntities);if(t.length===0){this._error="Select at least one entity";return}if(!this._beginInput||!this._endInput){this._error="Set a time range";return}let e=this._timeZone,s=it(this._beginInput,e),i=it(this._endInput,e);if(!s||!i){this._error=`Couldn't parse time inputs (begin="${this._beginInput}" end="${this._endInput}" tz="${e}")`;return}if(i<=s){this._error="End must be after Begin";return}this._loading=!0;try{let n=await this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),end_time:i.toISOString(),entity_ids:t,minimal_response:!1,no_attributes:!1,significant_changes_only:!1}),o=this._buildSteps(n,t);if(o.length===0){this._error="No state changes found in this time range for the selected entities",this._steps=[];return}this._steps=o,this._currentStep=0,this._markStart=null,this._markEnd=null,this._expanded=new Set}catch(n){this._error=`Query failed: ${n&&n.message?n.message:n}`,this._steps=[]}finally{this._loading=!1}}_buildSteps(t,e){let s=this._timeZone,i={};for(let h of e){let a=(t[h]||[]).map(c=>{let u=typeof c.lu=="number"?c.lu*1e3:null,f=typeof c.lc=="number"?c.lc*1e3:u,g=f!==null?f:u;return{ts:(g!==null?new Date(g):new Date(c.last_changed||c.last_updated)).toISOString(),state:c.s!==void 0?c.s:c.state,attributes:c.a||c.attributes||{}}}).sort((c,u)=>c.ts<u.ts?-1:c.ts>u.ts?1:0);for(let c=0;c<a.length;c++)a[c].durationSeconds=c<a.length-1?(new Date(a[c+1].ts).getTime()-new Date(a[c].ts).getTime())/1e3:null;i[h]={list:a,idx:0}}let n=[];for(let h of e)for(let l of i[h].list)n.push({ts:l.ts,entityId:h});n.sort((h,l)=>h.ts<l.ts?-1:h.ts>l.ts?1:h.entityId.localeCompare(l.entityId));let o=this._config.fast_flip_threshold_seconds,p=this._driverEntityId,d=[];for(let h of n){let l={};for(let a of e){let c=i[a];for(;c.idx+1<c.list.length&&c.list[c.idx+1].ts<=h.ts;)c.idx++;let u=c.list[c.idx];if(!u){l[a]={entityId:a,friendlyName:this._friendlyName(a),state:"unknown",previousState:null,attributes:{},durationSeconds:null,changed:!1,isDriver:a===p,isFastFlip:!1,timezone:s};continue}let f=c.idx>0?c.list[c.idx-1]:null;l[a]={entityId:a,friendlyName:this._friendlyName(a),state:u.state,previousState:f?f.state:null,attributes:u.attributes,durationSeconds:u.durationSeconds,changed:a===h.entityId,isDriver:a===p,isFastFlip:u.durationSeconds!==null&&u.durationSeconds<o,timezone:s}}d.push({timestamp:h.ts,changedEntityId:h.entityId,entityStates:l})}return d}_stepPrev(){this._currentStep>0&&(this._currentStep-=1)}_stepNext(){this._currentStep<this._steps.length-1&&(this._currentStep+=1)}_refStepPrev(){this._refCurrentStep>0&&(this._refCurrentStep-=1)}_refStepNext(){let t=this._reference&&this._reference.steps.length-1||0;this._refCurrentStep<t&&(this._refCurrentStep+=1)}_doMarkStart(){this._markStart=this._currentStep}_doMarkEnd(){this._markEnd=this._currentStep}_toggleExpand(t){let e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_exportAll(){this._steps.length!==0&&this._writeExport(0,this._steps.length-1)}_exportSelection(){if(this._markStart===null||this._markEnd===null)return;let t=Math.min(this._markStart,this._markEnd),e=Math.max(this._markStart,this._markEnd);this._writeExport(t,e)}_writeExport(t,e){let s=this._timeZone,i=this._steps.slice(t,e+1),n=this._driverEntityId,o=n?this._friendlyName(n):null,p={exported_at:new Date().toISOString(),timezone:s,driver_entity_id:n,driver_friendly_name:o,range_start:i[0].timestamp,range_end:i[i.length-1].timestamp,step_count:i.length,steps:i.map((f,g)=>({step_index:g+1,timestamp_utc:f.timestamp,timestamp_local:Ht(f.timestamp,s),changed_entity_id:f.changedEntityId,entities:this._orderedEntityList(f).map(v=>({entity_id:v.entityId,friendly_name:v.friendlyName,state:v.state,previous_state:v.previousState,duration_seconds:v.durationSeconds,changed:v.changed,is_driver:v.isDriver,is_fast_flip:v.isFastFlip,attributes:v.attributes}))}))},d=Ft(new Date(i[0].timestamp),s),h=o?o.toLowerCase().replace(/\s+/g,"_"):null,l=h?`${h}_${d}.json`:`state_timeline_${d}.json`,a=new Blob([JSON.stringify(p,null,2)],{type:"application/json"}),c=URL.createObjectURL(a),u=document.createElement("a");u.href=c,u.download=l,u.click(),setTimeout(()=>URL.revokeObjectURL(c),1e3)}_orderedEntityList(t){let e=Object.keys(t.entityStates);return e.sort((s,i)=>{let n=t.entityStates[s].isDriver,o=t.entityStates[i].isDriver;return n&&!o?-1:o&&!n?1:s.localeCompare(i)}),e.map(s=>t.entityStates[s])}_normalizeReference(t){return{...t,steps:t.steps.map(e=>({timestamp:e.timestamp_utc,changedEntityId:e.changed_entity_id,entityStates:Object.fromEntries((e.entities||[]).map(s=>[s.entity_id,{entityId:s.entity_id,friendlyName:s.friendly_name,state:s.state,previousState:s.previous_state,attributes:s.attributes||{},durationSeconds:s.duration_seconds,changed:!!s.changed,isDriver:!!s.is_driver,isFastFlip:!!s.is_fast_flip}]))}))}}async _onImportFile(t){let e=t.target.files&&t.target.files[0];if(e){try{let s=JSON.parse(await e.text());if(!s||!Array.isArray(s.steps))throw new Error("missing steps array");this._reference=this._normalizeReference(s),this._refCurrentStep=0,this._error=""}catch{this._error="Invalid timeline JSON file",this._reference=null}t.target.value=""}}render(){if(!this.hass)return _`<ha-card><div class="empty">Waiting for Home Assistant…</div></ha-card>`;let t=this._steps.length>0,e=!!this._reference;return _`
      <ha-card>
        <div class="card-content">
          ${this._renderEntitySelection()}
          ${this._renderTimeRange()}
          ${this._renderSearchSection()}
          ${t||e?_`
            <div class="stepper-container ${t&&e?"twin":""}">
              ${t?this._renderStepper():""}
              ${e?this._renderReferencePanel():""}
            </div>
          `:""}
          ${this._renderImportSection()}
        </div>
      </ha-card>
    `}_renderEntitySelection(){let t=this._entitiesForDevice(this._selectedDeviceId),e=Object.keys(t).length>0,s=Array.from(this._addedEntities),i=this._sortedDevices(),n=this.hass&&this.hass.states?Object.keys(this.hass.states).sort():[],o=this._entityCollapsed,p=this._selectedEntities.size,d=this._driverEntityId?this._friendlyName(this._driverEntityId):null,h=o?`${p} ${p===1?"entity":"entities"}${d?` \xB7 \u2605 ${d}`:""}`:"";return _`
      <section class="block">
        <h3 class="collapsible" @click=${()=>this._entityCollapsed=!o}>
          <span class="chevron">${o?"\u25B6":"\u25BC"}</span>
          Entities
          ${o?_`<span class="header-summary">${h}</span>`:""}
        </h3>
        ${o?"":_`
        <label class="picker-label">Device
          <select class="native-picker" .value=${this._selectedDeviceId||""} @change=${this._onDeviceChanged}>
            <option value="">— Select a device —</option>
            ${i.map(l=>_`
              <option value=${l.id} ?selected=${l.id===this._selectedDeviceId}>
                ${l.area?`${l.label} \u2014 ${l.area}`:l.label}
              </option>
            `)}
          </select>
        </label>
        ${e?_`
          <div class="row links">
            <a @click=${this._selectAllForDevice}>Select all</a>
            <a @click=${this._deselectAllForDevice}>Deselect all</a>
          </div>
          ${Object.keys(t).sort().map(l=>{let a=t[l],c=this._collapsedDomains.has(l),u=a.filter(g=>this._selectedEntities.has(g)).length,f=u===a.length;return _`
              <div class="group-header" @click=${()=>this._toggleDomain(l)}>
                <span class="chevron">${c?"\u25B6":"\u25BC"}</span>
                <span class="group-label-text">${l}</span>
                <span class="group-count">${u}/${a.length}</span>
                <a class="group-action" @click=${g=>{g.stopPropagation(),this._toggleAllInDomain(l)}}>
                  ${f?"Deselect all":"Select all"}
                </a>
              </div>
              ${c?"":a.map(g=>this._renderEntityRow(g))}
            `})}
        `:""}
        ${s.length>0?_`
          <div class="group-label">other</div>
          ${s.map(l=>this._renderEntityRow(l))}
        `:""}
        <label class="picker-label">Add entity
          <input class="native-picker" list="hstc-entity-list" placeholder="domain.entity_id"
            @change=${this._onAddEntity} />
          <datalist id="hstc-entity-list">
            ${n.map(l=>_`<option value=${l}></option>`)}
          </datalist>
        </label>
        <div class="hint">★ marks the driver — shown first in the stepper and used as the export filename prefix. × removes a manually added entity.</div>
        `}
      </section>
    `}_renderEntityRow(t){let e=this._selectedEntities.has(t),s=this._driverEntityId===t,i=this._addedEntities.has(t);return _`
      <div class="entity-row">
        <input type="checkbox" .checked=${e} @change=${()=>this._toggleEntity(t)} />
        <button class="star ${s?"driver":""}" title="Set as driver"
          @click=${()=>this._setDriver(t)}>★</button>
        <div class="entity-label">
          <div class="primary">${this._friendlyName(t)}</div>
          <div class="secondary">${t}</div>
        </div>
        ${i?_`<button class="remove-btn" title="Remove entity"
          @click=${()=>this._removeAddedEntity(t)}>×</button>`:""}
      </div>
    `}_renderTimeRange(){return _`
      <section class="block">
        <h3>Time range</h3>
        <div class="time-row">
          <label>Begin
            <input type="datetime-local" .value=${this._beginInput} @input=${this._onBeginInput} />
          </label>
          <label>End
            <input type="datetime-local" .value=${this._endInput} @input=${this._onEndInput} />
          </label>
          <div class="chips">
            <button class="chip" @click=${()=>this._setPreset(10)}>10m</button>
            <button class="chip" @click=${()=>this._setPreset(15)}>15m</button>
            <button class="chip" @click=${()=>this._setPreset(20)}>20m</button>
            <button class="chip" @click=${()=>this._setPreset(60*24)}>24h</button>
            <button class="chip" @click=${this._setEndToNow}>Now</button>
          </div>
        </div>
        ${this._renderRetentionWarning()}
      </section>
    `}_renderRetentionWarning(){if(!this._beginInput)return"";let t=it(this._beginInput,this._timeZone);if(!t)return"";let e=this._config.recorder_keep_days,s=new Date(Date.now()-e*864e5);return t>=s?"":_`<div class="retention-warning">
      Begin is older than your recorder retention (${e} days). Entries past the
      cutoff have likely been purged — this query may return empty or partial results.
    </div>`}_renderSearchSection(){return _`
      <section class="block">
        <button class="primary-btn" @click=${this._search} ?disabled=${this._loading}>
          ${this._loading?"Searching\u2026":"Search"}
        </button>
        ${this._error?_`<div class="error">${this._error}</div>`:""}
      </section>
    `}_renderStepper(){let t=this._steps[this._currentStep],e=this._orderedEntityList(t),s=this._steps.length;return _`
      <section class="block stepper">
        <div class="stepper-header">
          <span>Step ${this._currentStep+1} of ${s}</span>
          <span class="ts">${xt(t.timestamp,this._timeZone)}</span>
        </div>
        <div class="entity-table">
          <div class="table-header">
            <div>Entity</div><div>Previous</div><div>Current</div><div>Duration</div><div></div>
          </div>
          ${e.map(i=>this._renderStepRow(i))}
        </div>
        <div class="nav-row">
          <button class="nav-btn" ?disabled=${this._currentStep===0} @click=${this._stepPrev}>◀ Prev</button>
          <div class="mark-buttons">
            <button class="mark-btn ${this._markStart!==null?"marked":""}" @click=${this._doMarkStart}>
              ${this._markStart!==null?`Start: Step ${this._markStart+1}`:"Mark Start"}
            </button>
            <button class="mark-btn ${this._markEnd!==null?"marked":""}" @click=${this._doMarkEnd}>
              ${this._markEnd!==null?`End: Step ${this._markEnd+1}`:"Mark End"}
            </button>
          </div>
          <button class="nav-btn" ?disabled=${this._currentStep===s-1} @click=${this._stepNext}>Next ▶</button>
        </div>
        <div class="export-row">
          <button class="export-btn" ?disabled=${this._markStart===null||this._markEnd===null}
            @click=${this._exportSelection}>Export Selection</button>
          <button class="export-btn" @click=${this._exportAll}>Export All</button>
        </div>
        <div class="hint">⚡ = state change shorter than ${this._config.fast_flip_threshold_seconds}s. ▶ on a row expands the raw attributes JSON. Mark Start + Mark End enables Export Selection.</div>
      </section>
    `}_renderStepRow(t,e=!1){let s=!e&&this._expanded.has(t.entityId),i=["step-row",t.changed&&"changed",t.isFastFlip&&"fast-flip",t.isDriver&&"driver-row"].filter(Boolean).join(" "),n=t.durationSeconds===null?"current":jt(t.durationSeconds);return _`
      <div class=${i}>
        <div class="cell entity-cell">
          ${t.isDriver?_`<span class="star-inline">★</span>`:""}
          <span>${t.friendlyName}</span>
        </div>
        <div class="cell mono">${t.previousState??"\u2014"}</div>
        <div class="cell mono current ${t.changed?"highlight":"muted"}">${t.state}</div>
        <div class="cell">
          ${t.changed?n:"\u2014"}
          ${t.changed&&t.isFastFlip?_`<span class="flip-icon" title="Fast flip">⚡</span>`:""}
        </div>
        <div class="cell">
          ${e?"":_`<button class="expand-btn" @click=${()=>this._toggleExpand(t.entityId)}>${s?"\u25BC":"\u25B6"}</button>`}
        </div>
      </div>
      ${s?_`<div class="attr-block"><pre>${JSON.stringify(t.attributes,null,2)}</pre></div>`:""}
    `}_renderImportSection(){return _`
      <section class="block">
        <label class="import-label">
          <input type="file" accept=".json,application/json" @change=${this._onImportFile} />
          <span class="export-btn">Load Reference JSON</span>
        </label>
      </section>
    `}_renderReferencePanel(){let t=this._reference;if(!t.steps||t.steps.length===0)return"";let e=Math.min(this._refCurrentStep,t.steps.length-1),s=t.steps[e],i=this._orderedEntityList(s),n=t.timezone||this._timeZone,o=t.steps.length;return _`
      <section class="block stepper reference">
        <div class="stepper-header">
          <span>Ref ${e+1} of ${o}</span>
          <span class="ts">${xt(s.timestamp,n)}</span>
        </div>
        <div class="entity-table">
          <div class="table-header">
            <div>Entity</div><div>Previous</div><div>Current</div><div>Duration</div><div></div>
          </div>
          ${i.map(p=>this._renderStepRow(p,!0))}
        </div>
        <div class="nav-row">
          <button class="nav-btn" ?disabled=${e===0} @click=${this._refStepPrev}>◀ Prev</button>
          <span class="ref-label">${t.driver_friendly_name||"No driver"}</span>
          <button class="nav-btn" ?disabled=${e===o-1} @click=${this._refStepNext}>Next ▶</button>
        </div>
      </section>
    `}};C(L,"properties",{hass:{attribute:!1},_config:{state:!0},_selectedDeviceId:{state:!0},_selectedEntities:{state:!0},_addedEntities:{state:!0},_driverEntityId:{state:!0},_beginInput:{state:!0},_endInput:{state:!0},_loading:{state:!0},_error:{state:!0},_steps:{state:!0},_currentStep:{state:!0},_markStart:{state:!0},_markEnd:{state:!0},_expanded:{state:!0},_reference:{state:!0},_refCurrentStep:{state:!0},_entityCollapsed:{state:!0},_collapsedDomains:{state:!0}}),C(L,"styles",W`
    :host { display: block; }
    ha-card { padding: 0; }
    .card-content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .block { display: flex; flex-direction: column; gap: 8px; }
    h3 { margin: 0; font-size: 0.95em; font-weight: 500; color: var(--secondary-text-color);
         text-transform: uppercase; letter-spacing: 0.04em; }
    h3.collapsible { cursor: pointer; user-select: none; display: flex;
                     align-items: center; gap: 6px; }
    h3.collapsible:hover { color: var(--primary-text-color); }
    h3 .chevron { font-size: 0.7em; color: var(--secondary-text-color); }
    h3 .header-summary { font-weight: 400; text-transform: none; letter-spacing: 0;
                         color: var(--primary-text-color); margin-left: 8px;
                         font-size: 0.95em; }
    .empty { padding: 24px; color: var(--secondary-text-color); text-align: center; }
    .row { display: flex; gap: 8px; align-items: center; }
    .links { gap: 16px; font-size: 0.9em; }
    .links a { color: var(--primary-color); cursor: pointer; text-decoration: underline; }
    .group-label { margin-top: 8px; font-size: 0.75em; text-transform: uppercase;
                   color: var(--secondary-text-color); letter-spacing: 0.06em;
                   border-bottom: 1px solid var(--divider-color); padding-bottom: 2px; }
    .group-header { display: flex; align-items: center; gap: 8px; margin-top: 8px;
                    padding-bottom: 2px; border-bottom: 1px solid var(--divider-color);
                    cursor: pointer; user-select: none; }
    .group-header:hover .group-label-text { color: var(--primary-text-color); }
    .group-label-text { font-size: 0.75em; text-transform: uppercase;
                        letter-spacing: 0.06em; color: var(--secondary-text-color); }
    .group-count { font-size: 0.75em; color: var(--secondary-text-color);
                   font-family: var(--code-font-family, monospace); }
    .group-action { margin-left: auto; font-size: 0.8em; color: var(--primary-color);
                    cursor: pointer; text-decoration: underline; }
    .picker-label { display: flex; flex-direction: column; gap: 2px;
                    font-size: 0.8em; color: var(--secondary-text-color); }
    .native-picker { background: var(--card-background-color);
      color: var(--primary-text-color); border: 1px solid var(--divider-color);
      border-radius: 4px; padding: 6px 8px; font-family: inherit; font-size: 0.95em;
      width: 100%; box-sizing: border-box; }
    .native-picker:focus { outline: none; border-color: var(--primary-color); }
    .entity-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
    .entity-row input[type='checkbox'] { accent-color: var(--primary-color); }
    .star { background: none; border: none; cursor: pointer; font-size: 1.2em;
            color: var(--disabled-color); padding: 0 2px; }
    .star.driver { color: var(--primary-color); }
    .entity-label .primary { font-size: 0.95em; color: var(--primary-text-color); }
    .entity-label .secondary { font-size: 0.8em; color: var(--secondary-text-color);
                               font-family: var(--code-font-family, monospace); }
    .remove-btn { background: none; border: none; cursor: pointer;
                  color: var(--secondary-text-color); font-size: 1.2em;
                  line-height: 1; padding: 0 6px; margin-left: auto; }
    .remove-btn:hover { color: var(--error-color); }
    .hint { font-size: 0.8em; color: var(--secondary-text-color);
            font-style: italic; padding: 4px 0; line-height: 1.4; }

    .time-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: end; }
    .time-row label { display: flex; flex-direction: column; font-size: 0.8em;
                      color: var(--secondary-text-color); gap: 2px; }
    .time-row input[type='datetime-local'] { background: var(--card-background-color);
      color: var(--primary-text-color); border: 1px solid var(--divider-color);
      border-radius: 4px; padding: 4px 6px; font-family: inherit; }
    .chips { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
    .chip { background: transparent; color: var(--primary-color);
            border: 1px solid var(--primary-color); border-radius: 999px;
            padding: 2px 10px; font-size: 0.85em; cursor: pointer; }
    .chip:hover { background: var(--primary-color); color: var(--text-primary-color, white); }

    .primary-btn { background: var(--primary-color); color: var(--text-primary-color, white);
      border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;
      font-size: 0.95em; align-self: flex-start; }
    .primary-btn[disabled] { opacity: 0.6; cursor: wait; }
    .error { color: var(--error-color); font-size: 0.9em; }
    .retention-warning { color: var(--warning-color); font-size: 0.85em;
                         padding: 4px 0; line-height: 1.3; }

    .stepper-header { display: flex; justify-content: space-between; align-items: baseline;
                      padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .stepper-header .ts { font-family: var(--code-font-family, monospace); color: var(--secondary-text-color); }
    .entity-table { display: flex; flex-direction: column; }
    .table-header, .step-row { display: grid; grid-template-columns: 2fr 1.4fr 1.4fr 1fr 32px;
                               gap: 8px; align-items: center; padding: 6px 8px;
                               border-left: 3px solid transparent; }
    .table-header { font-size: 0.75em; color: var(--secondary-text-color);
                    text-transform: uppercase; border-bottom: 1px solid var(--divider-color); }
    /* Subtle 3px left border on changed rows. Background change would be too heavy. */
    .step-row.changed { border-left-color: var(--primary-color); }
    .step-row.fast-flip { background: color-mix(in srgb, var(--warning-color) 10%, transparent); }
    .cell { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .mono { font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .current.highlight { font-weight: 600; color: var(--primary-text-color); }
    .current.muted { color: var(--secondary-text-color); }
    .entity-cell { display: flex; align-items: center; gap: 4px; }
    .star-inline { color: var(--primary-color); }
    .flip-icon { color: var(--warning-color); margin-left: 4px; }
    .expand-btn { background: none; border: none; color: var(--secondary-text-color);
                  cursor: pointer; font-size: 0.85em; }
    .attr-block { background: var(--secondary-background-color); padding: 8px;
                  border-radius: 4px; margin: 4px 0; }
    .attr-block pre { margin: 0; font-family: var(--code-font-family, monospace);
                      font-size: 0.85em; white-space: pre; overflow-x: auto;
                      color: var(--primary-text-color); }

    .nav-row { display: flex; justify-content: space-between; align-items: center;
               gap: 8px; margin-top: 8px; }
    .nav-btn, .mark-btn, .export-btn { background: transparent; color: var(--primary-text-color);
      border: 1px solid var(--divider-color); border-radius: 4px;
      padding: 6px 12px; cursor: pointer; font-size: 0.9em; }
    .nav-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
    .mark-buttons { display: flex; gap: 8px; }
    .mark-btn.marked { border-color: var(--success-color); color: var(--success-color); }
    .export-row { display: flex; gap: 8px; margin-top: 8px; }
    .export-btn[disabled] { opacity: 0.4; cursor: not-allowed; }

    .import-label { display: inline-block; cursor: pointer; }
    .import-label input[type='file'] { display: none; }

    /* Twin layout: side-by-side when both live and reference are visible.
       Stacks back to a column on narrow viewports via flex-wrap. */
    .stepper-container { display: flex; flex-direction: column; gap: 16px; }
    .stepper-container.twin { flex-direction: row; align-items: flex-start; flex-wrap: wrap; }
    .stepper-container.twin > section { flex: 1 1 360px; min-width: 0; }
    .reference .stepper-header { border-bottom-color: var(--primary-color); opacity: 0.85; }
    .ref-label { color: var(--secondary-text-color); font-size: 0.85em;
                 font-family: var(--code-font-family, monospace); }
  `);customElements.define("ha-state-timeline-card",L);var Wt=[{name:"fast_flip_threshold_seconds",required:!1,selector:{number:{min:1,max:600,mode:"box",unit_of_measurement:"s"}}},{name:"recorder_keep_days",required:!1,selector:{number:{min:1,max:3650,mode:"box",unit_of_measurement:"days"}}}],Vt={fast_flip_threshold_seconds:"Fast flip threshold (seconds)",recorder_keep_days:"Recorder retention (days)"},qt={fast_flip_threshold_seconds:"State changes shorter than this get a \u26A1 flag and row highlight.",recorder_keep_days:"Match your recorder purge_keep_days. Used only to warn when Begin exceeds retention."},F=class extends ${setConfig(t){this._config={...t}}_onValueChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?_``:_`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Wt}
        .computeLabel=${t=>Vt[t.name]||t.name}
        .computeHelper=${t=>qt[t.name]||""}
        @value-changed=${this._onValueChanged}
      ></ha-form>
    `}};C(F,"properties",{hass:{attribute:!1},_config:{state:!0}}),C(F,"styles",W`
    ha-form { display: block; padding: 8px 0; }
  `);customElements.define("ha-state-timeline-card-editor",F);window.customCards=window.customCards||[];window.customCards.push({type:"ha-state-timeline-card",name:"State Timeline Card",description:"Step through historical state transitions across multiple entities. Built for debugging automations and integrations."});
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
