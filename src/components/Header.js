import './Header.css';

// Reusable NavLink component
const NavLink = ({ href, children, className = "" }) => {
  return (
    <a 
      href={href} 
      className={`text-white/90 hover:text-white transition-all duration-300 font-medium text-base tracking-wide relative group ${className}`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <a href="/" className="flex items-center hover:opacity-90 transition-smooth">
            <div className="w-32 h-16 flex items-center justify-center overflow-visible">
              <img 
                src="https://haiintel.com/assets/white-logo-nobg-1-bLeBMUHY.svg"
                alt="HaiIntel Logo"
                className="w-32 h-32 logo-bright"
              />
            </div>
          </a>
          
          {/* Navigation in the center */}
          <nav className="hidden lg:flex items-center gap-12">
            <NavLink href="/haiproducts">
              HaiProducts
            </NavLink>
            <NavLink href="/haipods">
              HaiPODs
            </NavLink>
            <NavLink href="/leadership">
              Leadership
            </NavLink>
            <NavLink href="/techstack">
              Tech Stack
            </NavLink>
          </nav>
          
          {/* Get Started button and mobile menu */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-elegant h-10 bg-white text-black hover:bg-white/90 font-semibold text-base px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button className="lg:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;