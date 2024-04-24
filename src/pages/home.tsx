import React, { useState } from 'react';
import { getFullData } from '../Api/websiteApi';
import '../utils/Home.css';
import { useQuery } from 'react-query';
import Modal from 'react-modal';
import { Card, CardBody, CardTitle, CardSubtitle, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');
//style for Modal
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f8f8f8',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

const Home: React.FC<any> = () => {
    const { data: fullData, isLoading } = useQuery(
        "data",
        () => getFullData(),
        { keepPreviousData: true }
    );
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    //Function for modal opening
    function openModal(id: number) {
        setSelectedId(id);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    //selecting thr clicked User Details
    const selectedUserData = fullData?.find((userData: any) => userData.id === selectedId);

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div >
                    <h1 className="text">User data's</h1>

                    <div className="card-container">
                        {/* Mapping the users */}
                        {fullData?.map((userData: any) => (
                            <Col xs={12} sm={6} md={6} lg={3} key={userData.id}>
                                <Card
                                    onMouseEnter={() => setHoveredId(userData.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => openModal(userData.id)}
                                    className={hoveredId === userData.id ? "card-hovered" : ""}
                                    title={`Click to view details for ${userData.username}`}
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faUser} className="user-icon" style={{ fontSize: '30px' }} />
                                    </div>
                                    <CardBody>
                                        <CardTitle>
                                            <h2>{userData?.username}</h2>
                                        </CardTitle>
                                        <CardSubtitle>
                                            <h3>{userData?.name}</h3>
                                        </CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </div>
                </div>
            )}
            {/* Modal for showing details of the selected user */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Data Modal"
            >
                <div className='row' style={{ display: 'flex', justifyContent: 'space-between', alignItems: '' }}>
                    <h2 >Full Details</h2>
                    <button onClick={closeModal} className="btn btn-secondary closing-button" style={{ color: "red", border: 'none', background: 'none', fontSize: '30px' }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                {selectedUserData && (
                    <div className='modal-body' style={{ width: 'auto', height: 'auto', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h3>Name:</h3>
                                <p>{selectedUserData.name}</p>
                                <h3>Username:</h3>
                                <p>{selectedUserData.username}</p>
                                <h3>Website:</h3>
                                <p><a href={selectedUserData.website} target="_blank">{selectedUserData.website}</a></p>
                            </div>
                            <div>
                                <h3>Email:</h3>
                                <p>{selectedUserData.email}</p>
                                <h3>Phone:</h3>
                                <p>{selectedUserData.phone}</p>
                                <h3>Company:</h3>
                                <p><span style={{ color: "red" }}>Name </span>:{selectedUserData.company.name},</p>
                                <p><span style={{ color: "red" }}>CatchPrahse </span>:{selectedUserData.company.catchPhrase},</p>
                                <p><span style={{ color: "red" }}>Work </span>:{selectedUserData.company.bs}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h3>Address:</h3>
                                <p>{selectedUserData.address?.street}, {selectedUserData.address?.suite}, {selectedUserData.address?.city}, {selectedUserData.address?.zipcode}, Lat: {selectedUserData.address?.geo?.lat}, Lng: {selectedUserData.address?.geo?.lng}</p>
                            </div>

                        </div>
                    </div>

                )}
            </Modal >
        </>
    );
};

export default Home;
