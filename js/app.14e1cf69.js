(function(e){function t(t){for(var r,i,c=t[0],s=t[1],u=t[2],l=0,f=[];l<c.length;l++)i=c[l],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);p&&p(t);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o=[];function i(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"10032013"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=i(e);var u=new Error;o=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",u.name="ChunkLoadError",u.type=r,u.request=o,n[1](u)}a[e]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:s})}),12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var p=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"06e6":function(e,t,n){},"1f25":function(e,t,n){},"2e6b":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r,a=n("2b0e"),o=n("5c96"),i=n.n(o),c=(n("0fae"),n("b2d6")),s=n.n(c),u=n("313e"),l=n("e192"),p=n.n(l),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"header"},[n("Header")],1),n("div",{staticClass:"top"},[n("TopNav")],1),n("div",{staticClass:"main"},[n("router-view"),n("BigMap")],1),n("div",{staticClass:"footer"},[n("Footer")],1)])},m=[],h=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},v=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"logo-wrapper"},[n("div",{staticClass:"sidebar-button"}),n("div",{staticClass:"logo"}),n("div",{staticClass:"app-title"},[n("span",[e._v("DataMap")]),n("span",{staticClass:"subtitle"},[e._v("COVID_19")])])])}],b=(n("6c3e"),n("2877")),d={},y=Object(b["a"])(d,h,v,!1,null,null,null),O=y.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("©2020")])},w=[],j={},_=Object(b["a"])(j,g,w,!1,null,null,null),P=_.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isShow?n("div",{staticClass:"switch-button"},[n("el-radio-group",{attrs:{size:"small"},on:{change:e.handleSwitch},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},[n("el-radio-button",{attrs:{label:"situation"}},[e._v("MAP")]),n("el-radio-button",{attrs:{label:"statistics"}},[e._v("CHART")])],1)],1):e._e()},C=[],E=(n("fb6a"),{data:function(){return{type:"situation",isShow:!1}},methods:{handleSwitch:function(e){this.$router.push(e)}},watch:{$route:{handler:function(e){var t=e.path;this.type=t.slice(1)},immediate:!0}},mounted:function(){var e=this;this.$bus.$on("mapReady",(function(t){e.isShow=!!t}))}}),S=E,D=(n("a530"),Object(b["a"])(S,x,C,!1,null,"c3af11b2",null)),M=D.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"big-map",style:e.style,attrs:{id:"big_map"}})},k=[],z="pk.eyJ1IjoieWMxMTEiLCJhIjoiY2s3MDA2dWt6MWMzcTNkcWF5dmY0azRkMyJ9.1FF9zAxaXYfHScMq6fKKbw",A={name:"mapbox-map",data:function(){return{style:{width:"100%",height:"".concat(window.innerHeight,"px")}}},computed:{mapInstance:function(){return new this.$mapbox.Map({container:"big_map",center:[106.9,38.39],zoom:1,style:"mapbox://styles/mapbox/streets-v11"})}},methods:{initMap:function(){var e=this;this.$mapbox.accessToken=z,this.mapInstance.on("load",(function(){console.log(e.mapInstance.getStyle().layers)})),this.$bus.$emit("mapReady","show")}},mounted:function(){this.initMap()}},I=A,F=(n("ceef"),Object(b["a"])(I,$,k,!1,null,"02af9ca3",null)),T=F.exports,R={components:{Header:O,Footer:P,TopNav:M,BigMap:T}},L=R,W=(n("7faf"),Object(b["a"])(L,f,m,!1,null,null,null)),H=W.exports,q=(n("d3b7"),n("8c4f")),B=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v(" 预警分析 ")])},J=[],N={},U=Object(b["a"])(N,B,J,!1,null,null,null),Y=U.exports,G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v(" 疫情驱动分析 ")])},K=[],V={},X=Object(b["a"])(V,G,K,!1,null,null,null),Q=X.exports,Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v(" 人口迁移 ")])},ee=[],te={},ne=Object(b["a"])(te,Z,ee,!1,null,null,null),re=ne.exports,ae=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v(" 舆情分析 ")])},oe=[],ie={},ce=Object(b["a"])(ie,ae,oe,!1,null,null,null),se=ce.exports,ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v(" 问卷分析 ")])},le=[],pe={},fe=Object(b["a"])(pe,ue,le,!1,null,null,null),me=fe.exports,he=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},ve=[],be={name:"situation",components:{}},de=be,ye=Object(b["a"])(de,he,ve,!1,null,null,null),Oe=ye.exports,ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v(" 空间结构分析 ")])},we=[],je={},_e=Object(b["a"])(je,ge,we,!1,null,null,null),Pe=_e.exports,xe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Map",{attrs:{mapData:e.provinceData}})],1)},Ce=[],Ee=(n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),Se=n("2f62"),De=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"map-wrapper"},[n("div",{style:e.style,attrs:{id:"myChart"}})])},Me=[],$e=(n("99af"),n("d81d"),n("b0c0"),n("03d6")),ke=n("2ef0"),ze=n.n(ke),Ae={date:"2020.02.01",data:[{name:"香港",value:12},{name:"澳门",value:7},{name:"安徽",value:237},{name:"北京",value:139},{name:"重庆",value:211},{name:"福建",value:120},{name:"甘肃",value:35},{name:"海南",value:53},{name:"河北",value:82},{name:"河南",value:352},{name:"黑龙江",value:59},{name:"湖北",value:5806},{name:"湖南",value:332},{name:"吉林",value:14},{name:"江苏",value:168},{name:"江西",value:240},{name:"广东",value:436},{name:"广西",value:87},{name:"贵州",value:29},{name:"辽宁",value:60},{name:"内蒙古",value:20},{name:"宁夏",value:21},{name:"青海",value:8},{name:"山东",value:184},{name:"山西",value:39},{name:"陕西",value:87},{name:"上海",value:135},{name:"四川",value:177},{name:"台湾",value:10},{name:"天津",value:32},{name:"西藏",value:1},{name:"新疆",value:17},{name:"云南",value:83},{name:"浙江",value:537}]},Ie=">1000人",Fe="500-999人",Te="100-499人",Re="10-99人",Le="1-9人",We="#7F1818",He="#BF2121",qe="#FF7B69",Be="#FFAA85",Je="#FFEDCC",Ne=1,Ue=100,Ye=30,Ge={name:"Map",props:["mapData"],data:function(){return{style:{width:"100%",height:"".concat(window.innerHeight,"px")}}},computed:{echartsInstance:function(){return this.$echarts.init(document.getElementById("myChart"))}},watch:{mapData:function(e){e?this.drawMap(e):this.drawMap(Ae.data)}},methods:{resizeChart:function(){var e=this;return ze.a.throttle((function(){e.style.height="".concat(window.innerHeight,"px"),e.echartsInstance.resize()}),400)},getGeoCoordMap:function(e){var t={};return e.forEach((function(e){var n=e.properties.name;t[n]=e.properties.cp})),t},convertProvinceDataWithCp:function(e){for(var t=this.getGeoCoordMap($e.features),n=[],r=0;r<e.length;r+=1){var a=e[r].name;n.push({name:e[r].name,value:t[a].concat(e[r].value)})}return n},convertProvinceData:function(e){for(var t=[],n=0;n<e.length;n+=1){var r=e[n].value,a="";r>=1e3?a=Ie:r>=500&&r<=999?a=Fe:r>=100&&r<=499?a=Te:r>=10&&r<=99?a=Re:r>=1&&r<=9&&(a=Le),t.push({name:e[n].name,value:[r,a]})}return t},drawMap:function(e){var t="china";this.$echarts.registerMap(t,$e,{}),this.echartsInstance.setOption({title:{text:"CHINA",subtext:"Update by 2020.01.01 00:09",x:"center",y:"60",textStyle:{fontWeight:"normal"}},toolbox:{show:!0,x:"center",bottom:20,feature:{saveAsImage:{}}},visualMap:{type:"piecewise",show:!0,min:0,max:2e5,left:"200",top:80,padding:30,calculable:!0,seriesIndex:[1],categories:[Ie,Fe,Te,Re,Le],inRange:{color:[We,He,qe,Be,Je]}},geo:{show:!0,map:t,roam:!0,label:{show:!0,position:"right",offset:[0,5],color:"#000",fontWeight:"bold",fontSize:"11"},itemStyle:{normal:{},emphasis:{areaColor:"#e7e7e7",borderColor:"#FF6258",borderWidth:"5"}}},series:[{name:"气泡",type:"scatter",coordinateSystem:"geo",data:this.convertProvinceDataWithCp(e),symbol:"pin",symbolSize:function(t){r=e.map((function(e){return e.value})).sort((function(e,t){return e-t})).pop();var n=(Ue-Ye)/(r-Ne);return Ue-(r-t[2])*n},label:{normal:{formatter:function(e){return e.value[2]},show:!0,textStyle:{color:"#000",fontSize:9}}},itemStyle:{normal:{color:"#FFC900"}},zLevel:6},{type:"map",map:t,geoIndex:0,data:this.convertProvinceData(e),aspectScale:.75,zoom:1,left:0,top:0,right:0,bottom:0,boundingCoords:[[-180,90],[180,-90]],itemStyle:{normal:{label:{show:!0,position:"inside",color:"#000",fontWeight:"bold"}},areaColor:"#fff"}}]})}},mounted:function(){this.drawMap(this.mapData||Ae.data),window.addEventListener("resize",this.resizeChart())},destroyed:function(){window.removeEventListener("resize",this.resizeChart())}},Ke=Ge,Ve=(n("94f7"),Object(b["a"])(Ke,De,Me,!1,null,"4c0235ac",null)),Xe=Ve.exports,Qe="SET_PROVINCEDATA";function Ze(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function et(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ze(Object(n),!0).forEach((function(t){Object(Ee["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ze(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var tt=Object(Se["a"])("situation"),nt=tt.mapActions,rt=tt.mapState,at={components:{Map:Xe},computed:et({},rt(["provinceData"])),methods:et({},nt([Qe])),mounted:function(){try{this[Qe]()}catch(e){throw new Error}}},ot=at,it=Object(b["a"])(ot,xe,Ce,!1,null,null,null),ct=it.exports,st=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("BigMap")],1)},ut=[];function lt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function pt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?lt(Object(n),!0).forEach((function(t){Object(Ee["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):lt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ft=Object(Se["a"])("situation"),mt=ft.mapActions,ht=ft.mapState,vt={components:{BigMap:T},computed:pt({},ht(["provinceData"])),methods:pt({},mt([Qe])),mounted:function(){this[Qe]()}},bt=vt,dt=Object(b["a"])(bt,st,ut,!1,null,null,null),yt=dt.exports,Ot=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v(" 时间序列分析 ")])},gt=[],wt={},jt=Object(b["a"])(wt,Ot,gt,!1,null,null,null),_t=jt.exports;a["default"].use(q["a"]);var Pt=[{path:"/",redirect:"/situation"},{path:"/situation",name:"situation",component:Oe},{path:"/support",name:"support",component:yt},{path:"/migrate",name:"migrate",component:re},{path:"/time-analyse",name:"timeAnalyse",component:_t},{path:"/space-analyse",name:"spaceAnalyse",component:Pe},{path:"/drive-analyse",name:"driveAnalyse",component:Q},{path:"/public-opinion",name:"publicOpinion",component:se},{path:"/question",name:"question",component:me},{path:"/statistics",name:"statistics",component:ct},{path:"/alarm",name:"alarm",component:Y},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],xt=new q["a"]({mode:"history",base:"",routes:Pt}),Ct=xt,Et=(n("96cf"),n("1da1")),St=n("d4ec"),Dt=n("bee2"),Mt=n("bc3a"),$t=n.n(Mt);function kt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function zt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?kt(Object(n),!0).forEach((function(t){Object(Ee["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):kt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var At=function(e){var t={production:"/",development:"http://localhost:3000",test:"http://localhost:8888"}[e];return t||(t="/"),t},It=function(){function e(){Object(St["a"])(this,e),Object(Ee["a"])(this,"setInterceptors",(function(e,t){e.interceptors.request.use((function(e){return e.headers.AuthorizationToken=localStorage.getItem("AuthorizationToken")||"",e}),(function(e){return Promise.reject(e)})),e.interceptors.response.use((function(e){return console.log(),e}),(function(e){if(e.response){switch(e.response.status){case"403":break;default:break}return Promise.reject(e.response)}return window.navigator.online?(console.log(e),Promise.reject(e)):-1}))})),this.baseURL=At("production"),this.timeout=1e4,this.withCredentials=!0}return Object(Dt["a"])(e,[{key:"request",value:function(e){var t=$t.a.create(),n=zt({baseURL:this.baseURL,timeout:this.timeout,withCredentials:this.withCredentials},e);return this.setInterceptors(t,e.url),t(n)}}]),e}(),Ft=new It;function Tt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Rt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Tt(Object(n),!0).forEach((function(t){Object(Ee["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Tt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Lt=function(e){return Ft.request(Rt({url:"/data",baseURL:"http://localhost:3001"},e)).catch((function(e){console.log(e)}))};var Wt={namespaced:!0,state:{provinceData:[]},mutations:Object(Ee["a"])({},Qe,(function(e,t){e.provinceData=t})),actions:Object(Ee["a"])({},Qe,function(){var e=Object(Et["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,Lt();case 3:r=e.sent,n(Qe,r?r.data:[]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())};a["default"].use(Se["b"]);var Ht=new Se["b"].Store({state:{},mutations:{},actions:{},modules:{situation:Wt}});n("ac6d");a["default"].use(i.a,{locale:s.a}),a["default"].prototype.$echarts=u,a["default"].prototype.$mapbox=p.a,a["default"].prototype.$bus=new a["default"],a["default"].config.productionTip=!1,new a["default"]({router:Ct,store:Ht,render:function(e){return e(H)}}).$mount("#app")},"6c3e":function(e,t,n){"use strict";var r=n("2e6b"),a=n.n(r);a.a},"7faf":function(e,t,n){"use strict";var r=n("b8ff"),a=n.n(r);a.a},"94f7":function(e,t,n){"use strict";var r=n("1f25"),a=n.n(r);a.a},a530:function(e,t,n){"use strict";var r=n("ba0f"),a=n.n(r);a.a},b8ff:function(e,t,n){},ba0f:function(e,t,n){},ceef:function(e,t,n){"use strict";var r=n("06e6"),a=n.n(r);a.a}});