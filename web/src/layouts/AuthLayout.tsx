import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh bg-[#f7f8f7] text-[#17231f]">
      <AuthNavbar />
      <main className="mx-auto w-full max-w-md px-4 py-8 sm:px-0 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}