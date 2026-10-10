import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import Dashboard from "./assets/pages/Dashboard";
import Map from "./assets/pages/Map";

function App() {
  return (
    <Router>
      {/* Header */}
      <header style={styles.header}>
        <h2 style={styles.logo}>🚑 Smart Ambulance</h2>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <Link to="/map" style={styles.link}>Map</Link>   {/* ✅ Added Map link */}
          <Link to="/login" style={{ ...styles.link, ...styles.loginBtn }}>Login</Link>
        </nav>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />   {/* ✅ Added Map route */}
      </Routes>
    </Router>
  );
}

const styles = {
  header: {
    background: "#0077b6",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  nav: { display: "flex", gap: "20px" },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },
  loginBtn: {
    background: "#023e8a",
    padding: "8px 15px",
    borderRadius: "5px",
  }
};

export default App;
