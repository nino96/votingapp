const app = require('./app');
const API_PORT = process.env.PORT || 3002;

app.listen(API_PORT, () => { console.log(`SERVER listening on http://localhost:${API_PORT}`) });