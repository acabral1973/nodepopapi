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
* *http://localhost:3000* (página principal de la API, que muestra esta misma documentación y te da acceso a este *repo* de **gitHub**)
* *http://localhost:3000/apiv0/script* (acceso a las diferentes funcionalidades, ver más adelante la información completa para cada una) 


## Dependencias 
La app utiliza los siguientes módulos, versiones:
* _basic-auth_ ver _^1.1.0"_
* _body-parser_ ver _~1.17.1_
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
Se ha incluído un script de inicialización de la base de datos. Su funcionamiento es sencillo, vacía las colecciones de *Usuarios* y *Anuncios* y carga usuarios y anuncios de prueba. Si quisieras agregar nuevos usuarios o anuncios de prueba, bastaría con que editaras los ficheros */data/usuarios.json* y/o */data/anuncios.json* y agregues nuevos registros... **¡¡¡RESPETA EL FORMATO PLEASE!!!**

Para ejecutar el script de inicialización basta con que desde tu navegador accedas a la siguiente url: *http://localhost:3000/initialize-db*

## Uso de la API
Todas las funcionalidades de al API requieren validación, o sea, solo se devuelven datos a usuarios registrados.  
A continuación te detallo las funcionalidades de la API y su uso:

### Listado de anuncios
Para ver una lista de anuncios bastará con que inicies una petición **GET** mediante la siguiente url: *http://localhost:3000/apiv0/anuncios*

### Paginado de anuncios
Para paginar anuncios basta con indicar en qué registro quieres comenzar (usando el parámetro *inicio*) y cuantos anuncios quieres ver (usando el parámetro *lineas*). De esta forma, si quisieras ver los anuncios de 3 al 8 (anuncios 3, 4, 5, 6, 7 y 8) deberías utilizar la siguiente sintaxis en tu petición **GET**: *http://localhost:3000/apiv0/anuncios?inicio=3&lineas=5*

### Filtrar anuncios
Puedes filtrar anuncios por varios campos diferentes, utilizando los parámetros que te explico más abajo en tus peticiones **GET**:
* el parámetro *nombre* te permitirá buscar anuncios cuyo artículo empiece por una determinada cadena de caracteres. Por ejemplo *http://localhost:3000/apiv0/anuncios?nombre=bici* te permitirá obtener todos los anuncios cuyo artículo empieza por la cadena *"bici"*. Este filtro no es sensible a mayúsculas y minúsculas por lo que da igual como lo escribas.
* el parámetro *tags* te permitirá buscar anuncios de una determinada categoría. Por ejemplo *http://localhost:3000/apiv0/anuncios?tags=motor* te permitirá obtener todos los anuncios de la categoría motor. Recuerda que las categorías disponibles son *motor, mobile, work y lifestyle*
* el parámetro *venta* te permitirá buscar anuncios de venta o de compra según necesites. Si utilizas *venta=true* verás los de venta y si utilizas *venta=false* verás los compra. Por ejemplo *http://localhost:3000/apiv0/anuncios?venta=true* te permitirá obtener todos los anuncios de venta, disponibles en la base de datos.
* los parámetros *minprecio* y *maxprecio* te permitirán buscar anuncios en un determinado rango de precios. Si solo utilizas *minprecio* la API devolverá todos los anuncios cuyo precio sea superior a él. Si solo utilizas *maxprecio* la API devolverá todos los anuncios cuyo precio sea inferior a éste. Si usas ambos combinados con un **&**, la API te devolverá todos los anuncios cuyo precio esté entre *minprecio* y *maxprecio*. Por ejemplo *http://localhost:3000/apiv0/anuncios?minprecio=100&maxprecio=500* te permitirá obtener todos los anuncios cuyo precio es **mayor o igual** al precio mínimo estipulado y **menor o igual** al precio máximo indicado.

### Ordenar anuncios
PPara ordenar el listado de anuncios por cualquier campo, debes usar el parámetro *orden* en tus peticiones **GET**. Por ejemplo *http://localhost:3000/apiv0/anuncios?orden=precio* te devolverá el listado de anuncios ordenados según su precio. 

### Listado de *tags*
Para obtener un listado de las *tags* aceptadas debes utilizar la siguiente petición: *http://localhost:3000/apiv0/anuncios/tags*

