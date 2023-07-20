// Definir objeto 'candidato'
class candidato {
  constructor(nombre, votos) {
    this.nombre = nombre.toUpperCase();
    this.votos = votos;
  }
  porcentaje() {
    this.votosP = parseFloat(((this.votos * 100) / nVotantes).toFixed(2));
    console.log(`${this.nombre} ${this.votosP}%`);
  }
}

// ---FUNCIONES---

// Formulario visible para nCandidatos
function nCandidatosClick(nCandidatos) {
  console.log(`Numero de candidatos: ${nCandidatos}`);
  formulario.className = "visible";

  for (let i = 0; i < datosCandidatos.length; i++) {
    i < nCandidatos
      ? (datosCandidatos[i].classList.remove("oculto"),
        datosCandidatos[i]
          .querySelector("input[type='text']")
          .setAttribute("required", true),
        datosCandidatos[i]
          .querySelector("input[type='number']")
          .setAttribute("required", true))
      : (datosCandidatos[i].classList.add("oculto"),
        datosCandidatos[i]
          .querySelector("input[type='text']")
          .removeAttribute("required"),
        datosCandidatos[i]
          .querySelector("input[type='number']")
          .removeAttribute("required"));
  }
}

// Solicitar al usuario nombre y número de votos de cada candidato

// Balotaje
function balotaje(candidatoA, candidatoB) {
  nVotantes = candidatoA.votos + candidatoB.votos;
  console.log(`Votantes Balotaje = ${nVotantes}`);
  candidatoA.porcentaje();
  candidatoB.porcentaje();
  console.log(
    `${candidatoA.nombre} ${candidatoA.votosP}%, ${candidatoB.nombre} ${candidatoB.votosP}%`
  );
  document.getElementById("containerResultadoBalotaje").className = "visible";
  mensajeVotantesBalotaje.innerText = `Votantes: ${nVotantes}`;
  mensajeVotantesBalotaje.classList.remove("oculto");

  resultadoBalotaje.classList.remove("oculto");

  switch (true) {
    case candidatoA.votos > candidatoB.votos:
      mensajeResultadoBalotaje.innerHTML = `<strong>${candidatoA.nombre} ha ganado la elección </strong> con el ${candidatoA.votosP}% de los votos`;

      localStorage.setItem("ganador", candidatoA.nombre);
      break;

    case candidatoB.votos > candidatoA.votos:
      mensajeResultadoBalotaje.innerHTML = `<strong>${candidatoB.nombre} ha ganado la elección </strong>con el ${candidatoB.votosP}% de los votos`;

      localStorage.setItem("ganador", candidatoB.nombre);
      break;

    default:
      mensajeResultadoBalotaje.innerHTML = `El resultado ha sido<strong> EMPATE</strong> entre ${candidatoA.nombre} y ${candidatoB.nombre}`;

      localStorage.setItem("ganador", "Empate");
      break;
  }
}

// Funciones storage para historial
function mostrarFecha() {
  let recuperarFecha = localStorage.getItem("fecha");
  let fechaHistorial = document.createElement("h4");
  fechaHistorial.className = "fechaHistorial";
  fechaHistorial.innerText = recuperarFecha;
  containerHistorial.appendChild(fechaHistorial);
}

function mostrarGanador() {
  if (localStorage.getItem("ganador") != null) {
    let ganador = localStorage.getItem("ganador");

    let ganadorHistorial = document.createElement("p");
    ganadorHistorial.className = "ganadorHistorial";
    ganadorHistorial.textContent = `Ganador: ${ganador}`;
    if (localStorage.getItem("balotaje") != null) {
      let historialBalotaje = localStorage.getItem("balotaje");
      ganadorHistorial.textContent += ` ${historialBalotaje}`;
    } else {
      ganadorHistorial.textContent += " en primera ronda";
    }
    containerHistorial.append(ganadorHistorial);
    containerHistorial.innerHTML += "<br>";
  }
}

const mostrarCandidatos = (lista) => {
  lista.forEach((candidato) => {
    let item = document.createElement("li");
    item.textContent = `${candidato.nombre}: ${candidato.votos} votos`;
    listaHistorial.appendChild(item);
    containerHistorial.appendChild(listaHistorial);
  });
};

