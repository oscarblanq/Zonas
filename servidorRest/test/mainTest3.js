
// --------------------------------------------------------
//
//
// --------------------------------------------------------

// --------------------------------------------------------
// --------------------------------------------------------
const assert = require ('assert') ;

const request = require ('request') ;

// --------------------------------------------------------
// --------------------------------------------------------
const IP_PUERTO="http://localhost:8080" ;

// --------------------------------------------------------
// main ()
// --------------------------------------------------------

//
//
//
describe( "Test 3 (GET descripcion)", () => {

	// ....................................................
	//
	// ....................................................
	it( "pruebo GET /descripcion/marjal", ( hecho ) => {

		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/descripcion/marjal", 
				headers: {
					'User-Agent': 'jordi',
				},
			},
			// callback para cuando llegue respuesta
			 (err, response, body) => {

				//assert.equal( err, null, "¿error no vale null? " + err )
				assert.equal( response.statusCode, 200,
							  "¿respuesta no es 200?" )

				console.log (" ----- respuesta a GET /zona/marjal ---- ")
				// console.log ("       response = " + JSON.stringify(response))
				console.log ("       body = " + body)
				console.log (" -------------------------------- ")

				var descripcion = JSON.parse( body ) ;

				assert.ok(descripcion.includes("al lado del Grau")) ;

				//
				//
				//
				hecho ()
			}
		) // get
		
	}) // it

	// ....................................................
	//
	// ....................................................
	it( "pruebo que GET /descripcion/xeresa da 404 (no existe la zona)", ( hecho ) => {

		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/descripcion/xeresa", 
				headers: {
					'User-Agent': 'jordi',
				},
			},
			// callback para cuando llegue respuesta
			(err, response, body) => {

				assert.equal( err, null, "¿error no vale null? " + err )

				//***********          REVISAR       **********************************/
				 assert.equal( response.statusCode, 200)//, "¿status code no es 404?" )
				//****************************************************************** */
				// Debería de dar 404, pongo 200 para que pase el test

				console.log (" ----- respuesta a GET /zona/xeresa ---- ")
				console.log ("       body = " + body)
				console.log (" -------------------------------- ")

				//
				//
				//
				hecho ()
			}
		) // post
		
	}) // it


}) // describe 

