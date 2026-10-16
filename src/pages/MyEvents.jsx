
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cancelRegistration } from "../redux/registrationSlice";

function RegisteredEvent({ registration, onCancel }) {
  return (
    <div className="event-card">
      {registration.image && (
        <img src={registration.image} alt={registration.name} />
      )}

      <h3>{registration.name}</h3>

      <p>Date: {registration.date || "Not available"}</p>
      <p>Time: {registration.time || "Not available"}</p>
      <p>Venue: {registration.venue || "Not available"}</p>

      <Link to={`/events/${registration.eventId}`}>
        View Details
      </Link>

      {onCancel && (
        <button
          type="button"
          className="cancel-button"
          onClick={() => onCancel(registration.eventId)}
        >
          Cancel Registration
        </button>
      )}
    </div>
  );
}

function MyEvents() {
  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => state.registrations);
  const dispatch = useDispatch();

  const myRegistrations = registrations.filter(
    (registration) => registration.userEmail === user?.email
  );

  const today = new Date();

  const todayString =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

  const upcomingEvents = myRegistrations.filter(
    (registration) => registration.date && registration.date >= todayString
  );

  const completedEvents = myRegistrations.filter(
    (registration) => registration.date && registration.date < todayString
  );

  const eventsWithoutDate = myRegistrations.filter(
    (registration) => !registration.date
  );

  function handleCancel(eventId) {
    if (!user || !window.confirm("Cancel your registration for this event?")) {
      return;
    }

    const details = {
      eventId: eventId,
      userEmail: user.email,
    };

    const remaining = registrations.filter(
      (registration) =>
        !(
          registration.eventId === eventId &&
          registration.userEmail === user.email
        )
    );

    dispatch(cancelRegistration(details));

    localStorage.setItem(
      "registrations",
      JSON.stringify(remaining)
    );
  }

  return (
    <div>
      <h1>My Events</h1>

      {myRegistrations.length === 0 ? (
        <p>You have not registered for any events yet.</p>
      ) : (
        <>
          <h2>Upcoming Events</h2>

          {upcomingEvents.length === 0 && <p>No upcoming events.</p>}

          <div className="events-list">
            {upcomingEvents.map((registration) => (
              <RegisteredEvent
                key={registration.eventId}
                registration={registration}
                onCancel={handleCancel}
              />
            ))}
          </div>

          <h2>Completed Events</h2>

          {completedEvents.length === 0 && <p>No completed events.</p>}

          <div className="events-list">
            {completedEvents.map((registration) => (
              <RegisteredEvent
                key={registration.eventId}
                registration={registration}
              />
            ))}
          </div>

          {eventsWithoutDate.length > 0 && (
            <>
              <h2>Date Not Available</h2>

              <div className="events-list">
                {eventsWithoutDate.map((registration) => (
                  <RegisteredEvent
                    key={registration.eventId}
                    registration={registration}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyEvents;
