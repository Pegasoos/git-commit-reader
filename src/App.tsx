import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';
import SearchBar from './components/Search';

const App:React.FC = () => {
  return (
    <Container>
      <div className="App">
        <h1><span className="thin-underline">Git</span> <Github className="heading-icon"/> Commit <Github className="heading-icon"/> Search</h1>
        <h4 className="sub-heading">Search For a Project on <span className="thick-underline">Github</span>!</h4>
        <Row>
          <SearchBar />
        </Row>
      </div>
    </Container>
  );
}

export default App;
