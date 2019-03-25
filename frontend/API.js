var urlBase = "http://localhost:8080";
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//metodo que valida el email y password para dirigirse a la pagina del usuario que inicia sesion
function getLogin(){


    // cogemos los datos del formulario

    let email = document.getElementById('email').value

    let password = document.getElementById('password').value

    var url = urlBase + "/login?user=" + email + "&password=" + password;

    // hacemos la petición al API
    fetch(url).then((respuesta) => {

            if (respuesta.ok == false) {
              alert('Usuario o contraseña incorrectos') ;
              console.log("No es correcta la combinación")
              //guardamos la referencia a dónde queremos poner el mensaje de error en el formulario
              var error = document.getElementsByClassName("error")[0];
              //Metemos el mensaje de error dentro del div con la clase .error
              console.log(error);
              error.innerHTML = `<div class="alert alert-danger" role="alert">
              <strong>¡Vaya!</strong> Usuario y/o contraseña incorrecta.
              </div>`;
              error.style.visibility = 'visible';
              setTimeout(function(){
                //error.classList.add("hidden");
                error.style.visibility = 'hidden';
              }, 5000);

            } else if (respuesta.ok == true){
                // procesamos el JSON
                console.log(respuesta)
                respuesta.json().then((datos) => {
                    // colocamos las cookies
                    console.log("¡LOGIN OK!")
                    console.log(datos)

                      // Creamos la url de destino, la página de perfil con los datos del usuario en la url  
                      var urlDestino = `/login?user=${email}&password=${password}`;
                      //Dirigimos la aplicación al a pagína de perfil con la variable url antes declarada
                      window.open.href = urlDestino ;

                      var recuadro = document.getElementById("card") ;
                      recuadro.style.display = "none";

                      var titulo = document.getElementById("titulo")
                      titulo.innerHTML = `<h1>LOGIN OK!</h1> <button onclick="location.reload()">ATRÁS</button>`
                  
                })
            }
        })
}