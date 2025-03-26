import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { useNotification } from "../Contexts/NotificationContext";
import { register } from "../Services/authService";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { addError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();

    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!username || username === "") {
            addError("Username is required!");
            return;
        }

        if (!email || email === "") {
            addError("Email is required!");
            return;
        }

        if (!password || password === "") {
            addError("Password is required!");
            return;
        }

        try {
            const response = await register(username, email, password);
            if (response.status === 201 && response.data.message) {
                setNotification(response.data.message);
                return navigate("/login");
            }
        } catch (err) {
            addError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl w-full flex flex-col justify-center items-center">
            <form onSubmit={handleLogin} className="max-w-sm w-full p-12">
                <div className="flex flex-col justify-evenly pb-2 border-b border-zinc-800">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        className="search-input mb-3 pl-1"
                        required
                    />

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
                        [Register]
                    </button>
                    <h2 className="my-2">Or</h2>
                    <Link to="/login" className="content">
                        [Login]
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
