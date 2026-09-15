import { useState } from "react";
import axios from "axios";

const ApiTest = () => {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        type: "municipality",
        status: "pending",
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setResponse(null);
        setError(null);

        try {
            const result = await axios.post(
                "http://localhost:8000/api/v1/tenants/register",
                formData
            );

            console.log("API Response:", result.data);

            setResponse(result.data);

        } catch (error) {
            console.error("API Error:", error);

            setError(
                error.response?.data || error.message
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Tenant API Test</h1>

            <form onSubmit={handleSubmit}>

                {/* Name */}
                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter tenant name"
                    />
                </div>

                <br />

                {/* Code */}
                <div>
                    <label>Code</label>

                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Enter tenant code"
                    />
                </div>

                <br />

                {/* Type */}
                <div>
                    <label>Type</label>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="individual">
                            Individual
                        </option>

                        <option value="government_agency">
                            Government Agency
                        </option>

                        <option value="municipality">
                            Municipality
                        </option>
                    </select>
                </div>

                <br />

                {/* Status */}
                <div>
                    <label>Status</label>

                    <select
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
                </div>

                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register Tenant"}
                </button>

            </form>

            {/* Success Response */}
            {response && (
                <div>
                    <h2>Success Response</h2>

                    <pre>
                        {JSON.stringify(response, null, 2)}
                    </pre>
                </div>
            )}

            {/* Error Response */}
            {error && (
                <div>
                    <h2>Error</h2>

                    <pre>
                        {JSON.stringify(error, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ApiTest;