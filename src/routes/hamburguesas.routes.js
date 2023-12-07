import {Router} from "express";
import pool from "../database.js";

const router = Router();

router.get('/add', async(req, res) => {
    res.render('hamburguesas/add');
});

router.post('/add', async(req, res) => {
    try {
        const {nombre, descripcion, calorias, imagen} = req.body;
        const newHamburguesa = {
            nombre, descripcion, calorias, imagen
        };

        await pool.query('insert into hamburguesas set ?', [newHamburguesa]);
        res.redirect('/list');
    } catch (error) {
        console.log(error);
    }
});

router.get('/list', async(req, res) => {
    try {
        const [result] = await pool.query('select * from hamburguesas');
        res.render('hamburguesas/list', {hamburguesas: result});
    } catch (error) {
        console.log(error);
    }
});

router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const [hamburguesa] = await pool.query('select * from hamburguesas where id = ?', [id]);
        const hamburguesaEdit = hamburguesa[0];
        res.render('hamburguesas/edit', {hamburguesas: hamburguesaEdit});
    } catch (error) {
        console.log(error);
    }
});

router.post('/edit/:id', async(req, res) => {
    try {
        const {nombre, descripcion, calorias, imagen} = req.body;
        const {id} = req.params;
        const editHamburguesa = {
            nombre, descripcion, calorias, imagen
        };

        await pool.query('update hamburguesas set ? where id = ?', [editHamburguesa, id]);
        res.redirect('/list');
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;

        await pool.query('delete from hamburguesas where id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        console.log(error);
    }
});

export default router;