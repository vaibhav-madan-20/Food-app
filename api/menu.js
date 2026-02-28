export const config = {
    runtime: "edge",
};

export default async function handler(req) {
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get("restaurantId");

    if (!restaurantId) {
        return new Response(
            JSON.stringify({ error: "restaurantId query parameter is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const SWIGGY_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.900965&lng=75.8572758&restaurantId=${restaurantId}`;

    try {
        const response = await fetch(SWIGGY_URL, {
            method: "GET",
            redirect: "follow",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                "Accept":
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1",
                "Cache-Control": "max-age=0",
            },
        });

        const text = await response.text();

        if (!text || text.length === 0) {
            return new Response(
                JSON.stringify({
                    error: "Empty response from Swiggy API",
                    swiggyStatus: response.status,
                }),
                { status: 502, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(text, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=300, stale-while-revalidate",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch menu", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
