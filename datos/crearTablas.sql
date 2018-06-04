
-- sqlite3 Zonas.bd (abrir sqlite con la BD llamada Zonas.bd)
-- .read crearTablas.sql (ejecutar el fichero .sql)
-- .tables (ver lista de tablas)
-- .schema (ver esquema de la BD)
-- .quit (dalir)
-- ejecutar .sql sin entrar: cat crearTablas.sql | sqlite3 Zonas.bd

-- borra las tablas
drop table  Zona;
drop table  Vertice;

-- crea la tabla Zona
create table Zona (
	nombre varchar(40) not null,
	descripcion varchar(100) not null,
	primary key (nombre)
	 );

-- crea la tabla Vertice
create table Vertice (
	nombreZona varchar(40) not null,
	longitud decimal(9,6) not null, --X
	latitud decimal(9,6) not null,-- Y
	foreign key (nombreZona) references Zona(nombre)
	 );

