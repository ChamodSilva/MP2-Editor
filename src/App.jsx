import "./App.css";
import AppRoutes from "./AppRoutes";
import { Container } from "@mui/material";

function App()
{
    return (
        <>
            <Container sx={{display: "flex", height: "90vh"}}>
                <AppRoutes />
            </Container>
        </>
    );
}

export default App;
