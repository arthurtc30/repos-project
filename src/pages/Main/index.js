import React, { useState, useCallback } from "react";
import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';

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
    </Container>
  );
}
