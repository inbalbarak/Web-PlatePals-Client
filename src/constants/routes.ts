import EditPost from "pages/editPost";
import MyRecipes from "pages/myRecipes";
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
    name: "edit post",
    element: EditPost,
  },
  {
    path: "/my-recipes",
    name: "my recipes",
    element: MyRecipes,
  },
];

export const PATHS = {
  CHAT: "chat",
  MY_RECIPES: "my-recipes",
  POST: "post",
  HOME: "home",
  PERSONAL_INFO: "personal-info",
};
