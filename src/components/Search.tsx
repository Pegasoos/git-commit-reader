import React, { useEffect, useState } from 'react';
import Commit from './Commit';
import apiCommit from '../types/apiCommit';
import { Form, InputGroup, Button, Stack, Alert, Pagination } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar:React.FC = () => {
    //useEffect hook to make api call for project git information on component mounting
    useEffect(() => {
        loadSearch();
    }, []);

    const [gitProjectState, setGitProjectState] = useState<Array<apiCommit>>([]);

    const loadSearch = async ():Promise<void> => {
        try{
        const call:Response = await fetch('https://api.github.com/repos/Pegasoos/git-commit-reader/commits?per_page=100', {
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
        setGitProjectState(sortedCall);
        console.log(sortedCall)
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

    const spliceChunk = (arr:Array<apiCommit>) => {
        const chunkedArray:Array<Array<apiCommit>> = [];
        while(arr.length > 0) {
            const chunk:Array<apiCommit>= arr.splice(0,5);
            chunkedArray.push(chunk);
        }
        return chunkedArray
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
                <h1>{gitProjectState.length > 0 ? gitProjectState[0].html_url.split("/")[4]:"Waiting..."}</h1>
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