import React from 'react'

import { messages as data } from './data.json';
import {deduplicate, formatDate} from "./utils";
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";

function App() {
  const [loadAmount, setAmount] = React.useState(5);
  const [messages, setMessages] = React.useState(deduplicate(data, "uuid", "content"));

  const deleteHandler = (id, content) => {
    const newMessages = [...messages];
    let toDelete = newMessages.findIndex(message => message.uuid === id && message.content === content)
    newMessages.splice(toDelete, 1);
    setMessages(newMessages);
    setAmount(prevAmount => prevAmount - 1);
  }
  const loadMoreHandler = () => {
    if(loadAmount + 5 < messages.length){
      setAmount(prevAmount => prevAmount + 5);
    } else if(loadAmount !== messages.length && loadAmount < messages.length){
      setAmount(prevAmount => prevAmount + messages.length - loadAmount)
    }
  }


  return (
    <Container>
      <ListGroup>
        {
          messages.sort((a, b) => {
            return a.sentAt > b.sentAt ? -1 : b.sentAt > a.sentAt ? 1 : 0;
          }).slice(0, loadAmount).map((message, index) => {
            return (
              <ListGroup.Item key={index}>
                <Row>
                  <Col sm={4}>
                    {message.uuid}
                  </Col>
                  <Col sm={7}>
                    {formatDate(message.sentAt)}
                  </Col>
                  <Col sm={1}>
                    <Button variant={"danger"} type={"button"} onClick={()=> deleteHandler(message.uuid, message.content)}>
                      X
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          })
        }
        <Row>
          <Button variant={"primary"} className="btn btn-block" type={"button"} onClick={loadMoreHandler}>
            LOAD MORE
          </Button>
        </Row>
      </ListGroup>
    </Container>
  );
}

export default App;
