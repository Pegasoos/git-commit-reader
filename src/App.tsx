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
        <h1>Git <Github/> Commit <Github/> Search</h1>
        <h4>Search For a Project on Github!</h4>
        <Row>
          <SearchBar />
        </Row>
      </div>
    </Container>
  );
}

export default App;
