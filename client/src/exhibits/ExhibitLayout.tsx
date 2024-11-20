import { Stack, Card, CardContent, CardMedia, Typography, Button, Paper } from "@mui/material";
import image from "../assets/cits-bot.jpg"

export const ExhibitLayout = () => {
    return (
        <Stack className="w-full max-w-xl mx-auto p-4 space-y-4">
            <Card className="rounded-lg shadow-md overflow-hidden">
                    <CardContent className="p-4">
                        <Typography variant="h3" className="font-bold text-gray-800 text-center">
                            Botany
                        </Typography>
                    </CardContent>
                </Card>

                <Paper>
                    <Typography variant="body1" className="text-gray-600 !mx-2 text-center">
                        Botany studies plants and stuff!  COOL!  really!
                        Plants are nice.  Look at these green things!
                    </Typography>
                </Paper>

                <Card>
                <CardMedia
                        component="img"
                        height="100"
                        width="100"
                        image={image}
                        alt="Exhibit image"
                        className="object-cover"
                    />
                </Card>

                <Button variant="contained" className="!bg-green-700">Start</Button>
        </Stack>
    );
};