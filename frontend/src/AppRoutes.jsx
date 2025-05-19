// Libray Imports
import { Typography } from "@mui/material";
import { Routes, Route } from "react-router";
// Container Imports
import ExplorePage from "./containers/ExplorePage.jsx";
import EditPage from "./containers/EditPage.jsx";
import ContactUsPage from "./containers/ContactUsPage.jsx";

function AppRoutes(props)
{

    return (
        <Routes>
            <Route index element={<ExplorePage />} />

            <Route path="/edit-page" element={<EditPage />} />
            
            <Route path="/contact-page" element={<ContactUsPage />} />

            {/* <Route path="/hello-world" element={<Typography>Hello World!</Typography>} /> */}
        </Routes>
    );
}

export default AppRoutes;
