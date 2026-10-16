
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    setKeyword(search.trim());
  }

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

    setLoading(true);
    setError("");

    if (!apiKey) {
      setError("Ticketmaster API key is missing.");
      setLoading(false);
      return;
    }

    const startDate = new Date().toISOString().split(".")[0] + "Z";

    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=12&sort=date,asc&startDateTime=${startDate}`;

    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    if (category) {
      url += `&segmentName=${encodeURIComponent(category)}`;
    }

    const controller = new AbortController();

    async function fetchEvents() {
      try {
        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data._embedded?.events || []);

      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          setEvents([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => controller.abort();
  }, [keyword, category]);

  return (
    <div>
      <h1>Explore Events</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Film">Film</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading events...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found.</p>
      )}

      {!loading && !error && (
        <div className="events-list">
          {events.map((event) => (
            <div className="event-card" key={event.id}>

              {event.images?.[0]?.url && (
                <img
                  src={event.images[0].url}
                  alt={event.name}
                />
              )}

              <h2>{event.name}</h2>

              <p>
                Date: {event.dates?.start?.localDate || "Not available"}
              </p>

              <p>
                Venue: {event._embedded?.venues?.[0]?.name || "Not available"}
              </p>

              <p>
                Category: {event.classifications?.[0]?.segment?.name || "Not available"}
              </p>

              <Link to={`/events/${event.id}`}>
                View Details
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
