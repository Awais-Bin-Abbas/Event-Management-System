
import { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

    console.log("API Key Loaded:", Boolean(apiKey));

    if (!apiKey) {
      setError("Ticketmaster API key is missing.");
      setLoading(false);
      return;
    }

    const startDate = new Date().toISOString().split(".")[0] + "Z";

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=12&sort=date,asc&startDateTime=${startDate}`;

    async function fetchEvents() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data._embedded?.events || []);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Explore Events</h1>

      {loading && <p>Loading events...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found.</p>
      )}

      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            {event.images?.[0]?.url && (
              <img src={event.images[0].url} alt={event.name} />
            )}

            <h2>{event.name}</h2>

            <p>
              Date: {event.dates?.start?.localDate || "Not available"}
            </p>

            <p>
              Venue: {event._embedded?.venues?.[0]?.name || "Not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