function recuperarDeLocal() {
  if (localStorage.getItem("candidatos") !== null) {
    historialVacio.className = "oculto";
    mostrarFecha();

    candidatos = JSON.parse(localStorage.getItem("candidatos"));

    listaHistorial = document.createElement("ol");
    listaHistorial.className = "listaHistorial";
    mostrarCandidatos(candidatos);
    mostrarGanador();
  } else {
    historialVacio.className = "visible";
  }
}

// ---VARIABLES---

let nCandidatos = 0;
let nVotantes = 0;
let nVotantesBalotaje = 0;
let segundoVotos = 0;
let primero;
let segundo;

// Definir array de objetos "candidatos"
const listaCandidatos = [];

// TRAER ELEMENTOS HTML
const botones = document.getElementsByClassName("button");
let todoOculto = document.getElementById("todoOculto");
let formulario = document.getElementById("formularioCandidatos");
let datosCandidatos = document.getElementsByClassName("datosCandidatos");
let label = document.querySelector(".label");
let botonVotar = document.getElementById("botonVotar");
let mensajeResultado = document.getElementById("mensajeResultadoA");
let resultado = document.getElementById("resultadoA");
let mensajeVotantes = document.getElementById("nVotantes");
let formularioBalotaje = document.getElementById("formularioBalotaje");
let labelBalotaje0 = formularioBalotaje.querySelector(
  'label[for="votosCandidato0"]'
);
let labelBalotaje1 = formularioBalotaje.querySelector(
  'label[for="votosCandidato1"]'
);
let botonVotarBalotaje = document.getElementById("botonVotarBalotaje");
let mensajeVotantesBalotaje = document.getElementById("nVotantesBalotaje");
let resultadoBalotaje = document.getElementById("resultadoBalotaje");
let mensajeResultadoBalotaje = document.getElementById(
  "mensajeResultadoBalotaje"
);
let historialBoton = document.getElementById("historialBoton");
let historialBotonBorrar = document.getElementById("historialBotonBorrar");
let containerHistorial = document.getElementById("containerHistorial");
let registroVotaciones = document.getElementById("registroVotaciones");
const historialVacio = document.getElementById("historialVacio");

// --------EJECUCIÓN--------

// Definir cantidad de candidatos (máximo 5) y hacer formulario visible
for (let i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function () {
    botonVotar.disabled = false;
    botonVotarBalotaje.disabled = false;
    nCandidatos = i + 2;
    listaCandidatos.length = nCandidatos;
    nCandidatosClick(nCandidatos);

    formulario.reset();
    formularioBalotaje.reset();
    todoOculto.className = "oculto";
  });
}

// ENVIO FORMULARIO

