import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

const initialAuthorities = [
    {
        id: 1,
        name: "Rajkot Municipal Corporation",
        code: "RMC001",
        type: "Municipality",
        status: "Active",
    },
    {
        id: 2,
        name: "Ahmedabad Municipal Corporation",
        code: "AMC001",
        type: "Municipality",
        status: "Active",
    },
    {
        id: 3,
        name: "Gujarat Digital Services",
        code: "GDS001",
        type: "Government Agency",
        status: "Pending",
    },
    {
        id: 4,
        name: "Citizen Welfare Department",
        code: "CWD001",
        type: "Government Agency",
        status: "Deactive",
    },
];

const Dashboard = () => {
    const [authorities, setAuthorities] = useState(() => {
        const savedData = localStorage.getItem("civicosAuthorities");

        return savedData
            ? JSON.parse(savedData)
            : initialAuthorities;
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add");

    const [selectedAuthority, setSelectedAuthority] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        type: "Individual",
        status: "Pending",
    });

    /* ================= ALERT ================= */

    const [alert, setAlert] = useState({
        show: false,
        type: "",
        title: "",
        message: "",
    });

    /* ================= DELETE CONFIRMATION ================= */

    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        authority: null,
    });

    /* ================= SAVE DATA ================= */

    useEffect(() => {
        localStorage.setItem(
            "civicosAuthorities",
            JSON.stringify(authorities)
        );
    }, [authorities]);

    /* ================= STATISTICS ================= */

    const total = authorities.length;

    const active = authorities.filter(
        (item) => item.status === "Active"
    ).length;

    const pending = authorities.filter(
        (item) => item.status === "Pending"
    ).length;

    const deactive = authorities.filter(
        (item) => item.status === "Deactive"
    ).length;

    /* ================= SEARCH + FILTER ================= */

    const filteredAuthorities = useMemo(() => {
        return authorities.filter((item) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                item.name.toLowerCase().includes(searchValue) ||
                item.code.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusFilter === "All" ||
                item.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [authorities, search, statusFilter]);

    /* ================= OPEN ADD ================= */

    const openAddModal = () => {
        setModalType("add");

        setFormData({
            name: "",
            code: "",
            type: "Individual",
            status: "Pending",
        });

        setShowModal(true);
    };

    /* ================= OPEN EDIT ================= */

    const openEditModal = (authority) => {
        setModalType("edit");

        setSelectedAuthority(authority);

        setFormData({
            name: authority.name,
            code: authority.code,
            type: authority.type,
            status: authority.status,
        });

        setShowModal(true);
    };

    /* ================= HANDLE FORM ================= */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* ================= SUBMIT ADD / EDIT ================= */

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.code.trim()) {
            setAlert({
                show: true,
                type: "error",
                title: "Required Information",
                message:
                    "Please enter both authority name and authority code.",
            });

            return;
        }

        if (modalType === "add") {
            const newAuthority = {
                id: Date.now(),
                ...formData,
                name: formData.name.trim(),
                code: formData.code.trim().toUpperCase(),
            };

            setAuthorities((prev) => [
                ...prev,
                newAuthority,
            ]);

            setShowModal(false);

            setAlert({
                show: true,
                type: "success",
                title: "Authority Added",
                message:
                    "Government authority has been successfully added to the CIVICOS system.",
            });
        } else {
            setAuthorities((prev) =>
                prev.map((item) =>
                    item.id === selectedAuthority.id
                        ? {
                              ...item,
                              ...formData,
                              name: formData.name.trim(),
                              code: formData.code
                                  .trim()
                                  .toUpperCase(),
                          }
                        : item
                )
            );

            setShowModal(false);

            setAlert({
                show: true,
                type: "success",
                title: "Authority Updated",
                message:
                    "Government authority information has been successfully updated.",
            });
        }
    };

    /* ================= CHANGE STATUS ================= */

    const handleStatusChange = (id, newStatus) => {
        setAuthorities((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status: newStatus,
                      }
                    : item
            )
        );

        setAlert({
            show: true,
            type: "success",
            title: "Status Updated",
            message: `Authority status has been changed to ${newStatus}.`,
        });
    };

    /* ================= DELETE ================= */

    const handleDelete = (authority) => {
        setDeleteConfirm({
            show: true,
            authority: authority,
        });
    };

    /* ================= CONFIRM DELETE ================= */

    const confirmDelete = () => {
        const authority = deleteConfirm.authority;

        if (!authority) return;

        setAuthorities((prev) =>
            prev.filter(
                (item) => item.id !== authority.id
            )
        );

        setDeleteConfirm({
            show: false,
            authority: null,
        });

        setAlert({
            show: true,
            type: "success",
            title: "Authority Removed",
            message:
                "Government authority has been successfully removed from the CIVICOS system.",
        });
    };

    /* ================= CANCEL DELETE ================= */

    const cancelDelete = () => {
        setDeleteConfirm({
            show: false,
            authority: null,
        });
    };

    return (
        <div className="dashboard-wrapper">

            {/* ================= HEADER ================= */}

            <header className="dashboard-header">

                <div className="dashboard-brand">

                    <div className="dashboard-emblem">
                        🏛️
                    </div>

                    <div>
                        <h1>CIVICOS</h1>
                        <p>Government Digital Services</p>
                    </div>

                </div>

                <nav className="dashboard-nav">

                    <a href="/home">
                        Home
                    </a>

                    <a
                        href="/dashboard"
                        className="active"
                    >
                        Dashboard
                    </a>

                    <a href="/government-form">
                        Government Authority
                    </a>

                </nav>

            </header>


            {/* ================= MAIN ================= */}

            <main className="dashboard-main">

                {/* ================= TITLE ================= */}

                <div className="dashboard-title-row">

                    <div>

                        <span className="dashboard-label">
                            GOVERNMENT ADMINISTRATION
                        </span>

                        <h2>
                            Authority Dashboard
                        </h2>

                        <p>
                            Manage and monitor registered government
                            authorities and their service status.
                        </p>

                    </div>

                    <button
                        className="add-authority-btn"
                        onClick={openAddModal}
                    >
                        <span>+</span>
                        Add Authority
                    </button>

                </div>


                {/* ================= STATS ================= */}

                <section className="stats-grid">

                    <div className="stat-card total-card">

                        <div className="stat-icon">
                            🏛️
                        </div>

                        <div>
                            <span>
                                Total Authorities
                            </span>

                            <strong>
                                {total}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card active-card">

                        <div className="stat-icon">
                            ✓
                        </div>

                        <div>
                            <span>
                                Active
                            </span>

                            <strong>
                                {active}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card pending-card">

                        <div className="stat-icon">
                            ◷
                        </div>

                        <div>
                            <span>
                                Pending
                            </span>

                            <strong>
                                {pending}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card deactive-card">

                        <div className="stat-icon">
                            ×
                        </div>

                        <div>
                            <span>
                                Deactive
                            </span>

                            <strong>
                                {deactive}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ================= TABLE CARD ================= */}

                <section className="authority-card">

                    <div className="authority-card-header">

                        <div>

                            <h3>
                                Government Authorities
                            </h3>

                            <p>
                                Registered authority records
                            </p>

                        </div>

                        <span className="record-count">
                            {filteredAuthorities.length} Records
                        </span>

                    </div>


                    {/* ================= FILTERS ================= */}

                    <div className="dashboard-filters">

                        <div className="search-box">

                            <span>
                                ⌕
                            </span>

                            <input
                                type="text"
                                placeholder="Search by name or code..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Deactive">
                                Deactive
                            </option>

                        </select>

                    </div>


                    {/* ================= TABLE ================= */}

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>
                                    <th>
                                        Authority Name
                                    </th>

                                    <th>
                                        Code
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredAuthorities.length > 0 ? (

                                    filteredAuthorities.map(
                                        (authority) => (

                                            <tr
                                                key={
                                                    authority.id
                                                }
                                            >

                                                <td>

                                                    <div className="authority-name">

                                                        <div className="mini-icon">
                                                            🏛️
                                                        </div>

                                                        <strong>
                                                            {
                                                                authority.name
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span className="authority-code">
                                                        {
                                                            authority.code
                                                        }
                                                    </span>

                                                </td>


                                                <td>
                                                    {
                                                        authority.type
                                                    }
                                                </td>


                                                <td>

                                                    <select
                                                        className={`status-select ${authority.status.toLowerCase()}`}
                                                        value={
                                                            authority.status
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                authority.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="Active">
                                                            Active
                                                        </option>

                                                        <option value="Pending">
                                                            Pending
                                                        </option>

                                                        <option value="Deactive">
                                                            Deactive
                                                        </option>

                                                    </select>

                                                </td>


                                                <td>

                                                    <div className="action-buttons">

                                                        {/* VIEW */}

                                                        <button
                                                            className="view-btn"
                                                            title="View"
                                                            onClick={() => {

                                                                setSelectedAuthority(
                                                                    authority
                                                                );

                                                                setModalType(
                                                                    "view"
                                                                );

                                                                setShowModal(
                                                                    true
                                                                );

                                                            }}
                                                        >
                                                            👁
                                                        </button>


                                                        {/* EDIT */}

                                                        <button
                                                            className="edit-btn"
                                                            title="Edit"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    authority
                                                                )
                                                            }
                                                        >
                                                            ✎
                                                        </button>


                                                        {/* DELETE */}

                                                        <button
                                                            className="delete-btn"
                                                            title="Delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    authority
                                                                )
                                                            }
                                                        >
                                                            🗑
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="no-records"
                                        >
                                            No government authorities
                                            found.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

            </main>


            {/* ================= ADD / EDIT / VIEW MODAL ================= */}

            {showModal && (

                <div className="dashboard-modal-overlay">

                    <div className="dashboard-modal">

                        <button
                            className="modal-close"
                            onClick={() =>
                                setShowModal(false)
                            }
                        >
                            ×
                        </button>


                        {modalType === "view" ? (

                            <>

                                <div className="modal-icon">
                                    🏛️
                                </div>

                                <span className="modal-label">
                                    CIVICOS GOVERNMENT PORTAL
                                </span>

                                <h3>
                                    Authority Details
                                </h3>


                                <div className="details-list">

                                    <div>

                                        <span>
                                            Name
                                        </span>

                                        <strong>
                                            {
                                                selectedAuthority?.name
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Code
                                        </span>

                                        <strong>
                                            {
                                                selectedAuthority?.code
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Type
                                        </span>

                                        <strong>
                                            {
                                                selectedAuthority?.type
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Status
                                        </span>

                                        <strong
                                            className={`details-status ${selectedAuthority?.status.toLowerCase()}`}
                                        >
                                            {
                                                selectedAuthority?.status
                                            }
                                        </strong>

                                    </div>

                                </div>


                                <button
                                    className="modal-primary-btn"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Close
                                </button>

                            </>

                        ) : (

                            <>

                                <div className="modal-icon">
                                    {modalType === "add"
                                        ? "+"
                                        : "✎"}
                                </div>

                                <span className="modal-label">
                                    CIVICOS GOVERNMENT PORTAL
                                </span>

                                <h3>

                                    {modalType === "add"
                                        ? "Add Government Authority"
                                        : "Edit Government Authority"}

                                </h3>


                                <form
                                    onSubmit={handleSubmit}
                                    className="authority-form"
                                >

                                    <label>
                                        Authority Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter authority name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />


                                    <label>
                                        Authority Code
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="code"
                                        placeholder="Enter authority code"
                                        value={formData.code}
                                        onChange={handleChange}
                                    />


                                    <label>
                                        Type
                                        <span>*</span>
                                    </label>

                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                    >

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


                                    <label>
                                        Status
                                        <span>*</span>
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >

                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Deactive">
                                            Deactive
                                        </option>

                                    </select>


                                    <button
                                        type="submit"
                                        className="modal-primary-btn"
                                    >

                                        {modalType === "add"
                                            ? "Add Authority"
                                            : "Save Changes"}

                                    </button>

                                </form>

                            </>

                        )}

                    </div>

                </div>

            )}


            {/* =================================================
                CUSTOM DELETE CONFIRMATION ALERT
            ================================================= */}

            {deleteConfirm.show && (

                <div className="dashboard-alert-overlay">

                    <div className="dashboard-alert delete-confirm-alert">

                        <div className="dashboard-alert-icon delete-confirm-icon">
                            🗑
                        </div>

                        <span>
                            CIVICOS GOVERNMENT PORTAL
                        </span>

                        <h3>
                            Confirm Deletion
                        </h3>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>
                                {deleteConfirm.authority?.name}
                            </strong>
                            ?
                            <br />
                            This action cannot be undone.
                        </p>


                        <div className="delete-confirm-buttons">

                            <button
                                className="delete-cancel-btn"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>

                            <button
                                className="delete-confirm-btn"
                                onClick={confirmDelete}
                            >
                                Delete Authority
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* ================= SUCCESS / ERROR ALERT ================= */}

            {alert.show && (

                <div className="dashboard-alert-overlay">

                    <div
                        className={`dashboard-alert ${alert.type}`}
                    >

                        <div className="dashboard-alert-icon">

                            {alert.type === "success"
                                ? "✓"
                                : "!"}

                        </div>

                        <span>
                            CIVICOS GOVERNMENT PORTAL
                        </span>

                        <h3>
                            {alert.title}
                        </h3>

                        <p>
                            {alert.message}
                        </p>

                        <button
                            onClick={() =>
                                setAlert({
                                    show: false,
                                    type: "",
                                    title: "",
                                    message: "",
                                })
                            }
                        >
                            Continue
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Dashboard;