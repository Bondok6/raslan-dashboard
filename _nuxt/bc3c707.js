(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{440:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAXdJREFUOE+llMFVwkAQhmcWE49iBWIFYgVIB5YQwl1IBWIFwN2IHSgdhArUDighVwNvx5mQDXn7NprIXpJMNt/++effRSjGfJX1FakrjZ1NNMLU1NteUT6Yx1mgEFZyTwApIQyjkf/ZFibz8aAMPpj0xfRXDTADBLKh8+f9verQjXMRoq1Gby1/hkYdEkQPY38hC6CGxIYu4ixFhIs61fxnyTT0h6yQuqh32yrABZV5APu+C6iIZlwfsMrLg4cOVXVKXcBl/M024aNGHObAU6FO4CnQWuB/ob8Cm0G9W47I1tjl9pBzhkqvCL1ryZOzUZJFpd84pU+T8bl0Nh9OYLUYjbzEVoqggkl4tl6+ZBw52ExC/641sAo1oZatydHoMrBMSGOFx0hRT+ks4KyJqoHUOcRiTe5ja6AdZt41vT+b4vLQBtU9n6zQBrtjU5yJcmogYt7lpoOIpqZRlb1MXUW7d2N6U1g5r8hmCax0tPaYqlvE5Fbe/wBkbkhNMIxMBAAAAABJRU5ErkJggg=="},441:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAASNJREFUOE/tVLENwkAM/PRIaSiRYAAKNiBswAbABjABYQIYISOwAUlBzwhPR0EBE8Bd8EfJJ/koICQKLJ0+ju2L7XfsqQZ5KBXABcdLPKUSVwjs1QKGEJZ1jXmDQNpL4iJkVndgZ0UtofsIrIytfCllHhBYyiSX+QTBsZ1iSginEY4t0AM6wAXgOy3Ixw2gECfxv4r/AmTaENIhEhIf5xEYCtnNyqIrRCQcA2wLn+cZoQlApjGd6vpjEbMy9jmBf2BshR5+nVB6O8NXV8wAOm88gs4S22eYv1EpqXDzrUv+E7KNH/dwKgPPwadoGeD9W7dsD/JPDHaILLgDWVI6vA7h8mBLChvJ/vXYqxjoN5Ur9jPOgEvB+NftQxITLuGqyoiM4xNtZ4IVyfjpqgAAAABJRU5ErkJggg=="},497:function(e,t,r){"use strict";r.r(t);var n,o=r(26),c=r(10);r(14),r(37),r(38),r(479),r(288),r(45),r(36),r(44),r(77),r(31),r(78),r(76);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={data:function(){return{editModalTrigger:!1,topic:{},topicFormRules:{titleAr:[{required:!0,message:"Arabic title Is Required"}],titleEn:[{required:!0,message:"English title Is Required"}],descriptionAr:[{required:!0,message:"Arabic description Is Required"}],descriptionEn:[{required:!0,message:"Arabic description Is Required"}],category:[{required:!0,message:"Category Is Required"}]},editTopicForm:{},selectedImage:null,selectedImageUrl:null,categories:[]}},fetch:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getTopic();case 2:return t.next=4,e.getCategories();case 4:case"end":return t.stop()}}),t)})))()},methods:(n={toggleEditModal:function(){this.editModalTrigger=!this.editModalTrigger},onImageSeclected:function(e){e.target.files.length>0&&(this.selectedImage=this.editTopicForm.image=e.target.files[0],this.selectedImageUrl=URL.createObjectURL(this.selectedImage))},getTopic:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/topics/".concat(e.$route.params.id));case 2:return r=t.sent,t.next=5,r.data;case 5:e.topic=t.sent;case 6:case"end":return t.stop()}}),t)})))()},getCategories:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/category");case 2:return r=t.sent,t.next=5,r.data.docs;case 5:e.categories=t.sent;case 6:case"end":return t.stop()}}),t)})))()},deleteTopic:function(e){var t=this;this.$confirm("هل انت متأكد من انك تريد حذف هذة المقالة ".concat(e.titleAr),"Warning",{confirmButtonText:"تاكيد",cancelButtonText:"الغاء",type:"warning"}).then(Object(c.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.$message({type:"success",message:"تم حذف المقالة بنجاح"}),r.next=3,t.$axios.delete("topics/".concat(e.id));case 3:t.$router.push("/articles");case 4:case"end":return r.stop()}}),r)})))).catch((function(){t.$message({type:"info",message:"تم الغاء الحذف"})}))}},Object(o.a)(n,"toggleEditModal",(function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/topics/".concat(e.$route.params.id));case 2:r=t.sent,e.editTopicForm=d({},r.data),e.selectedImage=r.data.image,e.selectedImageUrl=r.data.image,e.editModalTrigger=!e.editModalTrigger;case 7:case"end":return t.stop()}}),t)})))()})),Object(o.a)(n,"editTopic",(function(){var e=this;this.$refs.topicForm.validate(function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(r){var n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r){t.next=27;break}if(e.selectedImage){t.next=3;break}return t.abrupt("return");case 3:return n=e.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),t.prev=4,(o=new FormData).append("titleAr",e.editTopicForm.titleAr),o.append("titleEn",e.editTopicForm.titleEn),o.append("image",e.editTopicForm.image),o.append("descriptionAr",e.editTopicForm.descriptionAr),o.append("descriptionEn",e.editTopicForm.descriptionEn),t.next=13,e.$axios.patch("/topics/".concat(e.$route.params.id),o);case 13:return e.editTopicForm={},e.selectedImage=null,e.selectedImageUrl=null,e.editModalTrigger=!1,t.next=19,e.getTopic();case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(4),console.log(t.t0);case 24:return t.prev=24,n.close(),t.finish(24);case 27:case"end":return t.stop()}}),t,null,[[4,21,24,27]])})));return function(e){return t.apply(this,arguments)}}())})),Object(o.a)(n,"cancel",(function(){this.edittopicForm={image:null},this.selectedImage=null,this.selectedImageUrl=null,this.editModalTrigger=!1})),n)},f=m,A=r(20),component=Object(A.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.$fetchState.pending?e._e():n("section",[e.editModalTrigger?n("div",{staticClass:"mt-3"},[n("el-form",{ref:"topicForm",attrs:{rules:e.topicFormRules,model:e.editTopicForm}},[n("div",{staticClass:"row"},[n("el-form-item",{staticClass:"col-lg-4 col-md-12",attrs:{label:" ",prop:"image"}},[n("label",{staticClass:"form-label",attrs:{for:"formFile"}},[e._v("أضف الصورة الخاصة للمقالة")]),e._v(" "),n("input",{staticClass:"form-control",attrs:{type:"file",id:"formFile",accept:"image/png, image/jpeg"},on:{change:e.onImageSeclected}}),e._v(" "),n("div",{staticClass:"text-center m-2"},[e.selectedImageUrl?n("img",{attrs:{src:e.selectedImageUrl,alt:"preview",width:"150",height:"100"}}):e._e()])]),e._v(" "),n("div",{staticClass:"col-lg-8 row"},[n("el-form-item",{staticClass:"col-lg-6 col-md-12",attrs:{label:" ",prop:"titleAr"}},[n("span",[e._v("اسم المقالة باللغة العربية")]),e._v(" "),n("el-input",{attrs:{placeholder:"اكتب اسم المقالة باللغة العربية"},model:{value:e.editTopicForm.titleAr,callback:function(t){e.$set(e.editTopicForm,"titleAr",t)},expression:"editTopicForm.titleAr"}})],1),e._v(" "),n("el-form-item",{staticClass:"col-lg-6 col-md-12",attrs:{label:" ",prop:"titleEn"}},[n("span",[e._v("اسم المقالة باللغة الانجليزية")]),e._v(" "),n("el-input",{attrs:{placeholder:"Enter the title of the article in English",dir:"ltr"},model:{value:e.editTopicForm.titleEn,callback:function(t){e.$set(e.editTopicForm,"titleEn",t)},expression:"editTopicForm.titleEn"}})],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:" ",prop:"descriptionAr"}},[n("span",[e._v("وصف المقالة باللغة العربية")]),e._v(" "),n("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.editTopicForm.descriptionAr,callback:function(t){e.$set(e.editTopicForm,"descriptionAr",t)},expression:"editTopicForm.descriptionAr"}})],1),e._v(" "),n("el-form-item",{attrs:{label:" ",prop:"descriptionEn"}},[n("span",[e._v("وصف المقالة باللغة الانجليزية")]),e._v(" "),n("el-input",{attrs:{dir:"ltr",type:"textarea",rows:4},model:{value:e.editTopicForm.descriptionEn,callback:function(t){e.$set(e.editTopicForm,"descriptionEn",t)},expression:"editTopicForm.descriptionEn"}})],1),e._v(" "),n("div",{staticClass:"buttons w-100 p-3 d-flex gap-2 justify-content-end"},[n("button",{staticClass:"secondary-btn w-25 align-self-end",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.editTopic.apply(null,arguments)}}},[e._v("\n          حفظ التغييرات\n        ")]),e._v(" "),n("button",{staticClass:"secondary-btn w-25 align-self-end",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.cancel.apply(null,arguments)}}},[e._v("\n          الغاء\n        ")])])],1)],1):e._e(),e._v(" "),e.editModalTrigger?e._e():n("div",{staticClass:"bg-white m-5 p-5"},[n("div",{staticClass:"d-flex flex-column"},[n("div",{staticClass:"align-self-end"},[n("img",{staticClass:"m-2",attrs:{src:r(440),alt:"edit icon",role:"button"},on:{click:function(t){return e.toggleEditModal()}}}),e._v(" "),n("img",{attrs:{src:r(441),alt:"delete icon",role:"button"},on:{click:function(t){return e.deleteTopic(e.topic)}}})]),e._v(" "),n("div",{staticClass:"align-self-center"},[n("img",{attrs:{src:e.topic.image,alt:"topic image",width:"200"}})])]),e._v(" "),n("div",{staticClass:"mt-5 d-flex flex-column gap-3"},[n("div",[n("h6",{staticClass:"orange-text"},[e._v("اسم المقالة")]),e._v(" "),n("h6",{staticClass:"key"},[e._v(e._s(e.topic.titleAr))])]),e._v(" "),n("div",[n("h6",{staticClass:"orange-text"},[e._v("محتوى المقالة")]),e._v(" "),n("h6",{staticClass:"key lh-lg",staticStyle:{"text-align":"justify"}},[e._v("\n          "+e._s(e.topic.descriptionAr)+"\n        ")])])])])])}),[],!1,null,null,null);t.default=component.exports}}]);