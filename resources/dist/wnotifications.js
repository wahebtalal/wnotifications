var z=Object.create;var N=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var d=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var j=(i,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of V(t))!H.call(i,r)&&r!==e&&N(i,r,{get:()=>t[r],enumerable:!(s=O(t,r))||s.enumerable});return i};var J=(i,t,e)=>(e=i!=null?z(Y(i)):{},j(t||!i||!i.__esModule?N(e,"default",{value:i,enumerable:!0}):e,i));var C=d((ut,q)=>{var p,x=typeof global<"u"&&(global.crypto||global.msCrypto);x&&x.getRandomValues&&(y=new Uint8Array(16),p=function(){return x.getRandomValues(y),y});var y;p||(D=new Array(16),p=function(){for(var i=0,t;i<16;i++)i&3||(t=Math.random()*4294967296),D[i]=t>>>((i&3)<<3)&255;return D});var D;q.exports=p});var T=d((lt,I)=>{var _=[];for(f=0;f<256;++f)_[f]=(f+256).toString(16).substr(1);var f;function K(i,t){var e=t||0,s=_;return s[i[e++]]+s[i[e++]]+s[i[e++]]+s[i[e++]]+"-"+s[i[e++]]+s[i[e++]]+"-"+s[i[e++]]+s[i[e++]]+"-"+s[i[e++]]+s[i[e++]]+"-"+s[i[e++]]+s[i[e++]]+s[i[e++]]+s[i[e++]]+s[i[e++]]+s[i[e++]]}I.exports=K});var B=d((ct,b)=>{var Q=C(),X=T(),a=Q(),Z=[a[0]|1,a[1],a[2],a[3],a[4],a[5]],U=(a[6]<<8|a[7])&16383,S=0,A=0;function tt(i,t,e){var s=t&&e||0,r=t||[];i=i||{};var n=i.clockseq!==void 0?i.clockseq:U,o=i.msecs!==void 0?i.msecs:new Date().getTime(),h=i.nsecs!==void 0?i.nsecs:A+1,c=o-S+(h-A)/1e4;if(c<0&&i.clockseq===void 0&&(n=n+1&16383),(c<0||o>S)&&i.nsecs===void 0&&(h=0),h>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");S=o,A=h,U=n,o+=122192928e5;var l=((o&268435455)*1e4+h)%4294967296;r[s++]=l>>>24&255,r[s++]=l>>>16&255,r[s++]=l>>>8&255,r[s++]=l&255;var u=o/4294967296*1e4&268435455;r[s++]=u>>>8&255,r[s++]=u&255,r[s++]=u>>>24&15|16,r[s++]=u>>>16&255,r[s++]=n>>>8|128,r[s++]=n&255;for(var $=i.node||Z,v=0;v<6;++v)r[s+v]=$[v];return t||X(r)}b.exports=tt});var W=d((dt,R)=>{var it=C(),et=T();function st(i,t,e){var s=t&&e||0;typeof i=="string"&&(t=i=="binary"?new Array(16):null,i=null),i=i||{};var r=i.random||(i.rng||it)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t)for(var n=0;n<16;++n)t[s+n]=r[n];return t||et(r)}R.exports=st});var L=d((ft,G)=>{var rt=B(),F=W(),E=F;E.v1=rt;E.v4=F;G.exports=E});function P(i,t=()=>{}){let e=!1;return function(){e?t.apply(this,arguments):(e=!0,i.apply(this,arguments))}}var k=i=>{i.data("wnotificationComponent",({notification:t})=>({isShown:!1,progress:0,progressInterval:null,computedStyle:null,transitionDuration:null,transitionEasing:null,init:function(){this.computedStyle=window.getComputedStyle(this.$el),this.transitionDuration=parseFloat(this.computedStyle.transitionDuration)*1e3,this.transitionEasing=this.computedStyle.transitionTimingFunction,this.configureTransitions(),this.configureAnimations(),t.duration&&t.duration!=="persistent"&&this.startProgressBar(t.duration),this.isShown=!0},configureTransitions:function(){let e=this.computedStyle.display,s=()=>{i.mutateDom(()=>{this.$el.style.setProperty("display",e),this.$el.style.setProperty("visibility","visible")}),this.$el._x_isShown=!0},r=()=>{i.mutateDom(()=>{this.$el._x_isShown?this.$el.style.setProperty("visibility","hidden"):this.$el.style.setProperty("display","none")})},n=P(o=>o?s():r(),o=>{this.$el._x_toggleAndCascadeWithTransitions(this.$el,o,s,r)});i.effect(()=>n(this.isShown))},configureAnimations:function(){let e;Livewire.hook("commit",({component:s,commit:r,succeed:n,fail:o,respond:h})=>{if(!s.snapshot.data.isFilamentNotificationsComponent)return;let c=()=>this.$el.getBoundingClientRect().top,l=c();h(()=>{e=()=>{this.isShown&&this.$el.animate([{transform:`translateY(${l-c()}px)`},{transform:"translateY(0px)"}],{duration:this.transitionDuration,easing:this.transitionEasing})},this.$el.getAnimations().forEach(u=>u.finish())}),n(({snapshot:u,effect:$})=>{e()})})},startProgressBar:function(e){this.progress=0;var s=!1;let r=t.intervalDelay,n=100/e*r;this.progressInterval=setInterval(()=>{if(this.progress>=100){this.prepareClose(),clearInterval(this.progressInterval);return}this.progress+=n},r)},prepareClose:function(){if(!this.$el.matches(":hover")){this.close();return}this.$el.addEventListener("mouseleave",()=>this.close())},close:function(){this.isShown=!1,setTimeout(()=>window.dispatchEvent(new CustomEvent("notificationClosed",{detail:{id:t.id}})),this.transitionDuration),setTimeout(()=>clearInterval(this.progressInterval),this.transitionDuration)},markAsRead:function(){window.dispatchEvent(new CustomEvent("markedNotificationAsRead",{detail:{id:t.id}}))},markAsUnread:function(){window.dispatchEvent(new CustomEvent("markedNotificationAsUnread",{detail:{id:t.id}}))}}))};var M=J(L(),1),m=class{constructor(){return this.id((0,M.v4)()),this}id(t){return this.id=t,this}title(t){return this.title=t,this}intervalDelay(t){return this.intervalDelay=t,this}isProgress(t){return this.isProgress=t??!0,this}isBlur(t){return this.isBlur=t??!0,this}body(t){return this.body=t,this}actions(t){return this.actions=t,this}status(t){return this.status=t,this}color(t){return this.color=t,this}icon(t){return this.icon=t,this}iconColor(t){return this.iconColor=t,this}duration(t){return this.duration=t,this}seconds(t){return this.duration(t*1e3),this}persistent(){return this.duration("persistent"),this}danger(){return this.status("danger"),this}info(){return this.status("info"),this}success(){return this.status("success"),this}warning(){return this.status("warning"),this}view(t){return this.view=t,this}viewData(t){return this.viewData=t,this}send(){return window.dispatchEvent(new CustomEvent("notificationSent",{detail:{notification:this}})),this}},g=class{constructor(t){return this.name(t),this}name(t){return this.name=t,this}color(t){return this.color=t,this}dispatch(t,e){return this.event(t),this.eventData(e),this}dispatchSelf(t,e){return this.dispatch(t,e),this.dispatchDirection="self",this}dispatchTo(t,e,s){return this.dispatch(e,s),this.dispatchDirection="to",this.dispatchToComponent=t,this}emit(t,e){return this.dispatch(t,e),this}emitSelf(t,e){return this.dispatchSelf(t,e),this}emitTo(t,e,s){return this.dispatchTo(t,e,s),this}dispatchDirection(t){return this.dispatchDirection=t,this}dispatchToComponent(t){return this.dispatchToComponent=t,this}event(t){return this.event=t,this}eventData(t){return this.eventData=t,this}extraAttributes(t){return this.extraAttributes=t,this}icon(t){return this.icon=t,this}iconPosition(t){return this.iconPosition=t,this}outlined(t=!0){return this.isOutlined=t,this}disabled(t=!0){return this.isDisabled=t,this}label(t){return this.label=t,this}close(t=!0){return this.shouldClose=t,this}openUrlInNewTab(t=!0){return this.shouldOpenUrlInNewTab=t,this}size(t){return this.size=t,this}url(t){return this.url=t,this}view(t){return this.view=t,this}button(){return this.view("filament-actions::button-action"),this}grouped(){return this.view("filament-actions::grouped-action"),this}link(){return this.view("filament-actions::link-action"),this}},w=class{constructor(t){return this.actions(t),this}actions(t){return this.actions=t.map(e=>e.grouped()),this}color(t){return this.color=t,this}icon(t){return this.icon=t,this}iconPosition(t){return this.iconPosition=t,this}label(t){return this.label=t,this}tooltip(t){return this.tooltip=t,this}};window.WNotificationAction=g;window.WNotificationActionGroup=w;window.WNotification=m;document.addEventListener("alpine:init",()=>{window.Alpine.plugin(k)});
