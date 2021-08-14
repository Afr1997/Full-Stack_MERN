import React,{useState,useEffect} from 'react';
import { TextField ,Button,Typography,Paper} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost,updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';

const Form = ({currentID, setCurrentID}) =>
{
    const classes = useStyles();
   const [postData,setPostData]=useState({
       creator:'',title:'',message:'',tags:'',selectedFile:''
  
   });
   const post=useSelector((state)=>(currentID?state.posts.find((p)=>p._id===currentID):null));
   const dispatch=useDispatch();

   useEffect(()=>{
       if(post) setPostData(post);
   },[post]   );
 
   const clear = () => 
   {
    setCurrentID(null);
    setPostData({ creator:'',title:'',message:'',tags:'',selectedFile:''});
}
const handleSubmit = async(e) => 
   {
    e.preventDefault();
    if(currentID===0)
    {
    dispatch(updatePost(currentID,postData)); 
   
    }
    else
    {
    dispatch(createPost(postData)); 
     
    } 
    clear();  

   }

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentID ? 'Editing ':'Creating '}
                   a Memory
                </Typography>
                <TextField name="creator" 
                variant='outlined' 
                label="Creator" 
                fullWidth
                value={postData.creator}
                onChange={(e)=>setPostData({ ...postData, creator:e.target.value})}
                />

<TextField name="title" 
                variant='outlined' 
                label="title" 
                fullWidth
                value={postData.title}
                onChange={(e)=>setPostData({ ...postData, title:e.target.value})}
                />

<TextField name="message" 
                variant='outlined' 
                label="message" 
                fullWidth
                value={postData.message}
                onChange={(e)=>setPostData({ ...postData, message:e.target.value})}
                />

<TextField name="tags" 
                variant='outlined' 
                label="tags" 
                fullWidth
                value={postData.tags}
                onChange={(e)=>setPostData({ ...postData, tags:e.target.value.split(',')})}
                />
<div className={classes.fileInput}>
    <FileBase
    type="file"
    multiple={false}
    onDone={({base64})=>setPostData({...postData,selectedFile:base64})} />

</div>
<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
<Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>clear</Button>
            </form>
        </Paper>
    );  
};
export default Form;
