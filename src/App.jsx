import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//Context
import { UserProvider } from "./context/UserContext";
import { SoundProvider } from "./context/SoundContext";
import { QuestionProvider } from "./context/QuestionContext";

//Pages
import RootLayout from "./pages/RootLayout";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ScorePage from "./pages/ScorePage";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<UserProvider />}>
        <Route element={<SoundProvider />}>
          <Route element={<RootLayout />}>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
            <Route element={<QuestionProvider />}>
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/score" element={<ScorePage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
