import React, { useState, useCallback } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      try {
        const response = await api.get(`/repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        }

        setRepos([...repos, data]);
        setNewRepo('');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }

    submit();
  }, [newRepo, repos]);


  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleDelete = useCallback((repo) => {
    const find = repos.filter(r => r.name !== repo);
    setRepos(find);
  }, []);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My repositories
      </h1>

      <Form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add repos" value={newRepo} onChange={handleInputChange} ></input>

        <SubmitButton loading={loading ? 1 : 0} >
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={25} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repos.map(r => (
          <li key={r.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(r.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {r.name}
            </span>
            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  );
}
