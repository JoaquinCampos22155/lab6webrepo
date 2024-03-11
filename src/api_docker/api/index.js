import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint para obtener todos los posts
app.get('/posts', async (req, res) => {
  const posts = await getAllPosts();
  res.status(200).json(posts);
});

// Endpoint para obtener un post por su ID
app.get('/posts/:id', async (req, res) => {
  const postId = req.params.postId;
  const post = await getPostById(postId);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Endpoint para crear un nuevo post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = await createPost(title, content);

  res.status(200).json(newPost);
});

// Endpoint para modificar un post por su ID
app.put('/posts/:id', async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  const updatedPost = await updatePost(postId, title, content);

  if (updatedPost) {
    res.status(200).json(updatedPost);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Endpoint para borrar un post por su ID
app.delete('/posts/:id', async (req, res) => {
  const postId = req.params.postId;
  const deleteResult = await deletePost(postId);

  if (deleteResult) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
