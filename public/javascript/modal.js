document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("updateModal");
  const closeModal = document.querySelector(".close");

  window.openUpdateModal = function (id, niveau, description, max, min) {
    document.getElementById("updateId").value = id;
    document.getElementById("updateNiveau").value = niveau;
    document.getElementById("updateDescription").value = description;
    document.getElementById("updateMax").value = max;
    document.getElementById("updateMin").value = min;

    modal.style.display = "flex";
  };

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
