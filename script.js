// ---------------------------
// ANALYTICS (Dynamic from Supabase)
// ---------------------------
async function renderAnalytics() {
  const ctx = document.getElementById("analyticsChart");
  if (!ctx) return;

  ctx.innerHTML = "<p>Loading analytics...</p>";

  const { data, error } = await supabase.from("analytics").select("*");

  if (error) {
    ctx.innerHTML = `<p style="color:red">❌ Error: ${error.message}</p>`;
    return;
  }

  ctx.innerHTML = ""; // clear placeholder

  data.forEach((row) => {
    const barContainer = document.createElement("div");
    barContainer.style.display = "flex";
    barContainer.style.alignItems = "center";
    barContainer.style.margin = "6px 0";

    const barLabel = document.createElement("span");
    barLabel.textContent = row.label;
    barLabel.style.width = "150px";

    const bar = document.createElement("div");
    bar.style.height = "20px";
    bar.style.background = "var(--primary)";
    bar.style.width = row.value + "px";
    bar.style.marginLeft = "10px";
    bar.style.borderRadius = "5px";

    barContainer.appendChild(barLabel);
    barContainer.appendChild(bar);
    ctx.appendChild(barContainer);
  });
}

renderAnalytics();
