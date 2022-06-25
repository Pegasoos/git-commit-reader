import React from 'react';
import ReactDOM from 'react-dom/client';
import Commit from './Commit';
import { Form, InputGroup, Button } from 'react-bootstrap';

const Search:React.FC = () => {

    return(
         <div className = "App">
            <Form>
                <InputGroup>
                    <Form.Control type="text" placeholder= "your-repository-name"/>
                    <Button></Button>
                </InputGroup>
            </Form>
         </div>
    )
}
export default Search;