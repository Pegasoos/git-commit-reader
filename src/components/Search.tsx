import React, { useState } from 'react';
import Commit from './Commit';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar:React.FC = () => {

    interface gitSearchState {
        searchInput: string;
    }

    const [searchState, setSearchState] = useState<gitSearchState>({searchInput:""});

    const handleInputChange:React.FormEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        setSearchState({searchInput:value});
        console.log(searchState);
    }

    return(
         <div className = "App">
            <Form>
                <InputGroup>
                    <Form.Control type="text" placeholder= "your-repository-name" id="git-search"
                     name="searchInput" onChange={handleInputChange}
                     />

                    <Button className="button"><Search/></Button>
                </InputGroup>
            </Form>
         </div>
    )
}
export default SearchBar;