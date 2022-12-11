# Project Name: Ecommerce NodeJS Clean Architecture Microservices

### Descripción

El proyecto está basado en el template provisto para este reto técnico basado en los principios definidos
por [clean architecture](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/).

### Tecnologías 🛠️

* NodeJS 14
* Express
* Sequelize
* Javascript
* MySQL
* Docker
* Docker compose

## Requisitos

- Docker instalado

## Instalación y ejecución

- Clonar el project.

Ejecutar el comando ```docker-compose``` dentro de la carpeta clonada.

* Building los contenedores: ```docker-compose build```

* Iniciar el servicio: ```docker-compose up -d```

* Detener el servicio : ```docker-compose stop```

Los microservicios por defecto corren en los siguientes puertos:

- ecommerce-service: 8000
- delivery-service: 8001

Puede cambiar esta y otras configuraciones en el archivo **.env**.

#### Nota

La aplicación NodeJS probablemente lanzará una excepción la primera vez, porque intentará conectarse al servicio MySQL
que aún se está inicializando por primera vez; en este caso, espere a que MySQL se inicialice por completo primero y
luego ejecute el comando `docker-compose restart $NAME_SERVICE` en otra terminal para reiniciar el servicio bloqueado.

Al ejecutarse el servicio la base de datos ya se encuentra llenada con datos de prueba provistos en el
script `ecommerce-service/Docker/database/script.sql`

### Testing ⚙️

Para ejecutar los tests manualmente, el archivo `delivery-service/req.http` contiene los requests para localhost.
Instalar `REST Client` para Visual Studio Code o ` RESTer HTTP Client` para Sublime Text para poder ejecutar el archivo
en su IDE.

Para la ejecución de tests automáticos:

- Ejecutar el servicio con `docker-compose up`.
- En otro terminal, ejecutar `docker exec delivery-service npm test`.

Al ejecutarse los test automáticos se crearán tablas temporales con el sufijo "_test", las cuales son eliminadas una vez
terminada la ejecución de los tests.

## _ENDPOINTS_

### Obtener todas las categorias

#### Request

```
GET http://localhost:8001/categories
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
    {
        "id": 1,
        "name": "Categoría 1",
        "description": "Descripción"
    },
    {
        "id": 2,
        "name": "Categoría 2",
        "description": "Descripción"
    },
    {
        "id": 3,
        "name": "Categoría 3",
        "description": "Descripción"
    }
]
```

### Obtener categoria por ID

#### Request

```
GET http://localhost:8001/categories/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
{
    "id": 1,
    "name": "Categoría 1",
    "description": "Descripción"
}
```

### Crear categoria

#### Request

```
POST http://localhost:8001/categories
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json
```

#### Response

```
{
  "id": 4,
  "name": "Categoría 4",
  "description": "Descripción"
}
```

### Actualizar categoria

#### Request

```
PUT http://localhost:8001/categories/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json
```

#### Response

```
{
  "id": "1",
  "name": "Nueva categoría 1",
  "description": "Nueva descripción"
}
```

### Borrar categoria

#### Request

```
DELETE http://localhost:8001/categories/4
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
Deleted 4
```

### Obtener todos los usuarios

#### Request

```
GET http://localhost:8001/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 1,
    "name": "admin",
    "email": "admin@gmail.com",
    "is_admin": 1
  },
  {
    "id": 2,
    "name": "admin2",
    "email": "admin2@gmail.com",
    "is_admin": 1
  },
  {
    "id": 3,
    "name": "seller1",
    "email": "seller1@gmail.com",
    "is_admin": 0
  },
  {
    "id": 4,
    "name": "seller2",
    "email": "seller2@gmail.com",
    "is_admin": 0
  },
  {
    "id": 5,
    "name": "seller3",
    "email": "seller3@gmail.com",
    "is_admin": 0
  },
  {
    "id": 6,
    "name": "buyer1",
    "email": "buyer1@gmail.com",
    "is_admin": 0
  },
  {
    "id": 7,
    "name": "buyer2",
    "email": "buyer2@gmail.com",
    "is_admin": 0
  },
  {
    "id": 8,
    "name": "buyer3",
    "email": "buyer3@gmail.com",
    "is_admin": 0
  }
]
```

