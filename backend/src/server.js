const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let vehiculos = [];
let historial = [];

app.get('/vehiculos', (req, res) => {
res.json(vehiculos);
});

app.post('/vehiculos', (req, res) => {
const vehiculo = { 
    id: Date.now(), 
    ...req.body
};
vehiculos.push(vehiculo);
res.json(vehiculo);
});

app.put('/vehiculos/:id', (req, res) => {
const index = vehiculos.findIndex(v => v.id == req.params.id);
if(index !== -1) {
    vehiculos[index] = { ...vehiculos[index], ...req.body };
    res.json(vehiculos[index]);
} else {
    res.status(404).json({ mensaje: 'No encontrado' });
}
});

app.delete('/vehiculos/:id', (req, res) => {
const vehiculo = vehiculos.find(v => v.id == req.params.id);
if(vehiculo) {
    historial.push({ ...vehiculo, horaSalida: new Date().toLocaleString() });
}
vehiculos = vehiculos.filter(v => v.id != req.params.id);
res.json({ mensaje: 'Eliminado' });
});

app.get('/historial', (req, res) => {
res.json(historial);
});

app.listen(5000, () => console.log('Backend en http://localhost:5000'));