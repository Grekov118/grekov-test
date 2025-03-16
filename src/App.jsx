import { createHashRouter, RouterProvider } from "react-router-dom";
import Popup from "./components/Popup";
import Screen from "./components/Screen";
import { ValueProvider } from "./contexts/ValueContext";

// const router = createBrowserRouter([
const router = createHashRouter([

  {
    path: "/",
    element: <Screen />,
  },
  {
    path: "/popup",
    element: <Popup />,
  },
]);

function App() {
  return (
    <ValueProvider>
      <RouterProvider router={router} />
    </ValueProvider>
  )
}

export default App;
