import { useState } from "react";
import "./SecondRegister.css";

const SecondRegister = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        authority: "",
        department: "",
        role: "",
        password: "",
        confirmPassword: ""
    });


    const [alert, setAlert] = useState({
        show: false,
        type: "",
        message: ""
    });


    // =========================================
    // HANDLE INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =========================================
    // SHOW ALERT
    // =========================================

    const showAlert = (type, message) => {

        setAlert({
            show: true,
            type: type,
            message: message
        });


        setTimeout(() => {

            setAlert({
                show: false,
                type: "",
                message: ""
            });

        }, 3000);
    };


    // =========================================
    // FORM SUBMIT
    // =========================================

    const handleSubmit = (e) => {

        e.preventDefault();


        // Required field validation
        // Email is optional

        if (
            !formData.name ||
            !formData.authority ||
            !formData.department ||
            !formData.role ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            showAlert(
                "warning",
                "Please fill in all required fields."
            );

            return;
        }


        // =========================================
        // PASSWORD MATCH VALIDATION
        // =========================================

        if (formData.password !== formData.confirmPassword) {

            showAlert(
                "error",
                "Password and Confirm Password do not match."
            );

            return;
        }


        // =========================================
        // SUCCESS
        // =========================================

        showAlert(
            "success",
            "Registration completed successfully."
        );


        console.log("Registration Data:", formData);
    };


    return (

        <div className="second-register-page">


            {/* =========================================
                HEADER
            ========================================= */}

            <header className="second-register-header">

                <div className="second-register-brand">

                    <img
                        src="/assets/government-emblem.png"
                        alt="Government Emblem"
                    />


                    <div>

                        <h1>
                            CIVICOS
                        </h1>

                        <p>
                            Government Digital Services Portal
                        </p>

                    </div>

                </div>


                <div className="second-register-title">

                    Government Registration

                </div>

            </header>


            {/* =========================================
                MAIN
            ========================================= */}

            <main className="second-register-main">

                <div className="second-register-card">


                    {/* =========================================
                        HEADING
                    ========================================= */}

                    <div className="second-register-heading">

                        <div className="second-register-icon">
                            🏛️
                        </div>


                        <div>

                            <h2>
                                Register New Account
                            </h2>

                            <p>
                                Create your official CIVICOS government account
                            </p>

                        </div>

                    </div>


                    {/* =========================================
                        ALERT
                    ========================================= */}

                    {alert.show && (

                        <div
                            className={`second-register-alert ${alert.type}`}
                        >

                            <div className="second-alert-icon">

                                {alert.type === "success" && "✓"}

                                {alert.type === "warning" && "!"}

                                {alert.type === "error" && "×"}

                            </div>


                            <span>
                                {alert.message}
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setAlert({
                                        show: false,
                                        type: "",
                                        message: ""
                                    })
                                }
                            >
                                ×
                            </button>

                        </div>

                    )}


                    {/* =========================================
                        FORM
                    ========================================= */}

                    <form onSubmit={handleSubmit}>

                        <div className="second-register-grid">


                            {/* =====================================
                                NAME
                            ===================================== */}

                            <div className="second-register-field">

                                <label>
                                    Full Name <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                />

                            </div>


                            {/* =====================================
                                EMAIL - OPTIONAL
                            ===================================== */}

                            <div className="second-register-field">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />

                            </div>


                            {/* =====================================
                                AUTHORITY
                            ===================================== */}

                            <div className="second-register-field">

                                <label>
                                    Authority <span>*</span>
                                </label>

                                <select
                                    name="authority"
                                    value={formData.authority}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Authority
                                    </option>

                                    <option value="Gujarat Government">
                                        Gujarat Government
                                    </option>

                                    <option value="Municipal Corporation">
                                        Municipal Corporation
                                    </option>

                                    <option value="Municipality">
                                        Municipality
                                    </option>

                                    <option value="District Administration">
                                        District Administration
                                    </option>

                                    <option value="Government Department">
                                        Government Department
                                    </option>

                                </select>

                            </div>


                            {/* =====================================
                                DEPARTMENT
                            ===================================== */}

                            <div className="second-register-field">

                                <label>
                                    Department <span>*</span>
                                </label>

                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Department
                                    </option>

                                    <option value="Finance">
                                        Finance
                                    </option>

                                    <option value="Health">
                                        Health
                                    </option>

                                    <option value="Education">
                                        Education
                                    </option>

                                    <option value="Transport">
                                        Transport
                                    </option>

                                    <option value="Security">
                                        Security
                                    </option>

                                    <option value="Development">
                                        Development
                                    </option>

                                </select>

                            </div>


                            {/* =====================================
                                ROLE
                            ===================================== */}

                            <div className="second-register-field">

                                <label>
                                    Role <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="Enter your role"
                                />

                            </div>


                            {/* =====================================
                                PASSWORD
                            ===================================== */}

                            <div className="second-register-field">

                                <label>
                                    Password <span>*</span>
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                />

                            </div>


                            {/* =====================================
                                CONFIRM PASSWORD
                            ===================================== */}

                            <div className="second-register-field">

                                <label>
                                    Confirm Password <span>*</span>
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                />

                            </div>

                        </div>


                        {/* =========================================
                            BUTTON
                        ========================================= */}

                        <div className="second-register-actions">

                            <button
                                type="submit"
                                className="second-register-submit"
                            >
                                Register Account
                            </button>

                        </div>

                    </form>

                </div>

            </main>


            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="second-register-footer">

                © 2026 CIVICOS · Civic Digital Services Portal

            </footer>

        </div>
    );
};


export default SecondRegister;