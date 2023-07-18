import './App.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

function App() {

  // to maintain the state of the fullName and email fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  // flag to open the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // function that reads the contents of the file uploaded and displays it
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setFileContent(content);
      };
      reader.readAsText(file);
    } else {
      setFileContent(null);
    }
  }

  // checks if the file submitted is in .json format or not to emable or disable the submit button, accordingly
  const isFileValid = () => {
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      return fileExtension === 'json';
    }
    return false;
  };

  // function called when form is submitted, tt prevents the default form submission behavior which would cause a page reload and opens the success Modal
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="App">

      <div className="header">
        <FontAwesomeIcon icon={faArrowLeft} className="arrowIcon" />
        <h2>Submit form</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label><br/>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label><br/>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="file">Upload JSON File</label><br/>
          <input
            type="file"
            accept=".json"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="fileContent">File contents</label><br/>
          <div className="fileContentContainer">{fileContent}</div>
        </div>
        <div className="footer">
          {/* the button is disabled or enabled depending on the file formal uploaded */}
          <button type="submit" disabled={!isFileValid()} className={isFileValid() ? 'active-button' : 'disabled-button'}>Submit</button>
        </div>
      </form>

      {/* Success popup */}
       <Modal isOpen={isModalOpen} className="popUp" transparent={true}>
          <center><div className="iconContainer"><FontAwesomeIcon icon={faCheck} className="checkIcon"/></div></center>
          <h2>Success!</h2>
          <p>524 entries successfully uploaded</p>
          <button className="goEntry">Go to My Entries</button>
          <button className="cancel">Cancel</button>
        </Modal>
    </div>
  );
}

export default App;
