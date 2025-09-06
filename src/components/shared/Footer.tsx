import { container } from "@/constants/styles";

export default function Footer() {
  return (
    <footer className={`${container} py-10 text-center text-xs text-slate-400`}>
      © {new Date().getFullYear()} Collectible — Built with Tailwind
    </footer>
  );
}