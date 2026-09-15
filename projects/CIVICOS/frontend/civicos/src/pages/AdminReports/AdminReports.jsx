import { useState } from "react";
import "./AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([
    {
      id: "RPT-001",
      type: "Finance",
      submittedBy: "Rajesh Patel",
      date: "14 Sep 2026",
      status: "Approved",
    },
    {
      id: "RPT-002",
      type: "Medical",
      submittedBy: "Priya Shah",
      date: "13 Sep 2026",
      status: "Pending",
    },
    {
      id: "RPT-003",
      type: "Education",
      submittedBy: "Amit Joshi",
      date: "12 Sep 2026",
      status: "Approved",
    },
    {
      id: "RPT-004",
      type: "Transport",
      submittedBy: "Neha Mehta",
      date: "11 Sep 2026",
      status: "Rejected",
    },
    {
      id: "RPT-005",
      type: "Development",
      submittedBy: "Karan Patel",
      date: "10 Sep 2026",
      status: "Pending",
    },
    {
      id: "RPT-006",
      type: "Security",
      submittedBy: "Mehul Shah",
      date: "09 Sep 2026",
      status: "Approved",
    },
    {
      id: "RPT-007",
      type: "Finance",
      submittedBy: "Dhruv Patel",
      date: "08 Sep 2026",
      status: "Pending",
    },
    {
      id: "RPT-008",
      type: "Medical",
      submittedBy: "Riya Joshi",
      date: "07 Sep 2026",
      status: "Approved",
    },
    {
      id: "RPT-009",
      type: "Education",
      submittedBy: "Harsh Patel",
      date: "06 Sep 2026",
      status: "Approved",
    },
    {
      id: "RPT-010",
      type: "Transport",
      submittedBy: "Mihir Shah",
      date: "05 Sep 2026",
      status: "Rejected",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal
  const [modal, setModal] = useState({
    open: false,
    type: "",
    report: null,
  });

  // Edit form
  const [editForm, setEditForm] = useState({
    type: "",
    submittedBy: "",
    status: "",
  });

  /* =========================================
     CLOSE MODAL
  ========================================= */

  const closeModal = () => {
    setModal({
      open: false,
      type: "",
      report: null,
    });
  };

  /* =========================================
     EDIT REPORT
  ========================================= */

  const handleEdit = (report) => {
    setEditForm({
      type: report.type,
      submittedBy: report.submittedBy,
      status: report.status,
    });

    setModal({
      open: true,
      type: "edit",
      report: report,
    });
  };

  /* =========================================
     SAVE EDIT
  ========================================= */

  const handleSaveEdit = () => {
    setReports((prev) =>
      prev.map((item) =>
        item.id === modal.report.id
          ? {
              ...item,
              type: editForm.type,
              submittedBy: editForm.submittedBy,
              status: editForm.status,
            }
          : item
      )
    );

    setModal({
      open: true,
      type: "success",
      report: modal.report,
    });
  };

  /* =========================================
     DELETE REPORT
  ========================================= */

  const handleDelete = (report) => {
    setModal({
      open: true,
      type: "delete",
      report: report,
    });
  };

  /* =========================================
     CONFIRM DELETE
  ========================================= */

  const confirmDelete = () => {
    setReports((prev) =>
      prev.filter((item) => item.id !== modal.report.id)
    );

    setModal({
      open: true,
      type: "deleted",
      report: modal.report,
    });
  };

  /* =========================================
     FILTER REPORTS
  ========================================= */

  const filteredReports = reports.filter((report) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      report.id.toLowerCase().includes(searchText) ||
      report.type.toLowerCase().includes(searchText) ||
      report.submittedBy.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="reports-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="reports-header">

        <div className="header-left">

          <div className="emblem-box">
            <img
              src="/assets/government-emblem.png"
              alt="Government Emblem"
            />
          </div>

          <div className="brand-content">
            <h1>CIVICOS</h1>

            <p>
              Government Digital Services Portal
            </p>
          </div>

        </div>

        <div className="header-right">

          <span>
            Government of Gujarat
          </span>

          <strong>
            Admin Panel
          </strong>

        </div>

      </header>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="reports-container">

        {/* PAGE TITLE */}

        <div className="page-title">

          <div>
            <h2>
              Admin Reports
            </h2>

            <p>
              Manage and monitor submitted government reports
            </p>
          </div>

          <div className="report-count">

            <span>
              Total Reports
            </span>

            <strong>
              {reports.length}
            </strong>

          </div>

        </div>


        {/* =====================================
            SEARCH & FILTER
        ===================================== */}

        <section className="report-controls">

          <div className="search-box">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by report ID, type or submitted person..."
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

            <option value="Approved">
              Approved
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </section>


        {/* =====================================
            REPORT TABLE
        ===================================== */}

        <section className="reports-card">

          {/* Table Header */}

          <div className="table-header">

            <div>

              <h3>
                Report Records
              </h3>

              <p>
                Official government report entries
              </p>

            </div>

            <div className="records-showing">

              Showing {filteredReports.length} of{" "}
              {reports.length}

            </div>

          </div>


          {/* Table */}

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    REPORT ID
                  </th>

                  <th>
                    REPORT TYPE
                  </th>

                  <th>
                    SUBMITTED BY
                  </th>

                  <th>
                    DATE
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th className="action-heading">
                    ACTION
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredReports.length > 0 ? (

                  filteredReports.map((report) => (

                    <tr key={report.id}>

                      {/* REPORT ID */}

                      <td>

                        <span className="report-id">
                          {report.id}
                        </span>

                      </td>


                      {/* REPORT TYPE */}

                      <td>

                        <span className="report-type">
                          {report.type}
                        </span>

                      </td>


                      {/* SUBMITTED BY */}

                      <td>

                        <div className="submitted-user">

                          <div className="user-icon">
                            {report.submittedBy.charAt(0)}
                          </div>

                          <span>
                            {report.submittedBy}
                          </span>

                        </div>

                      </td>


                      {/* DATE */}

                      <td>
                        {report.date}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status ${report.status.toLowerCase()}`}
                        >

                          <span className="status-dot"></span>

                          {report.status}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="action-cell">

                        <div className="action-buttons">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(report)
                            }
                          >
                            Edit
                          </button>


                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(report)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="no-data"
                    >
                      No reports found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="reports-footer">

        <span>
          © 2026 CIVICOS
        </span>

        <span>
          Government of Gujarat • Civic Digital Services Portal
        </span>

      </footer>


      {/* =====================================
          MODAL
      ===================================== */}

      {modal.open && (

        <div className="modal-overlay">

          <div className="modal-box">

            {/* =================================
                EDIT MODAL
            ================================= */}

            {modal.type === "edit" && (

              <>

                <div className="modal-header">

                  <div>

                    <h3>
                      Edit Report
                    </h3>

                    <p>
                      Update government report information
                    </p>

                  </div>


                  <button
                    className="modal-close"
                    onClick={closeModal}
                  >
                    ×
                  </button>

                </div>


                <div className="modal-body">

                  {/* Report ID */}

                  <div className="form-group">

                    <label>
                      Report ID
                    </label>

                    <input
                      type="text"
                      value={modal.report.id}
                      disabled
                    />

                  </div>


                  {/* Report Type */}

                  <div className="form-group">

                    <label>
                      Report Type
                    </label>

                    <select
                      value={editForm.type}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          type: e.target.value,
                        })
                      }
                    >

                      <option>
                        Finance
                      </option>

                      <option>
                        Medical
                      </option>

                      <option>
                        Security
                      </option>

                      <option>
                        Education
                      </option>

                      <option>
                        Transport
                      </option>

                      <option>
                        Development
                      </option>

                    </select>

                  </div>


                  {/* Submitted By */}

                  <div className="form-group">

                    <label>
                      Submitted By
                    </label>

                    <input
                      type="text"
                      value={editForm.submittedBy}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          submittedBy: e.target.value,
                        })
                      }
                    />

                  </div>


                  {/* Status */}

                  <div className="form-group">

                    <label>
                      Status
                    </label>

                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          status: e.target.value,
                        })
                      }
                    >

                      <option>
                        Approved
                      </option>

                      <option>
                        Pending
                      </option>

                      <option>
                        Rejected
                      </option>

                    </select>

                  </div>

                </div>


                <div className="modal-footer">

                  <button
                    className="cancel-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>


                  <button
                    className="save-btn"
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </button>

                </div>

              </>

            )}


            {/* =================================
                DELETE MODAL
            ================================= */}

            {modal.type === "delete" && (

              <>

                <div className="delete-icon">
                  !
                </div>


                <div className="confirmation-content">

                  <h3>
                    Delete Report?
                  </h3>

                  <p>
                    Are you sure you want to delete{" "}
                    <strong>
                      {modal.report.id}
                    </strong>
                    ?
                  </p>

                  <span>
                    This action cannot be undone.
                  </span>

                </div>


                <div className="modal-footer">

                  <button
                    className="cancel-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>


                  <button
                    className="confirm-delete-btn"
                    onClick={confirmDelete}
                  >
                    Delete Report
                  </button>

                </div>

              </>

            )}


            {/* =================================
                UPDATE SUCCESS
            ================================= */}

            {modal.type === "success" && (

              <div className="success-modal">

                <div className="success-icon">
                  ✓
                </div>

                <h3>
                  Report Updated
                </h3>

                <p>
                  The report has been successfully updated.
                </p>

                <button
                  className="success-btn"
                  onClick={closeModal}
                >
                  Continue
                </button>

              </div>

            )}


            {/* =================================
                DELETE SUCCESS
            ================================= */}

            {modal.type === "deleted" && (

              <div className="success-modal">

                <div className="deleted-icon">
                  ✓
                </div>

                <h3>
                  Report Deleted
                </h3>

                <p>
                  The report has been removed successfully.
                </p>

                <button
                  className="success-btn"
                  onClick={closeModal}
                >
                  Continue
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminReports;