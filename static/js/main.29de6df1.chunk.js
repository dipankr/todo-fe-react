(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(2),r=n.n(c),l=(n(13),n(15),n(3));function i(e){var t=e.todos,n=e.updateTodo,o=function(e){var t=e.target,o=t.checked,a=t.dataset.id;console.log(a),console.log(o),n({id:a,completed:o})},c=function(e){n({id:e.target.dataset.id,title:e.target.value})};return t.map(function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"input-group mb-3"},a.a.createElement("div",{className:"input-group-text"},a.a.createElement("input",{className:"form-check-input",type:"checkbox",checked:e.completed,onChange:o,"aria-label":"Checkbox for following text input","data-id":e.id,key:t})),a.a.createElement("input",{type:"text",className:"form-control","aria-label":"Text input with checkbox","data-id":e.id,key:t,value:e.title,onChange:c})))})}var d="http://localhost:8080/api/todolist";var u=function(){var e=Object(o.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(o.useRef)();Object(o.useEffect)(function(){u()},[]),Object(o.useEffect)(function(){console.log("todos updated")},[n]);var u=function(){fetch(d).then(function(e){return e.json()}).then(function(e){c(e.response.data)})},s=function(e){var t=r.current.value;t&&(function(e){fetch(d,{method:"POST",mode:"cors",body:JSON.stringify({title:e})}).then(function(e){return e.json()}).then(function(e){c(e.response.data)})}(t),r.current.value=null)};return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",{align:"center",className:"appTitle"},"TodoList"),a.a.createElement("div",{className:"todo-pending",align:"right"}," ",a.a.createElement("span",null," ",a.a.createElement("span",null,n.filter(function(e){return!e.completed}).length," ")," Todo items left ")," "),a.a.createElement("div",{className:"addTodoItem"},a.a.createElement("input",{ref:r,className:"form-control addTodoItemInput",id:"floatingInput",placeholder:"Add Todo Item",onKeyDown:function(e){"Enter"===e.key&&s()}})),a.a.createElement(i,{todos:n,updateTodo:function(e){fetch(d,{method:"PUT",mode:"cors",body:JSON.stringify({id:e.id,title:e.title,completed:e.completed})}).then(function(e){return e.json()}).then(function(e){e.response.data&&c(e.response.data)})}}),a.a.createElement("button",{className:"btn btn-danger",onClick:function(){fetch(d,{method:"DELETE",mode:"cors"}).then(function(e){return e.json()}).then(function(e){e.response.data&&c(e.response.data)})}}," Clear Completed "))},s=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,18)).then(function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),o(e),a(e),c(e),r(e)})};r.a.createRoot(document.getElementById("root")).render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(u,null))),s()},4:function(e,t,n){e.exports=n(17)}},[[4,3,2]]]);
//# sourceMappingURL=main.29de6df1.chunk.js.map