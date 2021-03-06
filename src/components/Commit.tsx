import React from 'react';
import apiCommit from '../types/apiCommit';
import { Row, Col, Accordion, Badge } from 'react-bootstrap';
import formatDate from '../utils/helpers';
import './Commit.css';

const Commit:React.FC<apiCommit> = (props:apiCommit) => {

    //splits then deletes first line so Accordian
    //can display only the extended message
    const messageArray:string[] = props.commit.message.split(/\n/);
    messageArray.shift();

    return(
         <Row className ="commit-card">
            <Col>
                <img src = {props.author.avatar_url} alt="Profile For a Github Profile" className="git-image"/>
                <p><>{props.latest ? <Badge bg="success">Latest</Badge> : console.log("")}</> commit authored by <i>{props.author.login}</i> at {formatDate(props.commit.author.date)}</p>
            </Col>
            <Col>
                <Accordion>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>
                            {props.commit.message.split(/\n/)[0]}
                            </Accordion.Header>
                            <Accordion.Body>
                            {messageArray}
                            </Accordion.Body>
                        </Accordion.Item>
                </Accordion>
            </Col>    
         </Row>
    )
}
export default Commit;