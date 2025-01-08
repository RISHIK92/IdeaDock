import express, { Request,Response } from 'express';
import jwt from 'jsonwebtoken';
export const JWT_SECRET = 'randomstring';
import mongoose from 'mongoose';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { UserModel, ContentModel,UserDocument,LinkModel } from './models/db';
import { auth,CustomRequest } from './middleware';
import { random } from './utils';
import cors from 'cors';
const app = express();

mongoose.connect("mongodb+srv://rishik3555:u6SX8FKJ4SaRgkqN@cluster0.sbvxn.mongodb.net/Brain-App");

app.use(express.json());
app.use(cors());

app.post('/api/v1/signup/', async(req: Request,res: Response) => {
    const requirebody = z.object({
        username: z.string().min(3, 'Minimun 3 characters').max(10, 'Maximum 10 characters allowed'),
        password: z.string().min(8, 'Minimum 8 characters').regex(/[A-Z]/, 'Must include an uppercase letter').regex(/[a-z]/, 'Must include a lowercase letter').regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, 'Must include a special character').max(20, 'Maximum 20 characters allowed')
    })

    const ParsedData = requirebody.safeParse(req.body);

    if (!ParsedData.success) {
        res.status(411).json(ParsedData.error.errors);
    }
    else {
        const { username,password } = ParsedData.data;

        const hashpassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username: username,
            password: hashpassword
        })
        res.json({
            msg: 'You are Signed Up'
        })
    }
})

app.post('/api/v1/signin/', async(req: Request,res: Response):Promise<void> => {
    const username = req.body.username;
    const password = req.body.password

    const response: UserDocument| null = await UserModel.findOne({
        username: username
    })

    try {
        if (!response) {
            res.status(403).json({ msg: 'User not found'});
            return;
        }

        const matchPassword = await bcrypt.compare(password, response.password);

        if (!matchPassword) {
            res.status(403).json({msg: 'Incorrect Password'});
            return;
        }
        const token = jwt.sign({id: response._id.toString()}, JWT_SECRET);
        res.send({token: token});
        return;
    } catch {
        res.status(500).json({msg: 'Server Error'})
    }
})

app.post('/api/v1/content/', auth, async (req: CustomRequest, res: Response): Promise<void> => {
    const text = req.body.text;
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        text,
        link,
        tags: [],
        type,
        userId: req.userId
    });

    res.json({ msg: 'Content Created' });
});

app.get('/api/v1/content', auth, async (req: CustomRequest,res: Response): Promise<void> => {
    const userId = req.userId;

    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    });
})

app.post('/api/v1/content',auth, async (req: CustomRequest,res: Response):Promise<void> => {
    const { contentId } = req.body;
    const userId = req.userId;

    if (!userId) {
        res.status(403).json({msg: 'You dont own the doc'});
        return
    }
    
    try {
        const del = await ContentModel.deleteOne({
            _id: contentId,
            userId: userId
        })
        if (!del) {
            res.status(404).json({msg: 'Content not found'})
        }
        res.status(200).json({msg: 'Delete succeeded'})
    } catch {
        res.status(500).json({msg: 'Server Error'})
    }
})

app.post("/api/v1/brain/share", auth, async (req: CustomRequest, res: Response):Promise<void> => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})  

app.get('/api/v1/brain/:shareLink', async (req: Request,res: Response):Promise<void> => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })

    if (!link) {
        res.status(411).json({
            msg: "Sorry incorrect input"
        })
        return
    }
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            msg: "User not found"
        })
        return;
    }
    res.json({
        content: content
    })
})

app.listen(3000, () => {
    console.log('listening')
})