var bindy;(()=>{"use strict";var __webpack_modules__={120:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.ControllerInstance=exports.Controller=void 0;const logging_1=__webpack_require__(570),directive_1=__webpack_require__(334);class Controller{constructor(e,t){this.name=e,null!=t&&(this.data=t)}instantiate(){return new ControllerInstance(this.name,this.data)}}exports.Controller=Controller;class ControllerInstance extends Controller{constructor(e,t){super(e,t),this.bindings=new Map,this.logger=new logging_1.Logger(`Bindy-Controller-${this.name}`,logging_1.Level.INFO),e&&(this.name=e),this.scope=t||{}}get(expression,target){target||(target=this.data);try{return expression?eval(`target.${expression}`):target}catch(e){this.logger.log(logging_1.Level.ERROR,"failed to fetch property",expression,"from",target)}}update(expression,value,target){target||(target=this.data);try{return eval(`target.${expression} = value`),this.logger.log(logging_1.Level.VERBOSE,"updated property",expression,"set to",value),this.bindings.has(expression)&&this.bindings.get(expression)?.forEach((e=>{this.render(e.parentNode)})),!0}catch(e){return this.logger.log(logging_1.Level.ERROR,"failed to update property",expression),!1}}bind(e){this.target=e,this.render()}render(e,t){const r=this;e||(e=this.target),directive_1.DIRECTIVES.forEach((o=>{const n=e?.querySelectorAll(o.selector);this.logger.log(logging_1.Level.VERBOSE,"processing directive",o.selector,"on",n),n&&n.forEach((e=>{const n=o.render(r,e,t);n&&(this.bindings.has(n)||this.bindings.set(n,new Set),this.bindings.get(n).add(e))}))}))}parseEl(e){const t=document.createElement("div");return t.innerHTML=e,t}evaluate(e,t){const r=e.split(".");let o=t||this.scope;for(let e of r)""!==e&&(o=o[e]);return o}}exports.ControllerInstance=ControllerInstance},334:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DIRECTIVES=void 0,t.DIRECTIVES=[new class{constructor(){this.selector="[bind-str]",this.attr="bind-str"}render(e,t,r){const o=t.getAttribute(this.attr);t.textContent=e.get(o||"",r)}},new class{constructor(){this.selector="[bind-for]",this.attr="bind-for"}render(e,t,r){const o=t?.getAttribute(this.attr),n=document.createDocumentFragment();if(o){const l=e.get(o,r);return Array.isArray(l)&&(l.forEach((r=>{let o=document.createElement(t.tagName);o.innerHTML=t.innerHTML,n.appendChild(o),e.render(o,r)})),t.innerHTML="",t.replaceChildren(n)),o}}},new class{constructor(){this.selector="input[bind-model]",this.attr="bind-model"}render(e,t,r){const o=t.getAttribute(this.attr);o&&(t.value=e.get(o,r),t.oninput=function(t){if(!t.target)return;const n=t.target.value;e.update(o,n,r)})}}]},570:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.Logger=t.Level=void 0,function(e){e[e.ERROR=0]="ERROR",e[e.WARNING=1]="WARNING",e[e.INFO=2]="INFO",e[e.VERBOSE=3]="VERBOSE"}(r=t.Level||(t.Level={})),t.Logger=class{constructor(e,t=r.VERBOSE){this.level=r.INFO,this.name=e,t&&(this.level=t)}log(e=r.INFO,...t){if(e<=this.level){const o=[(new Date).toLocaleTimeString(),`[${r[e].toLowerCase()}]`,this.name,""].join("\t|  ");switch(e){case r.INFO:console.info(o,...t);break;case r.WARNING:console.warn(o,...t);break;case r.VERBOSE:console.debug(o,...t);break;case r.ERROR:default:console.error(o,...t)}}}}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}var __webpack_exports__={};(()=>{var exports=__webpack_exports__;Object.defineProperty(exports,"__esModule",{value:!0}),exports.Controller=exports.bootstrap=void 0;const logging_1=__webpack_require__(570);function bootstrap(){let _logger=new logging_1.Logger("Bindy-Bootstrap");_logger.log(logging_1.Level.VERBOSE,"bootstrap started");const controllerBindings=document.querySelectorAll("[bind-controller]");controllerBindings.forEach((bindElem=>{_logger.log(logging_1.Level.VERBOSE,"discovered controller binding - {",bindElem.tagName,"#",bindElem.id,"}");const ctrlName=bindElem.getAttribute("bind-controller");if(ctrlName){_logger.log(logging_1.Level.VERBOSE,"attempting to resolve controller with var name",ctrlName);try{const ctrl=eval(ctrlName);if(_logger.log(logging_1.Level.VERBOSE,"resolved to",ctrl),ctrl){_logger.log(logging_1.Level.VERBOSE,"instantiating... ");const e=ctrl.instantiate();e.bind(bindElem)}}catch(e){_logger.log(logging_1.Level.ERROR,"controller instantiation failed - error",e)}}}))}exports.bootstrap=bootstrap;var controller_1=__webpack_require__(120);Object.defineProperty(exports,"Controller",{enumerable:!0,get:function(){return controller_1.Controller}}),window.onload=function(){bootstrap()}})(),bindy=__webpack_exports__})();