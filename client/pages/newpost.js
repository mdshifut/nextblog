import { Component } from "react";
import { connect } from "react-redux";
import { addPostContent } from "../store/actions/postActions";
import InputGroup from "../components/InputGroup";
import DescriptionEditor from "../components/editor/DescriptionEditor";
import Layout from "../components/Layout";
import GalleryInput from "../components/galleryInput/GalleryInput";

class NewPost extends Component {
  titleChangeHandler = e =>
    this.props.addPostContent({ title: e.target.value });

  render() {
    const { title } = this.props.postContent;
    return (
      <Layout className="post-body">
        <h1>Create new post</h1>
        {/* Title input */}
        <InputGroup
          name="title"
          value={title}
          placeholder="Post title"
          onChange={this.titleChangeHandler}
        />
        {/* gallery input */}
        <GalleryInput />
        {/* Text editor */}
        <DescriptionEditor />
        <style jsx>{`
          h1 {
            padding-bottom: 20px;
          }
        `}</style>
        <style jsx global>
          {`
            .post-body {
              padding: 30px;
            }
          `}
        </style>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  postContent: state.postContent
});
export default connect(
  mapStateToProps,
  { addPostContent }
)(NewPost);

// title,
//   description,
//   category,
//   tags,
//   featuredItems,
