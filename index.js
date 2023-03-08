var html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const express = require('express');
const app = express();
var cors = require('cors');

process.on('uncaughtException', (err,origin) => {
    console.log(`Uncaught Exception: ${err.message}`)
})

app.use(
    cors({
        credentials: true,
        origin: true
    })
);

app.use((error, req, res, next) => {
    console.log('error middleware');
    res.sendStatus(500);
})

app.use(express.urlencoded({ extended: true }))

app.options('*', cors());

app.get('/search', async (req, res) => {
    search = req.query.q;
    console.log(search);
    var file = { url: search };
    try {
        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            res.send(pdfBuffer)
        });
    } catch (e) {
        res.send('error')
    }
});

app.listen(process.env.PORT || 30850, function () {
    console.log('server running on port 30850', '');
});
