// Libray Imports
import { Typography } from "@mui/material";
import { Routes, Route } from "react-router";
// Container Imports
import ExplorPage from "./containers/ExplorePage.jsx";
import EditPage from "./containers/EditPage.jsx";
import ContactUsPage from "./containers/ContactUsPage.jsx";

function AppRoutes(props)
{

    return (
        <Routes>
            <Route index element={<ExplorPage/>} />

            <Route path="/edit-page" element={<EditPage />} />
            
            <Route path="/contact-page" element={<ContactUsPage />} />
        </Routes>
    )
}

export default AppRoutes;
