import app from './app'; // Import the Express app


const PORT = process.env.PORT || 3000; // Default port is 3000 if no .env value is provided

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

