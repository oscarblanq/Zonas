// ------------------------------------------------------
// 
// mainServidorREST.js 
// 
// ------------------------------------------------------

// .......................................................
// requires
// .......................................................

const express = require( 'express' ) ;

const bodyParser = require( 'body-parser' ) ;

const assert = require( 'assert' ) ;

const Logica = require( "../logica/Logica.js" ) ;


// .......................................................
// creación del servidor 
// .......................................................
var servidorExpress = express() ;

// .......................................................
// servidorExpress.use ( _ ) pone un "hook"
// 
// servidorExpress.use (bodyParser())
// Esto es para copiar lo que haya en el cuerpo
// de la peticion HTTP al cambo "body"  de "req"
// y que se pueda consultar luego.
//
// servidorExpress.use ( bodyParser.json() )
// .......................................................
// si siempre va a ser json mejor este body parser
servidorExpress.use ( bodyParser.text({ type: 'text/json'}) ) ;

// si no estamos seguros, mejor este
// servidorExpress.use ( bodyParser.text({ type: 'text/plain'}) )

// ··· PUERTO HTTP ···
const PUERTO = process.env.PORT || 8080 ;

// .......................................................
// esto es para capturar control-c
// y cerrar el servicio ordenadamente
// .......................................................
process.on('SIGINT', () =>{
	console.log (" Apagando servidor... ")
	servidorExpress.close ;
})

// ------------------------------------------------------
// ------------------------------------------------------
// "main()"
// ------------------------------------------------------
// ------------------------------------------------------

// 
// abro conexion a logica, cargo las reglas
// y luego arranco servidor
// 
laLogica = new Logica("../datos/Zonas.bd", ( err ) => {

        assert.ok( ! err, `Conexión a BD fallada: ${err}`) ;

		// 
		// cargo las reglas REST
		// 
		var reglas = require( './ReglasREST.js' ) ;

		reglas.cargar( servidorExpress, laLogica ) ;

		// 
		// arranco el servidor 
		// 
		servidorExpress.listen (PUERTO , () => {			
			console.log(`Servidor Express arrancado en http://localhost:${PUERTO}`) ;
		});

		
    }); // laLogica

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
