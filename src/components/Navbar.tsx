import { Menu as MenuIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-green-400">
      <div className="mx-auto max-w-4xl px-4 h-12 flex justify-between items-center ">
        <MenuIcon />
        <h1 className="font-bold text-2xl">Esquire</h1>
        <button className="py-1 px-4 bg-blue-500 text-white rounded-xl">
          Sign In
        </button>
      </div>
    </nav>
  );
}
