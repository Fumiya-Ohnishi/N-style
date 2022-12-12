export default function loader() {
  window.onload = () => {
    const loader = document.getElementById("loader");
    loader.classList.add("loaded");
  };
}