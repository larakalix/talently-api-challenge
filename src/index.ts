import app from "./server";

const PORT = process.env.PORT || 8000;

// Start the server
if (process.env.ENV === "development") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
