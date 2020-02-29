// TODA LA LOGICA

// File system
const fs = require('fs');

// Arreglo con las notas
let listadoPorHacer = [];

// Guarda en formato JSON
const guardarDB = () => {

    // JSON.stringify convierte un objeto en un JSON válido
    let data = JSON.stringify(listadoPorHacer);

    // Grabarlo en el filesystem
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        }
        // else {
        //     console.log(`nombreArchivo.txt guardado`);
        // }
    });

};

// Leer el archivo JSON y retornar el listado
const cargarDB = () => {

    // Verificar si data.JSON está vacio ono
    try {
        // Leer el archivo JSON, con require se detecta que es JSON y lo 
        // convierte en Objeto 
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        // Si se da el error, crear un objeto vacio
        listadoPorHacer = [];
    }

    // Mi solucion: retornar el arreglo con tareas
    return listadoPorHacer;

};



// Crear un doc
const crear = (descripcion) => {

    // Cargar la base de datos antes de hacer cualquier push y agrege
    cargarDB();

    let porHacer = {
        descripcion, // descripcion = descripcion --> se obvia con es6
        completado: false // Las tareas por defecto no estan terminadas
    };

    // Añadir al arreglo el objeto
    listadoPorHacer.push(porHacer);

    // Guardar despues del push porque listadoPorHacer tiene nuevo registro
    guardarDB();

    return porHacer; // Retornar el objeto por si se necesita
};


// Obtener el Listado del arreglo, por defecto null
const getListado = (completado) => {

    // Asignar el valor de la funcion cargaDB a una variable
    // let data = cargarDB();

    // Retornar el valor del arreglo
    // return data;

    // Otra solucion
    cargarDB();

    // Si el estado es true o fase se filtra sino se imprime todo
    if (completado === 'false' || completado === 'true') {

        // Usando funcion FILTER y ES6, toString() porque por consola
        // el false y true me reconoce como String y el false en el 
        // objeto es un boolean por eso lo transforme a String y comparar
        let completoListado = listadoPorHacer.filter(tarea =>
            tarea.completado.toString() === completado);
        console.log(completado, 'dentrodel if');
        return completoListado;

    } else {
        return listadoPorHacer;
    }

};


// Actualizar el registro en el DB las tareas como completadas (true)
const actualizar = (descripcion, completado = true) => {
    // Cargar la DB
    cargarDB();

    // finIndex encuentra el valor del indice
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    // Si la descripcion del return coincide devuelve la posicion, sino
    // devuelve -1
    if (index >= 0) {
        // Asignar el valor pasado por parametro
        listadoPorHacer[index].completado = completado;
        guardarDB(); // guardar en la DB
        return true; // Retornar verdadero se completó la tarea
    } else {
        return false; // No se completó la tarea
    }
};


// Borrar un registro -- MI SOLUCION
const borrar = (descripcion) => {

    cargarDB();

    // Usando funcion FILTER y ES6
    let nuevoListado = listadoPorHacer.filter(hacer =>
        hacer.descripcion !== descripcion);

    if (nuevoListado.length !== listadoPorHacer.length) {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    } else {
        console.log('Valor no encontrado');
        return false;
    }

};


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};