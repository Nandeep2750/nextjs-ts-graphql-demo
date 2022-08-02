import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons' // <-- import styles to be used
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons' // <-- import styles to be used
import { useLikePostMutation } from '../../graphql/generated'
interface ILikeProps {
  postId: string,
  isLiked: boolean
  likeCount: number
} 

const PostLike: React.FunctionComponent<ILikeProps> = (props) => {

  const LikeIcon = props.isLiked ? faThumbsUpSolid : faThumbsUpRegular
  const [likePostMutation, { data: likePostMutationData, loading: likePostMutationLoading, error: likePostMutationError }] = useLikePostMutation();

  const handleClick = () => {
    likePostMutation({
      variables: {
        postId: props.postId
      }
    }
    )
  }

  return (
    <div>
      <button className='btn btn-primary'><FontAwesomeIcon icon={LikeIcon} onClick={handleClick} /> </button>
      <span className='ms-2'>
        {props.likeCount} people {props.likeCount > 1 ? "likes" : "like"} the post
      </span>
    </div>
  )
}

export default PostLike