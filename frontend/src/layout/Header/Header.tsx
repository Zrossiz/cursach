import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}></div>
            <div className={styles.avatarWrapper}>
                <img src='/user.svg'/>
            </div>
        </div>
    )
}

export default Header;