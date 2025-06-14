import ImageModel from "@/src/db/models/ImageModel"


export async function POST(request: Request) {
    try {
        let body = await request.json()
        // console.log(body, "<<<<body body wooo")
        
        // return Response.json(body)
        let mood = await ImageModel.analyzeMood(body)
        if(!mood) throw {message: "Mood can't be processed"}
        console.log(mood, "<<<< mood dari api")

        return Response.json({ mood: mood })
    } catch (error) {
        console.log(error)
    }
}