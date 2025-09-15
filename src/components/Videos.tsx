import React from "react";

export default function Videos() {
  const videos = [
    { title: "UltraRentz Overview", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "How to Use the Platform", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "DAO Dispute Demo", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ];

  return (
    <section id="videos" className="container py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">Videos</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {videos.map((video, idx) => (
          <div key={idx} className="card p-4 fade-in">
            <iframe
              width="100%"
              height="200"
              src={video.embed}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
            <h3 className="text-xl font-semibold mt-4">{video.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
