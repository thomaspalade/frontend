export const writeComment = (comment) => ({
    comment,
    type: 'WRITE_COMMENT'
  });
  
  export const updateComment = (id, comment) => ({
    id,
    comment,
    type: 'UPDATE_COMMENT'
  });
  
  export const deleteComment = (id) => ({
    id,
    type: 'DELETE_COMMENT'
  });

  export const logIn = () => ({
    type: 'LOG_IN'
  })

  export const logOut = () => ({
    type: 'LOG_OUT'
  })