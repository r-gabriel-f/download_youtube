const express = require("express");
const app = express();
const fs = require("fs");
const ytdl = require("ytdl-core");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa cors

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS

app.post("/descargar", async (req, res) => {
  const  videoURL = req.body;

  try {
    // Verifica si la URL es válida antes de continuar
    if (!ytdl.validateURL(videoURL)) {
      throw new Error("URL de video de YouTube no válida");
    }

    const info = await ytdl.getInfo(videoURL);
    const titulo = info.videoDetails.title;

    const videoStream = ytdl(videoURL, {
      quality: "highest",
      filter: "audioandvideo",
    });

    videoStream.pipe(fs.createWriteStream(`${titulo}.mp4`));

    videoStream.on("progress", (recorrido, downloaded, total) => {
      const percent = (downloaded / total) * 100;
      console.log(`Descargando: ${percent.toFixed(2)}% completado`);
    });

    videoStream.on("end", () => {
      console.log("Descarga completada");
      res.json({ message: `Video descargado como ${titulo}.mp4` });
    });

    videoStream.on("error", (err) => {
      console.error("Error al descargar el video:", err);
      res.status(500).json({ message: "Error al descargar el video" });
    });
  } catch (error) {
    console.error("Error al obtener información del video:", error.message);
    res.status(500).json({ message: "Error al obtener información del video" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
