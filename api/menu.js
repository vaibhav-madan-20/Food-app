export default async function handler(req, res) {
    const { restaurantId } = req.query;

    if (!restaurantId) {
        return res.status(400).json({ error: "restaurantId query parameter is required" });
    }

    const SWIGGY_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.900965&lng=75.8572758&restaurantId=${restaurantId}`;

    try {
        const response = await fetch(SWIGGY_URL, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://www.swiggy.com/",
                "Origin": "https://www.swiggy.com",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });

        const text = await response.text();

        if (!response.ok) {
            console.error("Swiggy API error:", response.status, text.substring(0, 500));
            return res.status(response.status).json({ error: "Swiggy API error", status: response.status });
        }

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
        return res.status(200).send(text);
    } catch (error) {
        console.error("Proxy error:", error.message);
        return res.status(500).json({ error: "Failed to fetch menu", details: error.message });
    }
}
