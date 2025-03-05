import EditPost from "pages/editPost";
import Login from "pages/login";
import PersonalInfo from "pages/personalInfo";
import HomePage from "pages/homePage";

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
    path: "/post",
    name: "עריכת פוסט",
    element: EditPost,
  },
  {
    path: "/personal-info",
    name: "פרטים אישיים",
    element: PersonalInfo,
  },
];

export const PATHS = {
  CHAT: "chat",
  MY_RECIPES: "my-recipes",
  POST: "post",
  HOME: "home",
  PERSONAL_INFO: "personal-info",
};
