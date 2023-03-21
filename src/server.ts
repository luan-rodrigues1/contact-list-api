import app from "./app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(() => {
    console.log("Database connected!")
    app.listen(8080, () => {
        console.log("Server is running in Port localhost:8080")
    })
}).catch(err => {
    console.log(err)
})
