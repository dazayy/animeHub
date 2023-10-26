export async function getDataApi(url) {
    const request = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await request.json();
    return data;
}
