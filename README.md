# DOMR Router

A static router for creating hash routes.



## Install

Use **npm** or **yarn** to install domr-framework

```
    npm install domr-framework --save
    
    yarn add domr-framework
```





## Use Router

```javascript
    import { Router } from 'domr-framework';
    import HomePageView from './views/HomePageView';
    import ConfigView from './views/ConfigView';

    const router = new Router([
      {
        path: '/',
        view: HomePageView,
        isDefault: true,
      },
      {
        path: '/config/',
        view: ConfigView,
      },
      {
        path: '/config/:topic',
        view: ConfigView,
      },
    ]);

    router.Start();
    
    
```

Router supports wildcard entries like (*, :name)

### Router class

Router() class takes array of routes as the first parameter. The routes object contains two main parameter and one optional isDefault parameter.

- **path** - hash url location
- **view** - a function to execute (without parentheses)
- **isDefault (optional)** - if set true then the route becomes the default path



### .Start()

Initializes the router

### Advanced Router class props

```javascript
    ...

    const router = new Router(routes, {
      refreshPage: true,
    });

    ...
    
    
```

Besides the first parameter i.e. the array of routes Router class also takes config obj as the second parameter.

- **refreshPage** - if set true then refresh the page on every hash change
