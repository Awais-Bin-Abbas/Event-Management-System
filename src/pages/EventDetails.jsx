
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addRegistration } from "../redux/registrationSlice";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => state.registrations);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

    if (!apiKey) {
      setError("Ticketmaster API key is missing.");
      setLoading(false);
      return;
    }

    const url = `https://app.ticketmaster.com/discovery/v2/events/${encodeURIComponent(id)}.json?apikey=${apiKey}`;

    const controller = new AbortController();

    async function fetchEventDetails() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load event details.");
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchEventDetails();

    return () => controller.abort();
  }, [id]);

  const alreadyRegistered = registrations.some(
    (registration) =>
      registration.eventId === event?.id &&
      registration.userEmail === user?.email
  );

  function handleRegister() {
    if (!user || !event || alreadyRegistered) {
      return;
    }

    const newRegistration = {
      eventId: event.id,
      userEmail: user.email,
      name: event.name,
      date: event.dates?.start?.localDate || "",
      time: event.dates?.start?.localTime || "",
      venue: event._embedded?.venues?.[0]?.name || "",
      image: event.images?.[0]?.url || "",
    };

    dispatch(addRegistration(newRegistration));

    localStorage.setItem(
      "registrations",
      JSON.stringify([...registrations, newRegistration])
    );

    alert("You have registered for this event successfully!");
  }

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  const venue = event._embedded?.venues?.[0];

  return (
    <div className="event-details">
      <Link to="/events">Back to Events</Link>

      <h1>{event.name}</h1>

      {event.images?.[0]?.url && (
        <img src={event.images[0].url} alt={event.name} />
      )}

      <p><strong>Date:</strong> {event.dates?.start?.localDate || "Not available"}</p>
      <p><strong>Time:</strong> {event.dates?.start?.localTime || "Not available"}</p>
      <p><strong>Venue:</strong> {venue?.name || "Not available"}</p>
      <p><strong>City:</strong> {venue?.city?.name || "Not available"}</p>
      <p><strong>Country:</strong> {venue?.country?.name || "Not available"}</p>
      <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name || "Not available"}</p>
      <p><strong>Genre:</strong> {event.classifications?.[0]?.genre?.name || "Not available"}</p>

      {event.info && (
        <p><strong>Information:</strong> {event.info}</p>
      )}

      {user ? (
        <button
          className="register-button"
          onClick={handleRegister}
          disabled={alreadyRegistered}
        >
          {alreadyRegistered ? "Already Registered" : "Register for Event"}
        </button>
      ) : (
        <Link to="/login">Login to Register</Link>
      )}

      {event.url && (
        <p>
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            View on Ticketmaster
          </a>
        </p>
      )}
    </div>
  );
}

export default EventDetails;
