# Sprint 8 IT Academy | Angular

## 📄 Descripción

Práctica donde el objetivo principal era hacer una App utilizando los plugins mas importantes y esenciales: 

- CRUD básico
- MAPS
- Full Calendar
- Charts.

## 📋 Requisitos

- Npm instalado en tu sistema.
- Node instalado en tu sistema.
- ANGULAR CLI instalado en tu sistema.
- Visual Studio Code (Recomendado)
- MySQL Workbench (Recomendado)

## 🛠️ Instalación

1️⃣ Clona este repositorio
```bash
$ git clone https://github.com/IT-ACADEMY-Angular/raul-sprint8-inprocode-app.git
```

2️⃣ Unlink el repositorio para no modificar mi trabajo.

```bash
$ git remote rm origin
```

3️⃣ Abrimos MySQL Workbench, este paso es importante, porque al iniciar el servidor, la base de datos y tablas se crearán automáticamente.

4️⃣ En el archivo dentro de la carpeta server/src/db/connection.ts está la configuración para conectarse a la base de datos de tu localhost, en mi caso tengo puesto que la base de datos se llama = "almacen", usuario = "root" password = "root". Debes configurar tu (user y password) según tus credenciales en Workbench. Si ya tienes root/root en Workbench, perfecto!

5️⃣ Instala las dependencias con npm (tanto el front como el back). Primero instalamos y iniciamos el Backend:

🟢 Con el proyecto clonado en Visual, entramos en una terminal, entramos en la carpeta de -> server <- (IMPORTANTE!! La instalacion de dependencias de back y front, tiene que ser en sus respectivas carpetas!) y hacemos el comando:

```bash
$ npm run setup --force
```

🟢 Una vez instaladas, en la misma terminal, iniciamos el servidor backend utilizando los comandos:

```bash
$ npx tsc --watch
```

🟢 Siguiente comando, en otra terminal nueva (sin cerrar la otra!), vuelve a entrar en la carpeta de -> server <- y pones el siguiente comando:

```bash
$ npx nodemon dist/index.js
```

7️⃣ Ahora vamos a instalar y iniciar el FrontEnd . En otra terminal, entramos en la carpeta de -> frontend <- y hacemos el comando (IMPORTANTE usa --force):

```bash
$ npm install --force
```

🟢 Inicializar el servidor FrontEnd para ver la web, desde terminal en la carpeta frontend

```bash
$ ng serve -o
```

🟢 Ya lo tienes todo LISTO! Disfruta del Sprint 8 !!

## 💻 Tecnologías y Recursos Utilizados

- ANGULAR
- TYPESCRIPT
- HTML
- CSS
- BOOTSTRAP
- BOOTSWATCH
- RXJS
- ROUTES
- NODE
- EXPRESS
- SEQUELIZE
- MYSQL
- FULLCALENDAR
- MAPBOX
- CHARTJS

## ✨ Características

- Cada ejercicio está en un commit. Algunos commit tienen % de ejercicios, porque quería ir subiendo por precaución.
- Completados todos los ejercicios que se pedían y los bonus.
- La base de datos y tablas se crean automáticamente cuando inicias el backend, los datos los introduces por FrontEnd menos el ChartJS, en ese caso le inyecto datos desde backend.