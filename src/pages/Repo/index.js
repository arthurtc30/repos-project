import React, { useEffect, useState } from "react";
import { Container, Owner, Loading, BackButton } from './styles';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function Repo({ match }) {
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repo);

      const [repoData, repoIssues] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          }
        }),
      ]);

      setRepo(repoData.data);
      setIssues(repoIssues.data);
      setLoading(false);
    }

    load();
  }, [match.params.repo]);

  if (loading) {
    return (
      <Loading>
        <h1>Loading repo...</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#0D2636" size={35} />
      </BackButton>
      <Owner>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>
    </Container>
  );
}
