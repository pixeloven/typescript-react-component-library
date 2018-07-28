import * as React from "react";
import { NavLinkProps } from "react-router-dom";
import { Card, List } from "semantic-ui-react";

export interface TagInterface {
    value: string;
    count: number
}

interface TagsCardProps extends React.HTMLProps<HTMLDivElement> {
    tags: TagInterface[];
    Link: React.ComponentClass<NavLinkProps>;
    tag?: string;
}

export default (props: TagsCardProps) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    Tags
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <List>
                    {props.tags.map((tag: TagInterface) => {
                        const isActive = tag.value === props.tag;
                        const activeStyle = {
                            fontWeight: "700",
                        };
                        const tagLink = isActive ? `/blog` : `/blog/tags/${tag.value}/`;
                        const tagColor = isActive ? 'blue' : 'black';
                        return (
                            <List.Item as="span" key={tag.value}>
                                <List.Icon name="tag" color={tagColor} />
                                <List.Content style={isActive ? activeStyle : null}>
                                    <props.Link to={tagLink}>
                                        {tag.value} ({tag.count})
                                    </props.Link>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>
            </Card.Content>
        </Card>
    );
};
