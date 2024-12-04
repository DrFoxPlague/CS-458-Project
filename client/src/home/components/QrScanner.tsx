import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import QrReader, { QRCode } from "react-qrcode-reader";
import { Navigate } from "react-router-dom";

export const QrScanner = () => {
    const [showScanner, setShowScanner] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);

    const toggleScanner = () => {
        setShowScanner(!showScanner);
    };

    const handeRead = (code: QRCode) => {
        setScannedData(code.data);
        toggleScanner();
    };

    if (scannedData) return <Navigate to={`/exhibit/${scannedData}`} />;

    return (
        <Stack
            flexGrow={1}
            alignItems="center"
            gap={1}
            className="bg-neutral-200 rounded-lg shadow-md overflow-hidden"
        >
            <Typography
                variant="h5"
                className="text-gray-600 !mx-2 pt-2 text-center"
            >
                Ready to Begin Your Journey?
            </Typography>
            <Button onClick={toggleScanner} variant="contained" color="primary">
                {showScanner ? "Cancel" : "Begin"}
            </Button>
            <Stack p={2}>
                {showScanner && (
                    <QrReader
                        onRead={handeRead}
                        delay={100}
                        width={500}
                        height={500}
                        videoConstraints={{
                            facingMode: "environment",
                            aspectRatio: { ideal: 16 / 9 },
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
};
