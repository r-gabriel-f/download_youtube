const fs = require("fs");

const ytdl = require("ytdl-core");

const videoURL = "https://www.youtube.com/watch?v=eBSQug_xtwc";

const options = {
  quality: "highest",
  filter: "audioandvideo",
};

const videoStream = ytdl(videoURL, options);

async function descargarVideo() {
  const info = await ytdl.getInfo(videoURL);
  const titulo = info.videoDetails.title;

  console.log("🚀 ~ file: server.js:16 ~ descargarVideo ~ titulo:", titulo);

  videoStream.pipe(fs.createWriteStream(`${titulo}.mp4`));
}

descargarVideo();

videoStream.on("progress", (recorrido, downloaded, total) => {
  const percent = (downloaded / total) * 100;
});

videoStream.on("end", () => {
  console.log("Descarga completada");
});

videoStream.on("error", (err) => {
  console.error("Error al descargar el video:", err);
});
