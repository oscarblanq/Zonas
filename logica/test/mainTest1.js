
// --------------------------------------------------------
//
//
// --------------------------------------------------------

// --------------------------------------------------------
// --------------------------------------------------------
const Logica = require( "../Logica.js" ) ;

var assert = require ('assert') ;

// --------------------------------------------------------
// main ()
// --------------------------------------------------------

//
//
//
describe( "Test 1 (probar a añadir zonas)", () => {

	// ....................................................
	//
	// ....................................................
	var laLogica = null ;

	// Esto nos asegurará que ocurra antes
	// que cualquier otra cosa
	before(  ( hecho ) => {

		laLogica = new Logica("../datos/database.db", ( err ) => {

				assert.equal( null, err, `conexión a BD fallada: ${err}`) ;

				hecho() ;

			});
	}); // before

	// ....................................................
	//
	// ....................................................
	it( "borro datos ", ( hecho ) => {

		laLogica.borrarTodosLosDatos( () => {

			hecho() ;

		});
		
	}); // it

	// ....................................................
	//
	// ....................................................
	it( "inserto zona miramar", ( hecho ) => {

			var nombreZona =  "miramar" ;
			var descripcion = "zona turística de playa" ;

		laLogica.nuevaZona( nombreZona, descripcion, (err) =>  {

			assert.ok( ! err, `Existe un error: ${err}` ) ;
			
		})
		hecho() ;
	}) // it

	// ....................................................
	//
	// ....................................................
	it( "inserto un vertice para miramar", ( hecho ) => {

			var longitud = 5 // X
			var latitud =  6// Y

		laLogica.nuevoVerticeParaZona( "miramar", longitud, latitud, ( err ) => {

			//assert.ok( ! err, `Existe un error:` ) ;
			hecho()
		})


		
	}) // it

	// ....................................................
	//
	// ....................................................
	it( "pruebo que getZona() con una zona existente", ( hecho ) => {

		// llamo a getZona() y compruebo que me devuelve
		// lo que antes he guardado

		laLogica.getZona ( "marjal", ( err, res) => {

			// no existe error
			assert.ok(!err) ;

			// compruebo que existe la zona "marjal"
			assert.ok(res) ;
			console.log(res) ;
		}) ;

		hecho() ;
		
	}); // it

	// ....................................................
	//
	// ....................................................
	it( "pruebo getZona() con una zona NO existente", ( hecho ) => {

		// llamo a getZona() y compruebo que me devuelve
		// el mensaje de error
		laLogica.getZona ( "zonaInventada", ( err, res) => {

			// no existe error
			assert.ok(!err) ;

			// compruebo que devuelve el mensaje de error	
			assert.equal(res, "Oups, no hay zonas con ese nombre.") ;
			
			assert.ok(res.includes("no hay")) ;

		}) ;

		hecho() ;
		
	}); // it

	// ....................................................
	//
	// ....................................................

	it("pruebo getVertices() con una zona existente", (hecho) => {

		// llamo a getVertice() y compruebo que me devuelve
		// los vértices de la zona marjal
		laLogica.getVertices("marjal", ( err, res ) => {

			// no existe error
			assert.ok(!err, `Error: ${err}`) ;

			// compruebo que devuelve un resultado
			assert.ok(res) ;

			var longitud = res[0].longitud ;

			var latitud = res[0].latitud ;

			console.log(`Vértices: ${longitud}, ${latitud}`) ;

			// compruebo que ese resultado que devuelve son los vértices
			assert.equal( longitud, 1 ) ;
			assert.equal( latitud, 0 ) ;
		
		});
		
		hecho();

		
	}); // it

	// ....................................................
	//
	// ....................................................
	
	it("pruebo getVertices() con una zona NO existente", (hecho) => {

		// llamo a getVertice() y compruebo que me devuelve
		// los vértices que le he guardado
		laLogica.getVertices("zonaInventada", ( err, res ) => {

			// no existe error
			assert.ok(!err, `Error: ${err}`) ;

			// compruebo que devuelve un resultado
			assert.ok(res) ;

			// compruebo que ese resultado que devuelve es el mensaje de error
			assert.equal( res, "Oups, no existen vértices para la zona indicada" ) ;

			assert.ok ( res.includes("no existen") ) ;

		});

		hecho();
		
		
	}); // it

	// ....................................................
	//
	// ....................................................

	it("pruebo getDescripcionDeZona() con una zona existente", (hecho) => {

		// llamo a getDescripcionDezona() y compruebo que me devuelve
		// la descripción de la zona marjal
		laLogica.getDescripcionDeZona("marjal", ( err, res ) => {

			// no existe error
			assert.ok(!err, `Error: ${err}`) ;

			// compruebo que devuelve un resultado
			assert.ok(res) ;

			// compruebo que ese resultado que devuelve es la descripción
			assert.equal( res, "marjal al lado del Grau de Gandia" ) ;

			assert.ok ( res.includes("al lado del Grau") ) ;

		});

		hecho();
		
		
	}); // it

		// ....................................................
	//
	// ....................................................

	it("pruebo getDescripcionDeZona() con una zona NO existente", (hecho) => {

		// llamo a getDescripcionDeZona() y compruebo que me devuelve
		// el mensaje de error
		laLogica.getDescripcionDeZona("zonaInventada", ( err, res ) => {

			// no existe error
			assert.ok(!err, `Error: ${err}`) ;

			// compruebo que devuelve un resultado
			assert.ok(res) ;

			// compruebo que ese resultado que devuelve es el mensaje de error
			assert.equal( res, "Oups, no hay zonas con ese nombre." ) ;

			assert.ok ( res.includes("Oups") ) ;

		});

		hecho();
		
		
	}); // it

	// ....................................................
	//
	// ....................................................
	after( () =>{
		laLogica.cerrar()
	})
	
}) // describe 

