(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{445:function(e,r,n){e.exports=n.p+"img/login-page.65eca51.gif"},495:function(e,r,n){"use strict";n.r(r);var t=[function(){var e=this.$createElement,r=this._self._c||e;return r("div",{staticClass:"text-center"},[r("img",{staticClass:"mw-100",attrs:{src:n(445),alt:""}})])}],o=n(10),l=(n(76),{layout:"full-page",auth:!1,data:function(){return{errorMsg:!1,signupForm:{},signupFormRules:{username:[{required:!0,message:"Username Is Required"}],phone:[{required:!0,message:"Phone Is Required"}],password:[{required:!0,message:"Password Is Required"}]}}},methods:{submitSignup:function(){var e=this;this.$refs.signupForm.validate(function(){var r=Object(o.a)(regeneratorRuntime.mark((function r(n){var t;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!n){r.next=14;break}return t=e.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),r.prev=2,r.next=5,e.$axios.post("/signup",e.signupForm);case 5:e.$router.push("/login"),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(2),e.errorMsg=!0;case 11:return r.prev=11,t.close(),r.finish(11);case 14:case"end":return r.stop()}}),r,null,[[2,8,11,14]])})));return function(e){return r.apply(this,arguments)}}())}}}),c=l,m=n(20),component=Object(m.a)(c,(function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"login-page"},[n("section",{staticClass:"login-page__form-container"},[e.errorMsg?n("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[e._v("\n      Wrong Data, Please try again!\n    ")]):e._e(),e._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[e._m(0),e._v(" "),n("el-form",{ref:"signupForm",attrs:{rules:e.signupFormRules,model:e.signupForm}},[n("el-form-item",{attrs:{label:" ",prop:"username"},scopedSlots:e._u([{key:"label",fn:function(){return[e._v("Username")]},proxy:!0}])},[e._v(" "),n("el-input",{model:{value:e.signupForm.username,callback:function(r){e.$set(e.signupForm,"username",r)},expression:"signupForm.username"}})],1),e._v(" "),n("el-form-item",{attrs:{label:" ",prop:"phone"},scopedSlots:e._u([{key:"label",fn:function(){return[e._v("Phone")]},proxy:!0}])},[e._v(" "),n("el-input",{model:{value:e.signupForm.phone,callback:function(r){e.$set(e.signupForm,"phone",r)},expression:"signupForm.phone"}})],1),e._v(" "),n("el-form-item",{attrs:{label:" ",prop:"password"},scopedSlots:e._u([{key:"label",fn:function(){return[e._v("Password")]},proxy:!0}])},[e._v(" "),n("el-input",{attrs:{type:"password"},model:{value:e.signupForm.password,callback:function(r){e.$set(e.signupForm,"password",r)},expression:"signupForm.password"}})],1)],1),e._v(" "),n("div",[n("button",{staticClass:"primary-btn btn-fill mt-1",on:{click:function(r){return r.preventDefault(),e.submitSignup()}}},[e._v("\n            Signup\n          ")])])],1)])])])}),t,!1,null,null,null);r.default=component.exports}}]);