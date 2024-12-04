import {
    Stack,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetExhibit } from "../gql/exhibits";
import { useAuthStore } from "../stores/Auth.store";

export const ExhibitPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { id } = useParams(); // This is how you get the URL parameters in React Router

    const { data: { getExhibit: exhibit } = {}, loading } = useQuery(
        GetExhibit,
        {
            variables: { id },
            skip: !id,
        }
    );

    if (!user) return <Navigate to="/login" />;
    if (!id) return <Navigate to="/" />;
    if (loading) return <></>;

    return (
        <Stack className="w-full max-w-xl mx-auto p-4 space-y-4">
            <Card className="rounded-lg shadow-md overflow-hidden">
                <CardContent className="p-4">
                    <Typography
                        variant="h3"
                        className="font-bold text-gray-800 text-center"
                    >
                        {exhibit.name}
                    </Typography>
                </CardContent>
            </Card>

            <Paper>
                <Typography
                    variant="body1"
                    className="text-gray-600 !mx-2 text-justify"
                >
                    {exhibit.description}
                </Typography>
            </Paper>

            <Card>
                <CardMedia
                    component="img"
                    height="100"
                    width="100"
                    image={exhibit.image}
                    alt="Exhibit image"
                    className="object-cover"
                />
            </Card>

            {exhibit.game && (
                <Button
                    onClick={() => navigate(`/game/${exhibit.game.id}`)}
                    variant="contained"
                    className="!bg-green-700"
                >
                    Start
                </Button>
            )}
        </Stack>
    );
};
