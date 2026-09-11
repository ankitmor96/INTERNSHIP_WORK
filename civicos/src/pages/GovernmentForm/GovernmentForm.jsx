import { useState } from "react";
import "./GovernmentForm.css";

const GovernmentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        type: "",
    });

    const [errors, setErrors] = useState({});

    // Alert State
    const [showAlert, setShowAlert] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        } else if (/\d/.test(formData.name)) {
            newErrors.name = "Name must not contain numbers.";
        }

        // Code validation
        if (!formData.code.trim()) {
            newErrors.code = "Code is required.";
        } else if (/\d/.test(formData.code)) {
            newErrors.code = "Code must not contain numbers.";
        }

        // Type validation
        const validTypes = [
            "Individual",
            "Government Agency",
            "Municipality",
        ];

        if (!formData.type) {
            newErrors.type = "Please select a type.";
        } else if (!validTypes.includes(formData.type)) {
            newErrors.type = "Please select a valid type.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Government Authority Data:", formData);

        // Show custom government alert
        setShowAlert(true);

        setFormData({
            name: "",
            code: "",
            type: "",
        });

        setErrors({});
    };

    // Close Alert
    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="government-wrapper">

            {/* GOVERNMENT HEADER */}
            <header className="government-header">

                <div className="government-brand">

                    <div className="government-emblem">
                        <img
                            src="/assets/government-emblem.png"
                            alt="Government of India Emblem"
                        />
                    </div>

                    <div className="brand-content">
                        <h1>CIVICOS</h1>
                        <p>Government Digital Services</p>
                    </div>

                </div>

                <nav className="government-nav">

                    <a href="/home">Home</a>

                    <a href="/dashboard">Services</a>

                    <a
                        href="/government-form"
                        className="active"
                    >
                        Government Authority
                    </a>

                </nav>

            </header>


            {/* MAIN CONTENT */}
            <main className="government-page">

                <div className="government-info">

                    <div className="government-icon">
                        🏛️
                    </div>

                    <h2>Government Authority</h2>

                    <p>
                        Secure and trusted digital services
                        for citizens and government agencies.
                    </p>

                    <div className="government-features">
                        <span>Service</span>
                        <span>•</span>
                        <span>Transparency</span>
                        <span>•</span>
                        <span>Progress</span>
                    </div>

                </div>


                {/* REGISTRATION FORM */}
                <div className="government-form-card">

                    <div className="form-header">

                        <div className="form-icon">
                            👤
                        </div>

                        <div>
                            <h2>Registration Form</h2>

                            <p>
                                Please fill in the details to continue.
                            </p>
                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* NAME */}
                        <div className="form-group">

                            <label htmlFor="name">
                                Name <span>*</span>
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter government authority name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            {errors.name && (
                                <p className="error-message">
                                    ⚠ {errors.name}
                                </p>
                            )}

                        </div>


                        {/* CODE */}
                        <div className="form-group">

                            <label htmlFor="code">
                                Code <span>*</span>
                            </label>

                            <input
                                id="code"
                                type="text"
                                name="code"
                                placeholder="Enter authority code"
                                value={formData.code}
                                onChange={handleChange}
                            />

                            {errors.code && (
                                <p className="error-message">
                                    ⚠ {errors.code}
                                </p>
                            )}

                        </div>


                        {/* TYPE */}
                        <div className="form-group">

                            <label htmlFor="type">
                                Type <span>*</span>
                            </label>

                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Type
                                </option>

                                <option value="Individual">
                                    Individual
                                </option>

                                <option value="Government Agency">
                                    Government Agency
                                </option>

                                <option value="Municipality">
                                    Municipality
                                </option>

                            </select>

                            {errors.type && (
                                <p className="error-message">
                                    ⚠ {errors.type}
                                </p>
                            )}

                        </div>


                        {/* REGISTER BUTTON */}
                        <button
                            type="submit"
                            className="register-button"
                        >
                            Register
                        </button>

                    </form>

                </div>

            </main>


            {/* FOOTER */}
            <footer className="government-footer">

                <p>
                    © 2026 CIVICOS Government Digital Services
                </p>

                <div>
                    <span>Citizen Services</span>
                    <span>•</span>
                    <span>Transparency</span>
                    <span>•</span>
                    <span>Digital Governance</span>
                </div>

            </footer>


            {/* =====================================
                GOVERNMENT SUCCESS ALERT
            ===================================== */}
            {showAlert && (
                <div className="government-alert-overlay">

                    <div className="government-alert">

                        <div className="government-alert-icon">
                            🏛️
                        </div>

                        <div className="government-alert-label">
                            CIVICOS GOVERNMENT PORTAL
                        </div>

                        <h2>
                            Government Authority Registered
                        </h2>

                        <p>
                            The government authority has been
                            successfully registered in the
                            CIVICOS digital governance system.
                        </p>

                        <button
                            className="government-alert-btn"
                            onClick={closeAlert}
                        >
                            Continue
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
};

export default GovernmentForm;