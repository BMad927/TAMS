// Fetch and display Users
fetch("https://tams-system.vercel.app/api/users")
  .then(res => res.json())
  .then(data => {
    const section = document.createElement("section");
    section.innerHTML = "<h2>Users</h2>";
    const list = document.createElement("ul");

    data.users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} - ${user.role}`;
      list.appendChild(li);
    });

    section.appendChild(list);
    document.body.appendChild(section);
  })
  .catch(err => console.error("Error fetching users:", err));

// Fetch and display Analytics
fetch("https://tams-system.vercel.app/api/analytics")
  .then(res => res.json())
  .then(data => {
    const section = document.createElement("section");
    section.innerHTML = "<h2>Analytics</h2>";

    const revenue = document.createElement("p");
    revenue.textContent = `Revenue: ${data.revenue.join(", ")}`;

    const tickets = document.createElement("p");
    tickets.textContent = `Tickets Handled: ${data.ticketsHandled.join(", ")}`;

    section.appendChild(revenue);
    section.appendChild(tickets);
    document.body.appendChild(section);
  })
  .catch(err => console.error("Error fetching analytics:", err));

// Fetch and display Services
fetch("https://tams-system.vercel.app/api/services")
  .then(res => res.json())
  .then(data => {
    const section = document.createElement("section");
    section.innerHTML = "<h2>Services</h2>";
    const list = document.createElement("ul");

    data.services.forEach(service => {
      const li = document.createElement("li");
      li.textContent = service;
      list.appendChild(li);
    });

    section.appendChild(list);
    document.body.appendChild(section);
  })
  .catch(err => console.error("Error fetching services:", err));
