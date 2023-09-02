import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    rem,
    Input,
    Textarea,
    Button,
    ActionIcon,
  } from '@mantine/core';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
  const useStyles = createStyles((theme) => ({
    comment: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },
  
    body: {
      paddingLeft: rem(54),
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
    },
  
    content: {
      '& > p:last-child': {
        marginBottom: 0,
      },
    },
  }));

  
  
export interface CommentProps {
    author: string;
    body: string;
    postedAt: string;
}

export interface CommentData {
    uuid: string;
    author: string;
    body: string;
    postedAt: string;
    replies: CommentProps[];
    addReply: (reply: {
      uuid: string;
      reply : CommentProps
    }) => void;
}
export const SubmitIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="4" stroke="purple" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
        </svg>

    )
  }

interface ButtonWithSvgProps {
    collapsed : boolean,
    author : string,
    setCollapased : (value : boolean) => void
    addReply : (reply: {
      uuid: string;
      reply : CommentProps
    }) => void;
    uuid : string;
}

const ButtonWithSvg = ( { collapsed, setCollapased, uuid, addReply, author} : ButtonWithSvgProps) => {
    const {currentUser } = useContext(AuthContext);
    const [isClicked, setIsClicked] = useState(false);
    const [reply, setReply] = useState('');
    const onClickHandler = () => {
        setIsClicked(!isClicked);
    }
    const [userName, setUserName] = useState('');
    useEffect(() => {
        if (currentUser?.email) {
          setUserName(currentUser.email.split('@')[0]);
        }
      }, [currentUser]);


    
    return (
        !isClicked ? (
            <div className='parentCommentButtons'><ActionIcon variant="transparent" className='replyButton' onClick={onClickHandler}>
                <svg width="45" height="25" viewBox="0 0 142 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 50.9314C5 50.9314 77.1779 50.9314 96.8628 50.9314C149.356 50.9314 149.356 123.109 96.8628 123.109M5 50.9314L50.9314 5M5 50.9314L50.9314 96.8628" stroke="#FB00E2" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </ActionIcon>
            
            <ActionIcon variant="transparent" className='collapseButton' onClick={()=>{
                setCollapased(!collapsed);
            }}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-bottombar-collapse" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M20 6v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2z"></path>
                        <path d="M20 15h-16"></path>
                        <path d="M14 8l-2 2l-2 -2"></path>
                    </svg>
                </ActionIcon>
                </div>
        ) : (userName ? (
              <div className='replyInputBox'>
            <Textarea
                    className='replyInput'
                    placeholder="Your reply"
                    value={reply}
                    onChange={(event) => {
                        setReply(event.currentTarget.value);
                    }}
                    label="Reply" />  <ActionIcon variant="filled" className='SubmitButton' onClick={
                     () => {
                        addReply({
                            uuid: uuid,
                            reply: {
                              author: userName,
                              body: reply,
                              postedAt: new Date().toISOString(),
                            },
                          });
                          setReply('');
                          setIsClicked(false);
                      }
                    }>
                    <SubmitIcon />
                    </ActionIcon>
            </div>
            ) : (
                <ActionIcon variant="transparent" className='collapseButtonNotLoggedIn' onClick={()=>{
                setCollapased(!collapsed);
            }}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-bottombar-collapse" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M20 6v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2z"></path>
                        <path d="M20 15h-16"></path>
                        <path d="M14 8l-2 2l-2 -2"></path>
                    </svg>
                </ActionIcon>
            )
           
        )
    );
}

export function Comment({ postedAt, body, author }: CommentProps) {
    const { classes } = useStyles();

    return (
        <div className='comment'>
      <Paper withBorder radius="md" className={classes.comment} style={{background: 'transparent', border: '0px'}}>
        <Group>
          <Avatar src={`https://ui-avatars.com/api/name=${author}&background=random`} alt={author} radius="xl" />
          <div>
            <Text fz="sm" style={
                {
                    color: 'white'
                }
            }>{author}</Text>
            <Text fz="xs" c="dimmed" style={
                {
                    color: 'white'
                }
            }>
              {postedAt}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }} style={
                {
                    color: 'white'
                }
            } />
        </TypographyStylesProvider>
        
      </Paper>
      </div>
      )
        }

export function CommentHtml( data: CommentData) {
    const { classes } = useStyles();
    const [collapseReplies, setCollapseReplies] = useState(false);
    const currentUser = 'test';
    return (
        <>
        <div className='parentComment'>
            <Comment postedAt={data.postedAt} body={data.body} author={data.author} />
      <ButtonWithSvg collapsed={collapseReplies} setCollapased={setCollapseReplies} addReply={data.addReply} uuid={data.uuid} author={currentUser}/>
        </div>
        <div className='replies'>
            {
                collapseReplies ? (
                    data.replies.map((reply) => {
                        return (
                            <Comment postedAt={reply.postedAt} body={reply.body} author={reply.author} />
                        )
                    }
                    )
                ) : (
                    <div></div>
                )
  }</div>
  </>
    );
  }