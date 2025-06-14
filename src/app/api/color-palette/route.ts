import ImageModel from "@/src/db/models/ImageModel"

export async function POST(request: Request) {
    try {
        console.log("masuk ke api")
        
        // Check content type and handle accordingly
        const contentType = request.headers.get('Content-Type')
        
        let body
        if (contentType?.includes('application/json')) {
            body = await request.json()
        } else if (contentType?.includes('multipart/form-data')) {
            const formData = await request.formData()
            body = formData.get('image') // or whatever field name you're using
        } else {
            // Handle text/plain or other formats (like data URLs)
            body = await request.text()
        }
        // console.log(body)
        let colorAnalysis = await ImageModel.analyzeImageColor(body)
        // console.log(JSON.parse(colorAnalysis), "<<<< colo palet yang siap dikirim")
        if(!colorAnalysis) throw {message: "error getting analysis from model"}

        console.log(colorAnalysis, "<<<< colo palet yang siap dikirim")
        return Response.json(colorAnalysis)
    } catch (error) {
        console.log(error, "<<<< error di api")
        return Response.json({ error: "Failed to process image" }, { status: 500 })
    }
}