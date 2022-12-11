import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  Button,
  FormGroup,
  FormControl,
  OutlinedInput,
  Typography,
  IconButton,
  MenuItem,
  Select,
  InputAdornment,
} from '@mui/material';
import global from './../styles/global';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './../service/firebase-config';
import { AddSubData } from '../service/firebase';

export default function AddItems({ open, cancel }) {
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [juice, setJuice] = useState({
    flavor: '',
    nicotinelevel: '',
    miligram: '',
    price: '',
    category: '',
  });

  const { flavor, nicotinelevel, miligram, price, category } = juice || {};

  //Handle Image File
  const handleImage = (evnt) => {
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];

    if (targetFiles.length < 9) {
      setImages(targetFilesObject);
    }
  };

  const handleChange = (e) => {
    setJuice({ ...juice, [e.target.name]: e.target.value });
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

    await AddSubData(juice, images);
    cancel();
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
        <Box component="form" onSubmit={handleSubmit}>
          <Box>
            <FormGroup>
              <FormControl sx={{ ...global.addForm }}>
                <Typography fontWeight="bold"> Juice Flavor : </Typography>
                <OutlinedInput
                  required
                  name="flavor"
                  value={flavor}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ ...global.addForm }}>
                <Typography fontWeight="bold"> Price : </Typography>
                <OutlinedInput
                  required
                  startAdornment={
                    <InputAdornment position="end">₱ </InputAdornment>
                  }
                  name="price"
                  value={price}
                  onChange={handleChange}
                />
              </FormControl>
              <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ ...global.addForm }}>
                  <Typography fontWeight="bold"> Nicotine Level : </Typography>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">mg</InputAdornment>
                    }
                    name="nicotinelevel"
                    value={nicotinelevel}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ ...global.addForm }}>
                  <Typography fontWeight="bold"> Miligram : </Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">mg</InputAdornment>
                    }
                    name="miligram"
                    value={miligram}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>

              <FormControl sx={{ ...global.addForm }}>
                <Typography fontWeight="bold"> Juice Category: </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <MenuItem value={'Fruity'}>Fruity</MenuItem>
                  <MenuItem value={'Pastry'}>Pastry</MenuItem>
                </Select>
              </FormControl>

              {previewImage.length === 0 ? (
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
                      type="file"
                      onChange={handleImage}
                    />
                  </Button>
                  <Typography fontWeight="bold">Upload Image</Typography>
                </FormControl>
              ) : (
                <FormControl sx={{ ...global.addForm }}>
                  {previewImage.map((pi) => {
                    return (
                      <Box sx={{ position: 'relative', width: 200 }}>
                        <IconButton
                          sx={{ position: 'absolute', right: '10px' }}
                          onClick={handleRemovePhoto}
                        >
                          <CloseIcon />
                        </IconButton>
                        <img src={pi} alt="preview" className="preview-image" />
                      </Box>
                    );
                  })}
                </FormControl>
              )}
            </FormGroup>
          </Box>
          <div sx={{ display: 'flex', padding: '10px' }}>
            <Button
              sx={{ ...global.btnPrimary, width: '200px', margin: '10px 20px' }}
              type="submit"
            >
              Add
            </Button>
            <Button
              onClick={cancel}
              sx={{ width: '200px', margin: '10px 20px' }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
}
