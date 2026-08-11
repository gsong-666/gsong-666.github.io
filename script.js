const filterButtons = document.querySelectorAll("[data-filter]");
const publications = document.querySelectorAll(".publication");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    let visibleIndex = 0;
    publications.forEach((publication) => {
      const visible = filter === "All" || publication.dataset.kind === filter;
      publication.hidden = !visible;
      if (visible) {
        visibleIndex += 1;
        publication.querySelector(".pub-number").textContent = String(visibleIndex).padStart(2, "0");
      }
    });
  });
});
