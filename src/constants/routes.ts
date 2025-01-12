import EditPost from "pages/editPost";
import HomePage from "pages/homePage";
import Login from "../pages/index.ts/login";

export interface RouteType {
  path: string;
  name?: string;
  element: () => JSX.Element;
}

export const UNAUTHENTICATED_ROUTES: RouteType[] = [
  {
    path: "/",
    name: "כניסה",
    element: Login,
  },
];

export const ROUTES: RouteType[] = [
  {
    path: "/home",
    name: "דף נחיתה",
    element: HomePage,
  },
  {
    path: "/edit",
    name: "עריכת פוסט",
    element: EditPost,
  },
];

export const PATHS = {
  CHAT: "chat",
  MY_RECIPES: "my-recipes",
  POST: "post",
  HOME: "home",
  PERSONAL_INFO: "personal-info",
};
