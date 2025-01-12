import styles from "./App.style";
import { Box } from "@mui/material";
import { RouteType, UNAUTHENTICATED_ROUTES } from "./constants/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box sx={styles.root}>
      <Router>
        <Box>
          <Routes>
            {UNAUTHENTICATED_ROUTES.map(
              ({ path, element: Component }: RouteType) => (
                <Route key={path} path={path} element={<Component />} />
              )
            )}
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}

export default App;
