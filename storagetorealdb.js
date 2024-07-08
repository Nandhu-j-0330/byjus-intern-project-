
// import React, { useState } from 'react';
// import { View, Button, Image, TextInput } from 'react-native';
// import firebase from 'firebase';
// import 'firebase/storage';
// import 'firebase/database';

// const Dbworks = () => {
//   const [imageURI, setImageURI] = useState('');
//   const [description, setDescription] = useState('');

//   const uploadImage = async () => {
//     try {
//       const response = await fetch(imageURI);
//       const blob = await response.blob();

//       // Upload the image to Firebase Storage
//       const storageRef = firebase.storage().ref().child('images/' + imageURI);
//       const snapshot = await storageRef.put(blob);

//       // Get the download URL of the uploaded image
//       const downloadURL = await snapshot.ref.getDownloadURL();

//       // Save the download URL and description to Firebase Realtime Database
//       await firebase.database().ref('images').push({
//         imageURL: downloadURL,
//         description: description
//       });

//       console.log('Image uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading image: ', error);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter Image URL"
//         onChangeText={text => setImageURI(text)}
//         value={imageURI}
//       />
//       <TextInput
//         placeholder="Enter Description"
//         onChangeText={text => setDescription(text)}
//         // value={description}
//       />
//       <Button title="Upload Image" onPress={uploadImage} />
//     </View>
//   );
// };
 
// export default Dbworks;



