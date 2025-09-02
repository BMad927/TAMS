// script.js

// Create a div to display backend message
const output = document.createElement("div");
document.body.appendChild(output);

// Fetch data from live Vercel backend
fetch("https://tams-system.vercel.app/api/hello")
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // Check console for debugging
    output.innerText = `Backend says: ${data.message}`;
  })
  .catch((err) => {
    console.error("Error fetching API:", err);
    output.innerText = "Failed to fetch backend data";
  });
