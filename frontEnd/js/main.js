document.addEventListener("DOMContentLoaded", () =>{

  const toogleBotton = document.querySelector(".navbar_toogle-btn");
  const mobileMenu = document.querySelector(".navbar_mobile-menu");

  const toogleMenu = () => {
      mobileMenu.style.display =
         mobileMenu.style.display === "none" || mobileMenu.style.display === ""
      ? "flex"
      : "none"
    };

    const hideMenuResize  = () =>
    {
      mobileMenu.style.display ="none"
    }
    toogleBotton.addEventListener("click", toogleMenu);
    window.addEventListener("resize", hideMenuResize);
    window.addEventListener("load", hideMenuResize)
 });


document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
      const instituteId = event.target.dataset.id;
      const confirmed = confirm('¿Estás seguro de eliminar este instituto?');
      if (confirmed) {
          // Send AJAX request to delete institute
          fetch(`http://localhost:3000/institucion/delete/${instituteId}`, { method: 'DELETE' })
              .then(response => {
                  if (response.ok) {
                      // Reload the page or update the table after successful deletion
                      location.reload(); // Reloads the page
                  } else {
                      alert('Error al eliminar el instituto.');
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
                  alert('Error al eliminar el instituto.');
              });
      }
  }
});