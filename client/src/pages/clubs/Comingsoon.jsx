import React from "react";

export default function Comingsoon() {
  return (
    <div style={{ minHeight: "40vh", display: "flex", flexDirection: "column" }}>
      <header style={{ marginBottom: "150px" }}> {/* Your header content */} </header>
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="flex justify-center items-center lg:col-span-12">
              <h1 className="max-w-2xl text-center text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">
                Coming soon...
              </h1>
            </div>
          </div>
        </section>
      </main>
      <footer style={{ marginTop: "20px" }}> {/* Your footer content */} </footer>
    </div>
  );
}
