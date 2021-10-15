import { Home } from "./components/home/Home";
import { Settings } from "./components/settings/Settings";

export const routes = [
    {
      path: "/",
      exact: true,
      component: Home
    },
    {
      path: "/settings",
      component: Settings
    }
];