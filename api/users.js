export default function handler(req, res) {
  res.status(200).json({
    users: [
      { id: 1, name: "Melly Borja", role: "Owner" },
      { id: 2, name: "Matt Paolo", role: "Engineer" },
      { id: 3, name: "Ethan", role: "Technician" }
    ]
  });
}
