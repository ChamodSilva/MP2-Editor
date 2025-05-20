import { Routes, Route } from 'react-router-dom';
import ExplorePage from './containers/ExplorePage.jsx';
import EditPage from './containers/EditPage.jsx';
import ContactUsPage from './containers/ContactUsPage.jsx';

function AppRoutes({ loggedInUser, userPassword }) {
    return (
        <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route
                path="/edit-page"
                element={<EditPage loggedInUser={loggedInUser} userPassword={userPassword} />}
            />
            <Route path="/contact-page" element={<ContactUsPage />} />
        </Routes>
    );
}

export default AppRoutes;