import { User } from './models/User'

export const resolvers = {
  Query: {
    getUser: (_, { id }) => {
      return User.find({ "_id": id })
    },
    allUsers: () => {
      return User.find()
    }
  },
  Mutation: {

    createUser: async (_, { fname, lname, phone, email }) => {
      const user = new User({ fname, lname, phone, email })
      await user.save();
      return `Save Successfully.`
    },

    updateUser: async (_, { id, fname, lname, phone, email }) => {
      await User.updateOne(
        { "_id": id },
        { $set: { "fname": fname, "lname": lname, "phone": phone, "email": email, } }
      );
      return `Update Successfully.`
    },

    deleteUser: async (_, { id }) => {
      await User.deleteOne(
        { "_id": id }
      );
      return `Delete Successfully.`
    }
  }
}
