import Header from "./Header/Header"
import type { LayoutProps } from "./Layout.props"
import styles from './Layout.module.scss'

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout