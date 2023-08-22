import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import { useContext } from 'react';
import { UseCartContext } from '../../../Context/CartContext';
import { UseStorageContext } from '../../../Context/StorageContext';

export default function CartWidget(){

    const {items,getQuantity}=useContext(UseCartContext)

    return(        
        <div className='cartWidget-container'>  
            <Badge badgeContent={getQuantity()} color="primary">
                <ShoppingCartOutlinedIcon fontSize="large"/>
            </Badge>
        </div>
    )
}
