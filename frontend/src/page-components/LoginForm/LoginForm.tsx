import { useState } from "react"
import { userLogin } from "../../api/user";
import { returnMessageFromAxiosErr } from "../../utils/error";
import styles from './LoginForm.module.scss';
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

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
            await userLogin(email, password);
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
            <div className={styles.title}>Логин</div>
            {success && (
                <div>Успешная аутентификация!</div>
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
                    <button disabled={email == "" || password == ""} onClick={submit}>Войти</button>
                </div>
                <div className={styles.loginRedirect}>
                    <span>Еще нет аккаунта?</span>
                    <Link to={"/registration"}>Зарегистрируйтесь!</Link>
                </div>
            </div>
        </div>
    )
}
