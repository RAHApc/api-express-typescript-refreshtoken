import { UploadedFile } from "express-fileupload";
import { join } from "path";
import { hashFromUUID } from "./HashService";

const ROOT_PATH = process.cwd();
const CONTENT_PATH = '/public/images/';

class UploadService {
    private readonly basePath: string;

    constructor() {
        this.basePath = join(ROOT_PATH, CONTENT_PATH);
    }

    public async uploadFile(file: UploadedFile): Promise<string> {
        const fileName: string = this.generateNewName(file.name);
        await file.mv(`${this.basePath}${fileName}`);
        return fileName;
    }

    private generateNewName(fileName: string): string {
        const fileExtension = fileName.split('.').pop() as string;
        const newFileName = hashFromUUID();
        return `${newFileName}.${fileExtension}`;
    }
}

export default UploadService;