import { useEffect, useRef } from "react";

const GoogleAd = ({ slot }) => {
  const adLoaded = useRef(false); // Prevent multiple pushes

  useEffect(() => {
    if (!adLoaded.current) {
      adLoaded.current = true; // Mark as loaded
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []); // Run only once when component mounts

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1786643855119477"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAd;



