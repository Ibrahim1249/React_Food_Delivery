import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Hamburger() {
    const {paymentDetails} = useSelector((state)=>{return state.checkOutReducer});

  
  return (
    <>
         <Dropdown >
      <MenuButton  variant="soft"
    color="warning"><MenuOpenIcon/></MenuButton>
      <Menu>
        <MenuItem><Link to='/'>Home</Link></MenuItem>
        <MenuItem><a href="#food-display">Menu</a></MenuItem>
        <MenuItem><Link to='/reviews'>Reviews</Link></MenuItem>
        <MenuItem><Link to='/aiRecipe'>Ai Recipe</Link></MenuItem>
        <MenuItem><Link to='/cart'>cart</Link></MenuItem>
        <Link to='/order'>{paymentDetails.length > 0 ? "Order History" : ""}</Link>
      </Menu>
    </Dropdown>
    </>
  )
}

export default Hamburger