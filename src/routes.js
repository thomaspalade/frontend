// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Faq from "views/Faq/Faq.js";
import Contact from "views/Contact/Contact.js";
import PdfViewer from "views/Icons/Icons.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import Feedback from "views/Feedback/Feedback.js";
import AboutUs from "views/AboutUs/AboutUs.js";
import Album from "components/Album/Album.js";
import Login from "components/Login.js";
import Register from "components/Register.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/contact",
    name: "Contact",
    icon: LibraryBooks,
    component: Contact,
    layout: "/admin"
  },
  {
    path: "/faq",
    name: "FAQ",
    icon: "content_paste",
    component: Faq,
    layout: "/admin"
  },
  {
    path: "/pdfviewer",
    name: "Icons",
    icon: BubbleChart,
    component: PdfViewer,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/album",
    name: "Album",
    icon: Person,
    component: Album,
    layout: "/admin"
  }, 
  {
    path: "/login",
    name: "Login",
    icon: Person,
    component: Login,
    layout: "/admin"
  },
  {
    path: "/register",
    name: "Register",
    icon: Person,
    component: Register,
    layout: "/admin"
  },
  {
    path: "/aboutus",
    name: "About us",
    icon: Person,
    component: AboutUs,
    layout: "/admin"
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: Person,
    component: Feedback,
    layout: "/admin"
  }
];

export default dashboardRoutes;
