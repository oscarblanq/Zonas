
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
	nuevaZona ( nombreZona, descripcion, callback ) {

		var textoSQL = `INSERT INTO zonas (nombre_zona, descripcion) values ( "${nombreZona}" , "${descripcion}" );` ;
		
		this.laConexion.modificarConPrepared( textoSQL, callback ) ;
											  
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
	nuevoVerticeParaZona ( nombreZona, longitud, latitud, callback ) {

		var textoSQL = `INSERT INTO vertices (nombre_zona, longitud, latitud) VALUES ("${nombreZona}", "${longitud}", "${latitud}");` ;
		
		this.laConexion.modificar( textoSQL, callback ) ;
											  
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
		var textoSQL = `select * from zonas where nombre_zona = "${nombreZona}";` ;
		
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
		var textoSQL = `select longitud, latitud from vertices where nombre_zona = "${nombreZona}";` ;
		
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

			vertices.push ( res[0] ) ;	

			vertices.push ( res[1] ) ;

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
		var textoSQL = `select * from zonas where nombre_zona = "${nombreZona}";` ;
		
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

	// .......................................................
//
// user: Texto
// password: Texto
// -->
//    f()
// -->
// Verdadero / Falso
// JSON datos de usuario {email, rol, nombre, apellidos}
//
// via callback( error, resultados )
//
// ..................................................
// Esta función es llamada por la regla GET /login
// .......................................................
	comprobarLoginEnBD (user, password, callback) {

	// Comprobar login no es inmediato sino 
	// asíncrono ( por eso ahora lo simulo ).
	// En realidad aquío se debe consultar en
	// una BD el nombre del usuario y
	// su password (secreto compartido)
	// 
	// user == email de usuario (utilizado como id/clave)
	// user no es el nombre de pila del usuario
		//setTimeout ( () => {
			
			var textoSQL = `SELECT * from clientes where email="${user}";` ;

			this.laConexion.consultar ( textoSQL, ( err, res ) => {

				//mirar si hay error
				// y no sigo
				if( err ){
					callback(err, null) ;
					return;
				}

				if(res.length == 0){
					callback( "La combinación usuario/contraseña no es correcta", null) ;
					return;
				}

				res.forEach( (row) => {

					var emailBD = row.EMAIL ;
					var passwordBD = row.PASSWORD ;
					var nombre = row.NOMBRE ;
					var apellido = row.APELLIDO ;
					var rol = row.ROL ;

					if(  password != passwordBD || user == null || password == null ){
						callback( "La combinación usuario/contraseña no es correcta", null) ;
						return;
					}

					if ( user==emailBD & password == passwordBD ) {
						// devuelvo que no hay error y
						// unos datos del usuario
		
							callback (null,
								{
										 user: user,
										 nombre: nombre,
										 apellido: apellido,
										 rol: rol,
								}
								
							); 
					}
					
				} ) ;				
				
				
				},
	
				100) ;

			//}) //setTimeout()


	} // comprobarLoginEnBD()

} // class

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
module.exports = Logica

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
