(window.webpackJsonp=window.webpackJsonp||[]).push([[23,6],{441:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAXdJREFUOE+llMFVwkAQhmcWE49iBWIFYgVIB5YQwl1IBWIFwN2IHSgdhArUDighVwNvx5mQDXn7NprIXpJMNt/++effRSjGfJX1FakrjZ1NNMLU1NteUT6Yx1mgEFZyTwApIQyjkf/ZFibz8aAMPpj0xfRXDTADBLKh8+f9verQjXMRoq1Gby1/hkYdEkQPY38hC6CGxIYu4ixFhIs61fxnyTT0h6yQuqh32yrABZV5APu+C6iIZlwfsMrLg4cOVXVKXcBl/M024aNGHObAU6FO4CnQWuB/ob8Cm0G9W47I1tjl9pBzhkqvCL1ryZOzUZJFpd84pU+T8bl0Nh9OYLUYjbzEVoqggkl4tl6+ZBw52ExC/641sAo1oZatydHoMrBMSGOFx0hRT+ks4KyJqoHUOcRiTe5ja6AdZt41vT+b4vLQBtU9n6zQBrtjU5yJcmogYt7lpoOIpqZRlb1MXUW7d2N6U1g5r8hmCax0tPaYqlvE5Fbe/wBkbkhNMIxMBAAAAABJRU5ErkJggg=="},442:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAASNJREFUOE/tVLENwkAM/PRIaSiRYAAKNiBswAbABjABYQIYISOwAUlBzwhPR0EBE8Bd8EfJJ/koICQKLJ0+ju2L7XfsqQZ5KBXABcdLPKUSVwjs1QKGEJZ1jXmDQNpL4iJkVndgZ0UtofsIrIytfCllHhBYyiSX+QTBsZ1iSginEY4t0AM6wAXgOy3Ixw2gECfxv4r/AmTaENIhEhIf5xEYCtnNyqIrRCQcA2wLn+cZoQlApjGd6vpjEbMy9jmBf2BshR5+nVB6O8NXV8wAOm88gs4S22eYv1EpqXDzrUv+E7KNH/dwKgPPwadoGeD9W7dsD/JPDHaILLgDWVI6vA7h8mBLChvJ/vXYqxjoN5Ur9jPOgEvB+NftQxITLuGqyoiM4xNtZ4IVyfjpqgAAAABJRU5ErkJggg=="},444:function(e,t,r){e.exports=r.p+"img/pdf.fbf7d3f.png"},449:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAbhJREFUOE+dlNttwjAUhhsuz7BBywbpG+KimglKJyhswAalE0AngE7QMgGuQFHemk5AR6BvSFzS/498opAaEmrJQjHx5+9cYufqgtFut7t4/Q6zGoZhsFwuX9LbnTw8pVR1t9tNHMchMB6EYv3B9/1vWcwEGtgcMBebZtvtdkBAs9kcFAqFEaAapp1cwBTsdbFY9JKGSMEUz484pCaWJw1tsEaj4dIKYfYJaLVaQ5g/wbIDS83DrMBTsGKxODcFiQC5DLNgAPYR+hQwhj+B3QfgyprDS2GA/CB/rrXK/4Ht93vleV7AXALOaus4hwjhHYv3mFE1WQDJWTpMmglM8ij7IqD5At7YZ4B1L4Uhj1+lUklprdcREMoBq4dFd7PZVMvl8ief85glYXHbwDAUu0ToR9W0hZmGRcB6vX4DoxX+fEZSh7DVaNZrhF6T1sgLSxquze2hEt0fmO/3TwFsZkd9KGGicremDcaAsXG1XAZSzXOw2NCEHeDl1eFw6BMqJyavrixYDDStQ6MxZoVXEu0wXZgqU/EZ+rLH1pDDbL9Hl4MxJZSQCjfQCtAhisTGzxxnr68sGxv9FxqYoiSMgkwkAAAAAElFTkSuQmCC"},476:function(e,t,r){"use strict";r.r(t);var l={props:["modalTrigger"],emits:["update:modalTrigger"]},n=r(20),component=Object(n.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"popup"},[r("div",{staticClass:"popup__inner"},[r("div",{staticClass:"popup__exit"},[r("button",{staticClass:"exit-icon",attrs:{type:"button"},on:{click:function(t){return e.$emit("update:modalTrigger")}}},[e._v("\n        ×\n      ")])]),e._v(" "),e._t("default")],2)])}),[],!1,null,null,null);t.default=component.exports},498:function(e,t,r){"use strict";r.r(t);var l=r(10),n=(r(76),{data:function(){return{loading:!1,order:{},visitDate:"",visitTime:"",disabled:!0,statusOptions:[{value:"pending",label:"في انتظار التأكيد"},{value:"accepted",label:"تمت الموافقة"},{value:"rejected",label:"تم الرفض"},{value:"done",label:"تم التسليم"},{value:"inProgress",label:"يتم سحب العينة"}],orderStatus:"",reason:!1,whyRejected:"",clientNotes:"",errorMsg:!1,successMsg:!1,timeFrom:"",timeTo:"",modalTrigger:!1,editModalTrigger:!1,resultForm:{attachment:null},resultFormRules:{titleAr:[{required:!0,message:"This Field Is Required"}],titleEn:[{required:!0,message:"This Field Is Required"}],attachment:[{required:!0,message:"This Field Is Required"}]},results:null}},fetch:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getOrder();case 2:return t.next=4,e.getResult();case 4:case"end":return t.stop()}}),t)})))()},methods:{getOrder:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/orders/".concat(e.$route.params.id));case 2:return r=t.sent,t.next=5,r.data;case 5:return e.order=t.sent,t.next=8,r.data.status;case 8:return e.orderStatus=t.sent,t.next=11,r.data.day;case 11:return e.visitDate=t.sent,t.next=14,r.data.timeAttendance;case 14:return e.visitTime=t.sent,t.next=17,r.data.whyRejected;case 17:return e.clientNotes=t.sent,t.next=20,r.data.from;case 20:return e.timeFrom=t.sent,t.next=23,r.data.to;case 23:e.timeTo=t.sent;case 24:case"end":return t.stop()}}),t)})))()},dateFormat:function(e){var t=new Date(e);return t.getFullYear()+"-"+t.getMonth()+"-"+t.getDate()},deleteOrder:function(){var e=this;this.$confirm("Are you sure you want to this order","Warning",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then(Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$message({type:"success",message:"Delete completed"}),t.next=3,e.$axios.delete("orders/".concat(e.$route.params.id));case 3:e.$router.push("/orders");case 4:case"end":return t.stop()}}),t)})))).catch((function(){e.$message({type:"info",message:"Delete canceled"})}))},cancelEdit:function(){this.adminNotes="",this.orderStatus=this.order.status,this.visitDate=this.order.day,this.visitTime=this.order.from,this.disabled=!0,this.errorMsg=!1},saveEdit:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.visitDate!=e.order.day&&(e.visitDate=e.visitDate.toISOString()),r={status:e.orderStatus,whyRejected:e.whyRejected||" ",clientNotes:e.clientNotes||" ",timeAttendance:e.visitTime,day:e.visitDate},console.log(r),"rejected"==r.status||"accepted"==r.status){t.next=17;break}return t.prev=4,t.next=7,e.$axios.patch("/orders/".concat(e.$route.params.id),{status:r.status});case 7:e.disabled=!0,e.successMsg=!0,e.errorMsg=!1,t.next=15;break;case 12:t.prev=12,t.t0=t.catch(4),e.errorMsg=!0;case 15:t.next=28;break;case 17:return t.prev=17,t.next=20,e.$axios.patch("/orders/".concat(e.$route.params.id),r);case 20:e.disabled=!0,e.successMsg=!0,e.errorMsg=!1,t.next=28;break;case 25:t.prev=25,t.t1=t.catch(17),e.errorMsg=!0;case 28:case"end":return t.stop()}}),t,null,[[4,12],[17,25]])})))()},toggleModal:function(){this.modalTrigger=!this.modalTrigger},onFileSelected:function(e){e.target.files.length>0&&(this.resultForm.attachment=e.target.files[0],this.editResultForm.attachment=e.target.files[0])},addResult:function(){var e=this;this.$refs.resultForm.validate(function(){var t=Object(l.a)(regeneratorRuntime.mark((function t(r){var l,n,c,o,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r){t.next=33;break}return l=e.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),t.prev=2,(n=new FormData).append("pdf",e.resultForm.attachment),t.next=7,e.$axios.post("/images",n);case 7:return c=t.sent,t.next=10,c.data;case 10:return o=t.sent,(d=new FormData).append("titleAr",e.resultForm.titleAr),d.append("titleEn",e.resultForm.titleEn),d.append("attachment",o),d.append("subject",e.$route.params.id),d.append("subjectType","order"),t.next=19,e.$axios.post("/results",d);case 19:return e.resultForm={},e.toggleModal(),t.next=23,e.getResult();case 23:e.successMsg=!0,e.errorMsg=!1,t.next=30;break;case 27:t.prev=27,t.t0=t.catch(2),e.errorMsg=!0;case 30:return t.prev=30,l.close(),t.finish(30);case 33:case"end":return t.stop()}}),t,null,[[2,27,30,33]])})));return function(e){return t.apply(this,arguments)}}())},getResult:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/results?order=".concat(e.$route.params.id));case 2:return r=t.sent,t.next=5,r.data[0].docs;case 5:e.results=t.sent,console.log(e.reults);case 7:case"end":return t.stop()}}),t)})))()}}}),c=n,o=r(20),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return e.$fetchState.pending?e._e():l("section",[e.errorMsg?l("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[e._v("\n    بيانات مفقودة! من فضلك تأكد من ادخال جميع البيانات بشكل صحيح.\n  ")]):e._e(),e._v(" "),e.successMsg?l("div",{staticClass:"alert alert-success",attrs:{role:"alert"}},[e._v("\n    تم تعديل الحجز بنجاح .\n  ")]):e._e(),e._v(" "),l("div",{staticClass:"d-flex flex-row-reverse gap-3"},[l("img",{attrs:{src:r(442),alt:"delete icon",role:"button"},on:{click:e.deleteOrder}}),e._v(" "),l("img",{attrs:{src:r(441),alt:"edit icon",role:"button"},on:{click:function(t){e.disabled=!1}}}),e._v(" "),l("img",{attrs:{src:r(449),alt:"upload-file icon",role:"button"},on:{click:e.toggleModal}})]),e._v(" "),l("div",{staticClass:"cards mt-3"},[l("div",{staticClass:"card-item card-item--orders w-100 my-2"},[e._m(0),e._v(" "),l("div",{staticClass:"d-flex flex-wrap mx-5 gap-5 w-100"},[l("div",[l("div",{staticClass:"my-2 d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("رقم الحجز")]),e._v(" "),l("h6",{staticClass:"value"},[e._v(e._s(e.order.id))])]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("موعد الحجز")]),e._v(" "),l("h6",{staticClass:"value"},[e._v(e._s(e.dateFormat(e.order.day)))])])]),e._v(" "),l("div",[l("div",{staticClass:"my-2 d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("مكان الحجز")]),e._v(" "),l("h6",{staticClass:"value"},[e._v("\n              "+e._s("internal"==e.order.booking?"في المعمل":"في المنزل")+"\n            ")])]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("حالة الحجز")]),e._v(" "),l("h6",{staticClass:"value"},[l("el-select",{attrs:{placeholder:"Select",disabled:e.disabled,required:""},model:{value:e.orderStatus,callback:function(t){e.orderStatus=t},expression:"orderStatus"}},e._l(e.statusOptions,(function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),e._v(" "),"rejected"==e.orderStatus?l("div",[l("el-input",{attrs:{type:"input",placeholder:"سبب الرفض",required:"",disabled:e.disabled},model:{value:e.whyRejected,callback:function(t){e.whyRejected=t},expression:"whyRejected"}})],1):e._e()])])]),e._v(" "),l("div",{staticClass:"card-item card-item--orders w-100 my-2"},[e._m(1),e._v(" "),l("div",{staticClass:"d-flex flex-wrap mx-5 gap-5 w-100"},[l("div",[l("div",{staticClass:"my-2 d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("اسم العميل")]),e._v(" "),l("h6",{staticClass:"value"},[e._v(e._s(e.order.username))])]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("رقم الهاتف")]),e._v(" "),l("h6",{staticClass:"value"},[e._v(e._s(e.order.phone))])]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("تاريخ الزيارة")]),e._v(" "),l("h6",{staticClass:"value"},[l("div",{staticClass:"block"},[l("el-date-picker",{attrs:{type:"date",disabled:e.disabled||"accepted"!=e.orderStatus,required:""},model:{value:e.visitDate,callback:function(t){e.visitDate=t},expression:"visitDate"}})],1)])]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("مـــلاحــظــة")]),e._v(" "),l("h6",{staticClass:"value"},[e._v(e._s(e.order.clientNotes||"لا يوجــد"))])])]),e._v(" "),l("div",[l("div",{staticClass:"my-2 d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("العنوان")]),e._v(" "),l("h6",{staticClass:"value"},[e._v("\n              "+e._s("internal"==e.order.booking?"في المعمل":"في المنزل")+"\n            ")])]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("النوع")]),e._v(" "),l("h6",{staticClass:"value"},[e._v("\n              "+e._s("male"==e.order.gender?"ذكر":"انثى")+"\n            ")]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2 me-4"},[l("h6",{staticClass:"key"},[e._v("السن")]),e._v(" "),l("h6",{staticClass:"value"},[e._v(e._s(e.order.age))])])]),e._v(" "),l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("وقت الزيارة")]),e._v(" "),l("h6",{staticClass:"value"},[l("el-time-select",{attrs:{"picker-options":{start:"01:00",step:"00:30",end:"24:00"},disabled:e.disabled||"accepted"!=e.orderStatus},model:{value:e.visitTime,callback:function(t){e.visitTime=t},expression:"visitTime"}})],1)]),e._v(" "),"external"==e.order.booking?l("div",{staticClass:"d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("من")]),e._v(" "),l("h6",{staticClass:"value"},[l("el-time-select",{attrs:{disabled:""},model:{value:e.timeFrom,callback:function(t){e.timeFrom=t},expression:"timeFrom"}})],1),e._v(" "),l("h6",{staticClass:"key"},[e._v("الي")]),e._v(" "),l("h6",{staticClass:"value"},[l("el-time-select",{attrs:{disabled:""},model:{value:e.timeTo,callback:function(t){e.timeTo=t},expression:"timeTo"}})],1)]):e._e()])])]),e._v(" "),l("div",{staticClass:"card-item card-item--orders w-100 my-2"},[e._m(2),e._v(" "),e.order.products.length>0?l("div",{staticClass:"d-flex flex-wrap mx-5 gap-5 w-100"},e._l(e.order.products,(function(t){return l("div",{key:t,staticClass:"my-2 d-flex align-items-center gap-2"},[l("h6",{staticClass:"key"},[e._v("الفحص")]),e._v(" "),l("h6",{staticClass:"value"},[e._v(e._s(t.titleAr))])])})),0):e._e(),e._v(" "),e.order.images.length>0?l("div",{staticClass:"d-flex flex-wrap mx-5 gap-5 w-100"},e._l(e.order.images,(function(image){return l("div",{key:image,staticClass:"my-2 d-flex align-items-center gap-2"},[l("img",{attrs:{src:image,alt:"client image",width:"150",height:"150"}})])})),0):e._e()]),e._v(" "),l("div",{staticClass:"card-item card-item--orders w-100 my-2"},[e._m(3),e._v(" "),e.results?l("div",{staticClass:"d-flex flex-wrap mx-5 gap-5 w-100"},e._l(e.results,(function(e){return l("div",{key:e.id,staticClass:"my-2 d-flex align-items-center gap-2"},[l("a",{attrs:{href:e.attachment,target:"_blank"}},[l("img",{attrs:{src:r(444),alt:"pdf incon"}})])])})),0):l("div",{staticClass:"m-5 w-100 align-middle"},[e._v("\n        لا توجد نتيجة مضافة حتي الان\n      ")])]),e._v(" "),l("div",{staticClass:"card-item w-100 my-2"},[l("label",{staticClass:"form-label fw-bold",attrs:{for:"exampleFormControlTextarea1"}},[e._v("ملاحظات للعميل")]),e._v(" "),l("textarea",{directives:[{name:"model",rawName:"v-model",value:e.clientNotes,expression:"clientNotes"}],staticClass:"form-control",attrs:{id:"exampleFormControlTextarea1",rows:"3",disabled:e.disabled},domProps:{value:e.clientNotes},on:{input:function(t){t.target.composing||(e.clientNotes=t.target.value)}}})])]),e._v(" "),e.disabled?e._e():l("div",{staticClass:"buttons w-100 p-3 d-flex gap-2 justify-content-end"},[l("button",{staticClass:"secondary-btn w-25 align-self-end",attrs:{type:"submit"},on:{click:e.saveEdit}},[e._v("\n      حفظ\n    ")]),e._v(" "),l("button",{staticClass:"secondary-btn w-25 align-self-end",attrs:{type:"submit"},on:{click:e.cancelEdit}},[e._v("\n      الغاء\n    ")])]),e._v(" "),e.modalTrigger?l("UIPopupForm",{attrs:{modalTrigger:e.modalTrigger},on:{"update:modalTrigger":e.toggleModal}},[l("el-form",{ref:"resultForm",staticClass:"p-5 d-flex flex-column",attrs:{rules:e.resultFormRules,model:e.resultForm}},[l("el-form-item",{attrs:{label:" ",prop:"titleAr"}},[l("span",[e._v(" اسم التحليل باللغة العربية ")]),e._v(" "),l("el-input",{attrs:{placeholder:"اكتب اسم التحليل باللغة العربية"},model:{value:e.resultForm.titleAr,callback:function(t){e.$set(e.resultForm,"titleAr",t)},expression:"resultForm.titleAr"}})],1),e._v(" "),l("el-form-item",{attrs:{label:" ",prop:"titleEn"}},[l("span",[e._v("اسم التحليل باللغة الانجليزية")]),e._v(" "),l("el-input",{attrs:{placeholder:"اكتب اسم التحليل باللغة الانجليزية"},model:{value:e.resultForm.titleEn,callback:function(t){e.$set(e.resultForm,"titleEn",t)},expression:"resultForm.titleEn"}})],1),e._v(" "),l("el-form-item",{attrs:{label:" ",prop:"attachment"}},[l("label",{staticClass:"form-label",attrs:{for:"formFile"}},[e._v("اختر نتيجة التحليل")]),e._v(" "),l("input",{staticClass:"form-control",attrs:{type:"file",id:"formFile",accept:""},on:{change:e.onFileSelected}})]),e._v(" "),l("button",{staticClass:"secondary-btn w-50 align-self-end",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.addResult.apply(null,arguments)}}},[e._v("\n        اضافة نتيجة\n      ")])],1)],1):e._e(),e._v(" "),e.editModalTrigger?l("UIPopupForm",{attrs:{modalTrigger:e.editModalTrigger},on:{"update:modalTrigger":e.toggleEditModal}},[l("el-form",{ref:"editResultForm",staticClass:"p-5 d-flex flex-column",attrs:{rules:e.editResultFormRules,model:e.editResultForm}},[l("el-form-item",{attrs:{label:" ",prop:"titleAr"}},[l("span",[e._v(" اسم التحليل باللغة العربية ")]),e._v(" "),l("el-input",{attrs:{placeholder:"اكتب اسم التحليل باللغة العربية"},model:{value:e.editResultForm.titleAr,callback:function(t){e.$set(e.editResultForm,"titleAr",t)},expression:"editResultForm.titleAr"}})],1),e._v(" "),l("el-form-item",{attrs:{label:" ",prop:"titleEn"}},[l("span",[e._v("اسم التحليل باللغة الانجليزية")]),e._v(" "),l("el-input",{attrs:{placeholder:"اكتب اسم التحليل باللغة الانجليزية"},model:{value:e.editResultForm.titleEn,callback:function(t){e.$set(e.editResultForm,"titleEn",t)},expression:"editResultForm.titleEn"}})],1),e._v(" "),l("el-form-item",{attrs:{label:" ",prop:"attachment"}},[l("label",{staticClass:"form-label",attrs:{for:"formFile"}},[e._v("اختر نتيجة التحليل")]),e._v(" "),l("input",{staticClass:"form-control",attrs:{type:"file",id:"formFile",accept:""},on:{change:e.onFileSelected}})]),e._v(" "),l("button",{staticClass:"secondary-btn w-50 align-self-end",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.editResult.apply(null,arguments)}}},[e._v("\n        حفظ التغييرات\n      ")])],1)],1):e._e()],1)}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"date d-flex"},[r("div",{staticClass:"align-self-center text-center"},[e._v("تفاصيل الحجز")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"date d-flex"},[r("div",{staticClass:"align-self-center text-center"},[e._v("بيانات المعمل")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"date d-flex"},[r("div",{staticClass:"align-self-center text-center"},[e._v("تفاصيل الخدمة")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"date d-flex"},[r("div",{staticClass:"align-self-center text-center"},[e._v("نتيجة التحليل")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{UIPopupForm:r(476).default})}}]);