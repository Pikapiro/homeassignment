import React, { useState } from 'react';
import './Post.css';
import { GrLike } from "react-icons/gr";
import { FaRegCommentAlt } from "react-icons/fa";

interface PostProps {
    id: string;
    userId: string;
    username: string;
    avatar: string;
    shopName: string;
    shopId: string;
    images: string[];
    comments: number;
    date: string;
    text: string;
    likes: number;
    didLike: boolean;
    premium: boolean;
}

const timeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
};

const Post: React.FC<PostProps> = ({
    username,
    avatar,
    shopName,
    images,
    comments,
    date,
    text,
    likes,
    didLike,

}) => {
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(didLike);

    const handleLike = () => {
        if (isLiked) {
            setCurrentLikes(currentLikes - 1);
        } else {
            setCurrentLikes(currentLikes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="post">
            <div className="usrInfo">
                <div className="avatarDiv">
                    <img src={avatar} alt={`${username}'s avatar`} className="avatar" />
                </div>
                <div className="spanDiv">
                    <span className="username">{username}</span>
                    {shopName && <span className="shopName">{shopName}</span>}
                    <span className="date">{timeAgo(date)}</span>
                </div>
            </div>
            <div className="postContent">
                <p>{text}</p>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Post image ${index + 1}`} className="postImage" />
                ))}
            </div>
            <div className="postDetails">
                <div className="postNumbers">
                    <span className="comments">{comments} comments</span>
                    <span className="likes">{currentLikes} likes</span>
                </div>
                <div className="buttonsDiv">
                    <p className={`Btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                        <GrLike />  Like
                    </p>
                    <p className="Btn"><FaRegCommentAlt /> comment</p>
                </div>
            </div>
        </div>
    );
};

export default Post;