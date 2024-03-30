# FastRestaurant

FastRestaurant es una aplicación móvil creada con React Native que simplifica el proceso de pedir comida y bebida en un restaurante.

**¡Atención!** El método de pago no esta configurado

## ¿Cómo funciona FastRest?

### Modo cliente:
Los clientes escanean el código QR de su mesa para aplicar una mesa para sus comandas.
Pueden crear comandas, añadir o eliminar platos, y aplicar promociones disponibles.
![IMG_0079](https://github.com/ricardoyp/FinalProject-FastRest/assets/145460649/a145c90e-a738-4429-a69a-6cd0082f7097)

### Modo administrador:
Los administradores del restaurante pueden acceder a un panel de control para gestionar el menú.
Se pueden realizar funciones CRUD (Crear, Leer, Actualizar y Eliminar) para los platos, precios y descripciones.
Además, es posible crear y configurar promociones para los clientes.
![IMG_0080](https://github.com/ricardoyp/FinalProject-FastRest/assets/145460649/8b5645f7-77df-4d7f-b12f-803cc8fba8c5)


## Beneficios de FastRest:

### Para los clientes:
Reduce el tiempo de espera para realizar pedidos.
Permite una experiencia más cómoda y personalizada.
Ofrece acceso a información actualizada del menú y promociones.

### Para los restaurantes:
Agiliza el proceso de toma de comandas y reduce errores.
Mejora la eficiencia del servicio y la rotación de mesas.
Permite fidelizar a los clientes a través de promociones personalizadas.

## Configuración

Antes de comenzar, asegúrate de tener instalado Node.js y npm en tu sistema.

1. Clona este repositorio en tu máquina local:
```bash
git clone git@github.com:ricardoyp/FinalProject-FastRest.git
```

2. Navega al directorio del proyecto:
```bash
cd tuproyecto
```

3. Instala las dependencias del proyecto:
```bash
npm i
```

### Configuración de Firebase

Este proyecto utiliza Firebase para el backend. Asegúrate de tener una cuenta de Firebase y haber creado un proyecto.

1. Genera las credenciales creando un nuevo proyecto en la consola de firebase.
  - Accede a Firestore Database y configuralo
  - Accede a Authentication, seleccionando corrreo electronico + contraseña.
  - Accede a Storage y configuralo

2. Crea un archivo `.env` en la raíz del proyecto.

3. Copia y pega las credenciales de tu proyecto de Firebase en el archivo `.env` en el siguiente formato:
```
EXPO_PUBLIC_FIREBASE_API_KEY = 
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN = 
EXPO_PUBLIC_FIREBASE_PROJECT_ID = 
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET = 
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 
EXPO_PUBLIC_FIREBASE_APP_ID = 
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID = 

EXPO_PUBLIC_ADMIN_CODE = (Código para generar usuarios administradores)
```

Rellena `EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`, y las demás variables con las credenciales específicas de tu proyecto de Firebase.

## Ejecución

Una vez que hayas configurado las variables de entorno, puedes ejecutar el proyecto en tu dispositivo o emulador.

```bash
npm run start
```
Scan QR with Expo Go app mobile

Para comenzar a usar la aplicación, deberas tener platos en la carta para poder añadirlos al carrito
Crea una nueva cuenta administror con el codigo que definiste anteriormente (EXPO_PUBLIC_ADMIN_CODE)


