const mockPosts = [
    {
        id: "1",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        content: `
# Getting Started with Next.js and Prisma

Next.js is a powerful React framework that enables features such as server-side rendering and static site generation. Prisma is a modern database toolkit that makes database access easy with an auto-generated and type-safe query builder for TypeScript & Node.js.

## Setting up a Next.js Project

First, let's create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-blog
cd my-blog
\`\`\`

## Installing Prisma

Next, let's add Prisma to our project:

\`\`\`bash
npm install prisma @prisma/client
npx prisma init
\`\`\`

## Configuring the Database

Edit the \`prisma/schema.prisma\` file to define your database schema:

\`\`\`prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
\`\`\`

## Creating Database Migrations

Run the following command to create and apply your database migrations:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

## Setting up API Routes

Create a new file at \`pages/api/posts.js\`:

\`\`\`javascript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    })
    res.json(posts)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
\`\`\`

## Fetching Posts in Your Components

Now you can fetch posts in your components:

\`\`\`javascript
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    }
    
    fetchPosts()
  }, [])
  
  return (
    <div>
      <h1>My Blog</h1>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            {post.author && <p>By {post.author.name}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

This is just a basic setup to get you started with Next.js and Prisma for your blog. You can expand on this by adding authentication, comment functionality, and much more.
    `,
        coverImage:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Next.js", "Prisma", "Tutorial"],
        author: {
            name: "John Doe",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Full Stack Developer & Technical Writer",
        },
    },
    {
        id: "2",
        title: "Creating Beautiful Blog Layouts with Tailwind CSS",
        excerpt:
            "Explore advanced Tailwind CSS techniques to create stunning and responsive blog layouts.",
        content: `
# Creating Beautiful Blog Layouts with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. It's perfect for creating beautiful blog layouts that are responsive and maintainable.

## Setting up Tailwind CSS

First, let's set up Tailwind CSS in your project:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Configuring Tailwind

Edit your \`tailwind.config.js\` file:

\`\`\`javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
\`\`\`

## Creating a Blog Card Component

Here's an example of a blog card component using Tailwind CSS:

\`\`\`jsx
function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={post.coverImage} 
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </div>
  );
}
\`\`\`

## Creating a Blog Layout

Here's an example of a full blog layout using Tailwind CSS:

\`\`\`jsx
function BlogLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">My Blog</div>
          <div className="flex space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          </div>
        </nav>
      </header>
      
      <main>{children}</main>
      
      <footer className="py-6 mt-12 border-t border-gray-200">
        <p className="text-center text-gray-500">© 2023 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
\`\`\`

## Responsive Design

Tailwind makes responsive design easy with its breakpoint prefixes. Here's how to make the blog grid responsive:

\`\`\`jsx
function BlogGrid({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

## Adding Typography Styles for Blog Content

For the actual blog content, you can use Tailwind's typography plugin to style markdown content beautifully:

\`\`\`jsx
function BlogPost({ post }) {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose prose-lg max-w-none">
        {/* Rendered markdown content goes here */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}
\`\`\`

With Tailwind CSS, creating beautiful and responsive blog layouts becomes much easier. The utility-first approach allows for rapid development and easy maintenance.
    `,
        coverImage:
            "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        date: "April 15, 2023",
        readingTime: "6 min read",
        categories: ["Tailwind CSS", "Design", "Frontend"],
        author: {
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            bio: "UI/UX Designer & Frontend Developer",
        },
    },
    {
        id: "3",
        title: "Working with Markdown in React Applications",
        excerpt:
            "Learn how to effectively use and render Markdown in your React applications for a better content management experience.",
        content: `
# Working with Markdown in React Applications

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. It's widely used in blogging, documentation, and README files. In this tutorial, we'll learn how to effectively work with Markdown in React applications.

## Why Use Markdown?

Markdown offers several advantages for content creation:

1. **Simplicity**: Markdown is easy to learn and write
2. **Readability**: Markdown is readable even in its raw form
3. **Flexibility**: Markdown can be converted to HTML, PDF, and other formats
4. **Portability**: Markdown files are plain text and can be edited anywhere

## Setting Up a Markdown Parser in React

First, let's install a popular Markdown parser called \`marked\`:

\`\`\`bash
npm install marked
\`\`\`

For security reasons, it's also a good idea to sanitize the HTML output to prevent XSS attacks:

\`\`\`bash
npm install dompurify
\`\`\`

## Creating a Markdown Renderer Component

Let's create a simple Markdown renderer component:

\`\`\`jsx
import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

function MarkdownRenderer({ content }) {
  const [renderedContent, setRenderedContent] = useState('');
  
  useEffect(() => {
    // Parse markdown to HTML
    const rawMarkup = marked(content);
    
    // Sanitize HTML to prevent XSS attacks
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
    
    setRenderedContent(sanitizedMarkup);
  }, [content]);
  
  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: renderedContent }} 
    />
  );
}

export default MarkdownRenderer;
\`\`\`

## Using the Markdown Renderer

Now we can use our Markdown renderer in a blog post component:

\`\`\`jsx
import MarkdownRenderer from './MarkdownRenderer';

function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div className="meta">
        <span>{post.date}</span>
        <span>{post.readingTime}</span>
      </div>
      <MarkdownRenderer content={post.content} />
    </article>
  );
}
\`\`\`

## Adding Syntax Highlighting

To add syntax highlighting for code blocks, we can use libraries like \`highlight.js\` or \`prism.js\`. Let's use \`highlight.js\`:

\`\`\`bash
npm install highlight.js
\`\`\`

Now let's update our Markdown renderer:

\`\`\`jsx
import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

function MarkdownRenderer({ content }) {
  const [renderedContent, setRenderedContent] = useState('');
  
  useEffect(() => {
    // Configure marked to use highlight.js
    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, code).value;
        }
        return hljs.highlightAuto(code).value;
      }
    });
    
    // Parse markdown to HTML
    const rawMarkup = marked(content);
    
    // Sanitize HTML to prevent XSS attacks
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
    
    setRenderedContent(sanitizedMarkup);
  }, [content]);
  
  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: renderedContent }} 
    />
  );
}

export default MarkdownRenderer;
\`\`\`

## Creating a Markdown Editor

For a full blog system, you might also want to create a Markdown editor. Here's a simple example:

\`\`\`jsx
import React, { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello, world!');
  
  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2>Edit</h2>
        <textarea
          className="w-full h-96 p-4 border rounded"
          value={markdown}
          onChange={handleChange}
        />
      </div>
      <div>
        <h2>Preview</h2>
        <div className="border rounded p-4 h-96 overflow-auto">
          <MarkdownRenderer content={markdown} />
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;
\`\`\`

By combining these components, you can create a powerful blog system that uses Markdown for content creation and management.
    `,
        coverImage:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        date: "April 20, 2023",
        readingTime: "7 min read",
        categories: ["React", "Markdown", "Frontend"],
        author: {
            name: "Alex Johnson",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            bio: "React Developer & Content Creator",
        },
    },
    {
        id: "4",
        title: "Building a RESTful API with Node.js and PostgreSQL",
        excerpt:
            "A comprehensive guide to creating a robust RESTful API using Node.js, Express, and PostgreSQL for your blog backend.",
        content: `
# Building a RESTful API with Node.js and PostgreSQL

In this tutorial, we'll build a RESTful API using Node.js, Express, and PostgreSQL to serve as the backend for a blog application.

## Setting Up the Project

First, let's create a new Node.js project:

\`\`\`bash
mkdir blog-api
cd blog-api
npm init -y
\`\`\`

Next, install the necessary dependencies:

\`\`\`bash
npm install express pg dotenv cors
npm install --save-dev nodemon
\`\`\`

## Project Structure

Let's set up a basic project structure:

\`\`\`
blog-api/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   └── posts.controller.js
  ├── routes/
  │   └── posts.routes.js
  ├── .env
  ├── index.js
  └── package.json
\`\`\`

## Database Configuration

Create a \`.env\` file to store your database credentials:

\`\`\`
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=blog_db
PORT=3000
\`\`\`

Now, let's create the database configuration file at \`config/db.js\`:

\`\`\`javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
\`\`\`

## Setting Up the Database

Before we proceed, make sure you have PostgreSQL installed and running. Create a new database and tables:

\`\`\`sql
CREATE DATABASE blog_db;

\\c blog_db

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_categories (
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);
\`\`\`

## Creating API Routes and Controllers

Let's create the controller for posts at \`controllers/posts.controller.js\`:

\`\`\`javascript
const pool = require('../config/db');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const result = await pool.query(\`
      SELECT p.*, u.name as author_name
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    \`);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Get post details
    const postResult = await pool.query(\`
      SELECT p.*, u.name as author_name
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    \`, [id]);
    
    if (postResult.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const post = postResult.rows[0];
    
    // Get post categories
    const categoriesResult = await pool.query(\`
      SELECT c.id, c.name
      FROM categories c
      JOIN post_categories pc ON c.id = pc.category_id
      WHERE pc.post_id = $1
    \`, [id]);
    
    post.categories = categoriesResult.rows;
    
    res.json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, user_id, categories } = req.body;
  
  // Validate request
  if (!title || !content || !user_id) {
    return res.status(400).json({ message: 'Title, content, and user_id are required' });
  }
  
  try {
    // Begin transaction
    await pool.query('BEGIN');
    
    // Create post
    const postResult = await pool.query(\`
      INSERT INTO posts (title, content, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    \`, [title, content, user_id]);
    
    const post = postResult.rows[0];
    
    // Add categories if provided
    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        await pool.query(\`
          INSERT INTO post_categories (post_id, category_id)
          VALUES ($1, $2)
        \`, [post.id, categoryId]);
      }
    }
    
    // Commit transaction
    await pool.query('COMMIT');
    
    res.status(201).json(post);
  } catch (error) {
    // Rollback transaction in case of error
    await pool.query('ROLLBACK');
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, categories } = req.body;
  
  try {
    // Begin transaction
    await pool.query('BEGIN');
    
    // Update post
    const postResult = await pool.query(\`
      UPDATE posts
      SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    \`, [title, content, id]);
    
    if (postResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const post = postResult.rows[0];
    
    // Update categories if provided
    if (categories) {
      // Remove existing categories
      await pool.query(\`
        DELETE FROM post_categories
        WHERE post_id = $1
      \`, [id]);
      
      // Add new categories
      for (const categoryId of categories) {
        await pool.query(\`
          INSERT INTO post_categories (post_id, category_id)
          VALUES ($1, $2)
        \`, [post.id, categoryId]);
      }
    }
    
    // Commit transaction
    await pool.query('COMMIT');
    
    res.json(post);
  } catch (error) {
    // Rollback transaction in case of error
    await pool.query('ROLLBACK');
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(\`
      DELETE FROM posts
      WHERE id = $1
      RETURNING *
    \`, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
\`\`\`

Now, let's create the routes at \`routes/posts.routes.js\`:

\`\`\`javascript
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

// GET all posts
router.get('/', postsController.getAllPosts);

// GET a single post
router.get('/:id', postsController.getPostById);

// POST a new post
router.post('/', postsController.createPost);

// PUT update a post
router.put('/:id', postsController.updatePost);

// DELETE a post
router.delete('/:id', postsController.deletePost);

module.exports = router;
\`\`\`

## Setting Up the Express Server

Finally, let's create our main server file at \`index.js\`:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', require('./routes/posts.routes'));

// Default route
app.get('/', (req, res) => {
  res.send('Blog API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

Update your \`package.json\` to include scripts for running the server:

\`\`\`json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
\`\`\`

## Running the API

Now you can start your API server:

\`\`\`bash
npm run dev
\`\`\`

Your RESTful API should now be running at \`http://localhost:3000\`. You can use tools like Postman or Insomnia to test your API endpoints.

This is a basic setup for a blog API using Node.js and PostgreSQL. You can extend it by adding authentication, validation, pagination, and more advanced features as needed.
    `,
        coverImage:
            "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        date: "April 25, 2023",
        readingTime: "9 min read",
        categories: ["Node.js", "PostgreSQL", "API", "Backend"],
        author: {
            name: "Michael Brown",
            avatar: "https://randomuser.me/api/portraits/men/94.jpg",
            bio: "Backend Developer & Database Specialist",
        },
    },
    {
        id: "5",
        title: "Implementing Authentication in Your Next.js Application",
        excerpt:
            "A step-by-step guide to adding secure user authentication to your Next.js blog using NextAuth.js.",
        content: `
# Implementing Authentication in Your Next.js Application

Authentication is a crucial part of any blog application that allows users to create, edit, and manage content. In this tutorial, we'll implement authentication in a Next.js application using NextAuth.js.

## What is NextAuth.js?

NextAuth.js is a complete authentication solution for Next.js applications. It supports various authentication providers like OAuth (Google, GitHub, etc.), email/password, and more.

## Setting Up NextAuth.js

First, let's install NextAuth.js:

\`\`\`bash
npm install next-auth
\`\`\`

## Basic Configuration

Create a new file at \`pages/api/auth/[...nextauth].js\`:

\`\`\`javascript
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, user) {
      session.userId = user.id;
      return session;
    },
  },
});
\`\`\`

## Setting Environment Variables

Create or update your \`.env.local\` file with the necessary environment variables:

\`\`\`
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"

# NextAuth Providers
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# Email Provider
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=user@example.com
EMAIL_SERVER_PASSWORD=password
EMAIL_FROM=noreply@example.com

# NextAuth
NEXTAUTH_URL=http://localhost:3000
SECRET=your_random_string_at_least_32_chars
\`\`\`

## Updating Prisma Schema

Update your Prisma schema to include the tables required by NextAuth.js:

\`\`\`prisma
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String? @db.Text
  access_token       String? @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
\`\`\`

Apply the changes to your database:

\`\`\`bash
npx prisma migrate dev --name add-auth-models
\`\`\`

## Wrapping Your Application with SessionProvider

Update your \`_app.js\` file to wrap your application with the SessionProvider:

\`\`\`jsx
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
\`\`\`

## Accessing Authentication in Components

Now you can access the authentication state in your components:

\`\`\`jsx
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  
  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
\`\`\`

## Creating Protected Routes

You can create protected routes that require authentication:

\`\`\`jsx
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [session, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      {/* Dashboard content */}
    </div>
  );
}

// Server-side protection
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
\`\`\`

## Creating a Login Page

Let's create a simple login page at \`pages/login.js\`:

\`\`\`jsx
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Redirect to dashboard if already authenticated
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn("github")}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {/* GitHub icon */}
            </svg>
            Sign in with GitHub
          </button>
          
          <button
            onClick={() => signIn("google")}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {/* Google icon */}
            </svg>
            Sign in with Google
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn("email", { email: e.target.email.value });
            }}
          >
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
\`\`\`

## Adding Authentication to API Routes

You can protect your API routes with authentication:

\`\`\`javascript
// pages/api/posts/create.js
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: session.userId },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
}
\`\`\`

With these steps, you've implemented a complete authentication system for your Next.js blog application using NextAuth.js. This authentication system supports multiple providers and can be extended with custom logic as needed.
    `,
        coverImage:
            "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        date: "May 2, 2023",
        readingTime: "8 min read",
        categories: ["Next.js", "Authentication", "Security"],
        author: {
            name: "Sarah Wilson",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            bio: "Security Specialist & Next.js Developer",
        },
    },
];

// Get all posts
export const getPosts = () => {
    return mockPosts;
};

// Get a single post by ID
export const getPostById = (id:string) => {
    return mockPosts.find((post) => post.id === id);
};
