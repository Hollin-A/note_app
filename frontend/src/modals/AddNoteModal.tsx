import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addNote } from "../features/notes/noteSlice";
import { userSelector } from "../features/user/userSlice";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null as any, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null as any, true);
        }
      },
    });

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  }
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

const AddNoteModal = () => {
  const [jwt, setJwt] = useState<string | undefined>(undefined);
  const selectedUsers = useAppSelector(userSelector);

  useEffect(() => {
    setJwt(selectedUsers.jwt);
  }, [selectedUsers]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  function handleAddNote(props: { title: string; content: string }) {
    const newNote = {
      title: props.title,
      content: props.content,
      jwt: jwt,
    };
    dispatch(addNote(newNote));
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddNote(values);
      handleClose();
    },
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<AddRoundedIcon />}
      >
        Add Note
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Note Title"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="content"
                name="content"
                label="Note Content"
                type="content"
                multiline
                rows={4}
                variant="outlined"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                sx={{ mb: 2 }}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Add
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddNoteModal;
