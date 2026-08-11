const filterButtons = document.querySelectorAll("[data-filter]");
const publications = Array.from(document.querySelectorAll(".publication"));
const publicationToggle = document.querySelector("#publication-toggle");
const collapsedLimit = 6;
let expanded = false;

function renderPublications() {
  const activeButton = document.querySelector("[data-filter].active");
  const filter = activeButton?.dataset.filter || "All";
  const matching = publications.filter(
    (publication) => filter === "All" || publication.dataset.kind === filter
  );

  publications.forEach((publication) => {
    const matchingIndex = matching.indexOf(publication);
    const matchesFilter = matchingIndex !== -1;
    const withinLimit = expanded || matchingIndex < collapsedLimit;
    publication.hidden = !matchesFilter || !withinLimit;

    if (matchesFilter) {
      publication.querySelector(".pub-number").textContent = String(
        matchingIndex + 1
      ).padStart(2, "0");
    }
  });

  if (publicationToggle) {
    const hasMore = matching.length > collapsedLimit;
    publicationToggle.hidden = !hasMore;
    publicationToggle.setAttribute("aria-expanded", String(expanded));
    publicationToggle.firstChild.textContent = expanded
      ? "Show fewer publications "
      : `Show all ${matching.length} publications `;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    expanded = false;
    renderPublications();
  });
});

publicationToggle?.addEventListener("click", () => {
  expanded = !expanded;
  renderPublications();
});

renderPublications();
