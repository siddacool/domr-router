import addView from './helpers/add-view';
import hashLocation from './helpers/hash-location';

const filterRoutes = (routes) => {
  const arr = [];
  routes.forEach((route) => {
    if (route.path && route.view) {
      arr.push(route);
    }
  });

  return arr;
};
const defaults = {
  routes: [],
  config: {
    refreshPage: false,
  },
};

export default class {
  constructor(routes = defaults.routes, config = defaults.config) {
    this.routes = filterRoutes(routes);
    this.refreshPage = config.refreshPage || false;
    this.addView = addView;
  }

  ShowRoutes() {
    console.log(this.routes);
  }

  reloadOnHashChange() {
    addEventListener('hashchange', (e) => {
      if (this.refreshPage) {
        location.reload();
      } else {
        this.Start();
        e.stopImmediatePropagation();
      }
    });
  }

  Start() {
    const loc = hashLocation();
    const locPath = loc.path;
    let candidate;

    if (locPath === '') {
      location.hash = '#/';
    }

    this.routes.forEach((route) => {
      let path = route.path;
      if (path.endsWith('/') && path !== '/') {
        path = path.slice(0, -1);
      }

      const routeDataVal = [];
      const routePathMod = `${path.replace(/([:*])(\w+)/g, (full, dots, name) => {
        routeDataVal.push(name);
        return '([^/]+)';
      })}(?:/|$)`;
      const routePathModRegEx = locPath.match(new RegExp(routePathMod));

      if (routePathModRegEx) {
        const params = routePathModRegEx
        .slice(1, routePathModRegEx.length)
        .reduce((params, value, index) => {
          if (params === null) params = {};
          params[routeDataVal[index]] = value;
          return params;
        }, null);

        route.metadata = params || '';
        route.query = loc.query;
        candidate = route;
      }
    });

    if (candidate) {
      this.addView(candidate);
    } else {
      const routeDefault = this.routes.find(o => o.isDefault === true);
      if (routeDefault) {
        this.addView(routeDefault);
      } else {
        console.error('Page Not Found');
      }
    }

    this.reloadOnHashChange();
  }
}
