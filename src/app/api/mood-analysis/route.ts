import ImageModel from "@/src/db/models/ImageModel"


export async function POST(request: Request) {
    try {
        let body = await request.json()
        console.log(body, "<<<<body body wooo")
        let mood = await ImageModel.analyzeMood(body)
        console.log(mood, "<<<< mood dari api")

        return Response.json({ mood })
    } catch (error) {
        console.log(error)
    }
}