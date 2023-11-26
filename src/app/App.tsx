import { Route, Routes } from "react-router-dom";
import RootLayout from "./root-layout";

// Pages
import Home from "@/pages/home";
import _404 from "@/pages/404";

// Trigger
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<_404 />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
