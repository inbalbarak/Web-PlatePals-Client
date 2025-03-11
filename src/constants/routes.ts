import EditPost from "pages/editPost";
import HomePage from "pages/homePage";
import RecipePage from "pages/recipePage";
import Login from "../pages/index.ts/login";
import ChatBot from "pages/chatbot";

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
    path: "/edit/:id?",
    name: "עריכת פוסט",
    element: EditPost,
  },
  {
    path: "/chatbot",
    name: "צ'אטבוט",
    element: ChatBot,
  },
];

export const PATHS = {
  CHATBOT: "/chatbot",
  MY_RECIPES: "/my-recipes",
  POST: "/post",
  RECIPE: "/recipe",
  HOME: "/home",
  PERSONAL_INFO: "/personal-info",
};
