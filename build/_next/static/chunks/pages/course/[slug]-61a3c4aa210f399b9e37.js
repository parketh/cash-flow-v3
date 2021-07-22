(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[982],{8638:function(e){var t=[{index:0,name:"Introduction",slug:"intro",numPages:8},{index:1,name:"Valuation framework",slug:"framework",numPages:5},{index:2,name:"Market of operation (E1)",slug:"market",numPages:5},{index:3,name:"Competition (E2)",slug:"competition",numPages:2},{index:4,name:"Business model (E3)",slug:"business",numPages:6},{index:5,name:"Costs (E4)",slug:"costs",numPages:1},{index:6,name:"Stage of growth (E5)",slug:"growth",numPages:1},{index:7,name:"Risk factors (E6)",slug:"risks",numPages:1},{index:8,name:"Financing (E7)",slug:"financing",numPages:1}],r=function(e){var t="";do{t=(e%26+10).toString(36)+t,e=Math.floor(e/26)-1}while(e>=0);return t},n=t.map((function(e){for(var t=[],n=1;n<=e.numPages;n++)t.push(r(e.index)+"-"+e.slug+"-"+n);return t})).flat();n.unshift("index"),e.exports={CourseTopics:t,CourseIndex:n}},8242:function(e,t,r){"use strict";r.r(t);var n=r(7757),s=r.n(n),o=r(2137),c=r(5893),a=r(6156),i=r(6610),u=r(5991),l=r(5255),p=r(3724),m=r(7608),d=r(7294),f=r(9675),g=r.n(f),x=r(8456),h=r.n(x),v=r(1664),b=r(43),y=r.n(b),j=r(2034),w=r(8638);function N(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?N(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):N(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,m.Z)(e);if(t){var s=(0,m.Z)(this).constructor;r=Reflect.construct(n,arguments,s)}else r=n.apply(this,arguments);return(0,p.Z)(this,r)}}var C=function(e){(0,l.Z)(r,e);var t=P(r);function r(){return(0,i.Z)(this,r),t.apply(this,arguments)}return(0,u.Z)(r,[{key:"render",value:function(){var e={img:function(e){var t=e.alt,r=e.src,n=e.title;return(0,c.jsx)("div",{className:"text-center justify-center flex -my-4",children:(0,c.jsx)("img",{alt:t,src:r,title:n,className:"max-w-xl block w-full"})})},p:function(e){return(0,c.jsx)("div",k({className:"mb-6"},e))}};return(0,c.jsx)("div",{className:"overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-w-2 scrollbar-thumb-rounded-full font-sans",children:(0,c.jsxs)("div",{className:"h-auto w-full px-5 py-5 space-y-2 flex justify-center",children:[(0,c.jsxs)("div",{className:"w-768",children:[(0,c.jsx)(O,{current:this.props.current}),(0,c.jsx)("article",{className:"prose prose-2xl",children:(0,c.jsx)(h(),{children:this.props.data.content,className:"bodyTextTutorial",remarkPlugins:[y()],transformImageUri:function(e){return e.startsWith("http")?e:"/".concat(e)},components:e,skipHtml:!1})}),(0,c.jsx)("div",{className:"mt-64"})]}),(0,c.jsx)(I,{previous:this.props.previous,next:this.props.next})]})})}}],[{key:"getInitialProps",value:function(){var e=(0,o.Z)(s().mark((function e(t){var r,n,o,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.query.slug){e.next=3;break}return e.abrupt("return",{data:{content:null},current:null,next:null,previous:null});case 3:return n=w.CourseIndex.findIndex((function(e){return e===r})),e.next=6,j.Z.getPages(r);case 6:return o=e.sent,c=g()(o),e.abrupt("return",{data:k({},c),current:r,next:{contents:w.CourseIndex[n+1],show:n!==w.CourseIndex.length-1},previous:{contents:w.CourseIndex[n-1],show:0!==n}});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),r}(d.Component),O=function(e){var t=e.current;if(!t)return(0,c.jsx)("div",{});var r,n=function(e){var t="";do{t=(e%26+10).toString(36)+t,e=Math.floor(e/26)-1}while(e>=0);return t},s=w.CourseTopics.map((function(e){return k(k({},e),{},{page:n(e.index)+"-"+e.slug+"-1",letter:n(e.index).toUpperCase(),name:e.name.toUpperCase()})})),o=(r=t.split("-")[0],Math.max(r.split("").reduce((function(e,t){return 26*e+parseInt(t,36)-9}),0)-1,0)),a=Number(t.split("-")[2]);return(0,c.jsxs)("div",{className:"select-none",children:[(0,c.jsx)(T,{topics:s,currTopic:o}),(0,c.jsx)(E,{currTopic:o,numToLetter:n,currPage:a})]})},T=function(e){var t=e.topics,r=e.currTopic,n=(0,d.useRef)();return(0,c.jsxs)("div",{className:"relative ",children:[(0,c.jsx)("div",{className:"overflow-x-auto scrollbar flex border-b-1 pb-4 mb-3",ref:n,onWheel:function(e){e.preventDefault();var t=n.current,r=n.current.scrollLeft;t.scrollTo({top:0,left:r+e.deltaY,behaviour:"smooth"})},children:t.map((function(e){return e.index<r?(0,c.jsx)(S,{topic:e,imgSrc:"/images/progress-done.png",alt:"progress-done",style1:"cursor-pointer",style2:"text-white",style3:"cursor-pointer"}):e.index===r?(0,c.jsx)(S,{topic:e,imgSrc:"/images/progress-current.png",alt:"progress-current",style1:"text-theme",style3:"text-theme",enableLink:!1}):(0,c.jsx)(S,{topic:e,imgSrc:"/images/progress-none.png",alt:"progress-none",style1:"cursor-pointer",style2:"text-gray-400",style3:"cursor-pointer text-gray-300"})}))}),(0,c.jsx)("div",{className:"w-full h-1 rounded-3xl absolute top-4 bg-opacity-60 z-0 bg-gradient-to-r from-theme via-gray-400 to-white"})]})},S=function(e){var t=e.topic,r=e.imgSrc,n=e.imgAlt,s=e.style1,o=e.style2,a=e.style3;return(0,c.jsx)(v.default,{href:"/course/"+t.page,passHref:!0,children:(0,c.jsxs)("div",{className:"grid grid-rows-2 justify-items-center z-50 "+s,children:[(0,c.jsxs)("div",{className:"relative mb-1",children:[(0,c.jsx)("img",{className:"w-8",src:r,alt:n}),(0,c.jsx)("div",{className:"absolute top-0 pt-2 w-full text-center font-medium text-xs "+o,children:t.letter})]}),(0,c.jsx)("span",{className:"mx-4 w-24 text-center mt-1 text-xs font-semibold tracking-wide "+a,children:t.name})]},t.index)})},E=function(e){var t=e.currTopic,r=e.numToLetter,n=e.currPage,s=w.CourseTopics.map((function(e){for(var n=[],s=1;s<=e.numPages;s++)e.index===t&&n.push({index:s,url:r(e.index)+"-"+e.slug+"-"+s,name:"",letter:s});return n}));return s=s[t],(0,c.jsx)("div",{className:"flex border-b-1 mb-8 pb-2",children:s.map((function(e){return e.index<n?(0,c.jsx)(v.default,{href:"/course/"+e.url,passHref:!0,children:(0,c.jsx)(_,{page:e,imgSrc:"/images/progress-done.png",imgAlt:"progress-done",style1:"cursor-pointer",style2:"text-white"})}):e.index===n?(0,c.jsx)(_,{page:e,imgSrc:"/images/progress-current.png",imgAlt:"progress-current",style2:"text-theme"}):(0,c.jsx)(v.default,{href:"/course/"+e.url,passHref:!0,children:(0,c.jsx)(_,{page:e,imgSrc:"/images/progress-none.png",imgAlt:"progress-none",style1:"cursor-pointer",style2:"text-gray-500"})})}))})},_=function(e){var t=e.page,r=e.imgSrc,n=e.imgAlt,s=e.style1,o=e.style2;return(0,c.jsx)(v.default,{href:"/course/"+t.url,passHref:!0,children:(0,c.jsxs)("div",{className:"relative mb-1 justify-items-center mx-3 "+s,children:[(0,c.jsx)("img",{className:"w-7",src:r,alt:n}),(0,c.jsx)("div",{className:"absolute bottom-0 pb-1 w-full text-center font-medium text-sm "+o,children:t.letter})]})})},I=function(e){var t=e.previous,r=e.next;return t&&r?(0,c.jsx)("div",{className:"flex absolute bottom-0 bg-white h-32 md:h-20 w-screen bg-opacity-0 justify-center align-middle select-none",children:(0,c.jsx)("div",{className:"flex flex-wrap backdrop-filter backdrop-blur-lg bg-opacity-30 border-t border-gray-200 justify-center py-3 w-screen h-full space-x-4",children:(0,c.jsxs)("div",{className:"w-768 flex justify-between px-6",children:[(0,c.jsx)(Z,{page:t,imgSrc:"/images/previous.png",alt:"previous"}),(0,c.jsx)(Z,{page:{contents:"",show:!0},imgSrc:"/images/home.png",alt:"home"}),(0,c.jsx)(Z,{page:r,imgSrc:"/images/next.png",alt:"next"})]})})}):(0,c.jsx)("div",{})},Z=function(e){var t=e.page,r=e.imgSrc,n=e.alt;return t.show?(0,c.jsx)(v.default,{href:"/course/"+(("index"===t.contents?"":t.contents)||""),passHref:!0,children:(0,c.jsx)("input",{className:"w-6 h-6",type:"image",src:r,alt:n})}):(0,c.jsx)("div",{})};t.default=C},2034:function(e,t,r){"use strict";var n=r(9669),s=r.n(n),o="https://cash-flow-tool.herokuapp.com",c="60e8c2ed73b100779c3356fd",a={retrieveForm:function(){return s().get("".concat(o,"/responses/").concat(c)).then((function(e){return e.data}))},updateForm:function(e){return s().put("".concat(o,"/responses/").concat(c),e).then((function(e){return e.data}))},getCompanies:function(){return s().get("".concat(o,"/responses/").concat(c,"/comps")).then((function(e){return e.data}))},createCompany:function(e){return s().post("".concat(o,"/responses/").concat(c,"/comps"),e).then((function(e){return e.data}))},updateCompany:function(e,t){return s().put("".concat(o,"/responses/").concat(c,"/comps/").concat(e),t).then((function(e){return e.data}))},removeCompany:function(e){return s().delete("".concat(o,"/responses/").concat(c,"/comps/").concat(e))},downloadFile:function(){return s()({url:"".concat(o,"/download/").concat(c),method:"GET",headers:{"Content-Disposition":"attachment; filename=dcf_model.xlsx","Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},responseType:"blob"}).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),r=document.createElement("a");r.href=t,r.setAttribute("download","dcf_model.xlsx"),document.body.appendChild(r),r.click()}))},submitFeedback:function(e){return s().post("".concat(o,"/feedback/").concat(c),e).then((function(e){return e.data}))},getPages:function(e){return s()({url:"".concat(o,"/coursepages/").concat(e),method:"GET",headers:{"Content-Type":"text/markdown"}}).then((function(e){return e.data}))}};t.Z=a},3632:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/course/[slug]",function(){return r(8242)}])},3596:function(){}},function(e){e.O(0,[774,146,971,733,43,888,179],(function(){return t=3632,e(e.s=t);var t}));var t=e.O();_N_E=t}]);