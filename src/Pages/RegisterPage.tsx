import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useError } from "../Contexts/ErrorContext";
import { useLoading } from "../Contexts/LoadingContext";
import { useNotification } from "../Contexts/NotificationContext";
import { register } from "../Services/registerService";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { setError } = useError();
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
        setError(null);
        setLoading(true);

        if (!username || username === "") {
            setError("Username is required!");
            return;
        }

        if (!email || email === "") {
            setError("Email is required!");
            return;
        }

        if (!password || password === "") {
            setError("Password is required!");
            return;
        }

        try {
            const response = await register(username, email, password);
            console.log(response);
            if (response.status === 201 && response.data.message) {
                setNotification(response.data.message);
                return navigate("/login");
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col justify-evenly border-b border-zinc-800">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        className="search-input"
                        required
                    />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete={"email"}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className="search-input"
                        required
                    />

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={"password"}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="search-input"
                        required
                    />
                </div>

                <div className="mt-6 flex flex-col flex-nowrap justify-evenly items-center">
                    <button type="submit" className="link">
                        [Register]
                    </button>
                    <h2 className="my-2">Or</h2>
                    <Link to="/login" className="link">
                        [Login]
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
