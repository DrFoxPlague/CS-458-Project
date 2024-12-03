import { Stack, Card, CardContent, CardMedia, Typography, Button, Paper } from "@mui/material";
import { DisplayPFP } from "./components/DisplayPFP"
import { WelcMsg } from "./components/WelcomeMsg";

export const HomePage = () => {
    return (
        <Stack className="w-full max-w-xl mx-auto p-4 space-y-4">
            <Stack className="bg-neutral-200 p-2 flex flex-col justify-center items-center rounded-lg shadow-md overflow-hidden">
                <WelcMsg />
                <DisplayPFP />
            </Stack>
            <Stack justifyContent="center" alignItems="center" className="bg-neutral-200 p-2 rounded-lg shadow-md overflow-hidden">
                <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                    Badge Collection:
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" className="space-x-2">
                    <Paper className="p-2 rounded-lg">
                        <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                            1
                        </Typography>
                    </Paper>
                    <Paper className="p-2 rounded-lg">
                        <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                            2
                        </Typography>
                    </Paper>
                    <Paper className="p-2 rounded-lg">
                        <Typography variant="h6" className="text-gray-600 !mx-2 text-center">
                            3
                        </Typography>
                    </Paper>
                    </Stack>
            </Stack>
        </Stack>
    )
}