import { createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/search";
import PlaysPage from "./pages/plays";
import PlayDetailsPage from "./pages/playDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/plays",
    element: <PlaysPage />,
  },
  {
    path: "/plays/:playId",
    element: <PlayDetailsPage />,
  },
]);

export default router;
