(this["webpackJsonpreact-material-dashboard"]=this["webpackJsonpreact-material-dashboard"]||[]).push([[3],{828:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}t.__esModule=!0,n(r(336)),n(r(829))},829:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}t.__esModule=!0,n(r(336)),n(r(830))},830:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};t.__esModule=!0;var i=r(0),a=r(21),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this;return i.createElement(a.ReactReduxContext.Consumer,null,(function(t){return i.createElement(u,o({},e.props,{reactReduxContext:t}))}))},t}(i.Component);t.DynamicModuleLoader=s;var u=function(e){function t(t){var r=e.call(this,t)||this;if(r._providerInitializationNeeded=!1,r._cleanup=function(){r._addedModules&&(r._addedModules.remove(),r._addedModules=void 0)},null==t.reactReduxContext){var n="Tried to render DynamicModuleLoader, but no ReactReduxContext was provided";throw console.error(n),new Error(n)}return r._store=t.reactReduxContext?t.reactReduxContext.store:void 0,r.props.strictMode?r.state={readyToRender:!1}:(r._addModules(),r.state={readyToRender:!0}),r}return n(t,e),t.prototype.render=function(){return this.state.readyToRender?this._providerInitializationNeeded?i.createElement(a.Provider,{store:this._store},i.createElement(s,o({},this.props))):i.createElement(i.Fragment,null,this._renderLoader(),i.createElement(d,{cleanup:this._cleanup})):null},t.prototype._renderLoader=function(){return this.props.children?"function"===typeof this.props.children?this.props.children():this.props.children:null},t.prototype._addModules=function(){var e=this.props,t=e.createStore,r=e.modules;if(this._store)this._addedModules=this._store.addModules(r);else{if(!t)throw new Error("Store could not be resolved from React context");this._store=t(),this._providerInitializationNeeded=!0}},t.prototype.componentDidMount=function(){this.props.strictMode&&(this._addModules(),this.setState({readyToRender:!0}))},t}(i.Component),d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){return null},t.prototype.componentWillUnmount=function(){this.props.cleanup()},t}(i.Component)},834:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return u}));var n=r(0),o=r.n(n),i=r(828),a=r(172);var s=r(83);function u(e){var t=e.routes;return o.a.createElement(i.DynamicModuleLoader,{modules:[{id:"faq",reducerMap:{}}]},o.a.createElement(s.a,null),o.a.createElement(a.a,{routes:t,redirectPath:"/faq/dashboard"}))}}}]);
//# sourceMappingURL=3.b54b3b43.chunk.js.map