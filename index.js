const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//MIddleware

app.use(cors());
app.use(express.json())

//alvhAtbPDFmGrY15

const uri = "mongodb+srv://onlineLearningPlatform:alvhAtbPDFmGrY15@simple-crud-server.30cfyeq.mongodb.net/?appName=simple-crud-server";

// mongodb client 
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});






app.get('/', (req, res) => {
    res.send('Smart server is running')
})

// Function Run 

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //create a browse collection
        const db = client.db('learning_platform');
        const coursesCollection = db.collection('courses');

        // Courses api
        app.post('/courses', async (req, res) => {
            const newCourse = req.body;
            const result = await coursesCollection.insertOne(newCourse);
            res.send(result);
        })

        app.patch('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const updatedCourse = req.body;
            const query = { _id: id }
            const update = {
                $set: {
                    title_bangla: updatedCourse.title_bangla,
                    title_english: updatedCourse.title_english,
                    batch_number: updatedCourse.batch_number,
                    batch_name: updatedCourse.batch_name,
                    popularity: updatedCourse.popularity,
                    deadline: updatedCourse.deadline,
                    image: updatedCourse.image,
                    location: updatedCourse.location,
                    ratings: updatedCourse.ratings,
                    starIcon: updatedCourse.starIcon,
                    contact: updatedCourse.contact,
                    price: updatedCourse.price,
                    description: updatedCourse.description,
                }
            }
            const result = await coursesCollection.updateOne(query, update);
            res.send(result)
        })
        app.delete('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id }
            const result = await coursesCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`Smart server is running on port:${port}`)
})