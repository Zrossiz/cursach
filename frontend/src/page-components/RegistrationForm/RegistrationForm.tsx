import { useState } from "react"
import { userRegistration } from "@/api/user";
import { returnMessageFromAxiosErr } from "@/utils/error";
import styles from './RegistrationForm.module.scss';
import { Link } from "react-router-dom";

export const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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


        try {
            await userRegistration(email, password);
            setSuccess(true)
            setTimeout(() => {
                window.location.href = "/"
            }, 2000)
        } catch (err) {
            setErrorMessage(returnMessageFromAxiosErr(err))
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Регистрация</div>
            {success && (
                <div>Успешная Регистрация!</div>
            )}
            {errorMessage !== "" && (
                <div className={styles.errWrapper}>Ошибка: {errorMessage}</div>
            )}
            <div className={styles.formWrapper}>
                <div className={styles.input}>
                  <div className={styles.inputTitle}>Email</div>
                    <input
                        type="text"
                        placeholder="Введите email"
                        value={email}
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                    />
                </div>
                <div className={styles.input}>
                    <div className={styles.inputTitle}>Пароль</div>
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                    />
                </div>
                <div className={styles.button}>
                    <button disabled={email == "" || password == ""} onClick={submit}>Регистрация</button>
                </div>
                <div className={styles.registrationRedirect}>
                    <span>Уже есть аккаунт?</span>
                    <Link to={"/login"}>Войдите!</Link>
                </div>
            </div>
        </div>
    )
}