### Obtener usuario por ID

#### Request

```
GET http://localhost:8001/users/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
{
  "id": 1,
  "name": "admin",
  "email": "admin@gmail.com",
  "is_admin": true
}
```

### Crear usuario

#### Request

```
POST http://localhost:8001/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json

{
  "name": "buyer4",
  "email": "buyer4@gmail.com",
  "password": "123456",
  "is_admin": false
}
```

#### Response

```
{
  "id": 9,
  "name": "buyer4",
  "email": "buyer4@gmail.com",
  "password": "sha1$2fb36374$1$df179626c2a1e964c177fcdd59c4621b73faab6e",
  "is_admin": false
}
```

### Actualizar usuario

#### Request

```
PUT http://localhost:8001/users/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json

{
  "name": "admin1",
  "email": "admin1@gmail.com",
  "password": "123456",
  "is_admin": true
}
```

#### Response

```
{
  "id": "1",
  "name": "admin1",
  "email": "admin1@gmail.com",
  "password": "sha1$f152f699$1$a99d099ebf0c9ecf888381192263c20c8f105d43",
  "is_admin": true
}
```

### Borrar usuario

#### Request

```
DELETE http://localhost:8001/users/9
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
Deleted 9
```

### Obtener todos los productos

#### Request

```
GET http://localhost:8001/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 1,
    "name": "Producto 1",
    "description": "descripción producto",
    "quantity": 3,
    "sellerUserId": 3,
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Producto 2",
    "description": "descripción producto",
    "quantity": 8,
    "sellerUserId": 3,
    "categoryId": 1
  },
  {
    "id": 3,
    "name": "Producto 3",
    "description": "descripción producto",
    "quantity": 7,
    "sellerUserId": 4,
    "categoryId": 2
  },
  {
    "id": 4,
    "name": "Producto 4",
    "description": "descripción producto",
    "quantity": 9,
    "sellerUserId": 4,
    "categoryId": 2
  },
  {
    "id": 5,
    "name": "Producto 5",
    "description": "descripción producto",
    "quantity": 10,
    "sellerUserId": 5,
    "categoryId": 1
  },
  {
    "id": 6,
    "name": "Producto 6",
    "description": "descripción producto",
    "quantity": 0,
    "sellerUserId": 5,
    "categoryId": 2
  }
]
```

### Obtener producto por ID

#### Request

```
GET http://localhost:8001/products/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
{
  "status": "active",
  "id": 1,
  "name": "Producto 1",
  "description": "descripción producto",
  "quantity": 3,
  "sellerUserId": 3,
  "categoryId": 1
}
```

### Crear producto

#### Request

```
POST http://localhost:8001/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json

{
  "name": "Producto 7",
  "description": "descripción producto",
  "quantity": 0,
  "sellerUserId": 5,
  "categoryId": 2
}
```

#### Response

```
{
  "status": "inactive",
  "id": 7,
  "name": "Producto 7",
  "description": "descripción producto",
  "quantity": 0,
  "sellerUserId": 5,
  "categoryId": 2
}
```

### Actualizar producto

#### Request

```
PUT http://localhost:8001/products/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json

{
  "name": "Nuevo producto 1",
  "description": "Nueva descripción producto 1",
  "quantity": 4,
  "sellerUserId": 3,
  "categoryId": 2
}
```

#### Response

```
{
  "id": "1",
  "name": "Nuevo producto 1",
  "description": "Nueva descripción producto 1",
  "quantity": 4,
  "sellerUserId": 3,
  "categoryId": 2,
  "status": "active"
}
```

### Borrar producto

#### Request

```
DELETE http://localhost:8001/products/7
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
Deleted 7
```

