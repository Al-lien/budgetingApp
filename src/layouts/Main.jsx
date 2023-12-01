// react-router-dom exports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

// helper functions
import { fetchData } from "../helpers";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default function Main() {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="wave" />
    </div>
  );
}
