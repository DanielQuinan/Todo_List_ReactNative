const { MongoClient, ObjectId } = require('mongodb');
const uri = "Insira sua URI";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect();

class Todo {
  static async getAll() {
    const collection = client.db('test').collection('todos');
    return await collection.find().toArray();
  }
  
  static async add(todo) {
    const collection = client.db('test').collection('todos');
    await collection.insertOne(todo);
  }
  
  static async remove(id) {
    const collection = client.db('test').collection('todos');
    await collection.deleteOne({ _id: new ObjectId(id) });
  }
  
  static async toggleComplete(id) {
    const collection = client.db('test').collection('todos');
    const todo = await collection.findOne({ _id: new ObjectId(id) });
    if (todo) {
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: { completed: !todo.completed } });
    }
  }
}

module.exports = Todo;
