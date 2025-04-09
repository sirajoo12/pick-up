
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="py-4 px-4 sm:px-6 bg-secondary">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-3xl md:text-4xl font-display tracking-wide text-white">
          SwipeLines
        </Link>
        <nav>
          <ul className="flex space-x-2">
            <li>
              <Link 
                to="/" 
                className={cn(
                  "px-3 py-2 rounded-lg font-medium text-white opacity-80 hover:opacity-100 transition-opacity",
                  location.pathname === "/" && "bg-primary opacity-100"
                )}
              >
                Swipe
              </Link>
            </li>
            <li>
              <Link 
                to="/favorites" 
                className={cn(
                  "px-3 py-2 rounded-lg font-medium text-white opacity-80 hover:opacity-100 transition-opacity",
                  location.pathname === "/favorites" && "bg-primary opacity-100"
                )}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
