// Users
fetch("https://tams-system.vercel.app/api/users")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector("#users .content");
    const list = document.createElement("ul");

    data.users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} - ${user.role}`;
      list.appendChild(li);
    });

    container.appendChild(list);
  })
  .catch(err => console.error("Error fetching users:", err));

// Services
fetch("https://tams-system.vercel.app/api/services")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector("#services .content");
    const list = document.createElement("ul");

    data.services.forEach(service => {
      const li = document.createElement("li");
      li.textContent = service;
      list.appendChild(li);
    });

    container.appendChild(list);
  })
  .catch(err => console.error("Error fetching services:", err));

// Analytics
fetch("https://tams-system.vercel.app/api/analytics")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector("#analytics .content");

    const revenue = document.createElement("p");
    revenue.textContent = `Revenue (Yearly): ${data.revenue.join(", ")}`;

    const tickets = document.createElement("p");
    tickets.textContent = `Tickets Handled (Yearly): ${data.ticketsHandled.join(", ")}`;

    container.appendChild(revenue);
    container.appendChild(tickets);
  })
  .catch(err => console.error("Error fetching analytics:", err));
