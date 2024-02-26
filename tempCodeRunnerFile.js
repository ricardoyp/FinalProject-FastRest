import { addData } from "./API";

// Appetizers
const carpaccioTernera = {
  name: "Carpaccio de ternera",
  description: "Finas láminas de ternera marinadas en aceite de oliva y limón, acompañadas de rúcula, lascas de parmesano y reducción de balsámico.",
  price: 12.99,
  imageUrl: "[imagen]"
};

const rollitosPrimavera = {
  name: "Rollitos de primavera vegetarianos",
  description: "Deliciosos rollitos rellenos de vegetales frescos como zanahorias, col china, champiñones y brotes de soja, servidos con salsa agridulce.",
  price: 8.99,
  imageUrl: "[imagen]"
};

const cevicheCamaron = {
  name: "Ceviche de camarón",
  description: "Camarones frescos marinados en jugo de limón con cebolla morada, cilantro y ají, servidos con chips de plátano verde.",
  price: 10.99,
  imageUrl: "[imagen]"
};

const ensaladaCaprese = {
  name: "Ensalada Caprese",
  description: "Rodajas de tomate maduro, mozzarella fresca y hojas de albahaca, aliñadas con aceite de oliva virgen extra y reducción de vinagre balsámico.",
  price: 9.99,
  imageUrl: "[imagen]"
};

const croquetasJamonIberico = {
  name: "Croquetas de jamón ibérico",
  description: "Croquetas caseras rellenas de jamón ibérico y bechamel cremosa, acompañadas de una salsa de alioli casera.",
  price: 7.99,
  imageUrl: "[imagen]"
};

// Main Course
const fileteSalmonParrilla = {
  name: "Filete de salmón a la parrilla",
  description: "Filete de salmón fresco a la parrilla con una costra de hierbas mediterráneas, acompañado de puré de papas y espárragos a la parrilla.",
  price: 18.99,
  imageUrl: "[imagen]"
};

const risottoChampinones = {
  name: "Risotto de champiñones",
  description: "Arroz cremoso cocido con caldo de champiñones, vino blanco y parmesano, servido con champiñones salteados y lascas de queso parmesano.",
  price: 15.99,
  imageUrl: "[imagen]"
};

const lomoTerneraParrilla = {
  name: "Lomo de ternera a la parrilla",
  description: "Jugoso lomo de ternera a la parrilla con salsa de vino tinto y hierbas, acompañado de patatas asadas y verduras de temporada.",
  price: 22.99,
  imageUrl: "[imagen]"
};

const polloCurryArrozBasmati = {
  name: "Pollo al curry con arroz basmati",
  description: "Trozos de pollo tierno cocidos lentamente en una salsa de curry aromática, servidos con arroz basmati y pan naan recién horneado.",
  price: 16.99,
  imageUrl: "[imagen]"
};

const pappardelleRaguCordero = {
  name: "Pappardelle con ragú de cordero",
  description: "Pasta fresca pappardelle servida con un abundante ragú de cordero cocido a fuego lento en salsa de tomate, vino tinto y hierbas.",
  price: 19.99,
  imageUrl: "[imagen]"
};

// Desserts 
const tiramisuClasico = {
  name: "Tiramisú clásico",
  description: "Capas de bizcochos de soletilla empapados en café, crema de mascarpone y cacao en polvo, decorado con virutas de chocolate.",
  price: 7.99,
  imageUrl: "[imagen]"
};

const cremeBrulee = {
  name: "Crème brûlée",
  description: "Crema pastelera de vainilla con una fina capa de azúcar caramelizado en la parte superior, servida con frutos rojos frescos.",
  price: 6.99,
  imageUrl: "[imagen]"
};

const cheesecakeFrutosRojos = {
  name: "Cheesecake de frutos rojos",
  description: "Deliciosa tarta de queso cremosa sobre una base de galleta, cubierta con una mezcla de frutos rojos macerados en azúcar.",
  price: 8.99,
  imageUrl: "[imagen]"
};

const fondantChocolate = {
  name: "Fondant de chocolate",
  description: "Bizcocho de chocolate con centro líquido, acompañado de helado de vainilla y salsa de frutos del bosque.",
  price: 9.99,
  imageUrl: "[imagen]"
};

const profiterolesCrema = {
  name: "Profiteroles rellenos de crema",
  description: "Pequeños bocados de masa choux rellenos de crema pastelera y bañados en chocolate caliente, acompañados de salsa de caramelo.",
  price: 7.99,
  imageUrl: "[imagen]"
};

addData("Appetizers", carpaccioTernera);
console.log("Carpaccio de ternera added to Appetizers");