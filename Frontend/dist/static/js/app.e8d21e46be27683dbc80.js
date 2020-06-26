webpackJsonp([1],{EjDe:function(t,e){},K2R9:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("jKqc"),a("K3J8"),a("qb6w");var s=a("7+uW"),i=a("/ocq"),n=a("mtWM"),r=a.n(n).a.create({baseURL:"http://192.168.99.100:8085"}),o={name:"AddTaskComponent",data:function(){return{taskName:null,taskPriority:null,taskDescription:null}},methods:{formSubmit:function(){if(""!=this.taskName&&null!=this.taskName){var t={name:this.taskName,description:this.taskDescription,priority:this.taskPriority};r.post("tasks",t).then(function(e){t=e.data,C.$emit("newTask",t)}).catch(function(t){console.log(t)}),this.taskName=null,this.taskPriority=null,this.taskDescription=null}}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{attrs:{id:"createTaskForm"},on:{submit:function(e){return e.preventDefault(),t.formSubmit(e)}}},[a("div",{staticClass:"form-task-add"},[a("div",{staticClass:"task-container"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.taskName,expression:"taskName"}],staticClass:"form-control input-task",class:[""==t.taskName||null==t.taskName?"is-invalid":"is-valid"],attrs:{type:"text",placeholder:"enter new task"},domProps:{value:t.taskName},on:{input:function(e){e.target.composing||(t.taskName=e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.taskPriority,expression:"taskPriority"}],staticClass:"form-control input-priority",attrs:{type:"number",value:"1",placeholder:"1"},domProps:{value:t.taskPriority},on:{input:function(e){e.target.composing||(t.taskPriority=e.target.value)}}}),t._v(" "),t._m(0)]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.taskDescription,expression:"taskDescription"}],staticClass:"form-control textarea-description",attrs:{name:"",id:"",cols:"30",rows:"10",placeholder:"enter description"},domProps:{value:t.taskDescription},on:{input:function(e){e.target.composing||(t.taskDescription=e.target.value)}}})])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-primary btn-add",attrs:{type:"submit"}},[e("i",{staticClass:"fa fa-plus",attrs:{"aria-hidden":"true"}}),e("span",[this._v("Add Task")])])}]};var l=a("VU/8")(o,c,!1,function(t){a("v7rJ")},null,null).exports,u={name:"Pagination",props:{elementsPerPage:{type:Number,required:!0,default:5}},data:function(){return{activePage:0,pagesCount:0}},methods:{setActivePage:function(t){this.activePage=t,C.$emit("activePage",this.activePage)}},mounted:function(){var t=this;C.$on("pagesCount",function(e){t.pagesCount=e}),C.$on("activePage",function(e){t.activePage=e})}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination justify-content-center"},[a("li",{staticClass:"page-item",class:{disabled:t.activePage<=0}},[a("a",{staticClass:"page-link",attrs:{tabindex:"-1","aria-disabled":t.activePage<=0},on:{click:function(e){return t.setActivePage(t.activePage-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._v(" "),t._l(t.pagesCount,function(e){return a("li",{key:e,staticClass:"page-item",class:{active:e-1==t.activePage}},[a("a",{staticClass:"page-link",on:{click:function(a){return t.setActivePage(e-1)}}},[t._v(t._s(e))])])}),t._v(" "),a("li",{staticClass:"page-item",class:{disabled:t.activePage>=t.pagesCount-1}},[a("a",{staticClass:"page-link",attrs:{"aria-disabled":t.activePage>=t.pagesCount-1},on:{click:function(e){return t.setActivePage(t.activePage+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])},staticRenderFns:[]};var m={name:"ListTasksComponent",components:{Pagination:a("VU/8")(u,d,!1,function(t){a("Vs+J")},null,null).exports},data:function(){return{tasks:[],taskNumber:0,isEditActive:!1,activeEditTaskID:0,activePage:0,elementsPerPage:5,elementsCount:0,pagesCount:0}},methods:{getPageDataFromBackend:function(t){var e=this;r.get("tasksPaging/"+t).then(function(t){return e.tasks=t.data}).catch(function(t){return console.log(t)})},roundNumber:function(t){return Math.ceil(t)},editTask:function(t,e){this.activeEditTaskID=e,this.disabled=!1,this.isEditActive?this.isEditActive=!1:this.isEditActive=!0;var a=this.tasks.find(function(t){return t.taskID==e});r.put("tasks",{taskID:a.taskID,name:a.name,description:a.description,priority:a.priority})},removeTask:function(t,e){this.tasks.splice(e,1),this.elementsCount=this.elementsCount-1,r.delete("tasks/"+t),0==this.tasks.length&&(this.activePage>0&&(this.activePage=this.activePage-1,C.$emit("activePage",this.activePage)),0==this.activePage&&this.pagesCount>1&&(console.log("TRIGGER"),this.getPageDataFromBackend(0),this.activePage=0,C.$emit("activePage",this.activePage)),this.pagesCount=this.roundNumber(this.elementsCount/this.elementsPerPage),C.$emit("pagesCount",this.pagesCount))}},mounted:function(){var t=this,e=this;this.getPageDataFromBackend(this.activePage),r.get("/tasksPagingSize").then(function(t){e.elementsCount=t.data,e.pagesCount=e.roundNumber(e.elementsCount/e.elementsPerPage),C.$emit("pagesCount",e.pagesCount)}).catch(function(t){return console.log(t)}),C.$emit("activePage",this.activePage),C.$on("newTask",function(e){t.tasks.push(e),t.elementsCount=t.elementsCount+1,t.pagesCount=t.roundNumber(t.elementsCount/t.elementsPerPage),C.$emit("pagesCount",t.pagesCount),t.getPageDataFromBackend(0)}),C.$on("activePage",function(e){t.activePage=e,t.getPageDataFromBackend(e)})}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"task-list"},[a("table",{staticClass:"table task-table"},[t._m(0),t._v(" "),a("tbody",t._l(t.tasks,function(e,s){return s<=4?a("tr",{key:e.taskID},[a("th",{attrs:{scope:"row"}},[t._v(t._s(e.taskID))]),t._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"task.name"}],staticClass:"taskName form-control",class:{taskNameEdit:t.isEditActive&&t.activeEditTaskID==e.taskID},attrs:{type:"text",disabled:!(t.isEditActive&&t.activeEditTaskID==e.taskID),value:"task.name"},domProps:{value:e.name},on:{input:function(a){a.target.composing||t.$set(e,"name",a.target.value)}}})]),t._v(" "),a("td",[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"task.description"}],staticClass:"form-control textarea-description-list",class:{taskNameEdit:t.isEditActive&&t.activeEditTaskID==e.taskID},attrs:{value:"task.taskDescription",disabled:!(t.isEditActive&&t.activeEditTaskID==e.taskID),name:"",id:"",cols:"30",rows:"10"},domProps:{value:e.description},on:{input:function(a){a.target.composing||t.$set(e,"description",a.target.value)}}})]),t._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.priority,expression:"task.priority"}],staticClass:"form-control input-priority-list",class:{taskNameEdit:t.isEditActive&&t.activeEditTaskID==e.taskID},attrs:{disabled:!(t.isEditActive&&t.activeEditTaskID==e.taskID),value:"task.priority",type:"number"},domProps:{value:e.priority},on:{input:function(a){a.target.composing||t.$set(e,"priority",a.target.value)}}})]),t._v(" "),a("td",[a("div",{staticClass:"icon-list"},[a("button",{staticClass:"btn btn-edit",class:[t.isEditActive&&t.activeEditTaskID==e.taskID?"btn-success":"btn-primary"],on:{click:function(a){return t.editTask(a,e.taskID)}}},[a("i",{class:[t.isEditActive&&t.activeEditTaskID==e.taskID?"fas fa-check":"fas fa-edit"]})]),t._v(" "),a("button",{staticClass:"btn btn-danger btn-remove",on:{click:function(a){return t.removeTask(e.taskID,s)}}},[a("i",{staticClass:"far fa-trash-alt"})])])])]):t._e()}),0)]),t._v(" "),a("Pagination",{attrs:{elementsPerPage:t.elementsPerPage}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("#")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Task Name")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Description")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Priority")]),t._v(" "),a("th",{attrs:{scope:"col"}})])])}]};var p={name:"TodoList",components:{AddTaskComponent:l,ListTasksComponent:a("VU/8")(m,v,!1,function(t){a("K2R9")},null,null).exports}},k={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("AddTaskComponent"),this._v(" "),e("ListTasksComponent")],1)},staticRenderFns:[]};var g=a("VU/8")(p,k,!1,function(t){a("EjDe")},null,null).exports;s.a.use(i.a);var f=new i.a({routes:[{path:"/",name:"TodoList",component:g}]}),h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("h1",[this._v("TODO LIST ")]),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var P=a("VU/8")({name:"App"},h,!1,function(t){a("wmg1")},null,null).exports;a.d(e,"serverBus",function(){return C}),s.a.config.productionTip=!1;var C=new s.a;new s.a({el:"#app",router:f,components:{App:P},template:"<App/>"})},"Vs+J":function(t,e){},jKqc:function(t,e){},qb6w:function(t,e){},v7rJ:function(t,e){},wmg1:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.e8d21e46be27683dbc80.js.map