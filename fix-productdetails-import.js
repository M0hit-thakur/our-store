const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'pages', 'ProductDetails.jsx');
let text = fs.readFileSync(file, 'utf8');
text = text.replace('import "./App.css";', 'import "../App.css";');
fs.writeFileSync(file, text, 'utf8');
console.log('patched', file);
