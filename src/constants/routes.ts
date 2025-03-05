import EditPost from "pages/editPost";
import Login from "pages/login";
import PersonalInfo from "pages/personalInfo";

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
    name: "עריכת פוסט",
    element: EditPost,
  },
  {
    path: "/personalInfo",
    name: "פרטים אישיים",
    element: PersonalInfo,
  },
];

export const PATHS = {
  CHAT: "chat",
  MY_RECIPES: "my-recipes",
  POST: "post",
  MAIN: "main",
  PERSONAL_INFO: "personal-info",
};
