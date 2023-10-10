import { Container } from "react-bootstrap";

export default function MapWrapper({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5)",
        zIndex: 1,
      }}
      className="map-wrapper"
    >
      {children}
    </div>
  );
}
