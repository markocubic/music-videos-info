import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import styles from "./OptionsButton.module.css";
import "./overridenStylesOptionsButton.css";

export default function OptionsButton(props) {
  const { onEdit } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  return (
    <div className={"optionsButton"}>
      <Button id="fade-button" onClick={handleClickOptions}>
        <MoreVertIcon />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseOptions}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleCloseOptions();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseOptions();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
