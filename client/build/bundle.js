/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import { Route } from 'react-router-dom';


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _HomePage = __webpack_require__(13);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _NotFoundPage = __webpack_require__(19);

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _App = __webpack_require__(20);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import NotFoundPage from './pages/NotFoundPage';
// export default () => {
// 	return (
// 		<div>
// 			<Route exact path="/" component={Home} />
// 			<Route exact path="/users" component={UsersList} />
// 			{/*<Route path="/hi" component={() => 'Hi'} />*/}
// 		</div>
// 	);
// };

exports.default = [_extends({}, _App2.default, {
	routes: [_extends({}, _HomePage2.default, {
		path: '/',
		exact: true
	}), _extends({}, _NotFoundPage2.default)]
})];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getIntoheadProgramingmindset = exports.INTOHEAD_PROGRAMINGMINDSET = exports.fetchMainPage = exports.FETCH_MAINPAGE = undefined;

var _axios = __webpack_require__(6);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var FETCH_MAINPAGE = exports.FETCH_MAINPAGE = 'fetch_mainpage';
var fetchMainPage = exports.fetchMainPage = function fetchMainPage() {
	return function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
			var res;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							console.log('from action, before req, j allucine');
							// const res = await axios.get("http://react-ssr-api.herokuapp.com/users");
							_context.next = 3;
							return _axios2.default.get("http://localhost:5000/mainpage");

						case 3:
							res = _context.sent;


							console.log('from action');
							console.log(res);
							dispatch({
								type: FETCH_MAINPAGE,
								payload: res
							});

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();
};

var INTOHEAD_PROGRAMINGMINDSET = exports.INTOHEAD_PROGRAMINGMINDSET = 'intoheadProgramingmindset';
var getIntoheadProgramingmindset = exports.getIntoheadProgramingmindset = function getIntoheadProgramingmindset() {
	return function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
			var res;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return _axios2.default.get("http://react-ssr-api.herokuapp.com/users");

						case 2:
							res = _context2.sent;


							dispatch({
								type: INTOHEAD_PROGRAMINGMINDSET,
								payload: res
							});

						case 4:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _express = __webpack_require__(10);

var _express2 = _interopRequireDefault(_express);

var _renderer = __webpack_require__(11);

var _renderer2 = _interopRequireDefault(_renderer);

var _createStore = __webpack_require__(25);

var _createStore2 = _interopRequireDefault(_createStore);

var _reactRouterConfig = __webpack_require__(2);

var _Routes = __webpack_require__(3);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// to set the special routing
// permet a babel d'utiliser les modules necessaires a utiliser async-await
var app = (0, _express2.default)();

// this middleware will pass all request with '/api' directly to that domain
// the second option {proxyReqOptDeco...} n est pas obligatoire. 
// C pour the oauth process to redirect the authenticate user to 'localhost:3000'
// so the auth flow of this app is working with google oauth via 'react-ssr-api.herokuapp.com'
// then we fix the '/api' in the axios instance (src/client/client.js)
// app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
// 	proxyReqOptDecorator(opts) {
// 		opts.headers['x-forwarded-host'] = 'localhost:3000';
// 		return opts;
// 		}
// 	})
// );


// import proxy from 'express-http-proxy';
app.use(_express2.default.static('public'));

// as 'public folder is static', the express will automaticly pick the files there <script src="bundle.js"> 
// we pass the req in argument to the store to get the cookies data, 
// which we gonna atach them (via the proxy) to the api (here heroku) 
app.get('*', function (req, res) {
	var store = (0, _createStore2.default)(req);

	var promises = (0, _reactRouterConfig.matchRoutes)(_Routes2.default, req.path).map(function (_ref) {
		var route = _ref.route;

		// need this check as some routes(Components) won\'t have any function to load 
		// IF route.loadData WHICH COME FROM THE PAGE COMPONENT, declenche le dipatch(d'action creatore)  
		return route.loadData ? route.loadData(store) : null;

		// here we iterate over the map(), mean that gonna be apply to each route
	}).map(function (promise) {
		if (promise) {
			return new Promise(function (resolve, reject) {
				promise.then(resolve).catch(resolve);
			});
		}
	});

	// we resolves the promises\'s array, then we know our especting datas should be here
	// and procede the rendering, BUT if one fail the all rendering fail, so need a .catch()
	Promise.all(promises).then(function () {
		// declare and pass the context obj, which we will use to get the Error report
		var context = {};
		// we pass the imported helper function, which gonna render the html for any page
		var content = (0, _renderer2.default)(req, store, context);
		// in the context appear the redirect routes from react-router, 
		// so as we did redirect from react (in case of non auth user)
		// here we redirect from the server as well
		if (context.url) {
			// statusCode 301 means 'temporary redirected'
			return res.redirect(301, context.url);
		}
		// we can send the status first then the response.
		if (context.notFound) {
			res.status(404);
		}
		res.send(content);
	}).catch(function (e) {
		console.log(e);
	});
});

app.listen(3000, function () {
	console.log('Listening on 3000');
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(12);

var _reactRouterDom = __webpack_require__(1);

var _Routes = __webpack_require__(3);

var _Routes2 = _interopRequireDefault(_Routes);

var _reactRedux = __webpack_require__(4);

var _reactRouterConfig = __webpack_require__(2);

var _serializeJavascript = __webpack_require__(24);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Helmet } from 'react-helmet';
// the react 'BrowserRouter' mangage the routing of the app
// but as the server manage the rendering (at least the imediate rendering)
// the server need to match its routes following the client side. 
// that is for this 'StaticRouter' implementtation
//
// the context which has been created in the index.js store will be pass down to all our render components 


// const renderToString  = require('react-dom/server').renderToString;
exports.default = function (req, store, context) {

	var content = (0, _server.renderToString)(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			_reactRouterDom.StaticRouter,
			{ location: req.path, context: context },
			_react2.default.createElement(
				'div',
				null,
				(0, _reactRouterConfig.renderRoutes)(_Routes2.default)
			)
		)
	));

	// add here the helmet staff for seo, see prof exemple
	return '\n\t\t<html>\n\t\t\t<head>\n\t\t\t<link rel="stylesheet" type="text/css" href="style.css"\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<div id="root">' + content + '</div>\n\t\t\t\t<script>\n\t\t\t\t\twindow.INITIAL_STATE = ' + (0, _serializeJavascript2.default)(store.getState()) + '\n\t\t\t\t</script>\n\t\t\t\t<script src="bundle.js"></script>\n\t\t\t</body>\n\t\t</html>\n\t';
};

