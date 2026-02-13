// src/data/projectsData.js

// ====== COVER IMAGES (cards) ======
import coverAmazon from "../assets/projects/chat-app.jpg";
import coverMarketplace from "../assets/projects/portfolio66.jpg";
import coverCrm from "../assets/projects/inventoryApp1.jpg";
import coverDoctor from "../assets/projects/social-app.jpg";
import coverChat from "../assets/projects/chatApp1.jpg";
import coverMovie from "../assets/projects/2mernBlogee.jpg";

// ====== AMAZON (7 screenshots) ======
import amazon01 from "../assets/projects/screens/amazon/01-overview.jpg";
import amazon02 from "../assets/projects/screens/amazon/02-product.jpg";
import amazon03 from "../assets/projects/screens/amazon/03-cart.jpg";
import amazon04 from "../assets/projects/screens/amazon/04-checkout.jpg";
import amazon05 from "../assets/projects/screens/amazon/05-orders.jpg";
import amazon06 from "../assets/projects/screens/amazon/06-admin.jpg";
import amazon07 from "../assets/projects/screens/amazon/07-chat.jpg";

// ====== MARKETPLACE (7 screenshots) ======
import market01 from "../assets/projects/screens/marketplace/01-overview.jpg";
import market02 from "../assets/projects/screens/marketplace/02-vendor-signup.jpg";
import market03 from "../assets/projects/screens/marketplace/03-vendor-dashboard.jpg";
import market04 from "../assets/projects/screens/marketplace/04-product-create.jpg";
import market05 from "../assets/projects/screens/marketplace/05-orders.jpg";
import market06 from "../assets/projects/screens/marketplace/06-admin-approval.jpg";
import market07 from "../assets/projects/screens/marketplace/07-payouts.jpg";

// ====== CRM (7 screenshots) ======
import crm01 from "../assets/projects/screens/crm/01-dashboard.jpg";
import crm02 from "../assets/projects/screens/crm/02-customers.jpg";
import crm03 from "../assets/projects/screens/crm/03-pipeline.jpg";
import crm04 from "../assets/projects/screens/crm/04-lead-detail.jpg";
import crm05 from "../assets/projects/screens/crm/05-activity-notes.jpg";
import crm06 from "../assets/projects/screens/crm/06-assignments.jpg";
import crm07 from "../assets/projects/screens/crm/07-analytics.jpg";

// ====== DOCTOR (7 screenshots) ======
import doc01 from "../assets/projects/screens/doctor/01-home.jpg";
import doc02 from "../assets/projects/screens/doctor/02-doctors.jpg";
import doc03 from "../assets/projects/screens/doctor/03-doctor-profile.jpg";
import doc04 from "../assets/projects/screens/doctor/04-booking.jpg";
import doc05 from "../assets/projects/screens/doctor/05-confirmation.jpg";
import doc06 from "../assets/projects/screens/doctor/06-my-appointments.jpg";
import doc07 from "../assets/projects/screens/doctor/07-doctor-dashboard.jpg";

// ====== SUPPORT CHAT (7 screenshots) ======
import chat01 from "../assets/projects/screens/support-chat/01-login.jpg";
import chat02 from "../assets/projects/screens/support-chat/02-chat-list.jpg";
import chat03 from "../assets/projects/screens/support-chat/03-chat-room.jpg";
import chat04 from "../assets/projects/screens/support-chat/04-typing-status.jpg";
import chat05 from "../assets/projects/screens/support-chat/05-presence.jpg";
import chat06 from "../assets/projects/screens/support-chat/06-history.jpg";
import chat07 from "../assets/projects/screens/support-chat/07-agent-dashboard.jpg";

// ====== MOVIE APP (7 screenshots) ======
import movie01 from "../assets/projects/screens/movie/01-home.jpg";
import movie02 from "../assets/projects/screens/movie/02-search.jpg";
import movie03 from "../assets/projects/screens/movie/03-category.jpg";
import movie04 from "../assets/projects/screens/movie/04-details.jpg";
import movie05 from "../assets/projects/screens/movie/05-trailer.jpg";
import movie06 from "../assets/projects/screens/movie/06-cast.jpg";
import movie07 from "../assets/projects/screens/movie/07-favorites.jpg";

