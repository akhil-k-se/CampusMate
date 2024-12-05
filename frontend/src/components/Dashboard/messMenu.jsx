import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios';

const MessMenu = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [image, setImage] = useState(null);
  const [menuDescription, setMenuDescription] = useState('');
  const [menuImageUrl, setMenuImageUrl] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  // Handle the file input change event
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUpdatedImage(URL.createObjectURL(file)); // Preview the image immediately
    }
  };

  const handleDescChange = (e) => {
    setMenuDescription(e.target.value);
  };

  const getImg = async () => {
    try {
      const response = await axios.get('http://localhost:3005/admin/showMenu', {
        withCredentials: true,
      });

      if (response.data.success) {
        const imageUrl = response.data.imageUrl;
        const desc = response.data.description;

        setMenuImageUrl(imageUrl);
        setUpdatedDescription(desc);
      } else {
        console.error('Failed to fetch the image:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    getImg(); // Fetch the image and description when the component mounts
  }, [menuImageUrl,menuDescription]);

  // Handle form submission for uploading the menu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !menuDescription) {
      return alert('Please upload an image and provide a description.');
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', menuDescription);

    try {
      // Upload image and menu details to the backend
      const response = await axios.post('http://localhost:3005/admin/update-menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setMenuImageUrl(response.data.imageUrl);
        setUpdatedDescription(menuDescription);
        alert('Mess Menu updated successfully!');
      } else {
        alert('Failed to update the Mess Menu.');
      }
    } catch (error) {
      console.error('Error uploading mess menu:', error);
      alert('Error uploading mess menu. Please try again.');
    }
  };

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? 'ml-[80px]' : 'ml-[300px]'} p-4 bg-gray-800`}>
        <div className="bg-gray-900 shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-white font-semibold mb-4">Update Mess Menu</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="menuDescription" className="text-white">Menu Description:</label>
              <textarea
                id="menuDescription"
                className="w-full p-2 mt-2 rounded-lg bg-gray-700 text-white"
                placeholder="Enter the description for the menu..."
                value={menuDescription}
                onChange={handleDescChange} // Handle description change
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageUpload" className="text-white">Upload Menu Image:</label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full p-2 mt-2 text-gray-700"
              />
            </div>
            <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600">
              Update Menu
            </button>
          </form>

          {menuImageUrl && (
            <div className="mt-6">
              <h3 className="text-white text-xl font-semibold">Uploaded Image:</h3>
              <img
                src={menuImageUrl}
                alt="Menu"
                className="mt-2 max-w-full h-auto rounded-lg"
              />
              <p className="text-white mt-4">Description: {updatedDescription}</p>
            </div>
          )}

          {/* Preview the new image and description */}
          {/* {updatedImage && updatedDescription && (
            <div className="mt-6">
              <h3 className="text-white text-xl font-semibold">Preview:</h3>
              <img
                src={updatedImage}
                alt="New Menu Preview"
                className="mt-2 max-w-full h-auto rounded-lg"
              />
              <p className="text-white mt-4">New Description: {menuDescription}</p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default MessMenu;
