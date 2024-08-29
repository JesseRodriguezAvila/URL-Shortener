/**
 * Mongoose (ODM)
 * https://mongoosejs.com/docs/typescript.html
*/
import mongoose, { Model } from "mongoose";
import { generateShortPath } from "../utils/helper.util";
import { API_URL } from "../env.config";

const Types = mongoose.Types;

// Interface to create new instances
export interface UserCreateDocument {
    original_url: string;
    short_path?: string;
}

// Interface for Url model type
export interface UserDocument extends mongoose.Document {
    original_url: string;
    short_path: string;
    createdAt: Date;
    updatedAt: Date;
    fullShortPath: string; // Virtual
}

// Interface for statics (functions added to model class)
interface UrlModelStatics extends Model<UserDocument> {
    findOneByOriginalUrlOrCreate(url: string): Promise<UserDocument>;
    findOneByShortPath(short_path: string) : Promise<UserDocument | null>;
}
// Interface for methods (functions added to model instances)
interface UrlInstanceMethods {
    //updateName(name: string): Promise<UserDocument>
}

// Create Schema
const UrlSchema = new mongoose.Schema({
    // Mongoose will generate unique id automatically
    original_url: {
        require: true,
        type: String
    },
    short_path: {
        require: true,
        type: String,
        // For simplicity, I only generate a uuid
        default: generateShortPath
    } 
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

/**
 *  Virtual are calculated locally
 *  - Not stored in database 
 **/ 
UrlSchema.virtual(`fullShortPath`).get(function(this) {
    return `${API_URL}/${this.short_path}`
});


/**
 * Functions added Model instances
 *  const urlInstance = new Url({...});
 *  - urlInstance.updateName(name)
 **/
/*
schema.method('updateName', function updateName(name) {
    this.name = name;
    return this.save();
});
*/

//

/**
 * Functions added to a Model class
 *  - Model.findOneByOriginalUrlOrCreate(url)
 *  - Model.findOneByShortPath(short_path)
 **/
UrlSchema.static(`findOneByOriginalUrlOrCreate`, async function (url: string) : Promise<UserDocument> {
    // CHECK: If short url already exists in database
    // If already exist, return document found
    // If it does not exist, create and return new document
    const Url = this;
    const document = await Url.findOne<UserDocument>({ original_url: url }); 
    if (document) return document;
    return Url.create<UserCreateDocument>({ original_url: url });
});
UrlSchema.static(`findOneByShortPath`, async function (short_path: string) : Promise<UserDocument | null> {
    return this.findOne({ short_path });
});

// Create Model
export default mongoose.model<UserDocument, UrlModelStatics, UrlInstanceMethods>(`Url`, UrlSchema);