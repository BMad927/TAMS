services.js
export default function handler(req, res) {
  res.status(200).json({
    services: [
      "Network Setup",
      "Hardware Repair",
      "Software Installation",
      "Technical Support"
    ]
  });
}