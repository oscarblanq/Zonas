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

	const express = require('express');
	var path = require('path');
	servidorExpress.use(express.static(path.join(__dirname, './frontend')));	
// .......................................................
//
// req: PeticionHTTP
// -->
//    f()
// -->
// V/F
//
// .......................................................

 	// .......................................................
	// .......................................................
	//
	// ACREDITACION DEL USUARIO (LOGIN)
	// GET /login?user=xxx&password=yyy
	//
	// (por que es así como envía de forma automática
	// los form de html con method=get, el method=post
	// pone user=xxx&password=yyy en el body)
	//
	// .......................................................
	// .......................................................
	servidorExpress.get('/login', (req, response) => {

		console.log( "\n --------------------------------------- ")
		console.log( " * GET /login      " + req.url )
		console.log( " --------------------------------------- ")

		//
		// si no se introduce nada en los campos usuario/contraseña
		// se le asigna 'undefined' como valor
		if(req.query.user == '') req.query.user = undefined ;
		var user = req.query.user ;

		if(req.query.password == '' ) req.query.password = undefined;
		var password = req.query.password ;

		if ( user == undefined || password == undefined){
			console.log("No se han rellenado todos los campos de inicio de sesión") ;
			response.status(400).send( "No se han rellenado todos los campos de inicio de sesión" ) ;
			response.end();
			return
		}

		console.log (`\t user = ${user}`) ;
		console.log (`\t password= ${password}`) ;

		var laSesion = req.session ;

		// 
		// ahora comprobamos usuario y password
		// 
		laLogica.comprobarLoginEnBD( user, password, ( err, datosUsuario ) => {

			if ( ! err ) {
				console.log (`\t sesion=  ${JSON.stringify(laSesion)} `)
				// 
				//  respuesta positiva
				// 
				console.log ("          ** LOGIN OK **")

				// 
				//  si login es correcto, hay que generar un
				// "token opaco" (codificado con una clave sólo
				//  conocida aquí) y ponerlo en las sesion (cookie)
				//  para que apartir de ahora nos lo vuelva a
				//  enviar en las futuras peticiones
				//  En ese token opaco hay que añadir el nombre
				//  del usuario acreditado, y su secreto compartido
				// 
				laSesion.elTokenOpaco = JSON.stringify(
					{
						autor: "jordi", // para hacer una comprobacion simple
						comentario: "Esto es un token opaco puesto en GET /login",
						user: user,
						password: hex_sha1(user+password),
						rol: datosUsuario.rol
					});

				// 
				// 
				// 


				// 
				// damos los  datos del usuario en JSON en el body
				// 
				response.status(200).send( [datosUsuario] ) ;

				response.end();

			} else {
				// ok == false
				console.log ("          ERROR EN LOGIN") ;
				console.log(err) ;

				// 
				// 
				// 
				response.status(401).send(err) // 401 unauthorized

			}
			
		}) // comprobarLoginEnBD 

	}) // GET /login

	// .......................................................
	// .......................................................
	//  GET /prueba
	// .......................................................
	// .......................................................
	servidorExpress.get('/prueba', (req, res) => {

		console.log( "\n --------------------------------------- ")
		console.log( " * GET /prueba " )
		console.log( `\t url=" ${req.url} `)
		console.log( " --------------------------------------- ")

		//
		//
		//
		var laSesion = req.session ;

		console.log ( `   usuario que me pide (antes acreditado) =  ${JSON.stringify(laSesion)}` ) ;
		
		/* si quisiera cambiar o añadir cosas a la sesion
		   laSesion.elTokenOpaco = "esto es un token opaco puesto en GET /prueba"
		   laSesion.elTokenOpaco = "esto es un token opaco puesto en GET /prueba"
		   laSesion.usuario = laSesion.usuario + "x"
		*/

		//
		//
		//
		//res.writeHead(200, {'Content-Type': 'text/plain'})
		
		res.status(200).send ( {Servidor: laSesion} )
		
		res.end()

	})

	// .......................................................
	// .......................................................
	//  GET /
	// como prueba por si alguien pregunta
	// .......................................................
	// .......................................................
	servidorExpress.get('/',   (req, res) => {

		console.log (" * GET /" )
		console.log (`\t url= ${req.url} `)

		//
		//
		//

	})

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

				response.status(404).send(err) ;
				response.end();
				return;
			}
			
			//
			// respuesta correcta
			//
			response.status(200).send(res) ;
			
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

				response.status(404).send(err) ;
				response.end();
				return;
			}
			
			//
			// respuesta correcta
			//
			
			/*response.writeHead(200, {'Content-Type': 'text/json'}) ;
			response.write ( JSON.stringify( res ) ) ;*/

			response.status(200).send({descripcion : res}) ;
			
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
				
				response.status(404).send(err) ;
				response.end();

				return;
			}
			
			//
			// respuesta correcta
			//
			
			response.status(200).send({Vértices: res}) ;
			
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
		console.log( ` * POST /zona :   ${req.url}`) ;
		console.log( " ------------------------------- " ) ;

		const nombreZona =  req.params.nombreZona ; 
		const descripcion = req.params.descripcion ;
		console.log( `\t nombreZona = ${nombreZona}` ) ;

		//
		// pregunto a la lógica
		//
		laLogica.nuevaZona( nombreZona, descripcion,  ( err, res ) => {

			if ( err ) {

				response.status(404).send(err) ;

				response.end();

				return;
			}
			
			//
			// respuesta correcta
			//
			response.status(200).send(res) ;
			
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
var hexcase=0;var b64pad="";function hex_sha1(a){return rstr2hex(rstr_sha1(str2rstr_utf8(a)))}function hex_hmac_sha1(a,b){return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(a),str2rstr_utf8(b)))}function sha1_vm_test(){return hex_sha1("abc").toLowerCase()=="a9993e364706816aba3e25717850c26c9cd0d89d"}function rstr_sha1(a){return binb2rstr(binb_sha1(rstr2binb(a),a.length*8))}function rstr_hmac_sha1(c,f){var e=rstr2binb(c);if(e.length>16){e=binb_sha1(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binb_sha1(a.concat(rstr2binb(f)),512+f.length*8);return binb2rstr(binb_sha1(d.concat(g),512+160))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binb(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(24-c%32)}return a}function binb2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(24-c%32))&255)}return a}function binb_sha1(v,o){v[o>>5]|=128<<(24-o%32);v[((o+64>>9)<<4)+15]=o;var y=Array(80);var u=1732584193;var s=-271733879;var r=-1732584194;var q=271733878;var p=-1009589776;for(var l=0;l<v.length;l+=16){var n=u;var m=s;var k=r;var h=q;var f=p;for(var g=0;g<80;g++){if(g<16){y[g]=v[l+g]}else{y[g]=bit_rol(y[g-3]^y[g-8]^y[g-14]^y[g-16],1)}var z=safe_add(safe_add(bit_rol(u,5),sha1_ft(g,s,r,q)),safe_add(safe_add(p,y[g]),sha1_kt(g)));p=q;q=r;r=bit_rol(s,30);s=u;u=z}u=safe_add(u,n);s=safe_add(s,m);r=safe_add(r,k);q=safe_add(q,h);p=safe_add(p,f)}return Array(u,s,r,q,p)}function sha1_ft(e,a,g,f){if(e<20){return(a&g)|((~a)&f)}if(e<40){return a^g^f}if(e<60){return(a&g)|(a&f)|(g&f)}return a^g^f}function sha1_kt(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};