import Link from "next/link";
const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar bg-base-100 shadow-sm">
        <h1 className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            SkillsCheck.dev
          </Link>
        </h1>
        <nav className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <details>
                <summary>Tests</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link href="/">Link 1</Link>
                  </li>
                  <li>
                    <Link href="/">Link 2</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/login">Log In</Link>
            </li>
            <li>
              <Link href="/register">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
