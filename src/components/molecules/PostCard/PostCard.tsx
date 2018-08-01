import * as React from "react";
import Link from "../../atoms/Link/Link";
import { Card, Comment } from "semantic-ui-react";

export interface PostInterface {
    cover: string;
    title: string;
    excerpt: string,
    slug: string,
    author: {
        name: string,
    };
    avatar?: {
        src: string,
    },
    meta: {
        updatedDate: string,
        timeToRead: number,
    };
};

interface PostCardProps extends React.HTMLProps<HTMLDivElement> {
    post: PostInterface
}

export default class PostCard extends React.PureComponent<PostCardProps> {
    render() {
        const extra = (
            <Comment.Group>
                <Comment>
                    {!!this.props.post.avatar &&
                    <Comment.Avatar
                        src={this.props.post.avatar.src}
                    />}
                    <Comment.Content>
                        <Comment.Author style={{ fontWeight: 400 }}>
                            {this.props.post.author.name}
                        </Comment.Author>
                        <Comment.Metadata style={{ margin: 0 }}>
                            {this.props.post.meta.updatedDate} - {this.props.post.meta.timeToRead} min read
                        </Comment.Metadata>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        );

        const description = (
            <Card.Description>
                {this.props.post.excerpt}
                <br />
                <Link to={this.props.post.slug}>Read more…</Link>
            </Card.Description>
        );

        return (
            <Card fluid={true}
                  image={this.props.post.cover}
                  header={this.props.post.title}
                  extra={extra}
                  description={description}
            />
        );
    }
}
