import EditPost from "pages/editPost";
import Login from "pages/login";
import PersonalInfo from "pages/personalInfo";
import MyRecipes from "pages/myRecipes";
import HomePage from "pages/homePage";
import RecipePage from "pages/recipePage";
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
  {
    path: "/personal-info",
    name: "פרטים אישיים",
    element: PersonalInfo,
  },
  {
    path: "/my-recipes",
    name: "המתכונים שלי",
    element: MyRecipes,
  },
];

export const PATHS = {
  CHATBOT: "/chatbot",
  MY_RECIPES: "/my-recipes",
  POST: "/edit",
  RECIPE: "/recipe",
  HOME: "/home",
  PERSONAL_INFO: "/personal-info",
};
