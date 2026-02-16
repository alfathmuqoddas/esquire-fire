import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <main>
      <Navbar />
      <main className="max-w-4xl p-4 mx-auto border rounded-xl">
        <Outlet />
      </main>
    </main>
  );
}
