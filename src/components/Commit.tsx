import React from 'react';
import apiCommit from '../types/apiCommit';
import { Row, Col, Accordion } from 'react-bootstrap';

const Commit:React.FC<apiCommit> = (props:apiCommit) => {

    //splits then deletes first line so Accordian
    //can display only the extendd message
    const messageArray:string[] = props.commit.message.split(/\n/);
    messageArray.shift();

    return(
         <Row>
            <Col>
                <img src = {props.author.avatar_url} alt="Profile For a Github Profile"/>
                <p>commit authored by {props.author.login} on {props.commit.author.date}</p>
            </Col>
            <Col>
                <Accordion defaultActiveKey='0'>
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