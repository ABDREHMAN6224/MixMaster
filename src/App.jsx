import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { About,HomeLayout,Newsletter,Landing,SinglePageError,Error,Cocktail } from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsLetterAction } from "./pages/Newsletter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000*60*5
    }
  }
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement:<Error/>,
    children: [
      {
        index: true,
        errorElement:<SinglePageError/>,
        loader:landingLoader(queryClient),
        element: <Landing />,
      },
      {
        path: "cocktail/:id",
        loader:singleCocktailLoader(queryClient),
        errorElement:<SinglePageError/>,
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        action:newsLetterAction,
        element: <Newsletter />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
<QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
</QueryClientProvider>
  )
};
export default App;
