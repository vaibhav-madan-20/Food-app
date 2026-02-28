export default async function handler(req, res) {
    const SWIGGY_URL =
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.900965&lng=75.8572758";

    try {
        const response = await fetch(SWIGGY_URL, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Swiggy API error" });
        }

        const data = await response.json();
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Proxy error:", error);
        return res.status(500).json({ error: "Failed to fetch restaurants" });
    }
}
