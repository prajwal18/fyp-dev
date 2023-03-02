import ProfileImage from '@/components/Common/components/ProfileImage';
import {
    TableHeadPT
} from './CustomTypes';


export const PeopleHeadData: Array<TableHeadPT> = [
    {
        name: "S.N"
    },
    {
        name: "Profile"
    },
    {
        name: 'Role'
    },
    {
        name: "Name",
    },
    {
        name: "Email",
    },
    {
        name: "Actions"
    }
];
export const AssignmentHeadData: Array<TableHeadPT> = [
    {
        name: 'Name'
    },
    {
        name: 'Course'
    },
    {
        name: 'Status'
    },
    {
        name: 'Due Date'
    },
    {
        name: 'Total'
    },
    {
        name: 'Obtained'
    },
    {
        name: 'Actions'
    },
];

export const TestHeadData: Array<TableHeadPT> = [
    {
        name: 'Name'
    },
    {
        name: 'Course'
    },
    {
        name: 'Status'
    },
    {
        name: 'Due Date'
    },
    {
        name: 'Total'
    },
    {
        name: 'Obtained'
    },
    {
        name: 'Actions'
    }
];


export const PeopleBodyData = [
    {
        profile: <ProfileImage/>,
        role: 'Student',
        name: 'Rajan Don',
        email: 'chota@gmail.com' 
    },
    {
        profile: <ProfileImage/>,
        role: 'Teacher',
        name: 'Komal Kanpur',
        email: 'chetan@gmail.com' 
    },
    {
        profile: <ProfileImage/>,
        role: 'Teacher',
        name: 'Don Man Bing',
        email: 'saroj@gmail.com' 
    },
    {
        profile: <ProfileImage/>,
        role: 'Student',
        name: 'Bossman Ross',
        email: 'suraj@gmail.com' 
    },
    {
        profile: <ProfileImage/>,
        role: 'Student',
        name: 'Mobies Design',
        email: 'kumar@gmail.com' 
    },
    {
        profile: <ProfileImage/>,
        role: 'Teacher',
        name: 'Rajan Don',
        email: 'ganesh@gmail.com' 
    }
];
export const AssignmentBodyData = [{
    "name": "Gale Dahlman",
    "course": "France",
    "status": 'TODO',
    "due_date": "2/18/2023",
    "total": 100,
    "obtained": null
  }, {
    "name": "Bev Clover",
    "course": "Poland",
    "status": "SUBMITED",
    "due_date": "4/6/2022",
    "total": 100,
    "obtained": null
  }, {
    "name": "Lanae Niesing",
    "course": "Portugal",
    "status": 'GRADED',
    "due_date": "8/22/2022",
    "total": 100,
    "obtained": 91
  }, {
    "name": "Suzi D'Elias",
    "course": "Indonesia",
    "status": 'TODO',
    "due_date": "9/20/2022",
    "total": 100,
    "obtained": null
  }, {
    "name": "Melitta Addenbrooke",
    "course": "South Africa",
    "status": 'GRADED',
    "due_date": "7/21/2022",
    "total": 100,
    "obtained": 75
  }, {
    "name": "Josey Spurge",
    "course": "Ukraine",
    "status": 'GRADED',
    "due_date": "4/25/2022",
    "total": 100,
    "obtained": 12
  }, {
    "name": "Titus Howard",
    "course": "Peru",
    "status": 'SUBMITED',
    "due_date": "10/27/2022",
    "total": 100,
    "obtained": null
  }, {
    "name": "Janel Izkoveski",
    "course": "Russia",
    "status": 'TODO',
    "due_date": "9/1/2022",
    "total": 100,
    "obtained": null
  }, {
    "name": "Dallon Zannolli",
    "course": "Portugal",
    "status": 'GRADED',
    "due_date": "12/23/2022",
    "total": 100,
    "obtained": 29
  }, {
    "name": "Kaine Kuscha",
    "course": "Ethiopia",
    "status": 'GRADED',
    "due_date": "4/27/2022",
    "total": 100,
    "obtained": 68
  }]
  