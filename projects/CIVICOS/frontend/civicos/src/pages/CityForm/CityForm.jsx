
import { useState } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Hash,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

import "./CityForm.css";

const CityForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    country: "",
    osmId: "",
    status: "active",
  });

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAlert({
      type: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.osmId
    ) {
      setAlert({
        type: "error",
        message: "Please fill all required fields.",
      });

      return;
    }

    console.log("City Data:", formData);

    setAlert({
      type: "success",
      message: "City information submitted successfully.",
    });
  };

  const closeAlert = () => {
    setAlert({
      type: "",
      message: "",
    });
  };

  return (
    <div className="city-form-page">

      {/* ================= HEADER ================= */}

      <header className="city-header">

        <div className="city-header-left">

          <div className="city-emblem">
            <img
              src="/assets/government-emblem.png"
              alt="Government of Gujarat Emblem"
            />
          </div>

          <div>
            <h1>Government of Gujarat</h1>
            <p>Civicos Digital Services Portal</p>
          </div>

        </div>

        <div className="city-brand">
          <strong>CIVICOS</strong>
          <span>Digital Governance</span>
        </div>

      </header>


      {/* ================= CENTER ALERT ================= */}

      {alert.message && (
        <div className={`city-alert ${alert.type}`}>

          <div className="city-alert-icon">

            {alert.type === "success" ? (
              <CheckCircle size={24} />
            ) : (
              <AlertCircle size={24} />
            )}

          </div>

          <div className="city-alert-content">

            <strong>
              {alert.type === "success"
                ? "Success"
                : "Validation Error"}
            </strong>

            <span>{alert.message}</span>

          </div>

          <button
            type="button"
            className="city-alert-close"
            onClick={closeAlert}
          >
            <X size={18} />
          </button>

        </div>
      )}


      {/* ================= MAIN ================= */}

      <main className="city-main">

        <div className="city-card">

          <div className="city-title">

            <div className="city-title-icon">
              <Building2 size={27} />
            </div>

            <div>
              <h2>City Information</h2>
              <p>
                Enter the city details for government
                administration.
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="city-grid">

              {/* CITY */}

              <div className="city-field">

                <label htmlFor="city">
                  City <span>*</span>
                </label>

                <div className="city-input">

                  <MapPin size={18} />

                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* STATE */}

              <div className="city-field">

                <label htmlFor="state">
                  State <span>*</span>
                </label>

                <div className="city-input">

                  <MapPin size={18} />

                  <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="Enter state name"
                    value={formData.state}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* COUNTRY */}

              <div className="city-field">

                <label htmlFor="country">
                  Country <span>*</span>
                </label>

                <div className="city-input">

                  <Globe size={18} />

                  <input
                    id="country"
                    type="text"
                    name="country"
                    placeholder="Enter country name"
                    value={formData.country}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* OSM ID */}

              <div className="city-field">

                <label htmlFor="osmId">
                  OSM ID <span>*</span>
                </label>

                <div className="city-input">

                  <Hash size={18} />

                  <input
                    id="osmId"
                    type="text"
                    name="osmId"
                    placeholder="Enter OSM ID"
                    value={formData.osmId}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


            {/* STATUS */}

            <div className="status-section">

              <label className="status-label">
                Status
              </label>

              <div className="status-options">

                <label className="radio-option">

                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                  />

                  <span className="radio-custom"></span>

                  <span>Active</span>

                </label>


                <label className="radio-option">

                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={handleChange}
                  />

                  <span className="radio-custom"></span>

                  <span>Inactive</span>

                </label>

              </div>

            </div>


            {/* BUTTON */}

            <div className="city-actions">

              <button
                type="submit"
                className="city-submit"
              >
                <CheckCircle size={18} />
                Save City
              </button>

            </div>

          </form>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="city-footer">

        <span>
          © 2026 Government of Gujarat. All Rights Reserved.
        </span>

        <div>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Help &amp; Support</span>
        </div>

      </footer>

    </div>
  );
};

export default CityForm;

