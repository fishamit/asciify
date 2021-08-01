const express = require('express');
const path = require('path');
const cors = require('cors');
const upload = require('./config/multer');
const { unlink } = require('fs/promises');
const { init } = require('./utils/img');

require('dotenv').config();
const app = express();

if (process.env.NODE_ENV !== 'production') app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'static')));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    let { resolution, values } = req.body;
    if (!resolution) resolution = 20;
    if (!values) values = '@%#*+=-:. ';
    const str = await init(resolution, values, req.file.path);
    await unlink(req.file.path);
    return res.status(200).send({ ascii: str });
  } catch (error) {
    return res.status(500).send({ message: 'Server error.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.listen(process.env.PORT || 3100, () => {
  console.log('Listening @' + (process.env.PORT || 3100));
});
