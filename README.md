# **NodePOP API** - Repo práctica JS/Node/Mongo Boot V (Autor: Alejandro Cabral)

<img alt="Logo NodePOP API" src="https://github.com/acabral1973/nodepopapi/blob/master/public/images/nodePOP-api-logo.png">

**NodePOP API** es la API que da soporte a la aplicación móvil de venta de artículos de segunda mano, NodePOP. 
La API está preparada para interactuar con las versiones para iOS y Android de Nodepop. Desde la pantalla principal de NodePOP, 
los usuarios pueden ver una lista de todos los anuncios disponibles y realizar las siguientes acciones:
* buscar un anuncio determinado 
* filtrar anuncios según diferentes criterios

Esta API proveé los métodos necesarios para estas funciones básicas, y además, dispone de métodos para las siguientes funcionalidades auxiliares:
* registrar un usuario 
* ver la lista de usuarios 

En las siguientes secciones, se detallará el funcionamiento de éstos módulos y de la API en general.

**¡Bienvenidos a NodePOP API!**

## Puesta en marcha del proyecto
Unas sencillas instrucciones para poner en marcha este proyecto. Estas instrucciones se han elaborado considerando un entorno de desarrollo, por lo que no son completas ni adecuadas para su puesta en producción. 
* En primer lugar deberás hacer un fork de este repositorio al tuyo y luego clonarlo a tu equipo desde allí.
* A continuación entra en la carpeta clonada en tu equipo e inicia la aplicación (bastará con que ejecutes nodemon)
* Si la base de datos está activa esto es todo, ya puedes comenzar a usar la API.  
**Te recomiendo que mires la sección siguiente para conocer las dependencias de la aplicación**


