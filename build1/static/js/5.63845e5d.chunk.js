(this["webpackJsonpreact-material-dashboard"]=this["webpackJsonpreact-material-dashboard"]||[]).push([[5],{828:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}t.__esModule=!0,n(r(336)),n(r(829))},829:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}t.__esModule=!0,n(r(336)),n(r(830))},830:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};t.__esModule=!0;var i=r(0),a=r(21),u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this;return i.createElement(a.ReactReduxContext.Consumer,null,(function(t){return i.createElement(s,o({},e.props,{reactReduxContext:t}))}))},t}(i.Component);t.DynamicModuleLoader=u;var s=function(e){function t(t){var r=e.call(this,t)||this;if(r._providerInitializationNeeded=!1,r._cleanup=function(){r._addedModules&&(r._addedModules.remove(),r._addedModules=void 0)},null==t.reactReduxContext){var n="Tried to render DynamicModuleLoader, but no ReactReduxContext was provided";throw console.error(n),new Error(n)}return r._store=t.reactReduxContext?t.reactReduxContext.store:void 0,r.props.strictMode?r.state={readyToRender:!1}:(r._addModules(),r.state={readyToRender:!0}),r}return n(t,e),t.prototype.render=function(){return this.state.readyToRender?this._providerInitializationNeeded?i.createElement(a.Provider,{store:this._store},i.createElement(u,o({},this.props))):i.createElement(i.Fragment,null,this._renderLoader(),i.createElement(c,{cleanup:this._cleanup})):null},t.prototype._renderLoader=function(){return this.props.children?"function"===typeof this.props.children?this.props.children():this.props.children:null},t.prototype._addModules=function(){var e=this.props,t=e.createStore,r=e.modules;if(this._store)this._addedModules=this._store.addModules(r);else{if(!t)throw new Error("Store could not be resolved from React context");this._store=t(),this._providerInitializationNeeded=!0}},t.prototype.componentDidMount=function(){this.props.strictMode&&(this._addModules(),this.setState({readyToRender:!0}))},t}(i.Component),c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){return null},t.prototype.componentWillUnmount=function(){this.props.cleanup()},t}(i.Component)},832:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i=r(172),a=r(21),u=r(828),s=r(34),c=r(125),d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.b:return t.payload;default:return e}},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.a:return t.payload;default:return e}},p=r(99);t.default=Object(a.connect)((function(e){return{accountType:e.accountType||"ADMIN"}}))((function(e){var t=e.accountType,r=e.routes;return r=r.filter((function(e){return!e.accountType||e.accountType===t||e.accountType===s.b})),o.a.createElement(u.DynamicModuleLoader,{modules:[{id:"dash360",reducerMap:{distributorOrders:d,distributorInvoices:l,searchDistributor:p.f}}]},o.a.createElement(i.a,{routes:r,redirectPath:"Agent"===localStorage.getItem("role")?"/dash360/admin/dashboard":"/telephony"}))}))}}]);
//# sourceMappingURL=5.63845e5d.chunk.js.map