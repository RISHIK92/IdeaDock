"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = 'randomstring';
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./models/db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://rishik3555:u6SX8FKJ4SaRgkqN@cluster0.sbvxn.mongodb.net/Brain-App");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/v1/signup/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requirebody = zod_1.z.object({
        username: zod_1.z.string().min(3, 'Minimun 3 characters').max(10, 'Maximum 10 characters allowed'),
        password: zod_1.z.string().min(8, 'Minimum 8 characters').regex(/[A-Z]/, 'Must include an uppercase letter').regex(/[a-z]/, 'Must include a lowercase letter').regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, 'Must include a special character').max(20, 'Maximum 20 characters allowed')
    });
    const ParsedData = requirebody.safeParse(req.body);
    if (!ParsedData.success) {
        res.status(411).json(ParsedData.error.errors);
    }
    else {
        const { username, password } = ParsedData.data;
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.UserModel.create({
            username: username,
            password: hashpassword
        });
        res.json({
            msg: 'You are Signed Up'
        });
    }
}));
app.post('/api/v1/signin/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const response = yield db_1.UserModel.findOne({
        username: username
    });
    try {
        if (!response) {
            res.status(403).json({ msg: 'User not found' });
            return;
        }
        const matchPassword = yield bcrypt_1.default.compare(password, response.password);
        if (!matchPassword) {
            res.status(403).json({ msg: 'Incorrect Password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: response._id.toString() }, exports.JWT_SECRET);
        res.send({ token: token });
        return;
    }
    catch (_a) {
        res.status(500).json({ msg: 'Server Error' });
    }
}));
app.post('/api/v1/content/', middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = req.body.text;
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        text,
        link,
        tags: [],
        type,
        userId: req.userId
    });
    res.json({ msg: 'Content Created' });
}));
app.get('/api/v1/content', middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
// app.post('/api/v1/content',auth, async (req: CustomRequest,res: Response):Promise<void> => {
//     const { contentId } = req.body;
//     const userId = req.userId;
//     if (!userId) {
//         res.status(403).json({msg: 'You dont own the doc'});
//         return
//     }
//     try {
//         const del = await ContentModel.deleteOne({
//             _id: contentId,
//             userId: userId
//         })
//         if (!del) {
//             res.status(404).json({msg: 'Content not found'})
//         }
//         res.status(200).json({msg: 'Delete succeeded'})
//     } catch {
//         res.status(500).json({msg: 'Server Error'})
//     }
// })
app.post('/api/v1/content', middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    const userId = req.userId;
    if (!userId) {
        res.status(403).json({ msg: 'You dont own the doc' });
        return;
    }
    try {
        const del = yield db_1.ContentModel.deleteOne({
            _id: contentId,
            userId: userId
        });
        if (!del) {
            res.status(404).json({ msg: 'Content not found' });
        }
        res.status(200).json({ msg: 'Delete succeeded' });
    }
    catch (_a) {
        res.status(500).json({ msg: 'Server Error' });
    }
}));
app.post("/api/v1/brain/share", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            msg: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            msg: "User not found"
        });
        return;
    }
    res.json({
        content: content
    });
}));
app.listen(3000, () => {
    console.log('listening');
});
