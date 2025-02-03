import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3001;

function add(a: number, b: number): number {
    const sum: number = a + b; // Set a breakpoint here
    return sum;
}

app.get("/", (req: Request, res: Response) => {
    const result: number = add(5, 10);
    res.send(`The sum is: ${result}`);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
