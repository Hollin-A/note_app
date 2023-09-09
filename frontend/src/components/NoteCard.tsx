import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

import DeleteNoteModal from "../modals/DeleteNoteModal";
import EditNoteModal from "../modals/EditNoteModal";

type Note = {
  _id: string;
  title: string;
  content: string;
  createDate: string;
  updatedDate: string;
};

type NoteProps = {
  note: Note;
};

const NoteCard = (props: NoteProps) => {
  const { _id, title, content } = props.note;

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);

  const settings = [
    { name: "Edit", onClickFunc: handleEditOpen },
    { name: "Delete", onClickFunc: handleDeleteOpen },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{
            marginBottom: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {title}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MoreVertRoundedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => setting.onClickFunc()}
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Typography>
        <Divider />
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          {content}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{}} key={_id}>
      <Card variant="outlined" sx={{ borderRadius: "10px" }}>
        {card}
        <DeleteNoteModal
          note={props.note}
          open={deleteOpen}
          setOpen={setDeleteOpen}
        />
        <EditNoteModal
          note={props.note}
          open={editOpen}
          setOpen={setEditOpen}
        />
      </Card>
    </Box>
  );
};

export default NoteCard;
