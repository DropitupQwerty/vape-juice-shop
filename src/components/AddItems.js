import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  Button,
  FormGroup,
  FormControl,
  OutlinedInput,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import global from './../styles/global';
import AddIcon from '@mui/icons-material/Add';

export default function AddItems({ open, cancel }) {
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  //Handle Image File
  const handleImage = (evnt) => {
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];

    if (targetFiles.length < 9) {
      setImages(targetFilesObject);
    }
  };

  //Preview image into Object Url
  useEffect(() => {
    const handlePreview = () => {
      const selectedFIles = [];
      images.map((file) => {
        console.log('file', file);
        return selectedFIles.push(URL.createObjectURL(file));
      });
      setPreviewImage(selectedFIles);
    };
    handlePreview();
  }, [images]);

  //Do Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  //Remove Photo in UI
  const handleRemovePhoto = (photo) => {
    const image = [...images];
    const index = previewImage.indexOf(photo);
    image.splice(index, 1);
    setImages(image);
  };
  console.log(previewImage);

  return (
    <div>
      <Dialog open={open}>
        <Box sx={{ width: '500px' }}>
          <Box component="form">
            <FormGroup>
              <FormControl sx={{ ...global.addForm }}>
                <Typography fontWeight="bold"> Juice Flavor : </Typography>
                <OutlinedInput />
              </FormControl>
              <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ ...global.addForm }}>
                  <Typography fontWeight="bold"> Nicotine Level : </Typography>
                  <OutlinedInput />
                </FormControl>
                <FormControl sx={{ ...global.addForm }}>
                  <Typography fontWeight="bold"> Miligram : </Typography>
                  <OutlinedInput />
                </FormControl>
              </Box>

              <FormControl sx={{ ...global.addForm }}>
                <Typography fontWeight="bold"> Juice Category: </Typography>
                <OutlinedInput />
              </FormControl>

              <FormControl sx={{ ...global.addForm }}>
                <Button
                  component="label"
                  sx={{
                    height: '150px',
                    width: '100px',
                    border: '1px dashed #333',
                    borderRadius: '20px',
                    opacity: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AddIcon fontSize="large" />
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleImage}
                  />
                </Button>
                <Typography fontWeight="bold">Upload Image</Typography>
              </FormControl>

              <FormControl>
                {previewImage.map((pi) => {
                  return (
                    <img src={pi} alt="preview" className="preview-image" />
                  );
                })}
              </FormControl>
            </FormGroup>
          </Box>
          <div>
            <Button sx={{ ...global.btnPrimary }}> Add</Button>
            <Button onClick={cancel}> Cancel</Button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
}
