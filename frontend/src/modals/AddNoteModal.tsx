import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import BASE_URL from "../config/apiConfig";

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
  },
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
  p: 4,
};

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaXlhd2Fuc2Fob2xsaW5AZ21haWwuY29tIiwiaWF0IjoxNjk0MTkyNTY4LCJleHAiOjE2OTQyNzg5Njh9._tpvbzjVGxZP5JuiQeMFP139ZaaagIsVdQ8i84isDhM";

type Note = {
  _id: string;
  title: string;
  content: string;
  createDate: string;
  updatedDate: string;
};

type AddNoteProps = {
  title: string;
  content: string;
};

const addNote = async (props: AddNoteProps) => {
  const axiosConfig = {
    method: "post",
    url: `${BASE_URL}/notes`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      title: props.title,
      content: props.content,
    },
  };
  axios(axiosConfig)
    .then((response: AxiosResponse<{ note: Note }>) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // setLoading(false);
    });
};

type Props = {};

const AddNoteModal = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addNote(values);
    },
  });

  return (
    <div>
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
            <div>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Note Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  fullWidth
                  id="content"
                  name="content"
                  label="Note Content"
                  type="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.content && Boolean(formik.errors.content)
                  }
                  helperText={formik.touched.content && formik.errors.content}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddNoteModal;
