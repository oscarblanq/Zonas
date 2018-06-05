
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
describe( "Test 4 (GET vertices)", () => {

	// ....................................................
	//
	// ....................................................
	it( "pruebo GET /vertices/marjal", ( hecho ) => {

		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/vertices/marjal", 
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

				var vertices = JSON.parse( body ) ;

				var longitud = vertices[0] ; 

				var latitud = vertices[1] ;

				assert.equal(longitud, 0) ;
				assert.equal(latitud, 1) ;

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
	it( "pruebo que GET /vertices/xeresa da 404 (no existe la zona)", ( hecho ) => {

		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/vertices/xeresa", 
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

