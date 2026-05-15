var wt=Object.defineProperty;var At=(r,t,e)=>t in r?wt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var I=(r,t,e)=>At(r,typeof t!="symbol"?t+"":t,e);var j=globalThis,H=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),it=new WeakMap,C=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(H&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&it.set(e,t))}return t}toString(){return this.cssText}},rt=r=>new C(typeof r=="string"?r:r+"",void 0,V),B=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new C(e,r,V)},nt=(r,t)=>{if(H)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=j.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},q=H?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return rt(e)})(r):r;var{is:kt,defineProperty:It,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:Dt,getOwnPropertySymbols:Nt,getPrototypeOf:Pt}=Object,$=globalThis,ot=$.trustedTypes,Ot=ot?ot.emptyScript:"",Rt=$.reactiveElementPolyfillSupport,D=(r,t)=>r,Z={toAttribute(r,t){switch(t){case Boolean:r=r?Ot:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},lt=(r,t)=>!kt(r,t),at={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:lt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=at){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&It(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Ct(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let h=i?.call(this);n?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??at}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let e=this.properties,s=[...Dt(e),...Nt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(q(i))}else t!==void 0&&e.push(q(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:Z).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Z;this._$Em=i;let h=o.fromAttribute(e,n.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??(s=o.getPropertyOptions(t)),!((s.hasChanged??lt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,n,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[D("elementProperties")]=new Map,y[D("finalized")]=new Map,Rt?.({ReactiveElement:y}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.2");var P=globalThis,ct=r=>r,W=P.trustedTypes,dt=W?W.createPolicy("lit-html",{createHTML:r=>r}):void 0,mt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+b,Tt=`<${gt}>`,E=document,O=()=>E.createComment(""),R=r=>r===null||typeof r!="object"&&typeof r!="function",tt=Array.isArray,Mt=r=>tt(r)||typeof r?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,pt=/>/g,S=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,_t=/"/g,yt=/^(?:script|style|textarea|title)$/i,et=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),u=et(1),Qt=et(2),Xt=et(3),w=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),ft=new WeakMap,x=E.createTreeWalker(E,129);function vt(r,t){if(!tt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var Ut=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=N;for(let h=0;h<e;h++){let l=r[h],c,p,a=-1,d=0;for(;d<l.length&&(o.lastIndex=d,p=o.exec(l),p!==null);)d=o.lastIndex,o===N?p[1]==="!--"?o=ht:p[1]!==void 0?o=pt:p[2]!==void 0?(yt.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=S):p[3]!==void 0&&(o=S):o===S?p[0]===">"?(o=i??N,a=-1):p[1]===void 0?a=-2:(a=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?S:p[3]==='"'?_t:ut):o===_t||o===ut?o=S:o===ht||o===pt?o=N:(o=S,i=void 0);let _=o===S&&r[h+1].startsWith("/>")?" ":"";n+=o===N?l+Tt:a>=0?(s.push(c),l.slice(0,a)+mt+l.slice(a)+b+_):l+b+(a===-2?h:_)}return[vt(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},T=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,h=t.length-1,l=this.parts,[c,p]=Ut(t,e);if(this.el=r.createElement(c,s),x.currentNode=this.el.content,e===2||e===3){let a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(i=x.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let a of i.getAttributeNames())if(a.endsWith(mt)){let d=p[o++],_=i.getAttribute(a).split(b),m=/([.?@])?(.*)/.exec(d);l.push({type:1,index:n,name:m[2],strings:_,ctor:m[1]==="."?G:m[1]==="?"?Y:m[1]==="@"?Q:k}),i.removeAttribute(a)}else a.startsWith(b)&&(l.push({type:6,index:n}),i.removeAttribute(a));if(yt.test(i.tagName)){let a=i.textContent.split(b),d=a.length-1;if(d>0){i.textContent=W?W.emptyScript:"";for(let _=0;_<d;_++)i.append(a[_],O()),x.nextNode(),l.push({type:2,index:++n});i.append(a[d],O())}}}else if(i.nodeType===8)if(i.data===gt)l.push({type:2,index:n});else{let a=-1;for(;(a=i.data.indexOf(b,a+1))!==-1;)l.push({type:7,index:n}),a+=b.length-1}n++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};function A(r,t,e=r,s){if(t===w)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=R(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=A(r,i._$AS(r,t.values),i,s)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);x.currentNode=i;let n=x.nextNode(),o=0,h=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new M(n,n.nextSibling,this,t):l.type===1?c=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(c=new X(n,this,t)),this._$AV.push(c),l=s[++h]}o!==l?.index&&(n=x.nextNode(),o++)}return x.currentNode=E,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},M=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=A(this,t,e),R(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=T.createElement(vt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new K(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new T(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ct(t).nextSibling;ct(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=A(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{let h=t,l,c;for(t=n[0],l=0;l<n.length-1;l++)c=A(this,h[s+l],e,l),c===w&&(c=this._$AH[l]),o||(o=!R(c)||c!==this._$AH[l]),c===f?t=f:t!==f&&(t+=(c??"")+n[l+1]),this._$AH[l]=c}o&&!i&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},G=class extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},Y=class extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},Q=class extends k{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=A(this,t,e,0)??f)===w)return;let s=this._$AH,i=t===f&&s!==f||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==f&&(s===f||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}};var zt=P.litHtmlPolyfillSupport;zt?.(T,M),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.3");var $t=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new M(t.insertBefore(O(),n),n,void 0,e??{})}return i._$AI(r),i};var U=globalThis,v=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};v._$litElement$=!0,v.finalized=!0,U.litElementHydrateSupport?.({LitElement:v});var Lt=U.litElementPolyfillSupport;Lt?.({LitElement:v});(U.litElementVersions??(U.litElementVersions=[])).push("4.2.2");function F(r,t){if(!r)return"";let e=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(r),s={};for(let n of e)s[n.type]=n.value;let i=s.hour==="24"?"00":s.hour;return`${s.year}-${s.month}-${s.day}T${i}:${s.minute}`}function st(r,t){if(!r)return null;let e=new Date(r+":00.000Z");return isNaN(e.getTime())?null:new Date(e.getTime()-xt(e,t))}function xt(r,t){let e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(r),s={};for(let n of e)s[n.type]=n.value;return Date.UTC(+s.year,+s.month-1,+s.day,s.hour==="24"?0:+s.hour,+s.minute,+(s.second||0))-r.getTime()}function bt(r,t){let e=new Date(r);if(isNaN(e.getTime()))return"";let s=new Intl.DateTimeFormat("en-GB",{timeZone:t,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(e),i=new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(e);return`${s}  ${i}`}function Ft(r,t){return F(r,t).replace("T","_").replace(":","-")}function jt(r){if(r==null||isNaN(r))return"\u2014";let t=Math.max(0,Math.round(r));return t<60?`${t}s`:t<3600?`${Math.floor(t/60)}m ${String(t%60).padStart(2,"0")}s`:`${Math.floor(t/3600)}h ${String(Math.floor(t%3600/60)).padStart(2,"0")}m`}function Ht(r,t){let e=new Date(r);if(isNaN(e.getTime()))return r;let s=F(e,t),i=new Intl.DateTimeFormat("en-GB",{timeZone:t,second:"2-digit",hour12:!1}).format(e),n=xt(e,t),o=n>=0?"+":"-",h=Math.abs(n),l=String(Math.floor(h/36e5)).padStart(2,"0"),c=String(Math.floor(h%36e5/6e4)).padStart(2,"0");return`${s}:${i}${o}${l}:${c}`}var St="ha-state-timeline-card:v1",Bt=["_selectedDeviceId","_selectedEntities","_addedEntities","_driverEntityId","_beginInput","_endInput"],z=class extends v{constructor(){super(),this._config={},this._selectedDeviceId=null,this._selectedEntities=new Set,this._addedEntities=new Set,this._driverEntityId=null,this._beginInput="",this._endInput="",this._loading=!1,this._error="",this._steps=[],this._currentStep=0,this._markStart=null,this._markEnd=null,this._expanded=new Set,this._reference=null,this._refCurrentStep=0}connectedCallback(){super.connectedCallback();try{let t=localStorage.getItem(St);if(!t)return;let e=JSON.parse(t);e.selectedDeviceId&&(this._selectedDeviceId=e.selectedDeviceId),Array.isArray(e.selectedEntities)&&(this._selectedEntities=new Set(e.selectedEntities)),Array.isArray(e.addedEntities)&&(this._addedEntities=new Set(e.addedEntities)),e.driverEntityId&&(this._driverEntityId=e.driverEntityId),typeof e.beginInput=="string"&&(this._beginInput=e.beginInput),typeof e.endInput=="string"&&(this._endInput=e.endInput)}catch{}}updated(t){if(Bt.some(e=>t.has(e)))try{localStorage.setItem(St,JSON.stringify({selectedDeviceId:this._selectedDeviceId,selectedEntities:Array.from(this._selectedEntities),addedEntities:Array.from(this._addedEntities),driverEntityId:this._driverEntityId,beginInput:this._beginInput,endInput:this._endInput}))}catch{}}setConfig(t){let e=t||{},s=Number(e.fast_flip_threshold_seconds),i=Number(e.recorder_keep_days);this._config={fast_flip_threshold_seconds:Number.isFinite(s)&&s>0?s:5,recorder_keep_days:Number.isFinite(i)&&i>0?i:10}}static getConfigElement(){return document.createElement("ha-state-timeline-card-editor")}static getStubConfig(){return{fast_flip_threshold_seconds:5,recorder_keep_days:10}}getCardSize(){return 6}get _timeZone(){return this.hass&&this.hass.config&&this.hass.config.time_zone||"UTC"}_entitiesForDevice(t){if(!t||!this.hass||!this.hass.entities)return{};let e={};for(let s of Object.keys(this.hass.entities)){let i=this.hass.entities[s];if(i.device_id!==t||i.disabled_by||i.hidden_by)continue;let n=s.split(".")[0];(e[n]=e[n]||[]).push(s)}for(let s of Object.keys(e))e[s].sort();return e}_friendlyName(t){if(!this.hass)return t;let e=this.hass.states&&this.hass.states[t];if(e&&e.attributes&&e.attributes.friendly_name)return e.attributes.friendly_name;let s=this.hass.entities&&this.hass.entities[t];return s&&s.name?s.name:t}_onDeviceChanged(t){this._selectedDeviceId=t.detail&&t.detail.value||null}_toggleEntity(t){let e=new Set(this._selectedEntities);e.has(t)?(e.delete(t),this._driverEntityId===t&&(this._driverEntityId=null)):e.add(t),this._selectedEntities=e}_setDriver(t){if(this._driverEntityId===t){this._driverEntityId=null;return}if(this._driverEntityId=t,!this._selectedEntities.has(t)){let e=new Set(this._selectedEntities);e.add(t),this._selectedEntities=e}}_selectAllForDevice(){let t=this._entitiesForDevice(this._selectedDeviceId),e=new Set(this._selectedEntities);for(let s of Object.keys(t))for(let i of t[s])e.add(i);this._selectedEntities=e}_deselectAllForDevice(){let t=this._entitiesForDevice(this._selectedDeviceId),e=new Set(this._selectedEntities);for(let s of Object.keys(t))for(let i of t[s])e.delete(i),this._driverEntityId===i&&(this._driverEntityId=null);this._selectedEntities=e}_onAddEntity(t){let e=t.detail&&t.detail.value;if(!e)return;let s=new Set(this._addedEntities);s.add(e),this._addedEntities=s;let i=new Set(this._selectedEntities);i.add(e),this._selectedEntities=i,t.target&&(t.target.value="")}_setPreset(t){let e=new Date;this._beginInput=F(new Date(e.getTime()-t*6e4),this._timeZone),this._endInput=F(e,this._timeZone)}_setEndToNow(){this._endInput=F(new Date,this._timeZone)}_onBeginInput(t){this._beginInput=t.target.value}_onEndInput(t){this._endInput=t.target.value}async _search(){this._error="";let t=Array.from(this._selectedEntities);if(t.length===0){this._error="Select at least one entity";return}if(!this._beginInput||!this._endInput){this._error="Set a time range";return}let e=this._timeZone,s=st(this._beginInput,e),i=st(this._endInput,e);if(!s||!i||i<=s){this._error="End must be after Begin";return}this._loading=!0;try{let n=await this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),end_time:i.toISOString(),entity_ids:t,minimal_response:!1,no_attributes:!1,significant_changes_only:!1}),o=this._buildSteps(n,t);if(o.length===0){this._error="No state changes found in this time range for the selected entities",this._steps=[];return}this._steps=o,this._currentStep=0,this._markStart=null,this._markEnd=null,this._expanded=new Set}catch(n){this._error=`Query failed: ${n&&n.message?n.message:n}`,this._steps=[]}finally{this._loading=!1}}_buildSteps(t,e){let s=this._timeZone,i={};for(let c of e){let a=(t[c]||[]).map(d=>({ts:new Date(d.last_changed||d.last_updated).toISOString(),state:d.state,attributes:d.attributes||{}})).sort((d,_)=>d.ts<_.ts?-1:d.ts>_.ts?1:0);for(let d=0;d<a.length;d++)a[d].durationSeconds=d<a.length-1?(new Date(a[d+1].ts).getTime()-new Date(a[d].ts).getTime())/1e3:null;i[c]={list:a,idx:0}}let n=[];for(let c of e)for(let p of i[c].list)n.push({ts:p.ts,entityId:c});n.sort((c,p)=>c.ts<p.ts?-1:c.ts>p.ts?1:c.entityId.localeCompare(p.entityId));let o=this._config.fast_flip_threshold_seconds,h=this._driverEntityId,l=[];for(let c of n){let p={};for(let a of e){let d=i[a];for(;d.idx+1<d.list.length&&d.list[d.idx+1].ts<=c.ts;)d.idx++;let _=d.list[d.idx];if(!_){p[a]={entityId:a,friendlyName:this._friendlyName(a),state:"unknown",previousState:null,attributes:{},durationSeconds:null,changed:!1,isDriver:a===h,isFastFlip:!1,timezone:s};continue}let m=d.idx>0?d.list[d.idx-1]:null;p[a]={entityId:a,friendlyName:this._friendlyName(a),state:_.state,previousState:m?m.state:null,attributes:_.attributes,durationSeconds:_.durationSeconds,changed:a===c.entityId,isDriver:a===h,isFastFlip:_.durationSeconds!==null&&_.durationSeconds<o,timezone:s}}l.push({timestamp:c.ts,changedEntityId:c.entityId,entityStates:p})}return l}_stepPrev(){this._currentStep>0&&(this._currentStep-=1)}_stepNext(){this._currentStep<this._steps.length-1&&(this._currentStep+=1)}_refStepPrev(){this._refCurrentStep>0&&(this._refCurrentStep-=1)}_refStepNext(){let t=this._reference&&this._reference.steps.length-1||0;this._refCurrentStep<t&&(this._refCurrentStep+=1)}_doMarkStart(){this._markStart=this._currentStep}_doMarkEnd(){this._markEnd=this._currentStep}_toggleExpand(t){let e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_exportAll(){this._steps.length!==0&&this._writeExport(0,this._steps.length-1)}_exportSelection(){if(this._markStart===null||this._markEnd===null)return;let t=Math.min(this._markStart,this._markEnd),e=Math.max(this._markStart,this._markEnd);this._writeExport(t,e)}_writeExport(t,e){let s=this._timeZone,i=this._steps.slice(t,e+1),n=this._driverEntityId,o=n?this._friendlyName(n):null,h={exported_at:new Date().toISOString(),timezone:s,driver_entity_id:n,driver_friendly_name:o,range_start:i[0].timestamp,range_end:i[i.length-1].timestamp,step_count:i.length,steps:i.map((m,Et)=>({step_index:Et+1,timestamp_utc:m.timestamp,timestamp_local:Ht(m.timestamp,s),changed_entity_id:m.changedEntityId,entities:this._orderedEntityList(m).map(g=>({entity_id:g.entityId,friendly_name:g.friendlyName,state:g.state,previous_state:g.previousState,duration_seconds:g.durationSeconds,changed:g.changed,is_driver:g.isDriver,is_fast_flip:g.isFastFlip,attributes:g.attributes}))}))},l=Ft(new Date(i[0].timestamp),s),c=o?o.toLowerCase().replace(/\s+/g,"_"):null,p=c?`${c}_${l}.json`:`state_timeline_${l}.json`,a=new Blob([JSON.stringify(h,null,2)],{type:"application/json"}),d=URL.createObjectURL(a),_=document.createElement("a");_.href=d,_.download=p,_.click(),setTimeout(()=>URL.revokeObjectURL(d),1e3)}_orderedEntityList(t){let e=Object.keys(t.entityStates);return e.sort((s,i)=>{let n=t.entityStates[s].isDriver,o=t.entityStates[i].isDriver;return n&&!o?-1:o&&!n?1:s.localeCompare(i)}),e.map(s=>t.entityStates[s])}_normalizeReference(t){return{...t,steps:t.steps.map(e=>({timestamp:e.timestamp_utc,changedEntityId:e.changed_entity_id,entityStates:Object.fromEntries((e.entities||[]).map(s=>[s.entity_id,{entityId:s.entity_id,friendlyName:s.friendly_name,state:s.state,previousState:s.previous_state,attributes:s.attributes||{},durationSeconds:s.duration_seconds,changed:!!s.changed,isDriver:!!s.is_driver,isFastFlip:!!s.is_fast_flip}]))}))}}async _onImportFile(t){let e=t.target.files&&t.target.files[0];if(e){try{let s=JSON.parse(await e.text());if(!s||!Array.isArray(s.steps))throw new Error("missing steps array");this._reference=this._normalizeReference(s),this._refCurrentStep=0,this._error=""}catch{this._error="Invalid timeline JSON file",this._reference=null}t.target.value=""}}render(){if(!this.hass)return u`<ha-card><div class="empty">Waiting for Home Assistant…</div></ha-card>`;let t=this._steps.length>0,e=!!this._reference;return u`
      <ha-card>
        <div class="card-content">
          ${this._renderEntitySelection()}
          ${this._renderTimeRange()}
          ${this._renderSearchSection()}
          ${t||e?u`
            <div class="stepper-container ${t&&e?"twin":""}">
              ${t?this._renderStepper():""}
              ${e?this._renderReferencePanel():""}
            </div>
          `:""}
          ${this._renderImportSection()}
        </div>
      </ha-card>
    `}_renderEntitySelection(){let t=this._entitiesForDevice(this._selectedDeviceId),e=Object.keys(t).length>0,s=Array.from(this._addedEntities);return u`
      <section class="block">
        <h3>Entities</h3>
        <ha-device-picker .hass=${this.hass} .value=${this._selectedDeviceId||""}
          @value-changed=${this._onDeviceChanged} label="Device"></ha-device-picker>
        ${e?u`
          <div class="row links">
            <a @click=${this._selectAllForDevice}>Select all</a>
            <a @click=${this._deselectAllForDevice}>Deselect all</a>
          </div>
          ${Object.keys(t).sort().map(i=>u`
            <div class="group-label">${i}</div>
            ${t[i].map(n=>this._renderEntityRow(n))}
          `)}
        `:""}
        ${s.length>0?u`
          <div class="group-label">other</div>
          ${s.map(i=>this._renderEntityRow(i))}
        `:""}
        <ha-entity-picker .hass=${this.hass} allow-custom-entity
          @value-changed=${this._onAddEntity} label="+ Add entity"></ha-entity-picker>
      </section>
    `}_renderEntityRow(t){let e=this._selectedEntities.has(t),s=this._driverEntityId===t;return u`
      <div class="entity-row">
        <input type="checkbox" .checked=${e} @change=${()=>this._toggleEntity(t)} />
        <button class="star ${s?"driver":""}" title="Set as driver"
          @click=${()=>this._setDriver(t)}>★</button>
        <div class="entity-label">
          <div class="primary">${this._friendlyName(t)}</div>
          <div class="secondary">${t}</div>
        </div>
      </div>
    `}_renderTimeRange(){return u`
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
    `}_renderRetentionWarning(){if(!this._beginInput)return"";let t=st(this._beginInput,this._timeZone);if(!t)return"";let e=this._config.recorder_keep_days,s=new Date(Date.now()-e*864e5);return t>=s?"":u`<div class="retention-warning">
      Begin is older than your recorder retention (${e} days). Entries past the
      cutoff have likely been purged — this query may return empty or partial results.
    </div>`}_renderSearchSection(){return u`
      <section class="block">
        <button class="primary-btn" @click=${this._search} ?disabled=${this._loading}>
          ${this._loading?"Searching\u2026":"Search"}
        </button>
        ${this._error?u`<div class="error">${this._error}</div>`:""}
      </section>
    `}_renderStepper(){let t=this._steps[this._currentStep],e=this._orderedEntityList(t),s=this._steps.length;return u`
      <section class="block stepper">
        <div class="stepper-header">
          <span>Step ${this._currentStep+1} of ${s}</span>
          <span class="ts">${bt(t.timestamp,this._timeZone)}</span>
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
      </section>
    `}_renderStepRow(t,e=!1){let s=!e&&this._expanded.has(t.entityId),i=["step-row",t.changed&&"changed",t.isFastFlip&&"fast-flip",t.isDriver&&"driver-row"].filter(Boolean).join(" "),n=t.durationSeconds===null?"current":jt(t.durationSeconds);return u`
      <div class=${i}>
        <div class="cell entity-cell">
          ${t.isDriver?u`<span class="star-inline">★</span>`:""}
          <span>${t.friendlyName}</span>
        </div>
        <div class="cell mono">${t.previousState??"\u2014"}</div>
        <div class="cell mono current ${t.changed?"highlight":"muted"}">${t.state}</div>
        <div class="cell">
          ${t.changed?n:"\u2014"}
          ${t.changed&&t.isFastFlip?u`<span class="flip-icon" title="Fast flip">⚡</span>`:""}
        </div>
        <div class="cell">
          ${e?"":u`<button class="expand-btn" @click=${()=>this._toggleExpand(t.entityId)}>${s?"\u25BC":"\u25B6"}</button>`}
        </div>
      </div>
      ${s?u`<div class="attr-block"><pre>${JSON.stringify(t.attributes,null,2)}</pre></div>`:""}
    `}_renderImportSection(){return u`
      <section class="block">
        <label class="import-label">
          <input type="file" accept=".json,application/json" @change=${this._onImportFile} />
          <span class="export-btn">Load Reference JSON</span>
        </label>
      </section>
    `}_renderReferencePanel(){let t=this._reference;if(!t.steps||t.steps.length===0)return"";let e=Math.min(this._refCurrentStep,t.steps.length-1),s=t.steps[e],i=this._orderedEntityList(s),n=t.timezone||this._timeZone,o=t.steps.length;return u`
      <section class="block stepper reference">
        <div class="stepper-header">
          <span>Ref ${e+1} of ${o}</span>
          <span class="ts">${bt(s.timestamp,n)}</span>
        </div>
        <div class="entity-table">
          <div class="table-header">
            <div>Entity</div><div>Previous</div><div>Current</div><div>Duration</div><div></div>
          </div>
          ${i.map(h=>this._renderStepRow(h,!0))}
        </div>
        <div class="nav-row">
          <button class="nav-btn" ?disabled=${e===0} @click=${this._refStepPrev}>◀ Prev</button>
          <span class="ref-label">${t.driver_friendly_name||"No driver"}</span>
          <button class="nav-btn" ?disabled=${e===o-1} @click=${this._refStepNext}>Next ▶</button>
        </div>
      </section>
    `}};I(z,"properties",{hass:{attribute:!1},_config:{state:!0},_selectedDeviceId:{state:!0},_selectedEntities:{state:!0},_addedEntities:{state:!0},_driverEntityId:{state:!0},_beginInput:{state:!0},_endInput:{state:!0},_loading:{state:!0},_error:{state:!0},_steps:{state:!0},_currentStep:{state:!0},_markStart:{state:!0},_markEnd:{state:!0},_expanded:{state:!0},_reference:{state:!0},_refCurrentStep:{state:!0}}),I(z,"styles",B`
    :host { display: block; }
    ha-card { padding: 0; }
    .card-content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .block { display: flex; flex-direction: column; gap: 8px; }
    h3 { margin: 0; font-size: 0.95em; font-weight: 500; color: var(--secondary-text-color);
         text-transform: uppercase; letter-spacing: 0.04em; }
    .empty { padding: 24px; color: var(--secondary-text-color); text-align: center; }
    .row { display: flex; gap: 8px; align-items: center; }
    .links { gap: 16px; font-size: 0.9em; }
    .links a { color: var(--primary-color); cursor: pointer; text-decoration: underline; }
    .group-label { margin-top: 8px; font-size: 0.75em; text-transform: uppercase;
                   color: var(--secondary-text-color); letter-spacing: 0.06em;
                   border-bottom: 1px solid var(--divider-color); padding-bottom: 2px; }
    .entity-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
    .entity-row input[type='checkbox'] { accent-color: var(--primary-color); }
    .star { background: none; border: none; cursor: pointer; font-size: 1.2em;
            color: var(--disabled-color); padding: 0 2px; }
    .star.driver { color: var(--primary-color); }
    .entity-label .primary { font-size: 0.95em; color: var(--primary-text-color); }
    .entity-label .secondary { font-size: 0.8em; color: var(--secondary-text-color);
                               font-family: var(--code-font-family, monospace); }

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
  `);customElements.define("ha-state-timeline-card",z);var Wt=[{name:"fast_flip_threshold_seconds",required:!1,selector:{number:{min:1,max:600,mode:"box",unit_of_measurement:"s"}}},{name:"recorder_keep_days",required:!1,selector:{number:{min:1,max:3650,mode:"box",unit_of_measurement:"days"}}}],Vt={fast_flip_threshold_seconds:"Fast flip threshold (seconds)",recorder_keep_days:"Recorder retention (days)"},qt={fast_flip_threshold_seconds:"State changes shorter than this get a \u26A1 flag and row highlight.",recorder_keep_days:"Match your recorder purge_keep_days. Used only to warn when Begin exceeds retention."},L=class extends v{setConfig(t){this._config={...t}}_onValueChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?u``:u`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Wt}
        .computeLabel=${t=>Vt[t.name]||t.name}
        .computeHelper=${t=>qt[t.name]||""}
        @value-changed=${this._onValueChanged}
      ></ha-form>
    `}};I(L,"properties",{hass:{attribute:!1},_config:{state:!0}}),I(L,"styles",B`
    ha-form { display: block; padding: 8px 0; }
  `);customElements.define("ha-state-timeline-card-editor",L);window.customCards=window.customCards||[];window.customCards.push({type:"ha-state-timeline-card",name:"State Timeline Card",description:"Step through historical state transitions across multiple entities. Built for debugging automations and integrations."});
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
