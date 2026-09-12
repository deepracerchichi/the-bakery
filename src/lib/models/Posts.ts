import mongoose, {Schema, models, model} from "mongoose";

const PostSchema = new Schema(
    {
        title: {type: String, required: true},
        body: {type: String, required: true},
        imageUrl: {type: String},
    },
    {timestamps: true}
);

const Post = models.Post || model("Post", PostSchema);

export default Post;