import express from 'express';
import morgan from 'morgan';
import {engine} from 'express-handlebars';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import hamburguesasRoutes from "./routes/hamburguesas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

//Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Configuraciones
app.set('port', 8080);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.use(hamburguesasRoutes);
app.use(usuariosRoutes);

//public files
app.use(express.static(join(__dirname, 'public')));

//run server
app.listen(app.get('port'), () => {
    console.log('Server en puerto localhost:8080/');
});

