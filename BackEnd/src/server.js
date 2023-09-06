const fs = require("fs");
const ytdl = require("ytdl-core");

const videoURL = "http://www.youtube.com/watch?v=aqz-KE-bpKQ";

ytdl.getInfo(videoURL, (err, info) => {
  if (err) {
    console.error("Error al obtener información del video:", err);
  } else {
    // El título del video se encuentra en la propiedad 'title' del objeto 'info'
    const tituloDelVideo = info.title;
    console.log("Título del video:", tituloDelVideo);
  }
});
// Especifica las opciones para descargar el video con su audio
const options = {
  quality: "highest", // Calidad más alta disponible
  filter: "audioandvideo", // Descargar audio y video
};

/*const videoStream = ytdl(videoURL, options);

videoStream.pipe(fs.createWriteStream('video.mp4'));


videoStream.on('progress', (downloaded, total) => {
  const percent = (downloaded / total) * 100;
  console.log(`Descargando: ${percent.toFixed(2)}% completado`);
});

videoStream.on('end', () => {
  console.log('Descarga completada');
});

videoStream.on('error', (err) => {
  console.error('Error al descargar el video:', err);
});*/
