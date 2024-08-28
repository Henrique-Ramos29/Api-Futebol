import React from "react";
import madruga from './../../../public/logo2.png'
import styles from './index.module.css'

const Header = () => {
    return(
        <header className={styles.container}>
            <h1>Real Madruga Score</h1>
            <img src={madruga} alt="logo real madruga" height={80} width={80} /> 
        </header>
    )
}

export default Header;