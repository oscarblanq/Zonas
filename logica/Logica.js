
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
	//    f () 
	// -->
	// Terminado // via callback()
	// 
	// .................................................................
	constructor( nombreBD, callback ) {
		this.laConexion = new ConexionBD( nombreBD, callback )
	}

	// .................................................................
	// .................................................................
	cerrar() {
		this.laConexion.cerrar()
	}

	// .................................................................
	//
	// datosZona: JSON {nombre: Texto, descripcion: Texto}
	// -->
	//    f () 
	// -->
	// void / Error // via callback( err )
	//
	// .................................................................
	nuevaZona( datosZona, callback ) {

		var textoSQL = 'insert into Zona values ( $nombre, $descripcion );'
		var datos = {
			$nombre: datosZona.nombre,
			$descripcion: datosZona.descripcion
		}
		
		this.laConexion.modificarConPrepared( textoSQL, datos, callback )
											  
	} // ()

	// .................................................................
	// 
	//    f()
	// -->
	// Terminado // via callbak()
	// 
	// .................................................................
	borrarTodosLosDatos( callback ) {
		var self = this

		//
		// borrar primero los que dependen de otros (foreign key)
		//
		this.laConexion.modificar( "delete from Vertice;", function () {
			self.laConexion.modificar( "delete from Zona;", function () {
				callback()
			})
		})
	} // ()

	// .................................................................
	//
	// nombreZona: texto
	// vertice: JSON {latitud: R, longitud: R}
	// -->
	//    f () 
	// -->
	// void / Error // via callback( err )
	//
	// .................................................................
	nuevoVerticeParaZona( nombreZona, vertice, callback ) {

		var textoSQL = 'insert into Vertice values ( $nombre, $longitud, $latitud );'
		var datos = {
			$nombre: nombreZona,
			$longitud: vertice.longitud,
			$latitud: vertice.latitud
		}
		
		this.laConexion.modificarConPrepared( textoSQL, datos, callback )
											  
	} // ()

	// .................................................................
	// .................................................................
	getZona( nombreZona, callback ) {
	} // ()

} // class

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
module.exports = Logica

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
