import React from "react";
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from "./styles";

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My repositories
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Add repos" ></input>

        <SubmitButton>
          <FaPlus color="#FFF" size={25} />
        </SubmitButton>    
      </Form>
    </Container>
  );
}
