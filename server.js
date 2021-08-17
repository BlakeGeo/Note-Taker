const express = require('express');
const path = require('path');
const app = express();
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

app.use(webRouter);
app.use(apiRouter);

// Wild card must be the very last route so it doesn't override
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/404.html'));
});

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});