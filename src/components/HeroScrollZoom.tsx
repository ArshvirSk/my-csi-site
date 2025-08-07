import logo from "../logo-nobg.png";

export default function HeroScrollZoom() {
  return (
    <section className="h-screen flex items-center justify-center backdrop-blur-sm">
      <img src={logo} alt="CSI Logo" className="w-96 h-96 invert-100" />
      {/* <h1 className="text-7xl font-bold">CSI</h1> */}
    </section>
  );
}
