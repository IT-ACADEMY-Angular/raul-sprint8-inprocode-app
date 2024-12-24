# Sprint 8 IT Academy | Angular

## 📄 Descripción

Práctica donde el objetivo principal era hacer una App utilizando los plugins mas importantes y esenciales. CRUD front+back, Maps, Full Calendar, Charts.

## 📋 Requisitos

- Npm instalado en tu sistema.
- Node instalado en tu sistema.
- Visual Studio Code (Recomendado)
- XAMPP descargado

## 🛠️ Instalación

1️⃣ Clona este repositorio
```bash
$ git clone https://github.com/IT-ACADEMY-Angular/raul-sprint8-inprocode-app.git
```

2️⃣ Unlink el repositorio para no modificar mi trabajo.

```bash
$ git remote rm origin
```

3️⃣ Abrimos XAMPP: Hacemos Start en APACHE + MYSQL y a continuación abrimos PhPMyAdmin haciendo click en "Admin" en la fila de MYSQL.

4️⃣ Crea una BBDD nueva que se llame "almacen" y importas el archivo .sql que está en el proyecto en la carpeta de "BBDD". Recuerda que debes hacer click en la BBDD y luego importarle el .sql (almenos en PhPMyadmin).

5️⃣ En el archivo dentro de la carpeta server/connection.ts está la configuración para conectarse a la BBDD de tu localhost, en mi caso tengo puesto que la BBDD se llama "almacen", usuario "root" y sin password "". Debes configurarla según tus credenciales en o Workbench PhPMyAdmin.

6️⃣ Instalar las dependencias con npm. Primero instalamos y iniciamos el Backend:

+ En terminal, entramos en la carpeta de -> server <- y hacemos el comando:

```bash
$ npm run setup --force
```

+ Una vez instaladas, iniciamos el servidor backend utilizando los comandos (utiliza dos terminales, sin cerrarlas, para que el backend siga funcionando, y sigue el orden!) Si todo ha ido bien, verás un mensaje en terminal "Conectados a la BBDD":

```bash
$ npx tsc --watch
```

```bash
$ npx nodemon dist/index.js
```

7️⃣ Ahora vamos a instalar y iniciar el FrontEnd. En terminal, entramos en la carpeta de -> frontend <- y hacemos el comando:

```bash
$ npm install --force
```

+ Inicializar el servidor FronetEnd para ver la web, desde terminal en la carpeta frontend

```bash
$ ng serve -o
```

## 💻 Tecnologías y Recursos Utilizados

- ANGULAR
- TYPESCRIPT
- HTML
- CSS
- RXJS
- Routes
- Node
- Express

## ✨ Características

- Cada ejercicio está en un commit.
- Completados todos los ejercicios que se pedían y los bonus.
- Working...