### Registrio de usuarios
Para registrar un usuario nuevo debes iniciar una petición **POST**, por lo que para probar éste método sin escribir código deberás utilizar una herramienta que te permita hacer este tipod e peticiones (los navegadores solo usan peticiones **GET**). Puedes por ejemplo descargarte la herramienta [Postman](https://www.getpostman.com/) o una similar similar. Desde ella deberás indicar el **nombre** del usuario, su **email** y una **clave** de usuario. El método verifica que el email no esté siendo utilizado por otro usuario ya registrado. Recuerda indicar además el usuario y la contraseña de un usuario ya registrado, **solo los usuarios ya registrados pueden registrar un nuevo usuario**.

### Listado de usuarios
Para ver una lista de todos los usuarios registrados bastará con que inicies una petición **GET** mediante la siguiente url: *http://localhost:3000/apiv0/usuarios*. Esta petición también requiere autenticación, así que ten unas credenciales válidas a mano.  
Verás que el campo *clave* no es visible, esto es porque se han almacenado mediante un hash, para lo que he usado un hasheado simple, basado en el módulo [sha256](https://www.npmjs.com/package/sha256).

## Otras consideraciones

### Autenticación
En la versión actual de la API se utiliza autenticación básica, mediante el módulo [basic-auth](https://github.com/jshttp/basic-auth) y las claves se encriptan mediante un hash, basado en el módulo [sha256](https://www.npmjs.com/package/sha256).  

### Imágenes
En la pregarca de anuncios en la base de datos, se cargan fotos exclusivamente para los anuncios de venta. Básicamente me parecía que era el único sitio donde tenía sentido, ya que en un anuncio en el que alguien demanda un producto que desea comprar, no parecía útil una foto, pero bueno, esto ha sido una *desición de diseño* que no tiene efecto sobre el código ni las funcionalidades de la API.  

Las imágenes se han almacenado en */public/images/anuncios* y están en formato *jpg*. Puede accederse a ellas mediante la url: *http://localhost:3000/images/anuncios/fichero.jpg* donde *fichero.jpg* es el nombre del archivo de imagen que, en cada registro, el listado de anuncios devuelve para el campo *foto*.

### Cluster
Dentro de los requerimientos se indicó que *El API recibirá bastantes peticiones en algunos momentos del día, especialmente los fines de
semana, por tanto queremos que aproveche lo mejor posible los recursos del servidor donde estará instalado*.  En este sentido he configurado la funcionalidad de cluster, de forma que se inicie un fork por cada núcleo de procesador disponible en el equipo.  

### Internacionalización
Dentro de los requerimientos se indicó que *La app estará disponible en inglés o español, por tanto el API será utilizado especificando el idioma del usuario en cada petición. Los tags se tratarán siempre en inglés por tanto no necesitan traducciones. Lo único que el API devolverá traducido al lenguaje del usuario son los mensajes de error, ya que la app mostrará estos mensajes al usuario.*  
En este sentido se ha creado un módulo de traducción, llamado **translator** ubicado en */lib/translator.js* que dispone d euna función de traducción que recibe dos parámetros: una *clave* y un *idioma*.  
La *clave* es un literal que sirve para buscar el mensaje de error adecuado, y solo se utiliza desde el código. El "diccionario" que tiene todas las *claves y sus correspondientes "traducciones" es un fichero **JSON* ubicado en */data/diccionario.json*, por lo que si se necesitan nuevos errores traducidos, bastará con agregar nuevos registros a este formato.  
El *idioma* es un parámetro que debe indicarse en las peticiones de usuario mediante el parámetro *idioma*. El parámetro */idioma* puede tener dos valores: *esp* 'o *eng*, que indican respectivamente que el idioma de la solicitud y por lo tento en el que se devolverán los errorers, será Español o Inglés, respectivamente.  

Por ejemplo, si se desea el listado de usuarios y que el idioma de devolución de los errores sea inglés, se debe iniciar una petición **GET** con la siguiente url: *http://localhost:3000/apiv0/anuncios?idioma=eng*  

**Si en las peticiones no se indica el parámetro idioma, o se utilizan valores incorrectos para el mismo, las respuestas se devuelven por defecto en Español, que para algo estamos en MadriZ**  

## Feedback  
Se agradecerá que cualquier feedback, reporte de errores, solicitudes de nuevas funcionalidades o preguntas, sea dirigido a cabralejandro@gmail.com  

## Licencia
Este proyecto tiene fines exclusivamente formativos, por lo que su distribución es libre en todos los sentidos, no existiendo
restricción alguna al receptor para usarlo, copiarlo, reusarlo y redistribuirlo sin limitaciones ni condiciones.  