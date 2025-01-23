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

3️⃣ Abrimos MySQL Workbench o PhpMyAdmin, este paso es importante, porque al iniciar el servidor, la base de datos y tablas se crearán dinámicamente.

4️⃣ En el archivo dentro de la carpeta server/src/db/connection.ts está la configuración para conectarse a la base de datos de tu localhost, en mi caso tengo puesto que la base de datos se llama = "almacen", usuario = "root" password = "root". Debes configurarla según tus credenciales en Workbench/PhPMyAdmin (user, password).

5️⃣ Instala las dependencias con npm (tanto el front como el back). Primero instalamos y iniciamos el Backend:

🟢 En terminal, entramos en la carpeta de -> server <- (IMPORTANTE!! La instalacion de dependencias de back y front, tiene que ser en sus respectivas carpetas!) hacemos el comando:

```bash
$ npm run setup --force
```

🟢 Una vez instaladas, iniciamos el servidor backend utilizando los comandos (utiliza dos terminales, sin cerrarlas, para que el backend siga funcionando, y sigue el orden!):

```bash
$ npx tsc --watch
```

🟢 Siguiente comando (Abre otra terminal, en total tendremos 3, 2 de back y 1 de front). Si todo ha ido bien cuando hagas el siguiente comando, verás un mensaje en terminal "Conectados a la BBDD":

```bash
$ npx nodemon dist/index.js
```

7️⃣ Ahora vamos a instalar y iniciar el FrontEnd. En otra terminal, entramos en la carpeta de -> frontend <- y hacemos el comando:

```bash
$ npm install --force
```

🟢 Inicializar el servidor FrontEnd para ver la web, desde terminal en la carpeta frontend

```bash
$ ng serve -o
```

🟢 Ya lo tienes todo LISTO!

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
- XAMPP
- MYSQL
- PHPMYADMIN

## ✨ Características

- Cada ejercicio está en un commit.
- Completados todos los ejercicios que se pedían y los bonus.
- Working...
