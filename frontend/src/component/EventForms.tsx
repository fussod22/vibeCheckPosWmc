import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack, Typography, Rating } from '@mui/material';
import { useVibeCheckStore } from "../store/useStore.ts";
import { useForm, Controller } from 'react-hook-form';

interface EventFormsProps {
    eventId: number;
}

interface FormValues {
    comment: string;
    stars: number;
}

const EventForms: React.FC<EventFormsProps> = ({ eventId }) => {
    const { addRating } = useVibeCheckStore();

    const { control, handleSubmit, reset, watch } = useForm<FormValues>({
        defaultValues: {
            comment: '',
            stars: 0
        }
    });

    const starsValue = watch('stars'); // damit man den Wert zum Button deaktivieren kennt

    const onSubmit = async (data: FormValues) => {
        if (data.stars === 0) return; // extra Sicherheitscheck
        await addRating(eventId, data.stars, data.comment);
        reset(); // Formular zurücksetzen
    };

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography component="legend" sx={{ mb: 1, color: 'white' }}>
                Rating
            </Typography>

            <Box
                sx={{
                    bgcolor: 'white',
                    p: 1.5,
                    borderRadius: 2,
                    display: 'inline-block',
                    mb: 2
                }}
            >
                <Controller
                    name="stars"
                    control={control}
                    render={({ field }) => (
                        <Rating
                            {...field}
                            value={field.value}
                            onChange={(_, value) => field.onChange(value ?? 0)}
                            sx={{ color: '#fbc02d' }}
                        />
                    )}
                />
            </Box>

            <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="comment-field"
                        label="Comment"
                        variant="standard"
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                        InputProps={{
                            style: { color: 'white' }
                        }}
                    />
                )}
            />

            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                <Button
                    type="submit"
                    variant="outlined"
                    disabled={starsValue === 0}
                    sx={{ color: 'white', borderColor: 'white' }}
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default EventForms;
