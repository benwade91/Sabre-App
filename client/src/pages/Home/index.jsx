import React, { useState } from 'react';
import './style.css';
// import schedule from './images/schedule.png';
import Login from '../../components/Login';
// import Auth from '../../utils/auth';
import { Modal, Button, Alert } from 'react-bootstrap';
import androidPWA from './images/android-pwa.png';
import iOSpwa from './images/ios-pwa.png';
import iosShare from './images/ios-share-icon.png';
import androidMenu from './images/android-menu-icon.png'

const Home = () => {
    const [showiOS, setshowiOS] = useState(false)
    const [showAndroid, setshowAndroid] = useState(false)

    const closeiOS = () => setshowiOS(false)
    const closeAndroid = () => setshowAndroid(false)

    return (
        <>
            <div className='homeScreen'>
                <Login />
                {/* <img src={schedule} className='schedulePng' alt="gym schedule"/> */}
                <div>
                    <Alert>
                        <Alert.Heading>Hey!</Alert.Heading>
                        <p>For the best experience, you should add Sabre Chat to your home screen and use it just like a normal app. For directions, select your device!</p>
                        <hr />
                        <div className='d-flex justify-content-evenly'>
                            <Button onClick={() => setshowiOS(true)}>iOS</Button>
                            <Button onClick={() => setshowAndroid(true)}>Android</Button>
                        </div>
                    </Alert>
                </div>
            </div>

            <Modal
                show={showiOS}
                onHide={closeiOS}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>iPhone Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Start by selecting the 'share' button at the bottom of the screen. 
                    <img className='iconExample' src={iosShare} alt="" />
                    <hr />
                    Then, select the 'Add to Home Screen' option.
                    <hr />
                    <img className='modalImg' src={iOSpwa} alt="" />
                    <hr />
                    And, you're done!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeiOS}>
                        Done!
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAndroid}
                onHide={closeAndroid}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Android Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Start by selecting the menu button at the top of the browser.
                    <img className='iconExample' src={androidMenu} alt="" />
                    <hr />
                    Then, select the 'Add to Home Screen' option
                    <hr />
                    <img className='modalImg' src={androidPWA} alt="" />
                    <hr />
                    And you're done!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeAndroid}>
                        Got it!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Home;