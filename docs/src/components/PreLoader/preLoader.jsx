import "./preLoader.css";

export function PreLoader() {
  return (
    <div className="preloader">
      <div className="preloader__circle"></div>
      <p className="preloader__title">Searching for news...</p>
    </div>
  );
}
