import React, { useEffect, useState } from "react";
import { Container, Owner, Loading, BackButton, IssuesList, PageActions } from './styles';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function Repo({ match }) {
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = decodeURIComponent(match.params.repo);

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: 'open',
          page,
          per_page: 5,
        }
      });

      setIssues(response.data);
    }

    loadIssue();
  }, [page, match.params.repo]);

  function handlePage(action) {
    setPage(action === 'previous' ? page - 1 : page + 1);
  }

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

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>
                  {issue.title}
                </a>

                {issue.labels.map(label => (
                  <span key={String(label.id)}>
                    {label.name}
                  </span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button type="button" onClick={() => handlePage('previous')} disabled={page < 2} >
          Previous
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Next
        </button>
      </PageActions>
    </Container>
  );
}
