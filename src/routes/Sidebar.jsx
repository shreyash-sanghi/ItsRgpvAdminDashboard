import { MdDashboard, MdEvent, MdApartment, MdStar, MdBook, MdPerson, MdVideoLibrary, MdSchool, MdLayers, MdTextFields, MdDateRange, MdBarChart, MdGroup, MdOutlineCategory, MdImage, MdInfo } from "react-icons/md";

const routes = [
  {
    path: '/',
    icon: <MdStar className="w-6 h-6" />,
    name: 'Achievements',
    submenu: [
      {
        path: '/all-achievements',
        icon: <MdImage className="w-4 h-4" />,
        name: 'All Achievements',
      },
      {
        path: '/add-achievements',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Achievements',
      },
    ]
  },
  {
    path: '/',
    icon: <MdLayers className="w-6 h-6" />,
    name: 'Advice and Demand',
    submenu: [
      {
        path: '/all-advice-and-demand',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Advice and Demand',
      },
      {
        path: '/add-advice-and-demand',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Advice and Demand',
      },
    ]
  },
  {
    path: '/',
    icon: <MdBook className="w-6 h-6" />,
    name: 'Books',
    submenu: [
      {
        path: '/all-books',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Books',
      },
      {
        path: '/add-book',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Book',
      },
    ]
  },
  {
    path: '/clubs',
    icon: <MdGroup className="w-6 h-6" />,
    name: 'Clubs',
    submenu: [
      {
        path: '/all-clubs',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Clubs',
      },
      {
        path: '/add-club',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Club',
      },
    ]
  },
  // {
  //   path: '/dashboard',
  //   icon: <MdDashboard className="w-6 h-6" />,
  //   name: 'Dashboard',
  // },
  {
    path: '',
    icon: <MdApartment className="w-6 h-6" />,
    name: 'Departments',
    submenu: [
      {
        path: '/department-image',
        icon: <MdImage className="w-6 h-6" />,
        name: 'Department Image',
      },
      {
        path: '/department-info',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Department Info',
      },
    ],
  },
  {
    path: '/',
    icon: <MdEvent className="w-6 h-6" />,
    name: 'Event Management',
    submenu: [
      {
        path: '/all-events',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All  Events',
      },
      {
        path: '/add-event',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Event',
      },
    ]
  },
  {
    path: '/',
    icon: <MdStar className="w-6 h-6" />,
    name: 'Fests',
    submenu: [
      {
        path: '/add-fests',
        icon: <MdImage className="w-6 h-6" />,
        name: 'Add fests',
      },
      {
        path: '/fests',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Fests',
      },
    ],

  },
  {
    path: '/',
    icon: <MdOutlineCategory className="w-6 h-6" />,
    name: 'Hostel Info',
    submenu: [
      {
        path: '/all-hostel-info',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Hostel Info',
      },
      {
        path: '/add-hostel-info',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Hostel Info',
      },
    ]
  },
  {
    path: '/',
    icon: <MdTextFields className="w-6 h-6" />,
    name: 'Notes',
    submenu: [
      {
        path: '/all-notes',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Notes',
      },
      {
        path: '/add-notes',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Notes',
      },
    ]
  },
  {
    path: '/',
    icon: <MdBarChart className="w-6 h-6" />,
    name: 'Placement Data',
    submenu: [
      {
        path: '/all-placement-data',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Placement Data',
      },
      {
        path: '/add-placement-data',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Placement Data',
      },
    ]
  },
  {
    path: '/',
    icon: <MdBook className="w-6 h-6" />,
    name: 'Pyq',
    submenu: [
      {
        path: '/all-pyq',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Pyq',
      },
      {
        path: '/add-pyq',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Pyq',
      },
    ]
  },
  {
    path: '/reels-and-video',
    icon: <MdVideoLibrary className="w-6 h-6" />,
    name: 'Reels and Video',
    submenu: [
      {
        path: '/all-reels-and-video',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Reels and Video',
      },
      {
        path: '/add-reels-and-video',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Reels and Video',
      },
    ]

  },
  {
    path: '/',
    icon: <MdSchool className="w-6 h-6" />,
    name: 'Scholarships',
    submenu: [
      {
        path: '/all-scholarships',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Scholarships',
      },
      {
        path: '/add-scholarships',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Scholarships',
      },
    ]
  },
  {
    path: '/',
    icon: <MdStar className="w-6 h-6" />,
    name: 'Startups',
    submenu: [
      {
        path: '/add-Startups',
        icon: <MdImage className="w-6 h-6" />,
        name: 'Add Startups',
      },
      {
        path: '/Startups',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Startups',
      },
    ],

  },

  {
    path: '/',
    icon: <MdPerson className="w-6 h-6" />,
    name: 'Users',
    submenu: [
      {
        path: '/all-users',
        icon: <MdImage className="w-6 h-6" />,
        name: 'All Users',
      },
      {
        path: '/add-users',
        icon: <MdInfo className="w-6 h-6" />,
        name: 'Add Users',
      },
    ]
  },
  {
    path: '/',
    icon: <MdPerson className="w-6 h-6" />,
    name: 'Dynamic Option',
    submenu: [
      {
        path: '/roles',
        icon: <MdImage className="w-3 h-3" />,
        name: 'Roles',
      },
    ]
  },
  {
    path: '/',
    icon: <MdPerson className="w-6 h-6" />,
    name: 'Drop'
  },
];

export default routes;
