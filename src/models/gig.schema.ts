import { ISellerGig } from '@irshadkhan2019/job-app-shared';
import mongoose, { Model, Schema, model } from 'mongoose';

const gigSchema: Schema = new Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, index: true },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    basicTitle: { type: String, required: true },
    basicDescription: { type: String, required: true },
    categories: { type: String, required: true },
    subCategories: [{ type: String, required: true }],
    tags: [{ type: String }],
    active: { type: Boolean, default: true },
    expectedDelivery: { type: String, default: '' },
    ratingsCount: { type: Number, default: 0 },
    ratingSum: { type: Number, default: 0 },
    ratingCategories: {
      five: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      four: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      three: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      two: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      one: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
    },
    price: { type: Number, default: 0 },
    sortId: { type: Number },
    coverImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    // save to mongodb->get created doc -> add doc to elastic search where id=_id in mongodb
    // elastic search can't have property _id so we create id to save it in ES .
    toJSON: {
      // doc has mongoose obj and rec has js obj JSON obj
      transform(_doc, rec) { //delete _id field from record returned.
        rec.id = rec._id;
        delete rec._id;
        return rec; //return json obj ,needed for ES
      }
    }
  }
);

// created field id whose value is that of _id
gigSchema.virtual('id').get(function() {
  return this._id;
});

const GigModel: Model<ISellerGig> = model<ISellerGig>('Gig', gigSchema, 'Gig');
export { GigModel };