import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { useNotification } from "../Contexts/NotificationContext";
import { useUser } from "../Contexts/UserContext";
import { login } from "../Services/authService";

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const { setError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email || email === "") {
            setError("Email is required!");
            return;
        }

        if (!password || password === "") {
            setError("Password is required!");
            return;
        }

        try {
            const data = await login(email, password);
            if (data.authorized && data.user) {
                setUser(data.user);
                setNotification("Logged in successfully");
                return navigate("/novels");
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl w-full flex flex-col justify-center items-center">
            <form onSubmit={handleLogin} className="max-w-sm w-full p-12">
                <div className="flex flex-col justify-evenly pb-2 border-b border-zinc-800">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete={"email"}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className="search-input mb-3 pl-1"
                        required
                    />

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={"password"}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="search-input pl-1"
                        required
                    />
                </div>

                <div className="mt-6 flex flex-col flex-nowrap justify-evenly items-center">
                    <button type="submit" className="link">
                        [Login]
                    </button>
                    <h2 className="my-2">Or</h2>
                    <Link to="/register" className="content">
                        [Register]
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
