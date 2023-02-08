// MUI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import GradingIcon from '@mui/icons-material/Grading';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
// MUI Icons

// Returns true if the href contains the provided argument
export const isCurrentLocation = (currentPath: string, path: string) => {
    return currentPath.includes(path);
}


export const studentSidebarData = [
    {
        name: "Upcomming",
        path: "/Student/Upcomming",                 // These Links will be chaged
        icon: DashboardIcon
    },
    {
        name: "Submit",
        path: "/Student/Submit",                    // These Links will be changed
        icon: BarChartSharpIcon
    }
];

export const teacherSidebarData = [
    {
        name: "Create",
        path: "/Teacher/Create",                 // These Links will be chaged
        icon: DashboardIcon
    },
    {
        name: "History",
        path: "/Teacher/History",                // These Links will be changed
        icon: NoteAddIcon
    },
    {
        name: "Grade Assignment",
        path: "/Teacher/Grade",                 // These Links will be changed
        icon: GradingIcon
    }
];