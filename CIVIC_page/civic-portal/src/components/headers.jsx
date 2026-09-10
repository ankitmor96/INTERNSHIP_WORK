import "./header.css";

const Header = () => {

  return (
    <header className="header">
      <div className="header-left">

        <div className="emblem">

        </div>
        <img
          src="/assets/government-emblem.png"
          alt="Government of India Emblem"
        />
        <div>
          <small>Government of India</small>
        </div>

      </div>

      <div className="header-center">
        <h1>CIVIC</h1>
        <p>Government Portal</p>
      </div>

      <div className="header-right">
        <span>Digital Services</span>
        <span>for a Better Tomorrow</span>
      </div>

    </header>
  );
};

export default Header;