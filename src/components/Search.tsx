import React from 'react';
import ReactDOM from 'react-dom/client';
import Commit from './Commit';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar:React.FC = () => {

    return(
         <div className = "App">
            <Form>
                <InputGroup>
                    <Form.Control type="text" placeholder= "your-repository-name"/>
                    <Button><Search/></Button>
                </InputGroup>
            </Form>
         </div>
    )
}
export default SearchBar;