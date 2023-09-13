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
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { blueGrey } from "@mui/material/colors";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";

import DeleteNoteModal from "../modals/DeleteNoteModal";
import EditNoteModal from "../modals/EditNoteModal";

type NoteProps = {
  note: INote;
};

const NoteCard = (props: NoteProps) => {
  const { _id, title, content, category } = props.note;

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
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }}>
            {category === "personal" ? (
              <PersonRoundedIcon />
            ) : category === "work" ? (
              <WorkRoundedIcon />
            ) : (
              <QuestionMarkRoundedIcon />
            )}
          </Avatar>
        }
        action={
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Options">
              <IconButton onClick={handleOpenUserMenu}>
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
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
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
