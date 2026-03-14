import { useEffect, useState } from "react";
import "./App.css";
import { fetchHealth, type HealthResponse } from "./api";
import Card from "./components/Card";

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [isVisible, setVisible] = useState(true);
  const items = ["React", "C#", "ASP.NET", "TypeScript"];
  const [name, setName] = useState("");

  useEffect(() => {
    fetchHealth()
        .then((data) => setHealth(data))
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
  }, []);

  return (
      <div className="layout">
        <header className="header">
          <div className="container nav">
            <div className="logo">TestSite</div>
            <nav>
              <a href="#home">Главная</a>
              <a href="#about">О проекте</a>
              <a href="#contacts">Проверка API</a>
            </nav>
          </div>
        </header>

        <main>
          <section id="home" className="hero">
            <div className="container">
              <h1>Тестовая версия сайта</h1>
              <p>
                Стэк:
              <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
              </ul>
              </p>

              <p>Счётчик: {count}</p>
              <button onClick={() => setCount(count + 1)} className="primary-btn">
                Увеличить
              </button>
              <button onClick={() => setCount(0)} className="primary-btn">
                Сбросить
              </button>
              <p></p>
              <button onClick={() => setVisible(!isVisible)} className="primary-btn">
                Показать / скрыть текст
              </button>

              {isVisible && <p>Скрывающийся текст</p>}


              <Card title="Блок 1" text="Текст 1, аааааааааааа" />
              <Card title="Блок 2" text="Текст 2, ыыыыыыыыыыыы" />
              
              <input className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите имя"
              />

              <p>Привет, {name}!</p>
              
            </div>
          </section>

          <section id="about" className="section">
            <div className="container">
              <h2>О проекте</h2>
              <p>
                Что-то надо придумать :)
              </p>
              <p>
                Что-то с личным кабинетом
              </p>
              
            </div>
          </section>

          <section className="section">
            <div className="container">
              <h2>Проверка API</h2>

              {loading && <p>Загрузка...</p>}
              {error && <p className="error">Ошибка: {error}</p>}

              {health && (
                  <div className="card">
                    <p><strong>Status:</strong> {health.status}</p>
                    <p><strong>Message:</strong> {health.message}</p>
                    <p><strong>Time:</strong> {new Date(health.time).toLocaleString()}</p>
                  </div>
              )}
            </div>
          </section>
        </main>

        <footer id="contacts" className="footer">
          <div className="container">
            <p>© 2026 TestSite.</p>
          </div>
        </footer>
      </div>
  );
}

export default App;