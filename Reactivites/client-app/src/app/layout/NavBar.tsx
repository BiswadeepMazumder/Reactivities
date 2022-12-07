import React from "react";
import { Button, Container, Image, Menu, MenuHeader, MenuItem, MenuMenu } from "semantic-ui-react";

interface Props{   
    openForm: () => void;
}

export default function NavBar({openForm}:Props) {
    return (
        <>
        <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src="/assets/CSU_Reverse_Seal.jpg" alt="Logo" style={{marginRight:'10px'}}></img>
            </Menu.Item>

            <Menu.Item name='Activities'/>

            <Menu.Item>
                <Button onClick={openForm} positive content='Create Activity'/>
            </Menu.Item>

        </Container>
    </Menu>
    </>
    )
}

