async function loadAnalytics() {
  try {
    const response = await fetch("/api/hello");
    const data = await response.json();

    // Example data for chart (replace with actual analytics data if needed)
    const labels = ["Visitors", "Clients", "Projects"];
    const values = [
      data.analytics.visitors || 100,
      data.analytics.clients || 50,
      data.analytics.projects || 20
    ];

    const ctx = document.getElementById("analyticsChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "TAMS Analytics",
          data: values,
          backgroundColor: ["#007bff", "#28a745", "#ffc107"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "System Analytics" }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

  } catch (err) {
    console.error("Error fetching API:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadAnalytics);
