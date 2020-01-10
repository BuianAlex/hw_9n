(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{31:function(e,t,a){e.exports=a(66)},36:function(e,t,a){},38:function(e,t,a){},56:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},66:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(27),c=a.n(l),s=(a(36),a(28)),u=a(8),o=a(11),i=a(4),m=a(2),d=a.n(m),p=a(1),h=(a(38),a(12)),b=a.n(h);function E(){var e,t;return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e={},a.prev=1,a.next=4,d.a.awrap(b.a.get("/users/get"));case 4:(t=a.sent).data.result&&t.data.result.length>0?e.result=t.data.result:e.error="No users in the database",a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),a.t0&&(e.error="Server does not respond.");case 11:return a.abrupt("return",e);case 12:case"end":return a.stop()}}),null,null,[[1,8]])}function v(e){var t;return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t={},a.prev=1,a.next=4,d.a.awrap(b.a.post("/users/delete",e));case 4:a.sent,a.next=11;break;case 7:a.prev=7,a.t0=a.catch(1),console.error(a.t0),a.t0&&(t.error="Server does not respond.");case 11:return a.abrupt("return",t);case 12:case"end":return a.stop()}}),null,null,[[1,7]])}function f(e){var t;return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t={},a.prev=1,a.next=4,d.a.awrap(b.a.post("/users/create",e));case 4:a.sent,a.next=10;break;case 7:a.prev=7,a.t0=a.catch(1),a.t0&&(t.error="Server does not respond.");case 10:return a.abrupt("return",t);case 11:case"end":return a.stop()}}),null,null,[[1,7]])}function g(e,t){var a;return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return a={},n.prev=1,n.next=4,d.a.awrap(b.a.put("/users/update/".concat(e),t));case 4:n.sent,n.next=10;break;case 7:n.prev=7,n.t0=n.catch(1),n.t0&&(a.error="Server does not respond.");case 10:return n.abrupt("return",a);case 11:case"end":return n.stop()}}),null,null,[[1,7]])}a(56);function O(e){var t=e.trim();this.maxLength=function(e){return!(t.length>e)},this.minLength=function(e){return!(t.length<e)},this.isEmail=function(){return!!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(t)},this.isPhoneNumber=function(){return!!/\+38[0-9]{10,10}$/.test(t)},this.noSpe\u0441ialChar=function(){return!!/[-\/\\^$*?()|[\]{}]/g.test(t)},this.testPassword=function(){var e=new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})").test(t)?2:e.test(t)?1:0}}function j(e){console.log(e.userData._id);var t=Object(n.useState)({value:e.userData.name||""}),a=Object(p.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)({value:e.userData.loginName||"",error:!0}),u=Object(p.a)(s,2),o=u[0],m=u[1],h=Object(n.useState)({value:e.userData.password||"",error:!0}),b=Object(p.a)(h,2),E=b[0],v=b[1],j=Object(n.useState)({value:e.userData.phone||"+38"}),w=Object(p.a)(j,2),x=w[0],S=w[1],N=Object(n.useState)({value:e.userData.email||""}),D=Object(p.a)(N,2),y=D[0],k=D[1],C=Object(n.useState)(e.userData.usergroup||"user"),L=Object(p.a)(C,2),B=L[0],P=L[1],F=Object(n.useState)({value:e.userData.photo}),_=Object(p.a)(F,2),A=_[0],U=(_[1],Object(n.useState)(!0)),$=Object(p.a)(U,2),R=$[0],Z=$[1];Object(n.useEffect)((function(){l.error||o.error||E.error||y.error||x.error?Z(!0):Z(!1)}),[l.error,o.error,E.error,y.error,x.error]);var I=function(e){var t=new O(e.target.value),a="",n=!1;t.noSpe\u0441ialChar();if(t.noSpe\u0441ialChar()&&(a="Not allowed special characters -/^$*+?()|[]{}\\",n=!0),"name"===e.target.id&&(t.maxLength(50)||(a="Name is too long!"),t.minLength(3)||(a="Name is too short!"),c(Object(i.a)({},l,{value:e.target.value,error:a}))),"login"===e.target.id&&(n||(a=!1,t.maxLength(50)||(a="Name is too long!"),t.minLength(3)||(a="Name is too short!")),m(Object(i.a)({},o,{value:e.target.value,error:a}))),"pass"===e.target.id){if(!n)switch(t.testPassword()){case 0:a="Password must have at least 6 characters and include numbers and letters";break;default:a=!1}v(Object(i.a)({},E,{value:e.target.value,error:a}))}if("email"===e.target.id&&(t.isEmail()||(a="Email Address not valid"),k(Object(i.a)({},y,{value:e.target.value,error:a}))),"phone"===e.target.id){a="";var r=!0,s=!0;/(^\+\d+$)/.test(e.target.value)||(a="Phone number is not valid",r=!1),e.target.value.length>13&&(s=!1,console.log(x.value.length)),S(Object(i.a)({},x,{value:r&&s?e.target.value:x.value,error:a}))}"usergroup"===e.target.id&&P(e.target.value)},V=function(e){"name"===e.target.id&&c(Object(i.a)({},l,{isBlur:!0})),"login"===e.target.id&&m(Object(i.a)({},o,{isBlur:!0})),"pass"===e.target.id&&v(Object(i.a)({},E,{isBlur:!0})),"email"===e.target.id&&k(Object(i.a)({},y,{isBlur:!0})),"phone"===e.target.id&&S(Object(i.a)({},x,{isBlur:!0}))};return r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h2",null,e.userData._id?"UserID: ".concat(e.userData._id):"New User"),r.a.createElement("span",{className:e.userData.online?"status status-online":"status status-offline"},e.userData.online?"onLine":"offLine")),r.a.createElement("form",null,r.a.createElement("div",{className:"form-body"},r.a.createElement("div",{className:"user-photo-wr "},r.a.createElement("img",{src:A.value?A.value:"./noavatar92.png",alt:"user photo",className:"user-photo"})),r.a.createElement("div",{className:"text-filds"},r.a.createElement("div",{className:"fild"},r.a.createElement("label",{htmlFor:"name"},"Name",r.a.createElement("input",{type:"text",id:"name",value:l.value,onChange:I,onBlur:V})),r.a.createElement("span",{className:"errors"},l.isBlur&&l.error)),r.a.createElement("div",{className:"fild"},r.a.createElement("label",{htmlFor:"login"},"Login",r.a.createElement("input",{type:"text",id:"login",value:o.value,onChange:I,onBlur:V})),r.a.createElement("span",{className:"errors"},o.isBlur&&o.error)),r.a.createElement("div",{className:"fild"},r.a.createElement("label",{htmlFor:"pass"},"Password",r.a.createElement("input",{type:"text",id:"pass",value:E.value,onChange:I,onBlur:V})),r.a.createElement("span",{className:"errors"},E.isBlur&&E.error)),r.a.createElement("div",{className:"fild"},r.a.createElement("label",{htmlFor:"email"},"Email",r.a.createElement("input",{type:"text",id:"email",value:y.value,onChange:I,onBlur:V})),r.a.createElement("span",{className:"errors"},y.isBlur&&y.error)),r.a.createElement("div",{className:"fild"},r.a.createElement("label",{htmlFor:"phone"},"Phone",r.a.createElement("input",{type:"text",id:"phone",value:x.value,onChange:I})),r.a.createElement("span",{className:"errors"},x.error)),r.a.createElement("label",{htmlFor:"usergroup"},"Usergroup",r.a.createElement("p",null,r.a.createElement("select",{id:"usergroup",value:B,onChange:I},r.a.createElement("option",{value:"user"},"user"),r.a.createElement("option",{value:"admin"},"admin"),r.a.createElement("option",{value:"superAdmin"},"superAdmin ")))),e.userData.registrated&&r.a.createElement("p",null,"Registrated: ",e.userData.registrated),e.userData.registrated&&r.a.createElement("p",null,"Last Visit: ",e.userData.lastVisit))),r.a.createElement("div",{className:"form-footer"},r.a.createElement("button",{onClick:function(t){var a;return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),a={name:l.value,loginName:o.value,password:E.value,email:y.value,phone:x.value,photo:"",usergroup:B},!e.userData._id){n.next=9;break}return n.next=5,d.a.awrap(g(e.userData._id,a));case 5:n.sent,console.log("upd"),n.next=13;break;case 9:return n.next=11,d.a.awrap(f(a));case 11:n.sent,console.log("new");case 13:e.onClose();case 14:case"end":return n.stop()}}))},disabled:R},"Save"),r.a.createElement("button",{onClick:function(t){t.preventDefault(),e.onClose()}},"Close"))))}var w=r.a.memo((function(e){return r.a.createElement("tr",{onClick:function(t){e.actionShowUser(t,e.userData._id)}},r.a.createElement("td",{className:"checkbox"},r.a.createElement("input",{type:"checkbox",name:"select",checked:e.userData.isSelected||!1,onChange:function(){e.actionSelect(e.userData._id)}})),r.a.createElement("td",{className:"name"},e.userData.name),r.a.createElement("td",null,e.userData.loginName),r.a.createElement("td",null,e.userData.email),r.a.createElement("td",null,e.userData.phone),r.a.createElement("td",null,e.userData.usergroup),r.a.createElement("td",null,e.userData.lastVisit),r.a.createElement("td",null,e.userData.registrated),r.a.createElement("td",null,e.userData._id))}));var x=[{path:"/",exact:!0,main:function(){return r.a.createElement("h2",null,"Home")}},{path:"/users",main:function(){var e=Object(n.useState)([]),t=Object(p.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)([]),s=Object(p.a)(c,2),u=s[0],o=s[1],m=Object(n.useState)({open:!1,data:{}}),h=Object(p.a)(m,2),b=h[0],f=h[1],g=Object(n.useState)(0),O=Object(p.a)(g,2),x=O[0],S=O[1];Object(n.useEffect)((function(){N()}),[]);var N=function(){var e;return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.awrap(E());case 2:e=t.sent,o(e.error),l(e.result);case 5:case"end":return t.stop()}}))},D=function(e,t){if("checkbox"!==e.target.type&&!e.target.classList.contains("checkbox")){var n=a.find((function(e){return e._id===t}));f((function(e){return Object(i.a)({},e,{open:!0,data:n})}))}},y=function(e){var t=0,n=a.map((function(a){return a._id===e&&(a.isSelected=!a.isSelected),a.isSelected&&(t+=1),a}));l(n),S(t)};return r.a.createElement(r.a.Fragment,null,b.open&&r.a.createElement(j,{onClose:function(){f((function(e){return Object(i.a)({},e,{open:!1,data:{}})}))},userData:b.data}),r.a.createElement("div",{className:"header"},r.a.createElement("button",{onClick:function(){f((function(e){return Object(i.a)({},e,{open:!0})}))}},"ADD User"),r.a.createElement("input",{type:"text",placeholder:"Find user"}),r.a.createElement("button",null,"Find"),r.a.createElement("button",{onClick:function(){var e;return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=[],a.forEach((function(t){t.isSelected&&e.push(t._id)})),t.next=4,d.a.awrap(v(e));case 4:t.sent;case 5:case"end":return t.stop()}}))},disabled:0===x},"Delete"),r.a.createElement("button",null,"Filter")),a?r.a.createElement("div",{className:"user-table"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"checkbox"},r.a.createElement("input",{type:"checkbox",name:"select",disabled:!0})),r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Login Name"),r.a.createElement("th",null,"Email"),r.a.createElement("th",null,"Phone"),r.a.createElement("th",null,"Usergroup"),r.a.createElement("th",null,"Last Visit"),r.a.createElement("th",null,"Registrated"),r.a.createElement("th",null,"ID"))),r.a.createElement("tbody",null,!!a&&a.map((function(e){return r.a.createElement(w,{key:e._id,userData:e,actionSelect:y,actionShowUser:D})}))),r.a.createElement("tfoot",null,r.a.createElement("tr",null))),r.a.createElement("div",{className:"selected"},"Selected: ",x)):r.a.createElement("div",{className:"error"},u))}},{path:"/comments",main:function(){return r.a.createElement("h2",null,"comments")}}];function S(){return r.a.createElement(u.a,null,r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",{style:{padding:"10px",width:"10%",height:"100vh",background:"#f0f0f0"}},r.a.createElement("ul",{style:{listStyleType:"none",padding:0}},r.a.createElement("li",null,r.a.createElement(u.b,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(u.b,{to:"/users"},"Users")),r.a.createElement("li",null,r.a.createElement(u.b,{to:"/comments"},"Comments")))),r.a.createElement("div",{style:{flex:1,padding:"10px"}},r.a.createElement(o.d,null,x.map((function(e,t){return r.a.createElement(o.b,{key:t,path:e.path,exact:e.exact,children:r.a.createElement(e.main,null)})}))))))}a(62);function N(e){var t=Object(n.useState)(e.set.value||""),a=Object(p.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)(!1),u=Object(p.a)(s,2),o=u[0],i=u[1],m=Object(n.useState)(!1),d=Object(p.a)(m,2),h=d[0],b=d[1];Object(n.useEffect)((function(){o?e.cb(!1):e.cb(l)}),[o,l]);return r.a.createElement("div",{className:"fild"},r.a.createElement("label",{htmlFor:e.set.id},e.set.label),r.a.createElement("input",{type:e.set.type,id:e.set.id,value:l,onChange:function(e){var t=e.target.value.trim(),a=new O(t);if(a.noSpe\u0441ialChar())b(!0),i("Not allowed special characters ( -/^$*?()|[]{}\\ )");else{switch(e.target.id){case"login":i(!0),a.maxLength(50)?a.minLength(3)?i(!1):i("Login is too short!"):i("Login is too long!");break;case"password":switch(i(!0),a.testPassword()){case 0:i("Password must have at least 6 characters and include numbers and letters");break;default:i(!1)}break;case"email":i(!1),!a.isEmail()&&t.length>0&&i("Email Address not valid");break;case"phone":i(!1),t.length<4?(t="+38",i(!1)):(!/(^\+38\d+$)/.test(t)&&t.length>3&&(i("Phone number is not valid"),t=l),t.length>13&&(t=l),t.length<13&&!a.isPhoneNumber()&&i("Phone number is not valid"))}c(t)}},onBlur:function(e){b(!0)}}),r.a.createElement("span",{className:"errors"},h&&o))}a(63);function D(){var e=Object(n.useState)(!1),t=Object(p.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(!1),s=Object(p.a)(c,2),o=s[0],i=s[1],m=Object(n.useRef)();Object(n.useEffect)((function(){m.current.disabled=!a||!o}),[a,o]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Welcome"),r.a.createElement("form",null,r.a.createElement(N,{set:{type:"text",id:"login",label:"Login"},cb:l}),r.a.createElement(N,{set:{type:"password",id:"password",label:"Password"},cb:i}),r.a.createElement("button",{ref:m},"Login"),r.a.createElement(u.b,{to:"/signup"},"SignUp")))}a(64);function y(){var e=Object(n.useState)(!1),t=Object(p.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(!1),s=Object(p.a)(c,2),o=s[0],i=s[1],m=Object(n.useState)(!0),h=Object(p.a)(m,2),b=h[0],E=h[1],v=Object(n.useState)(!0),g=Object(p.a)(v,2),O=g[0],j=g[1],w=Object(n.useRef)();Object(n.useEffect)((function(){w.current.disabled=!a||!o||!1===b||!1===O}),[a,o,b,O]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Sign Up"),r.a.createElement("form",null,r.a.createElement(N,{set:{type:"text",id:"login",label:"Login"},cb:l}),r.a.createElement(N,{set:{type:"password",id:"password",label:"Password"},cb:i}),r.a.createElement(N,{set:{type:"text",id:"email",label:"E-mail"},cb:E}),r.a.createElement(N,{set:{type:"text",id:"phone",label:"Phone",value:"+38"},cb:j}),r.a.createElement(u.b,{to:"/ligin"},"Login"),r.a.createElement("button",{ref:w,onClick:function(e){var t,n;return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e.preventDefault(),t={loginName:a,password:o,email:b,phone:O},r.next=4,d.a.awrap(f(t));case 4:n=r.sent,console.log(n);case 6:case"end":return r.stop()}}))}},"SignUp")))}a(65);var k=function(){var e=JSON.parse(localStorage.getItem("userData"));return e||!1}()||!1;function C(e){var t=e.children,a=Object(s.a)(e,["children"]);return r.a.createElement(o.b,Object.assign({},a,{render:function(e){var a=e.location;return k?t:r.a.createElement(o.a,{to:{pathname:"/login",state:{from:a}}})}}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement((function(){return r.a.createElement(u.a,null,r.a.createElement(o.d,null,r.a.createElement(o.b,{path:"/login"},r.a.createElement(D,null)),r.a.createElement(o.b,{path:"/signup"},r.a.createElement(y,null)),r.a.createElement(C,{path:"/"},r.a.createElement(S,null))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[31,1,2]]]);
//# sourceMappingURL=main.e899c30a.chunk.js.map