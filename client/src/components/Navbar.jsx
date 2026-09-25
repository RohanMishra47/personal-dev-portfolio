import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `font-mono text-sm ${isActive ? "text-pine" : "text-ink/70 hover:text-pine"}`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      <div className="flex items-center gap-6 px-5 py-3">
        <NavLink to="/" className={linkClass} end>
          home
        </NavLink>

        <a
          href="/#projects"
          className="font-mono text-sm text-ink/70 hover:text-pine"
        >
          projects
        </a>

        <NavLink to="/contact" className={linkClass}>
          contact
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-ink/70"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full right-0 mt-2 bg-paper border border-hairline rounded-md shadow-lg flex flex-col min-w-[140px] py-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-mono text-sm text-ink/70 hover:text-pine px-4 py-2"
            end
          >
            home
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="font-mono text-sm text-ink/70 hover:text-pine px-4 py-2"
          >
            contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
