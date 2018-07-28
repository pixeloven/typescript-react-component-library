import * as React from "react";
import { Container } from "semantic-ui-react";
import PostCard, { PostInterface } from "../PostCard/PostCard";

interface PostListProps extends React.HTMLProps<HTMLDivElement> {
    posts: PostInterface[]
}

export default class PostList extends React.PureComponent<PostListProps> {
    render() {
        const { posts } = this.props;
        return (
            <Container>
                {posts.map((post: PostInterface, index: number) => {
                    return (
                        <PostCard key={index} post={post} />
                    );
                })}
            </Container>
        );
    }
}
