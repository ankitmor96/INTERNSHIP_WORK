import { useMemo, useState, useEffect, useRef } from "react";
import {
  Menu, Search, Bell, CheckCircle2, Clock, XCircle, Layers, LayoutDashboard,
  ClipboardList, Users, BarChart3, Settings, LogOut, Plus, Pencil, Trash2,
  ChevronLeft, ChevronRight, X, Calendar, Inbox, ChevronDown, User,
} from "lucide-react";
import "./Dashboard.css";

const initialData = [
  { id: 1, name: "Revenue Department", code: "REV001", type: "Finance", status: "Active", date: "12 Aug 2025" },
  { id: 2, name: "Health Department", code: "HTH002", type: "Medical", status: "Pending", date: "20 Aug 2025" },
  { id: 3, name: "Police Department", code: "PLC003", type: "Security", status: "Active", date: "25 Aug 2025" },
  { id: 4, name: "Education Department", code: "EDU004", type: "Education", status: "Deactive", date: "28 Aug 2025" },
  { id: 5, name: "Transport Department", code: "TRN005", type: "Transport", status: "Pending", date: "02 Sep 2025" },
  { id: 6, name: "Urban Development", code: "URB006", type: "Development", status: "Active", date: "05 Sep 2025" },
  { id: 7, name: "Agriculture Department", code: "AGR007", type: "Finance", status: "Pending", date: "09 Sep 2025" },
  { id: 8, name: "Home Department", code: "HOM008", type: "Security", status: "Active", date: "14 Sep 2025" },
  { id: 9, name: "Labour Department", code: "LAB009", type: "Development", status: "Deactive", date: "18 Sep 2025" },
  { id: 10, name: "Forest Department", code: "FOR010", type: "Transport", status: "Active", date: "21 Sep 2025" },
  { id: 11, name: "Fisheries Department", code: "FIS011", type: "Education", status: "Pending", date: "24 Sep 2025" },
  { id: 12, name: "Energy Department", code: "ENR012", type: "Finance", status: "Active", date: "27 Sep 2025" },
];

const PAGE_SIZE = 5;
const TYPES = ["Finance", "Medical", "Security", "Education", "Transport", "Development"];

const formatToday = () =>
  new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const StatusIcon = ({ status }) => {
  if (status === "Active") return <CheckCircle2 size={17} />;
  if (status === "Pending") return <Clock size={17} />;
  return <XCircle size={17} />;
};

const Initials = ({ name }) => {
  const parts = name.replace(/ department/i, "").split(/\s+/).filter(Boolean);
  const p = parts[0] || "D";
  return p.charAt(0).toUpperCase();
};

