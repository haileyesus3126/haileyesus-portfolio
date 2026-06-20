// src/data/projectsData.js

// ====== COVER IMAGES ======
import coverRuthStore from "../assets/projects/chat-app.jpg";
import coverTaskManagement from "../assets/projects/inventoryApp1.jpg";
import coverMarketplace from "../assets/projects/portfolio66.jpg";
import coverDoctor from "../assets/projects/social-app.jpg";
import coverChat from "../assets/projects/chatApp1.jpg";
import coverMovie from "../assets/projects/2mernBlogee.jpg";

// ====== RUTH STORE SCREENSHOTS ======
import ruth01 from "../assets/projects/screens/amazon/01-overview.jpg";
import ruth02 from "../assets/projects/screens/amazon/02-product.jpg";
import ruth03 from "../assets/projects/screens/amazon/03-cart.jpg";
import ruth04 from "../assets/projects/screens/amazon/04-checkout.jpg";
import ruth05 from "../assets/projects/screens/amazon/05-orders.jpg";
import ruth06 from "../assets/projects/screens/amazon/06-admin.jpg";
import ruth07 from "../assets/projects/screens/amazon/07-chat.jpg";

// ====== TASK MANAGEMENT SCREENSHOTS ======
import task01 from "../assets/projects/screens/crm/01-dashboard.jpg";
import task02 from "../assets/projects/screens/crm/02-customers.jpg";
import task03 from "../assets/projects/screens/crm/03-pipeline.jpg";
import task04 from "../assets/projects/screens/crm/04-lead-detail.jpg";
import task05 from "../assets/projects/screens/crm/05-activity-notes.jpg";
import task06 from "../assets/projects/screens/crm/06-assignments.jpg";
import task07 from "../assets/projects/screens/crm/07-analytics.jpg";

// ====== MARKETPLACE SCREENSHOTS ======
import market01 from "../assets/projects/screens/marketplace/01-overview.jpg";
import market02 from "../assets/projects/screens/marketplace/02-vendor-signup.jpg";
import market03 from "../assets/projects/screens/marketplace/03-vendor-dashboard.jpg";
import market04 from "../assets/projects/screens/marketplace/04-product-create.jpg";
import market05 from "../assets/projects/screens/marketplace/05-orders.jpg";
import market06 from "../assets/projects/screens/marketplace/06-admin-approval.jpg";
import market07 from "../assets/projects/screens/marketplace/07-payouts.jpg";

// ====== DOCTOR SCREENSHOTS ======
import doc01 from "../assets/projects/screens/doctor/01-home.jpg";
import doc02 from "../assets/projects/screens/doctor/02-doctors.jpg";
import doc03 from "../assets/projects/screens/doctor/03-doctor-profile.jpg";
import doc04 from "../assets/projects/screens/doctor/04-booking.jpg";
import doc05 from "../assets/projects/screens/doctor/05-confirmation.jpg";
import doc06 from "../assets/projects/screens/doctor/06-my-appointments.jpg";
import doc07 from "../assets/projects/screens/doctor/07-doctor-dashboard.jpg";

// ====== SUPPORT CHAT SCREENSHOTS ======
import chat01 from "../assets/projects/screens/support-chat/01-login.jpg";
import chat02 from "../assets/projects/screens/support-chat/02-chat-list.jpg";
import chat03 from "../assets/projects/screens/support-chat/03-chat-room.jpg";
import chat04 from "../assets/projects/screens/support-chat/04-typing-status.jpg";
import chat05 from "../assets/projects/screens/support-chat/05-presence.jpg";
import chat06 from "../assets/projects/screens/support-chat/06-history.jpg";
import chat07 from "../assets/projects/screens/support-chat/07-agent-dashboard.jpg";

// ====== MOVIE APP SCREENSHOTS ======
import movie01 from "../assets/projects/screens/movie/01-home.jpg";
import movie02 from "../assets/projects/screens/movie/02-search.jpg";
import movie03 from "../assets/projects/screens/movie/03-category.jpg";
import movie04 from "../assets/projects/screens/movie/04-details.jpg";
import movie05 from "../assets/projects/screens/movie/05-trailer.jpg";
import movie06 from "../assets/projects/screens/movie/06-cast.jpg";
import movie07 from "../assets/projects/screens/movie/07-favorites.jpg";

