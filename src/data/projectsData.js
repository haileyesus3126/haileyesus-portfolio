// src/data/projectsData.js

import ruthHome from "../assets/projects/ruth-home.jpg";
import ruthAdmin from "../assets/projects/ruth-admin.jpg";
import ruthProducts from "../assets/projects/ruth-products.jpg";

import taskDashboard from "../assets/projects/task-dashboard.jpg";
import taskCreate from "../assets/projects/task-create.jpg";
import taskUsers from "../assets/projects/task-users.jpg";

import libraryHome from "../assets/projects/library-home.jpg";
import libraryBooks from "../assets/projects/library-books.jpg";
import libraryAdmin from "../assets/projects/library-admin.jpg";

import movieHome from "../assets/projects/movie-home.jpg";
import movieDetails from "../assets/projects/movie-details.jpg";
import movieSearch from "../assets/projects/movie-search.jpg";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const PROJECTS = [
  {
    title: "Ruth Store E-Commerce",
    slug: slugify("Ruth Store E-Commerce"),
    category: "Full Stack",
    status: "Live",
    desc: "Online store with login, cart, checkout, and admin dashboard.",
    longDesc:
      "Ruth Store is a full featured e-commerce platform where users can browse products, add items to cart, and securely checkout. Admins can manage products, orders, customers, brands, and analytics.",
    image: ruthHome,
    screenshots: [ruthHome, ruthAdmin, ruthProducts],
    live: "https://ruth-store-7.vercel.app/",
    code: "https://github.com/haileyesus3126/Ruth-Store-7",
    tech: ["React", "Node.js", "MongoDB", "Express.js"],
  },

  {
    title: "Task Management System",
    slug: slugify("Task Management System"),
    category: "Full Stack",
    status: "Live",
    desc: "Team task app with login, task assignment, file upload, and dashboard.",
    longDesc:
      "A productivity system built for managing team tasks, users, assignments, uploaded files, notifications, and dashboard statistics.",
    image: taskDashboard,
    screenshots: [taskDashboard, taskCreate, taskUsers],
    live: "https://task-management-app-nine-coral.vercel.app/login",
    code: "https://github.com/haileyesus3126/task-management-app-",
    tech: ["React", "Node.js", "MongoDB", "Express.js"],
  },

  {
    title: "Ruth Books Library",
    slug: slugify("Ruth Books Library"),
    category: "Full Stack",
    status: "In Development",
    desc: "Book library with search, categories, PDF download, and admin tools.",
    longDesc:
      "A digital book library platform with book management, category filtering, PDF downloads, admin tools, and a clean reading-focused user experience.",
    image: libraryHome,
    screenshots: [libraryHome, libraryBooks, libraryAdmin],
    live: "#",
    code: "#",
    tech: ["Next.js", "TypeScript", "MongoDB"],
  },

  {
    title: "Haile Movie App",
    slug: slugify("Haile Movie App"),
    category: "Frontend",
    status: "Live",
    desc: "Movie app with search, trending movies, and movie details.",
    longDesc:
      "A responsive movie discovery application where users can browse trending movies, search films, view movie details, and explore categories using a movie API.",
    image: movieHome,
    screenshots: [movieHome, movieDetails, movieSearch],
    live: "https://haile-movie.vercel.app/",
    code: "https://github.com/haileyesus3126/Haile-movie",
    tech: ["React", "REST API", "JavaScript"],
  },
];

export const getProjectBySlug = (slug) =>
  PROJECTS.find((project) => project.slug === slug);