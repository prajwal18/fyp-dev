import { createContext, useContext } from "react";

// Importing all other context
import { AdminContext } from "./AdminContext";
import { CourseContext } from "./CourseContext";
import { FacultyContext } from "./FacultyContext";
import { StudentContext } from "./StudentContext";
import { TeacherContext } from "./TeacherContext";
// Importing all other context

const AppContext = createContext<any>({}) // Change the any value when the portal is completed

const AppContextContainer = ({ children }: { children: JSX.Element | Array<JSX.Element> }) => {
    // Consuming all the contexts
    // Consuming all the contexts
    return (
        <AppContext.Provider value={{ name: 'raj' }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextContainer;