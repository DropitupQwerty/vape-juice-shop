import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  Box,
  Typography,
  Chip,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from './../service/firebase-config';

export default function BuyDialog({ open, item, cancel }) {
  const [ml, setMl] = useState([]);
  const [product, setProduct] = useState({
    mililiter: 30,
    nicotinelevel: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem('USER'));

  const { mililiter, nicotinelevel } = product || {};

  useEffect(() => {
    const getItem = () => {
      setMl(item);
    };
    getItem();
  }, [item]);

  useEffect(() => {}, []);

  const handleMLChange = (e, ml) => {
    setProduct({ ...product, mililiter: ml });
    console.log(product);
  };

  const handleMgChange = (e, mg) => {
    setProduct({ ...product, nicotinelevel: mg });
  };

  const handleIncrement = () => {
    if (quantity < ml.quantity) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleBuy = () => {
    sessionStorage.setItem(
      'BUY',
      JSON.stringify([
        {
          ml: product?.mililiter,
          mg: product?.nicotinelevel,
          buyquantity: quantity,
          ...item,
          price: ml?.price * quantity,
        },
      ])
    );
    navigate('/checkout');
  };

  const add = (value) => {
    const { price } = item || {};
    return parseInt(price) + value;
  };

  const f = () => {
    const { price } = item || {};

    if (mililiter === 30 && nicotinelevel === 15)
      setMl({ ...ml, price: price });
    else if (mililiter === 30 && nicotinelevel === 25)
      setMl({ ...ml, price: add(50) });
    else if (mililiter === 30 && nicotinelevel === 50)
      setMl({ ...ml, price: add(100) });
    else if (mililiter === 50 && nicotinelevel === 15)
      setMl({ ...ml, price: add(60) });
    else if (mililiter === 50 && nicotinelevel === 25)
      setMl({ ...ml, price: add(110) });
    else if (mililiter === 50 && nicotinelevel === 50)
      setMl({ ...ml, price: add(160) });
    else if (mililiter === 65 && nicotinelevel === 15)
      setMl({ ...ml, price: add(100) });
    else if (mililiter === 65 && nicotinelevel === 25)
      setMl({ ...ml, price: add(150) });
    else if (mililiter === 65 && nicotinelevel === 50)
      setMl({ ...ml, price: add(210) });
  };

  console.log(ml);

  useEffect(() => {
    f();
  }, [product]);

  const handleAddtoCart = async () => {
    await addDoc(collection(db, `users/${user?.uid}/cart`), {
      ml: product?.mililiter,
      mg: product?.nicotinelevel,
      buyquantity: quantity,
      ...item,
      price: ml?.price * quantity,
    }).then(async (res) => {
      await updateDoc(doc(db, `users/${user?.uid}/cart/${res.id}`), {
        cartId: res.id,
      });
      navigate('/cart');
    });
  };

  return (
    <div>
      <Dialog open={open}>
        <Box
          sx={{
            width: '500px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <IconButton
            variant="outlined"
            sx={{ position: 'absolute', top: '10px', right: '10px' }}
            onClick={cancel}
          >
            <ClearIcon />
          </IconButton>
          <div style={{ marginRight: '30px' }}>
            <img
              className="preview-image"
              src={item?.image}
              alt={item?.flavor}
            />
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {item?.flavor}
            </Typography>
          </div>
          <div>
            <div className="buy-items">
              <Typography variant="h6">
                <b>Price:</b> ₱{ml?.price}
              </Typography>
              <div className="buy-items">
                <Typography variant="h7">
                  <b>Nicotine Level:</b>
                </Typography>
              </div>

              {ml?.nicotinelevel?.map((mg) => {
                return (
                  <ToggleButtonGroup
                    name="mililiter"
                    value={nicotinelevel}
                    onChange={handleMgChange}
                    exclusive
                    sx={{ margin: ' 5px 0' }}
                  >
                    <ToggleButton sx={{ margin: '0 5px' }} value={parseInt(mg)}>
                      {`${mg} Mg`}
                    </ToggleButton>
                  </ToggleButtonGroup>
                );
              })}

              {/* <div className="buy-items">
                <Typography variant="h7">
                  <b>Stocks :</b>
                </Typography>
              </div>
              <div>
                <Chip label={`${item?.quantity}`} />
              </div> */}

              <div className="buy-items">
                <div>
                  <Typography variant="h7">
                    <b>Mililiter:</b>
                  </Typography>
                </div>
                {ml?.mililiter?.map((ml) => {
                  return (
                    <ToggleButtonGroup
                      name="mililiter"
                      value={mililiter}
                      onChange={handleMLChange}
                      exclusive
                      sx={{ margin: ' 5px 0' }}
                    >
                      <ToggleButton
                        sx={{ margin: '0 5px' }}
                        value={parseInt(ml)}
                      >
                        {`${ml} ML`}
                      </ToggleButton>
                    </ToggleButtonGroup>
                  );
                })}
              </div>
              <div className="buy-items">
                <div>
                  <Typography variant="h7">
                    <b>Quantity : </b>
                  </Typography>
                </div>
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                  sx={{ display: 'flex', alignItems: 'center', margin: '5px' }}
                >
                  <Button onClick={handleIncrement}>+</Button>
                  {quantity && <Button disabled>{quantity}</Button>}
                  {quantity && <Button onClick={handleDecrement}>-</Button>}
                </ButtonGroup>
                <div>
                  <Typography variant="h7">
                    <b>Available : </b> {ml?.quantity} pcs
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Box>
        {!!user ? (
          <Button
            variant="contained"
            sx={{ margin: '10px 20px' }}
            onClick={handleBuy}
          >
            Buy
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ margin: '10px 20px' }}
            component={Link}
            to="/login"
          >
            Buy
          </Button>
        )}
        {!!user ? (
          <Button sx={{ margin: '10px 20px' }} onClick={handleAddtoCart}>
            Add to cart <AddShoppingCartIcon />
          </Button>
        ) : null}
      </Dialog>
    </div>
  );
}
