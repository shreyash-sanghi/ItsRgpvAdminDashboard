import Achievements from "../pages/Achievements";
import AddAchievement from "../pages/AddAchievement";
import AddBook from "../pages/Addbook";
import AddClub from "../pages/addclub";
import AdviceAndDemand from "../pages/AdviceAndDemand";
import Books from "../pages/Books";
import Clubs from "../pages/Clubs";
import Dashboard from "../pages/Dashboard";
import DepartmentImage from "../pages/DepartmentImage";
import DepartmentInfo from "../pages/DepartmentInfo";
import Departments from "../pages/Departments";
import Fests from "../pages/Fests";
import ReelsAndVideo from "../pages/ReelsAndVideo";
import AddFest from "../pages/AddFest"
import Roles from "../pages/Roles"
import AddStartups from "../components/startups/addStartups";
import Startups from "../components/startups/Startups";
import AddPlacementData from "../components/placements/addPlacementData";
import Placement from "../components/placements/placement";
import users from "../components/users/users";
import AddUsers from "../components/users/addUsers";
import AddEvents from "../components/events/addevent"
import Event from "../components/events/events";
import HostelInfo from "../components/hostels/hostel";
import AddHostelInfo from "../components/hostels/addhostel";
import Pyq from "../components/pyqs/Pyq";
import AddPyq from "../components/pyqs/addPyq";
import Notes from "../components/notes/Notes";
import AddNotes from "../components/notes/addnotes";
import Scholarships from "../components/scholerships/scholership";
import AddScholarships from "../components/scholerships/addscholarships"
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/all-events', // the url
    component: Event, // view rendered
  },

  {
    path: '/add-event', // the url
    component: AddEvents, // view rendered
  },

  {
    path: '/department-photo',
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
    path: '/advice-and-demand',
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
    path: '/reels-and-video',
    component: ReelsAndVideo,
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
    component: AddStartups,
  },
  {
    path: '/startups',
    component: Startups,
  },
  {
    path: '/add-users',
    component: AddUsers,
  },
  {
    path: '/all-users',
    component: users,
  },
  
  // Dynamic option
  {
    path: '/roles',
    component: Roles,
  },
  
];

export default routes;

