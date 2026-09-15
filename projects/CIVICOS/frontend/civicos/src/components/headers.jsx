import "./header.css";

const Header = () => {
  return (
    <header className="header">

      {/* Left - Government Emblem */}
      <div className="header-left">
        <img
          src="/assets/government-emblem.png"
          alt="Government of India Emblem"
        />
      </div>

      {/* Center - CIVICOS */}
      <div className="header-center">
        <h1>CIVICOS</h1>
        <p>Government Portal</p>
      </div>

      {/* Right - Digital Services */}
      <div className="header-right">
        <span>Digital Services</span>
        <span>for a Better Tomorrow</span>
      </div>

    </header>
  );
};

export default Header;