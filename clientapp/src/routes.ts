import { Home } from "./components/home/Home";
import { LoginPage } from "./components/login/LoginPage";
import { RegisterPage } from "./components/login/RegisterPage";
import { Settings } from "./components/settings/Settings";

export const routes = [
    {
      path: "/home",
      component: Home
    },
    {
      path: "/settings",
      component: Settings
    },
    {
      path: "/",
      component: LoginPage
    },
    {
      path: "/register",
      component: RegisterPage
    }
];