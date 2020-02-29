// Optimizar
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    // default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};




const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion // es igual a descripcion = descripcion (la constante)
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra un registro seleccionado', {
        descripcion
    })
    .command('listar', 'Lista los registros en general y por completado', {
        completado
    })
    .help()
    .argv;

module.exports = {
    argv
};