import Link from "next/link";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms";

const Navbar = () => {
  const user = useRecoilValue(authState);

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/expenses">
            <a>Expenses</a>
          </Link>
        </li>
        <li>
          <Link href="/charts">
            <a>Charts</a>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button>Register</button>
            </li>
            <li>
              <button>Login</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
