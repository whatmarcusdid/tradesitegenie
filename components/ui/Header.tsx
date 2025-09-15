import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          TradeSiteGenie
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/login" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
        </nav>
        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
