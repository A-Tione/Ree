const div = document.createElement('div');
div.innerHTML = `<h1>内容</h1>`;

const root = document.getElementById('root') || document.body;
console.log(root);
root.appendChild(div);
