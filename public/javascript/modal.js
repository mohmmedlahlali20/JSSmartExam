document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imane-update-modal");
  const closeModal = document.querySelector(".imane-close");

  window.openUpdateModal = function (id, niveau, description, max, min) {
    document.getElementById("imane-update-id").value = id;
    document.getElementById("imane-update-niveau").value = niveau;
    document.getElementById("imane-update-description").value = description;
    document.getElementById("imane-update-max").value = max;
    document.getElementById("imane-update-min").value = min;

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
