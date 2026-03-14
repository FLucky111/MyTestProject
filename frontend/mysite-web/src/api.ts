import {useEffect} from "react";

export type HealthResponse = {
    status: string;
    message: string;
    time: string;
};

export async function fetchHealth(): Promise<HealthResponse> {
    const response = await fetch("http://localhost:5148/api/app/health");

    if (!response.ok) {
        throw new Error("Не удалось получить ответ от API");
    }

    useEffect(() => {
        fetch("/api/app/health")
            .then(res => res.json())
            .then(data => console.log(data));
    }, []);

    return response.json();
}