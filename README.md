# Blog Project

This is a blog project that allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts. It includes authentication, comments, and user registration functionality.

## Project Structure

The project is organized into the following folders and components:

- `api`: Contains the API routes for handling CRUD operations on blogs and comments.

  - `blog.js`: Handles CRUD operations for blog posts.
  - `comment.js`: Handles CRUD operations for comments.
  - `auth/route.js`: Handles user login.
  - `register.js`: Handles user registration.

- `components`: Contains React components used in the project.

  - `Comment.js`: A component for rendering comments.
  - `Navbar.js`: The navigation bar component.
  - `Footer.js`: The footer component.

- `pages`: Contains the pages that are rendered by Next.js.
  - `index.js`: The home page displaying a list of blogs.
  - `blog/[id].js`: The individual blog post page.
  - `create-blog.js`: The page for creating a new blog post.
  - `edit-blog/[id].js`: The page for editing an existing blog post.
  - `login.js`: The login page.
  - `register.js`: The registration page.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

   cd blog-project
   npm install
   npm run dev
