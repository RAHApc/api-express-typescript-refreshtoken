import { Request, Response } from "express";
import UploadService from "./../../services/UploadService";
import IPostRepository from "./repositories/IPostRepository";
import PostMongoRepository from "./repositories/PostMongoRepository";
import { UploadedFile } from 'express-fileupload';

class PostController {
    private postRepository: IPostRepository;
    private uploadService: UploadService;

    constructor() {
        this.postRepository = new PostMongoRepository();
        this.uploadService = new UploadService();
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    public async index(req: Request, res: Response) {
        const Posts = await this.postRepository.findMany({});
        res.send({ Posts });
    }

    public async create(req: Request, res: Response) {
        const newPostParams = {
            user: req.body.userId,
            desc: req.body.desc
        };

        const newPost = await this.postRepository.create(newPostParams);

        if (req.files) {
            const fileImg: UploadedFile = req.files.image as UploadedFile;
            const image: string = await this.uploadService.uploadFile(fileImg);
            await this.postRepository.updateOne({ _id: newPost._id }, { image });
        }

        res.status(201).send({ newPost });
    }
}

export default PostController;