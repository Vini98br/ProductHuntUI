import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Post as PostType } from "../../@types/post";
import {
  Post,
  List,
  InfoWrapper,
  Title,
  Description,
  Fav,
  Logo,
} from "./styles";

export interface PostsListProps {
  posts: PostType[];
  storageData?: (product: PostType) => void;
}

const PostsList: React.FC<PostsListProps> = ({
  posts,
  storageData = () => ({})
}) => {

  return (
    <List length={posts?.length}>
      {posts &&
        posts.map((project) => (
          <Post key={project.id}>
            <Logo src={project.thumbnail.url} />
            <InfoWrapper>
              <Title>{project.name}</Title>
              <Description>
                {project.description.length > 140
                  ? project.description.slice(0, 140) + "..."
                  : project.description}
              </Description>
            </InfoWrapper>
            <Fav onClick={() => storageData(project)}>
              {project.fav ? (
                <AiFillHeart size={30} />
              ) : (
                <AiOutlineHeart size={30} />
              )}
            </Fav>
          </Post>
        ))}
    </List>
  );
};

export default PostsList;
