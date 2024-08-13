const entradaTexto = document.querySelector(".entrada-texto");
const salidaTexto = document.querySelector(".salida-texto");
const seccionTexto1 = document.querySelector(".texto1");
const seccionTexto2 = document.querySelector(".texto2");
const btnCopiar = document.querySelector(".copiar");

const letrasInvalidas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú"];
const encriptacion = { 'a': 'ai', 'e': 'enter', 'i': 'imes', 'o': 'ober', 'u': 'ufat' };

function validar(textoValidar) {
    return ![...textoValidar].some(char => letrasInvalidas.includes(char));
}

function encriptar() {
    const texto = entradaTexto.value;
    if (!validar(texto)) {
        entradaTexto.value = "Texto invalido, verifique su texto.";
        setTimeout(() => {
            entradaTexto.value = "";
            entradaTexto.focus();
        }, 2000);
        return;
    }
    const salida = [...texto].map(char => encriptacion[char] || char).join('');
    entradaTexto.value = "";
    salidaTexto.value = salida;
    ocultar();
}

function desencriptar() {
    let texto = entradaTexto.value;
    if (!validar(texto)) {
        entradaTexto.value = "Texto invalido, verifique su texto.";
        setTimeout(() => {
            entradaTexto.value = "";
            entradaTexto.focus();
        }, 2000);
        return;
    }
    for (const [key, value] of Object.entries(encriptacion)) {
        texto = texto.split(value).join(key);
    }
    entradaTexto.value = "";
    salidaTexto.value = texto;
    ocultar();
}

function ocultar() {
    seccionTexto1.style.display = "none";
    seccionTexto2.style.display = "block";
    btnCopiar.style.display = "inline-block";
}

function copiar() {
    const texto = salidaTexto.value;
    navigator.clipboard.writeText(texto).then(() => {
        salidaTexto.value = "Texto copiado al portapapeles";
        setTimeout(() => {
            salidaTexto.value = "";
            salidaTexto.focus();
        }, 1000);
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
}


btnCopiar.addEventListener("click", copiar);