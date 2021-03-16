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
import PendingDocuments from "views/PendingDocuments/PendingDocuments.js";
import RejectedDocuments from "views/RejectedDocuments/RejectedDocuments.js";
import RequestDocument from "views/RequestDocument/RequestDocument.js";
import PublicCodes from "views/PublicCodes/PublicCodes.js";
import AboutUs from "views/AboutUs/AboutUs.js";
import Album from "components/Album/Album.js";
import Upload from "components/Upload/Upload.js";
import EditFile from "components/EditFile/EditFile.js";
import Login from "components/Login.js";
import Register from "components/Register.js";
import ResetPassword from "components/ResetPassword.js";
import ResetPasswordPage from "components/ResetPasswordPage.js";

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
    path: "/album",
    name: "My Documents",
    icon: Person,
    component: Album,
    layout: "/admin"
  },
  {
    path: "/upload",
    name: "Upload Document",
    icon: Person,
    component: Upload,
    layout: "/admin"
  },
  {
    path: "/request",
    name: "Request Document",
    icon: Person,
    component: RequestDocument,
    layout: "/admin"
  },
  {
    path: "/pending",
    name: "Pending Documents",
    icon: Person,
    component: PendingDocuments,
    layout: "/admin"
  },
  {
    path: "/rejected",
    name: "Rejected Documents",
    icon: Person,
    component: RejectedDocuments,
    layout: "/admin"
  },
  {
    path: "/publiccodes",
    name: "Public Codes",
    icon: Person,
    component: PublicCodes,
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
    path: "/aboutus",
    name: "About us",
    icon: Person,
    component: AboutUs,
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
    path: "/feedback",
    name: "Feedback",
    icon: Person,
    component: Feedback,
    layout: "/admin"
  },
  /*
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
  */
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
    path: "/resetpasswordpage",
    name: "Reset Password Page",
    icon: Person,
    component: ResetPasswordPage,
    layout: "/admin"
  },
  {
    path: "/resetpassword/:id",
    name: "Reset Password",
    icon: Person,
    component: ResetPassword,
    layout: "/admin"
  },
  {
    path: "/edit/:id",
    name: "Edit File",
    icon: Person,
    component: EditFile,
    layout: "/admin"
  }
];

export default dashboardRoutes;
