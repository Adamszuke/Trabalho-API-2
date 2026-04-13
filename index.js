const express = require('express');
const app = express();

app.use(express.json());

let livros = [
  { id: 1, titulo: "1984", autor: "George Orwell", ano: 1949 },
  { id: 2, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954 },
  { id: 3, titulo: "A Revolução dos Bichos", autor: "George Orwell", ano: 1945 },
  { id: 4, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943 },
  { id: 5, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899 },
  { id: 6, titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", ano: 1967 },
  { id: 7, titulo: "O Morro dos Ventos Uivantes", autor: "Emily Brontë", ano: 1847 },
  { id: 8, titulo: "A Metamorfose", autor: "Franz Kafka", ano: 1915 },
  { id: 9, titulo: "Moby Dick", autor: "Herman Melville", ano: 1851 },
  { id: 10, titulo: "Orgulho e Preconceito", autor: "Jane Austen", ano: 1813 },
];

let proximoId = 11;

app.get('/api/livros', (req, res) => {
  res.json(livros);
});

app.get('/api/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id === parseInt(req.params.id));
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
  res.json(livro);
});

app.post('/api/livros', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ erro: "Corpo da requisição vazio" });
  }

  const { titulo, autor, ano } = req.body;

  if (!titulo || !autor || !ano) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando" });
  }

  const novoLivro = { id: proximoId++, titulo, autor, ano };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put('/api/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id === parseInt(req.params.id));
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

  if (!req.body) {
    return res.status(400).json({ erro: "Corpo da requisição vazio" });
  }

  const { titulo, autor, ano } = req.body;
  if (!titulo || !autor || !ano) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando" });
  }

  livro.titulo = titulo;
  livro.autor = autor;
  livro.ano = ano;
  res.json(livro);
});

app.delete('/api/livros/:id', (req, res) => {
  const index = livros.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erro: "Livro não encontrado" });
  
  livros.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => console.log('🚀 API CRUD de Livros rodando na porta 3000'));