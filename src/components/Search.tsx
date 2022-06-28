import React, { useEffect, useState } from 'react';
import Commit from './Commit';
import apiCommit from '../types/apiCommit'
import { Form, InputGroup, Button, Stack } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar:React.FC = () => {
    //useEffect hook to make api call for project git information on component mounting
    useEffect(() => {
        loadSearch();
    }, []);

    const [gitProjectState, setGitProjectState] = useState<Array<apiCommit>>([]);

    const loadSearch = async ():Promise<void> => {
        try{
        const call:Response = await fetch('https://api.github.com/repos/Pegasoos/git-commit-reader/commits', {
            headers: {'Content-Type': 'application/json'}
        })
        const sortedCall:apiCommit[] = await call.json();
        setGitProjectState(sortedCall);
        console.log(sortedCall);
        }
        catch(err){
            console.log(err);
        }
    }
    //interface to define type for searchState hook
    interface gitSearchState {
        searchInput: string;
    }
    // creating state hook to store user input from search form
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
            <Stack gap={2}>
                {
                gitProjectState.map((commit) => {
                    return <Commit {...commit} key={commit.sha}/>;
                })
                }
            </Stack>
         </div>
    )
}
export default SearchBar;