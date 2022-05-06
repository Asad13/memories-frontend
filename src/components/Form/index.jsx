import {useState} from 'react';
import {Paper,TextField,Button,Typography, Alert} from '@mui/material';
import FileBase from 'react-file-base64';
import { createPost,updatePost } from '../../api/posts';
import Loader from '../Loader';
import { addPost,selectPost,changePost } from '../../redux/features/posts/postsSlice';
import {useSelector,useDispatch} from 'react-redux';

const Form = () => {
    const {selectedPost: postData} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    
    const [feedback,setFeedback] = useState({
        isLoading: false,
        isSuccessful: true,
        isModalOpen: false,
        feedbackMsg: '',
    })
    const clear = () => {
        dispatch(selectPost({
            author: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
            _id: null,
        }));
    }

    const handleSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        
        setFeedback({
            ...feedback,
            isLoading: true,
        });

        if(postData.author && postData.title && postData.message && postData.tags && postData.selectedFile){
            if(postData._id === null){
                createPost({
                    ...postData,
                    tags: postData.tags.trim().split(' '),
                }).then((response) => {
                    if(response.status === 201){
                        dispatch(addPost(response.data));
                        setFeedback({
                            ...feedback,
                            isLoading: false,
                            isSuccessful: true,
                            isModalOpen: true,
                            feedbackMsg: 'Successful!!!',
                        });
                        clear();
                    }else{
                        setFeedback({
                            ...feedback,
                            isLoading: false,
                            isSuccessful: false,
                            isModalOpen: true,
                            feedbackMsg: 'Unsuccessful!!!',
                        });
                        clear();
    
                    }
                })
                .catch((error) => {
                    setFeedback({
                        ...feedback,
                        isLoading: false,
                        isSuccessful: false,
                        isModalOpen: true,
                        feedbackMsg: 'Unsuccessful!!!',
                    });
                    clear();
                });
            }else{
                updatePost(postData._id,{
                    ...postData,
                    tags: postData.tags.trim().split(' '),
                }).then((response) => {
                    if(response.status === 200){
                        dispatch(changePost(response.data));
                        setFeedback({
                            ...feedback,
                            isLoading: false,
                            isSuccessful: true,
                            isModalOpen: true,
                            feedbackMsg: 'Successful!!!',
                        });
                        clear();
                    }else{
                        setFeedback({
                            ...feedback,
                            isLoading: false,
                            isSuccessful: false,
                            isModalOpen: true,
                            feedbackMsg: 'Unsuccessful!!!',
                        });
                        clear();
    
                    }
                })
                .catch((error) => {
                    setFeedback({
                        ...feedback,
                        isLoading: false,
                        isSuccessful: false,
                        isModalOpen: true,
                        feedbackMsg: 'Unsuccessful!!!',
                    });
                    clear();
                });
            }
            }
    }

    const handleChange = event => {
        dispatch(selectPost({
            ...postData,
            [event.target.name]: event.target.value
        }));
    }

    if(feedback.isLoading){
        return <Loader />;
    }

    return (
        <Paper sx={styles.paper}>
            { feedback.isModalOpen && (
                <Alert severity={feedback.isSuccessful ? "success" : "error"} onClose={() => {
                    setFeedback({
                        isLoading: false,
                        isSuccessful: true,
                        isModalOpen: false,
                        feedbackMsg: '',
                    });
                }}>{feedback.feedbackMsg}</Alert>
            )}
            <form autoComplete="off" noValidate sx={styles.form} onSubmit={(event) => handleSubmit(event)}>
                <Typography variant='h6' component='h6'>{(postData._id) ? 'Edit a Memory' : 'Create a Memory'}</Typography>
                <TextField name="author" type="text" sx={styles.input} label="Name" fullWidth value={postData.author} onChange={(event) => handleChange(event)} />
                <TextField name="title" type="text" sx={styles.input} label="Title" fullWidth value={postData.title} onChange={(event) => handleChange(event)} />
                <TextField name="message" multiline rows="5" sx={styles.input} label="Message" fullWidth value={postData.message} onChange={(event) => handleChange(event)} />
                <TextField name="tags" type="text" sx={styles.input} label="Tags" fullWidth value={postData.tags} onChange={(event) => handleChange(event)} />
                <div style={styles.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => dispatch(selectPost({
                        ...postData,
                        selectedFile: base64,
                    }))} />
                </div>
                <Button sx={styles.input} size="large" fullWidth color='primary' type='submit' variant='contained'>Submit</Button>
                <Button size="large" fullWidth color='secondary' onClick={clear} variant='outlined'>Clear</Button>
            </form>
        </Paper>
    )
}

const styles = {
  paper: {
    textAlign: 'center',
    padding: '16px',
  },
  form: {
      margin: '8px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
  },
  input: {
    margin: '10px 0',
  },
  fileInput: {
      width: '100%',
      margin: '10px 0',
  }
}

export default Form;