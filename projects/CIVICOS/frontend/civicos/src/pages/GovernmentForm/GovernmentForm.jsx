import { useState } from "react";
import axios from "axios";
import "./GovernmentForm.css";

const GovernmentForm = () => {

    // =================================
    // FORM DATA
    // =================================

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        city: "",
        type: "",
        status: "pending",
    });

    // =================================
    // VALIDATION ERRORS
    // =================================

    const [errors, setErrors] = useState({});

    // =================================
    // SUCCESS ALERT
    // =================================

    const [showAlert, setShowAlert] = useState(false);

    // =================================
    // LOADING
    // =================================

    const [loading, setLoading] = useState(false);

    // =================================
    // API ERROR
    // =================================

    const [apiError, setApiError] = useState("");

    // =================================
    // HANDLE CHANGE
    // =================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear particular field error
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Clear API error
        setApiError("");
    };

    // =================================
    // FORM VALIDATION
    // =================================

    const validateForm = () => {

        const newErrors = {};

        // ---------------------------------
        // NAME
        // ---------------------------------

        if (!formData.name.trim()) {

            newErrors.name = "Name is required.";

        } else if (/\d/.test(formData.name)) {

            newErrors.name = "Name must not contain numbers.";

        }

        // ---------------------------------
        // CODE
        // ---------------------------------

        if (!formData.code.trim()) {

            newErrors.code = "Code is required.";

        } else if (/\d/.test(formData.code)) {

            newErrors.code = "Code must not contain numbers.";

        }

        // ---------------------------------
        // CITY
        // ---------------------------------

        if (!formData.city.trim()) {

            newErrors.city = "City is required.";

        } else if (/\d/.test(formData.city)) {

            newErrors.city = "City must not contain numbers.";

        }

        // ---------------------------------
        // TYPE
        // ---------------------------------

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

        // ---------------------------------
        // STATUS
        // ---------------------------------

        const validStatuses = [
            "pending",
            "active",
            "deactive",
        ];

        if (!formData.status) {

            newErrors.status = "Please select a status.";

        } else if (!validStatuses.includes(formData.status)) {

            newErrors.status = "Please select a valid status.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =================================
    // SUBMIT + API
    // =================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setApiError("");

        try {

            // =================================
            // POST API
            // =================================

            const response = await axios.post(
                "http://localhost:8000/api/v1/tenants/register",
                {
                    name: formData.name,
                    code: formData.code,

                    // Frontend type:
                    // Municipality
                    //
                    // Backend:
                    // municipality
                    type:
                        formData.type === "Individual"
                            ? "individual"
                            : formData.type === "Government Agency"
                                ? "government_agency"
                                : "municipality",

                    // Status
                    status: formData.status,
                }
            );

            // =================================
            // SUCCESS
            // =================================

            console.log(
                "Government Authority Registered:",
                response.data
            );

            // Show success alert
            setShowAlert(true);

            // Reset form
            setFormData({
                name: "",
                code: "",
                city: "",
                type: "",
                status: "pending",
            });

            // Clear errors
            setErrors({});

        } catch (error) {
            console.error("API Error:", error);

            let message = "Something went wrong.";

            if (error.response?.data?.detail) {
                const detail = error.response.data.detail;

                if (Array.isArray(detail)) {
                    message = detail
                        .map((item) => item.msg || "Invalid input.")
                        .join(", ");
                } else if (typeof detail === "string") {
                    message = detail;
                } else {
                    message = "Invalid data. Please check the form.";
                }
            } else if (error.response?.data?.message) {
                message = error.response.data.message;
            } else {
                message = error.message;
            }

            setApiError(String(message));
        } finally {
            setLoading(false);
        }
    };

    // =================================
    // CLOSE ALERT
    // =================================

    const closeAlert = () => {
        setShowAlert(false);
    };

    // =================================
    // JSX
    // =================================

    return (
        <div className="government-wrapper">

            {/* =================================
                HEADER
            ================================= */}

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

                        <p>
                            Government Digital Services
                        </p>

                    </div>

                </div>

                <nav className="government-nav">

                    <a href="/home">
                        Home
                    </a>

                    <a href="/dashboard">
                        Services
                    </a>

                    <a
                        href="/government-form"
                        className="active"
                    >
                        Government Authority
                    </a>

                </nav>

            </header>


            {/* =================================
                MAIN
            ================================= */}

            <main className="government-page">

                {/* =================================
                    LEFT INFORMATION
                ================================= */}

                <div className="government-info">

                    <div className="government-icon">
                        🏛️
                    </div>

                    <h2>
                        Government Authority
                    </h2>

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


                {/* =================================
                    FORM CARD
                ================================= */}

                <div className="government-form-card">

                    <div className="form-header">

                        <div className="form-icon">
                            👤
                        </div>

                        <div>

                            <h2>
                                Registration Form
                            </h2>

                            <p>
                                Please fill in the details to continue.
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        API ERROR
                    ================================= */}

                    {apiError && (

                        <div className="api-error-message">

                            ⚠ {apiError}

                        </div>

                    )}


                    <form onSubmit={handleSubmit}>

                        {/* =================================
                            NAME
                        ================================= */}

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


                        {/* =================================
                            CODE
                        ================================= */}

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


                        {/* =================================
                            CITY
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="city">
                                City <span>*</span>
                            </label>

                            <input
                                id="city"
                                type="text"
                                name="city"
                                placeholder="Enter city name"
                                value={formData.city}
                                onChange={handleChange}
                            />

                            {errors.city && (

                                <p className="error-message">
                                    ⚠ {errors.city}
                                </p>

                            )}

                        </div>


                        {/* =================================
                            TYPE
                        ================================= */}

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


                        {/* =================================
                            STATUS
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="status">
                                Status <span>*</span>
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="active">
                                    Active
                                </option>

                                <option value="deactive">
                                    Deactive
                                </option>

                            </select>

                            {errors.status && (

                                <p className="error-message">
                                    ⚠ {errors.status}
                                </p>

                            )}

                        </div>


                        {/* =================================
                            REGISTER
                        ================================= */}

                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Registering..."
                                : "Register"
                            }

                        </button>

                    </form>

                </div>

            </main>


            {/* =================================
                FOOTER
            ================================= */}

            <footer className="government-footer">

                <p>
                    © 2026 CIVICOS Government Digital Services
                </p>

                <div>

                    <span>
                        Citizen Services
                    </span>

                    <span>•</span>

                    <span>
                        Transparency
                    </span>

                    <span>•</span>

                    <span>
                        Digital Governance
                    </span>

                </div>

            </footer>


            {/* =================================
                SUCCESS ALERT
            ================================= */}

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