import Image from "next/image";
import { SidebarComponent } from "./components";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
            <div className="flex-1 flex">
                <SidebarComponent />
            </div>
        </div>
  );
}
