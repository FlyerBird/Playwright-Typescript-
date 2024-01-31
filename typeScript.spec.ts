let edad: number = 25 // Variable "edad" de tipo number
let altura: number = 185.5 // Variable "altura" de tipo number 

//Opciones numéricas
let suma: number = edad +10;
let promedio: number = (edad + altura) / 2;

let primerNombre: string = "Juan" // Variable "primerNombre" de tipo string
let apellido: string = 'Lopez'; // Se pueden usar comillas simple

let nombreCompleto: string = primerNombre + " " + apellido; // Concatenación de cadenas


let estaActivo: boolean = true; // Variable "estaActivo" de tipo boolean
let estaLogueado: boolean = false; // Variable "estaLogueado" de tipo boolean

//Condicionales
if (estaActivo) {
    console.log("El usuario esá activo");
} else {
    console.log("El usuario no esá activo");
}

let numeros: number[] = [1, 2, 3, 4, 5]; //Array de números
let frutas: string[] = ["apple", "banana", "orange"]; //Array de palabras

console.log(numeros[2]); //Acceso al tercer elemento (ínidce 2)
console.log(frutas.length); //Logitud array 

let persona: [string, number] = ["Alice", 30]; //Tupla de nombre y edad
let coordenadas: [number, number] = [45.6, -73.8]; //Tupla de coordenadas

console.log(persona[0]); //Acceso nombre
console.log(coordenadas[1]); //Acceso array coordenadas

enum Color {
    Rojo,
    Verde,
    Azul
}

let colorElegido: Color = Color.Verde;

if (colorElegido === Color.Verde) {
    console.log("El color elejido es verde")
}



class Persona {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    mostrarDetalles() {
        console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}`);
    }

}

//Una simple función

function restar(a:number, b: number): number {
    return a-b;
}

