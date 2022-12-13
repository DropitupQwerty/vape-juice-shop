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
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ml = [30, 50, 65];
const mg = [15, 25, 50];

export default function AddItems({ open, cancel }) {
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [nicotinelevel, setNicotineLevel] = React.useState([]);
  const navigate = useNavigate();
  const [juice, setJuice] = useState({
    flavor: '',
    price: '',
    category: '',
    quantity: '',
  });
  console.log(personName);
  const handlemenuChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };
  const handleMgChange = (event) => {
    const {
      target: { value },
    } = event;
    setNicotineLevel(typeof value === 'string' ? value.split(',') : value);
  };

  const { flavor, price, category, quantity } = juice || {};

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
    await AddSubData(juice, personName, images, nicotinelevel);
    // cancel();
    setJuice({
      flavor: '',
      nicotinelevel: '',
      price: '',
      category: '',
      quantity: '',
    });
    navigate('/admin/sales');
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
                <Typography fontWeight="bold"> Quantity : </Typography>
                <OutlinedInput
                  required
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl sx={{ ...global.addForm, width: '100%' }}>
                  <Typography fontWeight="bold"> Price/pc : </Typography>
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

                <FormControl sx={{ ...global.addForm, width: '100%' }}>
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
              </Box>

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

              <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ ...global.addForm, width: '100%' }}>
                  <Typography fontWeight="bold"> Nicotine Level : </Typography>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={nicotinelevel}
                    onChange={handleMgChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {mg?.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={nicotinelevel.indexOf(name) > -1} />
                        <ListItemText
                          primary={<Typography>{name}mg</Typography>}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ ...global.addForm, width: '100%' }}>
                  <Typography fontWeight="bold"> Mililiter : </Typography>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handlemenuChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {ml?.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText
                          primary={<Typography>{name}ml</Typography>}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
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
