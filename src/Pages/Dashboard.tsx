import ReactMarkdown from "react-markdown";

const Dashboard = () => {
    const markdownText = `# React Markdown Example\n\n- Some text\n- Some other text\n## Subtitle\n### Additional info\nThis is a [link](https://github.com/remarkjs/react-markdown)`;

    return (
        <div>
            <ReactMarkdown className="prose markdown">
                {markdownText}
            </ReactMarkdown>
        </div>
    );
};

export default Dashboard;
