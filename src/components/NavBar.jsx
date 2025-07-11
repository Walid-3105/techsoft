import logo from "../assets/logo.png";
const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <a href="/">
          <img
            className="w-[130px] md:w-[300px] -ml-4 md:-ml-6 h-[40px] md:h-[70px] object-cover"
            src={logo}
            alt=""
          />
        </a>
      </div>
      {/* <div className="flex-none">
        <Link to="adminDashboard">
          <button className="btn btn-outline btn-sm md:btn-md">
            Dashboard
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default NavBar;