### Obtener todas las transacciones

#### Request

```
GET http://localhost:8001/transactions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 1,
    "buyerUserId": 6
  },
  {
    "id": 2,
    "buyerUserId": 7
  },
  {
    "id": 3,
    "buyerUserId": 8
  }
]
```

### Obtener transaccion por ID

#### Request

```
GET http://localhost:8001/transactions/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
{
  "id": 1,
  "buyerUserId": 6,
  "Products": [
    {
      "status": "active",
      "id": 1,
      "name": "Nuevo producto 1",
      "description": "Nueva descripción producto 1",
      "quantity": 4,
      "sellerUserId": 3,
      "categoryId": 2
    },
    {
      "status": "active",
      "id": 2,
      "name": "Producto 2",
      "description": "descripción producto",
      "quantity": 8,
      "sellerUserId": 3,
      "categoryId": 1
    },
    {
      "status": "active",
      "id": 3,
      "name": "Producto 3",
      "description": "descripción producto",
      "quantity": 7,
      "sellerUserId": 4,
      "categoryId": 2
    }
  ]
}
```

### Crear transaccion

#### Request

```
POST http://localhost:8001/transactions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json

{
  "buyerUserId": 8,
  "productIds": [
    3,
    4
  ]
}
```

#### Response

```
{
  "id": 4,
  "buyerUserId": 8
}
```

### Actualizar transaccion

#### Request

```
PUT http://localhost:8001/transactions/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
Content-Type: application/json

{
  "buyerUserId": 8
}
```

#### Response

```
{
  "id": "1",
  "buyerUserId": 8
}
```

### Borrar transaccion

#### Request

```
DELETE http://localhost:8001/transactions/4
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
Deleted 4
```

### Listar compradores

#### Request

```
GET http://localhost:8001/buyers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 7,
    "name": "buyer2",
    "email": "buyer2@gmail.com",
    "transactions": 1
  },
  {
    "id": 8,
    "name": "buyer3",
    "email": "buyer3@gmail.com",
    "transactions": 2
  }
]
```

### Listar vendedores

#### Request

```
GET http://localhost:8001/sellers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 3,
    "name": "seller1",
    "email": "seller1@gmail.com",
    "products": 2
  },
  {
    "id": 4,
    "name": "seller2",
    "email": "seller2@gmail.com",
    "products": 2
  },
  {
    "id": 5,
    "name": "seller3",
    "email": "seller3@gmail.com",
    "products": 2
  }
]
```

### Listar transacciones por compradores

#### Request

```
GET http://localhost:8001/buyers/transactions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 2,
    "buyerUserId": 7,
    "buyer": "buyer2"
  },
  {
    "id": 1,
    "buyerUserId": 8,
    "buyer": "buyer3"
  },
  {
    "id": 3,
    "buyerUserId": 8,
    "buyer": "buyer3"
  }
]
```

### Listar transacciones por vendedores

#### Request

```
GET http://localhost:8001/sellers/transactions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 2,
    "sellerUserId": 3,
    "seller": "seller1"
  },
  {
    "id": 2,
    "sellerUserId": 4,
    "seller": "seller2"
  },
  {
    "id": 1,
    "sellerUserId": 3,
    "seller": "seller1"
  },
  {
    "id": 1,
    "sellerUserId": 4,
    "seller": "seller2"
  },
  {
    "id": 3,
    "sellerUserId": 4,
    "seller": "seller2"
  }
]
```

### Listar categorias por usuario comprador

#### Request

```
GET http://localhost:8001/buyers/8/categories
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjcwNzY5MTk5fQ.p6ylVbCEgzWrEqSde1bC2ppFjM75hrVdDri32cc3c1w
```

#### Response

```
[
  {
    "id": 1,
    "name": "Nueva categoría 1"
  },
  {
    "id": 2,
    "name": "Categoría 2"
  }
]
```

### Autores ✒️

* **Autor:** Mauro Flores F., mauroflores8193@gmail.com
