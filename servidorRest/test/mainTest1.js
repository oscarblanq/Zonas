
// --------------------------------------------------------
//
//
// --------------------------------------------------------

// --------------------------------------------------------
// --------------------------------------------------------
const assert = require ('assert')

const request = require ('request') 

// --------------------------------------------------------
// --------------------------------------------------------
const IP_PUERTO="http://localhost:8080"

// --------------------------------------------------------
// main ()
// --------------------------------------------------------

//
//
//
describe( "Test 1 (GET zona)", function() {

	// ....................................................
	//
	// ....................................................
	it( "pruebo GET /zona/marjal", function( hecho ){
		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/zona/marjal", 
				headers: {
					'User-Agent': 'jordi',
				},
			},
			// callback para cuando llegue respuesta
			function (err, response, body) {

				assert.equal( err, null, "¿error no vale null? " + err )
				assert.equal( response.statusCode, 200,
							  "¿respuesta no es 200?" )

				console.log (" ----- respuesta a GET /zona/marjal ---- ")
				// console.log ("       response = " + JSON.stringify(response))
				console.log ("       body = " + body)
				console.log (" -------------------------------- ")

				var datosZona = JSON.parse( body )

				assert.equal( datosZona.nombre, "marjal" )

				//
				//
				//
				hecho ()
			}
		) // post
		
	}) // it
}) // describe 

