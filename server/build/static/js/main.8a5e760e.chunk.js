(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{108:function(e,t,a){},114:function(e,t,a){},115:function(e,t,a){},116:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(22),c=a.n(s),l=(a(44),a(17)),o=a(1),u=a(35),i=a.n(u),m=a(8),p=a(13),d=a(19),b=a(2),f=a.n(b),h=(a(48),a(12)),v=a.n(h);function g(){localStorage.removeItem("userData")}function E(e){var t,a;return f.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t={},n.prev=1,n.next=4,f.a.awrap(v.a.post("./users/login",e));case 4:"object"===typeof(a=n.sent).data.result&&(r=a.data.result,localStorage.setItem("userData",JSON.stringify(r)),t.result=!0),console.error("servRes.data.result"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(1),500===n.t0.response.status?t.error="Server does not respond.":t.error=n.t0.response.data.message;case 12:return n.abrupt("return",t);case 13:case"end":return n.stop()}var r}),null,null,[[1,9]])}function j(){return f.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.awrap(v.a.get("./users/logout"));case 3:g(),document.location.href="/",e.next=12;break;case 7:if(e.prev=7,e.t0=e.catch(0),500!==e.t0.response.status){e.next=11;break}return e.abrupt("return","Server does not respond.");case 11:return e.abrupt("return",e.t0.response.data.message);case 12:case"end":return e.stop()}}),null,null,[[0,7]])}function O(){var e,t;return f.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e={},a.prev=1,a.next=4,f.a.awrap(v.a.get("/users/get"));case 4:(t=a.sent).data.result.length>0?e.result=t.data.result:e.error="No users in the database",a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),401===a.t0.response.status?(g(),document.location.href="/"):e.error="Server does not respond.";case 11:return a.abrupt("return",e);case 12:case"end":return a.stop()}}),null,null,[[1,8]])}function w(e){var t,a;return f.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t={},n.prev=1,n.next=4,f.a.awrap(v.a.post("/users/delete",e));case 4:a=n.sent,t.result=a.data.result,n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),500===n.t0.response.status?t.error="Server does not respond.":t.error=n.t0.response.data.message;case 11:return n.abrupt("return",t);case 12:case"end":return n.stop()}}),null,null,[[1,8]])}function x(e){var t,a;return f.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t={},n.prev=1,n.next=4,f.a.awrap(v.a.post("/users/create",e));case 4:a=n.sent,console.log(a.data.status),1===a.data.status?t.result=!0:t.error=a.data.error,n.next=13;break;case 9:n.prev=9,n.t0=n.catch(1),500===n.t0.response.status&&(t.error="Server does not respond."),t.error=n.t0.response.data.message;case 13:return n.abrupt("return",t);case 14:case"end":return n.stop()}}),null,null,[[1,9]])}function N(e,t){var a,n;return f.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return a={},r.prev=1,r.next=4,f.a.awrap(v.a.put("/users/update/".concat(e),t));case 4:n=r.sent,a.result=n.data.result,r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),500===r.t0.response.status?a.error="Server does not respond.":a.error=r.t0.response.data.message;case 11:return r.abrupt("return",a);case 12:case"end":return r.stop()}}),null,null,[[1,8]])}function y(e){var t,a,n;return f.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return t={},r.prev=1,(a=new FormData).append("photo",e[0]),r.next=6,f.a.awrap(v.a.post("files/upload",a,{headers:{"Content-Type":"multipart/form-data"}}));case 6:n=r.sent,t.fileName=n.data.result,r.next=13;break;case 10:r.prev=10,r.t0=r.catch(1),500===r.t0.response.status?t.error="Server does not respond.":t.error=r.t0.response.data.message;case 13:return r.abrupt("return",t);case 14:case"end":return r.stop()}}),null,null,[[1,10]])}function S(e){var t,a,n;return f.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return t={},r.prev=1,(a=new FormData).append("csvFile",e[0]),r.next=6,f.a.awrap(v.a.post("/users/csv",a,{headers:{"Content-Type":"multipart/form-data"}}));case 6:n=r.sent,t.result=n.data.result,r.next=13;break;case 10:r.prev=10,r.t0=r.catch(1),500===r.t0.response.status?t.error="Server does not respond.":t.error=r.t0.response.data.message;case 13:return r.abrupt("return",t);case 14:case"end":return r.stop()}}),null,null,[[1,10]])}var k=r.a.createContext(),C=r.a.createContext(),D=a(36),P=(a(89),function(){return r.a.createElement("div",{className:"sweet-loading"},r.a.createElement(D.ScaleLoader,{css:"\n  display: block;\n  margin: 0 auto;\n  border-color: red;\n",color:"#065a69"}))});a(90);function L(e){var t=e.trim();this.maxLength=function(e){return!(t.length>e)},this.minLength=function(e){return!(t.length<e)},this.isEmail=function(){return!!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(t)},this.isPhoneNumber=function(){return!!/\+38[0-9]{10,10}$/.test(t)},this.noSpe\u0441ialChar=function(){return!!/[-\/\\^$*?()|[\]{}]/g.test(t)},this.testPassword=function(){var e=new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})").test(t)?2:e.test(t)?1:0}}a(91);var A=function(e){var t=e.options,a=e.onValid,s=Object(n.useState)(t.value||""),c=Object(o.a)(s,2),l=c[0],u=c[1],i=Object(n.useState)(!1),m=Object(o.a)(i,2),p=m[0],d=m[1],b=Object(n.useState)(!1),f=Object(o.a)(b,2),h=f[0],v=f[1];return Object(n.useEffect)((function(){p?a(!1):"phone"===t.id?a(""):a(l)}),[p,l,a]),r.a.createElement("div",{className:"mui-textfield"},r.a.createElement("input",{type:t.type,id:t.id,value:l,onChange:function(e){var t=e.target.value.trim(),a=new L(t);if(a.noSpe\u0441ialChar())v(!0),d("Not allowed special characters ( -/^$*?()|[]{}\\ )");else{switch(e.target.id){case"login":d(!0),a.maxLength(50)?a.minLength(3)?d(!1):d("Login is too short!"):d("Login is too long!");break;case"password":switch(d(!0),a.testPassword()){case 0:d("Password must have at least 6 characters and include numbers and letters");break;default:d(!1)}break;case"email":d(!1),!a.isEmail()&&t.length>0&&d("Email Address not valid");break;case"phone":d(!1),t.length<4?(t="+38",d(!1)):(!/(^\+38\d+$)/.test(t)&&t.length>3&&(d("Phone number is not valid"),t=l),t.length>13&&(t=l),t.length<13&&!a.isPhoneNumber()&&d("Phone number is not valid"))}u(t)}},onBlur:function(e){v(!0)},disabled:t.disabled}),r.a.createElement("label",{htmlFor:t.id},t.label),r.a.createElement("span",{className:"errors"},h&&p))},I=Object(n.memo)((function(e){var t=e.options,a=e.onChange,s=Object(n.useState)(t.value),c=Object(o.a)(s,2),l=c[0],u=c[1];return r.a.createElement("div",{className:"mui-select"},r.a.createElement("select",{id:t.id,value:l,onChange:function(e){u(e.target.value),a(e.target.value)},disabled:t.disabled},t.selectors.map((function(e,t){return r.a.createElement("option",{key:t,value:e.val},e.name)}))),r.a.createElement("label",{htmlFor:t.id},t.label))})),M=(a(92),function(e){var t="";switch(e.type){case 0:t="successful";break;case 1:t="warning";break;case 2:t="error"}return r.a.createElement("div",{className:"form-message ".concat(t)},r.a.createElement("span",{className:"form-message-text"},e.messange," "))}),U=a(14);function V(e){var t=e.userData,a=e.onClose,s=e.updateTable,c=Object(n.useContext)(C).user,l=Object(n.useState)(!1),u=Object(o.a)(l,2),i=u[0],m=u[1],p=Object(n.useState)(!1),d=Object(o.a)(p,2),b=d[0],h=d[1],v=Object(n.useState)(!0),g=Object(o.a)(v,2),E=g[0],j=g[1],O=Object(n.useState)(!0),w=Object(o.a)(O,2),S=w[0],k=w[1],D=Object(n.useState)(!1),L=Object(o.a)(D,2),V=L[0],F=L[1],B=Object(n.useState)(t.usergroup||"user"),R=Object(o.a)(B,2),$=R[0],Z=R[1],J=Object(n.useState)(!1),T=Object(o.a)(J,2),W=T[0],z=T[1],_=Object(n.useState)(!1),H=Object(o.a)(_,2),Y=H[0],q=H[1],G=Object(n.useState)(void 0!==t.photo&&t.photo.length>0&&t.photo[0].fileName),K=Object(o.a)(G,2),Q=K[0],X=K[1],ee=Object(n.useState)(void 0!==t.photo&&t.photo.length>0&&t.photo[0].storePath),te=Object(o.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)(!1),se=Object(o.a)(re,2),ce=se[0],le=se[1];Object(n.useEffect)((function(){t.userId&&h(!0),i&&b&&!1!==E&&!1!==S&&"admin"===c.usergroup?t.loginName===i&&t.email===E&&t.phone===S&&t.usergroup===$&&t.photo===Q||z(!0):z(!1)}),[i,b,E,S,$,Q]);return r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h2",null,t.userId?"UserID: ".concat(t.userId):"New User"),r.a.createElement("span",{className:t.online?"status status-online":"status status-offline"},t.online?"onLine":"offLine")),r.a.createElement("form",{className:"mui-form"},r.a.createElement("div",{className:"form-body"},r.a.createElement("div",{className:"user-photo-wr "},r.a.createElement("img",{src:Q?ae+Q:"/img/user.svg",alt:"user-photo",className:"user-photo"}),r.a.createElement("div",{className:"upload-btn-wrapper"},r.a.createElement("button",{className:"mui-btn mui-btn--raised"},"Upload photo"),r.a.createElement("input",{type:"file",name:"myfile",onChange:function(e){var t;return f.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e.preventDefault(),a.next=3,f.a.awrap(y(e.target.files));case 3:(t=a.sent).fileName&&(X(t.fileName),ne("/uploads/")),t.error?le({msg:t.error,type:2}):le(!1);case 6:case"end":return a.stop()}}))}})),ce&&r.a.createElement(M,{messange:ce.msg,type:ce.type})),r.a.createElement("div",{className:"text-filds"},r.a.createElement(A,{options:{type:"text",id:"login",label:"Login:",value:t.loginName,disabled:"admin"!==c.usergroup},onValid:m}),!t.userId&&r.a.createElement(A,{options:{type:"password",id:"password",label:"Password:",value:"",disabled:"admin"!==c.usergroup},onValid:h}),r.a.createElement(A,{options:{type:"text",id:"email",label:"E-mail:",value:t.email,disabled:"admin"!==c.usergroup},onValid:j}),r.a.createElement(A,{options:{type:"text",id:"phone",label:"Phone:",value:t.phone||"+38",disabled:"admin"!==c.usergroup},onValid:k}),r.a.createElement(I,{options:{id:"usergroup",value:$,label:"Usergroup:",disabled:"admin"!==c.usergroup,selectors:[{val:"user",name:"User"},{val:"admin",name:"Admin"},{val:"superAdmin",name:"SuperAdmin"}]},onChange:Z}),t.registrated&&r.a.createElement("p",null,"Registrated:"," ",U(t.registrated).format("MMM DD hh:mm:ss")),t.registrated&&r.a.createElement("p",null,"Last Visit:"," ",U(t.lastVisit).format("MMM DD hh:mm:ss")))),r.a.createElement("div",{className:"form-footer"},Y&&r.a.createElement(P,null),V&&r.a.createElement(M,{messange:V.msg,type:V.type}),W&&r.a.createElement("button",{onClick:function(e){var a,n;return f.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.preventDefault(),F(!1),q(!0),!t.userId){r.next=11;break}return r.next=6,f.a.awrap(N(t.userId,{loginName:i,email:E,phone:S,usergroup:$,photo:Q}));case 6:a=r.sent,q(!1),a.result?(F({msg:"User successfully updated",type:0}),s()):F({msg:a.error,type:2}),r.next=16;break;case 11:return r.next=13,f.a.awrap(x({loginName:i,password:b,email:E,phone:S,usergroup:$,photo:Q}));case 13:n=r.sent,q(!1),n.error?F({msg:n.error,type:2}):(F({msg:"New user was created successfully",type:0}),s());case 16:case"end":return r.stop()}}))},className:"mui-btn  mui-btn--raised mui-btn--primary"},"Save"),r.a.createElement("button",{onClick:function(e){e.preventDefault(),a()},className:"mui-btn mui-btn--raised"},"Close"))))}a(94);var F=Object(n.memo)((function(e){var t=e.userData,a=Object(n.useContext)(k),s=a.actionSelect,c=a.actionShowUser;return r.a.createElement("tr",{onClick:function(e){c(e,t.userId)}},r.a.createElement("td",{className:"checkbox"},r.a.createElement("input",{className:"checkbox-input",type:"checkbox",name:"select",checked:t.isSelected||!1,onChange:function(){s(t.userId)}})),r.a.createElement("td",null,t.loginName),r.a.createElement("td",null,t.email),r.a.createElement("td",null,t.phone),r.a.createElement("td",null,t.usergroup),r.a.createElement("td",null,U(t.lastVisit).format("MMM DD hh:mm:ss")),r.a.createElement("td",null,U(t.registrated).format("MMM DD hh:mm:ss")))})),B=r.a.memo(F);var R=a(18);function $(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",{className:"section-header"},"APP Stat"),r.a.createElement("h3",null,"Bar"),r.a.createElement(R.Bar,{data:"https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv",labels:"flavor",values:"price"}),r.a.createElement("h3",null,"Pie"),r.a.createElement(R.Pie,{data:{labels:["North","South","East","West"],values:[10,5,8,3]},title:"Regions",colors:["red","orange","blue","skyblue"],roughness:8,strokeWidth:3}),r.a.createElement(R.StackedBar,{data:[{month:"Jan",A:20,B:5,C:10},{month:"Feb",A:25,B:10,C:20},{month:"March",A:30,B:50,C:10}],labels:"month",title:"Monthly Revenue"}))}a(108);var Z=[{path:"/",exact:!0,main:function(){return r.a.createElement("h2",{className:"section-header"},"Main page")}},{path:"/users",main:function(){var e=Object(n.useContext)(C).user,t=Object(n.useState)([]),a=Object(o.a)(t,2),s=a[0],c=a[1],l=Object(n.useState)({open:!1,data:{}}),u=Object(o.a)(l,2),i=u[0],m=u[1],p=Object(n.useState)(0),b=Object(o.a)(p,2),h=b[0],v=b[1],g=Object(n.useState)(!1),E=Object(o.a)(g,2),j=E[0],x=E[1],N=Object(n.useState)(!1),y=Object(o.a)(N,2),D=y[0],L=y[1],A=Object(n.useState)(!1),I=Object(o.a)(A,2),U=I[0],F=I[1],R=Object(n.useState)({data:{},show:!0}),$=Object(o.a)(R,2),Z=($[0],$[1]);Object(n.useEffect)((function(){J()}),[]);var J=function(){var e;return f.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return x(!0),t.next=3,f.a.awrap(O());case 3:e=t.sent,x(!1),L(!1),v(0),e.error?L({msg:e.error,type:2}):c(e.result);case 8:case"end":return t.stop()}}))},T=function(e){var t=0,a=s.map((function(a){return a.userId!==e&&e||(a.isSelected=!a.isSelected),a.isSelected&&(t+=1),a}));c(a),v(t)};return r.a.createElement(r.a.Fragment,null,i.open&&r.a.createElement(V,{onClose:function(){m((function(e){return Object(d.a)({},e,{open:!1,data:{}})}))},userData:i.data,updateTable:J}),r.a.createElement("h2",{className:"section-header"},"Users"),"admin"===e.usergroup&&r.a.createElement("div",{className:"action-bar"},r.a.createElement("button",{onClick:function(){m((function(e){return Object(d.a)({},e,{open:!0})}))},className:"mui-btn mui-btn--small mui-btn--raised"},"ADD User"),r.a.createElement("div",{className:"upload-btn-wrapper"},r.a.createElement("button",{className:"mui-btn mui-btn--raised"},"ADD from csv"),r.a.createElement("input",{type:"file",name:"myfile",onChange:function(e){var t;return f.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e.preventDefault(),a.next=3,f.a.awrap(S(e.target.files));case 3:t=a.sent,Z({data:t,show:!0}),console.log(t),J();case 7:case"end":return a.stop()}}))}})),r.a.createElement("button",{onClick:function(){var e,t;return f.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return x(!0),e=[],s.forEach((function(t){t.isSelected&&e.push(t.userId)})),a.next=5,f.a.awrap(w(e));case 5:t=a.sent,x(!1),t.result?J():L({msg:t.error,type:2});case 8:case"end":return a.stop()}}))},disabled:0===h,className:"mui-btn mui-btn--small mui-btn--raised mui-btn--danger"},"Delete")),r.a.createElement(k.Provider,{value:{actionSelect:T,actionShowUser:function(e,t){if("checkbox"!==e.target.type&&!e.target.classList.contains("checkbox")){var a=s.find((function(e){return e.userId===t}));m((function(e){return Object(d.a)({},e,{open:!0,data:a})}))}}}},r.a.createElement("div",{className:"user-table"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"checkbox"},r.a.createElement("input",{type:"checkbox",name:"select",checked:U,onChange:function(){console.log(),F(!U),T()}})),r.a.createElement("th",null,"Login Name"),r.a.createElement("th",null,"Email"),r.a.createElement("th",null,"Phone"),r.a.createElement("th",null,"Usergroup"),r.a.createElement("th",null,"Last Visit"),r.a.createElement("th",null,"Registrated"))),r.a.createElement("tbody",null,!!s&&s.map((function(e){return r.a.createElement(B,{key:e.userId,userData:e})}))),r.a.createElement("tfoot",null,r.a.createElement("tr",null))),j&&r.a.createElement(P,null),D&&r.a.createElement(M,{messange:D.msg,type:D.type}),r.a.createElement("div",{className:"selected"},"Selected: ",h))))}},{path:"/posts",main:function(){return r.a.createElement("h2",{className:"section-header"},"Posts")}}];function J(){var e=Object(n.useContext)(C).user;return r.a.createElement(m.a,null,r.a.createElement("div",{className:"main"},r.a.createElement("div",{className:"side-bar"},r.a.createElement("div",{className:"user"},r.a.createElement("img",{src:e.photo.length>0?e.photo[0].storePath+e.photo[0].fileName:"./img/user.svg",alt:"user",className:"user-img"}),r.a.createElement("h4",{className:"user-welcome"},"Hi, ",e.loginName),r.a.createElement("p",{className:"user-right"},"You are ",r.a.createElement("strong",null,e.usergroup)),r.a.createElement("button",{onClick:j,className:"user-logout"},"Logout...")),r.a.createElement("hr",null),r.a.createElement("ul",{className:"bar-nav"},r.a.createElement("li",null,r.a.createElement(m.c,{activeClassName:"active",exact:!0,to:"/"},"Main page")),r.a.createElement("li",null,r.a.createElement(m.c,{activeClassName:"active",exact:!0,to:"/users"},"Users")),r.a.createElement("li",null,r.a.createElement(m.c,{activeClassName:"active",exact:!0,to:"/posts"},"Posts")),"admin"===e.usergroup&&r.a.createElement("li",null,r.a.createElement(m.c,{to:"/stats",exact:!0,activeClassName:"active"},"APP stats"))),r.a.createElement("hr",null)),r.a.createElement("div",{className:"work-flow"},r.a.createElement(p.d,null,Z.map((function(e,t){return r.a.createElement(p.b,{key:t,path:e.path,exact:e.exact,children:r.a.createElement(e.main,null)})})),r.a.createElement(T,{path:"/stats"},r.a.createElement($,null))))))}function T(e){var t=e.children,a=Object(l.a)(e,["children"]),s=Object(n.useContext)(C).user;return r.a.createElement(p.b,Object.assign({},a,{render:function(e){var a=e.location;return"admin"===s.usergroup?t:r.a.createElement(p.a,{to:{pathname:"/",state:{from:a}}})}}))}a(114);function W(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)(!1),l=Object(o.a)(c,2),u=l[0],i=l[1],p=Object(n.useState)(!1),d=Object(o.a)(p,2),b=d[0],h=d[1],v=Object(n.useState)(!1),g=Object(o.a)(v,2),j=g[0],O=g[1],w=Object(n.useState)(!1),x=Object(o.a)(w,2),N=x[0],y=x[1],S=Object(n.useRef)();Object(n.useEffect)((function(){y(!(!a||!u))}),[a,u]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:"welcome-text"},"Welcome"),r.a.createElement("form",{className:"mui-panel login-form"},r.a.createElement(A,{options:{type:"text",id:"login",label:"Login:",value:"",disabled:!1},onValid:s}),r.a.createElement(A,{options:{type:"password",id:"password",label:"Password:",value:""},onValid:i}),j&&r.a.createElement(P,null),b&&r.a.createElement(M,{messange:b.msg,type:b.type}),r.a.createElement("div",{className:"form-bottom"},r.a.createElement("button",{ref:S,onClick:function(e){var t;return f.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),O(!0),n.next=4,f.a.awrap(E({loginName:a,password:u}));case 4:t=n.sent,O(!1),t.result?document.location.href="/":h({msg:t.error,type:2});case 7:case"end":return n.stop()}}))},disabled:!N,className:"mui-btn   mui-btn--raised mui-btn--primary"},"Login"),r.a.createElement(m.b,{to:"/signup",className:"mui-btn mui-btn--flat"},"SignUp"))))}a(115);function z(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)(!1),l=Object(o.a)(c,2),u=l[0],i=l[1],p=Object(n.useState)(!0),d=Object(o.a)(p,2),b=d[0],h=d[1],v=Object(n.useState)(!0),g=Object(o.a)(v,2),E=g[0],j=g[1],O=Object(n.useState)(!1),w=Object(o.a)(O,2),N=w[0],y=w[1],S=Object(n.useState)(!1),k=Object(o.a)(S,2),C=k[0],D=k[1],L=Object(n.useState)(!1),I=Object(o.a)(L,2),U=I[0],V=I[1],F=Object(n.useRef)();Object(n.useEffect)((function(){D(!(!a||!u||!1===b||!1===E))}),[a,u,b,E]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:"welcome-text"},"Sign Up"),r.a.createElement("form",{className:"mui-panel login-form"},r.a.createElement(A,{options:{type:"text",id:"login",label:"Login:",value:"",disabled:!1},onValid:s}),r.a.createElement(A,{options:{type:"password",id:"password",label:"Password:",value:""},onValid:i}),r.a.createElement(A,{options:{type:"text",id:"email",label:"E-mail:",value:""},onValid:h}),r.a.createElement(A,{options:{type:"text",id:"phone",label:"Phone:",value:"+38"},onValid:j}),U&&r.a.createElement(P,null),N&&r.a.createElement(M,{messange:N.msg,type:N.type}),r.a.createElement("div",{className:"form-bottom"},r.a.createElement(m.b,{to:"/ligin",className:"mui-btn mui-btn--flat"},"Login"),r.a.createElement("button",{ref:F,onClick:function(e){var t,n;return f.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return V(!0),e.preventDefault(),t={loginName:a,password:u,email:b,phone:E},r.next=5,f.a.awrap(x(t));case 5:n=r.sent,V(!1),n.error?y({msg:n.error,type:2}):(y({msg:"registration successful",type:0}),setTimeout((function(){document.location.href="/"}),2e3));case 8:case"end":return r.stop()}}))},disabled:!C,className:"mui-btn   mui-btn--raised mui-btn--primary"},"SignUp"))))}i.a.config();var _=function(){var e=JSON.parse(localStorage.getItem("userData"));return e||!1}();function H(e){var t=e.children,a=Object(l.a)(e,["children"]);return r.a.createElement(p.b,Object.assign({},a,{render:function(e){var a=e.location;return _?t:r.a.createElement(p.a,{to:{pathname:"/login",state:{from:a}}})}}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement((function(){var e=Object(n.useState)(_),t=Object(o.a)(e,2),a=t[0],s=t[1];return r.a.createElement(C.Provider,{value:{user:a,setUser:s}},r.a.createElement(m.a,null,r.a.createElement(p.d,null,r.a.createElement(p.b,{path:"/login"},r.a.createElement(W,null)),r.a.createElement(p.b,{path:"/signup"},r.a.createElement(z,null)),r.a.createElement(H,{path:"/"},r.a.createElement(J,null)))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},39:function(e,t,a){e.exports=a(116)},44:function(e,t,a){},48:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){},94:function(e,t,a){}},[[39,1,2]]]);
//# sourceMappingURL=main.8a5e760e.chunk.js.map