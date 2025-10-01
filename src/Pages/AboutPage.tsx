const AboutPage = () => {
    return (
        <div className="max-w-6xl px-12 text-start text-wrap text-xl content">
            <h1 className="text-2xl mb-12 text-center main">About</h1>
            <p className="mt-2">
                Codex is a complex web app built with modern technologies such
                as React, TypeScript, and TailwindCSS.
            </p>
            <p className="mt-4">
                The novels are fetched from a custom backend made specifically
                for this app, codex-backend. Backend is written in Go and uses
                Gin-Gonic framework and PostgreSQL for the database. This allows
                for fast and efficient data retrieval and manipulation.
            </p>
            <p className="mt-4">
                Website, Backend and Database are hosted in local Docker
                containers.
            </p>
        </div>
    );
};

export default AboutPage;
