import {Router} from "express";
import pool from "../database.js";

const router = Router();

router.get('/add-user', async(req, res) => {
    res.render('usuarios/add-user');
});

router.post('/add-user', async(req, res) => {
    try {
        const {nombre, apellidos, direccion, telefono, correo} = req.body;
        const newUsuario = {
            nombre, apellidos, direccion, telefono, correo
        };

        await pool.query('insert into usuarios set ?', [newUsuario]);
        res.redirect('/list-user');
    } catch (error) {
        console.log(error);
    }
});

router.get('/list-user', async(req, res) => {
    try {
        const [result] = await pool.query('select * from usuarios');
        res.render('usuarios/list-user', {usuarios: result});
    } catch (error) {
        console.log(error);
    }
});

router.get('/edit-user/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const [usuario] = await pool.query('select * from usuarios where id = ?', [id]);
        const usuarioEdit = usuario[0];
        res.render('usuarios/edit-user', {usuarios: usuarioEdit});
    } catch (error) {
        console.log(error);
    }
});

router.post('/edit-user/:id', async(req, res) => {
    try {
        const {nombre, apellidos, direccion, telefono, correo} = req.body;
        const {id} = req.params;
        const editUsuarios = {
            nombre, apellidos, direccion, telefono, correo
        };

        await pool.query('update usuarios set ? where id = ?', [editUsuarios, id]);
        res.redirect('/list-user');
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete-user/:id', async(req, res) => {
    try {
        const {id} = req.params;

        await pool.query('delete from usuarios where id = ?', [id]);
        res.redirect('/list-user');
    } catch (error) {
        console.log(error);
    }
});

export default router;