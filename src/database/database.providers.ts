import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://henriqueguarnierigg:eWNXDm9helE7kvto@cluster0.9a2bybv.mongodb.net/'),
  },
];