(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{503:function(t,e,n){"use strict";n.r(e);var l=n(10),o=(n(76),{data:function(){return{poll:{},QA:[]}},fetch:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/poll/".concat(t.$route.params.id));case 2:return n=e.sent,e.next=5,n.data;case 5:return t.poll=e.sent,e.next=8,n.data.answers;case 8:t.QA=e.sent;case 9:case"end":return e.stop()}}),e)})))()}}),c=n(20),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$fetchState.pending?t._e():n("div",{staticClass:"testimonials-page"},[n("div",{staticClass:"testimonials"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6"},[n("div",[n("h6",{staticClass:"testimonials__key"},[t._v("الاسم")]),t._v(" "),n("div",{staticClass:"testimonials__value"},[t._v(t._s(t.poll.name))])])]),t._v(" "),n("div",{staticClass:"col-md-6"},[n("div",[n("h6",{staticClass:"testimonials__key"},[t._v("رقم الهاتف")]),t._v(" "),n("div",{staticClass:"testimonials__value",attrs:{dir:"ltr"}},[t._v(t._s(t.poll.phone))])])])]),t._v(" "),t._l(t.QA,(function(e){return n("div",{key:e.question.id,staticClass:"testimonials__list"},[n("div",{staticClass:"d-flex justify-content-between testimonials__list-item align-items-center flex-wrap"},[n("div",{staticClass:"d-flex gap-1 align-items-center"},[n("span",[t._v(t._s(e.question.id)+"-")]),t._v(" "),n("h6",[t._v(t._s(e.question.questionAr))])]),t._v(" "),n("el-rate",{attrs:{disabled:"","text-color":"#ff9900"},model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"item.value"}})],1)])})),t._v(" "),n("div",{staticClass:"testimonials__feedback"},[n("h6",{staticClass:"testimonials__key"},[t._v("الملاحظات")]),t._v(" "),n("div",{staticClass:"testimonials__value p-3"},[t._v("\n        "+t._s(t.poll.notes||"لا يوجد")+"\n      ")])]),t._v(" "),n("div",{staticClass:"testimonials__feedback mt-5"},[n("h6",{staticClass:"testimonials__key"},[t._v("عرفتنا منين ؟")]),t._v(" "),n("div",{staticClass:"testimonials__value"},[t._v(t._s(t.poll.youKnowUs))])])],2)])}),[],!1,null,null,null);e.default=component.exports}}]);