#!/usr/bin/env node
/**
 * Script para descargar imágenes de cartas de tarot.
 * Opcional: puedes usar imágenes de Rider-Waite (dominio público) o propias.
 * Por ahora solo crea la estructura de carpetas si no existe.
 */

const fs = require("fs");
const path = require("path");

const base = path.join(process.cwd(), "public", "cards");
const dirs = [
  path.join(base, "major"),
  path.join(base, "minor", "wands"),
  path.join(base, "minor", "cups"),
  path.join(base, "minor", "swords"),
  path.join(base, "minor", "pentacles"),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("Creado:", dir);
  }
});

console.log("Estructura de cartas lista. Añade archivos .webp en public/cards/ para las imágenes.");
