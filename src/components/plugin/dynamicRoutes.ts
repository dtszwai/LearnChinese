const lessons = require("../../data/Learn/index.json");

const dynamicRoutes = () => {
  const list = Object.keys(lessons).map((key) => ({
    path: `/learn/${lessons[key].slug}`,
    exact: true,
    component: "@site/src/components/Learn",
  }));

  return {
    name: "plugin-dynamic-routes",
    async contentLoaded({ content, actions }) {
      const { addRoute } = actions;
      const routes = [...list];
      routes.map((route) => addRoute(route));
    },
  };
};

export default dynamicRoutes;
