/* ********** Menu Movil Abajo********** */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

    /*empieza con 'hamburguesa' activada, sin "is-active"(no se ve el menu) y  'close amburguesa' desactivada */
  $btnMenu.addEventListener("click", (e) => {/* click sobre boton con "hamburguesa"/"close hamburguesa" */
    $btnMenu.firstElementChild.classList.toggle("none"); /*HAMBURGESA: pone class="none" -> esconde  HAMBURGUESA*/
    $btnMenu.lastElementChild.classList.toggle("none"); /*CLOSE HAMBURGUESA: quita el class="none" -> muestra CIERRE HAMBURGUESA */
    $menu.classList.toggle("is-active"); /* añade class "is-actvie" del NAV(menu) -> muestra MENU ABAJO */
    /* otra vez click sobre boton(CLOSE HAMBURGUESA) hace lo contrario: cierra menu y activa HAMBURGUESA */
  });

  d.addEventListener("click", (e) => { /*El document gestiona todos los clicks en todos los elementos*/
    if (!e.target.matches(".menu a")) return false; /* si el click no proviene del menu y de un enlace, descartalo */
    /* si el click viene de menu y una opción, cierra el menu, activa la hamburguesa y desactiva la 'close hamburguesa' */
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********** ContactForm: enviar el formulario a un email  ********** */
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none"); //muestra el loader
    fetch("https://formsubmit.co/ajax/roberto.alonso.gandia@gmail.com", {
      method: "POST",
      body: new FormData(e.target), //e.target es el formulario
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias"; // muestra el modal -> localhost/index.html#gracias
        $form.reset(); //limpia los campos del formulario tras enviarlo
      })
      .catch((err) => {
        //console.log('DENTRO DEL CATCH')
        console.log(err);
        //si no hay texto de error, lo pongo yo
        let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
       // console.log(message);
        // ponemos un mensaje de error en el modal de gracias
        $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        //ocultamos el loader tras enviar el formulario con éxito o con error
        $loader.classList.add("none");
        //tras 3 segundos, cierro el loader, ya sea con éxito o con error
        //id="close" no existe. Lo enviamos a un lugar que no existe
        setTimeout(() => {location.hash = "#close"; }, 3000);
      });
  });
})(document); //se autollama la función con el parámetro 'document' y lo recibo como 'd'
