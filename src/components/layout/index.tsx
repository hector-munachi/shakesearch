import { Fragment, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <header className="md:container md:mx-auto px-4 py-8">
        <nav className="container flex items-center">
          <ul className="flex items-center text-lg gap-4 list-none">
            <li className={pathname === "/" ? "text-[#9B1E25]" : ""}>
              <Link to="/">Search</Link>
            </li>
            <li className={pathname === "/plays" ? "text-[#9B1E25]" : ""}>
              <Link to="/plays">Plays</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="md:container md:mx-auto min-h-screen">{children}</main>
    </Fragment>
  );
};

export default Layout;
