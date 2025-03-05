import styles from "./App.style";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ROUTES, RouteType, UNAUTHENTICATED_ROUTES } from "./constants/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "constants/localStorage";
import BottomNavbar from "components/BottomNavbar";

function App() {
  const queryClient = new QueryClient();
  const [loggedIn, setLoggedIn] = useState(false);

  window.addEventListener("storage", () => {
    setLoggedIn(Boolean(localStorage.getItem(ACCESS_TOKEN)));
  });

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem(ACCESS_TOKEN)));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={styles.root}>
        <Router>
          <Box>
            <Routes>
              {UNAUTHENTICATED_ROUTES.map(
                ({ path, element: Component }: RouteType) => (
                  <Route key={path} path={path} element={<Component />} />
                )
              )}
              {loggedIn &&
                ROUTES.map(({ path, element: Component }: RouteType) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
            {window.location.pathname !== "/" && <BottomNavbar />}
          </Box>
        </Router>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
