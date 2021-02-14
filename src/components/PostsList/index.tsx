import React from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { Post as PostType } from "../../@types/post";
import {
  Post,
  List,
  InfoWrapper,
  Title,
  Description,
  Votes,
  Logo,
} from "./styles";

export interface PostsListProps {
  posts: PostType[];
  onScroll?: (ev: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

const PostsList: React.FC<PostsListProps> = ({ posts, onScroll = () => ({}) }) => {
  return (
    <List onScroll={onScroll}>
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
            <Votes>
              <IoMdArrowDropup size={17} />
              {project.votesCount}
            </Votes>
          </Post>
        ))}
    </List>
  );
};

export default PostsList;
