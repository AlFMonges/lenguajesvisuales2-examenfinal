# 🎯 Trivia de Cultura General

Aplicación web interactiva de trivia desarrollada con React y Bootstrap, que permite a los usuarios responder preguntas de cultura general, acumular puntos y consultar el historial de todos los participantes.

## 📋 Descripción del Proyecto

- ✅ Preguntas aleatorias desde JSON
- ✅ Sistema de opciones múltiples
- ✅ Contador de aciertos en tiempo real
- ✅ Puntaje total al finalizar
- ✅ Historial completo de jugadores con filtros y búsqueda
- ✅ Interfaz responsiva y amigable

### Funcionalidades Principales

1. **Registro de Jugador**: Ingreso del nombre antes de comenzar
2. **Sistema de Preguntas**: 10 preguntas aleatorias por partida
3. **Feedback Inmediato**: Indicación visual de respuestas correctas/incorrectas
4. **Avance Automático**: Transición automática. Manejo de tiempos según el resultado
5. **Contador en Tiempo Real**: Visualización constante del puntaje
6. **Preguntas No Repetidas**: Sistema que evita preguntas duplicadas en reintentos
7. **Historial Persistente**: Registro de todos los intentos de cada jugador
8. **Sistema de Búsqueda**: Filtrado por nombre, puntaje máximo y puntaje por intento
9. **Destacado del Mejor**: Identificación visual del jugador con mayor puntaje

## 🛠️ Tecnologías Utilizadas

- **React**: Framework principal para la interfaz de usuario
- **Bootstrap**: Framework CSS para estilos responsivos
- **JSON Server**: Simulación de API REST
- **JavaScript**: Lenguaje de programación

## 📦 Requisitos Previos

Antes de ejecutar el proyecto, asegurearse de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** (se instala automáticamente con Node.js)

## 🚀 Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/AlFMonges/lenguajesvisuales2-examenfinal.git
cd trivia-cultura-general
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Estructura del proyecto

```
trivia-cultura-general/
├── public/
│   └── index.html
├── src/
│   ├── App.js              # Componente principal
│   ├── index.js            # Punto de entrada
│   └── index.css           # Estilos globales
├── db.json                 # Base de datos JSON (preguntas y jugadores)
├── package.json            # Dependencias del proyecto
└── README.md               # Este archivo
```

## ▶️ Ejecución

Para ejecutar la aplicación necesitas **dos terminales abiertas simultáneamente**:

### Terminal 1: Iniciar JSON Server (Puerto 3001)

```bash
npm run server
```

Esto iniciará el servidor JSON en `http://localhost:3001`

### Terminal 2: Iniciar la aplicación React (Puerto 3000)

```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

> **Nota**: Ambos servidores deben estar ejecutándose al mismo tiempo para que la aplicación funcione correctamente.

## 🎮 Uso de la Aplicación

### 1. Inicio
- Ingresa tu nombre en la pantalla de bienvenida
- Haz clic en "Comenzar Trivia"

### 2. Durante el Juego
- Lee cada pregunta cuidadosamente
- Selecciona una respuesta haciendo clic en ella
- Observa el feedback visual (verde = correcto, rojo = incorrecto)
- El contador de aciertos se actualiza automáticamente
- La aplicación avanza a la siguiente pregunta (1 segundo después si es correcta, 3 segundos después si es incorrecta)

### 3. Resultados
- Al finalizar, verás tu puntaje total
- Opciones disponibles:
  - **Intentar de Nuevo**: Juega con preguntas diferentes
  - **Ver Historial**: Consulta todos los registros

### 4. Historial
- **Búsqueda por nombre**: Filtra jugadores específicos
- **Filtro por puntaje máximo**: Muestra jugadores con puntaje máximo
- **Filtro por puntaje**: Muestra jugadores con un puntaje específico obtenido en cualquier intento
- **Identificación del mejor**: El jugador con mayor puntaje aparece destacado con una corona 👑

## 🧩 Componentes

### `PlayerInput`
Maneja el ingreso del nombre del jugador al inicio del juego.

### `Question`
Muestra cada pregunta con sus opciones y gestiona la selección de respuestas.

### `ScoreCounter`
Componente flotante que muestra el contador de aciertos en tiempo real.

### `Results`
Pantalla de resultados finales con el puntaje obtenido y opciones de navegación.

### `PlayerHistory`
Tabla completa con el historial de todos los jugadores, incluyendo filtros y búsqueda.

### `App`
Componente principal que orquesta el flujo de la aplicación y maneja el estado global.

## 🎨 Características de Diseño

- **Responsivo**: Adaptable a dispositivos móviles, tablets y escritorio
- **Bootstrap 5**: Uso de componentes como cards, buttons, tables y alerts
- **Feedback Visual**: Colores diferenciados para respuestas correctas e incorrectas
- **Animaciones Suaves**: Transiciones visuales para mejor experiencia de usuario
- **Accesibilidad**: Estructura semántica y contraste de colores adecuado


## 📱 Compatibilidad

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)
- Dispositivos móviles (iOS y Android)
