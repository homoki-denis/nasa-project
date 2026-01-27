const API_URL = process.env.REACT_APP_API_URL;

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);

  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);

  const fetchedLaunches = await response.json();

  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      body: JSON.stringify(launch),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting launch:", error);
    return { error: "Network error" };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error aborting launch:", error);
    return { error: "Network error" };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
