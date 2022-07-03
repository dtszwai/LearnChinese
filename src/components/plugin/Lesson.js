module.exports = function (context, options) {
  return {
    name: 'plugin-dynamic-routes',
    async contentLoaded({ content, actions }) {
      const { addRoute } = actions
      const routes = [
        {
          "path": "/learn",
          "exact": false,
          "component": "@site/src/pages/learn/lesson"
        },
      ];

      routes.map(route => addRoute(route))
    }
  }
}