export class ApiClient {
    async getApiData() {
        const rawResponse = await fetch("http://localhost:3000/spaces");        
        const parsedResponse = await rawResponse.json();
        console.log("\n-----\n");
        console.log(parsedResponse);
        console.log("\n-----\n");
        return parsedResponse;
    }
}