import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton/IconButton';

type Props = {
    myPosts: string,
    editUpdatePosts: (submit: any) => void,
    updateOn: () => void,
    fetchPosts: () => void,
    token: string
}

export default class SubmitTable extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    postDelete = (post: any) => {
        fetch('http://localhost:4000/submission/delete/:id', {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }) .then(() => this.props.fetchPosts())
    }

    postMapper = () => {
        let posts = this.props.myPosts;

        return posts.map((post, index) => {
            return (
                <Card key={index} className="post-card">
                    <CardImg className="post-card-image" top width="100%" src={post.postUrl} alt="Card image cap" />
                    <CardBody className="post-body">
                        <CardSubtitle className="post-text">
                            <p className="post-profile-username">{post.username}</p><p>{post.description}</p>
                        </CardSubtitle>
                        <br />
                        <IconButton onClick={() => { this.props.editUpdatePosts(post); this.props.updateOn() }}><CreateIcon /></IconButton>
                        <IconButton className="delete-btn" onClick={() => { this.postDelete(post) }}><ClearIcon /></IconButton>
                    </CardBody>
                </Card>
            )
        })
    }

    render() {
        return (
            <CardDeck className="post-card-deck">
                {this.postMapper()}
            </CardDeck>
        )
    }
}