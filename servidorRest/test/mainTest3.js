
// --------------------------------------------------------
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
describe( "Test 3 (GET zona)", () => {

	// ....................................................
	//
	// ....................................................
	it( "pruebo que GET /zona/xeresa da 404 (no existe la zona)", ( hecho ) => {
		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/zona/xeresa", 
				headers: {
					'User-Agent': 'jordi',
				},
			},
			// callback para cuando llegue respuesta
			 (err, response, body) => {

				assert.equal( err, null, "¿error no vale null? " + err )
				assert.equal( response.statusCode, 404)//, "¿status code no es 404?" )



				console.log (" ----- respuesta a GET /zona/xeresa ---- ")
				console.log ("       body = " + body)
				console.log (" -------------------------------- ")

				//
				//
				//

			}
		) // post
		hecho ()
	}) // it
}) // describe 

