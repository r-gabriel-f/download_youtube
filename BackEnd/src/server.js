const fs = require("fs");
const ytdl = require("ytdl-core");

const videoURL = "http://www.youtube.com/watch?v=aqz-KE-bpKQ";


const options = {
  quality: "highest", 
  filter: "audioandvideo", 
};

const videoStream = ytdl(videoURL, options);

videoStream.pipe(fs.createWriteStream('video.mp4'));


videoStream.on('progress', (recorido, downloaded, total) => {
  const percent = (downloaded / total) * 100;
  console.log(`Descargando: ${percent.toFixed(2)}% completado`);
});

videoStream.on('end', () => {
  console.log('Descarga completada');
});

videoStream.on('error', (err) => {
  console.error('Error al descargar el video:', err);
});
