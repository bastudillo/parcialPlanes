function mostrarMaterias() {
    var codigo = document.getElementById("Codigo").value;

    if (codigo == false || /^\s+$/.test(codigo) || !/^([0-9])*$/.test(codigo)) {
        alert("Por favor introduzca un codigo numerico");
    } else {
        var opcionBuscar = document.getElementById("buscar");
        var infoGeneral = document.getElementById("infoGeneral");
        var infoEstudiante = document.getElementById("infoEstudiante");
        var codEst = document.getElementById("codEst");
        var planEstudios = document.getElementById("plan");
        infoGeneral.style.display = "block";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                CargarPlan(this.responseText);
                opcionBuscar.style.display = "none";
                infoGeneral.style.display = "none";
                infoEstudiante.style.display = "inherit";
                codEst.innerHTML = "" + codigo;
                planEstudios.style.display = "inherit";
            }
        };
        xhttp.open("GET", "materias.php?codigo=" + codigo, true);
        xhttp.send();
    }
}

function CargarPlan(materiaJson) {
    var todosSemestres = document.getElementById("cont_semestres");
    var semestre = document.getElementById("semestre");

    var materia = document.getElementById("materia");

    var plan = JSON.parse(materiaJson);

    var i = 0;
    for (var dato in plan) {
        var j = 0;
        var nuevoSemestre = semestre.cloneNode(true);
        nuevoSemestre.style.display = "block";
        var numSemest = nuevoSemestre.querySelector("#numSemestre");
        if (plan.hasOwnProperty(dato)) {
            numSemest.innerHTML = plan[dato].numero;
            for (var d in plan[dato].materias) {
                var nuevaMateria = materia.cloneNode(true);
                nuevaMateria.style.display = "block";

                var codigo = nuevaMateria.querySelector("#codMateria");
                var credito = nuevaMateria.querySelector("#credMateria");
                var nombre = nuevaMateria.querySelector("#nomMateria");
                if (plan.hasOwnProperty(d)) {
                    if (plan[dato].materias[d].estado == true) {
                        codigo.style.background = "grey";
                        codigo.style.textDecoration = "line-through";
                        credito.style.background = "grey";
                        credito.style.textDecoration = "line-through";
                        nombre.style.background = "grey";
                        nombre.style.textDecoration = "line-through";
                    }
                    codigo.innerHTML = plan[dato].materias[d].codigo;
                    credito.innerHTML = plan[dato].materias[d].creditos + "  &#11088";
                    nombre.innerHTML = plan[dato].materias[d].materia;
                    nombre.style.cursor = "pointer";
                    codigo.setAttribute("id", "fil"+i+"col"+j);
                    codigo.setAttribute("class", codigo.getAttribute("class") + " fil" + i + "col" + j);
                    credito.setAttribute("class", credito.getAttribute("class") + " fil" + i + "col" + j);
                    nombre.setAttribute("class", nombre.getAttribute("class") + " fil" + i + "col" + j);
                }
                nuevoSemestre.appendChild(nuevaMateria);
                j = j + 1;
            }
            todosSemestres.appendChild(nuevoSemestre);
        }
        i = i + 1;
    }
}

function cambiarEstado(idn) {
    var c = idn.classList[4]
    var codigo = document.getElementById("codEst").innerHTML;
    var nm = document.getElementById(c).innerHTML;
    var n = document.querySelectorAll("." + c);
    var estado;
    for (i = 0; i < n.length; i++) {
        var css = n[i].style;
        if(css.background=="grey")
        {
            estado=false;
            n[i].style.background = "#DCDCDC";
            n[i].style.textDecoration = "none";
            
        }
        else{
            n[i].style.background = "grey";
            n[i].style.textDecoration = "line-through";
            estado=true;
        }
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            escuchar();
        }
    };
    xhttp.open("POST", "materias2.php?codigo="+codigo+"&codMateria="+nm+"&estado="+estado, true);
    xhttp.send(); 
}

function volver() {
    location.reload(true);
}
function escuchar()
{
    var audio = new Audio('sonido/notificacion.mp3');
    audio.play();
}