const LIVE_URL = "https://ruth-store-7.vercel.app/";
const GITHUB_URL = "https://github.com/haileyesus3126/Ruth-Store-7";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const PROJECTS = [
  {
    title: "Ruth Store E-Commerce Platform",
    slug: slugify("Ruth Store E-Commerce Platform"),
    desc:
      "A full-stack MERN e-commerce platform for selling gifts, greeting cards, keepsakes, and special occasion products.",
    overview:
      "Customers can browse products, search collections, add items to cart and wishlist, place orders, and manage their profile. Admins can manage products, upload images, edit inventory, and update order status.",
    image: coverRuthStore,
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: [
      "React",
      "React Router",
      "Context API",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Multer",
    ],
    features: [
      "User registration and login",
      "JWT authentication",
      "Protected user routes",
      "Admin-only routes",
      "Product listing and search",
      "Product details page",
      "Shopping cart",
      "Wishlist system",
      "Checkout and order placement",
      "User order history",
      "Profile and edit profile",
      "Admin product create, edit, and delete",
      "Product image upload",
      "Admin order status management",
      "Responsive design",
    ],
    screenshots: [ruth01, ruth02, ruth03, ruth04, ruth05, ruth06, ruth07],
  },

  {
    title: "MERN Task Management System",
    slug: slugify("MERN Task Management System"),
    desc:
      "A full-stack task management application for creating, assigning, tracking, and reviewing team tasks.",
    overview:
      "The system supports authentication, role-based dashboards, task assignment, progress tracking, comments, file uploads, reviews, and dashboard statistics.",
    image: coverTaskManagement,
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: [
      "React",
      "React Router",
      "Context API",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Multer",
    ],
    features: [
      "User authentication",
      "Role-based access control",
      "Admin dashboard",
      "Supervisor dashboard",
      "User dashboard",
      "Task creation",
      "Task assignment",
      "Progress tracking",
      "Task status updates",
      "File uploads",
      "Comments and reviews",
      "Dashboard statistics",
      "Filtering and sorting",
      "Responsive design",
    ],
    screenshots: [task01, task02, task03, task04, task05, task06, task07],
  },

  {
    title: "Multi-Vendor Marketplace",
    slug: slugify("Multi-Vendor Marketplace"),
    desc:
      "A marketplace platform where vendors can register, add products, manage inventory, and track orders.",
    overview:
      "This platform supports vendor dashboards, product management, order management, customer accounts, and admin approval workflows.",
    image: coverMarketplace,
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
    features: [
      "Vendor registration",
      "Vendor dashboard",
      "Product management",
      "Order management",
      "Admin approval system",
      "Customer accounts",
      "Product search",
      "Role-based access",
    ],
    screenshots: [
      market01,
      market02,
      market03,
      market04,
      market05,
      market06,
      market07,
    ],
  },

  {
    title: "Doctor Appointment System",
    slug: slugify("Doctor Appointment System"),
    desc:
      "A healthcare appointment booking platform where patients can search doctors and book appointments.",
    overview:
      "Patients can browse doctors, view doctor profiles, book appointments, manage appointment history, and access dashboards.",
    image: coverDoctor,
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Doctor listing",
      "Doctor profile page",
      "Appointment booking",
      "User accounts",
      "Appointment history",
      "Doctor dashboard",
      "Admin management",
      "Responsive design",
    ],
    screenshots: [doc01, doc02, doc03, doc04, doc05, doc06, doc07],
  },

  {
    title: "Real-Time Chat Application",
    slug: slugify("Real-Time Chat Application"),
    desc:
      "A real-time messaging application for private conversations and support chat.",
    overview:
      "Users can chat instantly with online status, typing indicators, chat history, authentication, and responsive chat UI.",
    image: coverChat,
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "Socket.IO", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Real-time messaging",
      "Private conversations",
      "Online status",
      "Typing indicators",
      "Chat history",
      "User authentication",
      "Agent dashboard",
      "Responsive chat UI",
    ],
    screenshots: [chat01, chat02, chat03, chat04, chat05, chat06, chat07],
  },

  {
    title: "Movie Application",
    slug: slugify("Movie Application"),
    desc:
      "A movie discovery platform where users can browse movies, search by title, and view movie details.",
    overview:
      "Users can search movies, explore categories, view details, trailers, cast information, and save favorites.",
    image: coverMovie,
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "JavaScript", "REST API", "CSS"],
    features: [
      "Movie search",
      "Category browsing",
      "Movie details page",
      "Trailer section",
      "Cast information",
      "Favorites/watchlist",
      "Responsive design",
    ],
    screenshots: [movie01, movie02, movie03, movie04, movie05, movie06, movie07],
  },
];

export const getProjectBySlug = (slug) =>
  PROJECTS.find((project) => project.slug === slug);