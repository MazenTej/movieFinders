import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { ActionIcon, MantineProvider, Textarea } from '@mantine/core'
import { CommentHtml, CommentData, CommentProps, SubmitIcon} from './Comment'
import { fetchComments, Comments, postReply, postComment } from './commentsHandlers'
import './index.css'

interface CustomComponentProps {
  movieID: string;
}

interface TextInputProps {
  reply: string;
  updateReply: (reply: string) => void;
  setReply: () => void;
}
export function TextInput({ reply, setReply, updateReply }: TextInputProps) {
  return (
    <div className='CommentInputBox'>
            <Textarea
                    className='CommentInput'
                    placeholder="Your Opinion"
                    value={reply}
                    onChange={(event) => {
                        
                        updateReply(event.currentTarget.value);
                    }}
                    label="Discussion" />  <ActionIcon variant="filled" className='CommentSubmitButton' onClick={
                      () => {
                        setReply();
                      }
                    }>
                    <SubmitIcon />
                    </ActionIcon>
            </div>
  )
}
 
const CustomComponent: React.FC<CustomComponentProps> = ({ movieID }) => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [comments, setComments] = useState<Comments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentsData = await fetchComments(movieID);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
    console.log(currentUser);
  }, [movieID]);

  useEffect(() => {
    if (currentUser?.email) {
      setUserName(currentUser.email.split('@')[0]);
    }
  }, [currentUser]);

    const addComment = () => {
    const newComment = {
      author : userName,
      body : comment,
      postedAt : new Date().toISOString(),
      replies : [],
    }
    postComment(movieID, newComment.author, newComment.body, newComment.postedAt).then((res) => {
      setComments(res);
      setComment('');
    })
  }

  const addReply = (reply: {
    uuid: string;
    reply : CommentProps
  } ) => {
    const newComments = comments.map((comment) => {
      if (comment.uuid === reply.uuid) {
        return {
          ...comment,
          replies: [...comment.replies, reply.reply],
        };
      }
      
      return comment;
    });
    postReply(movieID, reply.uuid, userName, reply.reply.body, reply.reply.postedAt).then(() => {
      setComments(newComments);
    })
  }

  return (
    <div className='comment-section'>
      {
        userName ? (
          <TextInput reply={comment} setReply={addComment} updateReply={setComment}/>
        ) : (
          null
        )
      }
      { isLoading ? (
        <p>Loading comments...</p>
      ) : ( 
        comments.map((comment) => {
          return (
            <CommentHtml uuid={comment.uuid}author={comment.author} body={comment.body} postedAt={comment.postedAt} replies={comment.replies} addReply={addReply}/>
          );
        }
        )
      )}
    </div>
  )
}


export default CustomComponent