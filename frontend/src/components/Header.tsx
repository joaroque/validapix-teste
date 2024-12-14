// src/components/Header.tsx
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  links?: { path: string; label: string }[];
}

export default function Header({
  title = "ValidaPIX",
  links = [],
}: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white p-4  flex items-center justify-between">
      <h1 className="text-xl font-bold">{title}</h1>
      <nav className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:bg-gray-700 px-2 py-1 rounded"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
