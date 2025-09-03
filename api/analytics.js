export default function handler(req, res) {
  res.status(200).json({
    revenue: [10000, 12000, 15000, 18000], // yearly revenue
    ticketsHandled: [250, 300, 400, 500]   // yearly tickets
  });
}