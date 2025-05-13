import React, { useState, useRef } from 'react'; 
import './layout.css';
import UserProfileDisplay from './ProfileDisplay';
import { useOutletContext } from 'react-router-dom';


function PostModal({ show, onClose, onSubmit }) {
  const { userProfile } = useOutletContext();
  const [postData, setPostData] = useState({
    content: '',
    deadlineDate: '',
    deadlineTime: '',
    destination: '',
    imageUrl: '',
  });

  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(postData);
    onClose();
    setPostData({
      content: '',
      deadlineDate: '',
      deadlineTime: '',
      destination: '',
    });
  };

  const handleFileClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData((prevData) => ({
          ...prevData,
          imageUrl: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const isFormComplete =
    postData.content && postData.deadlineDate && postData.deadlineTime && postData.destination;

  if (!show) return null;

  return (
    <div className="modal-overlay2">
      <div className="modal-box2">
        <header className="modal-header">
          <h3 className="Createpost">Create post</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </header>

        <div className="modal-body">
          <div className="left-column">
          <UserProfileDisplay name={userProfile.name} image={userProfile.image} />
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="deadlineDate">Due Date</label>
                <input
                  type="date"
                  name="deadlineDate"
                  id="deadlineDate"
                  value={postData.deadlineDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadlineTime">Due Time</label>
                <input
                  type="time"
                  name="deadlineTime"
                  id="deadlineTime"
                  value={postData.deadlineTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Enter destination"
                  value={postData.destination}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="textarea-right">
            <label htmlFor="content">Task Description</label>
            <textarea
              name="content"
              id="content"
              placeholder="What do you need?"
              value={postData.content}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="icons">
            <button type="button" onClick={handleFileClick}>📷</button> 
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!isFormComplete}
            style={{
              opacity: isFormComplete ? 1 : 0.5,
              cursor: isFormComplete ? 'pointer' : 'not-allowed',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
