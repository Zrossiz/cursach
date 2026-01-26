import { useState } from "react"
import { userRegistration } from "../../api/user";
import { returnMessageFromAxiosErr } from "../../utils/error";

export const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitPassword, setRepitPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false)

    const submit = async () => {
        setErrorMessage("");
        if (email.length < 5 || !email.includes("@")) {
            setErrorMessage("Невалидный email")
            return
        }

        if (password.length < 4) {
            setErrorMessage("Длина пароля должна быть больше 4 символов")
            return
        }

        if (repitPassword !== password) {
            setErrorMessage("Пароли не совпадают")
            return
        }

        try {
            const res = await userRegistration(email, password);
            setSuccess(true)
            setTimeout(() => {
                window.location.href = "/"
            }, 1000)
            console.log(res);
        } catch (err) {
            setErrorMessage(returnMessageFromAxiosErr(err))
        }
    }

    return (
        <div>
            <div>Регистрация</div>
            {errorMessage !== "" && (
                <div>Ошибка: {errorMessage}</div>
            )}
            {success && (
                <div>Успешная регистрация!</div>
            )}
            <div>
                <input 
                    type="text" 
                    placeholder="Введите email"
                    value={email} 
                    onChange={
                        (e) => setEmail(e.target.value)
                    } 
                />
                <input 
                    type="password" 
                    placeholder="Введите пароль"
                    value={password} 
                    onChange={
                        (e) => setPassword(e.target.value)
                    } 
                />
                <input 
                    type="password" 
                    placeholder="Повторите пароль"
                    value={repitPassword} 
                    onChange={
                        (e) => setRepitPassword(e.target.value)
                    } 
                />
                <button onClick={submit}>Регистрация</button>
            </div>
        </div>
    )
}