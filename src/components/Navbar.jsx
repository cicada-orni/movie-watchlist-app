function Navbar({ children }) {
  return (
    <nav className="bg-zinc-900 shadow-lg">
      <div className="max-w-7x1 mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {children}
      </div>
    </nav>
  );
}

export default Navbar;
