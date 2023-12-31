import { Link } from "react-router-dom";

type MenuProps = {
  links: { name: string; href: string }[];
};

/**
 * Small menu items dropdown with a burger icon
 * @component
 *
 * @param links Array of of link objects to set as a dropdown
 *
 * @example <Menu links={[ { "home", "/" }, { "about us", "/about-us" } ]} />
 */

const Menu = ({ links }: MenuProps) => {
  return (
    <>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm z-50 mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  target={link.href.includes("http") ? "_blank" : ""}
                  to={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
