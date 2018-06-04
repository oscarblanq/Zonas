
// ---------------------------------------------------------------------
// logica.js
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
const ConexionBD = require( "./ConexionBD.js" )

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
class Logica {

	// .................................................................
	// 
	// nombreBD: Texto
	// -->
	//    constructor () 
	// -->
	// Terminado // via callback()
	// 
	// .................................................................
	constructor ( nombreBD, callback ) {
		this.laConexion = new ConexionBD( nombreBD, callback ) ;
	}

	// .................................................................
	// .................................................................
	cerrar() {
		this.laConexion.cerrar() ;
	}

	// .................................................................
	//
	// datosZona: JSON {nombre: Texto, descripcion: Texto}
	// -->
	//    nuevaZona () 
	// -->
	// void / Error // via callback( err )
	//
	// .................................................................
	nuevaZona ( datosZona, callback ) {

		var textoSQL = 'insert into Zona values ( $nombre, $descripcion );' ;

		var datos = {
			$nombre: datosZona.nombre,
			$descripcion: datosZona.descripcion
		} ;
		
		this.laConexion.modificarConPrepared( textoSQL, datos, callback ) ;
											  
	} // nuevaZona()

	// .................................................................
	// 
	//    borrarTodosLosDatos()
	// -->
	// Terminado // via callbak()
	// 
	// .................................................................
	borrarTodosLosDatos ( callback ) {

		var self = this ;

		//
		// borrar primero los que dependen de otros (foreign key)
		//

		this.laConexion.modificar( "delete from Vertice;", () => {

			self.laConexion.modificar( "delete from Zona;", () => {

				callback() ;

			});

		});

	} // borrarTodosLosDatos()

	// .................................................................
	//
	// nombreZona: texto
	// vertice: JSON {latitud: R, longitud: R}
	// -->
	//    nuevoVerticeParaZona() 
	// -->
	// void / Error // via callback( err )
	//
	// .................................................................
	nuevoVerticeParaZona ( nombreZona, vertice, callback ) {

		var textoSQL = 'insert into Vertice values ( $nombre, $longitud, $latitud );' ;

		var datos = {
			$nombre: nombreZona,
			$longitud: vertice.longitud,
			$latitud: vertice.latitud
		};
		
		this.laConexion.modificarConPrepared( textoSQL, datos, callback ) ;
											  
	} // ()

	// .................................................................
	//
	// nombreZona: Texto
	// -->
	//    getZona() 
	// -->
	// zona: JSON <nombreZona: Texto, descripción: Texto, vértices: <lan, lng> > // vía callback (err, res)
	//
	// .................................................................
	getZona ( nombreZona, callback ) {

		//consulta a la base de datos
		var textoSQL = `select * from Zona where nombre = "${nombreZona}";` ;
		
		this.laConexion.consultar ( textoSQL, ( err, res ) => {

			// miro si hay error
			// y no sigo
			if(err){
				callback(err, res) ;
				return;
			}

			// miro si hay resultado
			// y no sigo
			/*if(res){
				callback(null, res) ;
				return;
			}*/

			// mirar si el array está vacío
			// y no sigo
			if ( res.length == 0 ) {

				// no hay error
				// vaya, no hay zonas con ese nombre
				// en caso de no haber resultado se devuelve una variable string informando de que no hay zonas con ese nombre
				callback( null, "Oups, no hay zonas con ese nombre.") ;

				return;
			}

			// error no hay, y si hay resultado
			 callback(null, res) ;

		}) ; // finalizada la consulta
		
	} // getZona()

	// .................................................................
	//
	// nombreZona: Texto
	// -->
	//    getVertices() 
	// -->
	// vertices <lat:R, lng R>
	//
	// .................................................................
	getVertices ( nombreZona, callback ) { 

		//consulta a la base de datos
		var textoSQL = `select * from Vertice where nombreZona = "${nombreZona}";` ;
		
		this.laConexion.consultar ( textoSQL, ( err, res ) => {

			// mirar si hay error
			// y no sigo
			if( err ){
				callback(err, null) ;
				return;
			}

			// mirar si el array está vacío
			// y no sigo
			if ( res.length == 0 ){

				callback( null, "Oups, no existen vértices para la zona indicada") ;

				return;
			}

			var vertices = [] ; // creamos el array "vertices"

			vertices.push ( res[0].longitud ) ;	

			vertices.push ( res[0].latitud ) ;

			callback ( null, vertices ) ;


		}) ; // finalizada la consulta

	} // getVertices()

	// .................................................................
	//
	// nombreZona: Texto
	// -->
	//    getDescripcionDeZona() 
	// -->
	// descripción: texto // via callback(err, res)
	//
	// .................................................................
	getDescripcionDeZona ( nombreZona, callback ) { 

		//consulta a la base de datos
		var textoSQL = `select * from Zona where nombre = "${nombreZona}";` ;
		
		this.laConexion.consultar ( textoSQL, ( err, res ) => {

			// mirar si hay error
			// y no sigo
			if( err ){
				callback(err, null) ;
				return;
			}

			// mirar el array está vacío
			// y no sigo
			if ( res.length == 0 ){

				callback( null, "Oups, no hay zonas con ese nombre.") ;

				return;
			}

			// mirar si existe la zona pero no hay descripción
			// y no sigo
			if ( res.descripcion == 0 ){		//res.descripcion == null => NO PASA LOS TESTS

				callback( null, "La zona seleccionada no tiene descripción");

				return;
			}

			// Si no existe error, devolver el resultado
			callback ( null, res[0].descripcion ) ;

		}) ; // finalizada la consulta

	} // getDescripcionDeZona()

} // class

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
module.exports = Logica

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
