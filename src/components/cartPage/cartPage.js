import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
//import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { addToCart, clearCart, decreaseCart, getTotals } from '../../features/cartFreatures/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2'

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart])


  console.log(cart)
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  }

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  }
  const handleClearCart = () => {
    dispatch(clearCart());
  }
  const handleProceed = () => {
    toggleDrawer('right', false);
    Swal.fire({
      title: 'Order Processed SuccessFully!!',
      icon: 'success',
      confirmButtonText: 'Cool'
    })

  }

  const list = (anchor) => (
    <Box

      sx={{ width: 350, p: 2 }}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}

    >
      <h2>My Cart</h2>
      <Divider />
      {cart?.cartItems?.length == 0 ? (
        <Box
          sx={{
            width: 320,
            height: 461,


          }}

        >
          <Box
            component="img"
            sx={{
              height: 333,
              width: 350,
              maxHeight: { xs: 233, md: 300 },
              maxWidth: { xs: 350, md: 300 },
            }}
            alt="The house from the offer."
            src="https://img.freepik.com/free-vector/kid-sitting-supermarket-shopping-cart_3446-359.jpg?w=740&t=st=1660533674~exp=1660534274~hmac=a79d8e3f325a96704c0033b9bab45c48e2a31ee0e11e15ee870e44e892ae932e"
          />
          <h5>You don't have any items in your cart</h5>
          <p>Your favourite items are just a click away</p>
          <Link to='/'>
            <Button variant="success">Start Shopping</Button>
          </Link>
        </Box>

      ) : (
        <>
          <div className='cartProductList'>

            {cart.cartItems.map((cartItem) => (
              <div className='productContainer'>
                {/* For image */}
                <div className='cart-product'>
                  <img src={cartItem.image} alt={cartItem.title} />
                </div>
                {/* For Title and quantity */}
                <div className='titlePrice'>
                  <div>
                    {cartItem.title}
                  </div>
                  <div className='cart-product-price'>
                    ${cartItem.cartQuantity * cartItem.price}
                  </div>
                  <div className='button-Up-Down'>
                    <Button onClick={() => handleDecreaseCart(cartItem)}>-</Button>
                    <div>{cartItem.cartQuantity}</div>
                    <Button onClick={() => handleIncreaseCart(cartItem)}>+</Button>
                  </div>
                </div>
                <hr />
              </div>

            ))}

          </div>
          <Button className="mt-3" variant="danger" onClick={() => handleClearCart()}>Clear Cart</Button>
          <div className='total-bill'>
            <h4 style={{ flex: '0.7' }}>Bill total</h4>
            <h4 style={{ flex: '0.3' }}>${cart.cartTotalAmaount}</h4>
          </div>
          <div onClick={() => handleProceed()} className='cart-proceed'>
            <div style={{ flex: '0.7', paddingLeft: '13px' }}>
              {cart.cartTotalQuantity} items
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
              ${cart.cartTotalAmaount}
            </div>

            <div style={{ flex: '0.3' }}>
              Proceed
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
              </svg>
            </div>
          </div>
        </>
      )}

    </Box>
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 6px',

    },
  }));

  return (
    <div>
      <React.Fragment key={'right'}>
        <Button onClick={toggleDrawer('right', true)} style={{ backgroundColor: 'white' }}>
          <IconButton >
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
            <StyledBadge badgeContent={cart.cartTotalQuantity} color="secondary">
              <LocalMallIcon />
            </StyledBadge>
          </IconButton>
        </Button>
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
      </React.Fragment>

    </div>
  );
}
