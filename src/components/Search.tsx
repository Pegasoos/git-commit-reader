import React, { useEffect, useState } from 'react';
import Commit from './Commit';
import apiCommit from '../types/apiCommit';
import { Form, InputGroup, Button, Stack, Alert, Pagination } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import PaginationItem from 'react-bootstrap/lib/PaginationItem';

const SearchBar:React.FC = () => {
    //useEffect hook to make api call for project git information on component mounting
    useEffect(() => {
        loadSearch();
    }, []);

    const [gitProjectState, setGitProjectState] = useState<Array<Array<apiCommit>>>([]);

    const sliceChunk = (arr:Array<apiCommit>) => {
        const chunkedArray:Array<Array<apiCommit>> = [];
        for(let i = 0; i < arr.length; i += 5){
            const chunk:Array<apiCommit>= arr.slice(i,i+5);
            chunkedArray.push(chunk);
        }
        return chunkedArray
    }

    const loadSearch = async ():Promise<void> => {
        try{
        const call:Response = await fetch('https://api.github.com/repos/Pegasoos/git-commit-reader/commits?per_page=100', {
            headers: {'Content-Type': 'application/json'}
        })
        const sortedCall:apiCommit[] = await call.json();
        setGitProjectState(sliceChunk(sortedCall));
        console.log(gitProjectState);
        }
        catch(err){
            console.log(err);
        }
    }

    const[alertState, setAlertState] = useState({showAlert: false});

    const clickSearch = async (e:React.MouseEvent):Promise<void> => {
        e.preventDefault();
        //Github repos do not use spaces, replace them with the default github spacing(hyphons)
        const repoString:string = repositorySearchState.searchInput.replace(/[" "]/g, "-");
        const call:Response = await fetch(`https://api.github.com/repos/${profileSearchState.searchInput}/${repoString}/commits?per_page=100`, {
            headers: {
                    'Content-Type' : 'application/json',
                    'accept': 'application/vnd.github+json'
                     }
        })
        if(!call.ok) {
            setAlertState({showAlert:true});
            console.log(alertState.showAlert)
            return;
        };
        const sortedCall:apiCommit[] = await call.json();
        setGitProjectState(sliceChunk(sortedCall));
        console.log(gitProjectState)
        console.log('Success!');
    }
    //interface to define type for searchState hook
    interface gitSearchState {
        searchInput: string;
    }
    // creating state hook to store user input from search form
    const [profileSearchState, setProfileSearchState] = useState<gitSearchState>({searchInput:""});
    const [repositorySearchState, setRepositorySearchState] = useState<gitSearchState>({searchInput:""});

    const handleInputChange:React.FormEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        if(e.target.name === "profileSearchInput"){
            setProfileSearchState({searchInput:value});
            console.log(profileSearchState);
        }
        if(e.target.name === "repositorySearchInput"){
            setRepositorySearchState({searchInput:value})
            console.log(repositorySearchState);
        }
    }

    // code for rendering pagination
    let active:number = 1;
    let pages:Array<any> = [];

    for(let number:number = 1; number <= gitProjectState.length;number++) {
        pages.push(
        <Pagination.Item key = {number} active = {number === active}>
            {number}
        </Pagination.Item>
        )
    }

    return(
         <div className = "App">
            <Form>
                <InputGroup>
                    <Form.Control type="text" placeholder= "your-github-profile-name" id="git-search"
                     name="profileSearchInput" onChange={handleInputChange}
                     />
                     <Form.Control type="text" placeholder= "your-repository-name" id="git-search"
                     name="repositorySearchInput" onChange={handleInputChange}
                     />
                    <Button className="button" onClick={clickSearch}><Search onClick={clickSearch}/></Button>
                </InputGroup>
            </Form>
            <Stack gap={2}>
                <div id="error">
                    {
                        alertState.showAlert ?
                        <Alert variant="danger" dismissible onClose={() => setAlertState({showAlert:false})}>
                            <Alert.Heading>
                                No Repositories Found
                            </Alert.Heading>
                            <p>
                                Have you checked your spelling for both the profile and repository?
                            </p>
                        </Alert>
                        :null 
                    }
                </div>
                <h1>{gitProjectState.length > 0 ? gitProjectState[0][0].html_url.split("/")[4]:"Waiting..."}</h1>
                {
                gitProjectState.length > 0 ?
                gitProjectState[0].map((commit) => {
                    return <Commit {...commit} key={commit.sha}/>;
                }):"Waiting"
                }
            </Stack>
            <Pagination>
                {pages}
            </Pagination>
         </div>
    )
}
export default SearchBar;