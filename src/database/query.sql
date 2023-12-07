create database shackeshack;

use shackeshack;

create table hamburguesas(
    id int auto_increment primary key,
    nombre varchar(100) not null,
    descripcion varchar(200) not null,
    calorias varchar(40) not null,
    imagen varchar(400)
);

select * from hamburguesas;

create table usuarios(
    id int auto_increment primary key,
    nombre varchar(100) not null,
    apellidos varchar(300) not null,
    direccion varchar(40) not null,
    telefono varchar(400) not null,
    correo varchar(400) not null
);

select * from usuarios;