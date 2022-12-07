import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/modules/activity";

interface Props {
    activity:Activity;
    cancelSelectActivity: () =>void;
    openForm: (id: String) => void;
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm}:Props){
    return(
    <Card fluid>
     <Image src={`assets/categoryImages/${activity.category}.jpg`}/>
         <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                <Button.Group widths='2'>
                  <Button basic onClick={()=>openForm(activity.id)} color="blue">Edit</Button>
                  <Button basic onClick={cancelSelectActivity} color="grey">Cancel</Button>
                </Button.Group>
            </a>
        </Card.Content>
    </Card>
    )
}