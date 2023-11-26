import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="h-screen overflow-x-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
