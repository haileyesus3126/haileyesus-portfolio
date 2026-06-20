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

const makeDoc = ({ keyFeatures = [] } = {}) => ({
  problem: [],
  solution: [],
  keyFeatures,
  architecture: {
    overview: "",
    components: [],
    flows: [],
  },
  database: {
    collections: [],
    notes: [],
  },
  rbac: {
    roles: [],
    guards: [],
  },
  improvements: [],
});

export const PROJECTS = [
  {
    title: "Ruth Store E-Commerce Platform",
    slug: slugify("Ruth Store E-Commerce Platform"),
    desc:
      "A full-stack MERN e-commerce platform for selling gifts, greeting cards, keepsakes, and special occasion products. Customers can browse products, add items to cart and wishlist, place orders, and manage their profile. Admins can manage products, upload images, and update orders.",
    image: coverRuthStore,
    gallery: [
      { src: ruth01, alt: "Home page" },
      { src: ruth02, alt: "Product details page" },
      { src: ruth03, alt: "Shopping cart" },
      { src: ruth04, alt: "Checkout page" },
      { src: ruth05, alt: "Orders page" },
      { src: ruth06, alt: "Admin product management" },
      { src: ruth07, alt: "Admin dashboard" },
    ],
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
    doc: makeDoc({
      keyFeatures: [
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
    }),
  },

  {
    title: "MERN Task Management System",
    slug: slugify("MERN Task Management System"),
    desc:
      "A full-stack task management application where admins and team members can create, assign, track, and manage tasks. The system supports role-based access, progress tracking, file uploads, comments, reviews, and dashboards.",
    image: coverTaskManagement,
    gallery: [
      { src: task01, alt: "Dashboard" },
      { src: task02, alt: "User management" },
      { src: task03, alt: "Task list" },
      { src: task04, alt: "Task details" },
      { src: task05, alt: "Comments and activity" },
      { src: task06, alt: "Task assignment" },
      { src: task07, alt: "Analytics dashboard" },
    ],
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
    doc: makeDoc({
      keyFeatures: [
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
    }),
  },

  {
    title: "Multi-Vendor Marketplace",
    slug: slugify("Multi-Vendor Marketplace"),
    desc:
      "A marketplace platform where vendors can register, add products, manage inventory, and track orders from a dedicated vendor dashboard.",
    image: coverMarketplace,
    gallery: [
      { src: market01, alt: "Marketplace overview" },
      { src: market02, alt: "Vendor signup" },
      { src: market03, alt: "Vendor dashboard" },
      { src: market04, alt: "Create product" },
      { src: market05, alt: "Orders management" },
      { src: market06, alt: "Admin approvals" },
      { src: market07, alt: "Payouts" },
    ],
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
    doc: makeDoc({
      keyFeatures: [
        "Vendor registration",
        "Vendor dashboard",
        "Product management",
        "Order management",
        "Admin approval system",
        "Customer accounts",
        "Product search",
        "Role-based access",
      ],
    }),
  },

  {
    title: "Doctor Appointment System",
    slug: slugify("Doctor Appointment System"),
    desc:
      "A healthcare appointment booking platform where patients can search doctors, view doctor profiles, book appointments, and manage their schedules.",
    image: coverDoctor,
    gallery: [
      { src: doc01, alt: "Home page" },
      { src: doc02, alt: "Doctors list" },
      { src: doc03, alt: "Doctor profile" },
      { src: doc04, alt: "Booking flow" },
      { src: doc05, alt: "Booking confirmation" },
      { src: doc06, alt: "My appointments" },
      { src: doc07, alt: "Doctor dashboard" },
    ],
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    doc: makeDoc({
      keyFeatures: [
        "Doctor listing",
        "Doctor profile page",
        "Appointment booking",
        "User accounts",
        "Appointment history",
        "Doctor dashboard",
        "Admin management",
        "Responsive design",
      ],
    }),
  },

  {
    title: "Real-Time Chat Application",
    slug: slugify("Real-Time Chat Application"),
    desc:
      "A real-time messaging application that allows users to communicate instantly through private conversations with online status, typing indicators, and saved chat history.",
    image: coverChat,
    gallery: [
      { src: chat01, alt: "Login page" },
      { src: chat02, alt: "Chat list" },
      { src: chat03, alt: "Chat room" },
      { src: chat04, alt: "Typing status" },
      { src: chat05, alt: "Online presence" },
      { src: chat06, alt: "Chat history" },
      { src: chat07, alt: "Agent dashboard" },
    ],
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "Socket.IO", "Node.js", "Express.js", "MongoDB"],
    doc: makeDoc({
      keyFeatures: [
        "Real-time messaging",
        "Private conversations",
        "Online status",
        "Typing indicators",
        "Chat history",
        "User authentication",
        "Agent dashboard",
        "Responsive chat UI",
      ],
    }),
  },

  {
    title: "Movie Application",
    slug: slugify("Movie Application"),
    desc:
      "A movie discovery platform where users can browse movies, search by title, view movie details, explore categories, and save favorites.",
    image: coverMovie,
    gallery: [
      { src: movie01, alt: "Home page" },
      { src: movie02, alt: "Search results" },
      { src: movie03, alt: "Category browsing" },
      { src: movie04, alt: "Movie details" },
      { src: movie05, alt: "Trailer section" },
      { src: movie06, alt: "Cast section" },
      { src: movie07, alt: "Favorites page" },
    ],
    live: LIVE_URL,
    code: GITHUB_URL,
    stack: ["React", "JavaScript", "REST API", "CSS"],
    doc: makeDoc({
      keyFeatures: [
        "Movie search",
        "Category browsing",
        "Movie details page",
        "Trailer section",
        "Cast information",
        "Favorites/watchlist",
        "Responsive design",
      ],
    }),
  },
];

export const getProjectBySlug = (slug) =>
  PROJECTS.find((project) => project.slug === slug);