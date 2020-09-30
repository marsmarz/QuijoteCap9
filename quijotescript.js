$(document).ready(function(){
    $("#gameover").hide();
    $("#nombre2").hide();
    $("#restart").hide();
    $("#explicacion").hide();
    var qAutor = [["autor mozárabe del Barroco", "un moro con quien se encuentra don Quijote", "filósofo árabe", "autor ficticio de Don Quijote"],[4],["¿Quién es Cide Hamete Benengeli?"]];
    var qRelacion = [["poder", "desprecio", "falta de comunicación", "hostilidad"],[2],["¿Cuál de estos tipos de relaciones no aparece en el capítulo?"]];
    var qPedir = [["un yelmo", "comida", "mandar un mensaje", "una espada"], [3], ["¿Qué pide don Quijote al ganar la batalla?"]];
    var qValores = [["equidad", "paz", "valentía", "humildad"], [3], ["¿Cuál de estos valores se ve más en el capítulo?"]]
    var qMeta = [["intertextualidad", "literatura autoconsciente", "dualidad del ser", "proceso creativo"],[2],["¿El uso de un libro en un libro y la reflexión sobre la literatura son ejemplos de qué?"]]
    var qDulcinea = [["salar puercos","recolectar trigo", "lavar ropa","criar hijos"],[1],["¿Qué se dice que hace Dulcinea en este capítulo?"]]
    var qVerdad = [["es un libro viejo", "no tiene evidencia histórica", "es de autor arábigo", "no está escrito en castellano"], [3], ["¿Por cuál razón el narrador dice que se podría cuestionar la autenticidad del cuento?"]];
    var qLista = [qAutor, qRelacion, qPedir, qValores, qMeta, qDulcinea, qVerdad];
    var puntos = 0;
    var numeroDePregunta = 1;
    var currentlyChanging = false;
    var inPlay = false;

    function play(id){
        id = "#" + id;
        var num = "" + id.charAt(id.length - 1);
        var q = qLista[numeroDePregunta-1];
        var respuesta = q[1][0];
        if(num == respuesta){
            puntos++;
            $(id).css("background-color", "lime");
            $("#puntos").text("Contestaciones Correctas: " + puntos);
        }
        else {
            var correcto = "#r" + respuesta;
            $(correcto).css("background-color", "lime");
            $(id).css("background-color", "red");
        }
        setTimeout(fade, 1000);
        setTimeout(fade, 1000);
        numeroDePregunta++;
        setTimeout(changeQ, 2000);

    }
    function nada(){}
    function fade(){$("#juego").fadeOut();}
    function changeQ(){
        if(numeroDePregunta <= qLista.length){
            var Q = qLista[numeroDePregunta-1];
            $("#pregunta").text(Q[2][0]);
            for(var i = 1; i <= 4; i++){
                var pregunta = "#r"+ i;
                $(pregunta).text(Q[0][i-1]);
                $(pregunta).css("background-color", "lightblue");
            }
            $("#juego").fadeIn();
            inPlay = false;
        }
        else{
            fade();
            $("#gameover").fadeIn();
            if(puntos == 1){
                $("#gameover").text("¡Se acabó! ¡Escogiste " + puntos + " respuesta correcta!");
            }
            else{
                $("#gameover").text("¡Se acabó! ¡Escogiste " + puntos + " respuestas correctas!");
            }
            $("#nombre2").fadeIn();
            $("#restart").fadeIn();
            $("#explicacion").fadeIn()
        }
    }

    $("#juego").hide();
    var pressed = false;
    $(document).on("click", function(){
        if(!pressed){
            numeroDePregunta = 1;
            puntos = 0;
            pressed = true;
            $("#main").hide();
            changeQ();
        }
    });
    $("#restart").on("click", function(){
        numeroDePregunta = 1;
        puntos = 0;
        pressed = true;
        $("#restart").hide();
        $("#gameover").hide();
        $("#nombre2").hide();
        $("#explicacion").hide();
        $("#puntos").text("Contestaciones Correctas: " + puntos);
        changeQ();
    });
    $(".respuesta").on("click", function(){
        if(pressed && !inPlay){
            inPlay = true;
            var clicked = this.id;
            play(clicked);
        }
    });
});