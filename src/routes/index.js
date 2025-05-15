import Achievements from "../pages/achievements/Achievements";
import AddAchievement from "../pages/achievements/AddAchievement";
import AddBook from "../pages/books/Addbook";
import AddClub from "../pages/clubs/Addclub";
import AllAdvice from "../pages/advicendemand/AllAdvice";
import AdviceAndDemand from "../pages/advicendemand/AdviceAndDemand";
import Books from "../pages/books/Books";
import Clubs from "../pages/clubs/Clubs";
import Dashboard from "../pages/Dashboard";
import DepartmentImage from "../pages/department/DepartmentImage";
import DepartmentInfo from "../pages/department/DepartmentInfo";
import Departments from "../pages/department/Departments";
import Fests from "../pages/fests/Fests";
import ReelsAndVideo from "../pages/reelsnvideos/ReelsAndVideo";
import AddReelsAndVideo from "../pages/reelsnvideos/AddReelsAndVideo";
import AddFest from "../pages/fests/AddFest";
import Roles from "../pages/dynamicoption/Roles";
import AddStartup from "../pages/startups/addstartup";
import Startups from "../pages/startups/startups";
import AddPlacementData from "../pages/placements/addPlacementData";
import Placement from "../pages/placements/placement";
import UsersPage from "../pages/users/users";
import AddUserPage from "../pages/users/adduser";
import AddEvents from "../pages/events/addevent";
import Event from "../pages/events/events";
import HostelInfo from "../pages/hostels/hostel";
import AddHostelInfo from "../pages/hostels/addhostel";
import Pyq from "../pages/pyqs/pyq";
import AddPyq from "../pages/pyqs/addPyq";
import Notes from "../pages/notes/notes";
import AddNotes from "../pages/notes/addnotes";
import Scholarships from "../pages/scholarships/Scholarship";
import AddScholarships from "../pages/scholarships/Addscholarships";

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/all-events',
    component: Event,
  },
  {
    path: '/add-event',
    component: AddEvents,
  },
  {
    path: '/department-image',
    component: DepartmentImage,
  },
  {
    path: '/department-info',
    component: DepartmentInfo,
  },
  {
    path: '/all-achievements',
    component: Achievements,
  },
  {
    path: '/add-achievements',
    component: AddAchievement,
  },
  {
    path: '/all-advice-and-demand',
    component: AllAdvice,
  },
  {
    path: '/add-advice-and-demand',
    component: AdviceAndDemand,
  },
  {
    path: '/all-books',
    component: Books,
  },
  {
    path: '/add-book',
    component: AddBook,
  },
  {
    path: '/all-clubs',
    component: Clubs,
  },
  {
    path: '/add-club',
    component: AddClub,
  },
  {
    path: '/fests',
    component: Fests,
  },
  {
    path: '/add-fests',
    component: AddFest,
  },
  {
    path: '/all-hostel-info',
    component: HostelInfo,
  },
  {
    path: '/add-hostel-info',
    component: AddHostelInfo,
  },
  {
    path: '/all-notes',
    component: Notes,
  },
  {
    path: '/add-notes',
    component: AddNotes,
  },
  {
    path: '/all-placement-data',
    component: Placement,
  },
  {
    path: '/add-placement-data',
    component: AddPlacementData,
  },
  {
    path: '/all-pyq',
    component: Pyq,
  },
  {
    path: '/add-pyq',
    component: AddPyq,
  },
  {
    path: '/all-reels-and-video',
    component: ReelsAndVideo,
  },
  {
    path: '/add-reels-and-video',
    component: AddReelsAndVideo,
  },
  {
    path: '/all-scholarships',
    component: Scholarships,
  },
  {
    path: '/add-scholarships',
    component: AddScholarships,
  },
  {
    path: '/add-startups',
    component: AddStartup,
  },
  {
    path: '/startups',
    component: Startups,
  },
  {
    path: '/add-users',
    component: AddUserPage,
  },
  {
    path: '/all-users',
    component: UsersPage,
  },
  {
    path: '/roles',
    component: Roles,
  },
];

export default routes;

