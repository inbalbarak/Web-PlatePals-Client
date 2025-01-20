import EditPost from "pages/editPost";
import MyRecipes from "pages/myRecipes";
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
  MAIN: "main",
  PERSONAL_INFO: "personal-info",
};
