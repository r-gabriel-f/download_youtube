import React, { useState } from "react";
import axios from "axios";
export const Youtebe = () => {
  const [videoURL, setVideoURL] = useState("");
  const [message, setMessage] = useState("");
  const handleURLChange = (e) => {
    setVideoURL(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/descargar", { videoURL });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
      setMessage("Error al enviar la solicitud al servidor.");
    }
  };
  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-3xl text-center font-semibold mb-6">
        Descargar Video de YouTube
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="videoURL"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ingrese la URL del video de YouTube
          </label>
          <input
            type="text"
            id="videoURL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ejemplo: https://www.youtube.com/watch?v=aqz-KE-bpKQ"
            value={videoURL}
            onChange={handleURLChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Descargar
          </button>
        </div>
      </form>
      {message && (
        <p className="text-center text-red-500 font-semibold">{message}</p>
      )}
    </div>
  );
};
