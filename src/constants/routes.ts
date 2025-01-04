import Login from "../pages/index.ts/login";

export interface RouteType {
  path: string;
  name?: string;
  element: () => JSX.Element;
}

export const UNAUTHENTICATED_ROUTES: RouteType[] = [
  {
    path: "/login",
    name: "כניסה",
    element: Login,
  },
];

export const ROUTES: RouteType[] = [];
