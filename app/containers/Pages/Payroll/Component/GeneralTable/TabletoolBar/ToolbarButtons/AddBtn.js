import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import { 
    Button, 
  } from '@mui/material';



const AddBtn = ({
    title,
      URL,
      disabled,
}) => {

      const menuName = localStorage.getItem('MenuName');
      const history = useHistory();
    

      const addFun = () => {
        history.push(URL);
      }

      

    return(
        <div>
             <Button 
             variant="contained"
             startIcon={<AddIcon />}
              onClick={addFun} 
              disabled={
                menuName.isAdd === false ? 
                    menuName.isAdd 
                    : 
                    disabled ? disabled : false
                  }
              >
                 ADD
            </Button>

        </div>
    )
}



export default AddBtn;