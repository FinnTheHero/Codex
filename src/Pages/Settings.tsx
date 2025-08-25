import { useUser } from "../Contexts/UserContext";

const SettingsPage = () => {
    const {
        fontSize,
        setFontSize,
        colorScheme,
        setColorScheme,
        sortBy,
        setSortBy,
    } = useUser();

    return (
        <div
            className={`h-full max-w-5xl px-4 sm:px-8 md:px-12 w-full flex flex-col justify-between items-center`}
        >
            <p className="text-2xl pb-28">Settings</p>
            <div
                className={`text-xl flex flex-row justify-between w-full h-full`}
            >
                <div>
                    <p>Font Size</p>
                    <select
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                    >
                        <option value="xs">Small</option>
                        <option value="lg">Medium</option>
                        <option value="xl">Large</option>
                    </select>

                    <p className={`text-${fontSize}! `}>Example text...</p>
                </div>
                <div>
                    <p>Font Family</p>
                </div>
                <div>
                    <p>Color Scheme</p>
                </div>
                <div>
                    <p>Caching</p>
                    <p className="subtitle">Cannot disable!</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
