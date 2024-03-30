# FastRestaurant

FastRestaurant es una aplicación móvil creada con React Native que simplifica el proceso de pedir comida y bebida en un restaurante.

**¡Atención!** El método de pago no esta configurado

### Características

- **Registro de Usuarios:** Los usuarios pueden registrarse fácilmente en la aplicación proporcionando información básica.
- **Escaneo de Código QR:** Al llegar al restaurante, los usuarios pueden escanear el código QR ubicado en su mesa para asociarla con su cuenta.
- **Orden de Comida y Bebida:** Una vez asociada la mesa, los usuarios pueden realizar pedidos de comida y bebida desde la aplicación.

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

1. Crea un archivo `.env` en la raíz del proyecto.

2. Copia y pega las credenciales de tu proyecto de Firebase en el archivo `.env` en el siguiente formato:
```
EXPO_PUBLIC_FIREBASE_API_KEY = 
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN = 
EXPO_PUBLIC_FIREBASE_DATABASE_URL = 
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


