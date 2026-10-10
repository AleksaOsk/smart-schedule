import './Header.css';

function Header({ onLoginClick }) {
    return (
        <header className="header">
            <div className="logoArea">
                <div className="icon">
                    <img src="/images/logo.svg" alt="logo" />
                </div>
                <h1 className="logoText">SmartSchedule</h1>
            </div>
            <div className="gap"></div>
            <button className="loginBtn" onClick={onLoginClick}>
                Войти
            </button>
        </header>
    );
}

export default Header;