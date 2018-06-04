// ------------------------------------------------------
// 
// ReglasREST.js 
// 
// ------------------------------------------------------

// ------------------------------------------------------
// ------------------------------------------------------
// reglas de peticiones REST
// ------------------------------------------------------
// ------------------------------------------------------
module.exports.cargar = function( servidorExpress, laLogica ) {

	// .......................................................
	// .......................................................
	//
	// GET /zona/<nombreZona>
	// 
	// Ej.: GET /zona/marjal
	//
	// .......................................................
	// .......................................................
	servidorExpress.get('/zona/:nombreZona', function( req, response ){

		//
		// 
		//
		console.log( " ------------------------------- " )
		console.log( " * GET /zona :   " + req.url )
		console.log( " ------------------------------- " )

		const nombreZona =  req.params.nombreZona 
		console.log( "\t nombreZona = " + nombreZona )

		//
		// pregunto a la lógica
		//
		laLogica.getZona( nombreZona, function( err, res ) {

			if ( err ) {
				response.writeHead( 404, // not found
									{'Content-Type': 'text/plain'}) 
				response.write ( err )
				response.end()

				return
			}
			
			//
			// respuesta correcta
			//
			response.writeHead(200, {'Content-Type': 'text/json'})
			response.write ( JSON.stringify( res ) )
			
			//
			// 
			//
			response.end()
		}) // getZona ()

	}) // 

	// ------------------------------------------------------
	// ------------------------------------------------------
} // module.exports

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
