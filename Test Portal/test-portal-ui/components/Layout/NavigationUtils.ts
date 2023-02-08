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
        name: "Dashboard",
        path: "/Student/Dashboard",                 // These Links will be chaged
        icon: DashboardIcon
    },
    {
        name: "Progress",
        path: "/Student/Progress",                  // These Links will be changed
        icon: BarChartSharpIcon
    }
];

export const teacherSidebarData = [
    {
        name: "Dashboard",
        path: "/Teacher/Dashboard",                 // These Links will be chaged
        icon: DashboardIcon
    },
    {
        name: "Create Test",
        path: "/Teacher/CreateTest",                // These Links will be changed
        icon: NoteAddIcon
    },
    {
        name: "Grade Test",
        path: "/Teacher/GradeTest",                 // These Links will be changed
        icon: GradingIcon
    },
    {
        name: "History",
        path: "/Teacher/History",                   // These Links will be changed
        icon: ManageSearchIcon
    }
];