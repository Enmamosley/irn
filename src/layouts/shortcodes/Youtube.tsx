// Dynamic import que nunca rompe en build
import { useEffect, useState } from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube = ({ id, title, ...rest }) => {
  const [LiteYouTubeEmbed, setLiteYouTubeEmbed] = useState<any>(null);

  useEffect(() => {
    import("react-lite-youtube-embed").then((mod) =>
      setLiteYouTubeEmbed(() => mod.default || mod)
    );
  }, []);

  if (!LiteYouTubeEmbed) return null;

  return (
    <LiteYouTubeEmbed
      wrapperClass="yt-lite rounded-lg"
      id={id}
      title={title}
      {...rest}
    />
  );
};

export default Youtube;
