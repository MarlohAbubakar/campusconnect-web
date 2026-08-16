import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Unable to connect to CampusConnect server.");
        setLoading(false);
      });
  }, []);

  const attendEvent = async (id) => {
    const name = window.prompt("Enter your name:");

    

    if (!name || !name.trim()) {
      return;
    }

    const filteredEvents = events.filter((event) =>
  `${event.title} ${event.location} ${event.description}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

    const response = await fetch(
      `http://localhost:5000/api/events/${id}/attend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage(`✓ ${data.message}`);

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === id ? data.event : event
        )
      );
    } else {
      setMessage(data.error || "Unable to record attendance.");
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="logo">
            Campus<span>Connect</span>
          </div>

          <div className="nav-links">
            <a href="#events">Events</a>
            <a href="#about">About</a>
          </div>
        </nav>

        <div className="hero-content">
          <div>
            <p className="eyebrow">CAMPUS EVENT MANAGER</p>

            <h1>
              Discover what is
              <span> happening on campus.</span>
            </h1>

            <p className="hero-text">
              CampusConnect helps students discover seminars,
              workshops, hackathons and other university events.
            </p>

            <a href="#events" className="hero-button">
              Explore Events
            </a>
          </div>

          <div className="hero-card">
            <div className="calendar-icon">📅</div>
            <h3>Stay Connected</h3>
            <p>
              Find events, view details and register your
              attendance in one place.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section id="events" className="events-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">UPCOMING EVENTS</p>
              <h2>Events around campus</h2>
            </div>

           <div className="events-tools">
  <input
    type="text"
    className="search-input"
    placeholder="Search events or locations..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <span className="event-count">
    {filteredEvents.length} events
  </span>
</div>
          </div>

          {message && (
            <div className="message">
              {message}
            </div>
          )}

          {loading ? (
            <div className="loading">
              Loading campus events...
            </div>
          ) : (
            <div className="event-grid">
              {filteredEvents.map((event) => (
                <article className="event-card" key={event.id}>
                  <div className="event-date">
                    <span>
                      {new Date(event.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                        }
                      )}
                    </span>

                    <strong>
                      {new Date(event.date).getDate()}
                    </strong>
                  </div>

                  <div className="event-content">
                    <h3>{event.title}</h3>

                    <p className="location">
                      📍 {event.location}
                    </p>

                    <p className="description">
                      {event.description}
                    </p>

                    <div className="event-footer">
                      <span className="attendees">
                        👥 {event.attendees.length} attending
                      </span>

                      <button
                        onClick={() => attendEvent(event.id)}
                      >
                        I Will Attend
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="about" className="about-section">
          <p className="eyebrow">ABOUT CAMPUSCONNECT</p>

          <h2>
            One place for the campus community.
          </h2>

          <p>
            CampusConnect is an open-source campus event
            management application built with modern
            open-source technologies.
          </p>
        </section>
      </main>

      <footer>
        <strong>CampusConnect</strong>
        <span>Open Source Campus Event Manager</span>
      </footer>
    </div>
  );
}

export default App;