## Servidores (NodeJS, MongoDB y HTTP)
Para que la aplicación se ejecute correctamente debes tener en cuenta el siguiente entorno:
* Debes disponer de un servidor [NodeJS](https://nodejs.org/en/) operativo 
* Debes disponer de un servidor [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) operativo 
La configuración de la base de datos está en el código. Inicialmente está configurada para utilizar el servidor *localhost* en el puerto por defecto de MongoDB (*27017*). Puedes personalizar la conexión para utilizar una instancia de MongoDB que ya exista y que no responda a esos parámetros. Para ello debes editar el fichero */lib/connect-mongoose.js* e inicializar las variables *host, puerto y db* con los valores adecuados a tu instalación de Mongo.

La aplicación crea un servidor HTTP básico que escuchará por defecto en el puerto 3000 del equipo donde se ejecute. 
Para acceder a las funcionalidades de la API deberás acceder desde tu navegador a las siguientes url:
* [http://localhost:3000] (página principal de la API, que muestra esta misma documentación y te da acceso a este *repo* de **gitHub**)
* [http://localhost:3000/apiv0/]*script* (acceso a las diferentes funcionalidades, ver más adelante la información completa para cada una) 


## Dependencias 
La app utiliza los siguientes módulos, versiones:
* _body-parser_ ver. _~1.17.1_
* _cookie-parser_ ver _~1.4.3_
* _debug ver_ _~2.6.3_
* _ejs ver_ _~2.5.6_
* _express_ ver _~4.15.2_
* _fs_ ver _0.0.1-security_
* _mongodb ver_ _^2.2.26_
* _mongoose ver_ _^4.9.8_
* _morgan ver_ _~1.8.1_
* _serve-favicon_ ver _~2.4.2_
* _sha256_ ver _^0.2.0_

Este enlace te llevará al fichero [package.json](https://github.com/acabral1973/nodepopapi/blob/master/package.json), donde podrás ver ésta y otra información interesante sobre la aplicación.

## Inicializar la base de datos
Se ha incluído un script de inicializaciónd e la base de datos. Su funcionamiento es sencillo, vacía las colecciones de *Usuarios* y *Anuncios* y carga usuarios y anuncios de prueba. Si quisieras agregar nuevos usuarios o anuncios de prueba, bastaría con que editaras los ficheros */data/usuarios.json* y/o */data/anuncios.json* y agregues nuevos registros... **¡¡¡RESPETA EL FORMATO PLEASE!!!**

**Para ejecutar el script basta con que desde tu navegador accedas a la siguiente url: http://localhost:3000/initialize-db**

## Uso de la API
Todas las funcionalidades de al API requieren validación, o sea, solo se devuelven datos a usuarios registrados.  
A continuación te detallo las funcionalidades de la API y su uso:

### Listado de anuncios
Para ver una lista de anuncios bastará con que inicies una petición mediante la siguiente url: *http://localhost:3000/apiv0/anuncios*

### Paginado de anuncios
Para paginar anuncios basta con indicar en qué registro quieres comenzar (usando el parámetro *inicio*) y cuantos anuncios quieres ver (usando el parámetro *lineas*). De esta forma, si quisieras ver los anuncios de 3 al 8 (anuncios 3, 4, 5, 6, 7 y 8) deberías utilizar la siguiente sintaxis en tu petición: *http://localhost:3000/apiv0/anuncios**?inicio=3&lineas=5***

### Filtrar anuncios
Puedes filtrar anuncios por varios campos diferentes, utilizando los parámetros correspondientes:
* el parámetro *nombre* te permitirá buscar anuncios cuyo artículo empiece por una determinada cadena de caracteres. Por ejemplo *http://localhost:3000/apiv0/anuncios**?nombre=bici*** te permitirá obtener todos los anuncios cuyo artículo empieza por la cadena "bici". Este filtro es insensible a mayúsculas y ninúsculas por lo que da igual como lo escribas.
* el parámetro *tags* te permitirá buscar anuncios de una determinada categoría. Por ejemplo *http://localhost:3000/apiv0/anuncios**?tags=motor*** te permitirá obtener todos los anuncios de la categoría motor. Recuerda que las categorías disponibles son *motor, mobile, work y lifestyle*
* el parámetro *venta* te permitirá buscar anuncios de venta o de compra según desees. Si utilizas *venta=true* verás los de venta y si utilizas *venta=false* verás los compra. Por ejemplo *http://localhost:3000/apiv0/anuncios**?venta=true*** te permitirá obtener todos los anuncios de venta.
* los parámetros *minprecio* y *maxprecio* te permitirán buscar anuncios en un determinado rango de precios. Si solo utilizas *minprecio* la API devolverá todos los anuncios cuyo precio sea superior. Si solo utilizas *maxprecio* la API devolverá todos los anuncios cuyo precio sea inferior. Si usas ambos combinados con un **&**, la API te devolverá todos los anuncios cuyo precio esté entre *minprecio* y *maxprecio*.  
Por ejemplo *http://localhost:3000/apiv0/anuncios**?minprecio=100&maxprecio=500*** te permitirá obtener todos los anuncios cuyo precio es **mayor o igual**/ al precio mínimo estipulado y **menor o igual** al precio máximo indicado.

### Ordenar anuncios
* el parámetro *orden* te permitirá indicar el campo según el que deseas que se ordene el listado. Por ejemplo *http://localhost:3000/apiv0/anuncios**?orden=precio*** te devolverá el listado de anuncios ordenado por precio. 

### Listado de *tags*
Para obtener un listado de las *tags* aceptadas debes utilizar la siguiente petición: *http://localhost:3000/apiv0/anuncios/tags*

### Registrio de usuarios
Para registrar un usuario nuevo debes iniciar una petición **POST**, por loq ue deberás utilizar una herramienta como [Postman](https://www.getpostman.com/) o similar. Para ello deberás indicar el **nombre** del usuario, su **email** y una **clave** de usuario. El método verifica que el email no esté siendo utilizado por otro usuario ya registrado. Recuerda indicar además el usuario y la contraseña de un usuario ya registrado, **solo los usuarios ya registrados pueden registrar un nuevo usuario**.

### Listado de usuarios
bla bla bla

## Otras consideraciones

### Autenticación
bla bla bla

### Cluster
bla bla bla

### Internacionalización
bla bla bla

## Feedback
Se agradecerá que cualquier feedback, reporte de errores, solicitudes de nuevas funcionalidades o preguntas, sea dirigido a cabralejandro@gmail.com

## Licencia
Este proyecto tiene fines exclusivamente formativos, por lo que su distribución es libre en todos los sentidos, no existiendo
restricción alguna al receptor para usarlo, copiarlo, reusarlo y redistribuirlo sin limitaciones ni condiciones.