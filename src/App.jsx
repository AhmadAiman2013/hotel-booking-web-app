import { useState, lazy, Suspense } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProviderComp } from "./components/ThemeProvider";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import MyProfile from "./pages/MyProfile";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./store";

const Home = lazy(() => import("./pages/Home"));
const HotelInfo = lazy(() => import("./pages/HotelInfo"));

const queryClient = new QueryClient();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <ThemeProviderComp darkMode={darkMode}>
        <AuthContextProvider setDarkMode={setDarkMode}>
          <Provider store={store}>
            <Suspense fallback={<LoadingSkeleton />}>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route
                    path="/hotels"
                    element={<PrivateRoute component={Home} />}
                  />
                  <Route
                    path="/hotels/:slug"
                    element={<PrivateRoute component={HotelInfo} />}
                  />
                  <Route
                    path="/my-profile"
                    element={<PrivateRoute component={MyProfile} />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </QueryClientProvider>
            </Suspense>
          </Provider>
        </AuthContextProvider>
      </ThemeProviderComp>
    </>
  );
}
