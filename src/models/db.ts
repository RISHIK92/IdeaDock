import mongoose, { Schema, Document, Model } from 'mongoose';
import { string } from 'zod';

const ObjectId = Schema.ObjectId;

interface IUser extends Document {
    username: string;
    password: string;
}

interface IContent extends Document {
    text: string;
    link: string;
    tags: mongoose.Types.ObjectId;
    type: string;
    userId: mongoose.Types.ObjectId;
}

interface ILink extends Document {
    hash: String;
    userId: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser> ({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

const ContentSchema = new Schema<IContent> ({
    text: {type: String, required: true},
    link: {type: String, required: true},
    type: {type: String, required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const LinkSchema = new Schema<ILink> ({
    hash: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
})

type UserDocument = mongoose.Document<mongoose.Types.ObjectId, {}, IUser> & 
    IUser & 
    Required<{ _id: mongoose.Types.ObjectId }> & 
    { __v: number };

export const LinkModel: Model<ILink> = mongoose.model<ILink>('Link',LinkSchema )
export const UserModel: Model<IUser> = mongoose.model<IUser>('User',UserSchema);
export const ContentModel: Model<IContent> = mongoose.model<IContent>('content',ContentSchema);
export {
    UserDocument
}