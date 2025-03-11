import EditPost from "pages/editPost";
import Login from "pages/login";
import PersonalInfo from "pages/personalInfo";
import MyRecipes from "pages/myRecipes";
import HomePage from "pages/homePage";
import RecipePage from "pages/recipePage";

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
    path: "/recipe/:id",
    name: "פרטיי מתכון",
    element: RecipePage,
  },
  {
    path: "/edit/:id?",
    name: "עריכת פוסט",
    element: EditPost,
  },
  {
    path: "/personal-info",
    name: "פרטים אישיים",
    element: PersonalInfo,
  },
  {
    path: "/my-recipes",
    name: "my recipes",
    element: MyRecipes,
  },
];

export const PATHS = {
  CHAT: "/chat",
  MY_RECIPES: "/my-recipes",
  POST: "/edit",
  RECIPE: "/recipe",
  HOME: "/home",
  PERSONAL_INFO: "/personal-info",
};
