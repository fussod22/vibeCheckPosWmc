import React from "react";
import { FormControl, Select, MenuItem, Button, Box, Typography } from "@mui/material";
import { useVibeCheckStore } from "../store/useStore";

const OrderBy: React.FC = () => {

    const {
        page,
        setOrderBy,
        addPage,
        minusPage,
        orderBy,
    } = useVibeCheckStore();


    const maxPage = 3;

    return (
        <FormControl
            fullWidth
            sx={{
                backgroundColor: "#4B0082",
                borderRadius: 2,
                padding: 2,
                marginTop: 2,
            }}
        >
            <Select
                value={orderBy || ""}
                onChange={(e) => setOrderBy(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
            >
                <MenuItem value="eventDate">Date</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="title">Title</MenuItem>
            </Select>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 2
                }}
            >
                <Button
                    variant="contained"
                    onClick={minusPage}
                >
                    Previous
                </Button>

                <Typography
                    sx={{
                        color: "white",
                        fontWeight: "bold"
                    }}
                >
                    Page {page}
                </Typography>

                <Button
                    variant="contained"
                    onClick={addPage}
                    disabled={page >= maxPage}
                >
                    Next
                </Button>
            </Box>
        </FormControl>
    );
};

export default OrderBy;