// import App from '../client/App';

// const Home = require('./client/components/Home').default;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

var _NavHor = __webpack_require__(14);

var _NavHor2 = _interopRequireDefault(_NavHor);

var _CardsHome = __webpack_require__(15);

var _CardsHome2 = _interopRequireDefault(_CardsHome);

var _HeaderHome = __webpack_require__(16);

var _HeaderHome2 = _interopRequireDefault(_HeaderHome);

var _IntroHome = __webpack_require__(17);

var _IntroHome2 = _interopRequireDefault(_IntroHome);

var _ReviewsHome = __webpack_require__(18);

var _ReviewsHome2 = _interopRequireDefault(_ReviewsHome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_Component) {
	_inherits(HomePage, _Component);

	function HomePage() {
		_classCallCheck(this, HomePage);

		return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).apply(this, arguments));
	}

	_createClass(HomePage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.fetchMainPage();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'homePage' },
				this.props.datas,
				_react2.default.createElement(_HeaderHome2.default, null),
				_react2.default.createElement(_IntroHome2.default, null),
				_react2.default.createElement(_NavHor2.default, null),
				_react2.default.createElement(_CardsHome2.default, null),
				_react2.default.createElement(_ReviewsHome2.default, null)
			);
		}
	}]);

	return HomePage;
}(_react.Component);

function mapStateToProps(state) {
	console.log('ds mapStateToProps');
	console.log(state);
	return { datas: state.mainpage };
}

function loadData(store) {
	return store.dispatch((0, _actions.fetchMainPage)());
}

