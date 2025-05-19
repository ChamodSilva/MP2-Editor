import "./css/App.css";
import AppRoutes from "./AppRoutes.jsx";
import { Container } from "@mui/material";
import Navigation from "./components/Navigation.jsx"


function App()
{
    return (
        <>
            <Navigation />
            <Container sx={{display: "flex", height: "80vh", width: "80vw"}}>
                <AppRoutes />
            </Container>
        </>
    );
}

export default App;