// Generar array de candidatos a partir del formulario

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  todoOculto.className = "visible";
  botonVotar.disabled = "true";

  for (i = 0; i < nCandidatos; i++) {
    let name = datosCandidatos[i].querySelector("input[type='text']").value;
    let votes = parseInt(
      datosCandidatos[i].querySelector("input[type='number']").value
    );
    listaCandidatos[i] = new candidato(name, votes);
    console.log(listaCandidatos[i]);
  }

  // REGISTRAR FECHA Y HORA

  let fecha = new Date();
  fecha = fecha.toLocaleString();
  localStorage.setItem("fecha", fecha);

  // CONVERTIR CANDIDATOS A JSON y GUARDAR EN LOCAL
  const listaCandidatosJSON = JSON.stringify(listaCandidatos);
  localStorage.setItem("candidatos", listaCandidatosJSON);

  // Contar votos totales y guardar en local
  nVotantes = listaCandidatos.reduce(
    (total, candidato) => total + candidato.votos,
    0
  );

  localStorage.setItem("votantes", nVotantes);

  // --- SI SON 2 CANDIDATOS ---
  if (nCandidatos === 2) {
    document.getElementById("primeraRonda").className = "oculto";
    formularioBalotaje.className = "oculto";
    balotaje(listaCandidatos[0], listaCandidatos[1]);

    if (localStorage.getItem("balotaje") != null) {
      localStorage.removeItem("balotaje");
    }
    recuperarDeLocal();
  }

  // --- SI SON >= 3 CANDIDATOS ---
  else {
    // Calcular % de cada uno
    document.getElementById("primeraRonda").className = "visible";
    mensajeVotantes.classList.remove("oculto");
    mensajeVotantes.innerText = `Votantes: ${nVotantes}`;
    for (const candidato of listaCandidatos) {
      candidato.porcentaje();
    }

    // Reordenar array de más a menos votos
    listaCandidatos.sort((a, b) => b.votos - a.votos);

    //Máximo % de votos obtenido
    primero = listaCandidatos[0];
    segundo = listaCandidatos[1];

    console.log("primero: " + primero.nombre);
    console.log("segundo: " + segundo.nombre);

    resultado.classList.remove("oculto");

    //Determinar ganador o balotaje
    switch (true) {
      // SI >45% --> GANADOR
      case primero.votosP > 45 && primero.votosP > segundo.votosP:
        mensajeResultado.innerHTML = `<strong>${primero.nombre} ha ganado la elección</strong> con el ${primero.votosP}% de los votos, sin necesidad de balotaje`;
        localStorage.setItem("ganador", primero.nombre);
        if (localStorage.getItem("balotaje") != null) {
          localStorage.removeItem("balotaje");
        }
        recuperarDeLocal();
        break;

      // else if SI >=40% con >10% de diferencia con el segundo --> GANADOR
      case primero.votosP >= 40 && primero.votosP - segundo.votosP > 10:
        mensajeResultado.innerHTML = `<strong>${
          primero.nombre
        } ha ganado la elección</strong> con el ${
          primero.votosP
        }% de los votos y una diferencia de ${
          primero.votosP - segundo.votosP
        }% con ${segundo.nombre}, sin necesidad de balotaje`;
        localStorage.setItem("ganador", segundo.nombre);
        if (localStorage.getItem("balotaje") != null) {
          localStorage.removeItem("balotaje");
        }
        recuperarDeLocal();
        break;

      // else --> BALOTAJE
      default:
        mensajeResultado.innerHTML = `<strong>Se procederá a balotaje entre ${primero.nombre} (${primero.votosP}%) y ${segundo.nombre} (${segundo.votosP}%)`;
        localStorage.setItem("balotaje", "por Balotaje");
        document.getElementById("containerResultadoBalotaje").className =
          "oculto";
        formularioBalotaje.classList.remove("oculto");
        labelBalotaje0.innerText = `${primero.nombre}`;
        labelBalotaje1.innerText = `${segundo.nombre}`;
        formularioBalotaje.addEventListener("submit", (e) => {
          e.preventDefault();
          botonVotarBalotaje.disabled = true;

          primero.votos = parseInt(
            formularioBalotaje.querySelector(
              "input[type='number'][id='votosCandidato0']"
            ).value
          );
          console.log(`BALOTAJE ${primero.nombre} ${primero.votos}`);

          segundo.votos = parseInt(
            formularioBalotaje.querySelector(
              "input[type='number'][id='votosCandidato1']"
            ).value
          );
          console.log(`BALOTAJE ${segundo.nombre} ${segundo.votos}`);

          balotaje(primero, segundo);
          recuperarDeLocal();
        });
        break;
    }
  }
});

//FIJARSE COMO MODIFICAR EL HISOTRIAL CUANDO REALIZO UNA BUSQUEDA SIN SALIR DE LA PESTAÑA

historialBoton.onclick = () => {
  let listaHistorial = document.querySelector(".listaHistorial");
  containerHistorial.classList.toggle("oculto");
  if (!listaHistorial) {
    recuperarDeLocal();
  }
};

historialBotonBorrar.onclick = () => {
  localStorage.clear();
  historialVacio.className = "visible";

  let fechaHistorial = document.querySelectorAll(".fechaHistorial");
  if (fechaHistorial) {
    fechaHistorial.forEach((fecha) => {
      fecha.remove();
    });
  }

  let listaHistorial = document.querySelectorAll(".listaHistorial");
  if (listaHistorial) {
    listaHistorial.forEach((lista) => {
      lista.remove();
    });
  }

  let ganadorHistorial = document.querySelectorAll(".ganadorHistorial");
  if (ganadorHistorial) {
    ganadorHistorial.forEach((ganador) => {
      ganador.remove();
    });
  }
};
