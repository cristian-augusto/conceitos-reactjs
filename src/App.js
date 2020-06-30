import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async () => {
    api.get("/repositories").then((response) => {
      console.log(response.data);
      setRepositories(response.data);
    });
  };

  useEffect(() => {
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const repo = {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"],
      likes: 0,
    };
    const response = await api.post("/repositories", repo);
    setRepositories((repos) => [...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      const newRepo = repositories.filter((repo) => repo.id !== id);
      setRepositories(newRepo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
