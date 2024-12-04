import { Stack } from "@mui/material";
import { Badge as BadgeType } from "../../types/auth";

export const Badge = ({ badge }: { badge: BadgeType }) => {
    return (
        <Stack className="bg-neutral-400 p-2 rounded-full">
            <img
                src={`/badges/${badge.id}.png`}
                alt={badge.name}
                className="w-20 h-20"
            />
        </Stack>
    );
};
