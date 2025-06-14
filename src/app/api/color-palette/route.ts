import ImageModel from "@/src/db/models/ImageModel"


export async function POST(request: Request) {
    try {
        console.log("masuk ke api")
        let body = await request.json()
        let colorAnalysis = await ImageModel.analyzeImageColor(body)
        console.log(colorAnalysis, "<<<< colo palet yang siap dikirim")
        return Response.json(colorAnalysis)
    } catch (error) {
        
    }
}