// helper: URL-friendly slug
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const makeDoc = ({
  problem = [],
  solution = [],
  keyFeatures = [],
  flows = [],
  collections = [],
  roles = [],
  improvements = [],
} = {}) => ({
  problem,
  solution,
  keyFeatures,
  architecture: {
    overview:
      "React client communicates with a Node/Express REST API. The API enforces authentication and role permissions, and persists domain data in MongoDB.",
    components: [
      { name: "Frontend", detail: "React (Vite), Router, reusable UI components, state management" },
      { name: "Backend", detail: "Node.js + Express REST API, validation middleware, RBAC guards" },
      { name: "Database", detail: "MongoDB collections designed around real domain entities" },
      { name: "Auth", detail: "JWT access token + refresh token strategy (recommended) + protected routes" },
    ],
    flows,
  },
  database: {
    collections,
    notes: [
      "Data is modeled around real business logic and future scalability.",
      "Indexes can be added for search/filter performance.",
    ],
  },
  rbac: {
    roles,
    guards: [
      "Route-level protection in React (private routes / role routes)",
      "Backend middleware checks JWT + role permissions",
    ],
  },
  improvements,
});

export const PROJECTS = [
  {
    title: "Amazon-Style E-Commerce Platform",
    slug: slugify("Amazon-Style E-Commerce Platform"),
    desc: "A full store with products, cart, checkout, user accounts, admin tools, and live chat support.",
    image: coverAmazon,
    gallery: [
      { src: amazon01, alt: "Overview / Landing" },
      { src: amazon02, alt: "Product details" },
      { src: amazon03, alt: "Cart" },
      { src: amazon04, alt: "Checkout" },
      { src: amazon05, alt: "Orders" },
      { src: amazon06, alt: "Admin dashboard" },
      { src: amazon07, alt: "Live chat support" },
    ],
    live: "#",
    code: "https://github.com/yourname/amazon-style-ecommerce",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Stripe (optional)"],
    doc: makeDoc({
      problem: [
        "Portfolio stores must prove real business logic beyond UI.",
        "E-commerce requires secure auth, protected actions, and order workflows.",
        "Recruiters want system thinking: roles, data modeling, flows.",
      ],
      solution: [
        "Built product browsing → cart → checkout → order lifecycle like a real store.",
        "Designed auth and protected routes to support role-based access.",
        "Modeled backend data as domain entities: users, products, orders.",
      ],
      keyFeatures: [
        "Auth: Register/Login/Logout + protected routes",
        "Cart: add/remove/update quantities + totals",
        "Checkout: creates orders + stores purchase history",
        "Orders: history + status tracking",
        "Admin: manage products/orders/users (RBAC-ready)",
      ],
      flows: [
        "User → Login → JWT → Protected pages",
        "Browse → Add to Cart → Checkout → Order created",
        "Admin → Product CRUD → Stock/visibility updates",
      ],
      collections: [
        { name: "users", fields: "name, email, passwordHash, role" },
        { name: "products", fields: "title, price, images, stock, category" },
        { name: "orders", fields: "userId, items[], total, status, paymentRef" },
      ],
      roles: [
        { role: "Customer", access: "Browse, cart, checkout, view orders" },
        { role: "Admin", access: "Manage products, users, orders" },
      ],
      improvements: [
        "Add Stripe payments + webhook confirmation",
        "Add coupons + inventory reservation",
        "Add tests (Jest/Supertest) + structured logging",
      ],
    }),
  },

  {
    title: "Multi-Vendor Marketplace",
    slug: slugify("Multi-Vendor Marketplace"),
    desc: "Vendors can sign up, add products, track orders, and manage payouts via a single platform.",
    image: coverMarketplace,
    gallery: [
      { src: market01, alt: "Marketplace overview" },
      { src: market02, alt: "Vendor signup" },
      { src: market03, alt: "Vendor dashboard" },
      { src: market04, alt: "Create product" },
      { src: market05, alt: "Orders management" },
      { src: market06, alt: "Admin approvals" },
      { src: market07, alt: "Payouts & settlements" },
    ],
    live: "#",
    code: "https://github.com/yourname/multi-vendor-marketplace",
    stack: ["React", "Node.js", "Express", "MongoDB", "RBAC"],
    doc: makeDoc({
      problem: [
        "Marketplace apps require multi-role separation (Admin/Vendor/Customer).",
        "Vendors need dashboards to manage products, inventory, and orders.",
        "Approvals and trust boundaries are required.",
      ],
      solution: [
        "Designed vendor onboarding + approval workflow.",
        "Separated vendor vs customer capabilities using RBAC.",
        "Modeled domain for growth (vendor split orders + payouts).",
      ],
      keyFeatures: [
        "Vendor onboarding + profile management",
        "Vendor product CRUD + inventory control",
        "Admin approvals (vendor/product)",
        "Order ownership split by vendor (concept)",
        "Payouts/settlements model (concept)",
      ],
      flows: [
        "Vendor → Register → Await approval → Vendor dashboard",
        "Vendor → Add product → Admin approval → Product listed",
        "Customer → Order → Vendor sees only their items (concept)",
      ],
      collections: [
        { name: "users", fields: "name, email, passwordHash, role" },
        { name: "vendors", fields: "userId, status, payoutInfo" },
        { name: "products", fields: "vendorId, title, price, stock, status" },
        { name: "orders", fields: "items[], vendorSplit[], status" },
      ],
      roles: [
        { role: "Customer", access: "Browse, purchase, view orders" },
        { role: "Vendor", access: "Manage own products, view own orders" },
        { role: "Admin", access: "Approve vendors/products, manage all orders" },
      ],
      improvements: [
        "Add payout engine + vendor settlements",
        "Add messaging between customer/vendor",
        "Add vendor analytics dashboard",
      ],
    }),
  },

  {
    title: "CRM System",
    slug: slugify("CRM System"),
    desc: "Manage customer profiles, sales pipeline, notes, reminders, assignments, and analytics.",
    image: coverCrm,
    gallery: [
      { src: crm01, alt: "CRM dashboard" },
      { src: crm02, alt: "Customers list" },
      { src: crm03, alt: "Pipeline board" },
      { src: crm04, alt: "Lead details" },
      { src: crm05, alt: "Activity & notes" },
      { src: crm06, alt: "Assignments" },
      { src: crm07, alt: "Analytics" },
    ],
    live: "#",
    code: "https://github.com/yourname/crm-system",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    doc: makeDoc({
      problem: [
        "Sales teams need a clear pipeline with ownership and activity history.",
        "CRM requires audit-friendly notes and assignment rules.",
      ],
      solution: [
        "Modeled pipeline stages and activity logs like real CRM workflows.",
        "Designed the system to support admin vs agent roles.",
      ],
      keyFeatures: [
        "Customer profiles + notes/activity logs",
        "Pipeline stages (Lead → Qualified → Won/Lost)",
        "Assignments + reminders (concept)",
        "Analytics dashboard (concept)",
      ],
      flows: [
        "Lead created → Stage updates → Activity logs recorded",
        "Agent assigned → Updates lead → Notes tracked",
      ],
      collections: [
        { name: "customers", fields: "name, email, phone, company, tags[]" },
        { name: "leads", fields: "customerId, stage, value, ownerId" },
        { name: "activities", fields: "leadId, type, note, createdAt" },
      ],
      roles: [
        { role: "Agent", access: "Manage assigned leads, add activities" },
        { role: "Admin", access: "Manage users/leads, view reports" },
      ],
      improvements: [
        "Add email templates + reminders",
        "Add team-based permissions",
        "Add exports + reporting module",
      ],
    }),
  },

  {
    title: "Doctor Appointment Booking App",
    slug: slugify("Doctor Appointment Booking App"),
    desc: "Patients can book appointments, manage profiles, message doctors, and receive notifications.",
    image: coverDoctor,
    gallery: [
      { src: doc01, alt: "Home" },
      { src: doc02, alt: "Doctors list" },
      { src: doc03, alt: "Doctor profile" },
      { src: doc04, alt: "Booking flow" },
      { src: doc05, alt: "Confirmation" },
      { src: doc06, alt: "My appointments" },
      { src: doc07, alt: "Doctor dashboard" },
    ],
    live: "#",
    code: "https://github.com/yourname/doctor-appointment-booking",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    doc: makeDoc({
      problem: [
        "Scheduling systems require time-slot rules and conflict prevention.",
        "Multiple roles require separate capabilities.",
      ],
      solution: [
        "Designed booking flow with slot validation (concept).",
        "Separated patient/doctor/admin actions using RBAC.",
      ],
      keyFeatures: [
        "Browse doctors + profiles",
        "Book/reschedule/cancel appointments (concept)",
        "Patient appointment history",
        "Doctor availability management (concept)",
      ],
      flows: [
        "Patient → Choose doctor → Pick slot → Confirm booking",
        "Doctor → Manage availability → Approve/deny (concept)",
      ],
      collections: [
        { name: "doctors", fields: "name, specialty, availability[]" },
        { name: "patients", fields: "name, contact, history[]" },
        { name: "appointments", fields: "doctorId, patientId, time, status" },
      ],
      roles: [
        { role: "Patient", access: "Book, view, cancel appointments" },
        { role: "Doctor", access: "Manage schedule, view appointments" },
        { role: "Admin", access: "Manage users and appointments" },
      ],
      improvements: [
        "Add SMS/email notifications",
        "Add payment + invoices",
        "Add calendar integration",
      ],
    }),
  },

  {
    title: "Real-Time Support Chat App",
    slug: slugify("Real-Time Support Chat App"),
    desc: "A live chat system with online status, typing indicators, and saved conversation history.",
    image: coverChat,
    gallery: [
      { src: chat01, alt: "Login" },
      { src: chat02, alt: "Chat list" },
      { src: chat03, alt: "Chat room" },
      { src: chat04, alt: "Typing status" },
      { src: chat05, alt: "Presence" },
      { src: chat06, alt: "Conversation history" },
      { src: chat07, alt: "Agent dashboard" },
    ],
    live: "#",
    code: "https://github.com/yourname/real-time-support-chat",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO (optional)"],
    doc: makeDoc({
      problem: [
        "Support chat requires real-time messaging and persistence.",
        "Agents and customers have different permissions and views.",
      ],
      solution: [
        "Designed chat architecture for realtime UX and history storage.",
        "Structured roles for agent workflows.",
      ],
      keyFeatures: [
        "Realtime messaging (Socket.IO concept)",
        "Typing indicators + presence (concept)",
        "Conversation history persistence",
        "Agent dashboard for multiple chats (concept)",
      ],
      flows: [
        "Customer opens chat → Agent joins → Messages saved",
        "Agent resolves chat → Conversation archived (concept)",
      ],
      collections: [
        { name: "conversations", fields: "participants[], status, createdAt" },
        { name: "messages", fields: "conversationId, senderId, text, createdAt" },
      ],
      roles: [
        { role: "Customer", access: "Chat with support, view own history" },
        { role: "Agent", access: "Handle chats, resolve/archive conversations" },
        { role: "Admin", access: "Monitor, manage agents, analytics" },
      ],
      improvements: [
        "Add file uploads in chat",
        "Add SLA timers + assignment rules",
        "Add analytics dashboard",
      ],
    }),
  },

  {
    title: "Movie App",
    slug: slugify("Movie App"),
    desc: "Browse movies, search by category, view detailed pages, and explore featured collections.",
    image: coverMovie,
    gallery: [
      { src: movie01, alt: "Home" },
      { src: movie02, alt: "Search" },
      { src: movie03, alt: "Category browsing" },
      { src: movie04, alt: "Movie details" },
      { src: movie05, alt: "Trailer" },
      { src: movie06, alt: "Cast" },
      { src: movie07, alt: "Favorites/watchlist (concept)" },
    ],
    live: "#",
    code: "https://github.com/yourname/movie-app",
    stack: ["React", "API Integration"],
    doc: makeDoc({
      problem: [
        "API apps need clean routing and fast UI for browsing.",
        "Detail pages must be structured and shareable.",
      ],
      solution: [
        "Built list routes and detail routes like a real app.",
        "Prepared UI structure for filters, caching, and expansion.",
      ],
      keyFeatures: [
        "Search and category browsing",
        "Movie detail pages",
        "Featured collections (concept)",
      ],
      flows: [
        "User searches → results → details page",
        "User browses category → list → details page",
      ],
      collections: [
        { name: "N/A", fields: "Uses external API (optional caching server)" },
      ],
      roles: [
        { role: "User", access: "Browse/search/view movie details" },
      ],
      improvements: [
        "Add server-side caching layer",
        "Add watchlist with auth",
        "Add skeleton loading + infinite scroll",
      ],
    }),
  },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
