"use strict";
var Task = (function () {
    function Task(titulo, desc, dueTo) {
        this.titulo = titulo;
        this.desc = desc;
        this.dueTo = dueTo;
    }
    return Task;
}());
