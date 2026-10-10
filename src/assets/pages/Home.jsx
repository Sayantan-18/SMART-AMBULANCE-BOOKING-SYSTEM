function Home() {
  return (
    <section className="hero">
      <h1>🚑 Smart Ambulance System</h1>
      <p>Request an ambulance instantly and track in real-time.</p>
      <button onClick={() => window.location.href="/login"}>
        Request Ambulance
      </button>
    </section>
  );
}
export default Home;
