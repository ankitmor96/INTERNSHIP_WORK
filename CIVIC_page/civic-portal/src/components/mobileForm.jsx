import { useState } from "react";
import "./mobileForm.css";

const MobileForm = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 10) {
      return;
    }

    setMobile(value);

    if (value.length === 10) {
      setError("");
    } else if (value.length > 0) {
      setError("Mobile number must be exactly 10 digits");
    } else {
      setError("");
    };

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      setError("Please enter a valid 10 digit mobile number");
      return;
    }

    alert("Mobile number submitted successfully!");
  };

  return (
    <div className="form-container">
      <div className="mobile-icon">📱</div>

      <h2>Enter Your Mobile Number</h2>

      <p className="subtitle">
        Please enter your 10 digit mobile number to continue
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile">
          Mobile Number <span>*</span>
        </label>

        <div className="mobile-input">
          <div className="country-code">+91</div>

          <input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            maxLength="10"
          />

        </div>

        {error && <p className="error">{error}</p>}


        <button type="submit" disabled={mobile.length !== 10}>
          Continue <span>→</span>
        </button>

      </form>

    </div>
  );
};
export default MobileForm;