import React from 'react';
import { ListItem, ListItemText, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import type { Rating as RatingType } from "../common/models.ts";

interface RatingItemProps {
    rating: RatingType;
}

const RatingItem: React.FC<RatingItemProps> = ({ rating }) => {
    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                bgcolor: '#2a2a2a',
                borderRadius: 2,
                mb: 1,
                '&:hover': { bgcolor: '#333333' }
            }}
        >
            <ListItemText
                primary={
                    <Rating
                        value={rating.stars}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ color: '#fbc02d' }} // gold stars
                    />
                }
                secondary={
                    <>
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{ fontWeight: 'bold', color: 'white' }}
                        >
                            {rating.comment}
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: 1, color: 'gray' }}
                        >
                            {" — " + new Date(rating.createdAt).toLocaleString()}
                        </Typography>
                    </>
                }
            />
        </ListItem>
    );
};

export default RatingItem;