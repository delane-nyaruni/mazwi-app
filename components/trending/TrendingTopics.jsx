import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BiPaperPlane, BiMessageDetail } from 'react-icons/bi';
import { FaAngleLeft, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Added vote icons
import { Link, useNavigate } from 'react-router-dom';
// import NET_CONFIG from '../../configs/NetworkConfig';

// --- CONFIGURATION ---
// const ip_address = NET_CONFIG.STATIC_IP;
// const port_address = NET_CONFIG.PORT_ADDRESS;
const JSON_SERVER_URL = `http://192.168.100.12:30050/messages`; 
// --- CONFIGURATION ---

const TrendingTopics = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userName] = useState('GuestUser'); // Default user name
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // --- Data Fetching Logic (Unchanged) ---
    const fetchMessages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(JSON_SERVER_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch messages from MockDB');
            }
            // Fetch messages, and ensure they are sorted by date or ID for chat view
            const data = await response.json();
            setMessages(data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // --- Vote Handling Logic (NEW) ---
    const handleVote = useCallback(async (id, currentVotes, type) => {
        const newVotes = type === 'up' ? currentVotes + 1 : currentVotes - 1;
        
        try {
            // PATCH request to update only the 'votes' field
            const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ votes: newVotes }),
            });

            if (!response.ok) {
                throw new Error('Failed to update vote on MockDB');
            }
            
            const updatedMessage = await response.json();
            
            // Update local state with the new vote count
            setMessages(prevMessages =>
                prevMessages.map(msg => (msg.id === id ? updatedMessage : msg))
            );

        } catch (error) {
            console.error('Error voting:', error);
            alert('Could not record vote. Please check the JSON server connection.');
        }
    }, []);


    // --- Post New Message Logic (Modified to include votes: 0) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newMessage.trim() === '') return;

        const messageData = {
            user: userName,
            text: newMessage.trim(),
            timestamp: new Date().toISOString(),
            votes: 0, // Initialize new messages with 0 votes
        };

        try {
            const response = await fetch(JSON_SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (!response.ok) {
                throw new Error('Failed to post message to MockDB');
            }

            const savedMessage = await response.json();
            
            setMessages(prevMessages => [...prevMessages, savedMessage]);
            setNewMessage(''); 

        } catch (error) {
            console.error('Error posting message:', error);
            alert('Could not send message. Please check the JSON server connection.');
        }
    };


    return (
        <div className="container mt-2 chat-container">
            
            {/* --- HEADER --- */}
            <div className='main-title mb-2'> 
                <Link onClick={() => navigate(-1)} className="btn btn-succes mt-2 pb-1 new-account-ticket float-ends">
                    <FaAngleLeft size={25} /> 
                </Link>
                <h4 className="text-gray-500 mt-2 float-end">Chatroom <BiMessageDetail color='green' className="me-2" size={24} /> </h4>
            </div>
            
            {/* --- CHAT DISPLAY AREA --- */}
            <div className=" border-0 rounded-lg">
                <div 
                    className="card-body p-3 chat-messages-scroll" 
                    style={{ height: 'calc(100vh - 150px)', overflowY: 'auto', paddingBottom: '70px' }}
                >
                    {loading ? (
                        <div className="text-center text-muted py-5">Loading messages...</div>
                    ) : (
                        messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`d-flex ${msg.user === userName ? 'justify-content-end' : 'justify-content-start'} mb-3`}
                            >
                                <div className={`p-2 rounded-3 text-break shadow-sm ${
                                    msg.user === userName 
                                        ? 'bg-success text-white' 
                                        : 'bg-light border'
                                }`} style={{ maxWidth: '75%' }}>
                                    <small className="fw-bold d-block mb-1" style={{ color: msg.user === userName ? '#fff' : '#0d6efd' }}>
                                        {msg.user}
                                    </small>
                                    <p className="m-0">{msg.text}</p>
                                    <div className='d-flex justify-content-between align-items-center mt-2'>
                                        <small className={`text-opacity-75 ${msg.user === userName ? 'text-white' : 'text-muted'}`}>
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </small>
                                        
                                        {/* --- VOTING CONTROLS (NEW) --- */}
                                        <div className='d-flex align-items-center'>
                                            <button 
                                                className='btn btn-sm p-0 m-0 me-2' 
                                                onClick={() => handleVote(msg.id, msg.votes || 0, 'up')}
                                                style={{ color: msg.user === userName ? 'white' : 'green' }}
                                            >
                                                <FaThumbsUp size={16} />
                                            </button>
                                            <span className={`fw-bold me-2 ${msg.user === userName ? 'text-white' : 'text-primary'}`}>
                                                {msg.votes || 0}
                                            </span>
                                            <button 
                                                className='btn btn-sm p-0 m-0' 
                                                onClick={() => handleVote(msg.id, msg.votes || 0, 'down')}
                                                style={{ color: msg.user === userName ? 'white' : 'red' }}
                                            >
                                                <FaThumbsDown size={16} />
                                            </button>
                                        </div>
                                        {/* ----------------------------- */}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* --- MESSAGE INPUT FORM (FIXED TO BOTTOM) --- */}
            <div className="fixed-bottom-msg-box  border-0 p-3 pt-0 mt-0">
                    <form onSubmit={handleSubmit} className="input-group">
                        <input
                            type="text"
                            className="form-control border-end-0 pt-0"
                            placeholder="Taura zvinovaka nevamwe..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={loading || userName.trim() === ''}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary pt-0"
                            disabled={loading || newMessage.trim() === '' || userName.trim() === ''}
                        >
                            <BiPaperPlane size={20} />
                        </button>
                    </form>
            </div>
        </div>
    );
};

export default TrendingTopics;