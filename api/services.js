export default function handler(req, res) {
  res.status(200).json({
    services: [
      "Stevedoring",
      "Winch Operator (Crane Operator)",
      "Payloader Operation",
      "Arrastre Services",
      "Kapatas (Foreman)",
      "Driver",
      "Palletizer",
      "Mooring Operations"
    ]
  });
}
