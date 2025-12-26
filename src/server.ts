import { app } from "./app"
import { connectDatabase } from "./config/database"

const PORT = 3333

async function bootstrap() {
  try {
    await connectDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("❌ Failed to start server", error)
    process.exit(1)
  }
}

bootstrap()