const Dashboard = () => {
  const [records, setRecords] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ntfOpen, setNtfOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [dayCount, setDayCount] = useState(0);
  const modalRef = useRef(null);

  /* Date title */
  const dateRef = useRef(null);
  useEffect(() => {
    if (dateRef.current) dateRef.current.textContent = formatToday();
  }, []);

  /* Prevent body scroll while modal open */
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  /* Escape key to close modal + sidebar */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setSidebarOpen(false);
        setNtfOpen(false);
        setAdminOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Day counter */
  useEffect(() => {
    const t = setInterval(() => setDayCount((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const q = searchTerm.trim().toLowerCase();
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q);
      const matchType = typeFilter === "All" || r.type === typeFilter;
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      return matchQ && matchType && matchStatus;
    });
  }, [records, searchTerm, typeFilter, statusFilter]);

  const statusCounts = useMemo(() => {
    const total = records.length;
    const active = records.filter((r) => r.status === "Active").length;
    const pending = records.filter((r) => r.status === "Pending").length;
    return { total, active, pending, deactive: total - active - pending };
  }, [records]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageRecords = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const openAdd = () => {
    setEditRecord(null);
    setIsModalOpen(true);
  };

  const openEdit = (rec) => {
    setEditRecord(rec);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this authorisation?")) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSave = (data) => {
    if (editRecord) {
      setRecords((prev) => prev.map((r) => (r.id === editRecord.id ? { ...r, ...data } : r)));
    } else {
      const newId = records.length ? Math.max(...records.map((r) => r.id)) + 1 : 1;
      setRecords((prev) => [...prev, { id: newId, ...data }]);
    }
    setIsModalOpen(false);
    setEditRecord(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  return (
    <div className="dashboard">
      {/* Tri-color bar */}
      <div className="tricolor-bar">
        <div className="stripe saffron" />
        <div className="stripe white" />
        <div className="stripe green" />
      </div>

      {/* Header */}
      <header className="top-header">
        <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="header-brand">
          <img src="/assets/government-emblem.png" alt="Emblem of India" className="gov-emblem" />
          <div className="gov-title">
            {/* <strong>Government of Gujarat</strong> */}
            <strong>Digital Gujarat - Citizen Services</strong>
          </div>
        </div>

        <div className="header-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search Dashboard..."
            aria-label="Search Dashboard"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="header-right">
          <div className="ntf-wrap">
            <button
              className="notification"
              aria-label="Notifications"
              onClick={() => {
                setNtfOpen((o) => !o);
                setAdminOpen(false);
              }}
            >
              <Bell size={21} />
              <span>3</span>
            </button>
            {ntfOpen && (
              <div className="dropdown-panel ntf-panel">
                <h3>Notifications</h3>
                <div className="ntf-item">
                  <CheckCircle2 size={18} className="ntf-ic green" />
                  <div>
                    <p>Authorisation REV001 approved</p>
                    <small>2 minutes ago</small>
                  </div>
                </div>
                <div className="ntf-item">
                  <Clock size={18} className="ntf-ic orange" />
                  <div>
                    <p>HEALTH002 is pending review</p>
                    <small>1 hour ago</small>
                  </div>
                </div>
                <div className="ntf-item">
                  <XCircle size={18} className="ntf-ic red" />
                  <div>
                    <p>LAB009 was deactivated</p>
                    <small>Yesterday</small>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="admin-wrap">
            <div
              className="admin-profile"
              onClick={() => {
                setAdminOpen((o) => !o);
                setNtfOpen(false);
              }}
            >
              <div className="profile-avatar">A</div>
              <div className="profile-text">
                <strong>Admin</strong>
                <small>System Administrator</small>
              </div>
              <ChevronDown size={17} />
            </div>
            {adminOpen && (
              <div className="dropdown-panel admin-panel">
                <div className="panel-user">
                  <div className="profile-avatar">A</div>
                  <div>
                    <strong>Admin</strong>
                    <small>admin@civicos.gov.in</small>
                  </div>
                </div>
                <button type="button">
                  <span><User size={16} /></span> My Profile
                </button>
                <button type="button">
                  <span><Settings size={16} /></span> Settings
                </button>
                <div className="panel-divider" />
                <button type="button" className="panel-danger">
                  <span><LogOut size={16} /></span> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="body">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="brand">
            <img src="/assets/government-emblem.png" alt="Emblem" className="brand-symbol" />
            <h2>
              CIVICOS
            </h2>
          </div>

          <div className="sidebar-menu">
            <button className="menu-item active">
              <span><LayoutDashboard size={22} /></span> Dashboard
            </button>
            <button className="menu-item">
              <span><ClipboardList size={22} /></span> Authorisations
            </button>
            <button className="menu-item">
              <span><Users size={22} /></span> Users
            </button>
            <button className="menu-item">
              <span><Layers size={22} /></span> Reports
            </button>
            <button className="menu-item">
              <span><BarChart3 size={22} /></span> Analytics
            </button>
            <button className="menu-item">
              <span><Inbox size={22} /></span> Inbox
            </button>
            <button className="menu-item">
              <span><Settings size={22} /></span> Settings
            </button>
          </div>

          <button className="logout-button">
            <span><LogOut size={22} /></span> Logout
          </button>
        </aside>

        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
        {(ntfOpen || adminOpen) && (
          <div
            className="dropdown-backdrop"
            onMouseDown={() => {
              setNtfOpen(false);
              setAdminOpen(false);
            }}
          />
        )}

        {/* Main */}
        <main className="main-content">
          <div className="page-content">
            <div className="page-title">
              <div>
                <h1>Government Authorisation Dashboard</h1>
                <p>Welcome back, Administrator. Manage all government department authorisations here.</p>
              </div>
              <div className="date">
                <Calendar size={16} /> <span ref={dateRef}>{formatToday()}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card total-card">
                <div className="stat-icon"><Layers size={24} /></div>
                <div>
                  <p>Total Authorisations</p>
                  <h2>{statusCounts.total}</h2>
                  <small>All departments combined</small>
                </div>
              </div>
              <div className="stat-card active-card">
                <div className="stat-icon"><CheckCircle2 size={24} /></div>
                <div>
                  <p>Active</p>
                  <h2>{statusCounts.active}</h2>
                  <small className="increase">LIVE AND OPERATIONAL</small>
                </div>
              </div>
              <div className="stat-card pending-card">
                <div className="stat-icon"><Clock size={24} /></div>
                <div>
                  <p>Pending</p>
                  <h2>{statusCounts.pending}</h2>
                  <small>AWAITING APPROVAL</small>
                </div>
              </div>
              <div className="stat-card deactive-card">
                <div className="stat-icon"><XCircle size={24} /></div>
                <div>
                  <p>Deactive</p>
                  <h2>{statusCounts.deactive}</h2>
                  <small>NEEDS REVIEW</small>
                </div>
              </div>
            </div>

            {/* Authorisation table card */}
            <div className="authorisation-card">
              <div className="card-header">
                <h2><ClipboardList size={19} /> Active Authorisations</h2>
                <button className="add-button" onClick={openAdd}>
                  <Plus size={18} /> Add Authorisation
                </button>
              </div>

              {/* Filters */}
              <div className="filters">
                <div className="table-search">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by name, code, type or status..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Types</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Deactive">Deactive</option>
                </select>
                <button className="clear-button" onClick={clearFilters}>Clear Filters</button>
              </div>

              {/* Table */}
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Created On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRecords.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <div className="no-data">
                            <Inbox size={34} className="no-data-icon" />
                            No authorisation found. Try changing the filters.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      pageRecords.map((rec, idx) => (
                        <tr key={rec.id}>
                          <td>{(safePage - 1) * PAGE_SIZE + idx + 1}</td>
                          <td className="department-name">
                            <Initials name={rec.name} /> {rec.name}
                          </td>
                          <td>{rec.code}</td>
                          <td>{rec.type}</td>
                          <td>
                            <select
                              className={`status-select ${rec.status.toLowerCase()}`}
                              value={rec.status}
                              onChange={(e) =>
                                setRecords((prev) =>
                                  prev.map((r) => (r.id === rec.id ? { ...r, status: e.target.value } : r))
                                )
                              }
                            >
                              <option value="Active">Active</option>
                              <option value="Pending">Pending</option>
                              <option value="Deactive">Deactive</option>
                            </select>
                          </td>
                          <td>{rec.date}</td>
                          <td>
                            <div className="actions">
                              <button className="edit-btn" onClick={() => openEdit(rec)} aria-label="Edit">
                                <Pencil size={16} />
                              </button>
                              <button className="delete-btn" onClick={() => handleDelete(rec.id)} aria-label="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="table-footer">
                <span>
                  Showing <strong>{filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}</strong>-
                  <strong>{Math.min(safePage * PAGE_SIZE, filtered.length)}</strong> of{" "}
                  <strong>{filtered.length}</strong> records
                </span>
                <div className="pagination">
                  <button onClick={() => goToPage(safePage - 1)} disabled={safePage === 1} aria-label="Previous">
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={p === safePage ? "page-active" : ""}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages} aria-label="Next">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Authorisation Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <div className="modal" ref={modalRef} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div>
                <h2>{editRecord ? "Edit Authorisation" : "Add New Authorisation"}</h2>
                <p>Fill the details below</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <AuthorisationForm
              key={editRecord ? editRecord.id : "new"}
              initial={editRecord}
              existingCodes={records.map((r) => r.code)}
              onCancel={() => setIsModalOpen(false)}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const AuthorisationForm = ({ initial, existingCodes, onCancel, onSave }) => {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    code: initial?.code ?? "",
    type: initial?.type ?? "Finance",
    status: initial?.status ?? "Active",
    date: initial?.date ?? new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
  });

  const [error, setError] = useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const submit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const code = form.code.trim();
    if (!name || !code) {
      setError("Please fill all required fields.");
      return;
    }
    const dup = existingCodes.some((c) => c.toLowerCase() === code.toLowerCase() && c !== initial?.code);
    if (dup) {
      setError("This code is already used. Please use a different code.");
      return;
    }
    onSave({ name, code, type: form.type, status: form.status, date: form.date });
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label htmlFor="auth-name">Department Name</label>
        <input
          id="auth-name"
          type="text"
          placeholder="e.g. Revenue Department"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="auth-code">Authorisation Code</label>
        <input
          id="auth-code"
          type="text"
          placeholder="e.g. REV001"
          value={form.code}
          onChange={(e) => update("code", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="auth-type">Type</label>
        <select id="auth-type" value={form.type} onChange={(e) => update("type", e.target.value)}>
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="auth-status">Status</label>
        <select id="auth-status" value={form.status} onChange={(e) => update("status", e.target.value)}>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Deactive">Deactive</option>
        </select>
      </div>
      {error && <p className="form-error" style={{ color: "#d62f3e", fontSize: "13px", margin: "0 0 12px" }}>{error}</p>}
      <div className="modal-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="save-btn">{initial ? "Update" : "Save"}</button>
      </div>
    </form>
  );
};

export default Dashboard;