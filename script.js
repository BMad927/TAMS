document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("analyticsChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Stevedore",
        "Winch Operator",
        "Payloader Operator",
        "Arrastre",
        "Kapatas",
        "Driver",
        "Palletizer",
        "Mooring"
      ],
      datasets: [
        {
          label: "Number of Workers",
          data: [50, 20, 15, 30, 10, 25, 18, 12], // sample numbers
          backgroundColor: "#00509e"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "TAMS Workforce Distribution"
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