exports.default = {
	loadData: loadData,
	component: (0, _reactRedux.connect)(mapStateToProps, { fetchMainPage: _actions.fetchMainPage })(HomePage)
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var NavHor = function NavHor(props) {

  return _react2.default.createElement(
    'div',
    { className: 'navHor' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the NavHor!!!!!!'
    )
  );
};

exports.default = NavHor;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var CardsHome = function CardsHome(props) {

  return _react2.default.createElement(
    'div',
    { className: 'CardsHome' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the CardsHome!!!!!!'
    )
  );
};

exports.default = CardsHome;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var HeaderHome = function HeaderHome(props) {

  return _react2.default.createElement(
    'div',
    { className: 'headerHome' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the HeaderHome!!!!!!'
    )
  );
};

exports.default = HeaderHome;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var IntroHome = function IntroHome(props) {

  return _react2.default.createElement(
    'div',
    { className: 'introHome' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the IntroHome!!!!!!'
    )
  );
};

exports.default = IntroHome;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var ReviewsHome = function ReviewsHome(props) {

  return _react2.default.createElement(
    'div',
    { className: 'reviewsHome' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the ReviewsHome!!!!!!'
    )
  );
};

exports.default = ReviewsHome;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// staticContext is the context proprs, which has been rename internally by the router
// we need to default the value as an empty object, as in the client server this context won t appear (un truc comme ca..) 
// const NotFoundPage = ({staticContext = {}}) => {
var NotFoundPage = function NotFoundPage() {
	// in case of err, we set the value of the context, which will be exploitable in the index.js
	// staticContext.notFound = true;
	return _react2.default.createElement(
		'h2',
		null,
		'Oooops, route not found'
	);
};

exports.default = {
	component: NotFoundPage
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterConfig = __webpack_require__(2);

var _BannerLogoTop = __webpack_require__(21);

var _BannerLogoTop2 = _interopRequireDefault(_BannerLogoTop);

var _NavMain = __webpack_require__(22);

var _NavMain2 = _interopRequireDefault(_NavMain);

var _Footer = __webpack_require__(23);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
	var route = _ref.route;

	return _react2.default.createElement(
		'div',
		{ className: 'app' },
		_react2.default.createElement(_BannerLogoTop2.default, null),
		_react2.default.createElement(_NavMain2.default, null),
		(0, _reactRouterConfig.renderRoutes)(route.routes),
		_react2.default.createElement(_Footer2.default, null)
	);
};

// normaly we do a separate function but as it's a short one. 
// we include it directly as inline function inside the export default
// function loadData() {	
// }

exports.default = {
	component: App
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var BannerLogoTop = function BannerLogoTop(props) {

  return _react2.default.createElement(
    'div',
    { className: 'bannerLogoTop' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the BannerLogoTop!!!!!!'
    )
  );
};

exports.default = BannerLogoTop;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var NavMain = function NavMain(props) {

  return _react2.default.createElement(
    'div',
    { className: 'navMain' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the NavMain!!!!!!'
    )
  );
};

exports.default = NavMain;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { connect } from 'react-redux';

var Footer = function Footer(props) {

  return _react2.default.createElement(
    'div',
    { className: 'footer' },
    _react2.default.createElement(
      'p',
      null,
      'Iam the Footer !!!!!!'
    )
  );
};

exports.default = Footer;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = __webpack_require__(7);

var _reduxThunk = __webpack_require__(26);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(27);

var _reducers2 = _interopRequireDefault(_reducers);

var _axios = __webpack_require__(6);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// we create an axios instance, like we have done for the client side (src/client/clien.js)
// the req object contenant the cookies data has been pass here in src/index.js
// the || '' inside the headers set the default headers value as empty in case of no cookie
exports.default = function (req) {
	//const axiosInstance = axios.create({
	//}) 


	// as we have done for the setting of the client thunk (see src/client/client.js)
	var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));

	console.log('ds create store');
	console.log(store.getState());

	return store;
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _redux = __webpack_require__(7);

var _reducerProject = __webpack_require__(28);

exports.default = (0, _redux.combineReducers)({
        mainpage: _reducerProject.reducerFetchMainpage,
        intoheadProgramingmindset: _reducerProject.reducerIntoheadProgramingmindset
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reducerIntoheadProgramingmindset = exports.reducerFetchMainpage = undefined;

var _actions = __webpack_require__(5);

var reducerFetchMainpage = exports.reducerFetchMainpage = function reducerFetchMainpage() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case _actions.FETCH_MAINPAGE:
			return action.payload.data;
		default:
			return state;
	};
};

var reducerIntoheadProgramingmindset = exports.reducerIntoheadProgramingmindset = function reducerIntoheadProgramingmindset() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case _actions.INTOHEAD_PROGRAMINGMINDSET:
			console.log('reduc prograing minset');
			console.log(action.payload.data);
			return action.payload.data;
		default:
			return state;
	};
};

/***/ })
/******/ ]);