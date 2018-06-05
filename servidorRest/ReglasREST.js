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
module.exports.cargar = ( servidorExpress, laLogica ) => {

	// .......................................................
	// .......................................................
	//
	// GET /zona/<nombreZona>
	// 
	// Ej.: GET /zona/marjal
	//
	// .......................................................
	// .......................................................
	servidorExpress.get('/zona/:nombreZona', ( req, response ) => {

		//
		// 
		//
		console.log( " ------------------------------- " ) ;
		console.log( ` * GET /zona :   ${req.url}`) ;
		console.log( " ------------------------------- " ) ;

		const nombreZona =  req.params.nombreZona ; 
		console.log( `\t nombreZona = ${nombreZona}` ) ;

		//
		// pregunto a la lógica
		//
		laLogica.getZona( nombreZona, ( err, res ) => {

			if ( err ) {
				response.writeHead( 404, {'Content-Type': 'text/plain'}) ;
				response.status(404)
				response.write ( err ) ;
				response.end();

				return;
			}
			
			//
			// respuesta correcta
			//
			
			response.writeHead(200, {'Content-Type': 'text/json'}) ;
			response.write ( JSON.stringify( res ) ) ;
			
			//
			// 
			//
			response.end()	;
		}); // getZona ()

	}); // app.get() GET ZONA

	// .......................................................
	// .......................................................
	//
	// GET /descripcion/<nombreZona>
	// 
	// Ej.: GET /descripcion/marjal
	//
	// .......................................................
	// .......................................................
	servidorExpress.get('/descripcion/:nombreZona', ( req, response ) => {

		//
		// 
		//
		console.log( " ------------------------------- " ) ;
		console.log( ` * GET /descripcion :   ${req.url}`) ;
		console.log( " ------------------------------- " ) ;

		const nombreZona =  req.params.nombreZona ; 
		console.log( `\t nombreZona = ${nombreZona}` ) ;

		//
		// pregunto a la lógica
		//
		laLogica.getDescripcionDeZona( nombreZona, ( err, res ) => {

			if ( err ) {
				response.writeHead( 404, {'Content-Type': 'text/plain'}) ;
				response.write ( err ) ;
				response.end();

				return;
			}
			
			//
			// respuesta correcta
			//
			
			response.writeHead(200, {'Content-Type': 'text/json'}) ;
			response.write ( JSON.stringify( res ) ) ;
			
			//
			// 
			//
			response.end()	;
		}); // getDescripcionDeZona ()

	}); // app.get() GET DESCRIPCION


	// .......................................................
	// .......................................................
	//
	// GET /vertices/<nombreZona>
	// 
	// Ej.: GET /vertices/marjal
	//
	// .......................................................
	// .......................................................
	servidorExpress.get('/vertices/:nombreZona', ( req, response ) => {

		//
		// 
		//
		console.log( " ------------------------------- " ) ;
		console.log( ` * GET /vertices :   ${req.url}`) ;
		console.log( " ------------------------------- " ) ;

		const nombreZona =  req.params.nombreZona ; 
		console.log( `\t nombreZona = ${nombreZona}` ) ;

		//
		// pregunto a la lógica
		//
		laLogica.getVertices( nombreZona, ( err, res ) => {

			if ( err ) {
				response.writeHead( 404, {'Content-Type': 'text/plain'}) ;
				response.write ( err ) ;
				response.end();

				return;
			}
			
			//
			// respuesta correcta
			//
			
			response.writeHead(200, {'Content-Type': 'text/json'}) ;
			response.write ( JSON.stringify( res ) ) ;
			
			//
			// 
			//
			response.end()	;
		}); // getVertices ()

	}); // app.get() GET VERTICES

	/**************************************************** 
	DUDAS: COMO PASARLE COMO PARÁMETROS EL NOMBRE DE LA ZONA
	Y LA DESCRIPCIÓN PARA LUEGO INSERTARLOS EN EL OBJETO 
	Datos = {}
	*****/
	// .......................................................
	// .......................................................
	//
	// POST /zona/<nombreZona>
	// 
	// Ej.: POST /zona/epsg
	//
	// .......................................................
	// .......................................................
	servidorExpress.post('/zona/:nombreZona/:descripcion', ( req, response ) => {

		//
		// 
		//
		console.log( " ------------------------------- " ) ;
		console.log( ` * POST /vertices :   ${req.url}`) ;
		console.log( " ------------------------------- " ) ;

		const nombreZona =  req.params.nombreZona ; 
		const descripcion = req.params.descripcion ;
		console.log( `\t nombreZona = ${nombreZona}` ) ;

		//
		// pregunto a la lógica
		//
		laLogica.nuevaZona( nombreZona, descripcion,  ( err, res ) => {

			if ( err ) {
				response.writeHead( 404, {'Content-Type': 'text/plain'}) ;
				response.write ( err ) ;
				response.end();

				return;
			}
			
			//
			// respuesta correcta
			//
			response.writeHead(200, {'Content-Type': 'text/json'}) ;
			response.write ( JSON.stringify( res ) ) ;
			
			//
			// 
			//
			response.end()	;
		}); // nuevaZona ()

	}); // app.post() POST ZONA
	

	// ------------------------------------------------------
	// ------------------------------------------------------
} // module.exports

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
