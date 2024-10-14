const AboutPage = () => {
    return (
        <div className="max-w-6xl px-12 text-center text-wrap text-2xl">
            <h1 className="text-4xl mb-12">About</h1>
            <p>
                This is a simple web app to read novels. It is built with React,
                typescipt and tailwindcss. The novels are fetched from custom
                backend made specifically for this app, codex-backend. The
                novels and chapters are stored in AWS DynamoDB.
            </p>
        </div>
    );
};

export default AboutPage;
